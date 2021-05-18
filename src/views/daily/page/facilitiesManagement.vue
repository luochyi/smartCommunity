<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>设施设备管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增设施/设备</el-button
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
                                    label="空置中"
                                    name="1"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="使用中"
                                    name="2"
                                ></el-tab-pane>
                                <el-tab-pane
                                    label="已停用"
                                    name="3"
                                ></el-tab-pane>
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button>编辑</button> -->
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增设施/设备"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">基本信息</template>
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
                                    <template v-slot:facilitiesCategoryId>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm
                                                    .facilitiesCategoryId
                                            "
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
import { facilitiesManageInsert, facilitiesCategoryList } from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            options: [],
            addForm: {
                ruleForm: {
                    name: null,
                    code: '',
                    facilitiesCategoryId: null,
                    address: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '设施名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '设施编号',
                        disabled: true,
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'code'
                    },
                    {
                        type: 'Slot',
                        label: '设施类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'facilitiesCategoryId',
                        slotName: 'facilitiesCategoryId'
                    },
                    {
                        type: 'Input',
                        label: '设施地址',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'address'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '设施编号', prop: 'code', width: 'auto' },
                    {
                        label: '设施类型',
                        prop: 'facilitiesCategoryName',
                        width: 'auto'
                    },
                    { label: '设施名称', prop: 'name', width: 'auto' },
                    { label: '添加人', prop: 'createName', width: 'auto' },
                    {
                        label: '设施状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop){
                            switch (row.status) {
                                case 1:
                                    return '空置中'
                                    break
                                case 2:
                                    return '使用中'
                                    break
                                case 3:
                                    return '已停用'
                                    break
                            }
                        }
                    },
                    { label: '添加时间', prop: 'createDate', width: '220' }
                ],
                table_data: [],
                url: 'facilitiesManageList',
                search_item: [
                    {
                        type: 'Input',
                        label: '设施编号',
                        placeholder: '请输入',
                        prop: 'code'
                    },
                    // {
                    //     type: 'Slot',
                    //     label: '设施种类',
                    //     placeholder: '请选择',
                    //     prop: 'facilitiesCategoryName',
                    //     slotName: 'facilitiesCategoryName'
                    // },
                    {
                        type: 'Input',
                        label: '设施名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'select',
                        label: '设施状态',
                        placeholder: '请选择',
                        value: null,
                        options: [
                            { value: 1, label: '空置中' },
                            { value: 2, label: '使用中' },
                            { value: 3, label: '已停用' }
                        ],
                        prop: 'status'
                    },
                    {
                        type: 'picker',
                        label: '添加时间',
                        placeholder: '请输入',
                        prop: 'date',
                        startDate: 'createStartDate',
                        endDate: 'createEndDate',
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
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
                name: val
            }
            this.loading = true
            facilitiesCategoryList(reeData).then((res) => {
                // console.log(res)
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
            let random = Math.floor(Math.random() * 100000000)
            this.addForm.ruleForm.code = random
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            // this.add_vrisible = false
            /**
       * 
       *  code	       :null, 设施分类编号	是	[string]		
        2	name	       :null,   设施分类名称	是	[string]		
        3	openStartDate:null,	      开放开始时间	是	[datetime]	"3:41:44"	查看
        4	openEndDate	 :null,     开放结束时间	是	[datetime]	"21:41:44"	查看
        5	imgUrls:null,
       * 
       * **/
            let resData = {
                ...this.addForm.ruleForm
                // code: this.addForm.ruleForm.code,
                // name: this.addForm.ruleForm.name,
                // openStartDate: this.openStartDate,
                // openEndDate:  this.openEndDate,
                // imgUrls:this.addForm.ruleForm.imgUrls,
            }
            facilitiesManageInsert(resData).then((res) => {
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
