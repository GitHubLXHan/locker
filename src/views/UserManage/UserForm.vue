<template>
    <div>
        <el-card class="form-card">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item>
                    <el-row type="flex" justify="center" align="middle">
                        <el-col :span="4">
                            <img src="../../assets/icon_hongtaoguo.png" alt="头像" class="user-profile">
                        </el-col>
                        <el-col :span="6"><label class="el-form-item__label">{{form.nickName}}</label></el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="账号 ID">
                    <span class="cannot-modifier-span">{{form.user_code}}</span>
                </el-form-item>
                <el-form-item label="昵称">
                    <span class="cannot-modifier-span">{{form.nickname}}</span>
                </el-form-item>
                <el-form-item label="账号">
                    <span class="cannot-modifier-span">{{form.account}}</span>
                </el-form-item>
                <el-form-item label="邮箱">
                    <span class="cannot-modifier-span">{{form.email}}</span>
                </el-form-item>

                <el-form-item label="余额">
                    <span class="cannot-modifier-span">{{form.balance}}</span>
                </el-form-item>
                <el-form-item label="是否认证" >
                    <el-tag class="identification-form-tag" :type="form.identification_is_identify === 1 ? 'success' : 'warning'">
                        {{form.identification_is_identify === 1 ? '是' : '否'}}
                    </el-tag>
                    <el-button type="primary" size="mini" @click="dialogIdentifyForm = true" v-show="form.identification_is_identify === 1">认证详情</el-button>
                </el-form-item>
                <el-form-item label="是否有效">
                    <el-tooltip placement="top" :content="form.forbid_status ? '是' : '否'" class="cannot-modifier-span">
                        <el-switch
                                v-model="form.forbid_status"
                                disabled
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                :active-value="1"
                                :inactive-value="0">
                        </el-switch>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="注册时间">
                    <span class="cannot-modifier-span">{{form.register_time}}</span>
                </el-form-item>
                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="onSubmit()">立即修改</el-button>-->
                    <!--<el-button>返回</el-button>-->
                <!--</el-form-item>-->
            </el-form>
        </el-card>
        <el-dialog
                :visible.sync="dialogIdentifyForm"
                :close-on-click-modal="false"
                :close-on-press-escape="false"
                width="40%"
                @open="open" >
            <span slot="title" class="explain"><i class="my-icon my-icon-user"></i>认证信息</span>
            <UserIdentifyDialog :user-id="form.id" :dialogIdentifyForm.sync="dialogIdentifyForm"></UserIdentifyDialog>
        </el-dialog>

    </div>




</template>

<script>

  import UserIdentifyDialog from './UserIdentifyDialog'

  export default {
    data() {
      return {
        dialogIdentifyForm: false,
        form: {
          user_code: '',
          nickname: '',
          account: '',
          email: '',
          register_time: '',
          balance: 0,
          identification_is_identify: 0,
          forbid_status: 1,
          profile_photo_url: ''
        },

      };
    },
    created() {
      // 在生命周期钩子函数 created() 中注册获取路由传送过来的参数
      this.getRouteData()
    },
    components:{
      UserIdentifyDialog,
    },
    methods: {
      // 获取路由传送过来的 params
      getRouteData() {
        let data = this.$route.params;
        if (!data.account) {
          return
        }
        this.form.user_code = data.user_code;
        this.form.nickname = data.nickname;
        this.form.account = data.account;
        this.form.email = data.email;
        this.form.register_time = data.register_time;
        this.form.balance = data.balance;
        this.form.identification_is_identify = data.identification_is_identify;
        this.form.forbid_status = data.forbid_status;
        this.form.profile_photo_url = data.profile_photo_url;
      },
      //暂时没用
      onSubmit() {
        alert('你这呆瓜！！')
      },
      open() {
        console.log(this.dialogIdentifyForm)
      },

    },
  }
</script>

<style scoped>
    .form-card {
        width: 50vw;
        margin: 0 auto;
    }
    .identification-form-tag {
        margin-right: 5%;
        margin-left: 18px;
    }
    .cannot-modifier-span{
        display: inline-block;
        padding: 0px 18px;
        font-size: 14px;
        color: #606266;
    }
    .user-profile {
        width: 70px;
        height: 70px;
        border-radius: 35px;
    }
</style>