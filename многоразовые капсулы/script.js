// Countdown Timer with Animation
const countdownElement = document.getElementById("countdown");

// Check if the first visit timestamp is stored in localStorage
let firstVisitTime = localStorage.getItem("firstVisitTime");
const now = new Date().getTime();

// If there's no stored first visit time, set it to the current time (first visit)
if (!firstVisitTime) {
    firstVisitTime = now;
    localStorage.setItem("firstVisitTime", firstVisitTime); // Save first visit time to localStorage
}

// Calculate the countdown target time (1 day and 14 hours from the first visit)
const targetTime = parseInt(firstVisitTime) + (1 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

function startCountdown() {
    function updateTimer() {
        const distance = targetTime - new Date().getTime();

        if (distance < 0) {
            countdownElement.innerHTML = "Акция завершена!";
            countdownElement.style.animation = "fadeOut 2s ease-in-out forwards"; // Fade out when finished
            clearInterval(timerInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}д ${hours}ч ${minutes}м ${seconds}с`;

        // Add animation for countdown updates
        countdownElement.style.animation = "countdownUpdate 1s ease-out"; // Apply animation for update
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

// Start the countdown timer
startCountdown();

// Multilanguage Support
const translations = {
    en: {
        heroTitle: "Every sip counts for a better world 🌍",
        heroSubtitle: "Your morning coffee cares for the planet and your wallet.",
        tryNow: "Try Now",
        discount: "20% discount ends in:"
    },
    ru: {
        heroTitle: "Каждый глоток – шаг к лучшему миру 🌍",
        heroSubtitle: "Ваша утренняя чашка кофе теперь заботится о планете и вашем кошельке.",
        tryNow: "Попробовать сейчас",
        discount: "Скидка 20% закончится через:"
    }
};

function changeLanguage(lang) {
    document.querySelector(".hero h1").textContent = translations[lang].heroTitle;
    document.querySelector(".hero p").textContent = translations[lang].heroSubtitle;
    document.querySelector(".hero .btn").textContent = translations[lang].tryNow;
    document.querySelector(".timer-section h2").textContent = translations[lang].discount;
}

// Language switcher (example usage)
document.querySelector("#languageSwitcher").addEventListener("change", (e) => {
    changeLanguage(e.target.value);
});

// CSS Animations (for Countdown Timer)
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
@keyframes countdownUpdate {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.2);
        opacity: 0.7;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes fadeOut {
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
`;
document.head.appendChild(styleSheet);
