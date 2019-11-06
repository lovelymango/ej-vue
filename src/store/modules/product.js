// eslint-disable-next-line no-unused-vars
import { get, post, post_array } from '@/utils/request'

export default {
  namespaced: true,
  state: {
    products: [],
    visible: false,
    title: '添加产品信息',
    categories: []
    // product: {} // 当前产品信息
  },
  getters: {
    productSize(state) {
      return state.products.length
    },
    orderProduct: (state) => {
      return function(flag) {
        state.products.sort((a, b) => {
          if (a[flag] > b[flag]) {
            return -1
          } else {
            return 1
          }
        })
        return state.products
      }
    }
    // refreshProduct(state, product) {
    //   state.product = product
    // }
  },
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    refreshProducts(state, products) {
      state.products = products
    },
    setTitle(state, title) {
      state.title = title
    }
  },
  actions: {
    async findProductById(context, id) {
      const response = await get('/product/findById', { id })
      // context.commit('refreshPruduct', response.data)
      // 将获取到的产品信息返回
      return response.data
    },
    async batchDeleteProduct(context, ids) {
      // 1. 批量删除
      const response = await post('/product/batchDelete', { ids })
      // 2. 分发
      context.dispatch('findAllProducts')
      // 3. 返回结果
      return response
    },
    async deleteProductById(context, id) {
      const response = await get('/product/deleteById?id=' + id)
      context.dispatch('findAllProducts')
      return response
    },
    async findAllProducts(context, params) {
      // eslint-disable-next-line no-undef
      if (!params) {
        // eslint-disable-next-line no-undef
        params = {
          page: 0,
          pageSize: 15
        }
      }
      // eslint-disable-next-line no-undef
      const response = await post('/product/queryProductCascadeCategory', params)
      // console.log("response",response.data);
      // 把信息设置到state.products中
      context.commit('refreshProducts', response.data)
      // // 1. ajax查询
      // const response = await get('/product/findAll')
      // // 2. 将查询结果更新到state中
      // context.commit('refreshProducts', response.data)
    },
    // payload 产品信息
    async saveOrUpdateProduct({ commit, dispatch }, payload) {
      // 1. 保存或更新
      const response = await post('/product/saveOrUpdate', payload)
      // 2. 刷新页面
      dispatch('findAllProducts')
      // 3. 关闭模态框
      commit('closeModal')
      // 4. 提示
      return response
    }
  }
}
