/* eslint-disable no-unused-vars */
import { get, post_array, post } from '@/utils/request'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    orders: [],
    message: '',
    customers: [],
    test: ''
  },
  getters: {
    // filterOrdersByStatus(state) {
    //   let test = 0
    //   return (status) => {
    //     return state.orders.filter((item) => {
    //       if (item.status === status) {
    //         // console.log(item)
    //         return item.total
    //         // state.test += item.total
    //         // var time = setTimeout(function() {
    //         //   state.test = state.test + item.total
    //         // }, 7000)
    //         // setInterval(() => {
    //         // state.test = state.test + item.total;
    //         // }, 2000);
    //         // console.log(test)
    //       }
    //       // return test
    //     })
    //   }
    // }
    // 计算出总额
    // price(state) {
    //     for(var i=0;i<=state.orders.length;i++){
    //       console.log(state.orders)
    //     }
    // }
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
    overOrders(state, test) {
      state.test = test
    }
  },
  actions: {
  // 查询所有订单
    async findAllOrders({ commit }) {
      const response = await get('/order/findAll')
      response.data.forEach((item) => {
        item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
      })
      commit('resetOrders', response.data)
    },
    async findAllOrdersByStatus({ commit }) {
      const response = await get('/order/findAll')
      let test = 0
      response.data.forEach((item) => {
        // eslint-disable-next-line keyword-spacing
        if(item.status === '已完成') {
          // eslint-disable-next-line no-undef
          test += item.total
          // eslint-disable-next-line no-undef
        // console.log(test)
        }
        // eslint-disable-next-line no-undef
        return test
      })
      // eslint-disable-next-line no-undef
      commit('overOrders', test)
    }
  }
}
