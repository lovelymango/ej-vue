<template>
  <div class="customer">
    <h2>顾客管理</h2>
		<!-- 表格 -->
		<div v-loading="loading">
      <el-table :data="customers" size="mini"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="telephone" label="手机号"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template #default="record">
              <el-button @click.prevent = "toDetailsHandler(record.row)" type="primary" size="small" icon="el-icon-tickets" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
		</div>
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return {
      customer:{},
      ids:[]
    }
  },
  computed:{
    ...mapState("customer",["customers","visible","title","loading"]),
    ...mapGetters("customer",["orderCustomer","customerSize"])
  },
  created(){
    this.findAllCustomers();
  },
  methods:{
    ...mapMutations("customer",["showModal","closeModal","setTitle"]),
    ...mapActions("customer",["findAllCustomers"]),
    // 普通方法
    toDetailsHandler(customer){
      //跳转到详情页面
      // this.$router.push("/customerDetails")
      this.$router.push({
        path:"/customer/details",
        query:{id:customer.id}
      })
    },
    handleSelectionChange(val) {
      this.ids = val.map(item=>item.id);
    }
  }
}
</script>
<style scoped>

</style>