import numeral from "numeral";

const moment = require("moment");
const mixin = {
  data: function() {
    return {
      base: process.env.BASE_URL,
    };
  },
  filters: {
    getInitials(strArr) {
      try {
        let initials;
        initials = [];
        if (strArr.length) {
          strArr.forEach((element) => {
            initials.push(element[0]);
          });
        }
        return initials.join("");
      } catch (e) {
        console.error(e);
      }
    },
    lowercase(str) {
      return str.toLowerCase();
    },
    capitalize(value) {
      if (!value) return "";
      value.toString().toLowerCase();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    numerate(value) {
      if (String(Math.floor(value)).length > 9)
        return numeral(value).format("0.0a");
      return Intl.NumberFormat("en-UK", {}).format(value);
    },
    formatDataDate(dateString) {
      return moment(dateString).format("Do, MMM YYYY");
    },
    formatDate(dateString) {
      return moment(dateString).format("MMM YYYY");
    },
    slug(str) {
      return str != undefined
        ? str
            .trim()
            .replace(" ", "-")
            .toLowerCase()
        : str;
    },
  },
  methods: {
    toastrAdd(title, msg, type) {
      this.$toastr.Add({
        msg: msg,
        title: title,
        clickClose: true,
        type: type,
      });
    },
    disableTracking() {
      this.$ga.disable();
    },
    enableTracking() {
      this.$ga.enable();
    },
  },
};

export default mixin;
