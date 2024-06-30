const baseUrl = ''; // Update this with your server URL if needed

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const createPostForm = document.getElementById('createPostForm');
    const postsContainer = document.getElementById('postsContainer');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'User logged in successfully') {
                    localStorage.setItem('username', username);
                    window.location.href = 'home.html';
                } else {
                    alert('Invalid credentials');
                }
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const password = e.target.password.value;

            fetch(`${baseUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'User registered successfully') {
                    localStorage.setItem('username', username);
                    window.location.href = 'home.html';
                } else {
                    alert('User registration failed');
                }
            });
        });
    }

    if (createPostForm) {
        createPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const content = e.target.content.value;
            const username = localStorage.getItem('username');

            fetch(`${baseUrl}/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content, username })
            })
            .then(response => response.text())
            .then(data => {
                if (data === 'Post created successfully') {
                    window.location.href = 'home.html';
                } else {
                    alert('Post creation failed');
                }
            });
        });
    }

    if (postsContainer) {
        fetch(`${baseUrl}/posts`)
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>by ${post.username}</p>
                `;
                postElement.addEventListener('click', () => {
                    alert(post.content);
                });
                postsContainer.appendChild(postElement);
            });
        });
    }
});

function logout() {
    localStorage.removeItem('username');
}
