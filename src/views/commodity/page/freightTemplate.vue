<template>
  <div>
    <div class="box">
      <div class="box_box">
        <div class="box-body">
          <div class="main-titel">
            <span>运费模板</span>
          </div>
          <div class="content">
            <div class="">
              <div class="item">
                <div class="title">
                  <div class="line"></div>
                  <span>一单多商品运费计算规则</span>
                </div>
                <div style="padding:20px">
                  <el-radio-group v-model="radio" size="mini">
                    <el-radio class="init-radio" label="1"
                      >按最高商品运费规则</el-radio
                    >
                    <el-radio label="2">所有商品运费叠加</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div>
                  <span>运费模板</span>
                  <div class="btn_right">
                    <el-button class="init-button" size="small"
                      >添加模板</el-button
                    >
                  </div>
                </div>
                <div style="padding:20px">
                  <div class="yfmk">
                    <p
                      class="yfmk_titel"
                      style="
                                            
                      font-weight: 500;
                      color: #333333;"
                    >
                      全国包邮(默认)
                      <span class="yfmk_span">默认模板</span>
                    </p>
                    <p>发货地区：全国 <span>建议模板不支持修改时间</span></p>
                  </div>
                  <div class="yfmk_end">
                    <span
                      style="
                      font-family: PingFangSC-Regular, PingFang SC; 
                      font-size: 14px;
                      font-weight: 500;
                      color: #333333;"
                      >浙江省</span
                    >
                    <div class="yfmk_end_btn">
                      <span>使用中</span>
                    </div>
                    <div class="yfmk_end_txt">
                      <p>
                        发货地区：浙江省 最后修改时间：2020-08-11 10:15:11
                      </p>
                      <div class="btn_right">
                        <el-button type="init-button2" size="small" plain
                          >删除</el-button
                        >
                        <el-button type="init-button2" size="small" plain
                          >修改</el-button
                        >
                      </div>
                    </div>
                    <div style="padding-top:20px;margin-bottom:200px;">
                      <tableData
                        :config="table_config"
                        @clickrow="tableRow"
                      ></tableData>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      radio: '1',
      table_row: {},
      paymentPreview: false,
      table_config: {
        thead: [
          { label: '运送地区', prop: 'table1', width: 'auto' },
          { label: '计算规则', prop: 'table2', width: 'auto' }
        ],
        table_data: [
          {
            table1: '默认',
            table2: '1KG以内，0元；每增加1KG，增加运费0元'
          },
          {
            table1:
              '内蒙古自治区，海南省，青海省，宁夏回族自治区，新疆维吾尔族自治区，西藏自治区',
            table2: '3KG以内，12元；每增加1KG，增加运费10元'
          }
        ]
      }
    }
  },
  methods: {
    tableRow(data) {
      this.table_row = data
    }
  }
}
</script>
<style scoped>
.box {
  /* 减去main的padding值 */
  width: calc(100% + 40px);
  position: relative;
  top: -20px;
  left: -20px;
  /* 减去头部距离 */
  height: calc(100vh - 80px);
}
.box-body {
  margin: 20px;
  margin-bottom: 17px;
  background: #fff;
  overflow: auto;
  height: calc(100vh - 140px);
}
.item {
  padding-bottom: 28px;
}
.title {
  position: relative;
  display: flex;
  align-items: center;
  padding-bottom: 26px;
}
.title span {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  padding: 5px;
  color: #333333;
  line-height: 22px;
}
.line {
  display: inline-block;
  width: 3px;
  height: 16px;
  margin-right: 10px;
  background: rgba(251, 71, 2, 1);
}
/* 按钮又定位 */
.btn_right {
  position: absolute;
  top: 0;
  right: 20px;
}
/* 运费模版第一块 */
.yfmk {
  height: 100px;
  line-height: 50px;
  border: 1px solid #f5f5f6;
  padding: 0 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
}
.yfmkp .yfmk_titel {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.yfmk_span {
  background: #f3f3f3;
  font-weight: 400;
  color: #666666;
  border-radius: 2px;
}
/* 运费模块最后一块 */
.yfmk_end {
  padding: 20px;
  margin-top: 20px;
  height: 264px;
  border: 1px solid #f5f5f6;
}
.yfmk_end_btn {
  cursor: pointer;
  margin-left: 20px;
  display: inline-block;
  text-align: center;
  height: 24px;
  line-height: 24px;
  background: #ffeae1;
  border-radius: 2px;
}
.yfmk_end_btn span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #fb4702;
}
.yfmk_end_txt {
  padding-top: 10px;
  position: relative;
}
.yfmk_end_txt p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
}
</style>
