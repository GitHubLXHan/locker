<template>
    <div class="form-container">
        <!-- 左侧 账号表格部分 -->
        <transition
                name="fade"
                @before-enter="beforeEnter"
                @after-leave="afterLeave">
            <el-card class="form-card" v-show="isShowAccountTable">
                <el-table
                        :data="accounts">
                    <el-table-column
                            label="账号"
                            prop="account"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            label="姓名"
                            prop="username"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            label="性别"
                            width="70"
                            :filters="[{text: '男', value: 1}, {text: '女', value: 0}]"
                            :filter-method="filterSex">
                        <template slot-scope="scope">
                            <el-tag
                                    :type="scope.row.sex===0 ? 'danger': 'success'">
                                {{scope.row.sex === 0 ? '女' : '男'}}
                            </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            fixed="right"
                            width="90">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary">查看</el-button>
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

        <!-- 中间 主表单部分 -->
        <transition name="fade">
            <el-card class="form-card" v-if="isShowRoleForm">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="角色名称">
                        <el-input  v-model="form.role_name" v-if="addNow"></el-input>
                        <span class="cannot-modifier-span" v-else>{{form.role_name}}</span>
                    </el-form-item>
                    </el-form-item>
                    <el-form-item label="角色标识">
                        <el-input  v-model="form.role_flag" v-if="addNow"></el-input>
                        <span class="cannot-modifier-span" v-else>{{form.role_flag}}</span>
                    </el-form-item>
                    <el-form-item label="是否有效">
                        <el-tooltip placement="top" :content="form.status ? '是' : '否'">
                            <el-switch
                                    v-model="form.forbid_status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    :active-value="1"
                                    :inactive-value="0">
                            </el-switch>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item v-show="!addNow">
                        <el-row>
                            <el-col :span="12">
                                <el-button type="primary" class="role-button" @click="displayAccountTable">
                                    <i class="el-icon-caret-right" v-if="isShowAccountTable"></i>
                                    <i class="el-icon-caret-left" v-else></i>
                                    {{isShowAccountTable? '关闭' : '账号'}}
                                </el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="primary" class="role-button" @click="displayPermissionTable">
                                    {{isShowPermissionTable? '关闭' : '权限'}}
                                    <i class="el-icon-caret-left" v-if="isShowPermissionTable"></i>
                                    <i class="el-icon-caret-right" v-else></i>
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" :autosize='{ minRows: 2, maxRows: 4}' maxlength="100" v-model="form.description"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间" v-show="!addNow">
                        <span class="cannot-modifier-span">{{form.create_time}}</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit"v-if="addNow" >立即添加</el-button>
                        <el-button type="primary" @click="onSubmit" v-else>立即修改</el-button>
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
                        :data="permissions">
                    <el-table-column
                            label="权限名称"
                            prop="permission_name"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            label="权限标识"
                            prop="permission_flag"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            label="描述"
                            prop="description"
                            width="100"
                            show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            fixed="right"
                            width="70">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="primary">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                        class="role-pagination"
                        small
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="6"
                        @current-change="handlePageChange">
                </el-pagination>
                <el-button type="primary" @click="modifyPermissionBtn">修改权限</el-button>
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
        addNow: true,
        form: {
          role_name: '',
          role_flag: '',
          description: '',
          forbid_status: 1
        },
        permissions: [],
        accounts: [],
        total: 0
      };
    },
    //周期钩子函数
    created() {
      this.getRouteData()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        //遮罩
        const loding = this.$loading({
          lock: true,
          text: '正在加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        if (this.addNow) {
          //上传数据
          this.form.token = this.$store.state.userData[1]
          this.axios.post(
            this.myIp + "Manage/addRole",
            this.Qs.stringify(this.form)
          ).then(response=>{
            if (response.status === 200 && response.data.code === 0) {
              this.form.role_code = response.data.data.role_code
              this.$notify({title: '注意', message: '添加成功！', type: 'success', duration: 2000})
              this.$emit("update:step", 2)
              this.$router.replace({name:'roleTransferInAddPermission', params: {permissionsData: this.permissions, form: this.form, come: "permission"}})
            } else {
              this.$message({type: 'warning', message: response.data.msg});
              this.$notify({title: '注意', message: '添加失败', type: 'warning', duration: 2000});
            }
          }).catch(error=>{
            this.$notify({title: '注意', message: '添加失败', type: 'warning', duration: 2000});
          })

        } else {
          //上传数据 --> 修改账号
          this.form.token = this.$store.state.userData[1]
          this.axios.post(
            this.myIp + "Manage/updateRole",
            this.Qs.stringify(this.form)
          ).then(response=>{
            console .log(response)
            if (response.status === 200 && response.data.code === 0) {
              this.$notify({title: '注意', message: '修改成功', type: 'success', duration: 2000});
            } else {
              this.$notify({title: '注意', message: '修改失败', type: 'warning', duration: 2000});
              this.$message({type: 'warning', message: response.data.msg});
            }
          }).catch(error=>{
            console.log(error)
            this.$notify({title: '注意', message: '修改失败', type: 'warning', duration: 2000});
          })
        }
        //关闭遮罩
        loding.close()
      },
      // 获取 路由params 数据
      getRouteData() {
        let data = this.$route.params;
        console.log(data)
        if (!data.role_code) {
          console.log('返回')
          return
        }
        this.form.role_code =  data.role_code;
        this.form.role_name = data.role_name;
        this.form.create_time = data.create_time;
        this.form.role_flag = data.role_flag;
        this.form.description = data.description;
        this.form.forbid_status = data.forbid_status;
        this.addNow = false
      },
      // 筛选性别回调函数
      filterSex(value, row) {
        return row.sex === value
      },
      // 打开用户表格
      displayAccountTable() {
        this.isShowAccountTable = !this.isShowAccountTable
        this.isShowRoleForm = !this.isShowRoleForm
        //发送请求，获取已经分配该角色的所有账号
        this.axios.post(
          this.myIp + "Manage/getRoleAccount",
          this.Qs.stringify({role_code: this.form.role_code, token: this.$store.state.userData[1]})
        )
        .then(response=>{
          console.log(response)
          if (response.status === 200 && response.data.code === 0) {
            this.accounts = response.data.data
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        })
        .catch(error=>{
          console.log(error)
          console.log('获取不到角色拥有的权限')
        })
      },
      // 打开权限表格
      displayPermissionTable() {
        this.isShowPermissionTable = !this.isShowPermissionTable
        this.isShowRoleForm = !this.isShowRoleForm
        //发送请求，获取该角色拥有的权限
        this.axios.post(
          this.myIp + "Manage/getRolePermission",
          this.Qs.stringify({pageNum: 1, role_code: this.form.role_code, token: this.$store.state.userData[1]})
        )
        .then(response=>{
          if (response.status === 200 && response.data.code === 0) {
            this.permissions = response.data.data.permissionList
            this.total = response.data.data.count
          } else {
            this.$message({type: 'warning', message: response.data.msg});
        }
        })
        .catch(error=>{
          console.log(error)
          console.log('获取不到角色拥有的权限')
        })
      },
      // 选择权限页的页码
      handlePageChange(val) {
        //翻页发送请求，获取该角色拥有的权限
        this.axios.post(
          this.myIp + "Manage/getRolePermission",
          this.Qs.stringify({pageNum: val, role_code: this.form.role_code, token: this.$store.state.userData[1]})
        )
        .then(response=>{
          if (response.status === 200 && response.data.code === 0) {
            this.permissions = response.data.data.permissionList
            this.total = response.data.data.count
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        })
        .catch(error=>{
          console.log(error)
          console.log('获取不到角色拥有的权限')
        })
      },
      beforeEnter() {
        this.isShowRoleForm = true
      },
      afterLeave() {
        this.isShowRoleForm = true
      },
      // 进入权限分配路由
      modifyPermissionBtn() {
        this.$notify({title: '注意', message: '请修改权限', type: 'success', duration: 2000});
        this.$router.replace({name: 'roleTransfer', params: {permissionsData: this.permissions, form: this.form, come: "permission"}})
      }
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
        display: flex;
    }

    /* 表单和表格的显示隐藏的过渡效果 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity:0
    }
</style>