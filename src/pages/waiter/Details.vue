<template>
  <div class="waiterDetails">
     <!-- 返回按钮 -->
    <el-button size="small" type="text" @click="backHandler">
      <span class="back"> <i class="el-icon-arrow-left"></i>返回</span>
    </el-button>
    <!-- 返回按钮 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
        <!-- 卡片 -->
            <el-card :body-style="{ padding: '0px' }" class="bg">
            <el-row>
              <el-col :span="10" style="margin-left:20px">
                    <el-form :span="8">
                      <el-form-item label="姓名">
                        <span class="title2">{{waiter.realname}}</span>
                      </el-form-item>
                      <el-form-item label="手机">
                        <span class="title2">{{waiter.telephone}}</span>
                      </el-form-item>
                      <el-form-item label="密码">
                        <span class="title2">{{waiter.password}}</span>
                      </el-form-item>
                      <el-form-item label="qq">
                        <span class="title2">{{waiter.qq}}</span>
                      </el-form-item>
                      <el-form-item label="微信号">
                        <span class="title2">{{waiter.wxid}}</span>
                      </el-form-item>
                    </el-form>
              </el-col>
              <el-col :span="13">
                <el-form>
                  <el-form-item  label="身份证">
                      <el-col>身份证号 <span class="title2">{{waiter.idCard}}</span></el-col>
                      <el-col :span="10" ><img :src="waiter.idcardPhotoPositive" alt=""></el-col>
                      <el-col :span="10" ><img :src="waiter.idcardPhotoNegative" alt=""></el-col>
                  </el-form-item>     
                  <el-form-item label="银行卡">
                      <el-col>银行卡号 <span class="title2">{{waiter.bankCard}}</span></el-col>
                      <el-col :span="11"><img :src="waiter.bankCardPhoto" alt=""></el-col>
                  </el-form-item>
                </el-form>
                

              </el-col>
            </el-row>
          </el-card>
        <!-- 卡片 -->
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orders">

        <el-table :data="worders" ref="filterTable" size="small">
          <el-table-column label="订单编号" prop="id" align="center"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime" align="center"></el-table-column>
          <el-table-column label="总价" prop="total" align="center"></el-table-column>
          <el-table-column label="状态" prop="status" align="center"  
                           :filters="[{ text: '待接单', value: '待接单' }, { text: '待服务', value: '待服务' },
                                      { text: '待确认', value: '待确认' },{ text: '待支付', value: '待支付'},
                                      { text: '已完成', value: '已完成' }]"
                           :filter-method="filterTag"
                           filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '已完成' ? 'success' : 'primary'
                 && scope.row.status === '待支付' ? 'danger' : 'primary'"
                disable-transitions>{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="顾客" prop="customer.realname" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="员工收益" name="money">
         <el-card :body-style="{ padding: '0px' }" class="bg">
          <el-form class="money">
            <el-form-item label="累计收益" ><span style="color:red;">¥{{wtotal}}</span></el-form-item>
            <el-form-item label="账户余额" ><span style="color:red;">¥{{wtotal}}</span></el-form-item>
            <el-form-item label="已提现" ><span style="color:red;">¥0</span></el-form-item>
          </el-form>
         </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      activeName:"info",
      waiter:{},
      id:'',
      money:''
    }
  },
  created(){
    console.log(this.$route);
    this.id = this.$route.query.id;
    this.waiter=this.$route.query.waiter;
    this.loadOrders();
    
  },
  computed:{
    ...mapState("order",["worders","wtotal"])
  },
  methods:{
    ...mapActions("order",["findAllOrdersByWid"]),
    //返回
    backHandler(){
      // this.$router.push("/waiter")
      this.$router.go(-1)
    },
    //加载该员工的所有订单
    loadOrders(){
      this.findAllOrdersByWid(this.id);
    },
    //筛选订单状态
    filterTag(value, row) {
        return row.status === value;
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    }
  }

}
</script>
<style scoped>
.back{
  font-size:15px; 
  color:black;
}
img{
  width:100%;
  height:120px;
}
.title2{
 font-size:12px;
 color:#1890FF;
}
.money{
  width:450px;
  height:200px;
  margin:20px auto;
}
.bg{
  background-color:#bed0e5;
}

</style>