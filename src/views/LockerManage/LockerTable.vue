<template>
    <div>
        <div class="tools-content">
            <el-card class="tools-row">
                <el-row :gutter="80">
                    <el-col :span="1">
                        <el-button type="primary"  icon="el-icon-delete" :disabled="disabled"></el-button>
                    </el-col>
                    <el-col :span="2" >
                        <router-link to="/index/lockerManage/addLocker"><el-button type="primary"  icon="el-icon-plus">添加</el-button></router-link>
                    </el-col>
                    <el-col :span="2" >
                        <el-dropdown
                            trigger="click"
                            @command="handleCommand">
                            <el-button type="primary">{{curTable}}<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="主柜列表">主柜列表</el-dropdown-item>
                                <el-dropdown-item command="子柜列表">子柜列表</el-dropdown-item>
                                <el-dropdown-item command="工作柜子">工作列表</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                </el-row>
            </el-card>
        </div>
        <el-card class="table-box">
            <router-view @changeData="changeData" :page="curPage"></router-view>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="curPage"
                    :page-size="10"
                    :total="total"
                    layout="total, prev, pager, next, jumper, ->"
                    class="account-pagination"
                    v-show="curTable != '子柜列表'">
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
        curTable: '主柜列表',
        total: 0,
        curPage: 1,
      }
    },

    methods: {
      handleEdit(index, row) {
        console.log(index, row)
      },
      //
      handleDelete(index, row) {
        console.log(index, row)
      },
      //
      switchChange($event) {
      },
      //选择页码
      handleCurrentChange(value) {
        this.curPage  = value
      },
      //选择显示不同的表格
      handleCommand(command) {
        this.curTable = command
        switch (command) {
          case '主柜列表':
            this.$router.push('bigLockerTable')
            break
          case '子柜列表':
            this.$router.push('smallLockerTable')
            break
          case '工作柜子':
            this.$router.push('nowLockerTable')
            break
        }
      },
      //获取到子组件通过 $emit() 方法传递过来的数据总条数
      changeData(val) {
        this.total = val.total
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