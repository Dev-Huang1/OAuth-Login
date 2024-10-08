document.getElementById('login-button').addEventListener('click', function() {
    const clientId = 'b0c7992e66b749bfb6dff597a8fa4da4';
    const redirectUri = 'https://login-test.xyehr.cn/auth/spotify/callback';
    const scopes = [
        'user-read-private',
        'user-read-email'
    ];

    const authUrl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;

    window.location = authUrl;
});

// 获取访问令牌
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get('access_token');

    if (accessToken) {
        console.log('Access Token:', accessToken);

        fetch('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('User Info:', data);
            document.body.innerHTML += `<p>Welcome, ${data.display_name}</p>`;
        })
        .catch(error => console.error('Error fetching user info:', error));
    }
});
