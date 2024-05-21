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
    const carouselContainer = document.querySelector('.carousel');
    carouselContainer.innerHTML = posts.map(post => `
      <div class="carousel-item post-container">
        <div class="post-content">
          <a href="/post/index.html?id=${post.id}">
            <h2>${post.title}</h2>
          </a>
          <p>${post.body.slice(0, 200)}...</p>
          <a href="/post/index.html?id=${post.id}" class="latest-post-button">Read More</a>
        </div>
        <div class="post-image">
          <img src="${post.media.url}" alt="${post.media.alt}">
        </div>
      </div>
    `).join('');
    showCarouselItem(currentIndex);
  }

  function showCarouselItem(index) {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    carouselItems.forEach((item, i) => {
      item.style.transform = `translateX(-${index * 100}%)`;
    });
    currentIndex = index;
  }

  function showNextItem() {
    const nextIndex = (currentIndex + 1) % posts.length;
    showCarouselItem(nextIndex);
  }

  function showPrevItem() {
    const prevIndex = (currentIndex - 1 + posts.length) % posts.length;
    showCarouselItem(prevIndex);
  }

  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');

  prevButton.addEventListener('click', showPrevItem);
  nextButton.addEventListener('click', showNextItem);

  fetchLatestPosts();
});
