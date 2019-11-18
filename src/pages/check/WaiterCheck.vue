<template>
  <div class="waiter">
    <el-tabs v-model="activeName" @tab-click="handleClick">
   <!-- 待审核 -->
      <el-tab-pane label="待审核" name="待审核">
		<!-- 按钮 -->
		<div>
			<el-button @click="batchCheckHandler"  size="small" type="danger">批量审核</el-button>
		</div>
		<!-- 表格 -->
      <el-table :data="filterWaitersByEnabled(activeName)" size="mini"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30px"></el-table-column>
        <el-table-column prop="id" label="编号" width="50px" align="center"></el-table-column>
        <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
        <el-table-column prop="telephone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="center" width="150px"></el-table-column>
        <el-table-column prop="bankCard" label="银行卡号" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间" align="center" width="150px"></el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="record"><span class="status">{{record.row.status}}</span></template>
        </el-table-column>
        <el-table-column label="操作" width="50" align="center">
          <template #default="record">
             <a href="" @click.prevent="checkWaiterHandler(record.row)" class="el-icon-view"></a>
          </template>
        </el-table-column>
      </el-table>
      <!-- /表格 -->
      </el-tab-pane>
  <!--审核不通过  -->
    <el-tab-pane label="审核不通过" name="审核不通过">
	   <!-- 表格 -->
      <!-- <el-table :data="filterWaitersByEnabled(activeName)" size="mini"  @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30px"></el-table-column>
        <el-table-column prop="id" label="编号" width="50px" align="center"></el-table-column>
        <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
        <el-table-column prop="telephone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="idCard" label="身份证号" align="center" width="150px"></el-table-column>
        <el-table-column prop="bankCard" label="银行卡号" align="center"></el-table-column>
        <el-table-column prop="registerTime" label="注册时间" align="center" width="150px"></el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="record"><span class="status">{{record.row.status}}</span></template>
        </el-table-column>
      </el-table> -->
      <!-- /表格 -->
      <!-- new -->
       <el-table
          :data="filterWaitersByEnabled(activeName)"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="未通过原因">
                  <span>{{ props.row.comment }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="编号" width="50px" align="center"></el-table-column>
          <el-table-column prop="realname" label="姓名" align="center"></el-table-column>
          <el-table-column prop="telephone" label="手机号" align="center"></el-table-column>
          <el-table-column prop="idCard" label="身份证号" align="center" width="150px"></el-table-column>
          <el-table-column prop="bankCard" label="银行卡号" align="center"></el-table-column>
          <el-table-column prop="registerTime" label="注册时间" align="center" width="150px"></el-table-column>
          <el-table-column label="状态" align="center">
            <template #default="record"><span class="status">{{record.row.status}}</span></template>
          </el-table-column>
        </el-table>
      <!-- new -->
    </el-tab-pane>
  </el-tabs>
     <!-- 模态框 -->
    <el-dialog :title="title" :visible="visible" @close="dialogCloseHandler" width="800px" style="padding:0">
       <!-- 卡片 -->
            <el-card body-style="{ padding: '0px' }" class="bg">
            <el-form ref="categoryForm">
              <el-form-item label="姓名" label-width="100px">
                 <span>{{waiter.realname}}</span>
              </el-form-item>
              <el-form-item label="手机" label-width="100px">
               <span>{{waiter.telephone}}</span>
              </el-form-item>
              <el-form-item label="身份证号" label-width="100px">
               <span>{{waiter.idCard}}</span>
               <div><img :src="waiter.idcardPhotoPositive" alt=""></div>
              </el-form-item>
              <el-form-item label="银行卡号" label-width="100px">
               <span>{{waiter.bankCard}}</span>
               <div><img :src="waiter.bankCardPhoto" alt=""></div>
              </el-form-item>
              <el-form-item label="原因" label-width="100px">
              </el-form-item>
           </el-form>
          </el-card>
        <!-- 卡片 -->
      <div slot="footer" class="dialog-footer">
       
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="checkHandler">通 过</el-button>
        <el-button size="small" type="danger" @click="nocheckHandler">不 通 过</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return {
      waiter:{
       
      },
      ids:[],
      activeName:"待审核"
    }
  },
  computed:{
    ...mapState("waiter",["waiters","visible","title"]),
    ...mapGetters("waiter",["filterWaitersByEnabled"])
  },
  created(){
    this.findAllWaiters();
  },
  methods:{
    ...mapMutations("waiter",["showModal","closeModal","setTitle"]),
    ...mapActions("waiter",["findAllWaiters","checkWaiter"]),
    handleSelectionChange(val) {
      this.ids = val.map(item=>item.id);
    },
     handleClick(tab){
      this.activeName = tab.name;
    },
    batchCheckHandler(){
      // this.batchDeleteWaiter(this.ids)
      // .then((response)=>{
      //   this.$message({type:"success",message:response.statusText});
      // })
    },
    // 监听模态框关闭
    dialogCloseHandler(){
      this.closeModal();
    },
    //跳出审核模态框
    checkWaiterHandler(row){
      this.waiter=row;
      this.showModal();
      this.setTitle="审核员工信息"
    },
    //审核通过
    checkHandler(){
      this.waiter.status="审核通过"
      const promise = this.checkWaiter(this.waiter)
      promise.then((response) => {
        // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
        this.$message({ type: 'success', message: '审核结束' })
      })
    },
    //审核不通过
    nocheckHandler(){
       
        this.waiter.status="审核不通过"
        const promise = this.checkWaiter(this.waiter)
        promise.then((response) => {
          // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
          this.$message({ type: 'success', message: '审核结束' })
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
.status{
  color: red;
  border:1px solid rgb(107, 62, 62);
  padding:3px 6px;
  border-radius: 5px;
  box-shadow: 0 0 5px  rgb(107, 62, 62);
}
.bg{
 
   height:250px ;
   overflow-y: auto;
}
img{
  width:150px;
  height:80px;
}
.title2{
 font-size:12px;
 color:#1890FF;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>