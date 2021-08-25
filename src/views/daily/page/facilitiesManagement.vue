<template>
    <div>
        <div class="main-content">
            <el-tabs v-model="activeName1">
                <el-tab-pane label="设施管理" name="first">
                    <div class="content">
                        <div class="content-btn">
                            <el-button
                                class="init-button"
                                @click="add()"
                                icon="el-icon-plus"
                                >新增设施</el-button
                            >
                        </div>
                        <div  style="width: 50px"><download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="设施管理.xls"
                            >
                                <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                                <el-button
                                    size="mini"
                                    icon="el-icon-folder-add"
                                    plain
                                    >导出Excel</el-button
                                >
                            </download-excel></div>
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
                                <template v-slot:doc="slotData">
                                    <div
                                        style="color: blue; cursor: pointer"
                                        v-if="slotData.data.fileDocUrl"
                                        @click="
                                            download(slotData.data.fileDocUrl)
                                        "
                                    >
                                        {{ slotData.data.fileDocName }}
                                    </div>
                                    <div v-else>无</div>
                                </template>
                                <template slot="footer">
                                    <div class="table-footer">
                                        <button @click="edit(table_row)">
                                            编辑
                                        </button>
                                        <button @click="del(table_row)">
                                            删除
                                        </button>
                                    </div>
                                </template>
                            </VueTable>
                        </div>
                        <!-- 新增 -->
                        <Drawer
                            :drawerTitle="drawerTitle"
                            @drawerClose="addClose"
                            :drawerVrisible="add_vrisible"
                        >
                            <div style="padding: 30px">
                                <FromCard>
                                    <template slot="title">基本信息</template>
                                    <template>
                                        <VueForm
                                            ref="addForm"
                                            :formObj="addForm"
                                        >
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
                                            <!-- 设施分类选择 -->
                                            <template
                                                v-slot:facilitiesCategoryId
                                            >
                                                <el-select
                                                    v-model="
                                                        addForm.ruleForm
                                                            .facilitiesCategoryId
                                                    "
                                                    :remote-method="
                                                        remoteMethod
                                                    "
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
                                            <!-- 上传文件 -->
                                            <template slot="fileDocUrl">
                                                <template>
                                                    <el-upload
                                                        :action="`${$baseUrl}upload/uploadFacilitiesDoc`"
                                                        :on-success="
                                                            fileSuccess
                                                        "
                                                        :on-remove="wordRemove"
                                                        :on-exceed="
                                                            handleExceed
                                                        "
                                                        :file-list="wordList"
                                                        accept=".doc,.DOC,.docx,.DOCX"
                                                        :limit="1"
                                                        :before-upload="
                                                            beforeFileUpload
                                                        "
                                                    >
                                                        <el-button
                                                            icon="el-icon-edit"
                                                            size="small"
                                                            >上传文件</el-button
                                                        >
                                                        <div
                                                            slot="tip"
                                                            class="el-upload__tip"
                                                        >
                                                            <span
                                                                >支持扩展名：doc,docx</span
                                                            >
                                                        </div>
                                                    </el-upload>
                                                </template>
                                            </template>
                                        </VueForm>
                                    </template>
                                </FromCard>
                            </div>
                            <div slot="footer">
                                <button class="btn-orange" @click="addSubmit()">
                                    <span>
                                        <i class="el-icon-circle-check"></i
                                        >提交</span
                                    >
                                </button>
                                <button class="btn-gray" @click="addClose">
                                    <span>取消</span>
                                </button>
                            </div>
                        </Drawer>
                    </div>
                </el-tab-pane>
                <!-- 设备管理组件 -->
                <el-tab-pane label="设备管理" name="second"
                    ><deviceManage></deviceManage>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { DownloadExcel } from '@/plugins/DownloadExcel'
import {
    facilitiesManageInsert,
    facilitiesCategoryList,
    facilitiesManageFindDetailById,
    facilitiesManageUpdate
} from '@/api/daily'
import deviceManage from './deviceManage.vue'
export default {
    components: {
        // 注册组件
        deviceManage
    },
    data() {
        return {
            add_vrisible: false,
            drawerTitle: '',
            addDate: null,
            activeName1: 'first',
            options: [],
            wordList: [],
            addForm: {
                ruleForm: {
                    name: null,
                    code: '',
                    facilitiesCategoryId: null,
                    address: null,
                    type: 1,
                    id: null,
                    fileDocUrl: null,
                    fileDocName: null,
                    brand: null,
                    procurementCosts: null,
                    purchasingManufacturer: null,
                    manufacturerPhone: null,
                    warrantyPeriodYears: null,
                    warrantyPeriodMonths: null,
                    validityStart: null,
                    validityEnd: null,
                    remakes:null
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
                        width: '50%',
                        prop: 'address'
                    },
                    {
                        type: 'Input',
                        label: '设施品牌',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'brand'
                    },
                    {
                        type: 'Input',
                        label: '采购费用',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'procurementCosts'
                    },
                    {
                        type: 'Input',
                        label: '采购厂家',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'purchasingManufacturer'
                    },
                    {
                        type: 'Input',
                        label: '厂家电话',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'manufacturerPhone'
                    },
                    {
                        type: 'Int',
                        label: '质保期限-年',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'warrantyPeriodYears'
                    },
                    {
                        type: 'Int',
                        label: '质保期限-月',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'warrantyPeriodMonths'
                    },
                    {
                        type: 'DateTime',
                        label: '设施有效期开始',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'validityStart'
                    },
                    {
                        type: 'DateTime',
                        label: '设施有效期结束',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'validityEnd'
                    },
                    {
                        type: 'Slot',
                        label: '上传文件',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'fileDocUrl',
                        slotName: 'fileDocUrl'
                    },
                    {
                        type: 'textarea',
                        label: '备注',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'remakes'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            json_fields: {
                设施编号: 'code',
                设施类型: 'facilitiesCategoryName',
                设施名称:'name',
                添加人:'createName',
                设施状态:{
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
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
                添加时间:'createDate',
                备注:'remakes'
            },
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
                        callback(row, prop) {
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
                    { label: '添加时间', prop: 'createDate', width: '220' },
                    { label: '设施品牌', prop: 'brand', width: '220' },
                    { label: '采购费用', prop: 'procurementCosts', width: '220' },
                    { label: '采购厂家', prop: 'purchasingManufacturer', width: '220' },
                    { label: '厂家电话', prop: 'manufacturerPhone', width: '220' },
                    { label: '质保期限-年', prop: 'warrantyPeriodYears', width: '220' },
                    { label: '质保期限-月', prop: 'warrantyPeriodMonths', width: '220' },
                    { label: '设施有效期开始', prop: 'validityStart', width: '220' },
                    { label: '设施有效期结束', prop: 'validityEnd', width: '220' },
                    {
                        label: 'doc，docx下载',
                        prop: 'fileDocUrl',
                        width: 'auto',
                        type: 'slot',
                        slotName: 'doc'
                    },
                    { label: '备注', prop: 'remakes', width: '220' }
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
                    size: 10,
                    type: 1
                }
            }
        }
    },
    created() {
        this.getUserList()
    },
    methods: {
         // Excel导出   type判断设施还是设备
        async fetchData() {
            let Excel = []
            let params = {
                url: 'facilitiesManageList',
                data: {
                    pageNum: 1,
                    size: 100,
                    type: 1
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
        //下载文件
        download(data) {
            this.$confirm('是否下载文件?', '下载提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '下载成功'
                    })
                    window.open(this.$ImgUrl + data)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下载'
                    })
                })
        },
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
                name: val,
                type: 1
            }
            this.loading = true
            facilitiesCategoryList(reeData).then((res) => {
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
        // 编辑
        edit(data) {
            if (data.length != 1) {
                this.$message({
                    message: '请选择一条数据进行编辑',
                    type: 'error'
                })
            } else {
                this.add_vrisible = true
                this.drawerTitle = '修改设施信息'
                facilitiesManageFindDetailById({ id: data[0].id }).then(
                    (res) => {
                        console.log(res)
                        this.addForm.ruleForm.name = res.data.detail.name
                        this.addForm.ruleForm.code = res.data.detail.code
                        this.addForm.ruleForm.facilitiesCategoryId =
                            res.data.detail.facilitiesCategoryId
                        this.addForm.ruleForm.address = res.data.detail.address
                        this.addForm.ruleForm.id = res.data.detail.id
                        this.addForm.ruleForm.fileDocUrl =
                            res.data.detail.fileDocUrl
                        this.addForm.ruleForm.remakes = res.data.detail.remakes
                        this.addForm.ruleForm.brand = res.data.detail.brand
                        this.addForm.ruleForm.procurementCosts = res.data.detail.procurementCosts
                        this.addForm.ruleForm.purchasingManufacturer = res.data.detail.purchasingManufacturer
                        this.addForm.ruleForm.manufacturerPhone = res.data.detail.manufacturerPhone
                        this.addForm.ruleForm.warrantyPeriodYears = res.data.detail.warrantyPeriodYears
                        this.addForm.ruleForm.warrantyPeriodMonths = res.data.detail.warrantyPeriodMonths
                        this.addForm.ruleForm.validityStart = res.data.detail.validityStart
                        this.addForm.ruleForm.validityEnd = res.data.detail.validityEnd
                        if (res.data.detail.fileDocUrl == null) {
                            this.wordList = []
                        } else {
                            let obj = {
                                name: res.data.detail.fileDocName,
                                url: res.data.detail.fileDocUrl
                            }
                            this.$set(this.wordList, '0', obj)
                        }
                    }
                )
            }
        },
        // 新增设施时随机生成编号
        add() {
            this.drawerTitle = '新增设施信息'
            this.add_vrisible = true
            let random = Math.floor(Math.random() * 100000000)
            this.addForm.ruleForm.code = random
        },
        // word 文件上传成功
        fileSuccess(res, file) {
            this.addForm.ruleForm.fileDocUrl = file.response.url
        },
        // word 文件上传限制提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        },
        wordRemove() {
            this.addForm.ruleForm.fileDocUrl = null
        },
        // word 文件上传之前
        beforeFileUpload(file) {
            console.log(file)
            this.addForm.ruleForm.fileDocName = file.name
            const isLt2M = file.size / 1024 / 1024 < 2
            const fileType =
                file.name.endsWith('.doc') || file.name.endsWith('.docx')
            console.log(fileType)
            if (!fileType) {
                this.$message.error('上传头像图片只能是 doc/docx 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 2MB!')
            }
            return fileType && isLt2M
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.wordList = []
        },
        // 提交表单
        addSubmit() {
            // 判断是修改的表单还是新增，修改要传主键id
            if (this.drawerTitle == '修改设施信息') {
                let resData = {
                    ...this.addForm.ruleForm,
                    id: this.addForm.ruleForm.id
                }
                facilitiesManageUpdate(resData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                        this.addClose()
                    }
                })
            } else {
                let resData = {
                    ...this.addForm.ruleForm
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
            }
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
