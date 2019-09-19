<template>
    <el-aside width="400" style="background-color: rgb(238, 241, 246)">
        <el-menu
                unique-opened
                :collapse='isCollapse'
                router>
            <el-menu-item index="/index/home">
                <i class="el-icon-setting"></i>
                <span slot="title" >主页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">管理员</span>
                </template>
                <el-menu-item index="/index/accountManage">账号管理</el-menu-item>
                <el-menu-item index="/index/roleManage">角色管理</el-menu-item>
                <el-menu-item index="/index/permissionManage">权限管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">用户管理</span>
                </template>
                <el-menu-item index="/index/userManage">用户管理</el-menu-item>
                <el-menu-item index="/index/orderManage">订单管理</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">储物柜管理</span>
                </template>
                <el-menu-item index="/index/lockerManage">储物柜管理</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span slot="title">财务管理</span>
                </template>
                <el-menu-item index="/index/chartShow">图表展示</el-menu-item>
                <el-menu-item index="/index/dataReport">数据报表</el-menu-item>
            </el-submenu>

        </el-menu>
    </el-aside>
</template>

<script>
  export default {
    props: [
      'newIsCollapse'
    ],
    data() {
      return {
      }
    },
    //不能直接使用这个props，一定要经过computed处理，
    // 因为props是单项数据流，当父组件的属性变化时，将传导给子组件，
    // 但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，否则Vue 会在控制台给出警告。
    computed: {
      isCollapse() {
        console.log('Aside中触发' + this.newIsCollapse)
        return this.newIsCollapse
      }
    },
  }

</script>

<style>
    .el-menu {
        height: 100%;
    }
    .el-submenu {
        width: 200px;
    }
</style>