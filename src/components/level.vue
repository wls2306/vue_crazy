<!-- 关卡模块 -->
<template>
  <div class='main'>
       <div>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%" >
            <el-table-column prop="userId" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="userLevel" label="等级" width="180">
            </el-table-column>
            <el-table-column prop="userScore" label="积分">
            </el-table-column>
            <el-table-column prop="userCoin" label="金币">
            </el-table-column>
            <el-table-column prop="userStatus" label="状态">
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

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

  export default {
     name: 'level',
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
    methods: {},
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
<style  scoped>
  
</style>