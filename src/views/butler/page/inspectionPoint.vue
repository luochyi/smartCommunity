<style scoped>
.demo-dynamic {
    justify-content: left;
}
</style>
<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>巡检点</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增巡检点</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="tabs">
                            <el-tabs v-model="activeName">
                                <el-tab-pane
                                    label="全部"
                                    name="0"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增巡检点"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">巡检点信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <!-- 检查项 -->
                                    <template v-slot:itemsList>
                                        <Button @click="addInt">添加</Button>
                                        <div
                                            v-for="(
                                                item, index
                                            ) in inspectionArr"
                                            :key="index"
                                        >
                                            <el-input
                                                v-model="item.id"
                                                placeholder="请输入内容"
                                                size="small"
                                            ></el-input>
                                        </div>
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
import { inspectionPointInsert } from '@/api/butler'
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
            addForm: {
                ruleForm: {
                    name: null,
                    code: '',
                    type: '1',
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '编号',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '巡检模式',
                        disabled: true,
                        width: '100%',
                        prop: 'type'
                    },
                    {
                        type: 'Slot',
                        label: '检查项',
                        width: '50%',
                        prop: 'itemsList',
                        slotName: 'itemsList'
                    }
                ]
            },
            table_row: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '编号', prop: 'code', width: 'auto' },
                    { label: '名称', prop: 'name', width: 'auto' },
                    {
                        label: '巡检模式',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.type == 1) {
                                return '扫码'
                            }
                        }
                    },
                    { label: '创建时间', prop: 'createDate', width: 'auto' }
                ],
                table_data: [],
                url: 'inspectionPointList',
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
                    }
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },
    methods: {
        addInt() {
            this.inspectionArr.push({
                id: null
            })
        },
        add() {
            this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            // if (this.dynamicValidateForm.domains.length == 0) {
            //     return
            // } else {
            //     while (this.dynamicValidateForm.domains.length > 1) {
            //         this.dynamicValidateForm.domains.splice(0, 1)
            //         // 关闭抽屉清空检查项
            //     }
            // }
        },
        addSubmit() {
            console.log(this.addForm)
            console.log(this.inspectionArr);
            let resData = {
                ...this.addForm.ruleForm,
                itemsList:this.inspectionArr
            }
            inspectionPointInsert(resData).then((res) => {
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
