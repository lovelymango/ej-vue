<template>
  <div id="category">
      <h2>栏目管理</h2>
    <!-- 按钮 -->
    <div class="btns">
      <el-row>
        <!-- 左侧搜索 -->
        <!-- {{params}} -->
        <el-col :span="12">
          <el-form :inline="true" v-model="params" @keyup.native="loadData">
            <el-form-item>
              <el-input v-model="params.name" placeholder="请输入栏目名称" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="params.num" placeholder="请输入栏目数量" ></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-input v-model="params.parentId" placeholder="请输入父Id" ></el-input>
            </el-form-item> -->
          </el-form>
        </el-col>
        <!-- 返回 -->
        <el-col :span="8">
          <el-button @click.prevent="returnHandler" type="success" size="small" plain>返回</el-button>
        </el-col>
        <!-- /左侧搜索 -->
        <!-- 右侧添加与批量删除 -->
        <el-col :span="4" style="text-align:right;">
          <el-button @click.prevent="toAddHandler" type="primary" size="small" plain>添加</el-button>
          <el-button @click.prevent="batchDeleteHandler" type="danger" size="small" plain>批量删除</el-button>
        </el-col>
        <!-- /右侧添加与批量删除 -->
      </el-row>
    </div>
    <!-- 模态框 -->
    <el-dialog @close="dialogCloseHandler" :title="title" :visible="visible" width="30%">
      <el-form :model="category" :rules="rules" ref="categoryForm">
        <el-form-item label="栏目名称" label-width="100px" prop="name">
          <el-input v-model="category.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="栏目数量" label-width="100px" prop="num">
          <el-input v-model="category.num" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父Id" label-width="100px" prop="parentId">
          <el-select v-model="category.parentId" placeholder="请选择父Id">
            <el-option v-for="item in categories.list" :label="item.id" :value="item.id" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="栏目图标" label-width="100px">
          <!-- 上传插件 -->
          <el-upload
            class="upload-demo"
            action="http://134.175.154.93:6677/file/upload"
            :file-list="fileList"
            :on-success="uploadSuccessHandler"
            :limit="1"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <!-- /上传插件 -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <!-- {{ids}} -->
    <el-table :data="categories.list" @selection-change="idsChangeHandler">
      <el-table-column prop="id" label="栏目编号" align="center" width="50" type="selection"></el-table-column>
      <el-table-column prop="name" label="栏目名称" align="center"></el-table-column>
      <el-table-column prop="num" label="栏目数量" align="center"></el-table-column>
      <el-table-column prop="icon" label="栏目图标"  align="center">
        <template v-slot:default="record">
          <img :src="record.row.icon" alt="" width="50px">
        </template>
      </el-table-column>
      <el-table-column prop="parentId" label="父Id" align="center">
      </el-table-column>
      <el-table-column fixed="right" align="center" label="操作" width="150">
        <template #default="record">
          <el-button @click.prevent = "deleteHandler(record.row.id)" type="danger" size="small" icon="el-icon-delete" plain circle></el-button>
          <el-button @click.prevent = "editHandler(record.row)" type="success" size="small" icon="el-icon-edit" plain circle></el-button>
          <el-button @click.prevent = "toDetailsHandler(record.row)" type="primary" size="small" icon="el-icon-tickets" plain circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="text-align:center">
      <el-pagination
        background
        @current-change="pageChangeHandler"
        layout="prev, pager, next"
        :current-page="categories.page+1"
        :page-size="categories.pageSize"
        :total="categories.total">
      </el-pagination>
    </div>
    <!-- /分页 -->
  </div>
</template>

<script>
import {mapActions,mapGetters,mapMutations,mapState} from 'vuex'
export default {
  // 一般双向数据绑定的值放于data中
  data(){
  //   var checkNum = (num, value, callback) => {
  //       if (!value) {
  //         return callback(new Error('数量不能为空'));
  //       }
  //       setTimeout(() => {
  //         if (!Number.isInteger(value)) {
  //           callback(new Error('请输入数字值'));
  //         } else {
  //           if (value > 1) {
  //             callback(new Error('必须大于1'));
  //           } else {
  //             callback();
  //           }
  //         }
  //       }, 1000);
  //     };
    return {
      fileList: [],
      category: {},
      ids:[],
      rules:{
        name: [
          { required: true, message: '请输入栏目名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        num: [
          // { validator: checkNum, trigger: 'blur' }
          { required: true, message: '请输入栏目数量', trigger: 'blur' },
          { min: 2, max: 11, message: '长度在 2 到 11 个数字', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请输入父Id', trigger: 'blur' }
        ]
      },
      params:{
        page:0,
        pageSize:5,
        name:'',
        num:'',
        parentId:''
      }
    }
  },
  created(){
    this.loadData();
    this.findAllCategories();
  },
  computed:{
    ...mapState("category",["categories","visible","title"]),
    // ...mapState("category",["categories"]),
    ...mapGetters("category",["countCategories","categoryStatusFilter"])
    // 普通属性
  },
  methods:{
    ...mapActions("category",["findAllCategories","deleteCategoryById","saveOrUpdateCategory","batchDeleteCategories"]),
    // ...mapActions("category",["findAllCategories"]),
    ...mapMutations("category",["showModal","closeModal","setTitle","pageChangeHandler"]),
    // 普通方法

    uploadSuccessHandler(response, file, fileList) {
     
      // 获取上传图片的id
      if (response.status === 200) {
        const id = response.data.id
        const groupname = response.data.groupname
        // 你们上传的图片都在老师的服务器中
        const icon = 'http://134.175.154.93:8888/' + groupname + '/' + id
        // 将图片绑定到双向数据绑定的那个对象中
        this.category.icon = icon
       
        // 强制改变category引用地址，引起监听器注意
        this.category = Object.assign({}, this.category)
      } else {
        this.$message.error('上传接口异常')
      }
    },

    // 跳转到栏目详情页面
    toDetailsHandler(category){
      this.$router.push({
        name:'category_details',
        query:{category}
      })
    },

    //返回
    returnHandler(){
      this.params.name = '',
      this.params.num = '',
      this.loadData();
    },
    
    //分页查询
    loadData(){
      this.findAllCategories(this.params);
    },
    //换页
    pageChangeHandler(currentPage){
      this.params.page = currentPage-1;
      //刷新页面
      this.findAllCategories(this.params);
    },
    //批量删除
    batchDeleteHandler(){
      this.batchDeleteCategories(this.ids)
      .then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    //为全选绑定事件
    idsChangeHandler(val){
      this.ids = val.map((item)=>{
        return item.id;
      })
      // 简写形式
      // this.ids = val.map(item => item.id);
    },
    // 监听模态框关闭
    dialogCloseHandler(){
      this.$refs.categoryForm.clearValidate();
      // this.$refs.categoryForm.resetFields()
      this.closeModal();
    },
    //为添加按钮绑定事件
    toAddHandler(){
      this.category = {};
      this.fileList = [];
      this.setTitle("添加栏目信息");
      this.showModal();
    },
    //为提交按钮绑定事件
    submitHandler(){
      this.$refs.categoryForm.validate((vaild)=>{
        if(vaild){
          //提交表单
          this.saveOrUpdateCategory(this.category)
          .then((response)=>{
            // console.log(response.data);
            this.$message({type:"success",message:response.statusText});
          })
        } else {
          return false;
        }
      })
    },
    //通过ID删除
    deleteHandler(id){
      let promise = this.deleteCategoryById(id);
      promise.then((response)=>{
        this.$message({type:"success",message:response.statusText});
      })
    },
    //为修改按钮绑定事件
    editHandler(row){
      // 绑定基本信息
      this.category = row
      this.fileList = []
      this.fileList.push({
        name: '原图',
        url: row.icon
      })
      this.setTitle("修改栏目信息");
      this.showModal();
    }
  }
}
</script>

<style scoped>

</style>  