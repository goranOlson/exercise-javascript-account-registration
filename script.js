const formElements = document.querySelectorAll('form[name="registerForm"]');
// console.log(formElements);

const inputPwd = formElements.item(0)[3];
inputPwd.addEventListener('blur', testPassword);

const inputPwdConfirm = formElements.item(0)[4];
inputPwdConfirm.addEventListener('blur', testPasswordConfirmation);

for (const el of formElements[0]) {  // Add label lister
    if (el.tagName === 'INPUT') {
        el.previousElementSibling.addEventListener("click", () => {
            el.focus();
        });
    }
}
 
const btn = document.querySelector('.form-container button[type="submit"]');
const msgBox = document.querySelector('.form-container .msg-box');



//--- Get form elements
const form = document.querySelector('form[name="registerForm"]');

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

function testPassword(e = null) {
    console.log('--> testPassword(' + e + ')');
    let pwdOk;
    inputPwd.value = inputPwd.value.trim();

    if (!inputPwd.value || inputPwd.value.length >= 8) {
        inputPwd.classList.remove('error');
        inputPwd.previousElementSibling.classList.remove('error');
        pwdOk = true;
    }
    else  {
        inputPwd.classList.add('error');
        inputPwd.previousElementSibling.classList.add('error');
        pwdOk = false;
    }
    showMessage('password', !pwdOk);  // !show

    if (e) {  // Handle button and msgBox from here
         console.log('...testPassword got target');
        // showButton(pwdOk);
        showButton( (pwdOk && testPasswordConfirmation()) );
    }

     console.log('--> testPassword() ' + pwdOk);
    return pwdOk;
}

function testPasswordConfirmation(e = null) {
     console.log('--> testPasswordConfirmation(' + e + ')');
    let pwdConfirmed;
    inputPwdConfirm.value = inputPwdConfirm.value.trim();

    if (inputPwdConfirm.value === inputPwd.value) {
        inputPwdConfirm.classList.remove('error');
        inputPwdConfirm.previousElementSibling.classList.remove('error');
        pwdConfirmed = true;
    }
    else  {
        inputPwdConfirm.classList.add('error');
        inputPwdConfirm.previousElementSibling.classList.add('error');
        pwdConfirmed = false;
    }

    showMessage('passwordConfirm', !pwdConfirmed);  // !show

    if (e) {  // Handle button and msgBox from here
        // console.log('...testPasswordConfirmation got target');
        showButton( (pwdConfirmed && testPassword()) );  // + pwdOk
    }

     console.log('--> testPassword() ' + pwdConfirmed);
    return pwdConfirmed;
}


function showButton(show) {
     console.log('--> showButton(' + show + ')');
    if (show) {
        btn.removeAttribute('disabled');
    }
    else {
        btn.setAttribute('disabled', 'disabled');
    }
}

function showMessage(inputName, show) {
     console.log('--> showMessage(' + inputName + ', ' + show + ')');
    if (inputName === 'password') {
        const msg = document.querySelector('.errorPassword'); // password
        if (show) {
            msg.classList.add('show');
        }
        else {
            msg.classList.remove('show');
        }
    }
    else if (inputName === 'passwordConfirm') {
        const msg = document.querySelector('.errorConfirm'); // password
        if (show) {
            msg.classList.add('show');
        }
        else {
            msg.classList.remove('show');
        }
    }
}




