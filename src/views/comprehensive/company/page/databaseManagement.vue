<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>数据库管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
          <el-button class="init-button"
                     @click="add()"
                     icon="el-icon-plus">新增数据库</el-button>
        </div>
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <!-- <template slot="tabs">
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
                        </template> -->
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="del(table_row)">删除</button>
                                <!-- <button @click="isEnable(table_row)">启用/停用</button> -->
                                <!-- <button @click="add(table_row)">编辑</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增字典信息"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">数据信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <!-- Slot -->
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
import {
    dataBaseInsert
}from '@/api/company'
// import func from 'vue-editor-bridge'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            options: [],
            sysOptions: [],
            loading: false,
            addForm: {
                ruleForm: {
                    functionType:null,
                    functionName:null,
                    fieldName:null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '功能大类名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'functionType'
                    },
                    {
                        type: 'Input',
                        label: '功能名',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'functionName'
                    },
                    {
                        type: 'textarea',
                        label: '字段名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'fieldName'
                    },
                ]
            },
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
                        width: 'auto',
                    },
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
        add() {
           this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm,
            }
            dataBaseInsert(resData).then((res) => {
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
        // handleClick(tab, event) {
        //     let status = null
        //     if (this.activeName != 0) {
        //         status = this.activeName
        //     } else {
        //         status = null
        //     }
        //     const requestData = {
        //         pageNum: 1,
        //         size: 10,
        //         status: status
        //     }
        //     this.$refs.table.requestData(requestData)
        // },

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
        },
    },
}
</script>