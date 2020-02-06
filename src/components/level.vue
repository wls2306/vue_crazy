<!-- 关卡模块 -->
<template>
  <div class='main'>

     <div id="addLevel">
          <el-button type="primary" @click="handleOpenLevelDialog()">添加关卡</el-button>
      </div>

       <div>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" >
            <el-table-column prop="levelId" label="关卡编号" width="180">
            </el-table-column>
            <el-table-column prop="levelName" label="关卡名称" width="180">
            </el-table-column>
            <el-table-column prop="levelGroup" label="关卡组" width="180">
            </el-table-column>
            <el-table-column prop="levelCoin" label="关卡金币">
            </el-table-column>
            <el-table-column prop="levelNotice" label="关卡提示">
            </el-table-column>
            <el-table-column prop="levelAnswer" label="关卡答案">
            </el-table-column>
           
            <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope='scope2'>
                <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
                   <el-button @click=" handleOpenLevelDialog(scope2.row.levelName) "   type="primary" icon="el-icon-edit" circle></el-button>
                </el-tooltip>

                 <el-tooltip class="item" effect="dark" content="删除" placement="bottom" >
                    <el-button type="danger" icon="el-icon-close" circle  @click="handleDelete(scope2.row.levelName)" ></el-button>
                </el-tooltip>
                
                
                

                <!-- <el-button v-else @click=" handleOpenUserDialog(scope2.row.userName) " >解封</el-button> -->
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



    <el-dialog :title="dialogTitle" :visible.sync="levelDialogVisable"  style="line-height:10px;text-align:left;">
    <el-form :model="level" :label-width="formLabelWidth">
        <el-form-item label="关卡编号" :label-width="formLabelWidth">
            <el-input v-model="level.levelId" autocomplete="off" readonly></el-input>
        </el-form-item>

        <el-form-item label="关卡名称" :label-width="formLabelWidth">
            <el-input v-model="level.levelName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="关卡提示" :label-width="formLabelWidth">
            <el-input v-model="level.levelNotice" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="关卡组(DLC)" :label-width="formLabelWidth">
           <el-input v-model="level.levelGroup" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="关卡图片" :label-width="formLabelWidth">
             <el-input v-model="level.levelImg" autocomplete="off" :readonly="!dialogIsUpdate"></el-input>
            <el-upload
                class="upload-demo"
                drag
                multiple
                action=""
                :auto-upload="false"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :on-change="fileChange"
                :before-upload="beforeAvatarUpload">
                
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

            <img :src="url" v-if="url"  >

        </el-form-item>


         <el-form-item label="关卡答案" :label-width="formLabelWidth">
            <el-input v-model="level.levelAnswer" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="关卡金币" :label-width="formLabelWidth">
            <el-input v-model="level.levelCoin" autocomplete="off"></el-input>
        </el-form-item>

        
        
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="levelDialogVisable = false">取 消</el-button>
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
     name: 'level',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
        currentPage: 1, //默认显示页面为1
        pagesize: 5, //    每页的数据条数
        tableData:[],
        level:{
          file:{}
        },
        levelDialogVisable:false,
        dialogIsUpdate: false, // True 更新信息 False 取消更新
        dialogTitle:'',
        formLabelWidth:'100px',
        url:''
      }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      getData(){
        this.$axios({
          method:'get',
          url:this.GLOBAL.serverUrl+"level/all"
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

       handleOpenLevelDialog:function(levelName){
         console.log('handleOpenLevelDialog')
          if(levelName){
             this.dialogTitle='变更关卡信息';
             this.dialogIsUpdate=true;
             this.getlevelBylevelName(levelName);
             this.levelDialogVisable=true;
          }else{
             this.dialogTitle='添加关卡';
             this.level={}
             this.dialogIsUpdate=false;
             this.levelDialogVisable=true;
             this.url='';
          }
                    
        },

        getlevelBylevelName:function(name){
          if(name)
            this.$axios({
              method:'get',
              url: this.GLOBAL.serverUrl+"level/name",
              params:{
                name:name
              }
            })
            .then((resp)=>{
              this.$message({
                type:resp.data.result===true?'success':'error',
                message:resp.data.message
              })
              this.level=resp.data.obj;
              this.url=this.GLOBAL.serverUrl+resp.data.obj.levelImg
            })
          
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
                this.level.file = file.raw;
                console.log(file);
            },
             handleSubmit:function(){
               
                this.levelDialogVisable=false;
                const method = this.dialogIsUpdate?"update":"post";
                const formData= new FormData();
                    formData.append('levelId',this.level.levelId?this.level.levelId:'')
                    formData.append('levelName',this.level.levelName)
                    formData.append('levelImg',this.level.levelImg)
                    formData.append('levelNotice',this.level.levelNotice)
                    formData.append('levelGroup',this.level.levelGroup)
                    formData.append('levelAnswer',this.level.levelAnswer)
                    formData.append('levelCoin',this.level.levelCoin)
                    formData.append('file',this.level.file)
                this.$axios({
                    method:'POST',
                    url:this.GLOBAL.serverUrl+"level/",
                    data: formData
                })
                .then((resp)=>{
                    this.$message({
                        type:resp.data.result===true?'success':'error',
                        message:resp.data.message
                    })
                    this.getData()
                })
                
            },
            handleDelete(name){
                this.$confirm('确认删除关卡？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                .then(()=>{
                    this.$axios({
                    method:'delete',
                    url:this.GLOBAL.serverUrl+"level/",
                    params: {
                        name:name
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
    mounted() {},
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
  #addLevel{
        line-height: 10px;
        text-align: left;
        margin-left: 10px;
        margin-bottom:10px;
    }
</style>