<template>
    <router-view/>
</template>

<script>
    export default {
      created() {
      //  页面加载时读取sessionStorage里的状态信息
        if (sessionStorage.getItem("session")) {
          //页面刷新时将session中的数据赋值到vuex中userData状态
          console.log('刷新后')
          this.$store.dispatch("getUserDataFromSession", sessionStorage.getItem("session"))
        }
        console.log('新打开')
        // 区分苹果系统还是其他系统
        let isOnIOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i)
        let eventName = isOnIOS ? "pagehide" : "beforeunload"
        // 页面刷新时触发一下函数将数据保存到sessionStorage
        window.addEventListener(eventName, ()=>{
          // console.log("刷新前")
          // sessionStorage.setItem("session", this.$store.state.userData)
          this.axios.post(this.myIp + 'Manage/outManage',
            Qs.stringify({token: this.$store.state.userData[1]}))
          .then(response=>{
              if (response.status === 200 && response.data.code === 0) {
                //清除session之后跳转到登录页面
                window.sessionStorage.removeItem('session')
              }
            }
          ).catch(error=>{
            console.log(error)
            this.$message({
              type: 'warning',
              message: '注销失败!'
            });
          })
        })
      }
    }
</script>

<style>
    html, body {
        padding: 0;
        margin: 0;
    }

    a {
        text-decoration: none;
    }
    .el-card__body {
        height: 100%;
    }
</style>