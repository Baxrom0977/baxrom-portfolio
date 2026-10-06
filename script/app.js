const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  const navLinks = document.querySelectorAll(".list__link");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

const themeToggle = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const isDark = document.body.classList.contains("dark-theme");

    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}

function observeOnScroll(selector, threshold = 0.5) {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold,
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

observeOnScroll(".section-title-animate");

observeOnScroll(".project-card");
observeOnScroll(".mini-card", 0.6);

observeOnScroll(".about__visual, .about__content");
observeOnScroll(".contact__content, .contact__decoration");

observeOnScroll(".projects-hero__content");
observeOnScroll(".featured-projects__header");
observeOnScroll(".featured-project");
observeOnScroll(".all-projects__header");
observeOnScroll(".project-small-card", 0.2);
observeOnScroll(".projects-cta__inner");

observeOnScroll(".mini-page-hero__content");
observeOnScroll(".mini-page-projects__header");
observeOnScroll(".mini-page-card", 0.15);
observeOnScroll(".mini-page-cta__inner");


