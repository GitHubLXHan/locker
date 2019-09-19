<template>
    <el-container style="height: auto; border: 1px solid #eee">
        <Aside :new-is-collapse="newIsCollapse"></Aside>
        <el-container direction="vertical" width="auto">
            <ContentRightHeader :newIsCollapse.sync="newIsCollapse"></ContentRightHeader>
            <router-view class="main-container"></router-view>
        </el-container>
    </el-container>
</template>

<script>
  import Aside from '../components/Aside'
  import ContentRightHeader from '../components/ContentRightHeader'

  export default {
    data() {
      return {
        newIsCollapse: false,
      }
    },
    components: {
      Aside,
      ContentRightHeader,
    },
    methods: {
    }
  };
</script>

<style scoped>
    .main-container {
        padding: 10px;

    }
</style>