import request from '@/utils/request'
// eslint-disable-next-line no-unused-vars
import { post, post_array } from '@/utils/request'

export default {
  namespaced: true,
  state: {
    customers: []
  },
  getters: {
    customerSize(state) {
      return state.customers.length
    },
    orderCustomer: (state) => {
      return function(flag) {
        state.customers.sort((a, b) => {
          if (a[flag] > b[flag]) {
            return -1
          } else {
            return 1
          }
        })
        return state.customers
      }
    }
  },
  mutations: {
    refreshCustomers(state, customers) {
      state.customers = customers
    }
  },
  actions: {
    async findAllCustomers({ dispatch, commit }) {
      // 1. ajax查询
      const response = await request.get('/customer/findAll')
      commit('refreshCustomers', response.data)
    }
  }
}
