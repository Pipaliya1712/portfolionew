'use client';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Check, ChevronDown } from 'lucide-react';
type Option = { value: string; label: string; description?: string };
type Props = { id: string; name: string; labelledBy: string; describedBy?: string; value: string; options: Option[]; onChange: (value: string) => void; onBlur?: () => void; invalid?: boolean; disabled?: boolean };
export function SelectField({ id, name, labelledBy, describedBy, value, options, onChange, onBlur, invalid, disabled }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [upward, setUpward] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const search = useRef({ text: '', time: 0 });
  const selected = options.findIndex(option => option.value === value);
  function openMenu(index = Math.max(0, selected)) {
    const bounds = root.current?.getBoundingClientRect();
    setUpward(Boolean(bounds && window.innerHeight - bounds.bottom < 280 && bounds.top > 280));
    setActive(index); setOpen(true);
  }
  function choose(index: number) { if (options[index]) onChange(options[index].value); setOpen(false); onBlur?.(); }
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) { setOpen(false); onBlur?.(); } };
    document.addEventListener('pointerdown', outside);
    return () => document.removeEventListener('pointerdown', outside);
  }, [open, onBlur]);
  useEffect(() => { if (open) document.getElementById(`${id}-option-${active}`)?.scrollIntoView({ block: 'nearest' }); }, [active, open, id]);
  function keyboard(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) openMenu(selected >= 0 ? selected : event.key === 'ArrowUp' ? options.length - 1 : 0);
      else setActive(current => Math.max(0, Math.min(options.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1))));
    } else if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); openMenu(event.key === 'Home' ? 0 : options.length - 1); }
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (open) choose(active); else openMenu(); }
    else if (event.key === 'Escape' && open) { event.preventDefault(); event.stopPropagation(); setOpen(false); }
    else if (event.key === 'Tab') { if (open) choose(active); }
    else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      const now = Date.now();
      const text = now - search.current.time < 700 ? search.current.text + event.key : event.key;
      search.current = { text, time: now };
      const repeated = [...text].every(char => char.toLowerCase() === text[0].toLowerCase());
      const term = repeated ? text[0] : text;
      const start = repeated && open ? active + 1 : 0;
      const match = options.map((_, i) => (start + i) % options.length).find(index => options[index].label.toLowerCase().startsWith(term.toLowerCase()));
      if (match !== undefined) { event.preventDefault(); openMenu(match); }
    }
  }
  return <div className={`custom-select ${open ? 'is-open' : ''} ${upward ? 'opens-up' : ''}`} ref={root} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) { if (open) choose(active); onBlur?.(); } }}>
    <input type="hidden" name={name} value={value} disabled={disabled} />
    <button id={id} type="button" role="combobox" aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-options`} aria-activedescendant={open ? `${id}-option-${active}` : undefined} aria-labelledby={labelledBy} aria-describedby={describedBy} aria-invalid={invalid || undefined} aria-required="true" className={`select-trigger ${!value ? 'is-placeholder' : ''}`} disabled={disabled} onKeyDown={keyboard} onClick={() => open ? setOpen(false) : openMenu()}><span>{selected >= 0 ? options[selected].label : 'Select a service'}</span><ChevronDown size={17} strokeWidth={1.5} /></button>
    {open && <div className="select-popover"><span className="select-caption">What would you like to work on?</span><ul id={`${id}-options`} role="listbox" aria-labelledby={labelledBy}>{options.map((option, index) => <li id={`${id}-option-${index}`} key={option.value} role="option" aria-selected={value === option.value} className={active === index ? 'is-active' : ''} onPointerMove={() => setActive(index)} onMouseDown={event => event.preventDefault()} onClick={() => choose(index)}><span><b>{option.label}</b>{option.description && <small>{option.description}</small>}</span>{value === option.value && <Check size={16} />}</li>)}</ul><span className="select-keyboard-hint">↑ ↓ to explore · Enter to select</span></div>}
  </div>;
}
