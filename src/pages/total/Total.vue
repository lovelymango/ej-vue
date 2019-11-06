<template>
    <div class="total">
      <h2>已完成订单总额</h2>
      <el-tabs v-model="activeName">
         <!-- <el-tab-pane name="已完成"> -->
         <el-table class="wc" :data="filterOrdersByStatus(activeName)" size="small">
          <el-table-column label="订单编号" prop="id" width="80" align="center"/>
          <el-table-column label="下单时间" prop="orderTime"/>
          <el-table-column label="总价" prop="total"/>
          <el-table-column label="状态" prop="status"/>
          <el-table-column label="顾客编号" prop="customerId"/>
          <el-table-column label="员工编号" prop="waiterId"/>
          <!-- <el-table-column label="操作">
            <template #default="record">
              <el-button @click.prevent = "AddHandler(record.row.total)" type="danger" size="small" 
              icon="el-icon-plus" plain circle></el-button>
            </template>
          </el-table-column> -->
        </el-table>
        <!-- </el-tab-pane> -->
      </el-tabs>
  <!-- {{orders}} -->
     <el-row class="ze">
       <el-col :span="6">总额 <strong>￥{{test}}</strong> </el-col>
     </el-row>
    </div>

    
</template>

<script>
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
    data(){
    return {
      visible:false,
      activeName:"已完成",
      total:[{

      }]
    }
},
  created(){
     // 查询所有订单
    this.findAllOrders();
    // 查询所有服务员
    this.findAllWaiters();
    //查询所有顾客
    this.findAllCustomers();
    this.findAllOrdersByStatus();
  },
   computed:{
    ...mapState("total",["orders","message","test"]),
    ...mapState("waiter",["waiters"]),
    // ...mapState("customer",["customers"]),
    ...mapGetters("total",["filterOrdersByStatus"])
  },
  methods:{
    ...mapActions("total",["findAllOrders","findAllOrdersByStatus"]),
    ...mapActions("waiter",["findAllWaiters"]),
    ...mapActions("customer",["findAllCustomers"])
  }
}
</script>

<style scoped>
    .ze{
      margin-top: 20px;
      margin-left: 905px;
    }
</style>