const { buildApiBase, requireApiKey, fetchJson } = require('./_utils');

module.exports = async (req, res) => {
    if (!requireApiKey(req, res)) return;

    try {
        const base = buildApiBase();
        const category_id = req.query.category_id;
        const action = "get_vod_streams";
        const url = category_id ? `${base}&action=${action}&category_id=${encodeURIComponent(category_id)}` : `${base}&action=${action}`;

        const data = await fetchJson(url);
        res.status(200).json({ ok: true, items: data });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
