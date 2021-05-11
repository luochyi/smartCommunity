<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>巡检计划</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增计划</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="tabs">
                            <el-tabs
                                v-model="activeName"
                                @tab-click="handleClick"
                            >
                                <el-tab-pane
                                    label="全部"
                                    name="0"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="待巡检"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已巡检"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已完成"
                                    name="3"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button>编辑</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增计划"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <!-- Slot -->
                                    <template v-slot:date>
                                        <el-time-picker
                                            is-range
                                            v-model="addDate"
                                            range-separator="至"
                                            @change="dateTimeChange"
                                            value-format="HH:MM:SS"
                                            start-placeholder="开始时间"
                                            end-placeholder="结束时间"
                                            placeholder="选择时间范围"
                                        >
                                        </el-time-picker>
                                    </template>

                                    
                                    <template v-slot:inspectionRouteId>
                                        <Button @click="addInt">添加</Button>
                                        <div
                                            v-for="(
                                                item, index
                                            ) in inspectionArr"
                                            :key="index"
                                        >
                                            <el-select
                                                v-model="item.id"
                                                :remote-method="remoteMethod"
                                                @change="change"
                                                @focus="sefocus"
                                                :loading="loading"
                                                remote
                                                style="width: 240px"
                                                filterable
                                                placeholder="请选择"
                                            >
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.id"
                                                    :label="item.name"
                                                    :value="item.id"
                                                >
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <!-- <el-select v-model="addForm.ruleForm.inspectionRouteId"
                                 :remote-method='remoteMethod'
                                 @change='change'
                                 @focus='sefocus'
                                 :loading="loading"
                                 remote
                                 style="width:240px"
                                 filterable
                                 placeholder="请选择">
                        <el-option v-for="item in options"
                                   :key="item.id"
                                   :label="item.name"
                                   :value="item.id">
                        </el-option>
                      </el-select> -->
                                    </template>
                                </VueForm>
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-orange" @click="addSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="addClose">
                            <span>取消</span>
                        </button>
                    </div>
                </Drawer>
            </div>
        </div>
    </div>
</template>

<script>
import { inspectionPlanInsert, inspectionRouteList } from '@/api/butler'
export default {
    data() {
        return {
            inspectionArr: [
                {
                    id: null
                }
            ],
            add_vrisible: false,
            addDate: null,
            options: [],
            loading: false,
            addForm: {
                ruleForm: {
                    name: null,
                    code: '2332423',
                    facilitiesCategoryId: null,
                    address: null,
                    inspectionRouteId: null
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '路线',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'inspectionRouteId',
                        slotName: 'inspectionRouteId'
                    },

                    // {
                    //   type: 'Input',
                    //   label: '路线编号',
                    //   disabled: true,
                    //   width: '50%',
                    //   prop: 'uuid'
                    // },
                    {
                        type: 'Input',
                        label: '计划名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Select',
                        label: '部门',
                        placeholder: '请选择',
                        width: '100%',
                        options: [],
                        prop: 'organizationId'
                    },
                    {
                        type: 'Input',
                        label: '巡检人',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'inspector'
                    },
                    {
                        type: 'Slot',
                        label: '开始时间',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'planBeginDate',
                        slotName: 'date'
                    },
                    {
                        type: 'Select',
                        label: '按顺序巡检',
                        width: '100%',
                        options: [
                            {
                                value: '1',
                                label: '是'
                            },
                            {
                                value: '2',
                                label: '否'
                            }
                        ],
                        prop: 'isSort'
                    },
                    {
                        type: 'Select',
                        label: '检查频率',
                        width: '100%',
                        options: [
                            {
                                value: '1',
                                label: '每天'
                            },
                            {
                                value: '2',
                                label: '每周'
                            },
                            {
                                value: '3',
                                label: '每月'
                            }
                        ],
                        prop: 'checkRateType'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '编号',
                        prop: 'code',
                        width: 'auto'
                    },
                    {
                        label: '路线编号',
                        prop: 'routeCode',
                        width: 'auto'
                    },
                    {
                        label: '计划名称',
                        prop: 'name',
                        width: 'auto'
                    },
                    {
                        label: '计划开始时间',
                        prop: 'planBeginDate',
                        width: 'auto'
                    },
                    {
                        label: '实际开始时间',
                        prop: 'actualBeginDate',
                        width: 'auto'
                    },
                    {
                        label: '部门',
                        prop: 'organizationName',
                        width: 'auto'
                    },
                    {
                        label: '巡检人',
                        prop: 'inspectorName',
                        width: 'auto'
                    },
                    {
                        label: '计划状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '启用'
                                    break
                                case 2:
                                    return '停用'
                                    break
                            }
                        }
                    }
                ],
                table_data: [],
                url: 'inspectionPlanList',
                search_item: [
                    {
                        type: 'Input',
                        label: '编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'select',
                        label: '路线',
                        placeholder: '请选择',
                        options: [],
                        prop: 'inspectionRouteId'
                    },
                    {
                        type: 'select',
                        label: '巡检点状态',
                        placeholder: '请选择',
                        options: [],
                        prop: 'status'
                    },
                    {
                        type: 'picker',
                        label: '计划时间',
                        prop: 'date',
                        startDate: 'planBeginDateStart',
                        endDate: 'planBeginDateEnd',
                        width: '280px'
                    },
                    {
                        type: 'picker',
                        label: '实际时间',
                        prop: 'actualDate',
                        startDate: 'actualBeginDateStart',
                        endDate: 'actualBeginDateEnd',
                        width: '280px'
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
    created() {
        this.getUserList()
    },
    methods: {
        addInt() {
            // inspectionArr: [{
            //         name: null
            //     }],
            this.inspectionArr.push({
                id: null
            })
        },

        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
                name: val
            }
            this.loading = true
            inspectionRouteList(reeData).then((res) => {
                console.log(res)
                this.options = res.tableList
                this.loading = false
            })
        },
        remoteMethod(val) {
            this.getUserList(val)
        },
        sefocus() {
            this.getUserList()
        },
        change(value) {
            console.log(value)
        },
        add() {
            this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            console.log(this.inspectionArr)
            let resData = {
                ...this.addForm.ruleForm
                // code: this.addForm.ruleForm.code,
                // name: this.addForm.ruleForm.name,
                // openStartDate: this.openStartDate,
                // openEndDate:  this.openEndDate,
                // imgUrls:this.addForm.ruleForm.imgUrls,
            }
            inspectionPlanInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.addClose()
                }
            })
        },
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
        },
        // tabs切换
        handleClick(tab, event) {
            let status = null
            if (this.activeName != 0) {
                status = this.activeName
            } else {
                status = null
            }
            const requestData = {
                pageNum: 1,
                size: 10,
                status: status
            }
            this.$refs.table.requestData(requestData)
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