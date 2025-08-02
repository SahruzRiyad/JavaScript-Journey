let time = 120;
const countdownEl = document.getElementById('countdown');
const closeBtn = document.querySelector('.close-btn');
const popup = document.querySelector('.popup-container');

const updateCountdown = () => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    countdownEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
};

updateCountdown(); // Initial call

const timer = setInterval(() => {
    if (time > 0) {
        time--;
        updateCountdown();
    } else {
        clearInterval(timer); // Stopping the timer when it reaches 0
    }
}, 1000);

closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});
