async function loadComponent(name, element) {
    try {
        const response = await fetch(`../components/${name}.html`);
        const html = await response.text();
        element.innerHTML = html;

        // reativar o controlador da navbar
        if (name === "header" || name === "navbar") {
            if (window.VAF) window.VAF.init();
        }

    } catch (err) {
        console.error("Erro ao carregar componente:", name, err);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-component]").forEach(el => {
        const componentName = el.getAttribute("data-component");
        loadComponent(componentName, el);
    });
});
