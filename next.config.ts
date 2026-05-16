/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Transpile ESM-only packages so Next.js can bundle them correctly
  transpilePackages: ['react-markdown', 'remark-gfm', 'remark-parse', 'unified', 'bail', 'is-plain-obj', 'trough', 'vfile', 'vfile-message', 'unist-util-stringify-position', 'mdast-util-from-markdown', 'mdast-util-to-string', 'micromark', 'decode-named-character-reference', 'character-entities', 'mdast-util-to-hast', 'trim-lines', 'unist-util-is', 'unist-util-visit', 'unist-util-visit-parents', 'hast-util-to-jsx-runtime', 'hast-util-whitespace', 'property-information', 'space-separated-tokens', 'comma-separated-tokens', 'estree-util-is-identifier-name'],
}

module.exports = nextConfig