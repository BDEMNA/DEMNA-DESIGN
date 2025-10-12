/* =========================
   SCRIPT PRINCIPAL - DEMNA DESIGN
   Fichier : script-index2.js
   ========================= */

document.addEventListener("DOMContentLoaded", function() {

  // ===== MENU BURGER =====
  const nav = document.querySelector("nav");
  const menu = document.querySelector("nav ul");

  // Création du bouton burger
  const burger = document.createElement("div");
  burger.classList.add("burger");
  burger.innerHTML = "&#9776;"; // icône ☰
  nav.insertBefore(burger, menu);

  // Clic sur le burger -> toggle menu
  burger.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  // Fermer le menu après clic sur un lien
  document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("show");
    });
  });

  // ===== DÉFILEMENT FLUIDE =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 60, // ajuste pour la navbar fixe
          behavior: "smooth"
        });
      }
    });
  });

  // ===== ANIMATION AU SCROLL =====
  const sections = document.querySelectorAll("section");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85; // seuil d'apparition
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < triggerBottom) {
        section.classList.add("visible");
      }
    });
  };

  // Lancer au scroll et au chargement
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

});
