<template>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格">
            <el-row type="flex" justify="center">
                <el-col :span="8">
                    <el-dropdown @command="handleChooseColumn">
                        <el-tag type="success">
                            {{column}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-tag>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">1</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <el-col :span="4">
                    <span>x</span>
                </el-col>
                <el-col :span="8">
                    <el-dropdown @command="handleChooseRow">
                        <el-tag type="success">
                            {{row}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-tag>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">1</el-dropdown-item>
                            <el-dropdown-item command="2">2</el-dropdown-item>
                            <el-dropdown-item command="3">3</el-dropdown-item>
                            <el-dropdown-item command="4">4</el-dropdown-item>
                            <el-dropdown-item command="5">5</el-dropdown-item>
                            <el-dropdown-item command="6">6</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-row>
        </el-form-item>
        <el-form-item label="类型">
            <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="描述">
            <el-input v-model="form.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即添加</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
  export default {
    name: "",
    data() {
      return {
        column: 1,
        row: 1,
        form: {
          type: '',
          description: '',
        }
      }
    },

    methods: {
      handleChooseColumn(command) {
        this.column = command
      },
      handleChooseRow(command) {
        this.row = command
      },
      onSubmit() {
        const loding = this.$loading({
          lock: true,
          text: '正在加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        //添加类型
        this.form.dimensions = this.column + "" + this.row
        this.form.token = this.$store.state.userData[1]
        this.axios.post(
          this.myIp + "Manage/addSonStorage",
          this.Qs.stringify(this.form)
        ).then(response=>{
          console.log(response)
          if (response.status === 200 && response.data.code === 0) {
            this.$notify({title: '注意', message: '添加成功', type: 'success', duration: 2000});
            this.$router.go(-1)
          } else{
            this.$message({type: 'warning', message: response.data.msg});
            this.$notify({title: '注意', message: '添加失败,规格重复!', type: 'danger', duration: 2000});
          }
        }).catch(error=>{
          this.$notify({title: '注意', message: '添加失败', type: 'warning', duration: 2000});
        })
        loding.close()
      }
    },
  }
</script>

<style scoped>
    .el-row {
        text-align: center;
    }
</style>