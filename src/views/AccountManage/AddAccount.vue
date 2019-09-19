<template>
    <div class="main-container">
        <el-steps :active="step"  finish-status="success" process-status="process">
            <el-step title="添加账号" ></el-step>
            <el-step title="分配角色"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <router-view :step.sync="step"></router-view>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        step: 1,

      }
    }
  }
</script>



<style scoped>
    .main-container {
        padding: 10px;
    }


</style>