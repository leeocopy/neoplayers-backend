const { buildApiBase, requireApiKey, fetchJson } = require('./_utils');

module.exports = async (req, res) => {
    if (!requireApiKey(req, res)) return;

    try {
        const base = buildApiBase();
        const [live, movies, series] = await Promise.all([
            fetchJson(`${base}&action=get_live_categories`).catch(() => []),
            fetchJson(`${base}&action=get_vod_categories`).catch(() => []),
            fetchJson(`${base}&action=get_series_categories`).catch(() => [])
        ]);

        res.status(200).json({
            "ok": true,
            "categories": {
                "live": live,
                "movies": movies,
                "series": series
            }
        });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
