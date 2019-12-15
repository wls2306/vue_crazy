<!-- 用户模块 -->
<template>
  <div class='main'>

      <div id="addUser">
          <el-button type="primary" @click="handleOpenUserDialog()">添加用户</el-button>
      </div>

      <div>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" >
            <el-table-column prop="userId" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" >
            </el-table-column>
            <el-table-column prop="userLevel" label="等级" width="180">
            </el-table-column>
            <el-table-column prop="userScore" label="积分" width="180">
            </el-table-column>
            <el-table-column prop="userCoin" label="金币" width="180">
            </el-table-column>
            <el-table-column prop="userStatus" label="状态" width="180">
                <template slot-scope="scope1">
                    <span v-if="scope1.row.userStatus === -1" style="color:red"> 封禁 </span>
                    <span v-else style="color:green"> 正常 </span>
                </template>
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope='scope2'>
                <el-button @click=" handleOpenUserDialog(scope2.row.userName) " type="text" size="small">编辑</el-button>
                <el-button v-if="scope2.row.userStatus === 1" @click=" banUser(scope2.row.userName) " type="text" size="small">封停</el-button>
                <el-button v-else @click=" unblock(scope2.row.userName) " type="text" size="small">解封</el-button>
                

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


    <el-dialog :title="title" :visible.sync="userDialogVisable"  style="line-height:10px;text-align:left;">
    <el-form :model="user" :label-width="formLabelWidth">
        <el-form-item label="用户编号" :label-width="formLabelWidth">
            <el-input v-model="user.userId" autocomplete="off" readonly></el-input>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="user.userName" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="user.userPwd" type="password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="等级" :label-width="formLabelWidth">
            <el-input v-model="user.userLevel" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="积分" :label-width="formLabelWidth">
            <el-input v-model="user.userScore" autocomplete="off"></el-input>
        </el-form-item>

         <el-form-item label="金币" :label-width="formLabelWidth">
            <el-input v-model="user.userCoin" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="user.userRemark" autocomplete="off"></el-input>
        </el-form-item>
        
        
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisable = false">取 消</el-button>
        <el-button type="primary" @click="handleUserDialog">确 定</el-button>
    </div>
    </el-dialog>



  </div>


   



</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
    import qs from 'qs'
  export default {
      name: "user",
        data() {
            return {        
                currentPage: 1, //默认显示页面为1
                pagesize: 5, //    每页的数据条数
                tableData: [], //需要data定义一些，tableData定义一个空数组，请求的数据都是存放这里面
                user:{},
                userDialogVisable: false,
                formLabelWidth:'100px',
                updateInfo: false,
                title:'',
                popover_visible:false
            }
        },
        methods: {
            getData() {
                this.$axios({
                    method:'GET',
                    url:this.GLOBAL.serverUrl+'user/all',
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
             handleClick(row) {
                console.log(row);
            },
            handleOpenUserDialog: function(username){
                console.log(username);
                if(username){
                    this.updateInfo=true;
                    this.title='变更用户信息',
                    this.$axios.get(this.GLOBAL.serverUrl+'user/',{
                        params:{ username:username}
                    })
                    .then((resp)=>{
                        if(resp.data.result===true){
                            this.$message({
                                type:'success',
                                message:'请求成功'
                            })
                            this.user=resp.data.obj
                            this.userDialogVisable=true
                        }else{
                            this.$message({
                                type:'error',
                                message:'请求失败'
                            })
                        }
                    })
                }else{
                    this.updateInfo=false;
                    this.title='添加用户',
                    this.user={},
                    this.userDialogVisable=true
                }
            },
            handleUserDialog:function(){
                if(this.updateInfo === true){
                    // 变更用户信息
                     this.$message({
                        type:'error',
                        message:'功能未开发，敬请期待！'
                    })
                }else{
                    // 添加用户信息
                    const that=this;
                    this.$axios({
                        method:'post',
                        url: this.GLOBAL.serverUrl+'user/register',
                        data:qs.stringify({
                            userName:that.user.userName,
                            userPwd:that.user.userPwd
                        })
                    })
                    .then((resp)=>{
                        if(resp.data.result===true){
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            })
                            this.userDialogVisable = false
                            this.getData()
                        }else{
                            this.$message({
                                type: 'error',
                                message: '服务器异常'
                            })
                            this.userDialogVisable = false
                        }
                    })
                }

            },
             banUser:function(username){
                this.$prompt('请输入原因', '封禁用户：'+username, {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
            .then(({ value }) =>{
                this.$axios({
                    method:'get',
                    url:this.GLOBAL.serverUrl+'user/ban',
                    params:{
                        username:username,
                        reason:value
                    }
                })
                .then((resp)=>{
                    if(resp.data.result){
                        this.$message({
                            type:'success',
                            message:'操作成功'
                        })
                        this.getData()
                    }else{
                        this.$message({
                            type:'error',
                            message:'操作失败'
                        })
                    }
                })
            } )
        },

        unblock:function(username){
             this.$confirm('确认解除封禁？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                 this.$axios({
                 method:'get',
                 url:this.GLOBAL.serverUrl+"user/unblock",
                 params:{
                     username:username
                 }
             })
             .then((resp)=>{

                 this.$message({
                     type:resp.data.result===true?'success':'error',
                     message:resp.data.message
                 })
                 this.getData()
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
  #addUser{
      line-height: 10px;
      text-align: left;
      margin-bottom: 10px;
  }
</style>