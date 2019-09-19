<template>
    <div>
        <el-header style=" font-size: 15px;">
            <el-row :gutter="20" type="flex" justify="space-between">
                <el-col :span="6">
                    <el-row type="flex" justify="space-between">
                        <el-col :span="7">
                            <el-button type="primary" icon="el-icon-menu" @click="isCollapseFun">菜单</el-button>
                        </el-col>
                        <el-col :span="16">
                            <el-input placeholder="请输入..." v-model="input">
                                <i slot="suffix" class="el-input__icon el-icon-search" v-on:click="aa($event)"></i>
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="4">
                    <el-row :gutter="10" type="flex" justify="start">
                        <el-col :span="7">
                            <img src="../assets/mingren.jpg" alt="头像" class="logo">
                        </el-col>
                        <el-col :span="12">
                            <el-dropdown @command="handleCommand">
                            <span class="el-dropdown-link">
                                {{userData[0]}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="individualCommand">个人信息</el-dropdown-item>
                                    <el-dropdown-item command="logoutCommand">注销登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>

                </el-col>
            </el-row>

        </el-header>
        <el-card class="breadcrumb-card">
            <el-row>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                </el-breadcrumb>
            </el-row>
        </el-card>

    </div>

</template>

<script>

  import Qs from 'qs'

  export default {
    name: "",
    data(){
      return {
        input: '',

      }
    },
    methods:{
      aa: function aa (event) {
        alert("fahk")
      },
      handleCommand(command) {
        if (command === "individualCommand") {
            console.log(window.sessionStorage.getItem('session'))
            console.log(JSON.parse(window.sessionStorage.getItem('session')))
        } else if (command === "logoutCommand") {
          this.$confirm('是否注销登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.axios.post(this.myIp + 'Manage/outManage',
              Qs.stringify({token: this.$store.state.userData[1]}))
            .then(response=>{
                if (response.status === 200 && response.data.code === 0) {
                  //清除session之后跳转到登录页面
                  window.sessionStorage.removeItem('session')
                  this.$store.dispatch("logoutAction")
                  this.$router.push('./login')
                  this.$message({type: 'success', message: '注销成功!'});
                } else {
                  this.$message({type: 'warning', message: '注销失败!'});
                }
              }
            ).catch(error=>{
              console.log(error)
              this.$message({
                type: 'warning',
                message: '注销失败!'
              });
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消注销'
            });
          });
        }
      },
      isCollapseFun() {
        console.log('header中触发' + this.isCollapse)
        this.isCollapse = !this.isCollapse;
        this.$emit('update:newIsCollapse', this.isCollapse)
      }
    },
    computed: {
      userData() {
        return this.$store.state.userData
      }
    },
    watch: {
    }
  }



</script>

<style scoped>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .logo {
        width: 50px;
        height: 50px;
        margin: 5px;
        border-radius: 25px;
    }
    .breadcrumb-card {
        margin: 5px auto;
    }

</style>