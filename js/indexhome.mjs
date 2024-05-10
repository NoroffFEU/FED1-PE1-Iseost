
if (localStorage.getItem('accessToken')) {
    document.getElementById('creatediv').classList.remove('hidden');
}
else {
    document.getElementById('signindiv').classList.remove('hidden');
}