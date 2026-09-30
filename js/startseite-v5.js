/* dghd – Startseite V5 */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Seitenleiste: Aufklappen und Fächer ---------- */
  var sidebar = document.querySelector("[data-sidebar]");
  var sidenav = document.querySelector("[data-sidenav]");
  var scrim = document.querySelector("[data-sn-scrim]");
  var desktopNav = window.matchMedia("(min-width: 981px)");

  function setOpen(btn, open) {
    btn.setAttribute("aria-expanded", String(open));
    document.getElementById(btn.getAttribute("aria-controls")).hidden = !open;
    // beim Schließen auch alle tieferen Ebenen schließen
    if (!open) {
      btn.parentElement.querySelectorAll(".sn-toggle[aria-expanded='true']").forEach(function (b) { setOpen(b, false); });
    }
  }

  function closeAll() {
    sidenav.querySelectorAll(".sn-list > li > .sn-toggle[aria-expanded='true']").forEach(function (b) { setOpen(b, false); });
  }

  if (sidenav) {
    sidenav.addEventListener("click", function (e) {
      var btn = e.target.closest(".sn-toggle");
      if (!btn) return;
      var open = btn.getAttribute("aria-expanded") !== "true";
      // pro Ebene ist immer nur ein Bereich offen
      Array.prototype.forEach.call(btn.closest("ul").children, function (li) {
        var other = li.querySelector(":scope > .sn-toggle");
        if (other && other !== btn && other.getAttribute("aria-expanded") === "true") setOpen(other, false);
      });
      setOpen(btn, open);
      // per Tastatur geöffnete Fächer: Fokus auf den ersten Eintrag
      if (open && e.detail === 0 && btn.parentElement.getAttribute("data-kind") === "fan" && desktopNav.matches) {
        var first = document.getElementById(btn.getAttribute("aria-controls")).querySelector("a, .sn-toggle");
        if (first) first.focus();
      }
    });
  }

  /* ---------- Seitenleiste: Zielgruppen-Filter „Zeigen für“ ---------- */
  var filterBtns = document.querySelectorAll("[data-zg-filter]");

  function matches(li, z) {
    var zg = li.getAttribute("data-zg");
    if (!zg || zg.indexOf(z) >= 0) return true;
    return Array.prototype.some.call(li.querySelectorAll("li[data-zg]"), function (c) {
      var cz = c.getAttribute("data-zg");
      return cz && cz.indexOf(z) >= 0;
    });
  }

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var z = btn.getAttribute("data-zg-filter");
      filterBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      sidenav.querySelectorAll("li[data-zg]").forEach(function (li) {
        li.classList.toggle("is-dimmed", !!z && !matches(li, z));
      });
    });
  });

  /* ---------- Seitenleiste: Schublade, standardmäßig geschlossen (Desktop: schmale Leiste, mobil: Menü-Knopf) ---------- */
  var sidebarToggles = document.querySelectorAll("[data-sidebar-toggle]");
  var sidebarClose = document.querySelector("[data-sidebar-close]");
  var returnFocus = null;

  function closeNav() { setDrawer(false); }

  function setDrawer(open, opener) {
    sidebar.classList.toggle("is-open", open);
    sidebarToggles.forEach(function (b) { b.setAttribute("aria-expanded", String(open)); });
    scrim.hidden = !open;
    document.body.classList.toggle("has-menu", open);
    if (open) {
      returnFocus = opener || null;
      sidebarClose.focus();
    } else {
      closeAll();
      if (returnFocus) returnFocus.focus();
    }
  }

  if (sidebarToggles.length && sidebar) {
    sidebarToggles.forEach(function (btn) {
      btn.addEventListener("click", function () { setDrawer(!sidebar.classList.contains("is-open"), btn); });
    });
    // Bereichs-Icons der schmalen Leiste: Navigation öffnen und den Bereich gleich aufklappen
    document.querySelectorAll("[data-rail-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setDrawer(true, btn);
        var area = sidenav.querySelector(".sn-list > li:nth-child(" + btn.getAttribute("data-rail-open") + ") > .sn-toggle");
        if (area && area.getAttribute("aria-expanded") !== "true") area.click();
        if (area) area.focus();
      });
    });
    sidebarClose.addEventListener("click", function () { setDrawer(false); });
    scrim.addEventListener("click", closeNav);
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    // Escape schließt zuerst die tiefste offene Ebene, dann die Schublade
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !sidebar.classList.contains("is-open")) return;
      var openBtns = sidenav.querySelectorAll(".sn-toggle[aria-expanded='true']");
      if (openBtns.length) {
        var last = openBtns[openBtns.length - 1];
        setOpen(last, false);
        last.focus();
      } else {
        setDrawer(false);
      }
    });
    // Wechsel zwischen Desktop und Mobil: offene Schublade/Fächer zurücksetzen
    desktopNav.addEventListener("change", function () {
      if (sidebar.classList.contains("is-open")) setDrawer(false);
      closeAll();
      scrim.hidden = true;
    });
  }

  /* ---------- Suche ---------- */
  var searchDialog = document.querySelector("[data-search-dialog]");
  var searchClose = document.querySelector("[data-search-close]");
  if (searchDialog && typeof searchDialog.showModal === "function") {
    document.querySelectorAll("[data-search-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (sidebar && sidebar.classList.contains("is-open")) closeNav();
        searchDialog.showModal();
        searchDialog.querySelector("input").focus();
      });
    });
    searchClose.addEventListener("click", function () { searchDialog.close(); });
    searchDialog.addEventListener("click", function (e) {
      if (e.target === searchDialog) searchDialog.close();
    });
  }

  /* ---------- Zielgruppen-Pinnwand ---------- */
  var pinboard = document.querySelector("[data-pinboard]");
  var pbCards = pinboard ? Array.prototype.slice.call(pinboard.querySelectorAll(".pb-card")) : [];

  // Karte der gewählten Zielgruppe hervorheben (gerade aufgerichtet, goldener Rand)
  function pickCard(id) {
    var card = null;
    pbCards.forEach(function (c) {
      var on = c.id === id;
      c.classList.toggle("is-picked", on);
      if (on) card = c;
    });
    return card;
  }

  if (pbCards.length) {
    pickCard(location.hash.slice(1));

    // Einstiege im Hero scrollen zur Pinnwand und heben die passende Karte hervor
    document.querySelectorAll("[data-audience-link]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href").slice(1);
        var card = pickCard(id);
        if (!card) return;
        e.preventDefault();
        history.pushState(null, "", "#" + id);
        document.getElementById("fuer-sie").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
        card.focus({ preventScroll: true });
      });
    });

    window.addEventListener("hashchange", function () { pickCard(location.hash.slice(1)); });
  }

  var finePointer = window.matchMedia("(pointer: fine)").matches;

  /* ---------- Hero: Einstiege und Stationen der Illustration verknüpfen ---------- */
  var hero = document.querySelector("[data-hero]");
  if (hero) {
    var stations = hero.querySelectorAll("[data-station]");
    var current = 0;
    var paused = false;
    var heroVisible = true;

    var activate = function (n) {
      current = Number(n);
      stations.forEach(function (el) {
        el.classList.toggle("is-active", el.getAttribute("data-station") === String(n));
      });
    };

    // Hover/Fokus auf Kachel oder Station hebt das Gegenstück hervor
    var enter = function (e) {
      var el = e.target.closest("[data-station]");
      if (!el) return;
      paused = true;
      activate(el.getAttribute("data-station"));
    };
    var leave = function (e) {
      var el = e.target.closest("[data-station]");
      if (!el || (e.relatedTarget && el.contains(e.relatedTarget))) return;
      paused = false;
    };
    hero.addEventListener("mouseover", enter);
    hero.addEventListener("focusin", enter);
    hero.addEventListener("mouseout", leave);
    hero.addEventListener("focusout", leave);

    // Ohne Interaktion wandert die Hervorhebung durch die fünf Stationen (4 Zielgruppen + Austausch)
    if (!reduceMotion) {
      if ("IntersectionObserver" in window) {
        new IntersectionObserver(function (entries) {
          heroVisible = entries[0].isIntersecting;
        }).observe(hero);
      }
      setTimeout(function () { if (!paused) activate(1); }, 900);
      setInterval(function () {
        if (paused || !heroVisible || document.hidden) return;
        activate((current % 5) + 1);
      }, 2800);
    }

  }

  /* ---------- Lichtkegel auf Kacheln ---------- */
  if (finePointer) {
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest && e.target.closest("[data-spot]");
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (e.clientX - r.left) + "px");
      el.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* ---------- Scroll-Reveal ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.1 });

  revealItems.forEach(function (el) { io.observe(el); });
})();
