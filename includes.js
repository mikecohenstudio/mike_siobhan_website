// includes.js
async function inject(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status + " " + res.statusText);
    const html = await res.text();
    el.innerHTML = html;
    return el; // allow awaiting injection completion
  } catch (e) {
    console.error("Include failed for", url, e);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Inject header first so we can safely wire up the menu
  await inject("#site-header", "./partials/header.html");
  await inject("#site-footer", "./partials/footer.html");

  // Hamburger menu toggle (runs AFTER header exists)
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }
});
