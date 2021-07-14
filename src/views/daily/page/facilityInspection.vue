<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>设施设备检查</span>
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
                <div  style="width: 50px"><download-excel
                                class="export-excel-wrapper"
                                :fetch="fetchData"
                                :fields="json_fields"
                                :before-finish="finishDownload"
                                name="设施设备检查记录.xls"
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
                                <!-- <button>编辑</button> -->
                                <button @click="open(table_row)">
                                    启用
                                </button>
                                <button @click="stop(table_row)">
                                    停用
                                </button>
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
                                    <!-- 选择部门 -->
                                    <template v-slot:sysOrganization>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm.organizationId
                                            "
                                            :remote-method="remoteMethod"
                                            @change="sChange"
                                            @focus="sefocus"
                                            :loading="loading"
                                            remote
                                            style="width: 240px"
                                            filterable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in sysOptions"
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
import { DownloadExcel } from '@/plugins/DownloadExcel'
import {
    sysOrganizationFindAllDepartment,
    sysUserList,
    facilitiesManageList,
    facilitiesPlanInsert,inspectionRouteList,
    facilitiesPlanOpen,
    facilitiesPlanStop
} from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            addDate: null,
            options: [],
            ids:[],
            sysOptions: [],
            // inspector: [],
            loading: false,
            addForm: {
                ruleForm: {
                    name: null,
                    code: '',
                    organizationId: null,
                    isSort: '2',
                    type: null
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '类型',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '设施'
                            },
                            {
                                value: 2,
                                label: '设备'
                            }
                        ]
                    },
                    {
                        type: 'Select',
                        label: '设施/设备名称',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'facilitiesManageId',
                        options: []
                    },
                    {
                        type: 'Input',
                        label: '计划名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Slot',
                        label: '部门',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'organizationId',
                        slotName: 'sysOrganization'
                    },
                    {
                        type: 'Select',
                        label: '检查人',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'examiner',
                        options: []
                    },
                    {
                        type: 'DateTime',
                        label: '计划开始时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'planBeginDate'
                    },
                    {
                        type: 'Input',
                        label: '持续时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'spaceTime'
                    },
                    {
                        type: 'Select',
                        label: '检查频率',
                        width: '50%',
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
            activeName: '0',
            json_fields: {
                设施设备检查计划编号:'code',
                "设施/设备名称":'facilitiesName',
                检查人姓名:'examinerName',
                检查人联系方式:'examinerTel',
                任务状态:{
                    field: 'status',
                    callback: (value) => {
                        switch (value) {
                             case 1:
                                    return '开启'
                                    break
                                case 2:
                                    return '停用'
                                    break
                        }
                    }
                },
                计划开始时间:'planBeginDate',
               "单次持续时间（单位分钟）":'spaceTime',
               检查频率:{
                    field: 'checkRateType',
                    callback: (value) => {
                        switch (value) {
                             case 1:
                              return '每天'
                              break;
                            case 2:
                              return '每周'
                              break;
                              case 3:
                              return '每月'
                              break;
                            default:
                              break;
                        }
                    }
                },
               创建人:'createName'
            },
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '设施设备检查计划编号',
                        prop: 'code',
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
                        label: '任务状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 1:
                                    return '开启'
                                    break
                                case 2:
                                    return '停用'
                                    break
                            }
                        }
                    },
                    {
                        label: '计划开始时间',
                        prop: 'planBeginDate',
                        width: 'auto'
                    },
                    {
                        label: '单次持续时间（单位分钟）',
                        prop: 'spaceTime',
                        width: 'auto'
                    },
                    {
                        label: '检查频率',
                        prop: 'checkRateType',
                        width: 'auto',
                        type:'function',
                        callback(row,prop){
                          switch (row.checkRateType) {
                            case 1:
                              return '每天'
                              break;
                            case 2:
                              return '每周'
                              break;
                              case 3:
                              return '每月'
                              break;
                            default:
                              break;
                          }
                        }
                    },
                    {
                        label: '创建人',
                        prop: 'createName',
                        width: 'auto'
                    }
                    // {
                    //     label: '照片资源信息集合',
                    //     prop: 'detail',
                    //     width: 'auto',
                    // },
                    // {
                    //     label: '设施/设备检查报告',
                    //     prop: 'detail',
                    //     width: 'auto',
                    // },
                ],
                table_data: [],
                url: 'facilitiesPlanList',
                search_item: [
                    {
                        type: 'select',
                        label: '类型',
                        placeholder: '请输入',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '设施'
                            },
                            {
                                value: 2,
                                label: '设备'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '检查计划编号',
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
                        type: 'Int',
                        label: '检查人联系方式',
                        placeholder: '请输入',
                        prop: 'tel'
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
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'facilitiesPlanList',
                data: {
                    pageNum: 1,
                    size: 100
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
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20
            }

            this.loading = true
            // 获取部门列表
            sysOrganizationFindAllDepartment(reeData).then((res) => {
                // console.log(res)
                this.sysOptions = res.data
                // console.log(this.sysOptions);
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
            console.log(value) //sysUserList
        },
        //根据部门获取人员
        sChange(value) {
            this.addForm.form_item[4].options = []
            let sData = {
                pageNum: 1,
                size: 100,
                organizationId: value
            }
            sysUserList(sData).then((res) => {
                console.log(res)

                res.tableList.forEach((element) => {
                    let obj = {
                        value: element.id,
                        label: element.nickName
                    }
                    //给获取下拉框
                    this.addForm.form_item[4].options.push(obj)
                })
                console.log(this.addForm.form_item[4].options)
                this.loading = false
            })
        },
        add() {
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        // 提交
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
            }
            facilitiesPlanInsert(resData).then((res) => {
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
        },
        open(data){
          console.log(data);
          data.forEach(ele=>{
            // console.log(obj);
            this.ids.push(ele.id)
            console.log(this.ids);
          })
          facilitiesPlanOpen({ids:this.ids}).then(res=>{
            this.$message({
                  message: res.message,
                  type: 'success'
                })
          })
          this.$refs.table.requestData()
        },
        stop(data){
          console.log(data);
          data.forEach(ele=>{
            // console.log(obj);
            this.ids.push(ele.id)
            console.log(this.ids);
          })
          facilitiesPlanStop({ids:this.ids}).then(res=>{
            this.$message({
                  message: res.message,
                  type: 'success'
                })
          })
          this.$refs.table.requestData()
        }
    },
    //监听设施设备分类从而获取设施设备名称
    watch: {
        'addForm.ruleForm.type': {
            handler(newVal) {
                this.addForm.form_item[1].options = []
                console.log(newVal)
                facilitiesManageList({ type: newVal }).then((res) => {
                    console.log(res)
                    res.tableList.forEach((ele) => {
                        let obj = {
                            value: ele.id,
                            label: ele.name
                        }
                        this.addForm.form_item[1].options.push(obj)
                    })
                })
            }
        }
    }
}
</script>