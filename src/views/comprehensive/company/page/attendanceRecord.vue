<template>
    <div class="main-content">
        <div class="main-titel">
            <span>考勤记录</span>
        </div>
        <div class="content">
            <div style="margin-top: 15px">
                <el-input
                    placeholder="请输入内容"
                    v-model="input3"
                    class="input-with-select"
                >
                    <el-select
                        v-model="select"
                        slot="prepend"
                        placeholder="姓名"
                    >
                        <el-option label="姓名" value="1"></el-option>
                        <el-option label="日期" value="2"></el-option>
                        <el-option label="状态" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <template>
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    max-height="700"
                >
                    <el-table-column fixed prop="index" label="序号" width="80">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" width="120">
                    </el-table-column>
                    <el-table-column prop="date" label="考勤日期" width="320">
                    </el-table-column>
                    <el-table-column prop="record" label="打卡记录" width="320">
                    </el-table-column>
                     <el-table-column prop="hour" label="工作时长" width="220">
                    </el-table-column>
                     <el-table-column prop="status" label="状态" width="220">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                        <template slot-scope="scope">
                            <el-button
                                @click.native.prevent="
                                    deleteRow(scope.$index, tableData)
                                "
                                type="text"
                                size="small"
                            >
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input1: '',
            input2: '',
            input3: '',
            select: '',
            tableData: [
                {
                    index:1,
                    name:'王强',
                    date:'2021-2-1',
                    record:'8:30-17:30',
                    hour:'9.0',
                    status:'正常'
                },
                {
                    index:2,
                    name:'马子博',
                    date:'2021-2-1',
                    record:'8:30-17:30',
                    hour:'9.0',
                    status:'正常'
                },
                {
                    index:3,
                    name:'刘晨晨',
                    date:'2021-2-1',
                    record:'8:30-17:30',
                    hour:'9.0',
                    status:'正常'
                },
                {
                    index:4,
                    name:'王强',
                    date:'2021-2-2',
                    record:'8:30-17:30',
                    hour:'9.0',
                    status:'正常'
                },
                {
                    index:5,
                    name:'马子博',
                    date:'2021-2-2',
                    record:'-',
                    hour:'0.0',
                    status:'请假'
                },
                {
                    index:6,
                    name:'陈诺',
                    date:'2021-2-4',
                    record:'12:00-17:30',
                    hour:'5.0',
                    status:'补打卡'
                },
                {
                    index:7,
                    name:'王强',
                    date:'2021-2-4',
                    record:'8:30-17:30',
                    hour:'9.0',
                    status:'正常'
                },
                {
                    index:8,
                    name:'王强',
                    date:'2021-2-5',
                    record:'8:30-17:30',
                    hour:'9.0',
                    status:'正常'
                },
                {
                    index:9,
                    name:'王强',
                    date:'2021-2-6',
                    record:'8:30-17:30',
                    hour:'9.0',
                    status:'正常'
                },
                {
                    index:10,
                    name:'马子博',
                    date:'2021-2-7',
                    record:'8:30-17:30',
                    hour:'9.0',
                    status:'正常'
                },
                
            ]
        }
    },
    methods: {
        deleteRow(index, rows) {
            rows.splice(index, 1)
        }
    }
}
</script>
<style>
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>