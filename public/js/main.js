function togglePassword() {
    const password = document.getElementById("password");
    password.type = password.type === "password" ? "text" : "password";
}

function toggleLoginPassword() {
    const password = document.getElementById("loginPassword");
    password.type = password.type === "password" ? "text" : "password";
}

// Email validation
function validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function signup() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const messageBox = document.getElementById("signupMessage");

    messageBox.innerHTML = "";

    if (!username || !email || !password) {
        messageBox.innerHTML = "<div class='error-message'>All fields are required!</div>";
        return;
    }

    if (!validEmail(email)) {
        messageBox.innerHTML = "<div class='error-message'>Enter valid email address!</div>";
        return;
    }

    if (password.length < 6) {
        messageBox.innerHTML = "<div class='error-message'>Password must be at least 6 characters!</div>";
        return;
    }

    const res = await fetch("/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await res.json();

    if (data.success) {
        messageBox.innerHTML = "<div class='success-message'>Account created successfully!</div>";
        setTimeout(() => window.location.href = "login.html", 1500);
    } else {
        messageBox.innerHTML = `<div class='error-message'>${data.message}</div>`;
    }
}

async function login() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
    const messageBox = document.getElementById("loginMessage");

    messageBox.innerHTML = "";

    if (!email || !password) {
        messageBox.innerHTML = "<div class='error-message'>All fields are required!</div>";
        return;
    }

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.success) {
        messageBox.innerHTML = "<div class='success-message'>Login successful!</div>";
        setTimeout(() => window.location.href = "index.html", 1500);
    } else {
        messageBox.innerHTML = `<div class='error-message'>${data.message}</div>`;
    }
}