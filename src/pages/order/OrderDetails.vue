<template>
    <div class="order_details">
        <h2>订单详情</h2>
        <el-button type="text" @click="backHandler">返回</el-button>
        <el-form label-position="left" class="demo-table-expand">
            <el-row v-for="c in customerName" :key="c.id">
                <el-row :span="6" style="margin-left: 600px">
                   <div v-if="c.id === order.id">
                    <el-form-item label="订单编号">
                        <span>{{ order.id }}</span>
                    </el-form-item>
                    <el-form-item label="下单时间">
                        <span>{{ order.orderTime }}</span>
                    </el-form-item>
                    <el-form-item label="总价">
                        <span>{{ order.total }}</span>
                    </el-form-item>
                    <el-form-item label="状态">
                        <span>{{ order.status }}</span>
                    </el-form-item>
                    <el-form-item label="顾客编号">
                        <span>{{ order.customerId }}</span>
                    </el-form-item> 
                    <el-form-item label="顾客姓名">
                        <span>{{ c.customer.realname }}</span>
                    </el-form-item> 
                    <el-form-item label="顾客电话">
                        <span>{{ c.customer.telephone }}</span>
                    </el-form-item>
                    <el-form-item label="地址编号">
                        <span>{{ c.address.id }}</span>
                    </el-form-item>  
                    <el-form-item label="顾客所在省份">     
                        <span>{{ c.address.province }}</span>
                    </el-form-item>
                    <el-form-item label="顾客所在城市">     
                        <span>{{ c.address.city }}</span>
                    </el-form-item>
                    <el-form-item label="顾客所在区域">     
                        <span>{{ c.address.area }}</span>
                    </el-form-item>
                     <el-form-item label="顾客具体地址">     
                        <span>{{ c.address.address }}</span>
                    </el-form-item>
                    <div v-if=obj>
                    <el-form-item label="接收订单员工编号">     
                        <span>{{ c.waiter.id }}</span>
                    </el-form-item>
                    <el-form-item label="接收订单员工姓名">     
                        <span>{{ c.waiter.realname }}</span>
                    </el-form-item>
                    <el-form-item label="接收订单员工电话">     
                        <span>{{ c.waiter.telephone }}</span>
                    </el-form-item>
                    </div>
                   </div>
                </el-row>
            </el-row>
        </el-form>
        <!-- <el-form label-position="left">
        <el-row :span="4">
                   <el-table :data="customerName">
                      <el-table-column prop="order.customer.realname" label="顾客姓名"></el-table-column>
                      <el-table-column prop="order.customer.telephone" label="顾客电话"></el-table-column>
                    </el-table>
        </el-row>
        </el-form> -->
    </div>
</template>

<script>
import {mapState,mapActions,} from 'vuex';
export default {
  data(){
    return{
      order:{},
      customerId:'',
      obj:false
    }
  },
  computed:{
    ...mapState("order",["customerName"])
  },
  created(){
    // console.log("当前路由",this.$route);
    this.order = this.$route.query.order; 
    this.customerId = this.$route.query.order.customerId;   
    this.findOrderQuery(this.customerId); 
    if(this.$route.query.order.status==="待接单"){
        this.obj = false;
    } else if(this.$route.query.order.status==="待派单"){
        this.obj = false;
    } else {
        this.obj = true;
    }  
    console.log(this.obj)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
  },
  methods:{
    ...mapActions( "order",["findOrderQuery"]),
    backHandler() {
      // this.$router.push('./product')
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
</style>      