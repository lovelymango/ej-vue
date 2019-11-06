import { post, get, post_array } from '@/utils/request'

export default {
  namespaced: true,
  state: {
    visible: false,
    categories: [],
    title: '添加栏目信息'
    // categories: []
  },
  getters: {
    categorySize(state) {
      return state.categories.length
    },
    orderCategory: (state) => {
      return function(flag) {
        state.categories.sort((a, b) => {
          if (a[flag] > b[flag]) {
            return -1
          } else {
            return 1
          }
        })
        return state.categories
      }
    }
  },
  // 同步
  mutations: {
    showModal(state) {
      state.visible = true
    },
    closeModal(state) {
      state.visible = false
    },
    // 需要接收一个参数，这个参数就是categories
    refreshCategories(state, categories) {
      // console.log("state ->" ,state);
      // console.log("categories",categories);
      state.categories = categories
    },
    setTitle(state, title) {
      // eslint-disable-next-line no-undef
      state.title = title
    }
  },
  // 异步
  actions: {
    async findCategoryById(context, id) {
      const response = await get('/category/findById', { id })
      // 将获取到的产品信息返回
      return response.data
    },
    // 批量删除
    async batchDeleteCategories(context, ids) {
      // eslint-disable-next-line prefer-const
      // eslint-disable-next-line no-undef
      const response = await post_array('/category/batchDelete', { ids })
      context.dispatch('findAllCategories')
      return response
    },

    // 查询所有栏目信息
    async findAllCategories(context, params) {
      if (!params) {
        params = {
          page: 0,
          pageSize: 5
        }
      }
      const response = await post('/category/query', params)
      // console.log("response",response.data);
      // 把信息设置到state.categories中
      context.commit('refreshCategories', response.data)
    },

    // 分页查询所有栏目信息
    async saveOrUpdateCategory({ dispatch, commit }, category) {
      // 1.提交请求
      // console.log(category);
      // eslint-disable-next-line prefer-const
      let response = await post('/category/saveOrUpdate', category)
      // 2.关闭模态框
      commit('closeModal')
      // 3.刷新页面
      dispatch('findAllCategories')
      // 4.提示成功 react
      return response
    },

    // 通过栏目ID删除
    async deleteCategoryById({ dispatch }, id) {
      // eslint-disable-next-line prefer-const
      let response = await get('/category/deleteById?id=' + id)
      // 刷新
      dispatch('findAllCategories')
      // 提示成功
      return response
    }
  }
}
