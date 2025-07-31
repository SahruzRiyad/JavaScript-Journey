let time = 120; 
const countdownEl = document.getElementById('countdown');

setInterval(() => {
    let mins = Math.floor(time / 60);
    let secs = time % 60;
    countdownEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    if (time > 0) time--;
}, 1000);


const closeBtn = document.querySelector('.close-btn');
const popup = document.querySelector('.popup-container');

closeBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});