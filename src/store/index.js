import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import admin from './admin'
import farm from './farm'

Vue.use( Vuex );

export default new Vuex.Store( {
	state: {
		errors: [],
		loading: false
	},
	getters: {
		getState(state) {
			return state
		},
		getErrors(state) {
			return state.errors
		},
		hasError(state) {
			return state.errors.length
		},

		isDataLoading(state) {
			return state.loading
		}
	},
	mutations: {
		/* Errors */
		SET_ERROR(state, errors) {
			state.errors.push( errors )
		},
		RESET_ERROR(state) {
			state.errors = []
		},

		SET_LOADING(state, status) {
			state.loading = status
		}
	},
	actions: {
		clearError(context) {
			context.commit( 'RESET_ERROR' )
		},
		addError(context, error) {
			context.commit( 'SET_ERROR', error )
		}
	},
	modules: {
		user,
		admin,
		farm
	}
} )
