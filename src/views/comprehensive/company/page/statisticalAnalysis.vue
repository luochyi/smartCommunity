<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>统计分析</span>
            </div>
            <div class="content">
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button>编辑</button> -->
                                <!-- <button @click="isEnable(table_row)">启用/停用</button> -->
                                <!-- <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    sysOrganizationFindAllDepartment,
    sysUserList,
} from '@/api/daily'
import {
    trainInsert,
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
                    greenAreaId: null,
                    content: null,
                    director: null,
                    endDate:null
                },
                form_item: [
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
                        label: '培训人员',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'trainPerson',
                        options: []
                    },
                    {
                        type: 'DateTime',
                        label: '培训时间',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'trainDate'
                    },
                ]
            },
            table_row: [],
            activeName: '0',
            config: {
                thead: [
                    {
                        label: '',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '部门名称',
                        prop: 'organizationName',
                        width: 'auto'
                    },
                    {
                        label: '姓名',
                        prop: 'name',
                        width: 'auto'
                    },
                    {
                        label: '性别',
                        prop: 'sex',
                        width: 'auto',
                        type:'function',
                        callback:(row,prop)=>{
                            if (row.sex == 1) {
                                return '男'
                            }else{
                                return'女'
                            }
                        }
                    },
                    {
                        label: '手机号',
                        prop: 'tel',
                        width: 'auto'
                    },
                    {
                        label: '培训时间',
                        prop: 'trainDate',
                        width: 'auto'
                    },
                ],
                table_data: [],
                url: 'trainList',
                search_item: [
                    {
                        type: 'select',
                        label: '部门',
                        placeholder: '请输入',
                        prop: 'organizationId',
                        options:[]
                    },
                    {
                        type: 'Input',
                        label: '手机号',
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
    mounted(){
        let reeData = {
                pageNum: 1,
                size: 20,
            }
         sysOrganizationFindAllDepartment(reeData).then((res) => {
                console.log(res)
                res.data.forEach(element => {
                    let obj = {
                        value:element.id,
                        label:element.name
                    }
                     this.config.search_item[0].options.push(obj)
                });
               
                // console.log(this.sysOptions);
            })
    },
    methods: {
        // 获取用户列表
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
            }
            this.loading = true
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
            console.log(value)//sysUserList

            
        },
        //根据部门获取人员
        sChange(value){
            this.addForm.form_item[1].options = []
             let sData = {
                pageNum: 1,
                size: 100,
                organizationId:value
             }
             sysUserList(sData).then((res) => {
                console.log(res)
                
                 res.tableList.forEach(element => {
                     let obj = {
                         value: element.id,
                         label: element.actualName
                     }
                    this.addForm.form_item[1].options.push(obj)
                });
                // console.log(this.addForm.form_item[3].options)
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
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
            }
            trainInsert(resData).then((res) => {
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