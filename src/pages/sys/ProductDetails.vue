<template>
  <div class="product_details">
    <!-- <el-button type="text" @click="backHandler">返回</el-button>
    <p>产品名称：{{ product.name }}</p>
    <p>产品价格：{{ product.price }}</p>
    <p>产品介绍：{{ product.description }}</p>
    <p>产品主图：<img :src="product.photo" alt=""></p> -->
    <h2>产品详情</h2>
    <el-button type="primary" size="small" @click="backHandler">返回</el-button>
    <div>
      <el-form label-position="left"  class="demo-table-expand">
        <el-row>
          <el-col :span="6" style="margin-left: 400px">
            <el-form-item label="产品编号">
              <span>{{ product.id }}</span>
            </el-form-item>
              <el-form-item label="产品名称">
              <span>{{ product.name }}</span>
            </el-form-item>
              <el-form-item label="产品描述">
              <span>{{ product.description }}</span>
            </el-form-item>
            <el-form-item label="产品图片">
              <span><img :src="product.photo" alt="" width="100px"></span>
            </el-form-item>
              <el-form-item label="产品价格">
              <span>{{ product.price }}</span>
            </el-form-item>
              <el-form-item label="产品状态">
              <span>{{ product.status }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="6" >
            <el-form-item label="所属栏目">
              <span>{{ product.category.name }}</span>
            </el-form-item>
            <el-form-item label="栏目 ID">
              <span>{{ product.categoryId }}</span>
            </el-form-item>
            <el-form-item label="栏目序号">
              <span>{{ product.category.num }}</span>
            </el-form-item>
            <el-form-item label="栏目图标">
              <span><img :src="product.category.icon" alt="" width="50px"></span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState,mapActions } from 'vuex'
export default {
  data() {
    return {
      product: {}
    }
  },
  // computed:{
  //   ...mapState('product',['product'])
  // },
  created() {
    // // 获取产品id
    // const id = this.$route.query.id
    // // 根据产品id查询产品的详情
    // this.findProductById(id)
    //   .then((product) => {
    //     this.product = product
    //   })
      this.product = this.$route.query.product
  },
  methods: {
    ...mapActions('product', ['findProductById']),
    backHandler() {
      this.$router.go(-1)
    }
  }
}
</script>
