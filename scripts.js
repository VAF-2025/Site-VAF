// ==============================
// CONFIG
// ==============================
const CONFIG = {
    SCROLL_THRESHOLD: 50,
};

// ==============================
// SELECTORS
// ==============================
const SELECTORS = {
    navbar: "#navbar",
    mobileMenu: "#mobile-menu",
    mobileTrigger: ".aux-artigos-mobile-trigger",
    mobileSubmenu: ".aux-artigos-submenu-mobile",
    desktopSubmenuLinks: ".aux-artigos-submenu a",
    mobileSubmenuLinks: ".aux-artigos-submenu-mobile a",
};

// ==============================
// CLASS COMPONENT
// ==============================
class VAFSiteController {
    constructor() {
        this.DOM = {};
        this.init();
    }

    // Busca elementos frescos do DOM (resolve o problema de componentes dinâmicos)
    getElement(key) {
        if (!this.DOM[key]) {
            this.DOM[key] = document.querySelector(SELECTORS[key]);
        }
        return this.DOM[key];
    }

    // Força atualização das referências (útil após carregar componentes)
    refreshDOM() {
        this.DOM = {};
        Object.keys(SELECTORS).forEach(key => {
            this.DOM[key] = document.querySelector(SELECTORS[key]);
        });
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener("scroll", () => this.handleScroll());
        document.addEventListener("click", (e) => this.handleClickOutside(e));
        document.addEventListener("keydown", (e) => this.handleEscape(e));
    }

    toggleMenu() {
        const mobileMenu = document.querySelector(SELECTORS.mobileMenu);
        if (mobileMenu) {
            mobileMenu.classList.toggle("active");
        }
    }

    toggleArticlesSubmenu() {
        const submenu = document.querySelector(SELECTORS.mobileSubmenu);
        const trigger = document.querySelector(SELECTORS.mobileTrigger);

        if (!submenu || !trigger) return;

        submenu.classList.toggle("active");
        trigger.setAttribute("aria-expanded", submenu.classList.contains("active"));
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        section.scrollIntoView({ behavior: "smooth" });
        this.closeMenus();
    }

    closeMenus() {
        const mobileMenu = document.querySelector(SELECTORS.mobileMenu);
        const mobileSubmenu = document.querySelector(SELECTORS.mobileSubmenu);
        const mobileTrigger = document.querySelector(SELECTORS.mobileTrigger);

        if (mobileMenu) mobileMenu.classList.remove("active");
        if (mobileSubmenu) mobileSubmenu.classList.remove("active");
        if (mobileTrigger) mobileTrigger.setAttribute("aria-expanded", "false");
    }

    handleScroll() {
        const navbar = document.querySelector(SELECTORS.navbar);
        if (!navbar) return;
        
        if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    handleClickOutside(event) {
        const navbar = document.querySelector(SELECTORS.navbar);
        const mobileMenu = document.querySelector(SELECTORS.mobileMenu);
        
        if (!navbar || !mobileMenu) return;

        if (!navbar.contains(event.target) && mobileMenu.classList.contains("active")) {
            this.closeMenus();
        }
    }

    handleEscape(event) {
        if (event.key === "Escape") this.closeMenus();
    }

    handleSubmenuClick(e, link) {
        const href = link.getAttribute("href");
        if (href.startsWith("#")) {
            e.preventDefault();
            const id = href.substring(1);
            this.scrollToSection(id);
        }
    }
}

// Instância do controlador
window.VAF = new VAFSiteController();