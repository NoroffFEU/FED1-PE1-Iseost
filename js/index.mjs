// Hent url paramameter
// Hvordan hente en enkel blogg post fra api - GET
// Hent inn blogpost
// Se hva du gjorde på gamehub siå - replace!
// Style!


const parameter = window.location.search;
const searchParameter = new URLSearchParams(parameter);

const id = searchParameter.get('id');

get_blogpost(id);

async function get_blogpost(id) {
    const data = await fetch(`https://v2.api.noroff.dev/blog/posts/iseeng/${id}`)
    if (data.status === 200) {
        const tech = await data.json();
        const title = tech.data.title;
        const body = tech.data.body;
        const media = tech.data.media;
        const titlebox = document.getElementById('title')
        const blogbox = document.getElementById('content')
        const imagebox = document.getElementById('image')
        titlebox.innerHTML = title;
        blogbox.innerHTML = body;
        imagebox.src = media.url;
        imagebox.setAttribute('alt', media.alt);
        
    }
}






//game image
const card = document.createElement('div');
card.classList.add("card");

const gameImage = document.createElement("img");
gameImage.src = coverImage;
gameImage.classList.add("cover");

gameImage.addEventListener("click", function () {
    window.location.href = 'post/index.html';
});

card.appendChild(gameImage);

//Game title
const title = document.createElement("p");
// title.classList.add("small_title");
title.innerText = gameTitle;

card.appendChild(title);

content.appendChild(card);


async function createGames() {
    const games = await getGames();


    games.forEach((game) => {
        createBlogBox(game.image.url, game.title, game.genre);
    });

}

createGames();









