(() => {
  const menuButton = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu-panel]");
  const search = document.querySelector("[data-search-dialog]");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (search?.open) search.close();
    if (menu && !menu.hidden) {
      menu.hidden = true;
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.focus();
    }
  });

  document.querySelector("[data-search-open]")?.addEventListener("click", () => {
    search?.showModal();
    search?.querySelector("input")?.focus();
  });
  document.querySelector("[data-search-close]")?.addEventListener("click", () => search?.close());
  search?.addEventListener("click", (event) => {
    if (event.target === search) search.close();
  });

  if (!reduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
  } else {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
  }

  const header = document.querySelector("[data-header]");
  addEventListener("scroll", () => header?.classList.toggle("is-compact", scrollY > 40), { passive: true });
})();
