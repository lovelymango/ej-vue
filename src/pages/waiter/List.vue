<template>
  <div class="waiter">
		<!-- 表格 -->
      <el-table :data="filterWaitersByEnabled(status)" size="mini">
        <el-table-column prop="id" label="编号" width="50px" align="center"></el-table-column>
        <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
        <el-table-column prop="telephone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="center" width="150px"></el-table-column>
        <el-table-column prop="bankCard" label="银行卡号" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间" align="center" width="150px"></el-table-column>
        <el-table-column prop="status" label="状态" align="center" ></el-table-column>
        <el-table-column label="操作" width="50" align="center">
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
      ids:[],
      status:"审核通过"
    }
  },
  computed:{
    ...mapState("waiter",["waiters"]),
    ...mapGetters("waiter",["filterWaitersByEnabled"])
  },
  created(){
    this.findAllWaiters();
  },
  methods:{
    ...mapActions("waiter",["findAllWaiters"]),
    // 普通方法
    toDetailsHandler(waiter){
      //跳转到详情页面
      this.$router.push({
        path:"/waiter/details",
        query:{
          id:waiter.id,
          waiter:waiter
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