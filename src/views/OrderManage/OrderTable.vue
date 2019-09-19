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
                        label="订单编号"
                        width="200">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.storage_order_code }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="用户编号"
                        prop="account"
                        width="130">
                </el-table-column>
                <el-table-column
                        label="柜子编号"
                        prop="now_storage_code"
                        width="130"
                        show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                        label="开始时间"
                        prop="start_time"
                        width="170">
                </el-table-column>
                <el-table-column
                        label="预结时间"
                        prop="pre_end_time"
                        width="170">
                </el-table-column>
                <el-table-column
                        label="订单状态"
                        width="100"
                        :filters="[{text: '进行中', value: 1},{text: '待支付', value: 0},{text: '已结束', value: 2}]"
                        :filter-method="filterStatus"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.order_status === 1 ? 'success': scope.row.order_status === 0 ? 'danger' : 'info'">
                            {{scope.row.order_status=== 1 ? '进行中': scope.row.order_status === 0 ? '待支付' : '已结束'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="是否超时"
                        width="100"
                        :filters="[{text: '是', value: 1},{text: '否', value: -1}]"
                        :filter-method="filterOver"
                        filter-placement="bottom-end">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.has_overtime === -1 ? 'success': 'danger'">
                            {{scope.row.has_overtime === -1 ? '否' : '是'}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        fixed="right"
                        width="160">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-size="10"
                    :total="total"
                    layout="total, prev, pager, next, jumper, ->"
                    class="account-pagination">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>

  export default {
    name: "",
    data() {
      return {
        disabled: true,
        value: true,
        tableData: [],
        total: 0,
      }
    },
    created(){
      //打开路由时获取 订单列表 数据
      // getTableData({pageNum: 1}, this, "Manage/getRoleList", "roleList")
      this.fetchData(1)
    },
    methods: {
      //获取表格数据
      fetchData(num) {
        this.axios.post(this.myIp + "Manage/getStoreOrderList",
        this.Qs.stringify(
        {pageNum: num, token: this.$store.state.userData[1]}
        )).then(response => {
          console.log(response)
          if (response.status === 200 && response.data.code === 0) {
            //  处理数据，将数据布置到组件上
            this.total = response.data.data.count
            this.tableData = response.data.data.orderList
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        }).catch(error=>{
          this.$message({type: 'warning', message: '获取到不数据'});
        })
      },
      //进入详情
      handleEdit(index, row) {
        this.$router.push({name: 'orderForm', params: row})
      },
      //删除订单
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 遮罩
          // const loding = this.$loading({
          //   lock: true,
          //   text: '正在加载中...',
          //   spinner: 'el-icon-loading',
          //   background: 'rgba(0, 0, 0, 0.7)'
          // })
          // // 发送删除请求
          // this.axios.post(
          //   this.myIp + "Manage/removeOrderWithOthers",
          //   this.Qs.stringify({storage_order_code: row.storage_order_code})
          // ).then(response=>{
          //   if (response.data.code === 0) {
          //     this.$message({type: 'success', message: '删除成功!'});
          //     //重新加载数据
          //     this.fetchData(1)
          //   } else {
          //     this.$message({type: 'warning', message: '删除失败!'});
          //   }
          // }).catch(error=>{
          //   this.$message({type: 'warning', message: '删除失败!'});
          // })
          // //关闭遮罩
          // loding.close()

          this.$message({type: 'warning', message: '此功能正在开发中!'});

        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'});
        });
      },

      //
      handleSelect(selection, row) {
        this.disabled = !this.disabled
        console.log(selection, row)
      },
      //选择页面
      handleCurrentChange(value) {
        this.fetchData(value)
      },
      //过滤订单状态
      filterStatus(value, row) {
        return row.order_status === value
      },
      //过滤订单是否超时
      filterOver(value, row) {
        return row.has_overtime === value
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
</style>