// მთავარი JavaScript ფაილი
document.addEventListener("DOMContentLoaded", function () {
  console.log("Dental Express ვებსაიტი ჩაიტვირთა!");

  // მობილური ნავიგაციის ტოგლი
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // მობილური მენიუს დახურვა ლინკზე დაჭერისას
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // ნაზი სქროლინგი ნავიგაციის ლინკებისთვის
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

  // საკონტაქტო ფორმის დამუშავება
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // ფორმის მონაცემების მიღება
      const formData = new FormData(this);
      const name =
        formData.get("name") || this.querySelector('input[type="text"]').value;
      const email =
        formData.get("email") ||
        this.querySelector('input[type="email"]').value;
      const phone =
        formData.get("phone") || this.querySelector('input[type="tel"]').value;
      const service =
        formData.get("service") || this.querySelector("select").value;
      const date =
        formData.get("date") || this.querySelector('input[type="date"]').value;
      const message =
        formData.get("message") || this.querySelector("textarea").value;

      // მარტივი ვალიდაცია
      if (!name || !email || !phone) {
        alert("გთხოვთ შეავსოთ ყველა სავალდებულო ველი.");
        return;
      }

      // ფორმის გაგზავნის იმიტაცია
      alert(
        `მადლობა, ${name}! თქვენი ვიზიტის მოთხოვნა წარმატებით გაიგზავნა. ჩვენ დაგიკავშირდებით მალე ${email} ან ${phone} მისამართზე.`
      );

      // ფორმის გასუფთავება
      this.reset();
    });
  }

  // ღილაკებისთვის რიპლ ეფექტის შექმნა
  function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  }

  // რიპლ ეფექტის დამატება ღილაკებზე
  document
    .querySelectorAll(".btn, .service-card, .team-member, .price-card")
    .forEach((button) => {
      button.addEventListener("click", createRipple);
    });

  // სქროლის ანიმაციები
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

  // ელემენტების დაკვირვება სქროლის ანიმაციებისთვის
  document
    .querySelectorAll(
      ".service-card, .team-member, .price-card, .gallery-item, .contact-item"
    )
    .forEach((el) => {
      el.classList.add("fade-in");
      observer.observe(el);
    });

  // ჰედერის სქროლის ეფექტი
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 12px 40px rgba(102, 126, 234, 0.2)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 8px 32px rgba(0,0,0,0.1)";
    }
    lastScrollY = window.scrollY;
  });

  // გალერეის ელემენტების კლიკის დამუშავება
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", function () {
      const overlay = this.querySelector(".gallery-overlay");
      if (overlay) {
        const title = overlay.querySelector("h4").textContent;
        const description = overlay.querySelector("p").textContent;
        alert(
          `${title}\n\n${description}\n\nდაგვიკავშირდით ჩვენი კლინიკის ტურისთვის!`
        );
      }
    });
  });

  // Google Translate-ის ინიციალიზაცია
  function googleTranslateElementInit() {
    new google.translate.TranslateElement(
      {
        pageLanguage: "ka",
        includedLanguages: "ka,en,ru,es,fr,de,it",
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        autoDisplay: false,
      },
      "google_translate_element"
    );
  }

  // Google Translate სკრიპტის ჩატვირთვა
  if (!window.googleTranslateElementInit) {
    window.googleTranslateElementInit = googleTranslateElementInit;
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.head.appendChild(script);
  }
});

// მესენჯერის ღილაკის ფუნქციონალობა
function openMessenger() {
  // შეგიძლიათ ეს შეცვალოთ რეალური Facebook Messenger ინტეგრაციით
  const messengerUrl = "https://m.me/your-facebook-page";

  // დემო მიზნებისთვის, გამოჩნდება ალერტი
  alert(
    "მოგესალმებით Dental Express-ში!\n\nჩვენ მზად ვართ დაგეხმაროთ თქვენი სტომატოლოგიური საჭიროებების დაკმაყოფილებაში:\n\n• დაგვირეკეთ: +995 32 123 4567\n• მოგვწერეთ: info@dentalexpress.ge\n• დაჯავშნეთ ვიზიტი ჩვენი საკონტაქტო ფორმის მეშვეობით\n\nჩვენი გუნდი აქ არის, რომ მოგცეთ საუკეთესო სტომატოლოგიური მომსახურება!"
  );

  // გააქტიურეთ ეს ხაზი რეალური მესენჯერისთვის (შეცვალეთ თქვენი გვერდის URL-ით)
  // window.open(messengerUrl, '_blank');
}

// რუკის ფუნქციონალობა
function openDirections() {
  const address = "რუსთაველის გამზირი 123, თბილისი, საქართველო";
  const encodedAddress = encodeURIComponent(address);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
  window.open(mapsUrl, "_blank");
}

function callOffice() {
  window.location.href = "tel:+995321234567";
}

// დამატებითი ინტერაქტიული ფუნქციები
document.addEventListener("DOMContentLoaded", function () {
  // ჰოვერის ხმოვანი ეფექტი (არასავალდებულო)
  const hoverElements = document.querySelectorAll(
    ".btn, .service-card, .team-member, .nav-link"
  );

  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", function () {
      // აქ შეგიძლიათ დაამატოთ ხმოვანი ეფექტები საჭიროების შემთხვევაში
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });
  });

  // ჰეროს სათაურისთვის ტაიპინგის ეფექტი (არასავალდებულო გაუმჯობესება)
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    let index = 0;

    // გააქტიურეთ ქვემოთ ტაიპინგის ეფექტისთვის
    /*
        heroTitle.textContent = '';
        function typeWriter() {
            if (index < originalText.length) {
                heroTitle.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeWriter, 100);
            }
        }
        setTimeout(typeWriter, 1000);
        */
  }

  // ჰეროს სექციისთვის პარალაქსის ეფექტი
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    const heroIcon = document.querySelector(".hero-icon");

    if (hero && heroIcon) {
      const rate = scrolled * -0.5;
      heroIcon.style.transform = `translateY(${rate}px) rotate(${
        scrolled * 0.1
      }deg)`;
    }
  });

  // რუკის ინტერაქციის გაუმჯობესებები
  const mapOverlay = document.querySelector(".map-overlay-full");
  const interactiveMap = document.querySelector(".interactive-map-full");

  if (mapOverlay && interactiveMap) {
    // რუკის ოვერლეის ჩვენება/დამალვა ჰოვერზე
    interactiveMap.addEventListener("mouseenter", function () {
      mapOverlay.style.opacity = "1";
      mapOverlay.style.transform = "scale(1)";
    });

    interactiveMap.addEventListener("mouseleave", function () {
      mapOverlay.style.opacity = "0.9";
      mapOverlay.style.transform = "scale(0.98)";
    });
  }

  // ფუნქციის ელემენტების ანიმაცია
  const featureItems = document.querySelectorAll(".feature-item-full");
  featureItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
    item.classList.add("fade-in");
    observer.observe(item);
  });

  // რუკის ღილაკების ფუნქციონალობა
  document.querySelectorAll(".map-btn-full").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// დამატებითი უტილიტი ფუნქციები
function showNotification(message, type = "info") {
  // შეტყობინების ელემენტის შექმნა
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // შეტყობინების სტილიზაცია
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;

  document.body.appendChild(notification);

  // ანიმაცია შიგნით
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // 3 წამის შემდეგ წაშლა
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// გაუმჯობესებული ფორმის ვალიდაცია
function validateForm(form) {
  const inputs = form.querySelectorAll(
    "input[required], select[required], textarea[required]"
  );
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      input.style.borderColor = "#e74c3c";
      input.style.boxShadow = "0 0 0 3px rgba(231, 76, 60, 0.1)";
      isValid = false;
    } else {
      input.style.borderColor = "#667eea";
      input.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
    }
  });

  return isValid;
}

// წარმადობის ოპტიმიზაცია
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ოპტიმიზებული სქროლის დამუშავება
const optimizedScrollHandler = debounce(() => {
  // თქვენი სქროლის დამუშავების კოდი აქ
}, 16); // ~60fps

window.addEventListener("scroll", optimizedScrollHandler);
