<template>
    <el-table
            :data="smallLocker"
            style="width: 100%">
        <el-table-column
                type="selection"
                fixed
                width="55">
        </el-table-column>
        <el-table-column
                label="小柜编号"
                prop="son_storage_code"
                width="100">
        </el-table-column>
        <el-table-column
                label="规格"
                prop="dimensions"
                width="100">
        </el-table-column>
        <el-table-column
                label="类型"
                prop="type"
                width="100">
        </el-table-column>
        <el-table-column
                label="描述"
                prop="description"
                width="200"
                show-overflow-tooltip>
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
                        disabled>删除</el-button>
            </template>
        </el-table-column>
        <el-table-column
                label="禁用"
                fixed="right"
                width="80">
            <template slot-scope="scope">
                <el-tooltip content="此功能开发中" placement="top">
                    <el-switch
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
    data() {
      return {
        smallLocker: []
      }
    },
    created() {
      this.axios.post(
        this.myIp + "Manage/getSonStorageInfo",
        this.Qs.stringify({token: this.$store.state.userData[1]})
      ).then(response=>{
        console.log(response)
        if (response.status === 200 && response.data.code === 0) {
          this.smallLocker = response.data.data
        } else {
          this.$message({type: 'warning', message: response.data.msg});
        }
      }).catch(error=>{
        console.log(error)
      })
    },

  }
</script>

<style scoped>

</style>