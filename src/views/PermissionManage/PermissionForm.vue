<template>
    <div class="form-container">
        <!-- 中间 主表单部分 -->
        <transition name="fade">
            <el-card class="form-card" v-if="isShowRoleForm">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="权限名称">
                        <span class="cannot-modifier-span">{{form.permission_name}}</span>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="权限标识">
                        <span class="cannot-modifier-span">{{form.permission_flag}}</span>
                    </el-form-item>
                    <el-form-item label="描述">
                        <span class="cannot-modifier-span">{{form.description}}</span>
                    </el-form-item>
                    <el-form-item>
                        <el-row type="flex" justify="end">
                            <el-button type="primary" class="role-button" @click="displayPermissionTable">
                                {{isShowPermissionTable? '关闭' : '角色'}}
                                <i class="el-icon-caret-left" v-if="isShowPermissionTable"></i>
                                <i class="el-icon-caret-right" v-else></i>
                            </el-button>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>

        <!-- 右侧 权限表格部分 -->
        <transition
                name="fade"
                @before-enter="beforeEnter"
                @after-leave="afterLeave">
            <el-card class="form-card" v-show="isShowPermissionTable">
                <el-table
                        :data="roleTableData">
                    <el-table-column
                            label="角色名称"
                            prop="role_name">
                    </el-table-column>
                    <el-table-column
                            label="角色标识"
                            prop="role_flag">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            fixed="right">
                        <template slot-scope="scope">
                            <el-button
                                 type="primary"
                                size="mini">
                                查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="role-pagination"
                        small
                        layout="prev, pager, next"
                        :total="50">
                </el-pagination>
            </el-card>
        </transition>
    </div>


</template>

<script>
  export default {
    data() {
      return {
        isShowPermissionTable: false,
        isShowAccountTable: false,
        isShowRoleForm: true,
        form: {},
        roleTableData: []
      };
    },
    //周期钩子函数
    created() {
      this.getRouteData()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        const loding = this.$loading({
          lock: true,
          text: '正在加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.$notify({
          title: '添加成功',
          message: '添加账号15555555555成功！',
          type: 'success',
          duration: 2000,
        });
        setTimeout(()=>{
          loding.close()
          this.$notify({
            title: '注意',
            message: '请分配角色！',
            type: 'info',
            duration: 2000
          });
          this.$router.push('/index/roleManage/addRole/roleTransfer')
        }, 2000)
      },
      // 获取 路由params 数据
      getRouteData() {
        let data = this.$route.params;
        if (!data.permission_code) {
          return
        }
        this.form.permission_code =  data.permission_code;
        this.form.permission_name = data.permission_name;
        this.form.permission_flag = data.permission_flag;
        this.form.description = data.description;
        this.form.create_time = data.create_time;
      },
      // 筛选性别回调函数
      filterSex(value, row) {
        return row.sex === value
      },
      // 打开用户表格
      displayAccountTable() {
        this.isShowAccountTable = !this.isShowAccountTable
        this.isShowRoleForm = !this.isShowRoleForm
      },
      // 打开权限表格
      displayPermissionTable() {
        this.isShowPermissionTable = !this.isShowPermissionTable
        this.isShowRoleForm = !this.isShowRoleForm

        //发送请求，获取该角色拥有的所有权限
        this.axios.post(
          this.myIp + "Manage/getRoleByPermission",
          this.Qs.stringify({permission_code: this.form.permission_code})
        ).then(response=>{
          console.log(response)
          if (response.status === 200 && response.data.code === 0) {
            this.roleTableData = response.data.data
          } else {
            console.log(response.data.msg)
            console.log('在权限表单中获取不到角色数据')  
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      beforeEnter() {
        this.isShowRoleForm = true
      },
      afterLeave() {
        this.isShowRoleForm = true
      },
    },

  }
</script>

<style scoped>
    .form-card {
        width: 30vw;
        margin: 0 auto;
    }
    .cannot-modifier-span{
        display: inline-block;
        padding: 0px 18px;
        font-size: 14px;
        color: #606266;
    }
    .form-container {
        display: inherit;
    }

    /* 表单和表格的显示隐藏的过渡效果 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity:0
    }
</style>