/* eslint-disable no-unused-vars */
import { get, post_array, post } from '@/utils/request'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    orders: [],
    message: '',
    customers: [],
    customerName: {},
    id: {}
  },
  getters: {
    filterOrdersByStatus(state) {
      return (status) => {
        return state.orders.filter((item) => {
          return item.status === status
        })
      }
    }
  },
  mutations: {
    resetOrders(state, orders) {
      state.orders = orders
    },
    resetMessage(state, message) {
      state.message = message
    },
    queryOrder(state, corder) {
      state.customerName = corder
    }
  },
  actions: {
    // 取消派单
    async cancelSendOrder({ commit, dispatch }, orderId) {
      const response = await get('/order/cancelSendOrder', { orderId })
      dispatch('findAllOrders')
      return response
    },
    // 派单
    async sendOrder({ commit, dispatch }, params) {
      const response = await get('/order/sendOrder', params)
      dispatch('findAllOrders')
      return response
    },
    // 查询所有订单
    // async findAllOrders({ commit }, params) {
    async findAllOrders({ commit }) {
      const response = await get('/order/findAll')
      // eslint-disable-next-line no-undef
      // if (!params) {
      //   params = {
      //     page: 0,
      //     pageSize: 5
      //   }
      // }
      // eslint-disable-next-line no-undef
      // const response = await post('/order/queryPage', params)
      response.data.forEach((item) => {
        item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
      })
      // console.log(response.data.list)
      // commit('resetOrders', response.data.list)
      commit('resetOrders', response.data)
    },
    async findOrderQuery({ commit }, customerId) {
      const response = await get('/order/query', { customerId })
      // eslint-disable-next-line no-undef
      commit('queryOrder', response.data)
    }
  }
}
