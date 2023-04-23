const buttonStart = document.querySelector('button[data-start]');
const buttonEnd = document.querySelector('button[data-stop]');

let timerId = null


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

buttonStart.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  buttonStart.setAttribute('disabled', true);
});

buttonEnd.addEventListener('click', () => {
  let timerId = null
  clearInterval(timerId);
  buttonStart.removeAttribute('disabled');
});
