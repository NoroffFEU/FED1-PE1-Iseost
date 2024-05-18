const postIDs = [];

async function fetchPostByID(id) {
  try {
    const response = await fetch(`https://v2.api.noroff.dev/blog/posts/iseeng/${id}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

async function fetchLatestPosts(ids) {
  try {
    const posts = await Promise.all(ids.map(id => fetchPostByID(id)));
    renderPosts(posts.filter(post => post !== null)); // Filter out any null responses
  } catch (error) {
    console.error('Error fetching latest posts:', error);
  }
}

function renderPosts(posts) {
  const carousel = document.getElementById('carousel');
  carousel.innerHTML = '';

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('carousel-item');
    postElement.innerHTML = `
      <div class="lates_post_container">
        <div class="backround_image" style="background-image: url('${post.image}')"></div>
        <div class="latest_post_content">
          <h2>${post.title}</h2>
          <p class="lates_post_text">${post.excerpt}</p>
          <a href="${post.url}"><button class="read-more-button read-more-text">read more</button></a>
        </div>
      </div>
    `;
    carousel.appendChild(postElement);
  });
}

// Fetch and render the latest posts by IDs
fetchLatestPosts(postIDs);