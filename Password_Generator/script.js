// Function to generate random characters
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Object containing functions
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Function to generate password
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesArr = [];

  if (lower) typesArr.push("lower");
  if (upper) typesArr.push("upper");
  if (number) typesArr.push("number");
  if (symbol) typesArr.push("symbol");

  if (typesArr.length === 0) {
    return "Select at least one option!";
  }

  for (let i = 0; i < length; i++) {
    const randomType = typesArr[Math.floor(Math.random() * typesArr.length)];
    generatedPassword += randomFunc[randomType]();
  }

  return generatedPassword;
}

// Click event for "Generate" button
document.getElementById("generateBtn").addEventListener("click", () => {
  const length = parseInt(document.getElementById("Passwordlength").value);
  const hasUpper = document.getElementById("uppercase").checked;
  const hasLower = document.getElementById("lowercase").checked;
  const hasNumber = document.getElementById("numbers").checked;
  const hasSymbol = document.getElementById("symbols").checked;
  const result = document.getElementById("PasswordResult");

  result.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Copy password to clipboard
document.getElementById("clipboardBtn").addEventListener("click", () => {
  const passwordField = document.getElementById("PasswordResult");

  if (!passwordField.value || passwordField.value === "Select at least one option!") {
    alert("No password to copy!");
    return;
  }

  navigator.clipboard.writeText(passwordField.value)
    .then(() => {
      const button = document.getElementById("clipboardBtn");
      button.innerText = "Copied!";
      setTimeout(() => { button.innerText = "Copy"; }, 1500);
    })
    .catch(err => console.error("Failed to copy: ", err));
});

// Password Strength Indicator
function updateStrengthIndicator(password) {
  const strengthIndicator = document.getElementById("strengthIndicator");
  const strength = calculatePasswordStrength(password);

  strengthIndicator.textContent = `Strength: ${strength}`;
  strengthIndicator.style.color = strength === "Weak" ? "red" : strength === "Medium" ? "orange" : "green";
}

function calculatePasswordStrength(password) {
  const length = password.length;
  if (length < 6) return "Weak";
  if (length < 10) return "Medium";
  return "Strong";
}

// Toggle Password Visibility
document.getElementById("togglePassword").addEventListener("click", () => {
  const passwordField = document.getElementById("PasswordResult");
  const toggleIcon = document.getElementById("togglePassword");

  if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.classList.remove("fa-eye");
    toggleIcon.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    toggleIcon.classList.remove("fa-eye-slash");
    toggleIcon.classList.add("fa-eye");
  }
});