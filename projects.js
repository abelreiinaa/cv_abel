const grid = document.querySelector("#projects");

const projectCard = (p) => `
  <article class="project-card">
    <h2>${escapeHtml(p.name)}</h2>
    <p>${escapeHtml(p.description)}</p>
    ${p.tags ? `<ul class="technology-list project-tags">${p.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>` : ""}
    ${p.preview ? `<iframe class="project-preview" src="${escapeHtml(safeUrl(p.url))}" title="Vista previa de ${escapeHtml(p.name)}" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups"></iframe>` : ""}
    <div class="project-card__actions">
      <a class="project-card__link" href="${escapeHtml(safeUrl(p.url))}" target="_blank" rel="noopener noreferrer">Abrir proyecto</a>
      ${p.repo ? `<a class="project-card__link" href="${escapeHtml(safeUrl(p.repo))}" target="_blank" rel="noopener noreferrer">Ver código</a>` : ""}
    </div>
  </article>
`;

fetch("data/cv.json")
  .then((response) => {
    if (!response.ok) throw new Error(`No se pudo cargar data/cv.json (${response.status})`);
    return response.json();
  })
  .then((cv) => { grid.innerHTML = cv.projects.map(projectCard).join(""); })
  .catch((error) => {
    grid.innerHTML = `<p role="alert">No se han podido cargar los proyectos. ${escapeHtml(error.message)}</p>`;
    console.error(error);
  });
