<template>
    <div id="app">
        <el-card class="box-card" v-if="isShow">
            <div slot="header" class="clearfix">
                <span>火警警告</span>
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
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
        },
        open: function () {
            console.log('socket连接成功')
        },
        error: function () {
            console.log('连接错误')
        },
        getMessage: function (msg) {
            console.log(msg.data)
            this.alertMsg = msg.data
            this.isShow = true
        },
        send: function (data) {
            this.socket.send(data)
        },
        close: function () {
            console.log('socket已经关闭')
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
.clearfix{
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
