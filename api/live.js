const { buildApiBase, requireApiKey, fetchJson } = require('./_utils');

module.exports = async (req, res) => {
    if (!requireApiKey(req, res)) return;

    try {
        const base = buildApiBase();
        const category_id = req.query.category_id;

        if (!category_id) {
            return res.status(400).json({ ok: false, error: "category_id is required" });
        }

        const action = "get_live_streams";
        const url = `${base}&action=${action}&category_id=${encodeURIComponent(category_id)}`;

        const data = await fetchJson(url);
        res.status(200).json({ ok: true, items: data });
    } catch (error) {
        res.status(500).json({ ok: false, error: error.message });
    }
};
