import router from "../router";

const user = {
  namespaced: true,
  state: () => ({
    auth: false,
    type: "guest",
    token: "",
    data: {},
    loading: false,
    investments: [],
    transactions: [],
    errors: [],
  }),
  getters: {
    data(state, getters, rootState) {
      return state.data || [];
    },
    token(state) {
      return state.token;
    },
    auth(state) {
      return state.auth;
    },
    loading(state) {
      return state.loading;
    },
    totalInvestment(state) {
      const investments = state.investments || [];
      let total = 0;
      if (investments && investments.results) {
        investments.results.forEach((investment) => {
          total += Number(investment.amount);
        });
      }
      return total;
    },
    highestInvestment(state) {
      const investments = state.investments || [];
      let highest = 0;
      if (investments && investments.results) {
        highest = investments.results[0];
        investments.results.forEach((investment) => {
          highest = investment.amount > highest.amount ? investment : highest;
        });
      }

      return highest;
    },
    lowestInvestment(state) {
      const investments = state.investments || [];
      let lowest = 0;
      if (investments && investments.results) {
        lowest = investments.results[0];
        investments.results.forEach((investment) => {
          lowest = investment.amount < lowest.amount ? investment : lowest;
        });
      }

      return lowest;
    },
    allInvestments(state, getters) {
      return state.investments || [];
    },
    transactions(state) {
      return state.transactions.results || [];
    },
  },
  mutations: {
    /* Errors */
    SET_ERROR(state, errors) {
      state.errors.push(errors);
    },
    RESET_ERROR(state) {
      state.errors = [];
    },
    /* User */
    SET_DATA(state, meta) {
      state.data = meta;
    },
    /* Token */
    SET_TOKEN(state, token) {
      window.axios.defaults.headers.common["Authorization"] = `Token ${token}`;
      if (!state.token.length && token) {
        state.token = token;
        state.auth = true;
        state.type = "auth";
      }
    },
    UNSET_TOKEN(state) {
      window.axios.defaults.headers.common["Authorization"] = "";
      if (state.token.length) {
        state.token = "";
        state.auth = false;
        state.type = "guest";
      }
    },
    /* Investments */
    SET_INVESTMENT(state, payload) {
      state.investments = payload;
    },
    UNSET_INVESTMENT(state) {
      state.investments = [];
    },
    /* Transactions */
    SET_TRANSACTION(state, payload) {
      state.transactions = payload;
    },
    UNSET_TRANSACTION(state) {
      state.transactions = [];
    },
    SET_LOADING(state, status) {
      state.loading = status;
    },
  },
  actions: {
    setToken({ getters, commit, dispatch, rootState }, token) {
      localStorage.setItem("token", token);
      commit("SET_TOKEN", token);
    },
    unsetToken({ commit }) {
      localStorage.removeItem("token");
      commit("UNSET_TOKEN");
    },
    signIn({ commit }) {
      let token = localStorage.getItem("token");
      if (token != null) {
        commit("SET_TOKEN", token);
      }
    },
    fetchData({ getters, commit, dispatch }) {
      commit("RESET_ERROR");
      if (getters.data === undefined || !getters.data.length) {
        commit("SET_LOADING", true);
        dispatch("signIn");
        window.axios
          .get("auth/user/")
          .then((response) => {
            commit("SET_DATA", response.data);
            dispatch("fetchInvestments");
            dispatch("fetchTransactions");
          })
          .catch((e) => {
            // Unauthorized access error
            if (e.response) {
              if (e.response.status === 401) {
                // Unset the token
                e.message += ". You've been logged out due to session timeout";
                if (localStorage.getItem("token")) {
                  dispatch("unsetToken");
                  commit("SET_ERROR", e);
                  router.push("/sign-in");
                }
              }
            } else {
              commit("SET_ERROR", e);
            }
          })
          .finally(() => {
            commit("SET_LOADING", false);
          });
      }
    },
    fetchInvestments({ getters, commit }) {
      if (getters.investments === undefined || !getters.investments.length) {
        window
          .axios({
            url: "auth/investments",
            method: "get",
            responseType: "json",
          })
          .then((response) => {
            commit("SET_INVESTMENT", response.data);
          });
      }
    },
    fetchTransactions({ getters, commit }) {
      if (getters.transactions === undefined || !getters.transactions.length) {
        window.axios.get("auth/transactions").then((response) => {
          commit("SET_TRANSACTION", response.data);
        });
      }
    },
    saveProfile({ state, commit }, data) {
      commit("RESET_ERROR");
      commit("SET_LOADING", true);

      return window.axios.patch("auth/user/", data).finally(() => {
        commit("SET_LOADING", false);
      });
    },
    resetPassword() {},
    resetPasswordRequest() {},
    fetchUserNotification({ getters, commit }) {
      commit("SET__LOADING", true);
      window.axios
        .post("")
        .then((response) => {})
        .catch((e) => {
          // console.log(e)
        })
        .finally(() => {
          commit("SET_LOADING", false);
        });
    },
  },
};

export default user;
