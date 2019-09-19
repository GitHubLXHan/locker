<template>
    <div class="main-container">
        <el-steps :active="step"  finish-status="success">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
        <router-view/>
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