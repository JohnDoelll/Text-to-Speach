let synth = window.speechSynthesis, isSpeaking = true;


const textarea = document.querySelector("textarea"),
  voiceList = document.querySelector("select"),
  speechBtn = document.querySelector("button");

const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");


voices();

function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }

  utterance.rate = rate.value;
  utterance.pitch = pitch.value;
  // Speak
  synth.speak(utterance);
}
// speechBtn.addEventListener("click",
speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value !== "") {
    if (!synth.speaking) {
      textToSpeech(textarea.value);
    }

    if (textarea.value.length > 80) {
      setInterval(() => {
        if (!synth.speaking && !isSpeaking) {
          isSpeaking = true;
          speechBtn.innerText = "Convert To Speech";
        } else {
        }
      }, 500);
      if (isSpeaking) {
        synth.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pause Speech";
      } else {
        synth.pause();
        isSpeaking = true;
        speechBtn.innerText = "Resume Speech";
      }
    } else {
      speechBtn.innerText = "Convert To Speech";
    }
  }
});

// Rate value change
rate.addEventListener("change", (e) => (rateValue.textContent = rate.value));

// Pitch value change
pitch.addEventListener("change", (e) => (pitchValue.textContent = pitch.value));
