<template>
    <el-form ref="overFormData" :model="overFormData" label-width="100px">
        <el-form-item label="订单编号">
            <span class="cannot-modifier-span">{{form.orderCode}}</span>
        </el-form-item>
        <el-form-item label="超出时间">
            <span class="cannot-modifier-span">{{form.overTime}}分钟</span>
        </el-form-item>
        <el-form-item label="超出费用">
            <span class="cannot-modifier-span">{{form.overPrice}}元</span>
        </el-form-item>
    </el-form>
</template>

<script>
  export default {
    props: [
      'overFormData'
    ],
    data() {
      return {
        form: {
          orderCode: this.overFormData.orderCode,
          overTime :this.overFormData.overTime,
          overPrice :this.overFormData.overPrice,
        }
      }
    }

  }
</script>

<style scoped>

</style>