const colorPicker = document.getElementById('color-picker')
const colorPickerSubmit = document.getElementById('color-picker-submit')
const colorPickerInputs = document.getElementsByClassName('.selection > div')

function start(answer) {
  let currRow = 0;
  
}

const colorPickerColors = []
async function enableColorPicker() {
  colorPicker.classList.remove('d-none');
  console.log(colorPickerInputs)
  colorPickerInputs.foreach(el => {
    el.addEventListener('click', (e) => {
      console.log('picked color event: ', e)
      pickColor(0, 1)
    })
  })
  colorPickerSubmit.addEventListener('click', () => {
    console.log('submit')
  })
}

function pickColor(index, color) {
  colorPickerColors[index] = color
}

(function() {
  enableColorPicker()
})();