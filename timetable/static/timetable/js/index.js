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
