const colorInput = document.querySelector('#color-input');
const modeSelect = document.querySelector('#mode-select');
const getSchemeBtn = document.querySelector('#get-scheme-btn');

getSchemeBtn.addEventListener('click', getColorData);

function getColorData() {
  const inputVal = colorInput.value.slice(1);
  const selectVal = modeSelect.value;

  fetch(`https://www.thecolorapi.com/scheme?hex=${inputVal}&mode=${selectVal}`)
    .then((response) => response.json())
    .then((data) => {
      const colorData = data.colors.reduce((arr, color) => {
        arr.push(color.hex.value);
        return arr;
      }, []);

      renderColors(colorData);
    });
}

function renderColors(colorArr) {
  const colorBgEls = document.querySelectorAll('.color-bg');
  const colorCodeEls = document.querySelectorAll('.color-code');

  colorBgEls.forEach((el, i) => {
    el.style.backgroundColor = colorArr[i];
    colorCodeEls[i].textContent = colorArr[i];
  });
}

window.addEventListener('load', getColorData());

// ============== Copy color values to clipboard =====================

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard successfully!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

document.querySelector('.color-scheme').addEventListener('click', (e) => {
  if (e.target.classList.contains('color-code')) {
    copyToClipboard(e.target.textContent);
  } else if (e.target.classList.contains('color-bg')) {
    copyToClipboard(e.target.nextElementSibling.textContent);
  }
});
