// const emailInput = document.querySelector('input[name="email"]');
// console.log(emailInput);

// Add listener for form labels
const lblList = document.querySelectorAll('.form-container label');
// console.log('lblList: ' + lblList.length);

for (const lbl of lblList) {
    // console.log(lbl.className);
    lbl.addEventListener("click", () => {
        // console.log('clicked label ' + lbl.className);
        // Set focus on labels input
        lbl.nextElementSibling.focus();
    });
}

const form = document.querySelector('form[name="registerForm"]');
const msgBox = document.querySelector('.msg-box');


// console.log(form);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log('form submited');
    msgBox.innerHTML = '';  // Empty error messages

    // Check password length
    let pwdInput = form.querySelector('input[name="password"]');
    let pwdValue = pwdInput.value.trim(pwdInput.value);
    // console.log('password lenght: ' + pwdValue.length);

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

     console.log(pwdValue, pwdConfirmValue);
    if (pwdValue && pwdValue !== pwdConfirmValue) {
        // console.log('Not the same');
        pwdConfirmInput.classList.add('error'); // Mark as error
        pwdConfirmInput.previousElementSibling.classList.add('error');
        msgBox.innerHTML += "The passwords don't match<br>";  // Show error msg
    }
    else {
        // console.log('The same');
        pwdConfirmInput.classList.remove('error');
        pwdConfirmInput.previousElementSibling.classList.remove('error');
    }


    
    console.log('after');

    // Check password === confirmed password



});

