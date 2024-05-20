
if (localStorage.getItem('accessToken')) {
    document.getElementById('creatediv').classList.remove('hidden');
}
else {
    document.getElementById('signindiv').classList.remove('hidden');
}


async function getPostes() {
    const data = await fetch('https://v2.api.noroff.dev/blog/posts/iseeng'); //social/profiles/<name>/posts
    const games = await data.json();
    console.log(games);
    return games.data;
}

function createBlogBox(coverImage, blogTitle, blogId ) {
    const content = document.getElementById("blog_post_conatiner");



    //blog image
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
    const title = document.createElement("p");
    // title.classList.add("small_title");
    title.innerText = blogTitle;

    card.appendChild(title);

    content.appendChild(card);

    //a tag



}

async function createPostes() {
    const blogs = await getPostes();


    blogs.forEach((blog) => {
        createBlogBox(blog.media.url, blog.title, blog.id);
    });

}

createPostes();




