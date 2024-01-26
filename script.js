
//--- Get form elements
const form = document.querySelector('form[name="registerForm"]');

const btn = document.querySelector('.form-container button');

//--- Add 'click' listener for form labels
const lblList = form.querySelectorAll('label');
for (const lbl of lblList) {
    lbl.addEventListener("click", () => {
        lbl.nextElementSibling.focus();
    });
}

let inputPwd;
let inputPwdConfirm;

// Set listener on password fields
const pwdList = form.querySelectorAll('input[type="password"]');

for (const p of pwdList) {
    if (p.name === 'passwordConfirm') {
        inputPwdConfirm = p;
        p.addEventListener('blur', checkConfirmPassword);
    }
    else if (p.name === 'password') {
        inputPwd = p;
        p.addEventListener('blur', checkPassword);
    }
}

const msgBox = form.querySelector('.msg-box');

form.addEventListener("submit", (e) => {
    e.preventDefault();
    msgBox.innerHTML = '';  // Empty error messages

    // Check password length - ONLY FIRST
    let pwdInput = form.querySelector('input[name="password"]');
    let pwdValue = pwdInput.value.trim(pwdInput.value);

    if (pwdValue.length < 8) {
        pwdInput.classList.add('error'); // Mark as error
        pwdInput.previousElementSibling.classList.add('error');
        msgBox.innerHTML += "Password must be at least 8 tokens long<br>";  // Show error msg
    }
    else {
        pwdInput.classList.remove('error');
        pwdInput.previousElementSibling.classList.remove('error');
    }

    // Check confirm password
    let pwdConfirmInput = form.querySelector('input[name="passwordConfirm"]');
    let pwdConfirmValue = pwdConfirmInput.value.trim(pwdConfirmInput.value);

    if (pwdValue && pwdValue !== pwdConfirmValue) {
        pwdConfirmInput.classList.add('error'); // Mark as error
        pwdConfirmInput.previousElementSibling.classList.add('error');
        msgBox.innerHTML += "The passwords don't match<br>";  // Show error msg
    }
    else {
        pwdConfirmInput.classList.remove('error');
        pwdConfirmInput.previousElementSibling.classList.remove('error');
    }
    
    if (msgBox.innerHTML != '') {
        btn.setAttribute('disabled', 'disabled');
    }
    else {
        btn.removeAttribute('disabled');

        const formInputs = form.querySelectorAll('input');

        const registrationData = {
            name: formInputs.item(0).value,
            username: formInputs.item(1).value,
            email: formInputs.item(2).value,
            password: formInputs.item(3).value,
        };

        console.log(registrationData);
    }
});

function checkPassword() {
    // console.log('--> checkPassword()');

    msgBox.innerHTML = '';  // handle msg

    // handle input
    inputPwd.value = inputPwd.value.trim();
    
    const pwdOk = (inputPwd.value.length >= 8) ? true : false;
    if (pwdOk) {
        inputPwd.classList.remove('error');
        inputPwd.previousElementSibling.classList.remove('error');
    }
    else {
        inputPwd.classList.add('error');
        inputPwd.previousElementSibling.classList.add('error');
    }

    // handle submit button + error message
    if (!pwdOk) {
        btn.setAttribute('disabled', 'disabled');
        msgBox.innerHTML += "Password must be at least 8 tokens long<br>";
    }
    else if (checkConfirmPassword(true)) {
        btn.removeAttribute('disabled');
    }
    
    return pwdOk;
}

function checkConfirmPassword(forPwdCheck = false) {
    // console.log('--> checkConfirmPassword('+ forPwdCheck +')');

    let pwdConfirmed;

    if (forPwdCheck === true) {  // Check for checkPassword()
        pwdConfirmed = (forPwdCheck === true || inputPwdConfirm.value === inputPwd.value) ? true : false;
    }
    else {
        msgBox.innerHTML = '';  // handle msg

        inputPwdConfirm.value = inputPwdConfirm.value.trim();  // Trim value
        
        pwdConfirmed = (inputPwdConfirm.value === inputPwd.value) ? true : false;

        if (pwdConfirmed) {
            inputPwdConfirm.classList.remove('error');
            inputPwdConfirm.previousElementSibling.classList.remove('error');
        }
        else {
            inputPwdConfirm.classList.add('error');
            inputPwdConfirm.previousElementSibling.classList.add('error');
            msgBox.innerHTML += "Password don't match confirmed password<br>";
        }

        // handle submit button
        if (!pwdConfirmed) {
            btn.setAttribute('disabled', 'disabled');
        }
        else {
            btn.removeAttribute('disabled');
        }
    }  

    return pwdConfirmed;
}
