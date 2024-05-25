
if (localStorage.getItem('accessToken')) {
    document.getElementById('creatediv').classList.remove('hidden');
}
else {
    document.getElementById('signindiv').classList.remove('hidden');
}


async function getPostes() {
    const data = await fetch('https://v2.api.noroff.dev/blog/posts/iseeng');
    const blog = await data.json();
    console.log(blog);
    return blog.data;
}


//Blog boxes
function createBlogBox(coverImage, blogTitle, blogText, blogButton, blogId) {
    const content = document.getElementById("blog_post_conatiner");

    const maxLength = 100;

    const cutText = blogText.length > maxLength
    ? blogText.substring(0, maxLength) + "..."
    : blogText;

    //Blog image
    const card = document.createElement('div');
    card.classList.add("card");
    card.classList.add("flex");

    const blogImage = document.createElement("img");
    blogImage.src = coverImage;
    blogImage.classList.add("cover");

    blogImage.addEventListener("click", function () {
        window.location.href = `/post/index.html?id=${blogId}`;
    });

    card.appendChild(blogImage);

    //Blog title, text and button
    const title = document.createElement("h2");
    title.classList.add('cover_text');
    title.innerText = blogTitle;

    const smallText = document.createElement("p");
    smallText.classList.add("cover_small_text");
    smallText.innerText = cutText;

    const button = document.createElement("button");
    button.classList.add("button_color");
    button.innerText = blogButton;

    button.addEventListener("click", function () {
        window.location.href = `/post/index.html?id=${blogId}`;
    });

    card.appendChild(title);
    card.appendChild(smallText);
    card.appendChild(button);

    content.appendChild(card);

}

async function createPostes() {
    const blogs = await getPostes();


    blogs.forEach((blog) => {
        const buttonText = "Read More"
        createBlogBox(blog.media.url, blog.title, blog.body, buttonText, blog.id);
    });

}

createPostes();