import { get, post } from '@/utils/request'
import moment from 'moment'
export default {
  namespaced: true,
  state: {
    waiters: [],
    checkwaiters: [],
    list: {},
    visible: false,
    title: '审核员工信息'
  },
  getters: {
    filterWaitersByEnabled(state) {
      return (status) => {
        return state.waiters.filter((item) => {
          return item.status === status
        })
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
    setTitle(state, title) {
      state.title = title
    },
    resetWaiters(state, waiters) {
      state.waiters = waiters
    }
  },
  actions: {
    async findAllWaiters({ commit }) {
      const response = await get('/waiter/findAll')
      response.data.forEach((item) => {
        item.registerTime = moment(item.registerTime).format('YYYY-MM-DD HH:mm:ss')
      })
      // 2. 将查询结果更新到state中
      commit('resetWaiters', response.data)
    },
    async checkWaiter({ commit, dispatch }, waiter) {
      waiter.registerTime = moment((waiter.registerTime), 'YYYY-MM-DD HH:mm:ss').valueOf()
      console.log(waiter.status)
      const response = await post('/waiter/saveOrUpdate', waiter)
      dispatch('findAllWaiters')
      commit('closeModal')
      return response
    }
  }
}
