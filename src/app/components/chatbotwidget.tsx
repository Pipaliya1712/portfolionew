"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from '../styles/ChatbotWidget.module.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: number;
  type: 'ai' | 'user';
  text: string;
  isStreaming?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SESSION_KEY = 'chatbot_session_id';
const CONV_KEY = 'chatbot_conversation_id';

const INITIAL_SUGGESTIONS = [
  "What is Parth's expertise?",
  "Show AI projects",
  "Book a consultation",
  "What's his tech stack?",
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    type: 'ai',
    text: "Hi! I'm **Parth's AI assistant** 👋\n\nAsk me anything about his experience, projects, skills, or how to collaborate!",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

async function createConversation(sessionId: string): Promise<string | null> {
  try {
    const res = await fetch('/api/chat/conversations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: sessionId }),
    });
    const json = await res.json();
    return json.conversation?.id ?? null;
  } catch { return null; }
}

async function saveMessage(conversationId: string, type: 'user' | 'bot', text: string) {
  try {
    await fetch('/api/chat/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ conversation_id: conversationId, type, text }),
    });
  } catch { /* fail silently */ }
}

async function deleteConversation(conversationId: string) {
  try {
    await fetch(`/api/chat/conversations/${conversationId}`, { method: 'DELETE' });
  } catch { /* fail silently */ }
}

// ─── Markdown Message ─────────────────────────────────────────────────────────

function MarkdownMessage({ text, isStreaming }: { text: string; isStreaming?: boolean }) {
  return (
    <div className={`${styles.markdownContent} ${isStreaming ? styles.streaming : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
          ),
        }}
      >
        {text}
      </ReactMarkdown>
      {isStreaming && <span className={styles.streamCursor} />}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [suggestions, setSuggestions] = useState<string[]>(INITIAL_SUGGESTIONS);
  const [inputValue, setInputValue] = useState('');
  const [isBotResponding, setIsBotResponding] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const sessionIdRef = useRef('');
  const convIdRef = useRef<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // ── Init session ──────────────────────────────────────────────────────────
  useEffect(() => {
    let sid = localStorage.getItem(SESSION_KEY);
    if (!sid) { sid = generateUUID(); localStorage.setItem(SESSION_KEY, sid); }
    sessionIdRef.current = sid;
    const cid = localStorage.getItem(CONV_KEY);
    if (cid) convIdRef.current = cid;
  }, []);

  // ── Auto-scroll ───────────────────────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Ensure DB conversation ────────────────────────────────────────────────
  const ensureConversation = useCallback(async () => {
    if (convIdRef.current) return convIdRef.current;
    const id = await createConversation(sessionIdRef.current);
    if (id) { convIdRef.current = id; localStorage.setItem(CONV_KEY, id); }
    return id;
  }, []);

  // ── Stream response from Groq ─────────────────────────────────────────────
  const streamResponse = useCallback(async (userText: string) => {
    if (isBotResponding) return;

    // Build Groq conversation history from current messages
    const history = messages
      .filter(m => m.text && !m.isStreaming)
      .slice(-10)
      .map(m => ({ role: m.type === 'ai' ? 'assistant' : 'user', content: m.text }));
    history.push({ role: 'user', content: userText });

    const userMsgId = Date.now();
    const botMsgId = userMsgId + 1;

    // Immediately add user message + empty streaming bot message
    setMessages(prev => [
      ...prev,
      { id: userMsgId, type: 'user', text: userText },
      { id: botMsgId, type: 'ai', text: '', isStreaming: true },
    ]);
    setIsBotResponding(true);

    const controller = new AbortController();
    abortRef.current = controller;

    let fullText = '';
    try {
      const res = await fetch('/api/chat/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setMessages(prev =>
          prev.map(m => m.id === botMsgId ? { ...m, text: fullText } : m)
        );
      }
    } catch (err: unknown) {
      if ((err as Error).name === 'AbortError') return;
      fullText = "Sorry, I ran into an error. Please try again or contact Parth directly at **parthpipaliya1712@gmail.com** 🙏";
      setMessages(prev =>
        prev.map(m => m.id === botMsgId ? { ...m, text: fullText } : m)
      );
    } finally {
      // Mark streaming done
      setMessages(prev =>
        prev.map(m => m.id === botMsgId ? { ...m, isStreaming: false } : m)
      );
      setIsBotResponding(false);
      abortRef.current = null;

      // Persist to Supabase in background
      const convId = await ensureConversation();
      if (convId && fullText) {
        saveMessage(convId, 'user', userText);
        saveMessage(convId, 'bot', fullText);
      }

      // Fetch dynamic suggestions
      if (fullText && !fullText.includes("Sorry, I ran into an error")) {
        try {
          const suggestionHistory = [...history, { role: 'assistant', content: fullText }];
          const suggRes = await fetch('/api/chat/suggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: suggestionHistory }),
          });
          if (suggRes.ok) {
            const data = await suggRes.json();
            if (data.suggestions && Array.isArray(data.suggestions) && data.suggestions.length > 0) {
              setSuggestions(data.suggestions);
            }
          }
        } catch (e) {
          console.error("Failed to fetch suggestions", e);
        }
      }
    }
  }, [isBotResponding, messages, ensureConversation]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text || isBotResponding) return;
    setInputValue('');
    streamResponse(text);
  }, [inputValue, isBotResponding, streamResponse]);

  const handleSuggestion = useCallback((s: string) => {
    if (isBotResponding) return;
    streamResponse(s);
  }, [isBotResponding, streamResponse]);

  const handleDeleteSession = useCallback(async () => {
    abortRef.current?.abort();
    setIsDeleting(true);
    if (convIdRef.current) await deleteConversation(convIdRef.current);
    localStorage.removeItem(CONV_KEY);
    convIdRef.current = null;
    setMessages(INITIAL_MESSAGES);
    setSuggestions(INITIAL_SUGGESTIONS);
    setIsBotResponding(false);
    setIsDeleting(false);
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={styles.widget}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatPanel}
            initial={{ scale: 0.85, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerLeft}>
                <div className={styles.headerAvatar}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#d0bcff' }}>
                    smart_toy
                  </span>
                  <span className={styles.onlineDot} />
                </div>
                <div>
                  <div>Parth AI Assistant</div>
                  <div className={styles.headerStatus}>
                    {isBotResponding ? '✦ Thinking...' : 'Portfolio Consultant • Active'}
                  </div>
                </div>
              </div>

              <div className={styles.headerActions}>
                <button
                  id="chatbot-delete-session"
                  className={styles.deleteBtn}
                  onClick={handleDeleteSession}
                  disabled={isDeleting}
                  title="Clear chat history"
                  aria-label="Clear chat session"
                >
                  {isDeleting
                    ? <span className="material-symbols-outlined" style={{ fontSize: '18px', display: 'block', animation: 'spin 1s linear infinite' }}>progress_activity</span>
                    : <span className="material-symbols-outlined" style={{ fontSize: '18px', display: 'block' }}>delete</span>
                  }
                </button>
                <button
                  id="chatbot-close"
                  className={styles.closeBtn}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px', display: 'block' }}>close</span>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.chatMessages} id="chat-messages-container">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={msg.type === 'ai' ? styles.aiMessage : styles.userMessage}
                >
                  {msg.type === 'ai' ? (
                    <div className={styles.aiBubble}>
                      {msg.text
                        ? <MarkdownMessage text={msg.text} isStreaming={msg.isStreaming} />
                        : <div className={styles.thinkingDots}>
                            <span /><span /><span />
                          </div>
                      }
                    </div>
                  ) : (
                    <div className={styles.userBubble}>{msg.text}</div>
                  )}
                </div>
              ))}

              {/* Suggestions (only show when bot is idle) */}
              {!isBotResponding && (
                <div className={styles.suggestions}>
                  {suggestions.map((s, i) => (
                    <button
                      key={i}
                      className={styles.suggestionChip}
                      onClick={() => handleSuggestion(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={styles.chatInput}>
              <input
                id="chatbot-input"
                type="text"
                placeholder={isBotResponding ? 'Parth AI Assistant is thinking...' : 'Ask anything about Parth...'}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                className={styles.inputField}
                disabled={isBotResponding}
              />
              <button
                id="chatbot-send"
                className={styles.sendBtn}
                onClick={handleSend}
                disabled={isBotResponding || !inputValue.trim()}
                aria-label="Send message"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px', display: 'block' }}>
                  {isBotResponding ? 'hourglass_empty' : 'send'}
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        id="chatbot-toggle"
        className={styles.toggleBtn}
        onClick={() => setIsOpen(v => !v)}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen
            ? <motion.span key="x" className="material-symbols-outlined"
                style={{ fontSize: '28px', display: 'block' }}
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                close
              </motion.span>
            : <motion.span key="bot" className="material-symbols-outlined"
                style={{ fontSize: '28px', display: 'block' }}
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                smart_toy
              </motion.span>
          }
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
