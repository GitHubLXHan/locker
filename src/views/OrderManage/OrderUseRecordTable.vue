<template>
    <div>
        <el-table
                :data="useRecordForm"
                style="width: 100%">
            <el-table-column
                    label="时间"
                    prop="operation_time">
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-tag type="info">
                        {{scope.row.operation}}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :current-page="1"
                :page-size="10"
                :total="10"
                layout="total, prev, pager, next, jumper, ->"
                class="account-pagination">
        </el-pagination>
    </div>
</template>

<script>
  export default {
    props: {
      useRecordForm: Array
    },
    data() {
      return {
      }
    }
  }
</script>

<style scoped>

</style>