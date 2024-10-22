const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//start

recognition.start();

// capture speech

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  writeMessage(msg);
  checkNumber(msg);
}

// write what the user say

function writeMessage(msg) {
  msgEl.innerHTML = `
  <div>You Said:</div>
  <span class="box">${msg}</span>

  `;
}

function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a Number, <strong>Next time try a Number.</strong></div>`;
    return;
  }
  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div><strong>The Number MUST be Between 1 and 100 </strong></div>`;
    return;
  }

  // check guessed number
  if (num === randomNum) {
    document.body.innerHTML = `<h2>Congrats!  You have guessed the Number! <br><br>
    It was ${num}
    </h2>
    <button class="play-btn" id="play-btn">Play Again</button>
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>GO LOWER</div>`;
  } else {
    msgEl.innerHTML += `<div>GO HIGHER</div>`;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// result

recognition.addEventListener('result', onSpeak);

// end

recognition.addEventListener('end', () => recognition.start());

document.body.addEventListener('click', (e) => {
  if (e.target.id == 'play-btn') {
    window.location.reload();
  }
});
