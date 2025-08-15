async function loadProjects() {
    const res = await fetch('data/projects.json');
    const projects = await res.json();
    const container = document.getElementById('project-list');
    if (container) {
        projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `<img src="${p.image}" alt="${p.title}"><h3>${p.title}</h3>`;
            card.onclick = () => window.location = `project.html?slug=${p.slug}`;
            container.appendChild(card);
        });
    }

    const detailContainer = document.getElementById('project-detail');
    if (detailContainer) {
        const params = new URLSearchParams(window.location.search);
        const slug = params.get('slug');
        const project = projects.find(p => p.slug === slug);
        if (project) {
            detailContainer.innerHTML = `<h1>${project.title}</h1><p>${project.description}</p><img src="${project.image}">`;
        }
    }
}
loadProjects();
