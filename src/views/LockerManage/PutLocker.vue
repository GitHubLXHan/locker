import index from "../../router";
import index from "../../router";
<template>
    <div style="display: flex">
        <!--左侧可视化界面-->
        <div class="add-locker-main" >
            <div class="add-locker-btn" ref="addItem">
                <el-popover
                        placement="top"
                        title="选择型号"
                        width="200"
                        trigger="click"
                        v-model="popoverVisible">
                    <div style="text-align: right; margin: 0">
                        <!--动态渲染按钮 根据 gridTypeData数组 进行渲染-->
                        <el-button v-for="(item, index) in gridTypeData"
                                   :key="index"
                                   type="primary" size="mini"
                                   @click="setAddGrid(item.column, item.row)"
                                   class="type-choose-btn">{{item.type}}</el-button>
                    </div>
                    <a style="display: block;width: 100%;height: 100%;" slot="reference">
                        <i class="el-icon-plus addIcon"></i>
                    </a>
                </el-popover>
            </div>
            <!--动态渲染小格 根据 gridData数组 渲染组件-->
            <div
                    v-for="(item, index) in gridData"
                    :key="index"
                    :style="item.sty"
                    class="new-grid">
                <!--{{item.column + " " + item.position}}-->
            </div>
        </div>
        <!--右侧数据表格-->
        <el-form ref="form" :model="form" label-width="80px" class="big-locker-form">
            <el-form-item label="柜子编号" v-show="!form.addNow">
                <span class="cannot-modifier-span">{{form.storage_code}}</span>
            </el-form-item>
            <el-form-item label="省市">
                <el-row type="flex" justify="start" :gutter="10">
                    <el-col :span="8">
                        <el-cascader
                                :options="provinceData"
                                :placeholder="form.province"
                                @change="handleChooseProvince"
                                filterable
                        ></el-cascader>
                    </el-col>
                    <el-col :span="8">
                        <el-cascader
                                :options="cityData"
                                :placeholder="form.city"
                                @change="handleChooseCity"
                                filterable
                        ></el-cascader>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="具体位置">
                <el-input v-model="form.concrete_location"></el-input>
            </el-form-item>
            <el-form-item label="经/纬度">
                <el-row type="flex" justify="start" :gutter="10">
                    <el-col :span="10">
                        <el-input v-model="form.longitude" placeholder="经度"></el-input>
                    </el-col>
                    <el-col :span="10">
                        <el-input v-model="form.latitude" placeholder="纬度"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="投放时间" v-show="!addNow">
                <span class="cannot-modifier-span">{{form.put_in_time}}</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即添加</el-button>
                <el-button @click="reset"v-show="gridData.length>0">重置柜子</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

  export default {
    name: "",
    data() {
      return {
        curColumn: 1,
        curRow: 1,
        curPos: 1,
        provinceData:[
          {
            value: '直辖市',
            label: '直辖市'
          },
          {
            value: '广东省',
            label: '广东省'
          },
          {
            value: '福建省',
            label: '福建省'
          },
          {
            value: '浙江省',
            label: '浙江省'
          },
          {
            value: '江苏省',
            label: '江苏省'
          },

        ],
        cityData: [],
        guangDongCityData: [
          {
            value: '广州市',
            label: '广州市'
          },
          {
            value: '深圳市',
            label: '深圳市'
          },
          {
            value: '珠海市',
            label: '珠海市'
          },
          {
            value: '汕头市',
            label: '汕头市'
          },
          {
            value: '佛山市',
            label: '佛山市'
          },
          {
            value: '韶关市',
            label: '韶关市'
          },
          {
            value: '湛江市',
            label: '湛江市'
          },
          {
            value: '肇庆市',
            label: '肇庆市'
          },
          {
            value: '江门市',
            label: '江门市'
          },
          {
            value: 'maoming',
            label: '茂名市'
          },
          {
            value: 'huizhou',
            label: '惠州市'
          },
          {
            value: 'meizhou',
            label: '梅州市'
          },{
            value: 'shanwei',
            label: '汕尾市'
          },
          {
            value: 'heyuan',
            label: '河源市'
          },
          {
            value: 'yangjiang',
            label: '阳江市'
          },
          {
            value: 'qingyuan',
            label: '清远市'
          },
          {
            value: 'dongguan',
            label: '东莞市'
          },
          {
            value: 'zhongshan',
            label: '中山市'
          },
          {
            value: 'chaozhou',
            label: '潮州市'
          },
          {
            value: 'jieyang',
            label: '揭阳市'
          },
          {
            value: 'yunfu',
            label: '云浮市'
          },
        ],
        fuJianCityData: [
          {
            value: 'fuzhou',
            label: '福州市'
          },
          {
            value: 'xiamen',
            label: '厦门市'
          },
          {
            value: 'quanzhou',
            label: '泉州市'
          },
          {
            value: 'zhangzhou',
            label: '漳州市'
          },
          {
            value: 'nanping',
            label: '南平市'
          },
          {
            value: 'sanming',
            label: '三明市'
          },
          {
            value: 'longyan',
            label: '龙岩市'
          },
          {
            value: 'putianningde',
            label: '莆田市宁德市'
          },
        ],
        zheJiangCityData: [
          {
            value: 'hangzhou',
            label: '杭州市'
          },
          {
            value: 'ningbo',
            label: '宁波市'
          },
          {
            value: 'shaoxing',
            label: '绍兴市'
          },
          {
            value: 'wenzhou',
            label: '温州市'
          },
          {
            value: 'taizhou',
            label: '台州市'
          },
          {
            value: 'huzhou',
            label: '湖州市'
          },
          {
            value: 'jiaxing',
            label: '嘉兴市'
          },
          {
            value: 'jinhua',
            label: '金华市'
          },
        ],
        jiangSuCityData: [
          {
            value: 'nanjing',
            label: '南京市'
          },
          {
            value: 'wuxi',
            label: '无锡市'
          },
          {
            value: 'changzhou',
            label: '常州市'
          },
          {
            value: 'yangzhou',
            label: '扬州市'
          },
          {
            value: 'xuzhou',
            label: '徐州市'
          },
          {
            value: 'suzhou',
            label: '苏州市'
          },
          {
            value: 'lianyungang',
            label: '连云港市'
          },
          {
            value: 'yancheng',
            label: '盐城市'
          },
        ],
        zhixiaCityData: [
          {
            value: 'beijing',
            label: '北京市'
          },
          {
            value: 'shanghai',
            label: '上海市'
          },
          {
            value: 'tianjin',
            label: '天津'
          },
          {
            value: 'chongqing',
            label: '重庆'
          },
        ],
        popoverVisible: false,
        gridData: [], // 显示图形化界面的小柜子数据
        dimensions: [], // 将要上传的所有小柜子数据
        locat: [],  // 将要上传的所有小柜子的位置数据
        gridTypeData: [], // 小柜子类型数组 - 供添加小柜子时可选择
        form: {}, // 表单信息
        addNow: true
      }
    },
    created() {
      // 先获取所有的小柜子类型
      this.axios.post(
        this.myIp + "Manage/getSonStorageInfo",
        this.Qs.stringify({token: this.$store.state.userData[1]})
      ).then(response=>{
        if (response.status === 200 && response.data.code === 0) {
          response.data.data.forEach(item=>{
            this.gridTypeData.push({column: item.dimensions[0]*1, row: item.dimensions[1]*1, type: item.type})
          })
        } else {
          this.$message({type: 'warning', message: response.data.msg});
          this.$notify({title: '注意', message: '数据加载出错，请刷新页面！', type: 'danger', duration: 3000});
        }

      }).catch(error=>{
        console.log(error)
      })

      //获取上一个路由传过来的数据
      this.getRouteData()
    },
    methods: {
      setAddGrid(c, r) {
        console.log('选择')
        console.log(c,r)
        // 先判断要添加的柜子是否超出了当列大柜子所剩的格子
        if (r + this.curRow > 7) {
          // 弹出消息提示
          this.$message({
            showClose: true,
            message: '您要添加的柜子过大，请重新添加',
            type: 'warning'
          });
          return
        }

        // 添加储物柜数据
        var sty = `grid-column:${this.curColumn}/${(this.curColumn + 1)};grid-row:${this.curRow}/${this.curRow+=r};`
        /*
        * column 处在的列数
        * row 共占的行数
        * position 在储物柜中的位置 如 column(1) position(3) = 从上往下从左往右数第一列第三位
        * */
        this.gridData.push({column: this.curColumn, row: r, position: this.curPos++, sty: sty})
        this.dimensions.push(this.curColumn + "" + r)
        this.locat.push(this.curColumn + "" + (this.curPos - 1))

        // 判断是否需要向右移一列
        if (this.curRow >= 7 ) {
          this.curColumn += 1
          this.curRow = 1
          this.curPos = 1
        }

        // 修改添加按钮
        var grid = this.$refs.addItem
        grid.style.gridColumn = this.curColumn + '/' + (this.curColumn + 1)
        grid.style.gridRow = this.curRow + '/' + (this.curRow + 1)

        console.log(this.gridData)
        // 隐藏类型选项框
        this.popoverVisible = false;
      },
      reset() {
        this.gridData = []

        // 修改可添加柜子位置及添加按钮的位置
        this.curColumn = 1
        this.curRow = 1
        var grid = this.$refs.addItem
        grid.style.gridColumn = this.curColumn + '/' + (this.curColumn + 1)
        grid.style.gridRow = this.curRow + '/' + (this.curRow + 1)
      },
      handleChooseProvince(val) {
        console.log(val)
        this.form.province = val[0]
        switch (val[0]) {
          case '广东省':
            this.cityData = this.guangDongCityData
          break
          case '福建省':
            this.cityData = this.fuJianCityData
            break
          case '浙江省':
            this.cityData = this.zheJiangCityData
            break
          case '江苏省':
            this.cityData = this.jiangSuCityData
            break
          case '直辖市':
            this.cityData = this.zhixiaCityData
            break
        }
      },
      handleChooseCity(val){
        console.log(val)
        this.form.city = val[0]
      },
      onSubmit(){
        console.log(this.dimensions)
        console.log(this.locat)
        this.axios.post(
          this.myIp + "Manage/createStorage",
          this.Qs.stringify(
            {
              province: this.form.province,
              city: this.form.city,
              concrete_location: this.form.concrete_location,
              longitude: this.form.longitude,
              latitude: this.form.latitude,
              dimensions: this.dimensions,
              locat:this.locat,
              token: this.$store.state.userData[1]
            }
          )
        ).then(response=>{
          if (response.status === 200 && response.data.code === 0) {
            this.$notify({title: '注意', message: '添加成功', type: 'success', duration: 2000});
            this.$router.go(-1)
          } else {
            this.$message({type: 'warning', message: response.data.msg});
            this.$notify({title: '注意', message: '添加失败', type: 'success', duration: 2000});
          }
          console.log(response)
        }).catch(error=>{
          console.log(error)
          this.$notify({title: '注意', message: '添加失败', type: 'success', duration: 2000});
        })
      },
      // 获取 路由params 数据
      getRouteData() {
        let data = this.$route.params;
        console.log(data)
        if (!data.originData) {
          console.log('fanhui ')
          return
        }
        this.form = data.originData
        this.addNow = false
        console.log('请求数据')
        this.axios.post(
          this.myIp + "Manage/getNowStorageByMainCode",
          this.Qs.stringify({storage_code: data.originData.storage_code, token: this.$store.state.userData[1]})
        ).then(response=>{
          console.log(response)
          if (response.status === 200 && response.data.code === 0) {
            var grid = this.$refs.addItem
            grid.style.gridColumn = + '2/1'
            grid.style.gridRow = '4/5'
            //解析数据
            // 1. 先过滤数组
            var sortFun = function (a, b) {
                return a.now_storage_code[a.now_storage_code.length-1]*1 - b.now_storage_code[b.now_storage_code.length-1]*1
            }
            //总数据
            let arr = response.data.data
            //获取左侧数据
            let leftGrid = arr.filter(item=>item.now_storage_code[item.now_storage_code.length-2] == 1)
            leftGrid=leftGrid.sort(sortFun)
            //获取右侧数据
            let rightGrid = arr.filter(item=>item.now_storage_code[item.now_storage_code.length-2] == 2)
            rightGrid=rightGrid.sort(sortFun)
            console.log('righr')
            console.log(rightGrid)
            //左侧回填
            leftGrid.reduce((acc, cur, idx, src)=>{
              let x = cur.now_storage_code[cur.now_storage_code.length-2]*1
              let c = cur.son_storage_code[0]*1
              let r = cur.son_storage_code[1]*1
              let sty = `grid-column:${x}/${(x+1)};grid-row:${acc}/${acc+r};`
              this.gridData.push({column: 0, row: 0, position: idx, sty: sty})
              return acc + r
            }, leftGrid[0].now_storage_code[leftGrid[0].now_storage_code.length-1]*1)
            //右侧回填
            rightGrid.reduce((acc, cur, idx, src)=>{
              let x = cur.now_storage_code[cur.now_storage_code.length-2]*1
              let c = cur.son_storage_code[0]*1
              let r = cur.son_storage_code[1]*1
              let sty = `grid-column:${x}/${(x+1)};grid-row:${acc}/${acc+r};`
              this.gridData.push({column: x, row: acc, position: acc, sty: sty})
              return acc + r
            }, rightGrid[0].now_storage_code[rightGrid[0].now_storage_code.length-1]*1)

          } else {
            this.$message({type: 'warning', message: response.data.msg});
          }
        }).catch(error=>{
          console.log(error)
        })


        // this.form.account_code = data.account_code
        // this.form.account =  data.account;
        // this.form.username = data.username;
        // this.form.sex = data.sex;
        // this.form.create_time = data.create_time;
        // this.form.phone_number = data.phone_number;
        // this.form.password = data.password;
        // this.form.email = data.email;
        // this.form.description = data.description;
        // this.form.forbid_status = data.forbid_status;
        // this.addNow = false
      },
    }
  }
</script>

<style scoped>
    /*popover中的按钮*/
    .type-choose-btn {
        margin-top: 5px;
    }

    .add-locker-main {
        margin-right: 50px;
        border: 1px solid #dcdfe6;
        padding: 20px;
        border-radius: 4px;
        display: grid;
        width: 30vw;
        height: 60vh;
        /*设置网格规格*/
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;

        /*grid-template-areas: "one one"*/
        /*". ."*/
        /*"tow tow"*/
        /*"three three"*/
        /*". ."*/
        /*"four four";*/

        /*指定网格线的大小*/
        grid-column-gap: 5px;
        grid-row-gap: 5px;

    }

    .add-locker-btn{
        position: relative;
        grid-area: one;
        grid-column: 1 / 2;
        grid-row: 1 / 2;
        background-color: red;
    }

    .big-locker-form {
        border: 1px solid #dcdfe6;
        padding: 20px;
        border-radius: 4px;
        width: 30vw;
    }

    /*设置 添加 图标的样式*/
    .el-icon-plus {
        font-size: 30px;
        color: white;
    }

    .addIcon {
        position: absolute;
        top: 50%;
        left: 46%;
        transform: translateY(-46%);
    }

    /*新添加 格子 样式*/
    .new-grid{
        background-color: #2a2929;
        text-align: center;
        font-size: 22px;
        font-weight: bold;
        color: white;
        /*grid-column: 1/2;*/
        /*grid-row: 3/5;*/
    }

</style>