import RegisterGql from '~/graphql/account/register.graphql'
import LoginGql from '~/graphql/account/login.graphql'
import CheckGql from '~/graphql/account/check.graphql'

export const state = () => ({
  customer: null,
  auth: false
})

export const getters = {
  get(state) {
    return state.customer
  },
  auth(state) {
    return state.auth
  }
}

export const mutations = {
  setCustomer(state, payload) {
    state.customer = payload
  },
  setAuth(state, payload) {
    state.auth = payload
  }
}

export const actions = {
  async login({ commit, dispatch, rootGetters }, customerData) {
    await dispatch(
      'apollo/mutate',
      {
        mutation: LoginGql,
        variables: customerData
      },
      {
        root: true
      }
    )

    if (!rootGetters['vuefront/error']) {
      commit('setCustomer', rootGetters['apollo/get'].accountLogin)
    }
  },
  async register({ commit, dispatch, rootGetters }, customerData) {
    await dispatch(
      'apollo/mutate',
      {
        mutation: RegisterGql,
        variables: {
          customer: customerData
        }
      },
      {
        root: true
      }
    )

    if (!rootGetters['vuefront/error']) {
      commit('setCustomer', rootGetters['apollo/get'].accountRegister)
    }
  },
  async checkLogged({ commit, dispatch, rootGetters }) {
    await dispatch(
      'apollo/mutate',
      {
        mutation: CheckGql
      },
      {
        root: true
      }
    )
    if (!rootGetters['vuefront/error']) {
      commit(
        'setCustomer',
        rootGetters['apollo/get'].accountCheckLogged.customer
      )
      commit('setAuth', rootGetters['apollo/get'].accountCheckLogged.status)
    }
  }
}