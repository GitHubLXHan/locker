<template>
    <div class="most-out">
        <!--<div class="xd-logo">-->
            <!--<img src="../assets/xd-logo.png">-->
        <!--</div>-->
        
        <el-card class="login-form-card">
            <div class="form-title-div">
                <span>嘻咚后台管理</span>
            </div>
            <el-form ref="form" :model="form" label-width="80px" label-position="top" class="card-body">
                <el-form-item label="账  号">
                    <el-input
                            ref="accountInput"
                            v-model="form.account"
                            class="form-input"
                            prefix-icon="my-icon my-icon-user"
                            @focus="accountInputFocus"
                            @blur="accountInputBlur"></el-input>
                </el-form-item>
                <el-form-item label="密  码">
                    <el-input
                            ref="pswInput"
                            type="password"
                            v-model="form.password"
                            class="form-input"
                            prefix-icon="my-icon my-icon-key"
                            @focus="pswInputFocus"
                            @blur="pswInputBlur"></el-input>
                </el-form-item>
                <el-form-item class="form-submit-item">
                    <el-row>
                        <el-col :span="24">
                            <el-button type="primary" @click="onSubmit" class="login-btn" :loading="loding" >{{loding ? "登录中..." : "立即登录"}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>

            <div class="form-footer-div">
                <span>嘻咚储物柜后台管理</span>
            </div>

        </el-card>
    </div>

</template>

<script>

    import Qs from 'qs'

  export default {
    name: "",
    data() {
      return {
        loding: false,
        form: {
          account: '',
          password: '',
        }
      }
    },
    created() {
      if (this.$store.state.loginStatus !== 0) {
        console.log('不可进入')
      } 
    },

    methods: {
      //登录时事件
      onSubmit(){
        this.$refs.form.validate(valid=>{
            console.log(this.form)
          //按钮不能再点击
          this.loding = true
          //发送请求
          // let d = {account: "admin", password: '123456'}
          // this.axios.post(this.myIp + 'Manage/loginManage', Qs.stringify(this.form))
          this.axios({
            method: 'post',
            url:this.myIp + 'Manage/loginManage',
            data: Qs.stringify(this.form),
            timeout: 3000})
          .then(response => {
            //登录成功
            console.log(response)
            console.log(response.data)
            if (response.status === 200 && response.data.code === 0)  {
              window.sessionStorage.setItem('session', response.data.data)
              this.$message.success('登录成功');
              let data = response.data
              this.$store.dispatch("loginAction", data.data)
              this.$router.push('index')
            } else {
              // 登录失败
              this.$message.error(response.data.msg);
              this.loding = false
            }

          })
          .catch(error =>{
            // 登录失败
            this.$message.error('登录失败');
            this.loding = false
            console.log(error)
          });
        })
        // var data = [{now_storage_code: "201909043612361111", storage_code: "20190904361236", son_storage_code: "11"},
        // {now_storage_code: "201909043612361212", storage_code: "20190904361236", son_storage_code: "12"},
        // {now_storage_code: "201909043612361213", storage_code: "20190904361236", son_storage_code: "12"},
        //   {now_storage_code: "201909043612361114", storage_code: "20190904361236", son_storage_code: "11"}]
        //
        // data.reduce((acc, cur, idx, src)=>{
        //   let x = cur.now_storage_code[cur.now_storage_code.length-2]*1
        //   let c = cur.son_storage_code[0]*1
        //   let r = cur.son_storage_code[1]*1
        //   console.log(x, (x+1), acc, (acc+r))
        //   return acc + r
        // }, data[0].now_storage_code[data[0].now_storage_code.length-1]*1)
      },

      // 聚焦失焦时间-用于改变输入框的图标颜色
      toggleIconColor(el, color) {
        el.$el.childNodes[2].firstChild.style.color = color
      },
      accountInputFocus() {
        this.toggleIconColor(this.$refs.accountInput, '#ff4949')
      },
      accountInputBlur(){
        this.toggleIconColor(this.$refs.accountInput, '')
      },
      pswInputFocus() {
        this.toggleIconColor(this.$refs.pswInput, '#ff4949')
      },
      pswInputBlur() {
        this.toggleIconColor(this.$refs.pswInput, '')
      },
    },
    watch: {

    }

  }
</script>

<style scope>
    /* logo样式 */
    .xd-logo {
        position: fixed;
        top: 10vh;
        left: 10vw;
        z-index: 100;
    }

    .xd-logo img {
        width: 120px;
    }

    /*form表达外层*/
    .most-out {
        height: 100vh;
        background-image: url('../assets/login-bg02.jpg');
        background-size: 100% 100%
    }

    .login-form-card {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        width: 40vw;
        height: 90vh;
        margin: 0 auto;
        opacity: 0.9;
    }

    .card-body {
        padding: 70px;
    }

    .card-body label {
        font-size: 20px;
    }

    /*form表单标题*/
    .form-title-div {
        text-align: center;
        font-size: 50px;
        color: #ff4949;
        font-weight: 800;
    }


    /*form表单的输入框*/
    .form-input {
        height: 50px;
    }

    .form-input .el-input__inner {
        height: 100%;
        padding-left: 50px;
        font-size: 20px;
    }

    .form-input .my-icon {
        font-size: 25px;
    }

    /*登录按钮*/
    .form-submit-item {
        margin-top: 55px;
    }

    .login-btn {
        width: 100%;
        height: 55px;
        font-size: 25px;
    }

    /*底部文字*/
    .form-footer-div {
        font-size: 16px;
        font-weight: bold;
        color: #000000;
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
    }

</style>