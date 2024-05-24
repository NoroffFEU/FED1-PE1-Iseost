document.addEventListener('DOMContentLoaded', () => {
  let currentIndex = 0;
  let posts = [];

  async function getPosts(limit = 3) {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/iseeng?limit=${limit}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
      }
    });
    const data = await response.json();
    return data.data;
  }

  async function fetchLatestPosts() {
    posts = await getPosts();
    const carouselContainer = document.getElementById('carousel');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    posts.forEach(post => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${post.media.url}" alt="">
      <h2>${post.title}</h2>
      <p>${post.body.substring(0,200)}</p>
      <a href="/post/index.html?id=${post.id}"><button>Read More</button></a>`
      li.classList.add('carousel-item');
      li.classList.add('flex');
      
      carouselContainer.appendChild(li);
    });

    const latestPosts = document.querySelector('.carousel-item');

    prevButton.addEventListener('click', function () {
      if (currentIndex === 0) {
        currentIndex = 2;
        carouselContainer.scrollLeft += latestPosts.clientWidth * 2;
      } else {
        currentIndex -= 1;
        carouselContainer.scrollLeft -= latestPosts.clientWidth;
      }
    })

    nextButton.addEventListener('click', function () {
      if (currentIndex === 2) {
        currentIndex = 0;
        carouselContainer.scrollLeft -= latestPosts.clientWidth * 2;
      } else {
        currentIndex += 1;
        carouselContainer.scrollLeft += latestPosts.clientWidth;
      }
    })
  }

  fetchLatestPosts()
});



