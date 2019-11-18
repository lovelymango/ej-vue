<template>
  <div class="customerDetails">
    <!-- 返回按钮 -->
    <el-button size="small" type="text" @click="backHandler">
      <span class="back"> <i class="el-icon-arrow-left"></i>返回</span>
    </el-button>
    <!-- 返回按钮 -->
    <!-- 标签栏 -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
           <el-card :body-style="{ padding: '0px' }">
            <el-row>
              <el-col :span="10" style="margin-left:20px">
                    <el-form :span="8">
                      <el-form-item label="姓名">
                        <span class="title2">{{customer.realname}}</span>
                      </el-form-item>
                      <el-form-item label="手机">
                        <span class="title2">{{customer.telephone}}</span>
                      </el-form-item>
                      <el-form-item label="密码">
                        <span class="title2">{{customer.password}}</span>
                      </el-form-item>
                      <el-form-item label="qq">
                        <span class="title2">{{customer.qq}}</span>
                      </el-form-item>
                      <el-form-item label="微信号">
                        <span class="title2">{{customer.wxid}}</span>
                      </el-form-item>
                    </el-form>
              </el-col>
              <el-col :span="13">
                <el-form>
                  <el-form-item  label="身份证">
                      <el-col>身份证号 <span class="title2">{{customer.idCard}}</span></el-col>
                      <el-col :span="10" ><img :src="customer.idcardPhotoPositive" alt=""></el-col>
                      <el-col :span="10" ><img :src="customer.idcardPhotoNegative" alt=""></el-col>
                  </el-form-item>     
                  <el-form-item label="银行卡">
                      <el-col>银行卡号 <span class="title2">{{customer.bankCard}}</span></el-col>
                      <el-col :span="11"><img :src="customer.bankCardPhoto" alt=""></el-col>
                  </el-form-item>
                </el-form>
                

              </el-col>
            </el-row>
    </el-card>
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orders">
       <el-table :data="corders" ref="filterTable">
          <el-table-column label="订单编号" prop="id" align="center"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime" align="center"></el-table-column>
          <el-table-column label="总价" prop="total" align="center"></el-table-column>
          <el-table-column label="状态" prop="status" align="center"
                           :filters="[{ text: '待派单', value: '待派单' },{ text: '待接单', value: '待接单' },
                                      { text: '待服务', value: '待服务' },{ text: '待确认', value: '待确认' },
                                      { text: '已完成', value: '已完成' }]"
                           :filter-method="filterTag"
                           filter-placement="bottom-end">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.status === '已完成' ? 'success' : 'primary'
                 && scope.row.status === '待接单' ? 'danger' : 'primary'"
                disable-transitions>{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="员工" prop="waiter.realname" align="center"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="服务地址" name="address">
        <!-- 地址表格 -->
        <el-table :data="address">
          <el-table-column label="省" prop="province" align="center"></el-table-column>
          <el-table-column label="市" prop="city" align="center"></el-table-column>
          <el-table-column label="区" prop="area" align="center"></el-table-column>
          <el-table-column label="街道" prop="address" align="center"></el-table-column>
          <el-table-column label="手机号" prop="telephone" align="center"></el-table-column>
        </el-table>
         <!-- 地址表格 -->
      </el-tab-pane>
    </el-tabs>
    <!-- 标签栏 -->
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      activeName:"info",
      customer:{},
      id:''
    }
  },
  created(){
    console.log(this.$route);
    this.id = this.$route.query.id;
    this.customer=this.$route.query.customer;
    this.loadAddress();
    this.loadOrders();
    // console.log(this.corders)
    
  },
  computed:{
    ...mapState("address",["address"]),
    ...mapState("order",["corders"])
  },
  methods:{
    ...mapActions("address",["findAddressByCustomerId"]),
    ...mapActions("order",["findAllOrdersByCid"]),
    backHandler(){
      // this.$router.push("/customer")
      this.$router.go(-1)
    },
     // 通过id查询顾客的地址
    loadAddress(){
      this.findAddressByCustomerId(this.id)
    },
     // 通过id查询订单
    loadOrders(){
      this.findAllOrdersByCid(this.id)
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
</style>