
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
function createBlogBox(coverImage, blogTitle, blogId) {
    const content = document.getElementById("blog_post_conatiner");



    //Blog image
    const card = document.createElement('div');
    card.classList.add("card");

    const blogImage = document.createElement("img");
    blogImage.src = coverImage;
    blogImage.classList.add("cover");

    blogImage.addEventListener("click", function () {
        window.location.href = `/post/index.html?id=${blogId}`;
    });

    card.appendChild(blogImage);

    //Blog title
    const title = document.createElement("h2");
    title.classList.add('cover_text');
    title.innerText = blogTitle;


    card.appendChild(title);

    content.appendChild(card);

}

async function createPostes() {
    const blogs = await getPostes();


    blogs.forEach((blog) => {
        createBlogBox(blog.media.url, blog.title, blog.id);
    });

}

createPostes();