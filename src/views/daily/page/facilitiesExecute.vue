<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>设施设备检查记录</span>
            </div>
            <div class="content">
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
                                    label="待完成"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已完成"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="未完成"
                                    name="3"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button>编辑</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
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
                        label: '检查执行记录编号',
                        prop: 'code',
                        width: 'auto'
                    },
                    {
                        label: '分类名称',
                        prop: 'categoryName',
                        width: 'auto'
                    },
                    {
                        label: '设施/设备名称',
                        prop: 'facilitiesName',
                        width: 'auto'
                    },
                    {
                        label: '检查人姓名',
                        prop: 'examinerName',
                        width: 'auto'
                    },
                    {
                        label: '检查人联系方式',
                        prop: 'examinerTel',
                        width: 'auto'
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '待完成'
                                    break
                                case 2:
                                    return '已完成'
                                    break
                                case 3:
                                    return '未完成'
                                    break
                            }
                        }
                    },
                    {
                        label: '设施/设备情况',
                        prop: 'situation',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '正常'
                                    break
                                case 2:
                                    return '异常'
                                    break
                            }
                        }
                    },{
                        label: '设施/设备检查报告',
                        prop: 'detail',
                        width: 'auto'
                    },
                    {
                        label: '设施/设备实际检查时间',
                        prop: 'checkDate',
                        width: 'auto'
                    },
                ],
                table_data: [],
                url: 'facilitiesPlanExecuteList',
                search_item: [
                    {
                        type: 'select',
                        label: '类型',
                        placeholder: '请输入',
                        prop: 'type',
                        options:[
                            {
                                value:1,
                                label:'设施'
                            },
                            {
                                value:2,
                                label:'设备'
                            },
                        ]
                    },
                    {
                        type: 'Input',
                        label: '检查执行记录编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '设施/设备名称',
                        placeholder: '请输入',
                        prop: 'facilitiesName'
                    },
                    {
                        type: 'Input',
                        label: '检查人联系方式',
                        placeholder: '请输入',
                        prop: 'tel'
                    },
                    {
                        type: 'select',
                        label: '任务状态',
                        placeholder: '请选择',
                        prop: 'status',
                        options:[
                            {
                                value:1,
                                label:'待完成'
                            },
                            {
                                value:2,
                                label:'已完成'
                            },
                            {
                                value:3,
                                label:'未完成'
                            },
                        ]
                    },

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
    },
}
</script>