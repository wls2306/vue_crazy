<!-- 商城模块 -->
<template>
  <div class='main'>
      
      <div id="addCommodity">
          <el-button type="primary" @click="handleOpenCommodityDialog()">添加商品</el-button>
      </div>


       <div>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" >
            <el-table-column prop="commodityId" label="商品编号" width="180">
            </el-table-column>
            <el-table-column prop="commodityName" label="商品名称" >
            </el-table-column>
            <el-table-column prop="commodityPrice" label="商品价格" width="180">
            </el-table-column>
            <el-table-column prop="commodityType" label="商品类型" width="180">
            </el-table-column>
            <el-table-column prop="commodityStatus" label="商品状态" width="180">
                <template slot-scope='scope'>
                    <span v-if="scope.row.commodityStatus === '1'" style="color:green"> 在售 </span>
                    <span v-else style="color:red"> 下架 </span>
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope='scope2'>
                <el-button @click=" handleOpenCommodityDialog(scope2.row.commodityId) " type="text" size="small">查看</el-button>
                <el-button v-if="scope2.row.commodityStatus === '1'"  type="text" size="small">下架</el-button>
                <el-button v-else  type="text" size="small">上架</el-button>
                <el-button  type="text" size="small" @click="handleDelete(scope2.row.commodityId)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange" 
                :current-page="currentPage" 
                :page-sizes="[5, 10]" 
                :page-size="pagesize" 
                layout="total, sizes,prev, pager, next" 
                :total="tableData.length" 
                prev-text="上一页" 
                next-text="下一页">
            </el-pagination>
        </div>
    </div>




    
    <el-dialog :title="dialogTitle" :visible.sync="commodityDialogVisable"  style="line-height:10px;text-align:left;">
    <el-form :model="commodity" :label-width="formLabelWidth">
        <el-form-item label="商品编号" :label-width="formLabelWidth">
            <el-input v-model="commodity.commodityId" autocomplete="off" readonly></el-input>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="commodity.commodityName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="commodity.commodityPrice" type="text" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input v-model="commodity.commodityDesc" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品图片" :label-width="formLabelWidth">
            <el-input v-model="commodity.commodityImg" autocomplete="off" :readonly="!dialogIsUpdate"></el-input>

            <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :auto-upload="false"
                multiple
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-change="fileChange"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>



        </el-form-item>

         <el-form-item label="商品类型" :label-width="formLabelWidth">
            <el-input v-model="commodity.commodityType" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="商品状态" :label-width="formLabelWidth">
            <el-input v-model="commodity.commodityStatus" autocomplete="off"></el-input>
        </el-form-item>
        
        
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="commodityDialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </div>
    </el-dialog>











  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
    import qs from 'qs';
  export default {
     name: 'shop',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
           currentPage: 1, //默认显示页面为1
            pagesize: 5, //    每页的数据条数
            tableData: [], //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
            dialogTitle:'',
            dialogIsUpdate: false, // True 更新信息 False 取消更新
            commodityDialogVisable:false,
            commodity:{
                file:{}
            },
            formLabelWidth:'100px',
            imageUrl: '',
            
      }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
           getData() {
                this.$axios({
                    method:'GET',
                    url:this.GLOBAL.serverUrl+'commodity/',
                })
                .then((resp)=>{
                   
                    this.tableData=resp.data.obj;
                })
            },
            //每页下拉显示数据
            handleSizeChange: function(size) {
                this.pagesize = size;
                /*console.log(this.pagesize) */
            },
            //点击第几页
            handleCurrentChange: function(currentPage) {
                this.currentPage = currentPage;
                /*console.log(this.currentPage) */
            },
            handleOpenCommodityDialog:function(commodityId){
                if(commodityId){
                    this.dialogTitle='变更商品信息';
                    this.dialogIsUpdate=true;
                    this.getCommodityById(commodityId);
                    this.commodityDialogVisable=true;
                }else{
                    this.dialogTitle='添加商品';
                    this.commodity={}
                     this.dialogIsUpdate=false;
                     this.commodityDialogVisable=true;
                }
                    
            },
            getCommodityById:function(id){
                if(id){
                    this.$axios({
                        method:'get',
                        url:this.GLOBAL.serverUrl+'/commodity/id',
                        params:{
                            id:id
                        }
                    })
                    .then((resp)=>{
                        this.commodity=resp.data.obj;
                        this.$message({
                            type:resp.data.result===true?'success':'error',
                            message:resp.data.message
                        }) 
                    })
                }else{
                     this.$message({
                            type:'error',
                            message:'参数为空'
                        }) 
                    }
            },
            handleCommodityDialog:function(){

            },
             handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                
                return isJPG && isLt2M;
            },
            fileChange(file) {
                const typeArr = ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'];
                const isJPG = typeArr.indexOf(file.raw.type) !== -1;
                const isLt3M = file.size / 1024 / 1024 < 3;

                if (!isJPG) {
                    this.$message.error('只能是图片!');
                    this.$refs.upload.clearFiles();
                    this.file = null;
                    return;
                }
                if (!isLt3M) {
                    this.$message.error('上传图片大小不能超过 3MB!');
                    this.$refs.upload.clearFiles();
                    this.file = null;
                    return;
                }
                this.commodity.file = file.raw;
                console.log(this.file);
            },
            handleSubmit:function(){
               
                this.commodityDialogVisable=false;
                const method = this.dialogIsUpdate?"update":"post";
                const formData= new FormData();
                    formData.append('commodityId',this.commodity.commodityId?this.commodity.commodityId:'')
                    formData.append('commodityName',this.commodity.commodityName)
                    formData.append('commodityPrice',this.commodity.commodityPrice)
                    formData.append('commodityDesc',this.commodity.commodityDesc)
                    formData.append('commodityImg',this.commodity.commodityImg)
                    formData.append('commodityType',this.commodity.commodityType)
                    formData.append('commodityStatus',this.commodity.commodityStatus)
                    formData.append('file',this.commodity.file)
                this.$axios({
                    method:'POST',
                    url:this.GLOBAL.serverUrl+"commodity/",
                    data: formData
                })
                .then((resp)=>{
                    this.$message({
                        type:resp.data.result===true?'success':'error',
                        message:resp.data.message
                    })
                })
                
            },
            handleDelete(id){
                this.$confirm('确认删除商品？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    this.$axios({
                    method:'DELETE',
                    url:this.GLOBAL.serverUrl+"commodity/",
                    data:{
                        id:id
                    }
                })
                .then((resp)=>{
                    this.$message({
                        type:resp.data.result===true?'success':'error',
                        message:resp.data.message
                    })
                    this.getData()
                })
                .catch((error)=>{
                    this.$message({
                        type:'error',
                        message:'网络错误'
                    })
                })
                })
                
            }

        

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
         this.getData();
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
       
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
  }
</script>
<style  scoped>
    #addCommodity{
        line-height: 10px;
        text-align: left;
        margin-left: 10px;
        margin-bottom:10px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>