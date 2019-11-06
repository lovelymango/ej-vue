<template>
  <div class="category_details">
    <h2>栏目详情</h2>
    <el-button type="primary" size="small" @click="backHandler">返回</el-button>
    <div>
      <el-form label-position="left"  class="demo-table-expand">
        <el-row>
          <el-col :span="6" style="margin-left: 500px">
            <el-form-item label="栏目编号">
              <span>{{ category.id }}</span>
            </el-form-item>
            <el-form-item label="栏目名称">
              <span>{{ category.name }}</span>
            </el-form-item>
            <el-form-item label="栏目数量">
              <span>{{ category.num }}</span>
            </el-form-item>
            <el-form-item label="栏目图片">
              <span><img :src="category.icon" alt="" width="50px"></span>
            </el-form-item>
            <el-form-item label="父Id">
              <span>{{ category.parentId }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data(){
    return{
      category:{}
    }
  },
  created(){
    // console.log("当前路由",this.$route);
    // this.category = this.$route.query.category;
    // // 获取产品id
    // const id = this.$route.query.id
    // // 根据产品id查询产品的详情
    // this.findCategoryById(id)
    //   .then((category) => {
    //     this.category = category
    //   })
     this.category = this.$route.query.category;
  },
  methods:{
      ...mapActions('category', ['findCategoryById']),
        backHandler() {
      this.$router.go(-1)
    }
    // backHandler(){
    //   // this.$router.push('./category')
    //   this.$router.go(-1)
    // }
  }
}
</script>
<style scoped>
  
</style>