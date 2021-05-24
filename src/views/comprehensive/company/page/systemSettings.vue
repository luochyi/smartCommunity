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
                    ><el-button @click="go"> 网络安全 </el-button>
                    <el-table
                        :data="tableData"
                        height="800"
                        border
                        style="width: 100%"
                    >
                        <el-table-column prop="index" label="序号" width="180">
                        </el-table-column>
                        <el-table-column prop="name" label="设置" width="220">
                        </el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button
                                    @click="handleClick(scope.row)"
                                    type="text"
                                    size="small"
                                    >查看</el-button
                                >
                                <el-switch
                                    v-model="scope.row.value"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949"
                                >
                                </el-switch>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-main>
            </el-container>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    index: '1',
                    name: '字体大小',
                    value: true
                },
                {
                    index: '2',
                    name: '夜间模式',
                    value: true
                },
                {
                    index: '3',
                    name: '繁简切换',
                    value: true
                },
                {
                    index: '4',
                    name: '报警提示',
                    value: true
                },
                {
                    index: '5',
                    name: '静音',
                    value: false
                },
                {
                    index: '6',
                    name: '智能模式',
                    value: true
                },
                {
                    index: '8',
                    name: '字体加粗',
                    value: false
                }
            ]
        }
    },
    methods:{
        go(){
            window.open('https://yundun.console.aliyun.com/?spm=a2c4g.11186623.2.6.a3d36db3ujQ449&p=cfwnext&accounttraceid=1e5a78659ff549d69976951dbe6b6c2apdru#/security/access/internet/inbound')
        }
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