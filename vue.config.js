const SitemapPlugin = require("sitemap-webpack-plugin").default;
const imageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

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
    pwa: {
        name: 'Agribloom',
        themeColor: 'hsl(117, 52%, 44%)',
        iconPaths: {
            favicon32: 'assets/favicons/favicon-32x32.ico',
            favicon16: 'assets/favicons/favicon-16x16.ico',
            appleTouchIcon: 'assets/favicons/apple-touch-icon-152x152.ico',
            maskIcon: 'assets/favicons/safari-pinned-tab.svg',
            msTileImage: 'assets/favicons/msapplication-icon-144x144.ico'
        }
    },
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([{
                from: path.posix.join(path.resolve(__dirname, 'public/assets/images').replace(/\\/g, '/'), '/*.{png,jpg}'),
                to: path.resolve(__dirname, 'dist'),
            }]),
            new SitemapPlugin("https://agribloom.farm", paths, {
                filename: "sitemap.xml",
                lastmod: true,
                changefreq: "hourly",
                priority: "0.8",
            }),
            new imageminPlugin({
                disable: process.env.NODE_ENV !== 'production',
                pngquant: {
                    quality: '45-50'
                },
                test: /\.(jpe?g|png|gif|svg)$/i,
                plugins: [
                    imageminMozjpeg({
                        quality: 50,
                        progressive: true
                    })]
            })
        ],
    },
};
