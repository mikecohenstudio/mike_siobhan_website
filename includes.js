// includes.js
async function inject(selector, url) {
  const el = document.querySelector(selector);
  if (!el) return null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(res.status + " " + res.statusText);
    el.innerHTML = await res.text();
    return el;
  } catch (e) {
    console.error("Include failed for", url, e);
    return null;
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Inject header first so elements exist
  await inject("#site-header", "./partials/header.html");
  await inject("#site-footer", "./partials/footer.html");

  // Wire up hamburger
  const navToggle = document.getElementById("hamburger"); // matches your header.html
  const nav = document.getElementById("site-nav");

  if (!navToggle || !nav) return;

  // Ensure correct initial state by viewport
  const mq = window.matchMedia("(max-width: 900px)");
  function apply() {
    if (mq.matches) {
      // tablet/mobile
      navToggle.style.display = "flex";
      if (!nav.classList.contains("active")) nav.style.display = "none";
    } else {
      // desktop
      navToggle.style.display = "none";
      nav.classList.remove("active");
      nav.style.display = "flex";
    }
  }
  apply();
  (mq.addEventListener ? mq.addEventListener("change", apply) : mq.addListener(apply));

  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("active");
    navToggle.classList.toggle("active", open);
    nav.style.display = open ? "flex" : "none";
  });
});
