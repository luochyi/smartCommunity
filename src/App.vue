<template>
    <div id="app">
        <el-card class="box-card" v-if="isShow">
            <div>
                <span
                    style="
                        top: 10px;
                        right: 20px;
                        position: absolute;
                        fontsize: 20px;
                        color: #999999;
                        cursor: pointer;
                    "
                    @click="closeCard"
                    >X</span
                >
                <div>
                    <img :src="imgSrc" alt="" />
                </div>
                <div class="title">{{ title }}</div>
                <div class="tips">{{ tips }}</div>
                <div class="text">{{ alertMsg }}</div>
            </div>
        </el-card>
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
export default {
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true,
            path: 'wss://hmxc.kaidalai.cn/websocket/web/admin',
            socket: '',
            lockReconnect: false, //是否真正建立连接
            timeout: 40 * 1000, //40秒一次心跳
            timeoutObj: null, //心跳心跳倒计时
            serverTimeoutObj: null, //心跳倒计时
            timeoutnum: null, //断开 重连倒计时
            alertMsg: '',
            isShow: false,
            title: '',
            tips: '',
            imgSrc: null
        }
    },
    mounted() {
        // 初始化
        this.init()
        // console.log('1')
        //         var a = '{\"alarmNo\":\"3025\",\"alarmType\":\"X\",\"deviceName\":\"测试\",\"deviceNo\":\"3025\",\"time\":\"2021-08-10 15:13:49\",\"type\":1}'
        //         a = a.replace('\\', '')
        //         console.log(JSON.parse(a))
    },
    components: {},
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        },
        init: function () {
            if (typeof WebSocket === 'undefined') {
                alert('您的浏览器不支持socket')
            } else {
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.onopen
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
        },
        reconnect() {
            //重新连接
            var that = this
            if (that.lockReconnect) {
                return
            }
            that.lockReconnect = true
            //没连接上会一直重连，设置延迟避免请求过多
            that.timeoutnum && clearTimeout(that.timeoutnum)
            that.timeoutnum = setTimeout(function () {
                //新连接
                that.init()
                that.lockReconnect = false
            }, 5000)
        },
        reset() {
            //重置心跳
            var that = this
            //清除时间
            clearTimeout(that.timeoutObj)
            clearTimeout(that.serverTimeoutObj)
            //重启心跳
            that.start()
        },
        start() {
            //开启心跳
            console.log('开启心跳')
            var self = this
            self.timeoutObj && clearTimeout(self.timeoutObj)
            self.serverTimeoutObj && clearTimeout(self.serverTimeoutObj)
            self.timeoutObj = setTimeout(function () {
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                if (self.socket.readyState == 1) {
                    //如果连接正常
                    self.socket.send('heartbeat') //这里可以自己跟后端约定
                } else {
                    //否则重连
                    self.reconnect()
                }
                self.serverTimeoutObj = setTimeout(function () {
                    //超时关闭
                    self.socket.close()
                }, self.timeout)
            }, self.timeout)
        },
        onopen() {
            console.log('open')
            //开启心跳
            this.start()
        },
        error: function () {
            console.log('连接错误')
        },
        getMessage: function (msg) {
            if (msg.data === '心跳正常') {
                // this.isShow = true
                console.log(msg)
                // console.log('1')
                // var a = '{\"alarmNo\":\"3025\",\"alarmType\":\"X\",\"deviceName\":\"测试\",\"deviceNo\":\"3025\",\"time\":\"2021-08-10 15:13:49\",\"type\":1}'
                // a = a.replace('\\', '')
                // console.log(JSON.parse(a))
            } else {
                console.log(msg)
                //判断不同的报警内容
                let mes = JSON.parse(msg.data.replace('\\', ''))
                console.log('mes')
                console.log(mes)
                if (mes.type === 1) {
                    this.title = '火灾报警'
                    this.tips = '各单位注意：'
                    this.imgSrc = require('./assets/images/sos.png')
                    this.alertMsg = '于'+mes.time+',小区内'+mes.deviceName+'附近出现了火灾报警，请各位业主、租户保持镇静，不要慌乱，有序开始撤离！'
                } else if (mes.type === 2) {
                    this.title = '设备故障'
                    this.tips = '请注意：'
                    this.imgSrc = require('./assets/images/warning.png')
                    this.alertMsg = '于'+mes.time+',小区内'+mes.deviceName+'发生了报警，请物业人员尽快前往现场排查故障！'
                } else if (mes.type === 3) {
                    this.title = '人员报警'
                    this.tips = '请注意：'
                    this.imgSrc = require('./assets/images/todoList.png')
                    this.alertMsg = '于'+mes.alarmNo+'的'+mes.deviceNo+'使用了一键报警功能！'
                } else if (mes.type === 4) {
                    this.title = '跌倒报警'
                    this.tips = '请注意：'
                    this.imgSrc = require('./assets/images/todoList.png')
                    this.alertMsg = '有住户'+mes.userName+'发生跌倒情况，请及时上门或联系人员前往查看，住户联系方式：'+mes.tel+'如未能联系到住户，可择情报警。最后一次位置:'+mes.address+',经度：'+mes.lon+',纬度：'+mes.lat
                }
                this.isShow = true
            }

            this.reset()
        },
        send: function (data) {
            this.socket.send(data)
        },
        close: function () {
            console.log('socket已经关闭')
            this.reconnect()
        },
        closeCard: function () {
            this.isShow = false
        }
    },
    destroyed() {
        // 销毁监听
        this.socket.onclose = this.close
    }
}
</script>
<style scoped>
#app {
    height: 100%;
    overflow: hidden;
}
.clearfix {
    font-size: 20px;
}
.box-card {
    z-index: 999999;
    position: fixed;
    left: 35%;
    top: 30%;
    width: 460px;
    height: 400px;
}
.text {
    font-size: 18px;
    line-height: 21px;
    color: #333333;
    margin: 15px;
}
.tips {
    color: #000000;
    font-size: 18px;
    line-height: 21px;
    margin-top: 15px;
}
.title {
    font-weight: 600;
    color: #000000;
    font-size: 22px;
    line-height: 30.6px;
    margin-left: 155px;
    margin-top: 15px;
}
img {
    width: 116px;
    height: 116px;
    margin-left: 145px;
    margin-top: 30px;
}
</style>
