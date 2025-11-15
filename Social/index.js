// Root entry for Render/Node. Delegates to the Server app.

// Use dynamic import so this file can be CommonJS while the Server is ESM.
import('./Server/index.js').catch((err) => {
  console.error('Failed to start Server/index.js:', err);
  process.exit(1);
});
