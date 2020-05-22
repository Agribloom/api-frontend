const SitemapPlugin = require("sitemap-webpack-plugin").default;
const paths = [
  {
    path: "/",
    lastmod: new Date().toISOString().slice(0, 10),
  },
  {
    path: "/farms",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: "1",
    changefreq: "monthly",
  },
  {
    path: "/about",
    lastmod: new Date().toISOString().slice(0, 10),
  },
  {
    path: "/contact",
    lastmod: new Date().toISOString().slice(0, 10),
  },
  {
    path: "/sign-in",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: "0.8",
  },
  {
    path: "/sign-up",
    lastmod: new Date().toISOString().slice(0, 10),
    priority: "0.8",
  },
];

module.exports = {
  configureWebpack: {
    plugins: [
      new SitemapPlugin("https://agribloom.com", paths, {
        filename: "sitemap.xml",
        lastmod: true,
        changefreq: "hourly",
        priority: "0.8",
      }),
    ],
  },
};
