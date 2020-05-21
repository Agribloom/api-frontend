/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */
try {
  window.Popper = require("popper.js").default;
  window.$ = window.jQuery = require("jquery");
} catch (e) {
  console.log(e.message);
}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = require("axios").default;

// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.baseURL = process.env.VUE_APP_AXIOS_BASE_URL;
window.axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
window.axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
