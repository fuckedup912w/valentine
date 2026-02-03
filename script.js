// 1. Select DOM Elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn'); // Defined missing variable
const mainCard = document.getElementById('mainCard');
const successCard = document.getElementById('successCard');
const displayMsg = document.getElementById('displayMsg');
const music = document.getElementById('celebrationMusic');

// 2. Messages for the "No" button attempts
const messages = [
    "Wait, are you sure? 🤨",
    "Really?? Think about it again! 🧐",
    "Nice try, but nope! 😜",
    "Is your mouse broken? 🖱️",
    "You can't escape love! ❤️",
    "I'm getting dizzy... Just say yes! 😵‍💫",
    "Error 404: 'No' button not found 🚫",
    "You're testing my patience! 😤",
    "Okay, now you're just being mean! 😭"
];

let msgIndex = 0;

// 3. Function to move "No" button and grow "Yes" button
function moveButton() {
    displayMsg.innerText = messages[msgIndex];
    msgIndex = (msgIndex + 1) % messages.length;

    // Move button randomly
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'absolute'; 
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Grow the Yes button
    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentSize * 1.1) + 'px';
    yesBtn.style.padding = (currentSize * 0.5) + 'px ' + (currentSize * 1.0) + 'px';
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

// 4. Success Action
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successCard.classList.remove('hidden');

    // Play Music (Triggered by user click to bypass browser block)
    if (music) {
        music.loop = true;
        music.play().catch(e => console.error("Playback blocked or file missing:", e));
    }

    // Confetti Explosion
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
});