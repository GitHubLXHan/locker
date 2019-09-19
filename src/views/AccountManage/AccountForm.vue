<template>
    <div class="form-container">
        <!--左侧账号表单-->
        <transition name="fade">
            <el-card class="form-card" v-if="isShowAccountForm">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="账号">
                        <el-input  v-model="form.account" v-if="addNow"></el-input>
                        <span class="cannot-modifier-span" v-else>{{form.account}}</span>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="性别">
                        <el-row>
                            <el-col :span="12">
                                <el-radio-group v-model="form.sex">
                                    <el-radio-button :label="0">女</el-radio-button>
                                    <el-radio-button :label="1">男</el-radio-button>
                                </el-radio-group>
                            </el-col>
                            <el-col :span="12" v-show="!addNow">
                                <el-button type="primary" class="role-button" @click="displayRoleTable">
                                    {{isShowRoleTable? '关闭' : '角色'}}
                                    <i class="el-icon-caret-left" v-if="isShowRoleTable"></i>
                                    <i class="el-icon-caret-right" v-else></i>
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="是否有效">
                        <el-tooltip placement="top" :content="form.forbid_status ? '是' : '否'">
                            <el-switch
                                    v-model="form.forbid_status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    :active-value="1"
                                    :inactive-value="0">
                            </el-switch>
                        </el-tooltip>
                    </el-form-item>
                    <el-form-item label="手机号码">
                        <el-input v-model="form.phone_number"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="form.description"></el-input>
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

        <!--右侧角色表格-->
        <transition
                name="fade"
                @before-enter="beforeEnter"
                @after-leave="afterLeave">
            <el-card  v-show="isShowRoleTable">
                <el-table
                        :data="roles">
                    <el-table-column
                            label="角色名称"
                            width="130"
                            prop="role_name">
                    </el-table-column>
                    <el-table-column
                            label="角色标识"
                            prop="role_flag"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            label="描述"
                            prop="description"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="160">
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="click(scope.$index, scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="modifyRoleBtn">修改角色</el-button>
            </el-card>
        </transition>
    </div>


</template>

<script>

  function myMessage(vm, title, msg, type) {
    vm.$notify({
      title: title,
      message: msg,
      type: type,
      duration: 2000})
  }

  export default {
    data() {
      return {
        isShowRoleTable: false,
        isShowAccountForm: true,
        addNow: true,
        form: {
          account: '',
          username: '',
          sex: 0,
          role: '',
          create_time: '',
          phone_number: '',
          password: '',
          email: '',
          description: '',
          forbid_status: 1
        },
        roles:[]
      };
    },
    // 生命周期钩子
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

        if (this.addNow) {  // 是添加账号的情况下
          //上传数据 --> 添加账号
          this.form.token = this.$store.state.userData[1] // 添加token
          this.axios.post(
            this.myIp + "Manage/addAccount",
            this.Qs.stringify(this.form)
          ).then(response=>{
            if (response.status === 200 && response.data.code === 0) {
              this.$notify({title: '注意', message: '添加成功', type: 'success', duration: 2000});
              this.$router.replace({name: 'roleTransferInAddCount', params: {rolesData: this.roles, form: this.form, come: "account"}})
              this.$emit("update:step", 2)
            } else {
              this.$message({type: 'warning', message: response.data.msg});
            }
          }).catch(error=>{
            this.$notify({title: '注意', message: '添加失败', type: 'warning', duration: 2000});
          })
        } else {
          //上传数据 --> 修改账号
          this.form.token = this.$store.state.userData[1]
          this.axios.post(
            this.myIp + "Manage/updateAccount",
            this.Qs.stringify(this.form)
          ).then(response=>{
            console.log(response)
            if (response.status === 200 && response.data.code === 0) {
              this.$notify({title: '注意', message: '修改成功', type: 'success', duration: 2000});
            } else {
              this.$message({type: 'warning', message: response.data.msg});
            }
          }).catch(error=>{
            console.log(error)
            this.$notify({title: '注意', message: '修改失败', type: 'warning', duration: 2000});
          })
        }
        loding.close()
      },

      // 获取 路由params 数据
      getRouteData() {
        let data = this.$route.params;
        if (!data.account) {
          return
        }
          this.form.account_code = data.account_code
          this.form.account =  data.account;
          this.form.username = data.username;
          this.form.sex = data.sex;
          this.form.create_time = data.create_time;
          this.form.phone_number = data.phone_number;
          this.form.password = data.password;
          this.form.email = data.email;
          this.form.description = data.description;
          this.form.forbid_status = data.forbid_status;
          this.addNow = false
      },
      // 查看角色
      displayRoleTable() {
        this.isShowRoleTable = !this.isShowRoleTable
        this.isShowAccountForm = !this.isShowAccountForm
        //发送请求，获取该角色拥有的所有权限
        this.axios.post(
          this.myIp + "Manage/getAccountRole",
          this.Qs.stringify({account: this.form.account, token: this.$store.state.userData[1]})
        ).then(response=>{
          if (response.status === 200 && response.data.code === 0) {
            this.roles = response.data.data
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        }).catch(error=>{
          console.log(error)
          console.log('获取不到账号拥有的角色')
        })
      },
      beforeEnter() {
        this.isShowAccountForm = true
      },
      afterLeave() {
        this.isShowAccountForm = true
      },
      click(index, row) {
        console.log(index)
        console.log(row)
      },
      modifyRoleBtn() {
        this.$notify({title: '注意', message: '请修改角色', type: 'success', duration: 2000});
        this.$router.replace({name: 'roleTransfer', params: {rolesData: this.roles, form: this.form, come: "account"}})
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
    .role-button {
        position: absolute;
        right: 0px;
    }
    .form-container {
        display: inherit;
    }
    .role-table-pagination {
        text-align: center;
    }
    /* 角色表格显示隐藏的过渡效果 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity:0
    }
</style>