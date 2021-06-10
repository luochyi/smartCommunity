<template>
    <div id="app">
        <el-card class="box-card" v-if="isShow">
            <div slot="header" class="clearfix">
                <span>警告</span>
                <el-button
                    style="float: right; padding: 3px 0"
                    type="text"
                    @click="closeCard()"
                    >关闭</el-button
                >
            </div>
            <div class="text">{{ alertMsg }}</div>
        </el-card>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            path: 'wss://test.kaidalai.cn/websocket/admin',
            socket: '',
            lockReconnect: false, //是否真正建立连接
            timeout: 40 * 1000, //40秒一次心跳
            timeoutObj: null, //心跳心跳倒计时
            serverTimeoutObj: null, //心跳倒计时
            timeoutnum: null, //断开 重连倒计时
            alertMsg: '',
            isShow: false
        }
    },
    mounted() {
        // 初始化
        this.init()
    },
    components: {},
    methods: {
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
            if (msg.data == '心跳正常') {
                console.log(msg)
            } else {
                // console.log(msg);
                this.alertMsg = msg.data
                this.isShow = false
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
    left: 45%;
    top: 40%;
    width: 600px;
    height: 400px;
    background-color: red;
}
.text {
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    align-items: center;
}
</style>
