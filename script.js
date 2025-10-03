// Main JavaScript file
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dental Express საიტი ჩაიტვირთა!");

  // Mobile Navigation Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  // Add fade-in class to elements and observe them
  const elementsToAnimate = document.querySelectorAll(
    ".service-card, .team-member, .contact-item"
  );
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

  // Messenger button functionality
  const messengerBtn = document.getElementById("messengerBtn");
  messengerBtn.addEventListener("click", function () {
    // Open Facebook Messenger (replace with actual page URL)
    window.open("https://m.me/dentalexpress", "_blank");

    // Alternative: You can also integrate with other messaging platforms
    // window.open('https://wa.me/995321234567', '_blank'); // WhatsApp
    // window.open('viber://chat?number=995321234567', '_blank'); // Viber
  });

  // Contact form submission
  const appointmentForm = document.getElementById("appointmentForm");
  appointmentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(appointmentForm);
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Show success message (in a real application, you would send this to a server)
    alert(
      "გმადლობთ თქვენი ვიზიტის მოთხოვნისთვის! მალე დაგიკავშირდებით ვიზიტის დასადასტურებლად."
    );

    // Reset form
    appointmentForm.reset();

    // In a real application, you would send the data to your backend:
    // fetch('/api/appointments', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formObject)
    // });
  });

  // Header background change on scroll
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.backdropFilter = "blur(10px)";
    } else {
      header.style.background = "#fff";
      header.style.backdropFilter = "none";
    }
  });

  // Add click animation to buttons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      let ripple = document.createElement("span");
      ripple.classList.add("ripple");
      this.appendChild(ripple);

      let x = e.clientX - e.target.offsetLeft;
      let y = e.clientY - e.target.offsetTop;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      setTimeout(() => {
        ripple.remove();
      }, 300);
    });
  });
});

// Google Translate Integration
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "ka",
      includedLanguages: "ka,en,ru", // Georgian, English, Russian
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false,
    },
    "google_translate_element"
  );
}

// Additional messenger integrations
function openWhatsApp() {
  window.open(
    "https://wa.me/995321234567?text=გამარჯობა, მსურს ვიზიტის დაჯავშნა Dental Express-ში",
    "_blank"
  );
}

function openViber() {
  window.open("viber://chat?number=995321234567", "_blank");
}

function openTelegram() {
  window.open("https://t.me/dentalexpress", "_blank");
}

// Service worker registration for PWA capabilities (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function (registration) {
        console.log("ServiceWorker რეგისტრაცია წარმატებით დასრულდა");
      })
      .catch(function (error) {
        console.log("ServiceWorker რეგისტრაცია ვერ განხორციელდა");
      });
  });
}

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", function () {
  const heroTitle = document.querySelector(".hero-title");
  // Use the Georgian hero title explicitly (in case it's dynamically typed)
  const originalText = "დაგვეგმე Dental Express-ში";
  typeWriter(heroTitle, originalText, 80);
});
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
// create the scrollSmoother before your scrollTriggers
ScrollSmoother.create({
  smooth: 1.5, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  smoothTouch: 0.5, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
});
