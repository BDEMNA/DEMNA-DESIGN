/* =========================
   SCRIPT PRINCIPAL - DEMNA DESIGN
   Fichier : script-index2.js
   ========================= */

document.addEventListener("DOMContentLoaded", function() {

  // ===== NAVBAR & BURGER =====
  const nav = document.querySelector("nav");
  const menu = document.querySelector("nav ul");

  // Crée le bouton burger si absent
  let burger = document.querySelector(".burger");
  if (!burger) {
    burger = document.createElement("button");
    burger.classList.add("burger");
    burger.setAttribute("aria-label", "Ouvrir le menu");
    burger.setAttribute("aria-expanded", "false");
    burger.innerHTML = "&#9776;"; // icône ☰
    nav.insertBefore(burger, menu);
  }
/*VERSION PC MOBILE*/
/* Mode ordinateur simulé */
.desktop-mode {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  transform: scale(0.9);
  transform-origin: top center;
  transition: all 0.4s ease-in-out; /* transition fluide */
}

  // Toggle menu
  const toggleMenu = () => {
    const isOpen = menu.classList.toggle("show");
    burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };
  burger.addEventListener("click", toggleMenu);

  // Fermer le menu après clic sur un lien
  document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // Fermer le menu avec Echap
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      menu.classList.remove("show");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  // ===== DÉFILEMENT FLUIDE (ancre) =====
  const OFFSET = 60; // hauteur approximative de la navbar
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const topPos = window.scrollY + target.getBoundingClientRect().top - OFFSET;
        window.scrollTo({ top: topPos, behavior: "smooth" });
      }
    });
  });

  // ===== RÉVÉLATION DES SECTIONS AU SCROLL =====
  const sections = document.querySelectorAll("section");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    sections.forEach(section => {
      const rectTop = section.getBoundingClientRect().top;
      if (rectTop < triggerBottom) {
        section.classList.add("visible");
      }
    });
  };

  // Throttle simple pour le scroll (performance)
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        revealOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  revealOnScroll(); // au chargement

  // ===== FAQ ACCORDÉON =====
  // Structure attendue: .faq-item > h3 + p
  const faqItems = document.querySelectorAll("#faq .faq-item");
  faqItems.forEach(item => {
    const question = item.querySelector("h3");
    const answer = item.querySelector("p");

    if (question && answer) {
      // Styles init via JS (si tu préfères, mets en CSS avec max-height)
      answer.style.maxHeight = "0px";
      answer.style.overflow = "hidden";
      answer.style.transition = "max-height 0.3s ease";

      // État
      let open = false;

      const toggleFaq = () => {
        open = !open;
        item.classList.toggle("open", open);
        answer.style.maxHeight = open ? answer.scrollHeight + "px" : "0px";
      };

      // Click
      question.style.cursor = "pointer";
      question.setAttribute("role", "button");
      question.setAttribute("tabindex", "0");
      question.setAttribute("aria-expanded", "false");

      question.addEventListener("click", () => {
        toggleFaq();
        question.setAttribute("aria-expanded", open ? "true" : "false");
      });

      // Accessibilité: Enter/Space
      question.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFaq();
          question.setAttribute("aria-expanded", open ? "true" : "false");
        }
      });
    }
  });

  // ===== AMÉLIORATION: gestion du resize pour FAQ =====
  // Recalcule la hauteur si la fenêtre change (pour éviter coupures)
  window.addEventListener("resize", () => {
    document.querySelectorAll("#faq .faq-item.open p").forEach(answer => {
      answer.style.maxHeight = answer.scrollHeight + "px";
    });
  });

});

