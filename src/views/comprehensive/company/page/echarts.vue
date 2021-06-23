<template>
    <div>
        <el-container>
            <el-aside width="541px">
                <div class="todoList">
                    <todoList></todoList>
                </div>
            </el-aside>
            <el-container>
                <el-header height="400px">
                    <LastMonthCost></LastMonthCost>
                </el-header>
                <el-main>
                    <div class="mainCard">
                        <div>
                            <div class="task">
                                <Task></Task>
                            </div>
                            <div class="inspect">inspect</div>
                        </div>
                        <div class="attend">attend</div>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import {
    findTodayEnvironmentalHealth,
    findInspectionRecord
} from '@/api/company'
import  LastMonthCost from '@/views/comprehensive/company/components/echarts/LastMonthPayCostDetail.vue'
import todoList  from '@/views/comprehensive/company/components/echarts/todoList.vue'
import Task  from '@/views/comprehensive/company/components/echarts/task.vue'
export default {
    components: {
        todoList,
        LastMonthCost,
        Task
    },
    name: 'hello',
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped>
</style>