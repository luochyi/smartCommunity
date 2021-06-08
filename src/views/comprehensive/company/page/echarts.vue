<template>
    <div>
        <div id="myChart" :style="{ width: '500px', height: '500px' }"></div>
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
                xAxis: {
                    type: 'category',
                    data: this.xData
                },
                yAxis: {},
                series: [
                    {
                        name: '销量',
                        type: 'bar',//柱状图bar 饼状图pie 折线图line
                        data: this.yData
                    }
                ]
            })
        }
    }
}
</script>

<style>
</style>