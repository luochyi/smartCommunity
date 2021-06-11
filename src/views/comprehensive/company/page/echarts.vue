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
                            <div class="task">task</div>
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
export default {
    components: {
        LastMonthCost,
        todoList
    },
    name: 'hello',
    data() {
        return {}
    },
    methods: {}
}
</script>

<style scoped>
.todoList {
    width: 541px;
    height: 960px;
    margin-left:20px ;
}
.costCard {
    margin-top:20px ;
    width: 1107px;
    height: 390px;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
}
.lastMonthCost {
    width: 200px;
    height: 320px;
    /* background-color: forestgreen; */
}
.mainCard {
    height: 542px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top:20px ;
}
.task {
    width: 542px;
    height: 201px;
}
.inspect {
    width: 542px;
    height: 321px;
    margin-top: 20px;
}
.attend {
    width: 542px;
    height: 546px;
    margin-top: 20px;
}
</style>