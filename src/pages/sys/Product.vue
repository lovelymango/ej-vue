<template>
  <div class="product">
    <h2>产品管理</h2>
   <!-- 按钮 -->
    <div class="btns">
      <el-row>
				<!-- 左侧搜索 -->
        <!-- {{params}} -->
				<el-col :span="16">
					<el-form :inline="true" v-model="params" @keyup.native="loadData">
						<el-form-item>
							<el-input v-model="params.name" placeholder="请输入产品名称" ></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="params.description" placeholder="请输入产品描述" ></el-input>
						</el-form-item>
            <el-form-item>
							<el-input v-model="params.price" placeholder="请输入产品价格" ></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="params.status" placeholder="请输入产品状态" ></el-input>
						</el-form-item>
					</el-form>
				</el-col>
        <!-- 返回 -->
        <el-col :span="4">
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
    <!-- 表格 -->
    <div>
      <el-table :data="products.list" size="mini" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="产品编号" />
        <el-table-column prop="name" label="产品名称" />
        <el-table-column prop="price" label="产品价格" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="category.name" label="所属栏目" align="center">
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template #default="record">
            <el-button @click.prevent = "deleteHandler(record.row.id)" type="danger" size="small" icon="el-icon-delete" plain circle></el-button>
	          <el-button @click.prevent = "editHandler(record.row)" type="success" size="small" icon="el-icon-edit" plain circle></el-button>
            <el-button @click.prevent = "toDetailsHandler(record.row)" type="primary" size="small" icon="el-icon-tickets" plain circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 模态框 -->
    <el-dialog :title="title" :visible="visible" @close="dialogCloseHandler">
      <!-- {{ product }} -->
      <!-- {{categories}} -->
      <el-form ref="productForm" :model="product" :rules="rules">
        <el-form-item label="名称" label-width="100px" prop="name">
          <el-input v-model="product.name" auto-complete="off" />
        </el-form-item>
        <el-form-item label="价格" label-width="100px" prop="price">
          <el-input v-model="product.price" auto-complete="off" />
        </el-form-item>
        <el-form-item label="所属栏目" label-width="100px" prop="categoryId">
          <el-select v-model="product.categoryId">
            <el-option v-for="c in categories.list" :key="c.id" :label="c.name" :value="c.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="100px" prop="status">
          <el-select v-model="product.status" placeholder="请选择产品状态">
            <el-option label="有货" value="有货"></el-option>
            <el-option label="无货" value="无货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="介绍" label-width="100px">
          <el-input v-model="product.description" type="textarea" auto-complete="off" />
        </el-form-item>
        <el-form-item label="产品主图" label-width="100px">
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
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="submitHandler">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 -->
     <!-- 分页 -->
		<div style="text-align:center">
			<el-pagination
			  background
			  @current-change="pageChangeHandler"
			  layout="prev, pager, next"
			  :page-size="products.pageSize"
			  :total="products.total">
			</el-pagination>
		</div>
		<!-- /分页 -->
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {
      fileList: [],
      product: {},
      ids: [],
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入产品描述', trigger: 'blur' },
          { min: 2, max: 99, message: '长度在 2 到 99 个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入产品价格', trigger: 'blur' },
          { min: 1, max: 11, message: '长度至少一位的字符', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请输入所属栏目', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
        ]
      },
      params:{
        page:0,
        pageSize:5,
        name:'',
        description:'',
        price:'',
        status:''
      }
    }
  },
  computed: {
    ...mapState('product', ['products', 'visible', 'title']),
    ...mapState('category', ['categories']),
    ...mapGetters('product', ['orderProduct', 'productSize',"countProducts","productStatusFilter"])
  },
  created() {
    // 查询所有产品
    this.findAllProducts()
    // 查询所有栏目
    this.findAllCategories()
  },
  methods: {
    ...mapMutations('product', ['showModal', 'closeModal', 'setTitle',"pageChangeHandler"]),
    ...mapActions('product', ['findAllProducts', 'saveOrUpdateProduct', 'deleteProductById', 'batchDeleteProduct']),
    ...mapActions('category', ['findAllCategories']),
    uploadSuccessHandler(response, file, fileList) {
      // 获取上传图片的id
      if (response.status === 200) {
        const id = response.data.id
        const groupname = response.data.groupname
        // 你们上传的图片都在老师的服务器中
        const photo = 'http://134.175.154.93:8888/' + groupname + '/' + id
        // 将图片绑定到双向数据绑定的那个对象中
        this.product.photo = photo
        // 强制改变product引用地址，引起监听器注意
        this.product = Object.assign({}, this.product)
      } else {
        this.$message.error('上传接口异常')
      }
    },
    //切换页面
    toDetailsHandler(product) {
      this.$router.push({
        path: 'product_details',
        query: { product }
      })
    },
    //全选
    handleSelectionChange(val) {
      this.ids = val.map(item => item.id)
    },
    //返回
    returnHandler(){
      this.params.name = '',
      this.params.description = '',
      this.params.price = '',
      this.params.status = '',
      this.loadData();
    },
    //分页查询
    loadData(){
      this.findAllProducts(this.params);
    },
    //换页
    pageChangeHandler(currentPage){
      this.params.page = currentPage-1;
      //刷新页面
      this.findAllProducts(this.params);
    },
    toAddHandler() {
      // 1. 重置表单
      this.product = {}
      this.fileList = []
      this.setTitle('添加产品信息')
      // 2. 显示模态框
      this.showModal()
    },
    submitHandler() {
      // 校验
      this.$refs.productForm.validate((valid) => {
        // 如果校验通过
        if (valid) {
          const promise = this.saveOrUpdateProduct(this.product)
          promise.then((response) => {
            // promise为action函数的返回值，异步函数的返回值就是promise的then回调函数的参数
            this.$message({ type: 'success', message: response.statusText })
          })
        } else {
          return false
        }
      })
    },
    dialogCloseHandler() {
      // this.$refs.productForm.resetFields();
      this.$refs.productForm.clearValidate();
      this.closeModal();
    },
    editHandler(row) {
      // 绑定基本信息
      this.product = row
      this.fileList = []
      this.fileList.push({
        name: '原图',
        url: row.photo
      })
      this.setTitle('修改产品信息')
      this.showModal()
    },
    deleteHandler(id) {
      this.deleteProductById(id)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    },
    batchDeleteHandler() {
      this.batchDeleteProduct(this.ids)
        .then((response) => {
          this.$message({ type: 'success', message: response.statusText })
        })
    }
  }

}
</script>
<style scoped>

</style>
