// Utilidades compartidas por app.js y projects.js
const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

// Solo se aceptan enlaces https:// (evita esquemas peligrosos como "javascript:")
const safeUrl = (url) => (/^https:\/\//i.test(url) ? url : "#");
