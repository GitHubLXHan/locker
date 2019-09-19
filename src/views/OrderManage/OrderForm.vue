<template>
    <div class="form-container">
        <transition name="fade" >
            <el-card class="form-card" v-if="isShowOrderForm">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="订单编号">
                        <span class="cannot-modifier-span">{{form.storage_order_code}}</span>
                    </el-form-item>
                    <el-form-item label="用户编号">
                        <span class="cannot-modifier-span">{{form.account}}</span>
                    </el-form-item>
                    <el-form-item label="创建日期">
                        <span class="cannot-modifier-span">{{form.create_time}}</span>
                    </el-form-item>
                    <el-form-item label="订单状态" >
                        <el-row >
                            <el-col :span="12">
                                <el-tag
                                        :type="form.order_status=== 1 ? 'success': form.order_status === 0 ? 'info' : 'danger'">
                                    {{form.order_status=== 1 ? '进行中': form.order_status === 0 ? '已结束' : '待支付'}}
                                </el-tag>
                            </el-col>
                            <el-col :span="12">
                                <el-button type="primary" size="small" class="role-button" @click="showUseRecord" v-popover:popover4>
                                    {{isShowUseRecord? '关闭' : '记录'}}
                                    <i class="el-icon-caret-left" v-if="isShowUseRecord"></i>
                                    <i class="el-icon-caret-right" v-else></i>
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="起始时间" >
                        <span class="cannot-modifier-span">{{form.start_time}}</span>
                    </el-form-item>
                    <el-form-item label="预结时间" >
                        <span class="cannot-modifier-span">{{form.pre_end_time}}</span>
                    </el-form-item>
                    <el-form-item label="起付金额" >
                        <span class="cannot-modifier-span">{{form.has_pay_fare}}</span>
                    </el-form-item>
                    <el-form-item label="是否超时">
                        <el-row >
                            <el-col :span="12">
                                <el-tag class="order-tag" :type="form.has_overtime === -1 ? 'success' : 'danger'">
                                    {{form.has_overtime === -1 ? '否' : '是'}}
                                </el-tag>
                            </el-col>
                            <el-col :span="12" v-show="form.has_overtime === 1">
                                <!-- 展示 超时 的popover -->
                                <el-popover
                                        ref="popover4"
                                        placement="top"
                                        width="280"
                                        trigger="click"
                                        @hide="hideOverFormPopover">
                                    <OrderLocker :over-form-data="overFormData"></OrderLocker>
                                    <el-button slot="reference" type="primary" size="small" class="role-button" @click="showOverPopover" v-popover:popover4>
                                        {{isShowOverPopover? '关闭' : '详情'}}
                                        <i class="el-icon-caret-bottom" v-if="isShowOverPopover"></i>
                                        <i class="el-icon-caret-top" v-else></i>
                                    </el-button>
                                </el-popover>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="总金额" >
                        <span class="cannot-modifier-span">{{form.has_pay_fare}}</span>
                    </el-form-item>
                    <!--<el-form-item label="描述" >-->
                        <!--<el-input type="textarea" v-model="form.desc" readonly></el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item>
                        <el-button type="primary">立即修改</el-button>
                        <el-button>返回</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </transition>

        <!-- 展示 使用记录 的 表格 -->
        <transition
                name="fade"
                @before-enter="beforeEnter"
                @after-leave="afterLeave">
            <el-card class="form-card" v-if="isShowUseRecord">
                <OrderUseRecordTable :useRecordForm="useRecordForm"></OrderUseRecordTable>
            </el-card>
        </transition>
    </div>
</template>

<script>
    import OrderLocker from './OrderOverForm'
    import OrderUseRecordTable from './OrderUseRecordTable'

  export default {

    data() {
      return {
        isShowOrderForm: true,
        isShowOverPopover: false, // 是否展示 超时表单
        isShowUseRecord: false, // 是否展示 使用记录表格
        form: {},
        useRecordForm: [],
        overFormData: {
          overTime: '33',
          overPrice: '3.50',
        }
      };
    },
    components: {
      OrderLocker,          // 超时信息
      OrderUseRecordTable   // 订单记录
    },
    created() {
      // 在生命周期钩子函数 created() 中注册获取路由传送过来的参数
      this.getRouteData()
    },
    methods: {
      // 获取路由传送过来的 params
      getRouteData() {
        let data = this.$route.params;
        console.log('ssss')
        console.log(data)
        if (!data.account) {
          return
        }
        this.form = data
        // this.form.account = data.account
        // this.form.create_time = data.create_time
        // this.form.end_time = data.end_time
        // this.form.has_overtime = data.has_overtime
        // this.form.has_pay_fare = data.has_pay_fare
        // this.form.now_storage_code = data.now_storage_code
        // this.form.order_status = data.order_status
        // this.form.pre_end_time = data.pre_end_time
        // this.form.start_time = data.start_time
        // this.form.storage_order_code = data.storage_order_code
      },
      // 展示 超时 的 popover
      showOverPopover() {
        this.isShowOverPopover = !this.isShowOverPopover
      },
      // 展示 使用记录 的 表格
      showUseRecord() {
        this.hideOverFormPopover();
        this.isShowUseRecord = !this.isShowUseRecord
        this.isShowOrderForm = !this.isShowOrderForm
        //发送请求获取数据
        this.axios.post(
          this.myIp + "Manage/getRecordByOrderCode",
          this.Qs.stringify({storage_order_code: this.form.storage_order_code, token: this.$store.state.userData[1]})
        ).then(response=>{
          if (response.status === 200 && response.data.code === 0) {
            this.useRecordForm = response.data.data
          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        }).catch(error=>{
          this.$message({type: 'warning', message: '获取储物柜使用记录出错'});
        })
      },

      // 动画有关
      beforeEnter() {
        this.isShowOrderForm = true
      },
      afterLeave() {
        this.isShowOrderForm = true
      },

      // 隐藏 超时 的 popover 时触发
      hideOverFormPopover() {
        this.isShowOverPopover = false
      }
    },
  }
</script>

<style scoped>
    .form-container {
        display: inherit;
    }
    .form-card {
        width: 30vw;
        margin: 0 auto;
    }

    .cannot-modifier-span{
        display: inline-block;
        padding: 0px 18px;
        font-size: 14px;
        color: #606266;
    }
    .order-tag {
        margin-left: 18px;
    }
    /* 表单和表格显示隐藏的过渡效果 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity:0
    }
</style>