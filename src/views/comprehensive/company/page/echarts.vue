<template>
    <div>
        <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
    </div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
            xData: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            yData: [5, 20, 36, 10, 10, 20]
        }
    },
    mounted() {
        this.drawLine()
    },
    methods: {
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '标题',
                    link: 'http://localhost:3333/?#/company/orgManagement'
                },
                tooltip: {},
                color: ['#64C7BF', '#73A0FA'],
                legend: {
                    y: 'top',
                    data: ['销量', '销量2']
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
                        name: '销量1',
                        type: 'bar', //柱状图bar 饼状图pie 折线图line
                        data: this.yData
                        // markPoint: {
                        //     data: [
                        //         {
                        //             type: 'max',
                        //             name: '最大'
                        //         },
                        //         {
                        //             type: 'min',
                        //             name: '最小'
                        //         }
                        //     ]
                        // }
                    },
                    {
                        name: '销量2',
                        type: 'bar', //柱状图bar 饼状图pie 折线图line
                        data: this.yData
                        // markPoint: {
                        //     data: [
                        //         {
                        //             type: 'max',
                        //             name: '最大'
                        //         },
                        //         {
                        //             type: 'min',
                        //             name: '最小'
                        //         }
                        //     ]
                        // }
                    }
                ]
            })
        }
    }
}
</script>

<style>
</style>