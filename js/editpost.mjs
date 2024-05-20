document.addEventListener('DOMContentLoaded', function() {
    const postId = new URLSearchParams(window.location.search).get('id');
    loadPostData(postId);

    document.getElementById('save_edit').addEventListener('click', function() {
        const title = document.getElementById('edit_titlepost').value;
        const content = document.getElementById('edit_post').value;
        const image = document.getElementById('edit_image').value;
        const imageDescription = document.getElementById('edit_image_description').value;

        editBlogPost(postId, title, content, image, imageDescription);
    });

    document.getElementById('delete_post').addEventListener('click', function() {
        deleteBlogPost(postId);
    });
});

async function loadPostData(postId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'X-Noroff-API-Key': apiKey.data.apiKey
            }
        });

        if (response.ok) {
            const post = await response.json();
            document.getElementById('edit_titlepost').value = post.title;
            document.getElementById('edit_post').value = post.body;
            document.getElementById('edit_image').value = post.media.url;
            document.getElementById('edit_image_description').value = post.media.alt;
        } else {
            alert('Failed to load post data.');
        }
    } catch (error) {
        console.error('Error loading post data:', error);
    }
}

async function editBlogPost(postId, title, body, url, alt) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'X-Noroff-API-Key': apiKey.data.apiKey
            },
            body: JSON.stringify({
                title: title,
                body: body,
                media: {
                    url: url,
                    alt: alt
                }
            })
        });

        if (response.ok) {
            alert('Post updated successfully.');
            window.location.replace(`/post/index.html?id=${postId}`);
        } else {
            alert('Failed to update post.');
        }
    } catch (error) {
        console.error('Error updating post:', error);
    }
}

async function deleteBlogPost(postId) {
    try {
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${postId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                'X-Noroff-API-Key': apiKey.data.apiKey
            }
        });

        if (response.ok) {
            alert('Post deleted successfully.');
            window.location.replace('/index.html');
        } else {
            alert('Failed to delete post.');
        }
    } catch (error) {
        console.error('Error deleting post:', error);
    }
}
