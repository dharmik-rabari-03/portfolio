AOS.init({ once: true, duration: 600, offset: 40 });

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");
const html = document.documentElement;

function setTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeIcon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
}

function getPreferredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

setTheme(getPreferredTheme());

themeToggle.addEventListener("click", () => {
  const current = html.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// ===== NAVBAR: close mobile menu on link click =====
const navbarCollapse = document.getElementById("navbarNav");
const navLinks = document.querySelectorAll(".nav-link");
const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navbarCollapse.classList.contains("show")) {
      bsCollapse.hide();
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function getSectionId(link) {
  const href = link.getAttribute("href");
  return href ? href.replace("#", "") : "";
}

const sections = Array.from(navLinks).map(link => {
  const id = getSectionId(link);
  const el = document.getElementById(id);
  if (!el && id === "home") {
    return { id, el: document.querySelector(".section-hero") };
  }
  return { id, el };
}).filter(s => s.el);

function updateActiveLink() {
  let current = "";
  const scrollY = window.scrollY + 120;

  for (const s of sections) {
    const top = s.el.offsetTop;
    const bottom = top + s.el.offsetHeight;
    if (scrollY >= top && scrollY < bottom) {
      current = s.id;
      break;
    }
  }

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

// ===== NAVBAR SHADOW ON SCROLL =====
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

// ===== TYPED TEXT ROTATION =====
const typedEl = document.getElementById("typed-text");
const roles = [
  "Full Stack Applications",
  "Scalable APIs",
  "Responsive Interfaces",
  "Clean Architecture",
  "End-to-End Solutions"
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 2000);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeEffect, 400);
    return;
  }

  setTimeout(typeEffect, isDeleting ? 40 : 80);
}

setTimeout(typeEffect, 500);

// ===== ANIMATED COUNTERS =====
const counters = document.querySelectorAll(".counter");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-target"));
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll(".skill-bar-fill");

skillBars.forEach(bar => {
  const match = bar.getAttribute("style") || "";
  const widthMatch = match.match(/width:\s*(\d+)%/);
  if (widthMatch) {
    bar.dataset.targetWidth = widthMatch[1];
    bar.style.width = "0";
  }
});

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      if (bar.dataset.targetWidth) {
        bar.style.width = bar.dataset.targetWidth + "%";
      }
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

// ===== EMAILJS =====
const contactForm = document.getElementById("contact-form");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

  emailjs.send(
    "service_mxdgmiu",
    "template_jicbzu5",
    {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value
    },
    { publicKey: "pj8wIiBzPo2npZ1gu" }
  )
  .then(() => {
    alert("Message sent successfully!");
    contactForm.reset();
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled = false;
  })
  .catch((error) => {
    console.log(error);
    alert("Failed to send message. Please try again.");
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    submitBtn.disabled = false;
  });
});
