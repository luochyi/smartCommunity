<template>
    <div class="main-content">
        <div class="main-titel">
            <span>收费标准管理</span>
        </div>
        <div class="content_box">
            <div class="left">
                <div class="left_title">
                    <div>
                        <span>费用版本名称</span>
                    </div>
                    <div class="left_icon">
                        <span @click="addCost">
                            <i class="el-icon-plus"></i
                        ></span>
                        <span @click="deleteCost">
                            <i class="el-icon-delete"></i
                        ></span>
                    </div>
                </div>
                <ul>
                    <li
                        :class="costActive === index ? 'active' : ''"
                        v-for="(item, index) in costList"
                        @click="tableChange(index, item.id, item.name)"
                        :key="item.id"
                    >
                        <el-input
                            v-model="item.name"
                            @blur="
                                (e) =>
                                    editInputBlur(e, item.name, item.id, index)
                            "
                            @focus="(e) => editInputFocus(e, item.name)"
                            v-focus
                            v-if="item.editBool"
                            style="flex: 1"
                            size="small"
                        ></el-input>
                        <span v-else>{{ item.name }}</span>
                        <!--   @click.stop="editType(index)" -->
                        <span
                            ><i
                                class="el-icon-edit"
                                @click.stop="editType(index)"
                            ></i
                        ></span>
                    </li>
                </ul>
            </div>
            <div class="right">
                <div class="right_title">
                    <span style="padding-right: 18px">是否启用</span>
                    <el-switch
                        :value="IsEnable"
                        @change="switchChange"
                        active-text="开"
                        inactive-text="关"
                        class="switchStyle"
                        active-color="rgba(251, 71, 2, 1)"
                    >
                    </el-switch>
                </div>
                <div class="right_input">
                    <div class="content-btn">
                        <el-input
                            placeholder="请输入收费项目"
                            size="small"
                            style="width: 240px; padding-right: 24px"
                            prefix-icon="el-icon-search"
                            v-model="input2"
                        >
                        </el-input>
                        <el-button class="init-button" @click="add()"
                            >添加费用</el-button
                        >
                        <el-button class="init-button" @click="edit(table_row)"
                            >编辑费用</el-button
                        >
                        <el-button class="init-button" @click="del(table_row)"
                            >删除费用</el-button
                        >

                        <div style="margin-left: 16px; display: inline-block">
                            <download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="收费标准管理.xls"
                            >
                                <el-button class="init-button" size="small"
                                    >导出Excel</el-button
                                >
                            </download-excel>
                        </div>
                    </div>
                </div>
                <div class="right_table">
                    <el-button @click="enable(table_row)" size='small' style="margin-left:10px"  type="primary">物业收费标准明细启用/禁用</el-button>
                    <VueTable ref="table"
                    :config='config'
                    @tableCheck="tableCheck">
                     
          </VueTable>
                    <!-- <tableData :config="config" @clickrow="tableCheck">
                    </tableData> -->
                   
                </div>
            </div>
            <!-- 费用明细增加修改 -->
            <Drawer
                :drawerTitle="costTitle"
                @drawerClose="costClose"
                :drawerVrisible="cost_vrisible"
            >
                <div style="padding: 30px">
                    <FromCard>
                        <template slot="title">基本信息</template>
                        <template>
                            <VueForm
                                ref="costVueForm"
                                @ruleSuccess="costRuleSubmit"
                                :formObj="costForm"
                            ></VueForm>
                        </template>
                    </FromCard>
                </div>
                <div slot="footer">
                    <button class="btn-orange" @click="costSubmit()">
                        <span> <i class="el-icon-circle-check"></i>提交</span>
                    </button>
                    <button class="btn-gray" @click="costClose">
                        <span>取消</span>
                    </button>
                </div>
            </Drawer>
        </div>
    </div>
</template>
<script>
import {
    chargesTemplateList,
    chargesTemplateIsEnable,
    chargesTemplateDetailList,
    chargesTemplateUpdate,
    chargesTemplateDetailDelete,
    userResidentFindAllBySearch,
    chargesTemplateDetailInsert,
    chargesTemplateDetailUpdate,
    chargesTemplateInsert,
    chargesTemplateDelete,
    chargesTemplateDetailFindById,
    chargesTemplateDetailIsEnable
} from '@/api/charge'
import { DownloadExcel } from '@/plugins/DownloadExcel'

export default {
    data() {
        return {
            // 添加点击确认后弹出抽屉
            cost_vrisible: false,
            costTitle: '新增费用项目',
            // 侧边栏费用版本
            costList: [],
            // 获得焦点后 记录当前值  修改时值不变不请求服务器
            typeListName: '',
            // 侧边栏当前选择
            costActive: 0,
            // 费用明细修改添加
            costForm: {
                ruleForm: {
                    typeName: null,
                    name: null,
                    unitPrice: null,
                    type: null,
                    marker: null,
                    otherFee: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '费用版本',
                        placeholder: '请输入',
                        disabled: true,
                        width: '100%',
                        prop: 'typeName'
                    },
                    // 标记符【费用类型名称】（1.物业管理费，2.维修费（报事报修 唯一）,3.装修押金（装修押金 唯一），4.活动报名费）

                    {
                        type: 'Select',
                        label: '费用类型',
                        placeholder: '请输入',
                        options: [
                            { label: '物业管理费', value: 1 },
                            { label: '维修费', value: 2 },
                            { label: '装修押金', value: 3 },
                            { label: '活动报名费', value: 4 },
                            { label: '日常费用', value: 5 },
                            { label: '停车费', value: 6 },
                            { label: '有偿服务费', value: 7 }
                        ],
                        width: '100%',
                        prop: 'marker'
                    },
                    // marker
                    {
                        type: 'Input',
                        label: '费用项目名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '单价',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'unitPrice'
                    },
                    // 1.元/月 平方米，2.元/ 立方米，3.元/ 次
                    {
                        type: 'Select',
                        label: '单位',
                        placeholder: '请选择单位',
                        prop: 'type',
                        width: '100%',
                        options: [
                            { label: '元/月 平方米', value: 1 },
                            { label: '元/ 立方米', value: 2 },
                            { label: '元/ 次', value: 3 }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '附加费用',
                        placeholder: '请输入',
                        prop: 'otherFee',
                        width: '100%'
                    }
                ],
                rules: {
                    typeName: [{ required: true }],
                    marker: [
                        {
                            required: true,
                            message: '请输入费用项目名称',
                            trigger: 'blur'
                        }
                    ],
                    name: [
                        {
                            required: true,
                            message: '请选择费用类型',
                            trigger: 'change'
                        }
                    ],
                    unitPrice: [
                        {
                            required: true,
                            message: '请输入单价',
                            trigger: 'blur'
                        }
                    ],
                    type: [
                        {
                            required: true,
                            message: '请选择单位',
                            trigger: 'change'
                        }
                    ]
                    // otherFee: [{ required: true, message: '请输入固定费用', trigger: 'blur' }]
                }
            },
            IsEnable: false,
            input2: '',
            // 费用明细
            config: {
                data: {
                    pageNum: 1,
                    size: 10,
                    chargesTemplateId:null
                },
                url:'chargesTemplateDetailList',
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '费用名称', prop: 'name', width: 'auto' },
                    {
                        label: '计费单价/单位',
                        prop: 'unitPrice',
                        width: 'auto'
                    },
                    {
                        label: '费用类型名称',
                        prop: 'marker',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.marker) {
                                case 1:
                                    return '物业管理费'
                                    break
                                case 2:
                                    return '维修费'
                                    break
                                case 3:
                                    return '装修押金'
                                    break
                                case 4:
                                    return '活动报名费'
                                    break
                                case 5:
                                    return '日常费用'
                                    break
                                case 6:
                                    return '停车费'
                                    break
                                case 7:
                                    return '有偿服务费'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '物业收费标准明细状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 0:
                                    return '未启用'
                                    break
                                case 1:
                                    return '启用'
                                    break
                            }
                        }
                    },
                    { label: '创建人', prop: 'createName', width: 'auto' },
                    { label: '更新日期', prop: 'modifyDate', width: 'auto' }
                ],
                table_data: [],
                loading: true
            },
            json_fields: {
                费用名称: 'name',
                '计费单价/单位': 'unitPrice',
                费用类型名称:{
                    field: 'marker',
                    callback: (value) => {
                        switch (value) {
                            case 1:
                                    return '物业管理费'
                                    break
                                case 2:
                                    return '维修费'
                                    break
                                case 3:
                                    return '装修押金'
                                    break
                                case 4:
                                    return '活动报名费'
                                    break
                                case 5:
                                    return '日常费用'
                                    break
                                case 6:
                                    return '停车费'
                                    break
                                case 7:
                                    return '有偿服务费'
                                    break
                                default:
                                    break
                        }
                    }
                },
                物业收费标准明细状态:{
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
                            case 0:
                                    return '未启用'
                                    break
                                case 1:
                                    return '启用'
                                    break
                        }
                    }
                },
                '附加/固定费用': 'otherFee',
                创建人: 'createName',
                更新日期: 'modifyDate'
            },
            // 费用明细选中数据
            table_row: []
        }
    },
    directives: {
        // 注册一个局部的自定义指令 v-focus
        focus: {
            // 指令的定义
            inserted: function (el) {
                // 聚焦元素
                el.querySelector('input').focus()
            }
        }
    },
    mounted() {
        this.getCostType()
    },
    methods: {
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'chargesTemplateDetailList',
                data: {
                    pageNum: 1,
                    size: 100,
                    chargesTemplateId: this.costList[this.costActive].id
                }
            }
            const data = await DownloadExcel(params, this)
            return data
        },
        // Excel进度
        ExcelLoading(page, pageCount) {
            const Loading = this.$loading({
                lock: true,
                text: `正在导出Excel${page}`,
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            })
            Loading.text = `正在导出Excel  ${page}/${pageCount}`
            console.log(Loading.text)
        },
        // Excel导出结束
        finishDownload() {
            const Loading = this.$loading()
            Loading.close()
        },
        //enable
        enable(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '只能操作一条数据'
                })
            } else {
                chargesTemplateDetailIsEnable({ id: data[0].id }).then(
                    (res) => {
                        this.$message({
                            type: 'success',
                            message: res.message
                        })
                        this.GetTableData(this.costList[this.costActive].id)
                    }
                    
                )
               
            }
             this.GetTableData(this.costList[this.costActive].id)
        },
        // 禁用启用
        switchChange(e) {
            this.$confirm('是否确认修改该版本禁启用', '禁启用提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass: 'confirmButton',
                cancelButtonClass: 'cancelButton'
            })
                .then(() => {
                    chargesTemplateIsEnable({
                        id: this.costList[this.costActive].id
                    }).then((res) => {
                        console.log(res)
                        if (!res.status) return
                        this.$message({
                            type: 'success',
                            message: res.message
                        })
                        this.IsEnable = !this.IsEnable
                        this.getCostType()
                        // this.GetTableData(this.costList[this.costActive].id)
                    })
                })
                .catch((action) => {})
            // costActive
        },
        // 费用版本名称
        getCostType() {
            chargesTemplateList().then((res) => {
                console.log(res)
                this.costList = res
                this.costList.map((item) => {
                    this.$set(item, 'editBool', false)
                })
                if (this.costList[this.costActive].status) {
                    this.IsEnable = true
                } else {
                    this.IsEnable = false
                }
                // 费用版本名称对于明细
                this.GetTableData(this.costList[this.costActive].id)
            })
        },
        // 费用版本input显示隐藏
        editType(index) {
            this.$set(this.costList[index], 'editBool', true)
        },
        // 费用版本 input获取焦点时 获取name
        editInputFocus(e, name) {
            this.typeListName = name
        },
        // 费用版本修改 input 失去焦点焦点时 修改名称
        editInputBlur(e, name, id, index) {
            this.$set(this.costList[index], 'editBool', false)
            // 在修改时新值和旧值相同不请求后台
            if (this.typeListName === name) {
                return
            }
            // 内容为空  重新给当前输入赋旧值
            if (name === '') {
                this.costList[index].name = this.typeListName
                this.$message.error('内容不能为空')
                return
            }
            let resData = {
                id: id,
                name: name
            }
            chargesTemplateUpdate(resData).then((result) => {
                console.log(result)
            })
        },
        // tab 费用版本 侧边栏切换
        tableChange(index, ulId, name) {
            this.costActive = index
            this.getCostType()
        },
        // 获得版本对应费用明细
        GetTableData(id) {
            this.config.data.chargesTemplateId = id
            this.$refs.table.loadData()
()
        },
        // 删除费用版本名称
        deleteCost() {
            this.$confirm(
                '是否确认删除费用版本？删除不可恢复',
                '费用版本删除',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'confirmButton',
                    cancelButtonClass: 'cancelButton'
                }
            )
                .then(() => {
                    let resData = {
                        ids: [this.costList[this.costActive].id]
                    }
                    console.log(resData)
                    chargesTemplateDelete(resData).then((result) => {
                        if (result.status) {
                            this.$message({
                                type: 'success',
                                message: result.message
                            })
                            this.costActive = 0
                            this.getCostType()
                        }
                    })
                })
                .catch((action) => {})
        },
        // 添加费用版本名称
        addCost() {
            this.$prompt('请输入费用版本名称', '添加费用版本', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(({ value }) => {
                    if (!value) {
                        return
                    }
                    let resData = {
                        name: value
                    }
                    chargesTemplateInsert(resData).then((res) => {
                        if (res.status) {
                            this.$message({
                                type: 'success',
                                message: res.message
                            })
                            this.getCostType()
                        }
                    })
                    // this.drawer_vrisible = true
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                })
        },
        // 添加费用明细
        add() {
            this.cost_vrisible = true
            this.costForm.ruleForm.typeName = this.costList[
                this.costActive
            ].name
            console.log(this.costForm.ruleForm)
        },
        // 修改费用明细
        edit(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message.error('不能批量编辑')
                    return
                }
                let resData = {
                    id: data[0].id
                }
                chargesTemplateDetailFindById(resData).then((result) => {
                    console.log(result)
                    this.costForm.ruleForm.typeName = this.costList[
                        this.costActive
                    ].name
                    this.costEditId = result.byId.id
                    this.costForm.ruleForm.marker = result.byId.marker

                    // marker
                    this.costForm.ruleForm.name = result.byId.name
                    this.costForm.ruleForm.otherFee = result.byId.otherFee
                    this.costForm.ruleForm.type = result.byId.type
                    this.costForm.ruleForm.unitPrice = result.byId.unitPrice
                    this.cost_vrisible = true
                })
            } else {
                this.$message.error('请选择需要编辑的数据')
            }
        },
        // 添加修改费用明细验证通过
        costRuleSubmit() {
            let resData = {
                chargesTemplateId: this.costList[this.costActive].id,
                name: this.costForm.ruleForm.name,
                unitPrice: this.costForm.ruleForm.unitPrice,
                marker: 1,
                type: parseInt(this.costForm.ruleForm.type),
                otherFee: this.costForm.ruleForm.otherFee,
                additionalCostList: [{ cost: 1, name: '电器费用' }]
            }
            // id等于0 添加否则修改
            if (!this.costEditId) {
                chargesTemplateDetailInsert(resData).then((result) => {
                    this.$message({
                        type: 'success',
                        message: result.message
                    })
                    this.costClose()
                    this.GetTableData(this.costList[this.costActive].id)
                })
            } else {
                resData.id = this.costEditId
                chargesTemplateDetailUpdate(resData).then((result) => {
                    if (result.status) {
                        this.$message({
                            type: 'success',
                            message: result.message
                        })
                    }
                    this.costClose()
                    this.GetTableData(this.costList[this.costActive].id)
                })
            }
        },
        // 添加修改费用明细提交验证
        costSubmit() {
            this.$refs.costVueForm.submitForm()
        },
        // 添加修改费用明细关闭
        costClose() {
            this.cost_vrisible = false
            this.$refs.costVueForm.reset()
            this.costForm.ruleForm.typeName = null
            this.costEditId = null
            this.costForm.ruleForm.marker = null

            // marker
            this.costForm.ruleForm.name = null
            this.costForm.ruleForm.otherFee = null
            this.costForm.ruleForm.type = null
            this.costForm.ruleForm.unitPrice = null
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
                        let resData = {
                            ids: arr
                        }
                        chargesTemplateDetailDelete(resData).then((res) => {
                            if (!res.status) return
                            this.$message({
                                type: 'success',
                                message: res.message
                            })
                            this.GetTableData(this.costList[this.costActive].id)
                        })
                    })
                    .catch((action) => {})
            } else {
                this.$message.error('请选中需要删除的数据')
            }
        },
        tableCheck(arr) {
            this.table_row = arr
        }
    }
}
</script>
<style scoped lang='scss'>
.content_box {
    display: flex;
    min-height: 500px;
}
.left {
    width: 300px;
    border-right: 1px solid #d8d8d8;
}
.left_title {
    display: flex;
    justify-content: space-between;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    font-size: 16px;
    color: #333333;
}
.left_icon {
    font-size: 18px;
    cursor: pointer;
    display: inline-block;
    padding: 6px;
    &:hover {
        opacity: 0.8;
    }
}
.left_icon span {
    padding-left: 10px;
    color: #444444;
}
.left ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    // height: 48px;
    // line-height: 48px;
    i {
        font-size: 16px;
    }
}
.left ul li.active {
    background: #fff0ea;
    color: #fb4702;
}
.left ul li:hover {
    background: #fff0ea;
    color: #fb4702;
}
.left ul li span {
    padding: 20px;
}
.right {
    padding: 0px 20px;
    padding-bottom: 84px;
    width: calc(100% - 300px);
}
.right_title {
    height: 60px;
    line-height: 60px;
}
.right_input {
    height: 48px;
    line-height: 48px;
}
.right_table {
    margin-top: 20px;
    border: 1px solid #f5f5f6;
}
</style>
