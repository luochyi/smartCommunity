<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>安全管理</span>
            </div>
                    <div class="content">
                        <div class="content-btn">
                            <el-button
                                class="init-button"
                                @click="add()"
                                icon="el-icon-plus"
                                >新增记录</el-button
                            >
                        </div>
                        <!-- <div  style="width: 50px"><download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="设施管理.xls"
                            >
                                <el-button
                                    size="mini"
                                    icon="el-icon-folder-add"
                                    plain
                                    >导出Excel</el-button
                                >
                            </download-excel></div> -->
                        <div class="">
                            <VueTable
                                ref="table"
                                :config="config"
                                @tableCheck="tableCheck"
                            >
                                <template v-slot:doc="slotData">
                                    <div
                                        style="color: blue; cursor: pointer"
                                        v-if="slotData.data.imgList.length!=0"
                                        @click="
                                            download(slotData.data.imgList)
                                        "
                                    >
                                        <span v-if="slotData.data.imgList.length==0">无</span>
                                        <span v-else>{{ (slotData.data.imgList[0].url).substring(24)}}</span>
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
                                             @ruleSuccess="addRuleSuccess"
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
                                            <template slot="imgUrls">
                                                <template>
                                                    <el-upload
                                                        :action="`${$baseUrl}upload/uploadSecurityManagementImg`"
                                                        :on-success="
                                                            fileSuccess
                                                        "
                                                        :on-remove="wordRemove"
                                                        :on-exceed="
                                                            handleExceed
                                                        "
                                                        :file-list="wordList"
                                                        accept=".pdf,.PDF,.jpg,.JPG,.png,.PNG"
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
                                                                >支持扩展名：doc,docx,jpg,png</span
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
        </div>
    </div>
</template>

<script>
import { DownloadExcel } from '@/plugins/DownloadExcel'
import {
    securityManagementInsert,securityManagementUpdate,securityManagementList,securityManagementFindAllCreateName
} from '@/api/daily'
export default {
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
                    type: null,
                    details:null,
                    imgUrls: [],
                    fileDocName: null,
                    happenDate:null
                },
                rules:{
                    name: [
                        {
                            required: true,
                            message: '请选择',
                            trigger: 'blur',
                        },
                    ],
                    type: [
                        {
                            required: true,
                            message: '请选择',
                            trigger: 'blur',
                        },
                    ],
                    details: [
                        {
                            required: true,
                            message: '请选择',
                            trigger: 'blur',
                        },
                    ],
                    happenDate: [
                        {
                            required: true,
                            message: '请选择',
                            trigger: 'blur',
                        },
                    ],
                    name: [
                        {
                            required: true,
                            message: '请选择',
                            trigger: 'blur',
                        },
                    ],
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '事件名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Select',
                        label: '事件类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'type',
                        options:[
                            {
                                value:1,
                                label:'消防演习'
                            },
                            {
                                value:2,
                                label:'纠纷处理'
                            },
                            {
                                value:3,
                                label:'小区火警'
                            },
                            {
                                value:4,
                                label:'其他'
                            },
                        ]
                    },
                    {
                        type: 'textarea',
                        label: '事件详情',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'details'
                    },
                    {
                        type: 'Slot',
                        label: '上传文件',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'imgUrls',
                        slotName: 'imgUrls'
                    },
                    {
                        type: 'DateTime',
                        label: '发生时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'happenDate'
                    },
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            // json_fields: {
            //     设施编号: 'code',
            //     设施类型: 'facilitiesCategoryName',
            //     设施名称:'name',
            //     添加人:'createName',
            //     设施状态:{
            //         field: 'status',
            //         callback: (value) => {
            //             switch (value) {
            //                 case 1:
            //                         return '空置中'
            //                         break
            //                     case 2:
            //                         return '使用中'
            //                         break
            //                     case 3:
            //                         return '已停用'
            //                         break
            //             }
            //         }
            //     },
            //     添加时间:'createDate',
            //     备注:'remakes'
            // },
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '记录编号', prop: 'code', width: 'auto' },
                    {
                        label: '事件名称',
                        prop: 'name',
                        width: 'auto'
                    },
                    { label: '事件类型', prop: 'type', width: 'auto',type: 'function',
                        callback(row, prop) {
                            switch (row.type) {
                                case 1:
                                    return '消防演习'
                                    break
                                case 2:
                                    return '纠纷处理'
                                    break
                                case 3:
                                    return '小区火警'
                                    break
                                case 4:
                                    return '其他'
                                    break
                            }
                        }},
                    { label: '事件详情', prop: 'details', width: 'auto' },
                    {
                        label: '上传文件',
                        prop: 'imgList',
                        width: 'auto',
                        type:'slot',
                        slotName:'doc'
                        
                    },
                    { label: '发生时间', prop: 'happenDate', width: '220' },
                    { label: '登记人名称', prop: 'createName', width: '220' },
                ],
                table_data: [],
                url: 'securityManagementList',
                search_item: [
                    {
                        type: 'Input',
                        label: '事件名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    // {
                    //     type: 'select',
                    //     label: '登记人',
                    //     placeholder: '请输入',
                    //     prop: 'createId',
                    //     options:[]
                    // },
                    {
                        type: 'select',
                        label: '事件类型',
                        placeholder: '请选择',
                        value: null,
                        options: [
                            { value: 1, label: '消防演习' },
                            { value: 2, label: '纠纷处理' },
                            { value: 3, label: '小区火警' },
                            { value: 4, label: '其他' },
                        ],
                        prop: 'status'
                    },
                    {
                        type: 'picker',
                        label: '发生时间',
                        placeholder: '请输入',
                        prop: 'date',
                        startDate: 'happenDateStart',
                        endDate: 'happenDateEnd',
                        width: '280px'
                    }
                    // Slot
                ],
                data: {
                    pageNum: 1,
                    size: 10,
                }
            }
        }
    },
    mounted(){
        // securityManagementFindAllCreateName().then(res=>{
        //     res.data&&res.data.forEach(ele=>{
        //         let obj = {
        //             value:ele.value,
        //             label:ele.label
        //         }
        //         this.config.search_item[1].options.push(obj)
        //     })
        // })
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
                    console.log(data);
                    window.open('https://test.kaidalai.cn/static' + data[0].url)
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消下载'
                    })
                })
        },
        // 获取用户列表
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
            let detail = {}
            if (data.length != 1) {
                this.$message({
                    message: '请选择一条数据进行编辑',
                    type: 'error'
                })
            } else {
                this.add_vrisible = true
                this.drawerTitle = '修改安全管理信息'
                securityManagementList().then(
                    (res) => {
                        console.log(res)
                        res.tableList.forEach(element => {
                            if(element.id == data[0].id){
                                detail = element
                            }
                        });
                        this.addForm.ruleForm.name = detail.name
                        this.addForm.ruleForm.type = detail.type
                        this.addForm.ruleForm.details = detail.details
                        this.addForm.ruleForm.happenDate = detail.happenDate
                        this.addForm.ruleForm.id = data[0].id
                        if (detail.imgList == null) {
                            this.wordList = []
                        } else {
                            let obj = {
                                name: detail.imgList[0].url,
                                url: detail.imgList[0].url
                            }
                            this.$set(this.wordList, '0', obj)
                        }
                    }
                )
            }
        },
        // 新增设施时随机生成编号
        add() {
            this.drawerTitle = '新增安全管理信息'
            this.add_vrisible = true
            // let random = Math.floor(Math.random() * 100000000)
            // this.addForm.ruleForm.code = random
        },
        // word 文件上传成功
        fileSuccess(res, file) {
            this.addForm.ruleForm.imgUrls.push(file.response.url)
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
            this.addForm.ruleForm.imgUrls = []
        },
        // word 文件上传之前
        beforeFileUpload(file) {
            console.log(file)
            this.addForm.ruleForm.fileDocName = file.name
            const isLt2M = file.size / 1024 / 1024 < 20
            const fileType =
                file.name.endsWith('.pdf')||file.name.endsWith('.jpg') || file.name.endsWith('.png')
            console.log(fileType)
            if (!fileType) {
                this.$message.error('上传头像图片只能是 pdf/jpg/png 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 20MB!')
            }
            return fileType && isLt2M
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.wordList = []
        },
        addSubmit(){
      this.$refs.addForm.submitForm()
    },
        // 提交表单
        addRuleSuccess() {
            // 判断是修改的表单还是新增，修改要传主键id
            if (this.drawerTitle == '修改安全管理信息') {
                let resData = {
                    ...this.addForm.ruleForm,
                    id: this.addForm.ruleForm.id
                }
                securityManagementUpdate(resData).then((res) => {
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
                securityManagementInsert(resData).then((res) => {
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
