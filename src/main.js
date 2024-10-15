import '../styles/modern.css';
import '../styles/style.css';
import '../styles/components/step-1.css';
import '../styles/components/step-2.css';
import '../styles/components/step-3.css';
import '../styles/components/step-4.css';
import '../styles/components/thank-you-popup.css';
import '../styles/util.css';

// Get elements
const listDot = document.querySelectorAll('.sidebar-list li');
const desktopNextButton = document.querySelectorAll(
  '.step-one-next-button-desktop'
);
const mobileNextButton = document.querySelectorAll(
  '.step-one-next-button-mobile'
);
const goBackButtonDesktop = document.querySelectorAll('.step-two-back-button');
const goBackButtonMobile = document.getElementById('go-back-button-mobile');

const planButtons = document.querySelectorAll('.price-option-boxes');
const toggleButton = document.querySelector('.toggle-button');

const monthlyText = document.getElementById('monthly-text');
const yearlyText = document.getElementById('yearly-text');

const yearlyToggle = document.querySelectorAll('.yearly-box');
const pricetoggle = document.querySelectorAll('.price-option-sub');

const checkBox = document.querySelectorAll('.add-checkbox');

// Styles needed for display
const onlineContent = document.getElementById('online-service');
const storageContent = document.getElementById('larger-storage');
const profileContent = document.getElementById('customize-profile');

// Step 4
const planTypeElement = document.getElementById('plan-type');
const totalPlanAmount = document.querySelector('.total-amount');
const totalAmountMain = document.querySelector('.total-amount-main');
const changePlan = document.getElementById('change-plan-link');

const monthlyAmount = document.getElementById('one-dollar');
const monthlyAmountTwo = document.getElementById('two-dollar');
const monthlyAmountThree = document.getElementById('two-dollar-two');

const selectedOptionsBox = document.getElementById('selected-options-box');

// Inputs
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const phoneInput = document.getElementById('phone-input');

const validCharacters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._-';

let currentStep = 1;
const totalSteps = 5;

// Initial UI setup
toggleButton.classList.remove('toggled');
monthlyText.style.color = 'hsl(213, 96%, 18%)';
yearlyText.style.color = 'hsl(231, 11%, 63%)';

// Functions

function calculateCheckbox() {
  let checkboxTotal = 0;

  checkBox.forEach((checkbox) => {
    if (checkbox.checked) {
      const price = parseFloat(checkbox.getAttribute('data-price')) || 0;

      checkboxTotal += toggleButton.classList.contains('toggled')
        ? price * 10
        : price;
    }
  });
  return checkboxTotal;
}

function updateTotalAmount() {
  const selectedPlanPrice =
    parseFloat(totalPlanAmount.textContent.replace(/[^0-9.]/g, '')) || 0;
  const addOnTotal = calculateCheckbox();
  const totalAmount = selectedPlanPrice + addOnTotal;
  const isYearly = toggleButton.classList.contains('toggled');

  totalAmountMain.textContent = isYearly
    ? `$${totalAmount.toFixed(2)} /yr`
    : `$${totalAmount.toFixed(2)} /mo`;
}

function toggleCheckboxes(checkbox, content) {
  content.style.opacity = checkbox.checked ? '1' : '0';
}

function updateStep4Content() {
  const selectedPlanButton = document.querySelector(
    '.price-option-boxes.selected'
  );

  if (selectedPlanButton) {
    const selectedPlan = selectedPlanButton.getAttribute('data-plan');
    const selectedPrice =
      parseFloat(selectedPlanButton.getAttribute('data-price')) || 0;

    planTypeElement.textContent = selectedPlan;

    totalPlanAmount.textContent = toggleButton.classList.contains('toggled')
      ? `$${(selectedPrice * 10).toFixed(2)} /yr`
      : `$${selectedPrice.toFixed(2)} /mo`;

    if (monthlyAmount) {
      monthlyAmount.style.color = toggleButton.classList.contains('toggled')
        ? '#fff'
        : 'hsl(243, 100%, 62%';
    }

    if (monthlyAmountTwo) {
      monthlyAmountTwo.style.color = toggleButton.classList.contains('toggled')
        ? '#fff'
        : 'hsl(243, 100%, 62%';
    }

    if (monthlyAmountThree) {
      monthlyAmountThree.style.color = toggleButton.classList.contains(
        'toggled'
      )
        ? '#fff'
        : 'hsl(243, 100%, 62%';
    }

    updateTotalAmount();
  }
}

function toggleMonthYear() {
  toggleButton.classList.toggle('toggled');
  updateStep4Content();

  if (toggleButton.classList.contains('toggled')) {
    monthlyText.style.color = 'hsl(231, 11%, 63%)';
    yearlyText.style.color = 'hsl(213, 96%, 18%)';
  } else {
    monthlyText.style.color = 'hsl(213, 96%, 18%)';
    yearlyText.style.color = 'hsl(231, 11%, 63%)';
  }

  document.querySelectorAll('.add-on-price').forEach((price) => {
    if (toggleButton.classList.contains('toggled')) {
      price.style.display = price.textContent.includes('/yr')
        ? 'block'
        : 'none';
    } else {
      price.style.display = price.textContent.includes('/mo')
        ? 'block'
        : 'none';
    }
  });

  pricetoggle.forEach((price) => {
    price.style.display = toggleButton.classList.contains('toggled')
      ? 'none'
      : 'block';
  });
  yearlyToggle.forEach((price) => {
    price.style.display = toggleButton.classList.contains('toggled')
      ? 'flex'
      : 'none';
  });

  updateTotalAmount();
}

function nextStep() {
  if (validateStep(currentStep)) {
    currentStep++;
    nextStepDisplay();
  }
}

function validateStep(step) {
  if (step === 1) {
    if (!validateEmail(emailInput.value)) {
      console.log('Please enter a valid email');
      return false;
    }
  } else if (step === 2) {
    if (
      !Array.from(planButtons).some((button) =>
        button.classList.contains('selected')
      )
    ) {
      console.log('Step 2 is not valid, please select a plan');
      return false;
    }
  } else if (step === 3) {
  }

  return true;
}

function validateEmail(email) {
  const userEmail = email.trim();
  const [localPart, domainPart] = userEmail.split('@');

  if (!userEmail.includes('@') || !localPart || !domainPart) {
    emailInput.style.borderBottom = '1px solid red';
    console.log('Invalid email input: missing @ or local/domain');
    return false;
  }

  if (userEmail.split('@').length - 1 !== 1) {
    emailInput.style.borderBottom = '1px solid red';
    console.log('Invalid email: more than one @');
    return false;
  }

  for (const char of localPart) {
    if (!validCharacters.includes(char)) {
      emailInput.style.borderBottom = '1px solid red';
      console.log('Invalid email: invalid characters in local part');
      return false;
    }
  }

  return isValidDomain(domainPart);
}

function isValidDomain(domain) {
  if (!domain.includes('.')) {
    console.log('Invalid domain: missing dot');
    return false;
  }

  return domain
    .split('.')
    .every(
      (part) => part.length > 0 && !part.startsWith('-') && !part.endsWith('-')
    );
}

function updateListStyle() {
  listDot.forEach((item) =>
    item.classList.remove('step-1', 'step-2', 'step-3', 'step-4')
  );

  const currentListItem = document.getElementById(`item-${currentStep}`);
  if (currentListItem) {
    currentListItem.classList.add(`step-${currentStep}`);
  }
}

function nextStepDisplay() {
  for (let i = 1; i <= totalSteps; i++) {
    const stepBox = document.getElementById(`stepBox${i}`);
    if (stepBox) {
      stepBox.style.display = 'none';
    }
  }

  if (currentStep <= totalSteps) {
    updateListStyle();
    const currentStepBox = document.getElementById(`stepBox${currentStep}`);
    if (currentStepBox) {
      currentStepBox.style.display = 'block';
    } else {
      alert('Finalized');
    }
  }
}

function lastStepDisplay() {
  if (currentStep > 1) {
    document.getElementById(`stepBox${currentStep}`).style.display = 'none';
    currentStep--;
    updateListStyle();
    document.getElementById(`stepBox${currentStep}`).style.display = 'block';
  }
}

function changeOption() {
  currentStep = 2;
  nextStepDisplay();

  const selectedPlanButton = document.querySelector(
    '.price-option-boxes.selected'
  );
  if (selectedPlanButton) {
    selectedPlanButton.classList.remove('selected');
  }

  checkBox.forEach((checkbox) => {
    checkbox.checked = false;
    const content = [onlineContent, storageContent, profileContent][
      Array.from(checkBox).indexOf(checkbox)
    ];
    content.style.opacity = '0';
  });

  totalAmountMain.textContent = `$0.00 /mo`;
}

// Event Listeners
desktopNextButton.forEach((button) => {
  button.addEventListener('click', nextStep);
});

mobileNextButton.forEach((button) => {
  button.addEventListener('click', nextStep);
});

goBackButtonDesktop.forEach((button) => {
  button.addEventListener('click', lastStepDisplay);
});

goBackButtonMobile.addEventListener('click', lastStepDisplay);

planButtons.forEach((button) => {
  button.addEventListener('click', () => {
    planButtons.forEach((btn) => btn.classList.remove('selected'));
    button.classList.add('selected');
    updateStep4Content();
  });
});

toggleButton.addEventListener('click', toggleMonthYear);

checkBox.forEach((checkbox, index) => {
  checkbox.addEventListener('click', () => {
    const content = [onlineContent, storageContent, profileContent][index];
    toggleCheckboxes(checkbox, content);
    updateTotalAmount();
  });
});

changePlan.addEventListener('click', changeOption);

nextStepDisplay();
