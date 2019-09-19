<template>
    <el-table
            :data="bigLocker"
            style="width: 100%">
        <el-table-column
                type="selection"
                fixed
                width="55"  >
        </el-table-column>
        <el-table-column
                label="储物柜编号"
                prop="storage_code"
                width="220">
        </el-table-column>
        <el-table-column
                label="省份"
                prop="province"
                width="110">
        </el-table-column>
        <el-table-column
                label="城市"
                prop="city"
                width="110">
        </el-table-column>

        <el-table-column
                label="经度"
                prop="longitude"
                width="120">
        </el-table-column>
        <el-table-column
                label="纬度"
                prop="latitude"
                width="120">
        </el-table-column>
        <el-table-column
                label="放置日期"
                prop="put_in_time"
                width="140"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                label="具体位置"
                prop="concrete_location"
                width="130"
                show-overflow-tooltip>
        </el-table-column>
        <el-table-column
                label="操作"
                fixed="right"
                width="160">
            <template slot-scope="scope">
                <el-button
                        size="mini"
                        @click="clickDetail(scope.$index)">详情</el-button>
                <el-button
                        size="mini"
                        type="danger"
                        disabled>删除</el-button>
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
        total: 0,
        bigLocker: [],
        curPage: 1
      }
    },
    created() {
      // 进来时先获取第一页数据
      this.fetchData(this.page)
    },
    methods: {
      //获取数据
      fetchData(num) {
        this.axios.post(
          this.myIp + "Manage/getStorageList",
          this.Qs.stringify({pageNum: num, token: this.$store.state.userData[1]})
        ).then(response=>{
          console.log(response)
          if (response.status === 200 && response.data.code === 0) {
            this.total = response.data.data.count
            this.bigLocker = response.data.data.storageList
            this.$emit("changeData", {total: this.total});         
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }

        }).catch(error=>{
          console.log(error)
        })
      },
      //进入详情
      clickDetail(index) {
        this.$router.push({name:'putLockerFromBigLocker', params: {originData: this.bigLocker[index]}})
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