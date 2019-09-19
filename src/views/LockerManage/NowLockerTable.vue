<template>
    <el-table
            :data="nowLocker"
            style="width: 100%"
            @selection-change="handleSelect">
        <el-table-column
                type="selection"
                fixed
                width="55">
        </el-table-column>
        <el-table-column
                label="柜子编号"
                prop="now_storage_code"
                width="240">
        </el-table-column>
        <el-table-column
                label="状态"
                width="100">
            <template slot-scope="scope">
                <el-tag :type="scope.row.status === 0 ? 'success' : scope.row.status === 1 ? 'warning' : 'danger'">
                    {{scope.row.status === 0 ? '空闲中' : scope.row.status === 1 ? '租用中' : '维修中'}}
                </el-tag>
            </template>
        </el-table-column>
        <el-table-column
                label="规格"
                width="100">
            <template slot-scope="scope">
                <el-tag type="info">
                    {{scope.row.son_storage_code[0] + "*" + scope.row.son_storage_code[1]}}
                </el-tag>
            </template>
        </el-table-column>

        <el-table-column
                label="柜子位置"
                prop="location"
                width="140">
        </el-table-column>
        <el-table-column
                label="投放位置"
                prop=""
                width="240">
        </el-table-column>
        <el-table-column
                label="操作"
                fixed="right"
                width="160">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        disabled>编辑</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        disabled
                        @click="handleClickDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        <el-table-column
                label="禁用"
                fixed="right"
                width="80">
            <template slot-scope="scope">
                <el-tooltip content="Switch value value5" placement="top">
                    <el-switch
                            v-model="scope.row.forbid_status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            :active-value="1"
                            :inactive-value="0"
                            disabled>
                    </el-switch>
                </el-tooltip>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
  export default {
    props: {
      page: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        nowLocker: []
      }
    },
    created() {
      this.fetchData(this.page)
    },
    methods: {
      // 获取数据
      fetchData(num) {
        this.axios.post(
          this.myIp + "Manage/getNowStorageList",
          this.Qs.stringify({pageNum: num, token: this.$store.state.userData[1]})
        ).then(response=>{
          console.log(response)
          if (response.status === 200 && response.data.code === 0) {
            this.total = response.data.data.count
            this.nowLocker = response.data.data.mainStorageList
            this.$emit("changeData", {total: this.total});      
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
 
        }).catch(error=>{
          console.log(error)
        })
      },
      //
      handleSelect(selection, row) {
        this.disabled = !this.disabled
        console.log(selection, row)
      },
      //删除当前柜子
      handleClickDelete(row) {
        this.$confirm('此操作将永久删除该储物柜, 是否继续?', '提示', {
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
            this.myIp + "Manage/removeNowStorage",
            this.Qs.stringify({now_storage_code: row.now_storage_code, token: this.$store.state.userData[1]})
          ).then(response=>{
            if (response.status === 200 && response.data.code === 0) {
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

    },
    watch: {
      page:{
        handler: function (newVal, oldVal) {
          // 页码变化时重新加载数据
          this.fetchData(newVal)
        },
      }
    }
  }
</script>

<style scoped>

</style>