document.getElementById('logout').addEventListener('click', function () {
    logout();
});

function logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');

    window.location.replace('index.html');
}
document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('accessToken');
    if (token) {
        document.getElementById('signindiv').classList.add('hidden');
        document.getElementById('creatediv').classList.remove('hidden');
    } else {
        document.getElementById('signindiv').classList.remove('hidden');
        document.getElementById('creatediv').classList.add('hidden');
    }
});
