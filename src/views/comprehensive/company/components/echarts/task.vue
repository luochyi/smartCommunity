<template>
    <div class="card">
        <el-card class="box-card">
            <div class="tasktitle">今日环境卫生任务情况</div>
            <el-row>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="12"
                            ><div class="task">
                                绿化任务{{ greenTask.greenTaskTotal }}
                            </div></el-col
                        >
                        <el-col :span="12"
                            ><div class="tasklist">
                                <ul>
                                    <li>
                                        待处理{{ greenTask.greenTaskPending }}
                                    </li>
                                    <li>
                                        未完成{{
                                            greenTask.greenTaskUnFinished
                                        }}
                                    </li>
                                    <li>
                                        已完成{{ greenTask.greenTaskCompleted }}
                                    </li>
                                </ul>
                            </div></el-col
                        >
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-col :span="12"
                            ><div class="task">
                                卫生任务{{ hygieneTask.hygieneTaskTotal }}
                            </div></el-col
                        >
                        <el-col :span="12"
                            ><div class="tasklist">
                                <ul>
                                    <li>
                                        待处理{{
                                            hygieneTask.hygieneTaskPending
                                        }}
                                    </li>
                                    <li>
                                        未完成{{
                                            hygieneTask.hygieneTaskUnFinished
                                        }}
                                    </li>
                                    <li>
                                        已完成{{
                                            hygieneTask.hygieneTaskCompleted
                                        }}
                                    </li>
                                </ul>
                            </div></el-col
                        >
                    </el-row>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import { findTodayEnvironmentalHealth } from '@/api/company'
export default {
    data() {
        return {
            greenTask: {
                greenTaskTotal: null,
                greenTaskPending: null,
                greenTaskCompleted: null,
                greenTaskUnFinished: null
            },
            hygieneTask: {
                hygieneTaskTotal: null,
                hygieneTaskPending: null,
                hygieneTaskCompleted: null,
                hygieneTaskUnFinished: null
            }
        }
    },
    mounted() {
        this.getData()
    },
    methods: {
        getData() {
            findTodayEnvironmentalHealth().then((res) => {
                console.log(res.data)
                this.greenTask.greenTaskTotal = res.data.greenTaskTotal
                this.greenTask.greenTaskPending = res.data.greenTaskPending
                this.greenTask.greenTaskCompleted = res.data.greenTaskCompleted
                this.greenTask.greenTaskUnFinished =
                    res.data.greenTaskUnFinished
                this.hygieneTask.hygieneTaskTotal = res.data.hygieneTaskTotal
                this.hygieneTask.hygieneTaskPending =
                    res.data.hygieneTaskPending
                this.hygieneTask.hygieneTaskCompleted =
                    res.data.hygieneTaskCompleted
                this.hygieneTask.hygieneTaskUnFinished =
                    res.data.hygieneTaskUnFinished
            })
        }
    }
}
</script>

<style scoped>
.box-card {
    width: 542px;
    height: 201px;
}
.tasktitle {
    font-weight: 800;
    font-size: 22px;
    margin-bottom: 30px;
    color: #333333;
}
.task {
    height: 100px;
}
</style>