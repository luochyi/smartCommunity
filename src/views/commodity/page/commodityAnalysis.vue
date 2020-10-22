<template>
  <div>
    <div class="box-body">
      <div class="main-titel">
        <span>商品分析</span>
      </div>
      <div class="body1">
        <div class="title">
          <div class="line"></div><span>销售数据</span>
        </div>
        <div class="box">
          <div class="item">
            <div class='item_content'>
              <div>
                <p>¥1,3781.00</p>
                <span>本周已完成</span>
              </div>
              <div>
                <p>¥1,0120.87</p>
                <span>上周已完成</span>
              </div>
            </div>
            <div class="item_footer">
              <span>周销售额</span>
            </div>
          </div>
          <div class="item">
            <div class='item_content'>
              <div>
                <p>¥10,3781.00</p>
                <span>本月已完成</span>
              </div>
              <div>
                <p>¥8,4123.77</p>
                <span>上月已完成</span>
              </div>
            </div>
            <div class="item_footer">
              <span>月销售额</span>
            </div>
          </div>
          <div class="item"
               style="border:none">
            <div class='item_content'>
              <div>
                <p>¥1238,417.34</p>
                <span>本年已完成</span>
              </div>

            </div>
            <div class="item_footer">
              <span>年销售额</span>
            </div>
          </div>
        </div>

      </div>
      <div>
        <div class="body2">
          <div class="title">
            <div class="line"></div><span>核心指标监控</span>
          </div>
          <div class='echarts_box'>
            <div class="item-left">
              <div class="">

              </div>
            </div>
            <div class="item-right">
              <div class="echarts_init"
                   ref="chart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const echarts = require('echarts');
export default {
  data () {
    return {};
  },
  methods: {
    initCharts () {
      let myChart = echarts.init(this.$refs.chart);
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            animation: false,
            label: {
              backgroundColor: '#505765'
            }
          }
        },
        legend: {
          data: ['支付买家数量', '支付件数', '支付金额']
        },
        grid: {
          left: '6%',
          right: '6%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['8/1', '8/3', '8/5', '8/7', '8/9', '8/11', '8/13', '8/15', '8/17', '8/19', '8/21', '8/23', '8/25', '8/27', '8/29', '8/31']
        },
        legend: {
          data: ['支付买家数量/支付件数', '支付金额'],
          left: 10
        },
        yAxis: [
          {
            name: '支付买家数量/支付件数',
            type: 'value',
            max: 30
          },
          {
            name: '支付金额',
            nameLocation: 'start',
            max: 30,
            type: 'value',
            inverse: true
          }
        ],
        dataZoom: [
          {
            show: true,
            realtime: true,
            start: 65,
            end: 85
          },
          {
            type: 'inside',
            realtime: true,
            start: 65,
            end: 85
          }
        ],
        series: [
          {
            name: '支付买家数量',
            yAxisIndex: 1,
            type: 'line',
            stack: '总量1',
            data: [10, 13, 9, 15, 19, 18, 17, 16, 21, 22, 23, 25, 28, 24, 20, 16],
          },
          {
            name: '支付件数',
            type: 'line',
            stack: '总量2',
            data: [22, 16, 21, 18, 12, 12, 23, 19, 19, 27, 29, 23, 16, 19, 24, 19],
          },
          {
            name: '支付金额',
            type: 'line',
            stack: '总量3',
            data: [24, 15, 23, 10, 26, 22, 22, 28, 22, 29, 20, 23, 23, 9, 17, 15],
          }
        ]
      });
    }
  },
  mounted () {
    this.initCharts();
  }
}
</script>

<style scoped>
.box {
  display: flex;
  justify-content: space-between;
}
.item {
  width: 30%;
  border-right: 1px solid #eeeeee;
  text-align: center;
}
.item_content {
  display: flex;
  width: 100%;
  justify-content: space-around;
}
.item .item_content p {
  margin-bottom: 20px;
  font-size: 24px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #333333;
}
.item span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.item_footer {
  margin-top: 50px;
}
.box-body {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 100px;
}
.body1 {
  height: 278px;
  border: 1px solid #f5f5f6;
  box-sizing: border-box;
  padding: 20px;
  margin-top: 20px;
}
.title {
  display: flex;
  align-items: center;
  padding-bottom: 26px;
}
.title span {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
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
.body2 {
  height: 633px;
  border: 1px solid #f5f5f6;
  padding: 20px;
  margin-top: 20px;
}
.echarts_box {
  display: flex;
  justify-content: space-between;
}
/* .item-left {
  width: 18%;
} */
.item-right {
  width: 100%;
}
.item-right .echarts_init {
  width: 100%;
  height: 450px;
}
</style>
