<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>数据库管理</span>
            </div>
            <div class="content">
                <div>
                    <div style="background: #f9f9f9; padding: 10px;">
                        <div style="marginBottom:10px">
                            <span style="color: #000000; fontweight: 600"
                                >年份</span
                            >
                            <span
                                v-for="(item, index) in yearchoose"
                                :key="index"
                                style="padding: 10px; cursor: pointer"
                                :class="{ choosed: changeRed == index }"
                                @click="chooseYears(item, index)"
                                >{{ item }}</span
                            >
                        </div>
                        <span style="color: #000000; fontweight: 600"
                            >月份</span
                        >
                        <span
                            v-for="(item, indexS) in bilchoose"
                            :key="indexS"
                            style="padding: 10px; cursor: pointer"
                            :class="{ choosed: changeRedS == indexS }"
                            @click="chooseMon(item, indexS)"
                            >{{ item + '月' }}</span
                        >
                        
                    </div>
                    <div>
                        <span style="padding:10px">
                            所属模块
                            <el-select size="mini" v-model="modules">
                                <el-option
                                    v-for="item in modulesOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                        <span style="padding:10px">
                            模块功能
                            <el-select size="mini" v-model="firstFunction">
                                <el-option
                                    v-for="item in firstFunctionOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                        <span style="padding:10px">
                            二级功能
                            <el-select size="mini" v-model="secondFunction">
                                <el-option
                                    v-for="item in secondFunctionOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </span>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button @click="del(table_row)">删除</button> -->
                                <!-- <button @click="isEnable(table_row)">启用/停用</button> -->
                                <!-- <button @click="add(table_row)">编辑</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dataBaseInsert } from '@/api/company'
// import func from 'vue-editor-bridge'
export default {
    data() {
        return {
            changeRed: -1,
            changeRedS:-1,
            bilchoose: ['全部', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            yearchoose: ['全部', 2021, 2022],

            modulesOptions:[
                {
                    label:"系统管理",
                    path:'/company',
                    children:[
                        {
                            label:"企业资料",
                            path:'/companyInfo'
                        },
                        {
                            label:"组织架构管理",
                            path:'/orgManagement'
                        },
                        {
                            label:"员工管理",
                            path:'/personnelManagement'
                        },
                        {
                            label:"薪资管理",
                            path:'/salaryManagement'
                        },
                        {
                            label:"员工合同",
                            path:'/contractManage'
                        },
                        {
                            label:"考勤管理",
                            path:'/contractManage'
                        },
                        {
                            label:"申请记录",
                            path:'/contractManage'
                        },
                        {
                            label:"考勤小组",
                            path:'/attendanceTeam'
                        },
                        {
                            label:"排班计划",
                            path:'/attendanceTeam'
                        },
                        {
                            label:"培训管理",
                            path:'/trainManage'
                        },
                        {
                            label:"功能权限管理",
                            path:'/functionAuthority'
                        },
                        {
                            label:"申请记录",
                            path:'/contractManage'
                        },
                        {
                            label:"考勤小组",
                            path:'/attendanceTeam'
                        },
                        {
                            label:"排班计划",
                            path:'/attendanceTeam'
                        },
                        {
                            label:"培训管理",
                            path:'/trainManage'
                        },
                        {
                            label:"功能权限管理",
                            path:'/functionAuthority'
                        },
                    ]
                },
                {
                    label:"日常管理",
                    value:2,
                    children:[]
                },
                {
                    label:"基础档案",
                    value:3,
                    children:[]
                },
                {
                    label:"收费管理",
                    value:4,
                    children:[]
                },
                {
                    label:"管家服务",
                    value:5,
                    children:[]
                },
                {
                    label:"运营管理",
                    value:6,
                    children:[]
                },
                {
                    label:"商品中心",
                    value:7,
                    children:[]
                },
            ],
            firstFunctionOptions:[],
            secondFunctionOptions:[],

            loading: false,
            table_row: [],
            activeName: '0',
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '所属功能大类名称',
                        prop: 'functionType',
                        width: '200'
                    },
                    {
                        label: '功能名',
                        prop: 'functionName',
                        width: '200'
                    },
                    {
                        label: '字段名',
                        prop: 'fieldName',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'dataBaseList',
                search_item: [
                    {
                        type: 'Input',
                        label: '功能大类名称',
                        placeholder: '请输入',
                        prop: 'functionType'
                    },
                    {
                        type: 'Input',
                        label: '功能名',
                        placeholder: '请输入',
                        prop: 'functionName'
                    }
                    // Slot
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },
    methods: {
        chooseYears(years, index) {
            this.changeRed = index
            console.log(years)
            if (years != '全部') {
                this.config.data.years = years
            } else {
                this.config.data.years = null
            }
        },
        chooseMon(mon, indexS) {
            this.changeRedS = indexS
            console.log(mon)
            if (mon != '全部') {
                this.config.data.months = mon
            } else {
                this.config.data.months = null
            }
        },
        // 表格选中
        tableCheck(data) {
            this.table_row = data
        },
        // 删除
        del(data) {
            if (data.length) {
                let arr = []
                for (let i = 0; i < this.table_row.length; i++) {
                    arr.push(this.table_row[i].id)
                }
                this.$confirm('是否确认删除？删除不可恢复', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'confirmButton',
                    cancelButtonClass: 'cancelButton'
                })
                    .then(() => {
                        this.$refs.table.tableDelete(arr)
                    })
                    .catch((action) => {})
            } else {
                this.$message.error('请选中需要删除的数据')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.choosed {
    color: #fb4702;
}
</style>