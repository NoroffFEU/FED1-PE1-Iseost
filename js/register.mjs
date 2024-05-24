

//Når noen trykker på register knappen, henter vi ut det brukeren
//har skrevet inn av mail og passord og sender dette videre til  funsjonen
//som poste til api - login

//eventlister til registeringsknappen forteller hva den skal gjøre
document.getElementById('register').addEventListener('click', function () {
    const email = document.getElementById('register_email').value;
    const password = document.getElementById('register_password').value;
    const name = document.getElementById('register_username').value;

    register(email, password, name)
});

//funksjon for api kall
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
    //Sender over til index side vis alt stemmer med api
    console.log(data);
    if (data.status === 201) {
        window.location.replace('/account/login.html')
        console.log(data);
    } 

}