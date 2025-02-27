const axios = require('axios');

const BASEURL = 'http://localhost:3000/facebook'


async function registerUser() {
    try {
        const name = document.getElementById('nameRegister').value;
        const email = document.getElementById('emailRegister').value;
        const password = document.getElementById('passwordRegister').value;
        const newUser = { name: name, email: email, password: password };
        const response = await axios.post(`${BASEURL}/signup`, newUser)
        if (response.status === 200) {
            alert("User Created")
            loginPage();
        } else {
            return alert("Error")
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Invalid Email or Password");
        } else {
            console.error("An error occurred:", error);
        }
    }
}

const signUpButton = document.getElementById('signUp');
if (signUpButton) {
    signUpButton.addEventListener('click', registerUser)
}

async function findSingleUser() {
    try {
        const id = 1 //document.getElementById('text')
        const response = await axios.get(`${BASEURL}/user/${id}`)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }

}

async function getUsers() {
    try {
        const response = await axios.get(`${BASEURL}/allusers`)
        const usersList = response.data.map(user => {
            return `<p class="listItem"> Name: ${user.name}, Email: ${user.email} </p>`;
        }).join('')
        document.getElementById('allProfiles').innerHTML = usersList;
        console.log('Users fetched:', response.data);
    } catch (error) {
        console.error(error)
    }

}

async function allTheFeed() {
    try {
        const response = await axios.get(`${BASEURL}/feed`)
        const feedWall = response.data.map(feed => {
            return (`  <div class="feedWall">
             <div class="feedHeader">
             <p class="feedTitle">Title: ${feed.title} </p>
                <p class="feedAuthor">Author ${feed.name}</p>
             </div>
             <p class="feedContent"> ${feed.content} </p>
             </div>`
            )
        }).join('')
        document.getElementById('allFeed').innerHTML = feedWall;
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}


async function loginUser() {
    try {
        const email = document.getElementById('emailSubmit').value;
        const password = document.getElementById('passwordSubmit').value;
        const info = { email: email, password: password };
        const response = await axios.post(`${BASEURL}/login`, info);
        window.location.href = "../main.html";
        alert("Login Successful!");
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("Invalid Email or Password");
        } else {
            console.error("An error occurred:", error);
        }
    }
}

function registerpage() {
    window.location.href = "./register.html"
}
function loginPage() {
    window.location.href = "./login.html"
}

document.addEventListener("DOMContentLoaded", allTheFeed);

const button3 = document.getElementById('loginButton')
if (button3) {
    button3.addEventListener('click', loginUser)
}
const registerButton = document.getElementById('registerButton');
if (registerButton) {
    registerButton.addEventListener('click', registerpage)
}

const backToSignUpButton = document.getElementById('backToLogin');
if (backToSignUpButton) {
    backToSignUpButton.addEventListener('click', loginPage)
}