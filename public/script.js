document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = document.getElementById('message').value;
    const imageInput = document.getElementById('image');
    const postsDiv = document.getElementById('posts');

    // Handle image upload
    let imageData = null;
    if (imageInput.files[0]) {
        const reader = new FileReader();
        imageData = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(imageInput.files[0]);
        });
    }

    // Send data to backend
    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, image: imageData })
    });

    if (response.ok) {
        const post = await response.json();
        displayPost(post);
        document.getElementById('postForm').reset();
    }
});

// Fetch and display existing posts
async function loadPosts() {
    const response = await fetch('/api/posts');
    const posts = await response.json();
    posts.forEach(displayPost);
}

function displayPost(post) {
    const postsDiv = document.getElementById('posts');
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `<p>${post.message}</p>`;
    if (post.image) {
        postDiv.innerHTML += `<img src="${post.image}" alt="User upload">`;
    }
    postsDiv.prepend(postDiv); // Newest posts at the top
}

loadPosts();
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
