<template>
    <div>
        <div class="main-content">
            <el-container>
                <el-aside width="541px">
                    <div class="todoList">todoList</div>
                </el-aside>
                <el-container>
                    <el-header height="400px">
                        <div class="costCard">
                            <el-card class="box-card">
                                <el-row>
                                    <el-col :span="8"
                                        ><div class="lastMonthCost"></div
                                    ></el-col>
                                    <el-col :span="16"
                                        ><div
                                            id="myChart"
                                            :style="{
                                                width: '629px',
                                                height: '254px'
                                            }"
                                        ></div
                                    ></el-col>
                                </el-row>
                            </el-card>
                        </div>
                    </el-header>
                    <el-main>
                        <div class="mainCard">
                            <div>
                                <div class="task">task</div>
                                <div class="inspect">inspect</div>
                            </div>
                            <div class="attend">attend</div>
                        </div>
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script>
import {
    findLastMonthPayCostDetail,
    findPaymentStatistics,
    findTodayEnvironmentalHealth,
    findInspectionRecord
} from '@/api/company'
export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            LastMonthPayCost: {
                lastMonthPayPrice: null,
                lastMonthUnpaidPrice: null,
                lastMonthShouldPayPrice: null,
                lastMonthUnpaidHouseholds: null
            },
            xData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            yData: [5, 20, 36, 10, 10, 20]
        }
    },
    mounted() {
        this.drawLine(), this.getData()
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
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
                    data: this.xData
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
                        data: this.yData
                    },
                    {
                        name: '实际缴纳费用',
                        type: 'bar', //柱状图bar 饼状图pie 折线图line
                        data: this.yData
                    }
                ]
            })
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
        }
    }
}
</script>

<style scoped>
.todoList {
    width: 541px;
    height: 960px;
}
.costCard {
    width: 1107px;
    height: 390px;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
}
.lastMonthCost {
    width: 200px;
    height: 320px;
    /* background-color: forestgreen; */
}
.mainCard {
    height: 542px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
.task {
    width: 542px;
    height: 201px;
}
.inspect {
    width: 542px;
    height: 321px;
    margin-top: 20px;
}
.attend {
    width: 542px;
    height: 546px;
    margin-top: 20px;
}
</style>