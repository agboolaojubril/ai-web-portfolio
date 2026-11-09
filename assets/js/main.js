(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = nav ? Array.from(nav.querySelectorAll("a")) : [];

  const setNavOpen = (open) => {
    if (!header || !navToggle) return;
    header.classList.toggle("nav-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      setNavOpen(!header.classList.contains("nav-open"));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && header && header.classList.contains("nav-open")) {
      setNavOpen(false);
      if (navToggle) navToggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!header || !header.classList.contains("nav-open")) return;
    if (!header.contains(event.target)) setNavOpen(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 720) setNavOpen(false);
  });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const revealEls = Array.from(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window && revealEls.length) {
    revealEls.forEach((el) => {
      const siblings = Array.from(el.parentElement ? el.parentElement.children : []).filter(
        (child) => child.classList && child.classList.contains("reveal")
      );
      const index = siblings.indexOf(el);
      if (index > 0) {
        el.style.setProperty("--reveal-delay", `${Math.min(index * 70, 210)}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
})();
