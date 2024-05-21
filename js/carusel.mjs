document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.querySelector('.carousel');
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  let currentIndex = 0;
  let posts = [];

  // Fetch latest posts
  async function fetchLatestPosts() {
    try {
      const response = await fetch(`https://v2.api.noroff.dev/blog/posts/iseeng/?limit=3`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
        }
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log('API response:', data); // Log the API response
        posts = data.data; // Extract the array of posts from the data property
        if (Array.isArray(posts)) {
          renderCarouselItems();
        } else {
          console.error('Unexpected response format:', data);
        }
      } else {
        console.error('Failed to fetch posts:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  // Render carousel items
  function renderCarouselItems() {
    carouselContainer.innerHTML = posts.map(post => `
      <div class="carousel-item">
        <a href="/post/index.html?id=${post.id}">
          <img src="${post.media.url}" alt="${post.media.alt}">
          <h2>${post.title}</h2>
        </a>
        <p>${post.body.slice(0, 100)}...</p>
      </div>
    `).join('');
  }

  // Show carousel item based on index
  function showCarouselItem(index) {
    const totalItems = posts.length;
    carouselContainer.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;
  }

  // Show next item
  function showNextItem() {
    const nextIndex = (currentIndex + 1) % posts.length;
    showCarouselItem(nextIndex);
  }

  // Show previous item
  function showPrevItem() {
    const prevIndex = (currentIndex - 1 + posts.length) % posts.length;
    showCarouselItem(prevIndex);
  }

  // Event listeners for buttons
  nextButton.addEventListener('click', showNextItem);
  prevButton.addEventListener('click', showPrevItem);

  // Initial fetch and render
  fetchLatestPosts();
});
