const form = document.getElementById("form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const strength = document.getElementById("strength");

// VALIDATION FUNCTIONS
function validateName() {
    if (nameInput.value.trim().length < 3) {
        nameError.textContent = "Name must be at least 3 characters";
        return false;
    }
    nameError.textContent = "";
    return true;
}

function validateEmail() {
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!pattern.test(emailInput.value)) {
        emailError.textContent = "Invalid email format";
        return false;
    }
    emailError.textContent = "";
    return true;
}

function validatePassword() {
    const value = passwordInput.value;

    if (value.length < 6) {
        passwordError.textContent = "Min 6 characters required";
        return false;
    }

    if (!value.match(/[A-Z]/)) {
        passwordError.textContent = "Must include 1 uppercase letter";
        return false;
    }

    if (!value.match(/[0-9]/)) {
        passwordError.textContent = "Must include 1 number";
        return false;
    }

    passwordError.textContent = "";
    return true;
}

// LIVE EVENTS
nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);

passwordInput.addEventListener("input", () => {
    validatePassword();

    const value = passwordInput.value;

    if (value.length < 6) {
        strength.textContent = "Weak";
        strength.style.color = "red";
    } else if (value.match(/[A-Z]/) && value.match(/[0-9]/)) {
        strength.textContent = "Strong";
        strength.style.color = "green";
    } else {
        strength.textContent = "Medium";
        strength.style.color = "orange";
    }
});

// 🚫 PREVENT SUBMIT IF INVALID
const result = document.getElementById("result");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop reload

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (!isNameValid || !isEmailValid || !isPasswordValid) {
        return;
    }

    // GET VALUES
    const name = nameInput.value;
    const email = emailInput.value;

    // 🎯 DYNAMIC DOM UPDATE
    result.innerHTML = `
        <div style="margin-top:20px; padding:15px; background:#e6fffa; border-radius:8px;">
            <h3>✅ Submitted Successfully</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
        </div>
    `;

    // RESET FORM
    form.reset();
    strength.textContent = "";
});