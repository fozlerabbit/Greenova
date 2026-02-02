// Navbar menu (mobile)
const toggleBtn = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("navMenu");

if (toggleBtn && navMenu) {
  toggleBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.tagName === "A") {
      navMenu.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Hero counters
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((el) => {
    const target = Number(el.getAttribute("data-count") || "0");
    let current = 0;
    const step = Math.max(1, Math.floor(target / 36));

    const tick = () => {
      current += step;
      if (current >= target) {
        el.textContent = String(target);
        return;
      }
      el.textContent = String(current);
      requestAnimationFrame(tick);
    };

    tick();
  });
}

// Run once when hero is visible
const hero = document.querySelector(".hero");
if (hero && "IntersectionObserver" in window) {
  const obs = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) {
      animateCounters();
      obs.disconnect();
    }
  }, { threshold: 0.2 });
  obs.observe(hero);
} else {
  animateCounters();
}

// Cost breakdown toggle
const toggleCost = document.getElementById("toggleCost");
const costBreakdown = document.getElementById("costBreakdown");

if (toggleCost && costBreakdown) {
  toggleCost.addEventListener("click", () => {
    const isHidden = costBreakdown.classList.toggle("hidden");
    toggleCost.textContent = isHidden ? "Show cost breakdown" : "Hide cost breakdown";
  });
}

// Kids quiz
const submitQuiz = document.getElementById("submitQuiz");
const quizResult = document.getElementById("quizResult");

function getRadioValue(name) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : "";
}

if (submitQuiz && quizResult) {
  submitQuiz.addEventListener("click", () => {
    const answers = {
      q1: "b",
      q2: "a",
      q3: "b"
    };

    const r1 = getRadioValue("q1");
    const r2 = getRadioValue("q2");
    const r3 = getRadioValue("q3");

    let score = 0;
    if (r1 === answers.q1) score++;
    if (r2 === answers.q2) score++;
    if (r3 === answers.q3) score++;

    if (!r1 || !r2 || !r3) {
      quizResult.textContent = "Please answer all questions first.";
      return;
    }

    const messages = [
      "Nice start. Keep learning and try again.",
      "Good work. You are becoming climate smart.",
      "Excellent. You are a Greenova climate champion."
    ];

    quizResult.textContent = `Score ${score} out of 3. ${messages[Math.max(0, score - 1)]}`;
  });
}

// Contact form (static demo)
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formNote.textContent = "Thanks. Your message is saved in your browser for now. For real submissions, connect a form tool.";
    contactForm.reset();
  });
}
