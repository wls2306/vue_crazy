<!-- 主页 -->
<template>
  <div class='main'>

<!-- <el-container>
  <el-aside width="200px">Aside</el-aside>
  <el-container>
    <el-header>Header</el-header>
    <el-main>Main</el-main>
  </el-container>
</el-container> -->


<el-container>
  <el-aside width="250px" id="">
    <div class="aside">
      <div id="logo">
        <img src="../assets/logo.png" width="100px" height="64px" >
      </div>
      <div style="margin-top:10px">疯狂猜图Online管理中心</div>

     

      <div id="menu">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"  background-color="#304156" text-color="#fff"
        active-text-color=rgb(64,158,255) router>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">管理中心</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/user">
                <i class="el-icon-user-solid"></i>
                用户管理
              </el-menu-item>
              <el-menu-item index="/index/level">
                <i class="el-icon-s-promotion"></i>
                关卡管理
              </el-menu-item>
              <el-menu-item index="/index/shop">
                <i class="el-icon-s-shop"></i>
                商城管理
                </el-menu-item>
              <el-menu-item index="/index/dlc">
                <i class="el-icon-s-ticket"></i>
                DLC管理
                </el-menu-item>
            </el-menu-item-group>
          
          </el-submenu>
          
        </el-menu>
      </div>

        <!-- <div style="font-size:10px; margin-top:200px;">欢迎您: wangleishu [ 注销 ]</div> -->

    </div>
  
  </el-aside>
  <el-container>
     <el-header height='50px'>
      <div id="title">
        欢迎您：
        
          <el-avatar icon="el-icon-user-solid" size='small'></el-avatar> 
     
         wangleishu 
        <el-button type="primary" size="mini">注销</el-button>
      </div>
    </el-header> 
    <el-main>
      <transition name="fade">
       <router-view></router-view>
      </transition>
    </el-main>
    <!-- <el-footer></el-footer> -->
     
  </el-container>
</el-container>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

  export default {
     name:'',
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      //这里存放数据
      return {}
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
       handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
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
<style scoped>
 

  #logo{
    padding-top: 15px;
    padding-bottom: 5px;
    
  }

  #title{
    vertical-align: text-bottom;
    text-align: right;
    margin-right: 20px;
    font-size: 12px;
    color: black;
  }

  .aside{
    color: white;
  }

  #menu{
    color: #ffffff;
    margin-top: 20px;
    margin-right: 10px;
  }

  .el-menu{
    border-right: 0px;
  }

  el-menu-item{
    background-color: #1F2D3D;
  }


  .el-header, .el-footer {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {

    height:100vh;
    background-color: #304156;
    color: #304156;
    text-align: center;
    /* line-height: 200px; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>