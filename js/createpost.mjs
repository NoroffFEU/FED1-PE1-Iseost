

document.getElementById('save_create').addEventListener('click', function () {
    const title = document.getElementById('create_titlepost').value;
    const content = document.getElementById('create_post').value;
    const image = document.getElementById('create_image').value;

    create_blogpost(title, content, image)
})

document.getElementById('create_titlepost').addEventListener('input', function() {
    document.getElementById('title_preview').innerText = document.getElementById('create_titlepost').value;
})

document.getElementById('create_post').addEventListener('input', function() {
    document.getElementById('body_preview').innerText = document.getElementById('create_post').value;
})

document.getElementById('create_image').addEventListener('input', function() {
    document.getElementById('image_preview').src = document.getElementById('create_image').value;
})



async function create_blogpost(title, body, url, alt) {
    const data = await fetch("https://v2.api.noroff.dev/blog/posts/iseeng", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
        },
        body: JSON.stringify ({
            title:title,
            body:body,
            media: {
                url:url,
                alt:alt
            }
        })
    });

    if(data.status === 201){
        const tech = await data.json();
        const id = tech.data.id;
        window.location.replace(`/post/index.html/?id=${id}`)
    }
}





