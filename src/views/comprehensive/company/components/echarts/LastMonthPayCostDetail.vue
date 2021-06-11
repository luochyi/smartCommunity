<template>
    <div class="costCard">
        <el-card class="box-card">
            <el-row>
                <el-col :span="8"
                    ><div class="lastMonthCost">
                        <el-card class="box-card" shadow="never">
                            <div>上月物业缴费情况</div>
                            <div>上月已缴金额(万元)</div>
                            <div>{{ LastMonthPayCost.lastMonthPayPrice }}</div>
                        </el-card>
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
            console.log(this.month);
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
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
            },true)
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
                    let obj = element.years + '年' + element.months+'月'
                    this.month.push(obj)
                })
                console.log(this.shouldPayPrice)
                this.drawLine()
            })
            
        }
    }
}
</script>

<style>
</style>