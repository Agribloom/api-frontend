const farm = {
    namespaced: true,
    state: () => ({
        farms: [],
        loading: false,
        errors: []
    }),
    getters: {
        loading (state) {
            return state.loading
        },
        pluralError (state) {
            return state.errors
        },
        hasError (state) {
            return state.errors.length
        },

        plural (state) {
            return state.farms.results || []
        },
        pluralOpen (state, getters) {
            const plural = getters.plural
            return plural.length
                ? plural.filter((farm) => farm.status === 'open')
                : []
        },
        pluralSold (state, getters) {
            const plural = getters.plural
            return plural.length
                ? plural.filter((farm) => farm.status === 'sold_out')
                : []
        },
        pluralClosed (state, getters) {
            const plural = getters.plural
            return plural.length
                ? plural.filter((farm) => farm.status === 'close')
                : []
        },
        pluralInsured (state, getters) {
            const plural = getters.plural
            return plural.length ? plural.filter((farm) => farm.insured) : []
        },
        singularByCategory: (state, getters) => (id) => {
            const plural = getters.plural
            return plural.length ? plural.find((farm) => farm.category === id) : []
        },
        singularById: (state, getters) => (id) => {
            const plural = getters.plural
            return plural.length ? plural.find((farm) => farm.id === id) : []
        }
    },
    mutations: {
        SET_LOADING (state, status) {
            state.loading = status
        },
        /* Errors */
        SET_ERROR (state, errors) {
            state.errors.push(errors)
        },
        RESET_ERROR (state) {
            state.errors = []
        },
        /* Farms */
        SET_FARM (state, payload) {
            state.farm = payload
        },
        SET_FARMS (state, payload) {
            state.farms = payload
        },
        UNSET_FARM (state) {
            state.farm = []
        },
        UNSET_FARMS (state) {
            state.farms = []
        }
    },
    actions: {
    /* Farm API */
        fetchSingularById ({ getters, commit, dispatch, rootState }, id) {
            commit('RESET_ERROR')
            if (!getters.plural !== undefined) {
                commit('SET_LOADING', true)
            }
        },
        fetchPlural ({ getters, commit }) {
            commit('RESET_ERROR')
            if (!getters.plural.length) {
                commit('SET_LOADING', true)
                window.axios
                    .get('farms')
                    .then((response) => {
                        commit('SET_FARMS', response.data)
                    })
                    .catch((e) => {
                        commit('SET_ERROR', e)
                    })
                    .finally(() => {
                        commit('SET_LOADING', false)
                    })
            }
        },
        fetchCategories ({ getters, commit }) {}
    }
}

export default farm
