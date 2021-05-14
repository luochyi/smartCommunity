<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>巡检路线</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增路线</el-button
                    >
                </div>

                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <!-- <template slot="tabs">
              <el-tabs v-model="activeName"
                       @tab-click="handleClick">
                <el-tab-pane label="全部"
                             name="0"></el-tab-pane>
              </el-tabs>
            </template> -->
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="isEnable(table_row)">启用/停用</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增路线"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">路线信息</template>
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
                                    <template v-slot:inspectionPonitId>
                                        <Button @click="addInt">添加</Button>
                                        <div
                                            v-for="(
                                                item, index
                                            ) in inspectionArr"
                                            :key="index"
                                        >
                                            <el-select
                                                v-model="item.inspectionPointId"
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
import { inspectionRouteInsert,inspectionPointList,inspectionRouteIsEnable} from '@/api/daily'
export default {
    data() {
        return {
            inspectionArr: [
                {
                    inspectionPointId: null
                }
            ],
            options: [],
            add_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    name: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '巡检路线编号',
                        width: '50%',
                        prop: 'code',
                        disabled:true
                    },
                    {
                        type: 'Input',
                        label: '路线名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'textarea',
                        label: '描述',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'describes'
                    },
                    {
                        type: 'Select',
                        label: '状态',
                        placeholder: '请选择',
                        width: '100%',
                        options: [
                            { label: '启用', value: '1' },
                            { label: '停用', value: '2' }
                        ],
                        prop: 'status'
                    },
                    {
                        type: 'Input',
                        label: '持续时间（分钟）',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'spaceTime'
                    },
                    {
                        type: 'Slot',
                        label: '巡检点',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'pointRouteList',
                        slotName: 'inspectionPonitId'
                    },
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
                        label: '持续时间（分钟）',
                        prop: 'spaceTime',
                        width: 'auto'
                    },
                    { label: '创建时间', prop: 'createDate', width: 'auto' },
                    { label: '状态', prop: 'status', width: 'auto' ,type:'function',
                        callback(row,prop){
                            switch (row.status) {
                                case 1:
                                    return '启用'
                                    break;
                                case 2:
                                    return '停用'
                                    break;
                            }
                        }
                    }
                ],
                table_data: [],
                url: 'inspectionRouteList',
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
            this.inspectionArr.push({
                inspectionPointId: null
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
            inspectionPointList(reeData).then((res) => {
                console.log(res)
                this.options = res.tableList
                this.loading = false
            })
            console.log(this.inspectionArr);
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
            let random = Math.floor(Math.random() * 100000000)
            this.addForm.ruleForm.code = random
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.inspectionArr= [
                {
                    inspectionPointId: null
                }
            ]
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm,
                pointRouteList:this.inspectionArr
                // code: this.addForm.ruleForm.code,
                // name: this.addForm.ruleForm.name,
                // openStartDate: this.openStartDate,
                // openEndDate:  this.openEndDate,
                // imgUrls:this.addForm.ruleForm.imgUrls,
            }
            inspectionRouteInsert(resData).then((res) => {
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
        },
        isEnable(data) {
            console.log(data[0].id);
            if (data.length > 1) {
                this.$message.error('只能操作一条数据')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            }else{
                inspectionRouteIsEnable({id:data[0].id}).then((res) => {
                     console.log(res)
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.addClose()
                }
            })
            }
        }
    }
}
</script>
