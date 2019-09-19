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
                        width="60">
                </el-table-column>
                <el-table-column
                        label="权限 ID"
                        prop="permission_code"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="权限名称"
                        prop="permission_name"
                        width="150">
                </el-table-column>
                <el-table-column
                        label="权限标识"
                        prop="permission_flag"
                        width="130">
                </el-table-column>
                <el-table-column
                        label="创建时间"
                        prop="create_time"
                        width="150"
                        show-overflow-tooltip>
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
        tableData: [],
        total: 0,
        currentPage: 1,
      }
    },
    created() {
      // getTableData({pageNum: 1, token: this.$store.state.userData[1]}, this, "Manage/getPermissionList", "permissionList")
      this.fetchData(1)
    },
    methods: {
      fetchData(num) {
        this.axios.post(
          this.myIp + "Manage/getPermissionList",
          this.Qs.stringify({pageNum: num, token: this.$store.state.userData[1]})
        ).then(response=>{
          console.log(response)
          if (response.status === 200 && response.data.code === 0) {
            this.total = response.data.data.count
            this.tableData = response.data.data.permissionList
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        }).catch(error=>{
          console.log(error)
        })

      },
      handleClickDetail(index, row) {
        this.$router.push({name: 'permissionForm', params: row})

      },
      handleDelete(index, row) {
        console.log(index, row)
        // this.$refs[index].doClose()
      },
      handleSelect(selection, row) {
        this.disabled = !this.disabled
        console.log(selection, row)
      },
      switchChange($event) {
      },
      handleRealDelete(index){
        this.$refs[index].doClose()
      },
      choose(poRefs,index) {
        console.log(poRefs)
        // console.log(poRefs[index].doShow())
        console.log(poRefs[index].doShow)
        console.log(poRefs[index].showPopper)
        poRefs[index].doShow()
        console.log(poRefs[index].showPopper)
        poRefs[index].doClose()
        console.log(poRefs[index].showPopper)
      },
      handleCurrentChange(value) {
        this.fetchData(value)

        // getTableData({pageNum: value, token: this.$store.state.userData[1]}, this, "Manage/getPermissionList", "permissionList")
        console.log(`当前第 ${value} 页`)
      },
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