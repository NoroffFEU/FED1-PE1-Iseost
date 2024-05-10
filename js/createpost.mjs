

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

}



