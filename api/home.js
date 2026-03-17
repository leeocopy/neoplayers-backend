const { buildApiBase, requireApiKey, fetchJson } = require("./_utils");

module.exports = async (req, res) => {
  if (!requireApiKey(req, res)) return;

  try {
    const base = buildApiBase();

    const liveUrl = `${base}&action=get_live_categories`;
    const moviesUrl = `${base}&action=get_vod_categories`;
    const seriesUrl = `${base}&action=get_series_categories`;

    console.log("[HOME] start");
    console.log("[HOME] liveUrl:", liveUrl);
    console.log("[HOME] moviesUrl:", moviesUrl);
    console.log("[HOME] seriesUrl:", seriesUrl);

    const live = await fetchJson(liveUrl);
    console.log("[HOME] live count:", Array.isArray(live) ? live.length : -1);

    const movies = await fetchJson(moviesUrl);
    console.log("[HOME] movies count:", Array.isArray(movies) ? movies.length : -1);

    const series = await fetchJson(seriesUrl);
    console.log("[HOME] series count:", Array.isArray(series) ? series.length : -1);

    return res.status(200).json({
      ok: true,
      categories: {
        live,
        movies,
        series,
      },
    });
  } catch (error) {
    console.error("[HOME] failed:", error?.message || error);

    return res.status(500).json({
      ok: false,
      endpoint: "home",
      error: error?.message || "Failed to load categories",
    });
  }
};