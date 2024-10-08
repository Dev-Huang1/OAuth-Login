const clientId = '68ef2bce-8c9f-4d76-a5cb-e01dd9fae8d5'; // 替换为你的客户端ID
const tenantId = '2ad59365-815a-43a1-ab6a-26e6cf232a68'; // 替换为你的租户ID
const redirectUri = 'https://login-test.xyehr.cn/auth/microsoft/callback'; // 替换为你的回调URL

        function login() {
            const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid profile email&response_mode=fragment&state=12345`;
            window.location.href = authUrl;
        }

        function handleAuthResponse() {
            const hash = window.location.hash.substr(1);
            const result = hash.split('&').reduce((res, item) => {
                let parts = item.split('=');
                res[parts[0]] = parts[1];
                return res;
            }, {});

            if (result.access_token) {
                document.getElementById('result').innerText = `Access Token: ${result.access_token}`;
            } else if (result.error) {
                document.getElementById('result').innerText = `Error: ${result.error_description}`;
            }
        }

        window.onload = function() {
            if (window.location.hash) {
                handleAuthResponse();
            }
        }
