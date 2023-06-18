const button = document.querySelector('input');

button.addEventListener('click', updateButton);

function updateButton() {
  if (button.value === 'クリックしてね') {
    button.value = 'マシンを停止';
    alert("AAAAAA");
  } 
}
