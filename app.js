document.addEventListener("DOMContentLoaded", () => {
  // Ensure page loads at the top
  window.history.scrollRestoration = "manual";
  window.scrollTo(0, 0);

  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 100);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.1 },
  );
  document.querySelectorAll(".slide-up").forEach((el) => observer.observe(el));

  const header = document.getElementById("header");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  const scrollProgressBar = document.getElementById("scroll-progress-bar");
  const cursorGlow = document.getElementById("cursor-glow");
  const customCursor = document.getElementById("custom-cursor");

  // --- Scroll-based UI updates ---
  function handleScroll() {
    // Header background
    header.classList.toggle("bg-black/80", window.scrollY > 50);

    // Scroll to top button visibility
    const shouldBeVisible = window.scrollY > 300;
    scrollTopBtn.classList.toggle("opacity-100", shouldBeVisible);
    scrollTopBtn.classList.toggle("pointer-events-auto", shouldBeVisible);

    // Scroll progress bar
    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    scrollProgressBar.style.height = `${scrollPercent}%`;
  }

  window.addEventListener("scroll", handleScroll);

  // --- Cursor Effects ---
  window.addEventListener("mousemove", (e) => {
    requestAnimationFrame(() => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
      customCursor.style.left = `${e.clientX}px`;
      customCursor.style.top = `${e.clientY}px`;
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    });
  });

  const clickableElements = document.querySelectorAll("a, button");
  clickableElements.forEach((el) => {
    el.addEventListener("mouseenter", () =>
      customCursor.classList.add("pointer"),
    );
    el.addEventListener("mouseleave", () =>
      customCursor.classList.remove("pointer"),
    );
  });

  // --- Mobile Menu ---
  mobileMenuBtn.addEventListener("click", () =>
    mobileMenu.classList.toggle("hidden"),
  );

  // --- Tabbed Content & Navigation ---
  const contentSections = {
    features: document.getElementById("features"),
    manual: document.getElementById("manual"),
    docs: document.getElementById("docs"),
  };

  function switchTab(tabName) {
    Object.values(contentSections).forEach((section) =>
      section.classList.remove("active"),
    );
    if (contentSections[tabName]) {
      contentSections[tabName].classList.add("active");
    }
    mobileMenu.classList.add("hidden");
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const targetId = href.substring(1);

      if (targetId === "manual" || targetId === "docs") {
        e.preventDefault();
        switchTab(targetId);
        const targetElement = document.getElementById("main-content");
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      } else if (targetId === "features") {
        switchTab(targetId);
      }
    });
  });

  // Set initial state without scrolling
  switchTab("features");

  // --- Scroll to Top Button ---
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

function handledownload() {
  window.open("https://aditya2317.itch.io/cable", "_blank");
}
