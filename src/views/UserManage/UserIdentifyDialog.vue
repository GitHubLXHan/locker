<template>
    <div>
        <el-card>
            <el-form :model="form">
                <el-form-item label="真实姓名">
                    <span class="cannot-modifier-span">{{form.name}}</span>

                </el-form-item>
                <el-form-item label="身份证号">
                    <span class="cannot-modifier-span">{{form.identification}}</span>

                </el-form-item>
                <el-form-item label="性别">
                    <el-tag type="form.sex === 0 ? 'danger' : 'success'">
                        {{form.sex === 0 ? '女' : '男'}}
                    </el-tag>
                </el-form-item>
                <el-form-item label="认证日期">
                    <span class="cannot-modifier-span">{{form.identifyTime}}</span>
                </el-form-item>
            </el-form>

        </el-card>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handle">确 定</el-button>
        </div>
    </div>



</template>

<script>
  export default {
    props: [
      'userId',
    ],
    data() {
      return {
        form: {
          name: '',
          identification: '',
          sex: 0,
          identifyTime: '4984965'
        },
      }
    },
    created() {
      this.getId()
    },
    methods: {
      getId() {
        this.form.name = this.userId;
      },
      handle() {
        this.$emit('update:dialogIdentifyForm', false)
      }
    },
    computed: {

    }
  }
</script>

<style scoped>
    .cannot-modifier-span{
        display: inline-block;
        padding: 0px 18px;
        font-size: 14px;
        color: #606266;
    }
    .dialog-footer {
        margin-top: 20px;
        text-align: end;
    }
</style>