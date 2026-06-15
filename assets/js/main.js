// ===== HEADER STICKY =====
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
});

// ===== MENU MOBILE =====
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  const toggle = document.createElement("button");
  toggle.innerHTML = "☰";
  toggle.classList.add("menu-toggle");
  toggle.setAttribute("aria-label", "Menu");
  header.querySelector(".logo").after(toggle);

  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.innerHTML = nav.classList.contains("open") ? "✕" : "☰";
  });

  // Fermer au clic sur un lien
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.innerHTML = "☰";
    });
  });
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal, .card").forEach(el => observer.observe(el));

// ===== COMPTEURS ANIMÉS =====
function animateCount(el, target, duration = 1800) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || "");
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      animateCount(el, parseInt(el.dataset.target), 1600);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-num[data-target]").forEach(el => counterObserver.observe(el));

// ===== FORMULAIRE =====
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = form.querySelector("button[type=submit]");
    const originalText = btn.textContent;
    const data = new FormData(form);

    btn.disabled = true;
    btn.textContent = "Envoi en cours...";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });

      if (res.ok) {
        btn.textContent = "Message envoyé ✓";
        btn.style.background = "#2ecc71";
        btn.style.color = "#fff";
        form.reset();
      } else {
        btn.textContent = "Erreur — réessayez";
        btn.style.background = "#e74c3c";
        btn.style.color = "#fff";
      }
    } catch {
      btn.textContent = "Erreur — vérifiez votre connexion";
      btn.style.background = "#e74c3c";
      btn.style.color = "#fff";
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
      btn.style.background = "";
      btn.style.color = "";
    }, 3000);
  });
}
