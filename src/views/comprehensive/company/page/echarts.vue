<template>
    <div>
        <el-container>
            <el-aside width="541px">
                <div class="todoList">
                    <todoList></todoList>
                    <div>
    <el-radio-group v-model="form.radio1">
      <el-radio-button label="2">这是二</el-radio-button>
      <el-radio-button label="3">这是三</el-radio-button>
      <el-radio-button label="4">这是四</el-radio-button>
    </el-radio-group>
  </div>
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
        return {
            form:{
                radio1: '4'
            }
        }
    },
    methods: {}
}
</script>

<style scoped>
</style>