
  // Fetch the latest blog posts from your API or source
  // For demonstration purpose, I'll simulate fetching data
  const latestPosts = [
    { title: "Post 1", content: "Content of Post 1" },
    { title: "Post 2", content: "Content of Post 2" },
    { title: "Post 3", content: "Content of Post 3" }
  ];

  // Function to render blog posts
  function renderPosts(posts) {
    const carousel = document.querySelector('.carousel');
    carousel.innerHTML = '';

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
      `;
      carousel.appendChild(postElement);
    });
  }

  // Initially render latest posts
  renderPosts(latestPosts);

  // Function to handle carousel navigation
  function navigateCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const currentScroll = carousel.scrollLeft;
    const postWidth = carousel.firstElementChild.offsetWidth;
    const scrollDistance = direction === 'next' ? postWidth : -postWidth;
    carousel.scrollTo({
      left: currentScroll + scrollDistance,
      behavior: 'smooth'
    });
  }

  // Add event listeners to navigation buttons
  document.getElementById('prev').addEventListener('click', () => navigateCarousel('prev'));
  document.getElementById('next').addEventListener('click', () => navigateCarousel('next'));

