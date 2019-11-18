<template>
  <div class="customer">
		<!-- 表格 -->
      <el-table :data="customers" size="mini">
        <el-table-column prop="realname" label="姓名" align="center" width="100px"></el-table-column>
        <el-table-column prop="telephone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="password" label="密码" align="center"></el-table-column>
        <el-table-column prop="qq" label="qq" align="center"></el-table-column>
        <el-table-column label="操作" width="100px" align="center">
          <template #default="record">
              <a href="" @click.prevent="toDetailsHandler(record.row)" class="el-icon-view"></a>
          </template>
        </el-table-column>
      </el-table>
<!-- 表格 -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return {
      customer:{}
    }
  },
  computed:{
    ...mapState("customer",["customers"]),
    ...mapGetters("customer",["orderCustomer","customerSize"])
  },
  created(){
    this.findAllCustomers();
  },
  methods:{
    ...mapActions("customer",["findAllCustomers"]),
    // 普通方法
    toDetailsHandler(customer){
      //跳转到详情页面
      // this.$router.push("/customerDetails")
      this.$router.push({
        path:"/customer/details",
        query:{
          id:customer.id,
          customer:customer
        }
      })
    }
  }

}
</script>
<style scoped>
.el-icon-view{
  font-size: 15px;
  font-weight: bold;
}
.el-icon-view:hover{
   color:#24ABF2;
}


</style>