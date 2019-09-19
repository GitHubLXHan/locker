<template>
    <el-card class="transfer-card">

        <span class="explain"><i class="my-icon my-icon-user"></i>{{whereFrom === "account"? form.username : form.role_name}}</span>
        <el-transfer
                class="role-transfer"
                v-model="selected"
                :props="prop"
                filterable
                :titles="titles"
                :button-texts="['删除', '添加']"
                :format="{
                    noChecked: '${total}',
                    hasChecked: '${checked}/${total}'
            }"
                @change="handleChange"
                :data="data">
        </el-transfer>
        <div class="footer-btn">
            <el-button type="info" class="el-icon-close" @click="clickCancel">取消</el-button>
            <el-button type="primary" class="el-icon-check" @click="clickConfirm">确认</el-button>
        </div>
    </el-card>

</template>



<script>
  export default {
    data() {
      return {
        data: [],
        selected: [],
        form: 0,            // 从上一个路由获取到的表单数据
        originData: [],     // 原来拥有的列表
        addList: [],    // 添加列表
        removeList: [], // 删除列表
        whereFrom: "",      // 从哪个路由来的
        titles: [],     // 转换表左右两边的标题
        prop: {}
      };
    },
    created() {
      //取路由数据
      this.whereFrom = this.$route.params.come // 先获取到时从哪个路由来的

      if (this.whereFrom === "account") { // 从账号表单页面过来的
        let routeData = this.$route.params.rolesData
        for (let d in routeData) {
          this.selected.push(routeData[d].role_code)
          this.originData.push(routeData[d].role_code)
        }
        this.form = this.$route.params.form
        this.titles = ['所有角色', '已选角色']

        //获取所有角色数据
        this.axios.post(
          this.myIp + "Manage/getRoleList",
          this.Qs.stringify({token: this.$store.state.userData[1]}))
        .then(response=>{
          if (response.status === 200 && response.data.code === 0) {
            this.data = response.data.data.roleList
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        })
        .catch(error=>{
          this.$message({type: 'warning', message: '获取角色信息错误'});
        })
        this.prop = {key: 'role_code', label: 'role_name'}

      } else { // 从角色表单路由过来的

        let routeData = this.$route.params.permissionsData
        console.log(routeData)
        for (let d in routeData) {
          this.selected.push(routeData[d].permission_code)
          this.originData.push(routeData[d].permission_code)
        }
        this.form = this.$route.params.form
        this.titles = ['所有权限', '已选权限']
        //获取所有角色数据
        this.axios.post(this.myIp + "Manage/getPermissionList", this.Qs.stringify({token: this.$store.state.userData[1]}))
        .then(response=>{
          if (response.status === 200 && response.data.code === 0) {
            this.data = response.data.data.permissionList
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        })
        .catch(error=>{
          this.$message({type: 'warning', message: '获取角色信息错误'});
        });
        this.prop = {key: 'permission_code', label: 'permission_name'}
      }
    },
    methods: {
      //添加删除时的监听函数
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
        //添加
        if (direction === "right"){
          movedKeys.forEach(item=>{
            console.log('item',item )
            if (this.originData.indexOf(item) === -1) {
              console.log('这bu是原本里面的')
              this.addList.push(item)
            } else {
              this.removeList.splice(this.removeList.indexOf(item), 1)
            }
          })
        } else {
          //删除
          movedKeys.forEach(item=>{
            console.log('item',item )
            if (this.originData.indexOf(item) >= 0) {
              this.removeList.push(item)
              console.log('这是原本里面的')
            } else {
              this.addList.splice(this.addList.indexOf(item), 1)
            }
          })
        }
      },
      clickCancel() {
        this.$router.go(-1)
      },
      clickConfirm() {
        const loding = this.$loading({
          lock: true,
          text: '正在加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        if (this.whereFrom === "account") { // 从账号表单来的情况
          this.axios.post(
            this.myIp + "Manage/opAccountRole",
            this.Qs.stringify({
              account: this.form.account,
              removeRoleList: this.removeList,
              addRoleList: this.addList,
              token: this.$store.state.userData[1]
            })
          ).then(response=>{
            if (response.status === 200 && response.data.code === 0) {
              this.$emit("update:step", 3)
              this.$notify({title: '注意', message: '添加成功', type: 'success', duration: 2000});
              this.$router.go(-1)
            } else{
              this.$message({type: 'warning', message: response.data.msg});
            }
          }).catch(error=>{
            this.$notify({title: '注意', message: '添加失败', type: 'danger', duration: 2000});
          })
        } else { // 从角色表单来的情况
          this.axios.post(
            this.myIp + "Manage/opRolePermission",
            this.Qs.stringify({
              role_code: this.form.role_code,
              removePermissionList: this.removeList,
              addPermissionList: this.addList,
              token: this.$store.state.userData[1]
            })
          ).then(response=>{
            if (response.status === 200 && response.data.code === 0) {
              this.$emit("update:step", 3)
              this.$notify({title: '注意', message: '添加成功', type: 'success', duration: 2000});
              this.$router.go(-1)
            } else {
              this.$message({type: 'warning', message: response.data.msg});
            }
          }).catch(error=>{

            this.$notify({title: '注意', message: '添加失败', type: 'danger', duration: 2000});
          })
        }
        loding.close()
      }
    },
    
  };
</script>

<style>
    .explain {
        font-size: 20px;
        font-weight: bold;
        color: #FF4949;
    }

    .transfer-footer {
        margin-left: 20px;
        padding: 6px 5px;
    }
    .role-transfer {
        margin-top: 20px;
    }
    .role-transfer .el-transfer-panel {
        width: 300px;
    }

    .role-transfer .el-transfer-panel__body {
        height: 300px;
        width: inherit;
    }
    .role-transfer .el-transfer-panel__list {
        height: inherit;
        width: inherit;
    }
    .role-transfer .el-checkbox {
        width: inherit;
    }
    .transfer-card {
        width: fit-content;
        margin: 0 auto;
    }
    .footer-btn {
        margin-top: 20px;
        text-align: center;
    }
    .explain .my-icon-user {
        font-size: 40px;
    }

</style>