<!-- 登陆页面 -->
<template>
  <div id="main">
      
        <el-form  label-position='left' @submit.native.prevent>
        <div id="loginFrame">
            <div class="loginTtile">疯狂猜图Online</div>
            <div class="loginTtile">管理中心</div>
            <div class="formitem" id="loginContent">
                

                    <el-form-item label='用户名'>
                        <el-input v-model="form.username" placeholder="请输入用户名" ></el-input>
                    </el-form-item>

                    <el-form-item label='密 码'>
                        <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>

                
            </div>
            <div class="formitem" id="loginButton">  
                    <el-button @submit.prevent type='primary' @click="handleLogin" :loading='form.loading' > 登  录 </el-button>
            </div>
        </div>
        </el-form>
     
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import qs from 'qs'
  export default {
     name:'',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {
         form:{
             username:'',
             password:'',
             loading:false
         }
      }
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {

        handleLogin:function(){
            this.loading=true
           this.$axios({
               method:'POST',
               url:this.GLOBAL.serverUrl+'user/login',
               data:qs.stringify( {
                   username:this.form.username,
                   password:this.form.password
               })
           })
           .then((resp)=>{
               if(resp.data.result===true && resp.data.obj.userType==='2' && resp.data.obj.userStatus===1)
               {
                   this.$message({
                       message:'登录成功',
                       type:'success'
                   })

                   this.$router.push('/index')
               }else{
                    this.$message({
                       message:'用户名密码错误或权限不足',
                       type:'error'
                   })
               }
           })
           .catch((err)=>{
               console.log(err);
           })
        }

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
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
<style scoped>
    #main{
        text-align: center;
    }

    .loginTtile{
        margin: 40px;
        margin-bottom: 0 px;
        font-size: 30px;
    }

    #loginFrame{
        box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
        position:absolute;
        top:15%;
        left:35%;
        border: 1px solid black;
        border-radius: 20px;
        margin:0 auto;
        width: 600px;
    }

    .formitem{
        margin: 80px;
    }
</style>