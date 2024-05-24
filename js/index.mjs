// Hent url paramameter
// Hvordan hente en enkel blogg post fra api - GET
// Hent inn blogpost
// Se hva du gjorde på gamehub siå - replace!
// Style!

if (localStorage.getItem('accessToken')) {
    document.getElementById('edit_button').classList.remove('hidden');
}
else {
    document.getElementById('edit_button').classList.add('hidden');
}

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
        const author = tech.data.author;
        const created = new Date(tech.data.created);
        const updated = new Date(tech.data.updated);
        const share = tech.data.id;
        const titlebox = document.getElementById('title')
        const blogbox = document.getElementById('content')
        const imagebox = document.getElementById('image')
        const authorbox = document.getElementById('author')
        const createdbox = document.getElementById('created')
        const updatedbox = document.getElementById('updated')
        const sharebox = document.getElementById('share')
        const editbutton = document.getElementById('edit_button')
       
        titlebox.innerHTML = title;
        blogbox.innerHTML = body;
        imagebox.src = media.url;
        imagebox.setAttribute('alt', media.alt);

        authorbox.innerHTML = `Author: ${author.name}`;
        createdbox.innerHTML = `Created: ${created.toLocaleString('nb-NO')}`;
        updatedbox.innerHTML = `Updated: ${updated.toLocaleString('nb-NO')}`;
        sharebox.innerHTML = `Share this post: ${share}`;
        editbutton.href = `/post/edit.html?id=${id}` 
    }
}


