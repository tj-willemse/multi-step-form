import '../styles/modern.css';
import '../styles/style.css';
import '../styles/components/step-1.css';
import '../styles/components/step-2.css';
import '../styles/components/step-3.css';
import '../styles/components/step-4.css';
import '../styles/util.css';

// get elements

const listDot = document.querySelectorAll('.sidebar-list li');

const desktopNextButton = document.querySelectorAll(
  '.step-one-next-button-desktop'
);
const mobileNextButton = document.querySelectorAll(
  '.step-one-next-button-mobile'
);
const goBackButtonDesktop = document.querySelectorAll('.step-two-back-button');
const goBackButtonMobile = document.getElementById('go-back-button-mobile');

// boxes
// const stepBoxOne = document.getElementById('stepBox1');
// const stepBoxTwo = document.getElementById('stepBox2');
// const stepBoxthree = document.getElementById('stepBox3');

// create elements
let currentStep = 1;
const totalSteps = 4;

// functions

function updateListStyle() {
  listDot.forEach((item) => {
    item.classList.remove('step-1', 'step-2', 'step-3', 'step-4');
  });

  const currentListItem = document.getElementById(`item-${currentStep}`);
  if (currentListItem) {
    currentListItem.classList.add(`step-${currentStep}`);
  } else {
    console.error(`element not found`);
  }
}
updateListStyle();

function nextStepDisplay() {
  document.getElementById(`stepBox${currentStep}`).style.display = 'none';

  if (currentStep < totalSteps) {
    currentStep++;
    updateListStyle();
    document.getElementById(`stepBox${currentStep}`).style.display = 'block';
  } else {
    alert('Finalized');
  }
}

function lastStepDisplay() {
  document.getElementById(`stepBox${currentStep}`).style.display = 'none';

  currentStep--;
  updateListStyle();

  document.getElementById(`stepBox${currentStep}`).style.display = 'block';
}

// event listeners

desktopNextButton.forEach((button) => {
  button.addEventListener('click', nextStepDisplay);
});

mobileNextButton.forEach((button) => {
  button.addEventListener('click', nextStepDisplay);
});

goBackButtonDesktop.forEach((button) => {
  button.addEventListener('click', lastStepDisplay);
});

goBackButtonMobile.addEventListener('click', lastStepDisplay);
