const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('root-container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// signup form validation
function validateSignupForm() {
    let name = (document.querySelector('.sign-up-container > form > [name="name"]') || {}).value;
    let email = (document.querySelector('.sign-up-container > form > [name="email"]') || {}).value;
    let password = (document.querySelector('.sign-up-container > form > [name="password"]') || {}).value;

    if (name == "") {
        alert("Name must be filled out");
        return false;
    } else if (email == "") {
        alert("Email must be filled out");
        return false;
    } else if (password == "") {
        alert("Password must be filled out");
        return false;
    } else if (password.length < 3) {
        alert("Password should contain more than 3 characters");
        return false;
    }
}

// login form va(lidation
function validateLoginForm() {
    let email = (document.querySelector('.sign-in-container > form > [name="email"]') || {}).value;
    console.log(email)
    let password = (document.querySelector('.sign-in-container > form > [name="password"]') || {}).value;

    if (email == "") {
        alert("Please fill your email");
        return false;
    } else if (password == "") {
        alert("Please fill your password");
        return false;
    }
}

// validate add-to-cart form
function validateAddToCartForm() {
    let username = document.querySelector('.contact-details > form > div > [name="name"]').value;
    let email = document.querySelector('.contact-details > form > div > [name="email"]').value;
    let phone = document.querySelector('.contact-details > form > div > [name="phone"]').value;
    let city = document.querySelector('.contact-details > form > div > [name="city"]').value;
    let zipcode = document.querySelector('.contact-details > form > div > [name="zipcode"]').value;
    console.log(email)

    if (email == "") {
        alert("Please fill your email");
        return false;
    } else if (username == "") {
        alert("Please fill your username");
        return false;
    } else if (phone == "") {
        alert("Please fill your phone");
        return false;
    } else if (city == "") {
        alert("Please fill your city");
        return false;
    } else if (zipcode == "") {
        alert("Please fill your zipcode");
        return false;
    }
}
