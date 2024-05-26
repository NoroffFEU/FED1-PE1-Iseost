

document.getElementById('register_button').addEventListener('click', function () {
    const email = document.getElementById('register_email').value;
    const password = getElementById('register_password').value;
    const name = document.getElementById('register_username').value;

    register(email, password, name);
});

async function register(email, password, name) {
    const data = await fetch("https://v2.api.noroff.dev/auth/register", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    });
    
    
    if (data.status === 201) {
        window.location.replace('/account/login.html')
        alert('Welcome! You will now be sent back to the login.')
    } else {
        document.getElementById('error_message_reg').textContent = 'Make sure that your email is a stud.noroff mail and your password has 8 character.'
    }
    
}