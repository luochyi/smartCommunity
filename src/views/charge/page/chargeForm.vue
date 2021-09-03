<template>
    
    <div class="costCard">
        <div class="main-titel">
                <span>财务报表</span>
            </div>
        <el-card class="box-card">
            <el-row>
                <el-col :span="8"
                    ><div class="lastMonthCost">
                        <!-- <el-card class="box-card" shadow="never"> -->
                        <div style="fontSize:22px;color:#333333;margin:10px;fontWeight:700">上月物业缴费情况</div>
                        <div class="lastmonthpay">
                            <div style="fontSize:16px;color:white;paddingTop:20px;paddingLeft:20px">上月已缴金额（元）</div>
                            <div class="price">{{ LastMonthPayCost.lastMonthPayPrice }}</div>
                        </div>
                        <ul class="lastmonthul">
                            <li style="borderColor:#5B8FF9">未缴累计金额（元）<span class="costtips">{{LastMonthPayCost.lastMonthUnpaidPrice}}</span></li>
                            <li style="borderColor:#FFD203">应缴纳费用（元）<span class="costtips">{{LastMonthPayCost.lastMonthShouldPayPrice}}</span></li>
                            <li style="borderColor:#FB4702">未缴累计户数（户）<span class="costtips">{{LastMonthPayCost.lastMonthUnpaidHouseholds}}</span></li>
                        </ul>
                        <!-- </el-card> -->
                    </div></el-col
                >
                <el-col :span="16"
                    ><div
                        id="myChart"
                        :style="{
                            width: '629px',
                            height: '350px'
                        }"
                    ></div
                ></el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import {
    findLastMonthPayCostDetail,
    findPaymentStatistics
} from '@/api/company'
export default {
    data() {
        return {
            LastMonthPayCost: {
                lastMonthPayPrice: null, //上月已缴
                lastMonthUnpaidPrice: null, //上月未交
                lastMonthShouldPayPrice: null, //上月应缴
                lastMonthUnpaidHouseholds: null //上月未缴费住户数
            },
            month: [], //月份
            shouldPayPrice: [], //shouldPayPrice应缴纳
            payPrice: [] //payPrice已缴纳
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            console.log(this.month)
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption(
                {
                    title: {
                        text: '半年内物业缴费统计',
                        link: 'http://localhost:3333/?#/company/orgManagement'
                    },
                    tooltip: {},
                    color: ['#7BB0FF', '#FFD27B'],
                    legend: {
                        y: 'top',
                        data: ['应缴纳费用', '实际缴纳费用']
                    },
                    xAxis: {
                        type: 'category',
                        axisTick: {
                            show: false //隐藏刻度线
                        },
                        axisLine: {
                            //隐藏y轴
                            show: false
                        },
                        axisLabel: {
                            //横坐标全部显示 不隔开显示
                            interval: 0
                        },
                        data: this.month
                    },
                    yAxis: {
                        nameTextStyle: {
                            padding: [0, 0, 0, 30] // 四个数字分别为上右下左与原位置距离
                        },
                        splitArea: {
                            //隐藏背景网格区域
                            show: false
                        },
                        splitLine: {
                            //隐藏背景网格线
                            show: false
                        },
                        axisTick: {
                            show: false //隐藏刻度线
                        },
                        axisLine: {
                            //隐藏y轴
                            show: false
                        }
                    },
                    series: [
                        {
                            name: '应缴纳费用',
                            type: 'bar', //柱状图bar 饼状图pie 折线图line
                            data: this.shouldPayPrice
                        },
                        {
                            name: '实际缴纳费用',
                            type: 'bar', //柱状图bar 饼状图pie 折线图line
                            data: this.payPrice
                        }
                    ]
                },
                true
            )
        },
        getData() {
            findLastMonthPayCostDetail().then((res) => {
                console.log(res.data)
                this.LastMonthPayCost.lastMonthPayPrice =
                    res.data.lastMonthPayPrice
                this.LastMonthPayCost.lastMonthUnpaidPrice =
                    res.data.lastMonthUnpaidPrice
                this.LastMonthPayCost.lastMonthShouldPayPrice =
                    res.data.lastMonthShouldPayPrice
                this.LastMonthPayCost.lastMonthUnpaidHouseholds =
                    res.data.lastMonthUnpaidHouseholds
            })
            findPaymentStatistics().then((res) => {
                console.log(res.data)
                //months payPrice已缴纳 shouldPayPrice应缴纳 years
                res.data.forEach((element) => {
                    this.payPrice.push(element.payPrice)
                    this.shouldPayPrice.push(element.shouldPayPrice)
                    let obj = element.years + '年' + element.months + '月'
                    this.month.push(obj)
                })
                console.log(this.shouldPayPrice)
                this.drawLine()
            })
        }
    }
}
</script>

<style scoped>
.costCard{
    margin:20px
}
.lastmonthpay{
    width: 309px;
    height: 106px;
    line-height: 33px;
    background:url(../../../assets/images/company/MaskGroup.png) REPEAT;
    mix-blend-mode: multiply;
}
.price{
    font-size: 30px;
    color: #ffffff;
    font-weight: 700;
    padding-left:20px ;
}
.lastmonthul{
    margin-top:30px ;
}
.lastmonthul li{
    margin-top:20px ;
    font-size: 16px;
    color: #7D94AE;
    padding-left:10px;
    border-left:8px solid;
    position: relative;
}
.costtips{
    font-weight: 700;
    font-size: 20px;
    color: #333333;
    position: absolute;
    right: 50px;
}
</style>>