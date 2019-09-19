<template>
    <div class="main-container">
        <div class="form-container">
            <el-card class="left-tool">
                <el-row type="flex" justify="center">
                    <el-col :span="20">
                        <el-button type="primary"  icon="el-icon-plus" @click="putLockerBtnClick">放置柜子</el-button>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col :span="20" >
                        <el-button type="primary"  icon="el-icon-plus" @click="addLockerType">添加类型</el-button>
                    </el-col>
                </el-row>
            </el-card>

            <el-card>
                <router-view/>
            </el-card>
        </div>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        step: 1,

      }
    },
    methods: {
      putLockerBtnClick() {
        this.$router.push('putLocker')
      },
      addLockerType() {
        this.$router.push('addLockerType')
      },
      clickReset() {

      }
    },
  }
</script>



<style scoped>
    .main-container {
        padding: 10px;
    }
    .el-row {
        margin-bottom: 10px;
    }


    .form-container {
        display: flex;
        flex-direction: row ;
    }


    .left-tool{
        width: 10vw;
        margin-right: 10px;
    }

</style>