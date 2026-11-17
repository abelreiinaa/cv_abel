const content = document.querySelector("#content");
const tabs = document.querySelectorAll('[role="tab"]');

const contactIcon = (name) => {
  const icons = {
    location: '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z"></path><circle cx="12" cy="9" r="2.2"></circle></svg>',
    linkedin: '<span class="contact-icon contact-icon--linkedin" aria-hidden="true">in</span>',
    github: '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.3 11.3 0 0 0-3.6 22c.6.1.8-.3.8-.6v-2.2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.1 1.9 2.8 1.3.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-3 0 0 .9-.3 3.1 1.1a10.7 10.7 0 0 1 5.6 0c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.7.1 3 .7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.4.7 1 .7 2v3c0 .3.2.7.8.6A11.3 11.3 0 0 0 12 .7Z"></path></svg>',
    phone: '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"></path></svg>',
    email: '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m3 7 9 6 9-6"></path></svg>',
    birthDate: '<svg class="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"></rect><path d="M16 3v4M8 3v4M3 10h18"></path></svg>'
  };
  return icons[name];
};

const renderContact = (hero) => {
  document.querySelector("#profile-name").textContent = hero.name;
  document.querySelector("#profile-profession").textContent = hero.profession;
  document.querySelector("#biography").textContent = hero.aboutMe;
  document.querySelector("#personal-data").innerHTML = `
    <div>${contactIcon("phone")}${escapeHtml(hero.phone)}</div>
    <div>${contactIcon("email")}<a href="mailto:${escapeHtml(hero.email)}">${escapeHtml(hero.email)}</a></div>
    <div>${contactIcon("location")}${escapeHtml(hero.city)}</div>
    <div>${contactIcon("linkedin")}<a href="${escapeHtml(safeUrl(hero.linkedin))}" target="_blank" rel="noopener">LinkedIn</a></div>
    <div>${contactIcon("github")}<a href="${escapeHtml(safeUrl(hero.github))}" target="_blank" rel="noopener">GitHub</a></div>
    <div>${contactIcon("birthDate")}${escapeHtml(hero.birthDate)}</div>
  `;
};

const renderTimeline = (title, items, includeDescription = false) => `
  <h2 class="content-title">${title}</h2>
  <div class="timeline">
    ${items.map((item) => `
      <article class="timeline-item">
        <time>${escapeHtml(item.date)}</time>
        <h3>${escapeHtml(includeDescription ? item.where : item.name)}</h3>
        ${includeDescription
          ? `<h4>${escapeHtml(item.name)}</h4><p>${escapeHtml(item.description)}</p>`
          : `<p>${escapeHtml(item.where)}</p>`}
      </article>
    `).join("")}
  </div>
`;

const renderTechnologies = (technologies) => `
  <h2 class="content-title">⌨ Tecnologías</h2>
  <div class="technology-grid">
    ${Object.entries(technologies).map(([name, values]) => `
      <article class="technology-card">
        <h3>${escapeHtml(name)}</h3>
        <ul class="technology-list">
          ${values.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}
        </ul>
      </article>
    `).join("")}
  </div>
`;

// Cada sección: su slug para la URL (#experiencia) y la función que genera su HTML
const sections = {
  education:    { slug: "formacion",   html: (cv) => renderTimeline("🎓 Formación", cv.education) },
  experience:   { slug: "experiencia", html: (cv) => renderTimeline("🧰 Experiencia", cv.experience, true) },
  technologies: { slug: "tecnologias", html: (cv) => renderTechnologies(cv.technologies) }
};

const sectionFromHash = () =>
  Object.keys(sections).find((key) => sections[key].slug === location.hash.slice(1)) || "education";

const start = async () => {
  const response = await fetch("data/cv.json");
  if (!response.ok) {
    throw new Error(`No se pudo cargar data/cv.json (${response.status})`);
  }
  const cv = await response.json();
  let active = sectionFromHash();

  const showSection = (section, updateHash = false) => {
    active = section;
    tabs.forEach((tab) => {
      const isActive = tab.dataset.section === section;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      if (isActive) content.setAttribute("aria-labelledby", tab.id);
    });
    content.innerHTML = sections[section].html(cv);
    if (updateHash) history.replaceState(null, "", `#${sections[section].slug}`);
  };

  renderContact(cv.hero);
  showSection(active);
  tabs.forEach((tab) => tab.addEventListener("click", () => showSection(tab.dataset.section, true)));
  window.addEventListener("hashchange", () => showSection(sectionFromHash()));

};

start().catch((error) => {
  content.innerHTML = `<p role="alert">No se ha podido cargar el currículum. ${escapeHtml(error.message)}</p>`;
  console.error(error);
});
