// 文字表示
document.addEventListener('DOMContentLoaded', () => {
  const text = document.querySelector('.text');
  const link = document.querySelector('.link');

  text.classList.remove('is-active');

  setTimeout(() => {
    text.classList.add('is-active');
  }, 50);


  setTimeout(() => {
    link.classList.add('is-shown');
  }, 1000); 
});

// バブル
function getRandomColor() {
      const colors = [
        'rgba(250, 174, 255, 0.4)',
        'rgba(83, 226, 255, 0.42)', 
        'rgba(133, 135, 255, 0.3)',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    for (let i = 0; i < 15; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble';

      const size = Math.random() * 250 + 150;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      bubble.style.left = `${Math.random() * 100}vw`;
      bubble.style.backgroundColor = getRandomColor();

      bubble.style.animationDelay = `${Math.random() * 10}s`;
      bubble.style.animationDuration = `${8 + Math.random() * 5}s`;

      document.body.appendChild(bubble);
    }