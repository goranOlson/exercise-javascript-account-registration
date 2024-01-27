//--- Get form elements
const form = document.querySelectorAll('form[name="registerForm"]');
// console.log(form);

const inputPwd = form.item(0)[3];
inputPwd.addEventListener('blur', testPassword);

const inputPwdConfirm = form.item(0)[4];
inputPwdConfirm.addEventListener('blur', testPasswordConfirmation);

for (const el of form[0]) {  // Add label lister
    if (el.tagName === 'INPUT') {
        el.previousElementSibling.addEventListener("click", () => {
            el.focus();
        });
    }
}

const btn = document.querySelector('.form-container button[type="submit"]');
const msgBox = document.querySelector('.form-container .msg-box');

function testPassword(e = null) {
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

    // Handle error message
    showMessage('password', !pwdOk);  // !show

    // Only if input blur() handle button - else done in caller function
    if (e) {
        // Both methodes must give ok to show button
        showButton( ( pwdOk && testPasswordConfirmation() ) );
    }

    return pwdOk;
}

function testPasswordConfirmation(e = null) {
    let pwdConfirmed;
    inputPwdConfirm.value = inputPwdConfirm.value.trim();

    // Called by testPassword() and empty OR same values is OK
    if (!e && !inputPwdConfirm.value || inputPwdConfirm.value === inputPwd.value) {
        inputPwdConfirm.classList.remove('error');
        inputPwdConfirm.previousElementSibling.classList.remove('error');
        pwdConfirmed = true;
    }
    else  {
        inputPwdConfirm.classList.add('error');
        inputPwdConfirm.previousElementSibling.classList.add('error');
        pwdConfirmed = false;
    }

    // Handle error message
    showMessage('passwordConfirm', !pwdConfirmed);  // !show

    // Only if input blur() handle button - else done in caller function
    if (e) {
        // Both methodes must give ok to show button
        showButton( ( pwdConfirmed && testPassword() ) );
    }

    return pwdConfirmed;
}

function showButton(show) {
    if (show) {
        btn.removeAttribute('disabled');
    }
    else {
        btn.setAttribute('disabled', 'disabled');
    }
}

function showMessage(inputName, show) {
    if (inputName === 'password') {
        const msg = document.querySelector('.errorPassword');
        if (show) {
            msg.classList.add('show');
        }
        else {
            msg.classList.remove('show');
        }
    }
    else if (inputName === 'passwordConfirm') {
        const msg = document.querySelector('.errorConfirm');
        if (show) {
            msg.classList.add('show');
        }
        else {
            msg.classList.remove('show');
        }
    }
}

form[0].addEventListener("submit", (e) => {
    e.preventDefault();  // Block default send functions

    if (testPassword() && testPasswordConfirmation()) {
        console.log('submit ok');

        const registrationData = {
            name: "",
            username: "",
            email: "",
            password: "",
        };
        
        for (const input of form[0]) {
            switch (input.name) {
                case 'name':
                    registrationData.name = input.value;
                    break;
                case 'username':
                    registrationData.username = input.value;
                    break;
                case 'email':
                    registrationData.email = input.value;
                    break;
                case 'password':
                    registrationData.password = input.value;
                    break;
                default:
                    break;
            }
        }

        // Print out registrationData
        console.log(registrationData);
    }
});






