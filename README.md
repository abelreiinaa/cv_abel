# Currículum web · Abel Miñón Reina

CV interactivo hecho con **HTML, CSS y JavaScript puro**. Los datos viven en `data/cv.json` y se pintan con JS, así que actualizar el CV es editar un solo archivo.

## Características
- Secciones **Formación, Experiencia y Tecnologías** con enlaces directos (`#experiencia`).
- Botón **Proyectos**: enlaza a mi portfolio en Weebly (https://abelminonreina.weebly.com/).
- Botón **Descargar CV (PDF)**: descarga el PDF disponible en `public/cv-abel-minon-reina.pdf`.
- **Seguridad**: se escapa todo el HTML inyectado, solo se admiten enlaces `https://` y política de seguridad de contenido (CSP).
- Accesible y responsive: pestañas con roles ARIA, foco visible y diseño adaptable.

## Estructura
```
├── index.html
├── styles.css
├── utils.js      # escapeHtml y safeUrl
├── app.js        # lógica del CV
├── data/cv.json  # todos los datos
├── public/       # favicons y PDF descargable
└── src/images/   # foto
```

## Ejecutarlo
Necesita un servidor local porque usa `fetch`: abre la carpeta con la extensión **Live Server** de VS Code. No funciona haciendo doble clic en `index.html`.
