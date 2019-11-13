import request from '@/utils/request'
import { post, post_array } from '@/utils/request'

export default {
  namespaced: true,
  state: {
    customers: [],
    visible: false,
    title: '添加顾客信息',
    loading: false
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
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    refreshCustomers(state, customers) {
      state.customers = customers
    },
    setTitle(state, title) {
      state.title = title
    },
    beginLoading(state) {
      state.loading = true
    },
    endLoading(state) {
      state.loading = false
    }
  },
  actions: {
    async findAllCustomers({ dispatch, commit }) {
      // 1. ajax查询
      commit('beginLoading')
      const response = await request.get('/customer/findAll')
      // 2. 将查询结果更新到state中
      commit('refreshCustomers', response.data)
      setTimeout(() => {
        commit('endLoading')
      }, 1000)
    }
  }
}
