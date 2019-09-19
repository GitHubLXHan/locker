<template>
    <div>
        <div class="tools-content">
            <el-card class="tools-row">
                <el-row :gutter="80">
                    <el-col :span="1">
                        <el-button type="primary"  icon="el-icon-delete" :disabled="disabled"></el-button>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <el-card class="table-box">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    @selection-change="handleSelect">
                <el-table-column
                        type="selection"
                        fixed
                        width="55">
                </el-table-column>
                <el-table-column
                        label="头像"
                        width="120">
                    <template slot-scope="scope">
                        <img src="../../assets/icon_hongtaoguo.png" alt="头像" class="user-profile">
                    </template>
                </el-table-column>
                <el-table-column
                        label="昵称"
                        prop="nickname"
                        width="130">
                </el-table-column>
                <el-table-column
                        label="账号"
                        prop="account"
                        width="150">
                </el-table-column>
                <el-table-column
                        label="邮箱"
                        prop="email"
                        width="210"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="余额"
                        prop="balance"
                        width="110">
                </el-table-column>
                <el-table-column
                        label="是否认证"
                        prop="isIdentify"
                        width="100"
                        :filters="[{text: '是', value: 1}, {text: '否', value: 0}]"
                        :filter-method="filterIdentify">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.isIdentify===1 ? 'success': 'warning'">
                            {{scope.row.isIdentify === 1 ? '是' : '否'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        fixed="right"
                        width="220">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleClickDetail(scope.$index, scope.row)">详细</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        label="禁用"
                        fixed="right"
                        width="80">
                    <template slot-scope="scope">
                        <el-tooltip :content="scope.row.forbid_status ? '是' : '否'" placement="top">
                            <el-switch
                                    v-model="scope.row.forbid_status"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="switchChange($event, scope.row)">
                            </el-switch>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    :total="total"
                    layout="total, prev, pager, next, jumper, ->"
                    class="account-pagination">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
  import {getTableData} from '../Utils/GetDataUtil'
  export default {
    name: "",
    data() {
      return {
        disabled: true,
        value: true,
        tableData: [],
        total: 0,
        currentPage: 1,
      }
    },
    created() {
      console.log('created执行')
      //打开路由时获取 账号列表 数据
      // getTableData({pageNum: 1}, this, "Manage/getUserList", "userList")
      this.fetchData(1)
    },
    methods: {
      //获取表格数据
      fetchData(num) {
        this.axios.post(this.myIp + "Manage/getUserList",
          this.Qs.stringify(
            {pageNum: num, token: this.$store.state.userData[1]}
          )).then(response => {
          console.log(response)
          if (response.status === 200 && response.data.code === 0) {
              //  处理数据，将数据布置到组件上
              this.total = response.data.data.count
              this.tableData = response.data.data.userList
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        }).catch(error=>{
          this.$message({type: 'warning', message: '获取不到数据'});
        })
      },
      //进入详情
      handleClickDetail(index, row){
        this.$router.push({name: 'userForm', params: row})
      },
      //删除账号
      handleDelete(index, row) {
        console.log(index, row)
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 遮罩
          const loding = this.$loading({
            lock: true,
            text: '正在加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          // 发送删除账号请求
          this.axios.post(
            this.myIp + "Manage/removeUserByAccount",
            this.Qs.stringify({account: row.account, token: this.$store.state.userData[1]})
          ).then(response=>{
            if (response.data.code === 0) {
              this.$message({type: 'success', message: '删除成功!'});
              //重新加载数据
              this.fetchData(1)
            } else {
              this.$message({type: 'warning', message: response.data.msg});
              this.$message({type: 'warning', message: '删除失败!'});
            }
          }).catch(error=>{
            this.$message({type: 'warning', message: '删除失败!'});
          })
          //关闭遮罩
          loding.close()
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },
      //
      handleSelect(selection, row) {
        this.disabled = !this.disabled
      },
      //禁/启用用户
      switchChange($event, row) {
        // 判断时禁止/启用操作，生成提示语
        let operate = '' // 用字符串记录目前的操作，供提示框显示
        let ori = 0 // 用整数记录原本的状态
        if ($event === 1) {
          operate = '启用'
        } else {
          operate = '禁用'
          ori = 1
        }
        //弹出提示框
        this.$confirm("此操作将"+ operate +"该用户, 是否继续?", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 遮罩
          const loding = this.$loading({
            lock: true,
            text: '正在加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          // 发送删除请求
          this.axios.post(
            this.myIp + "Manage/updateUser",
            this.Qs.stringify({account: row.account, forbid_status: $event, token: this.$store.state.userData[1]})
          ).then(response=>{
            if (response.status=== 200 && response.data.code === 0) {
              this.$message({type: 'success', message: operate + '成功!'});
            } else {
              // 将按钮的状态改成原来的状态
              row.forbid_status = ori
              this.$message({type: 'warning', message: response.data.msg});
              this.$message({type: 'warning', message: operate + '失败!'});
            }
          }).catch(error=>{
            // 将按钮的状态改成原来的状态
            row.forbid_status = ori
            this.$message({type: 'warning', message: operate + '失败!'});
          })
          //关闭遮罩
          loding.close()
        }).catch(() => {
          // 将按钮的状态改成原来的状态
          row.forbid_status = ori
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      //选择页码
      handleCurrentChange(value) {
        // this.getData(value)
        fetchData(value)
      },
      //过滤是否认证了
      filterIdentify(value, row) {
        return row.isIdentify === value
      }

    }
  }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
        margin-left: 20px;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .tools-content {
        height: 65px;
        position: relative;
    }

    .tools-content .el-card__body {
        padding: 10px;
    }

    .tools-row {
        bottom: 10px;
        width: 100%;
        position: absolute;
    }
    .account-pagination {
        text-align: center;
    }
    .user-profile {
        width: 50px;
        height: 50px;
        border-radius: 25px;
    }
</style>