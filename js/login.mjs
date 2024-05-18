



//Når noen trykker på log in knappen, henter vi ut det brukeren
//har skrevet inn av mail og passord og sender dette videre til login funsjonen
//som poste til api - login

//eventlister til login knappen forteller hva den skal gjøre
document.getElementById('login').addEventListener('click', function () {
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;
    
    login(email, password) 
});

//funksjon for api kall
async function login(email, password) {
    const data = await fetch("https://v2.api.noroff.dev/auth/login", {
        method: 'post',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            email:email,
            password:password
        })
    });
    //Sender over til homepage vis alt stemmer med api
    if(data.status === 200){
        const tech = await data.json();
        const token = tech.data.accessToken;
        const name = tech.data.name;
        localStorage.setItem('accessToken', token);
        localStorage.setItem('username', name);
        window.location.replace('/index.html')
    }

}

