<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>考勤小组</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增小组</el-button
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
                                <!-- <el-tab-pane label="未领取"
                             name="1"></el-tab-pane>
                <el-tab-pane label="已领取"
                             name="2"></el-tab-pane>
                 <el-tab-pane label="停用"
                             name="3"></el-tab-pane> -->
                            </el-tabs>
                        </template>
                        <template slot="footer">
                            <div class="table-footer">
                                <!-- <button @click="edit(table_row)">编辑</button> -->
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
               <Drawer
                    :drawerTitle="drawerTitle"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">小组信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                </VueForm>
                                <template>
                                    <div>
                                        
                                        <div>
                                            <div class="add">
                                                <span @click="addPeople"
                                                    >添加人员</span
                                                >
                                            </div>
                                            <div class="content-table">
                                                <template>
                                                    <el-table
                                                        :data="peopleDetailList"
                                                        highlight-current-row
                                                        :header-cell-style="{
                                                            background:
                                                                '#F5F5F6',
                                                            color: '#999999'
                                                        }"
                                                        style="width: 100%"
                                                    >
                                                        <el-table-column
                                                            label="序号"
                                                            width="80"
                                                            type="index"
                                                        >
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="name"
                                                            label="人员名称"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-select
                                                                    size="small"
                                                                    @change="currStationChange(scope)"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .name
                                                                    "
                                                                    placeholder="请输入"
                                                                >
                                                                     <el-option
                                                                        v-for="(item,index) in peopleOptions"
                                                                        :key="
                                                                            index
                                                                        "
                                                                        :label="
                                                                            item.label
                                                                        "
                                                                        :value="
                                                                            item.value
                                                                        "
                                                                        :disabled="item.disabled"
                                                                    >
                                                                    </el-option>
                                                                </el-select>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="shouldInventory"
                                                            label="职位"
                                                        >
                                                           <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-input
                                                                disabled
                                                                    size="small"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .positionName
                                                                    "
                                                                    placeholder="请输入"
                                                                ></el-input>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="inventorySurplusLosses"
                                                            width="220"
                                                            label="联系方式"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <div
                                                                    class="
                                                                        column_flex
                                                                    "
                                                                >
                                                                    <div
                                                                        style="
                                                                            flex: 1;
                                                                        "
                                                                    >
                                                                        <el-input
                                                                            disabled
                                                                            size="small"
                                                                            v-model="
                                                                                scope
                                                                                    .row
                                                                                    .tel
                                                                            "
                                                                            placeholder="请输入"
                                                                        ></el-input>
                                                                    </div>
                                                                    <div
                                                                        @click="
                                                                            deleteRow(
                                                                                scope.$index,
                                                                                peopleDetailList
                                                                            )
                                                                        "
                                                                        v-if="
                                                                            scope.$index !==
                                                                            0
                                                                        "
                                                                        style="
                                                                            padding-left: 10px;
                                                                        "
                                                                    >
                                                                        <span
                                                                            ><i
                                                                                class="
                                                                                    el-icon-delete
                                                                                "
                                                                            ></i
                                                                        ></span>
                                                                    </div>
                                                                </div>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </template>
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
    keyManagementInsert,
    keyManagementFindById,
    keyManagementUpdate,sysOrganizationFindAllDepartment
} from '@/api/daily'
import {
    functionAuthorityList,attendanceTeamInsert,attendanceTeamList,attendanceTeamFindPeopleById
} from '@/api/company'
export default {
    data() {
        return {
            drawerTitle:null,
            peopleOptions:[],
            peopleArr:[],
            peopleDetailList: [],
            add_vrisible: false,
            detail_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    name:null,
                    organizationId:null
                },
                rules: {
                    tel: [
                        // {
                        //     required: true,
                        //     message: '请输入手机号',
                        //     trigger: 'blur'
                        // },
                        {
                            min: 11,
                            max: 11,
                            message: '请输入正确的手机号',
                            trigger: 'blur'
                        }
                    ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '小组名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Select',
                        label: '所属部门',
                        // disabled: true,
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'organizationId',
                        options:[]
                    },
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '小组名称', prop: 'name', width: 'auto' },
                    { label: '所属部门名称', prop: 'organizationName', width: 'auto' },
                    { label: '小组成员名称', prop: 'teamMembersName', width: 'auto' },
                    {
                        label: '创建时间',
                        prop: 'createDate',
                        width: 'auto'
                    },
                    {
                        label: '创建人名称',
                        prop: 'createName',
                        width: 'auto'
                    },
                ],
                table_data: [],
                url: 'attendanceTeamList',
                search_item: [
                    {
                        type: 'Input',
                        label: '小组名称',
                        placeholder: '请输入',
                        prop: 'name'
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
    created(){
        sysOrganizationFindAllDepartment().then(res=>{
            console.log(res);
            res.data.forEach(ele => {
                let obj = {
                    label: ele.name,
                    value:ele.id
                }
                this.addForm.form_item[1].options.push(obj)
            });
        })
    },
    methods: {
        addPeople() {
            this.peopleDetailList.push({
                name: null,
                positionName:null,
                tel:null
            })
            console.log(this.peopleDetailList);
        },
        currStationChange(scope){
            console.log(scope);
            let index = scope.$index //table的index
            functionAuthorityList().then(res=>{
                res.tableList.forEach(ele=>{
                    if(ele.id==scope.row.name){
                        this.peopleDetailList[index].positionName = ele.positionName
                        this.peopleDetailList[index].tel = ele.tel
                    }
                })
            })
            // 初始化一下
            console.log(this.peopleDetailList);
            for(let i = 0;i<this.peopleOptions.length;i++){
                        this.peopleOptions[i].disabled=false
                }
            this.peopleArr=[]
            // 已选择的人员push进peopleArr
            this.peopleDetailList.forEach(ele=>{
                this.peopleArr.push(ele.name)
            })
            // 如果已选择，则options中的被选择人员会被禁用
            this.peopleArr.forEach(item=>{
                for(let i = 0;i<this.peopleOptions.length;i++){
                    if(this.peopleOptions[i].value == item){
                        this.peopleOptions[i].disabled=true
                    }
                }
            })
        },
        add() {
            this.drawerTitle = '新增小组'
            this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm,
                teamMembers:this.peopleArr.toString()
            }
            console.log(resData);
            attendanceTeamInsert(resData).then((res) => {
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
        edit(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能编辑一条数据',
                    type: 'error'
                })
            } else {
                this.drawerTitle = '修改小组'
                this.add_vrisible = true
                attendanceTeamFindPeopleById({teamId:data[0].id}).then(res=>{
                    console.log(res);
                    res.data.forEach(ele=>{
                            this.addForm.ruleForm.name = data[0].name
                            this.addForm.ruleForm.organizationId = data[0].organizationId
                            let obj ={
                                name:ele.name,
                                positionName:ele.identityName,
                                tel:ele.tel
                            }
                            this.peopleDetailList.push(obj)
                    })
                    console.log(this.peopleDetailList);
                })
            }
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
        deleteRow (index, rows) {
      rows.splice(index, 1);
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
    },
    watch:{
        'addForm.ruleForm.organizationId':{
            handler(newV){
            this.peopleDetailList=[]
            this.peopleOptions=[]
                console.log(newV);
            functionAuthorityList({organizationId:newV}).then(res=>{
                console.log(res);
                res.tableList.forEach(ele=>{
                    let obj = {
                    label: ele.actualName,
                    value: ele.id,
                    disabled:false
                }
                this.peopleOptions.push(obj)
                
                })
            })
            console.log(this.peopleOptions);
            }
        }
    }
}
</script>
<style scoped lang='scss'>
.details-box {
    .box-item {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        .item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            width: 50%;
            .span {
                width: 100px;
                text-align: right;
                margin-right: 20px;
            }
        }
    }
}
.flex {
    margin: 17px 0;
    display: flex;
    align-items: center;
}
.label-span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    width: 80px;
}
.add {
    margin-bottom: 20px;

    span {
        cursor: pointer;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #fb4702;
        line-height: 20px;
    }
}
.hr {
    margin: 30px 0;
    height: 1px;
    background: #e8e8e8;
}
.column_flex {
    display: flex;
    align-items: center;
}
</style>
