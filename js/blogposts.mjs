// Blog post and carousel

const USER = "iseeng";
const SORT_BY = "updated";
const SORT_ORDER = "desc";
const LIMIT = 12;

const CAROUSEL_ITEMS = 3;

const FETCH_URL = `https://v2.api.noroff.dev/blog/posts/${USER}?sort=${SORT_BY}&sortOrder=${SORT_ORDER}&limit=${LIMIT}`;

let posts = [];
let currentIndex = 0;

function createCarousel() {
    const carouselContainer = document.getElementById('carousel');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    for (let i = 0; i < CAROUSEL_ITEMS; i++) {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${posts[i].media.url}" alt="">
      <div class="text_carousel flex"><h2>${posts[i].title}</h2>
      <p>${posts[i].body.substring(0,200)}</p>
      <a href="/post/index.html?id=${posts[i].id}"><button class="latest-post-button button_color">Read More</button></a></div>`
      li.classList.add('carousel-item');
      li.classList.add('flex');

      li.addEventListener("click", function () {
        window.location.href = `/post/index.html?id=${posts[i].id}`;
      });
      
      carouselContainer.appendChild(li);
    }

    const latestPosts = document.querySelector('.carousel-item');

    prevButton.addEventListener('click', function () {
      if (currentIndex === 0) {
        currentIndex = 2;
        carouselContainer.scrollLeft += latestPosts.clientWidth * 2;
      } else {
        currentIndex -= 1;
        carouselContainer.scrollLeft -= latestPosts.clientWidth;
      }
    });

    nextButton.addEventListener('click', function () {
      if (currentIndex === 2) {
        currentIndex = 0;
        carouselContainer.scrollLeft -= latestPosts.clientWidth * 2;
      } else {
        currentIndex += 1;
        carouselContainer.scrollLeft += latestPosts.clientWidth;
      }
    });
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

export async function initApp() {
    const data = await fetch(FETCH_URL);
    const json = await data.json();
    posts = json.data;
    
    createCarousel();

    const buttonText = "Read More"

    posts.forEach((post) => {        
        createBlogBox(post.media.url, post.title, post.body, buttonText, post.id);
    });
}
