<template>
    <div>
        <el-card class="box-card">
            <el-container>
                <el-header
                    ><div class="main-titel" style="border-bottom: none">
                        <span>系统设置</span>
                    </div></el-header
                >
                <el-main
                    ><el-button @click="go" size="mini"> 网络安全 </el-button>
                </el-main>
                <div class="tbtb">
                    <tr>
                        <td  :style="{fontWeight:$store.state.fontWeight,}">序号</td>
                        <td :style="{fontWeight:$store.state.fontWeight,}">功能</td>
                        <td :style="{fontWeight:$store.state.fontWeight,}">设置</td>
                    </tr>
                    <!-- <tr>
                        <td>1</td>
                        <td>字体大小</td>
                        <td>
                            <el-switch
                                v-model="value1"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="changeSize"
                            >
                            </el-switch>
                        </td>
                    </tr> -->
                    <tr>
                        <td :style="{fontWeight:$store.state.fontWeight,}">1</td>
                        <td :style="{fontWeight:$store.state.fontWeight,}">导航栏颜色切换</td>
                        <td>
                            <el-button @click="$store.commit('changeColor')"  type="primary">
                                切换颜色
                            </el-button>
                        </td>
                    </tr>
                     <tr>
                        <td :style="{fontWeight:$store.state.fontWeight,}">2</td>
                        <td :style="{fontWeight:$store.state.fontWeight,}">表单字体加粗</td>
                        <td>
                            <el-button @click="$store.commit('changeFont')"  type="primary">
                                字体加粗设置
                            </el-button>
                        </td>
                    </tr>
                     <!-- <tr>
                        <td>2</td>
                        <td>表单字体大小</td>
                        <td>
                            <el-button @click="$store.commit('changeFont')"  type="primary">
                                字体颜色设置
                            </el-button>
                        </td>
                    </tr> -->
                </div>
            </el-container>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'
export default {
    data() {
        return {
        }
    },
    methods: {
        go() {
            window.open(
                'https://yundun.console.aliyun.com/?spm=a2c4g.11186623.2.6.a3d36db3ujQ449&p=cfwnext&accounttraceid=1e5a78659ff549d69976951dbe6b6c2apdru#/security/access/internet/inbound'
            )
        },
    }
}
</script>

<style scoped>
.main-titel {
    border-bottom: 1px solid gray;
}
.text {
    font-size: 14px;
}
.tbtb tr td {
    width: 170px;
    height: 80px;
    border: 1px solid #feeeed;
    font-size: 20px;
    line-height: 80px;
    text-align: center;
}
.item {
    margin-bottom: 18px;
}
.clearfix span {
    font-size: 20px;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: '';
}
.clearfix:after {
    clear: both;
}

.box-card {
    width: 98%;
    height: 870px;
}
</style>