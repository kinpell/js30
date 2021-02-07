const keys = document.querySelectorAll(".key");

const getKeyCodeRelatedAudioElement = (keyCode) => {
  return document.querySelector(`audio[data-key="${keyCode}"]`);
};

const getKeyCodeRelatedDivElement = (keyCode) => {
  return document.querySelector(`.key[data-key="${keyCode}"]`);
};

const playAudioElement = (audioElement) => {
  audioElement.currentTime = 0; // rewind to start for making the song play multiple times
  audioElement.play();
};

const addPlayingStateToClassElement = (classElement) => {
  classElement.classList.add("playing");
};

const removePlayingStateToClassElement = (classElement) => {
  classElement.classList.remove("playing");
};

const playKeyNote = (keyboardEvent) => {
  const keyCodeRelatedAudioElement = getKeyCodeRelatedAudioElement(
    keyboardEvent.keyCode
  );

  const keyCodeRelatedClassElement = getKeyCodeRelatedDivElement(
    keyboardEvent.keyCode
  );

  if (!keyCodeRelatedAudioElement && !keyCodeRelatedClassElement) return;

  playAudioElement(keyCodeRelatedAudioElement);
  addPlayingStateToClassElement(keyCodeRelatedClassElement);
};

function removeKeyPlayingState(keyEvent) {
  if (keyEvent.propertyName !== "transform") return;
  removePlayingStateToClassElement(this);
}

const listenToKeyTransitionEndToRemoveTransition = () => {
  keys.forEach((key) => {
    key.addEventListener("transitionend", removeKeyPlayingState);
  });
};

const listenToKeyDownToPlayNote = () => {
  window.addEventListener("keydown", playKeyNote);
};

listenToKeyDownToPlayNote();
listenToKeyTransitionEndToRemoveTransition();
