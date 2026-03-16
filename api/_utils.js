function getEnv() {
    const vars = {
        base_url: process.env.UPSTREAM_BASE_URL,
        username: process.env.UPSTREAM_USERNAME,
        password: process.env.UPSTREAM_PASSWORD,
        api_token: process.env.APP_API_TOKEN
    };
    if (!vars.base_url || !vars.username || !vars.password) {
        throw new Error("Missing Upstream Credentials in environment variables");
    }
    return vars;
}

function buildApiBase() {
    const env = getEnv();
    return `${env.base_url}/player_api.php?username=${encodeURIComponent(env.username)}&password=${encodeURIComponent(env.password)}`;
}

function requireApiKey(req, res) {
    try {
        const env = getEnv();
        if (env.api_token) {
            const apiKey = req.headers['x-api-key'];
            if (apiKey !== env.api_token) {
                res.status(401).json({ ok: false, error: "Unauthorized" });
                return false;
            }
        }
        return true;
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
        return false;
    }
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Upstream returned ${response.status}`);
    }
    return response.json();
}

module.exports = { getEnv, buildApiBase, requireApiKey, fetchJson };
