<template>
    <div>
        <div class="tools-content">
            <el-card class="tools-row">
                <el-row :gutter="80">
                    <el-col :span="1">
                        <el-button type="primary"  icon="el-icon-delete" :disabled="disabled"></el-button>
                    </el-col>
                    <el-col :span="1" >
                        <router-link to="/index/roleManage/addRole"><el-button type="primary"  icon="el-icon-plus">添加</el-button></router-link>
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
                        width="60">
                </el-table-column>
                <el-table-column
                        label="角色 ID"
                        prop="role_code"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="角色名称"
                        prop="role_name"
                        width="150">
                </el-table-column>
                <el-table-column
                        label="角色标识"
                        prop="role_flag"
                        width="130">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="create_time"
                        width="180">
                </el-table-column>
                <el-table-column
                        label="描述"
                        prop="description"
                        width="150"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="操作"
                        fixed="right"
                        width="200">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleClickDetail(scope.$index, scope.row)">详情</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                        label="禁用"
                        fixed="right"
                        width="100">
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
                    class="role-pagination">
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
        isDelete: false,
        total: 0,
        currentPage: 1,
        tableData: [],
      }
    },
    created(){
      //打开路由时获取 角色列表 数据
      // getTableData({pageNum: 1}, this, "Manage/getRoleList", "roleList")
      this.fetchData(1)
    },
    methods: {
      //获取表格数据
      fetchData(num) {
        this.axios.post(this.myIp + "Manage/getRoleList",
          this.Qs.stringify(
            {pageNum: num,
             token: this.$store.state.userData[1]}
          )).then(response => {
          //  处理数据，将数据布置到组件上
          if (response.status === 200 && response.data.code === 0) {
            this.total = response.data.data.count
            this.tableData = response.data.data.roleList           
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        }).catch(error=>{
          console.log(error)
        })
      },
      //进入详情
      handleClickDetail(index, row) {
        this.$router.push({name: 'roleForm', params: row})
      },
      //删除角色
      handleDelete(index, row) {
        console.log(index, row)
        this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
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
          console.log(row.role_code)
          this.axios.post(
            this.myIp + "Manage/removeRole",
            this.Qs.stringify({role_code: row.role_code, token: this.$store.state.userData[1]})
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
        console.log(selection, row)
      },
      //禁/启角色
      switchChange($event, row) {
        
        console.log(row)
        
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
        this.$confirm('此操作将' + operate + '该角色, 是否继续?', '提示', {
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
            this.myIp + "Manage/updateRole",
            this.Qs.stringify({role_code: row.role_code, forbid_status: $event, token: this.$store.state.userData[1]})
          ).then(response=>{
            //成功
            if (response.data.code === 0) {
              this.$message({
                type: 'success',
                message: operate + '成功!'
              });
            } else { // 失败
              row.forbid_status = ori
              this.$message({type: 'warning', message: response.data.msg});
            }
            //重新加载数据
            this.fetchData(1)
            //关闭遮罩
            loding.close()

          }).catch(error=>{
            console.log(error)
            row.forbid_status = ori
            this.$message({
              type: 'warning',
              message: operate + '失败!'
            });
          })

        }).catch(() => {
          row.forbid_status = ori
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      // 选择页码
      handleCurrentChange(value) {
        getTableData({pageNum: value, token: this.$store.state.userData[1]}, this, "Manage/getRoleList", "roleList")
      }
    }
  }
</script>

<style>
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
    .role-popover {
        margin-right: 10px;
    }
    .role-pagination {
        text-align: center;
    }
</style>