<template>
    <div>
        <Drawer
            :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible="drawer_vrisible"
        >
            <FromCard style="margin: 30px">
                <span slot="title">基本信息</span>
                <VueForm
                    ref="childFroms"
                    :formObj="fromjson"
                    @ruleSuccess="addRuleSuccess"
                >
                    <template v-slot:constructionArea>
                        <el-input
                            v-model="fromjson.ruleForm.constructionArea"
                            size="small"
                            style="width: 240px"
                            placeholder="请输入"
                        >
                            <i
                                slot="suffix"
                                style="font-style: normal"
                                class="metre"
                                >㎡</i
                            >
                        </el-input>
                    </template>
                    <template v-slot:indoorArea>
                        <el-input
                            v-model="fromjson.ruleForm.indoorArea"
                            size="small"
                            style="width: 240px"
                            placeholder="请输入"
                        >
                            <i
                                slot="suffix"
                                style="font-style: normal"
                                class="metre"
                                >㎡</i
                            >
                        </el-input>
                    </template>
                </VueForm>
            </FromCard>
            <div
                style="margin: 30px"
                v-for="(item, index) in froms"
                :key="index"
            >
                <FromCard>
                    <span slot="title">业主关联 {{ index + 1 }}</span>
                    <span slot="btn">
                        <el-button type="text" @click="del(item)"
                            ><span style="color: #fb4702">删除</span></el-button
                        >
                    </span>
                    <div class="">
                        <VueForm
                            ref="childFrom"
                            @ruleSubmit="ruleSubmit"
                            :formObj="item.addForm"
                        ></VueForm>
                    </div>
                </FromCard>
            </div>
            <div style="display: flex; justify-content: center">
                <el-button @click="addForms()" type="text"
                    ><span style="color: #fb4702">添加</span></el-button
                >
            </div>
            <div slot="footer">
                <button v-if="drawerTitle=='新增房屋'" class="btn-orange" @click="onSubmit()">
                    <span> <i class="el-icon-circle-check"></i>提交</span>
                </button>
                <button class="btn-orange" @click="onEdit()" v-else>
                    <span> <i class="el-icon-circle-check"></i>提交修改</span>
                </button>
                <button class="btn-gray" @click="drawerClose">
                    <span>取消</span>
                </button>
            </div>
        </Drawer>
    </div>
</template>
<script>
import {
    houseManagementInsert,
    cpmBuildingUnitFindAll,
    cpmBuildingUnitEstateFindById,
    findByBuildingId,
    dataDictionaryFindEstateType,
    dataDictionaryFindEstateStatus,
    houseManagementUpdate
} from '@/api/basic'
export default {
    inject:['reload'],
    props: {
        drawerVrisible: {
            type: Boolean,
            default: () => false
        },
        drawerTitle: {
            type: String,
            default: () => ''
        }
    },
    data() {
        return {
            editId:null,
            drawer_vrisible: false,
            bool: false,
            fromjson: {
                ruleForm: {
                    buildingId: 2,
                    buildingUnitId: null,
                    roomNumber: null,
                    status: null,
                    type: null,
                    constructionArea: null,
                    indoorArea: null,
                    deviceNumber: null
                },
                rules: {
                    buildingId: [
                        {
                            required: true,
                            message: '请填楼栋',
                            trigger: 'blur'
                        }
                    ],
                    buildingUnitId: [
                        {
                            required: true,
                            message: '请填单元号',
                            trigger: 'blur'
                        }
                    ],
                    roomNumber: [
                        {
                            required: true,
                            message: '请填房间号',
                            trigger: 'blur'
                        }
                    ],
                    status: [
                        {
                            required: true,
                            message: '请选择',
                            trigger: 'blur'
                        }
                    ],
                    type: [
                        {
                            required: true,
                            message: '请选择类型',
                            trigger: 'blur'
                        }
                    ],
                    constructionArea: [
                        {
                            required: true,
                            message: '请填写建筑面积',
                            trigger: 'blur'
                        }
                    ],
                    indoorArea: [
                        {
                            required: true,
                            message: '请填室内面积',
                            trigger: 'blur'
                        }
                    ],
                    deviceNumber: [
                        {
                            required: true,
                            message: '请填写设备号',
                            trigger: 'blur'
                        }
                    ]
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '楼栋',
                        placeholder: '请输入',
                        options: [],
                        width: '50%',
                        prop: 'buildingId'
                    },
                    {
                        type: 'Select',
                        label: '单元号',
                        placeholder: '请输入',
                        options: [
                          {label:'1',value:7},
                          {label:'2',value:8},
                        ],
                        width: '50%',
                        prop: 'buildingUnitId'
                    },
                    {
                        type: 'Input',
                        label: '房屋名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'roomNumber'
                    },
                    {
                        type: 'Select',
                        label: '房屋状态',
                        placeholder: '请输入',
                        options: [],
                        width: '50%',
                        prop: 'status'
                    },
                    {
                        type: 'Slot',
                        label: '建筑面积',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'constructionArea',
                        slotName: 'constructionArea'
                    },
                    {
                        type: 'Select',
                        label: '房屋类型',
                        placeholder: '请输入',
                        options: [],
                        width: '50%',
                        prop: 'type'
                    },
                    {
                        type: 'Slot',
                        label: '室内面积',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'indoorArea',
                        slotName: 'indoorArea'
                    },
                    {
                        type: 'Int',
                        label: '对讲机设备号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'deviceNumber'
                    }
                ]
            },
            froms: []
        }
    },
    mounted() {
        // 弹窗内下拉框
        cpmBuildingUnitFindAll().then((res) => {
            this.fromjson.form_item[0].options = res
        })
        dataDictionaryFindEstateType().then((res) => {
            console.log(res)
            res.forEach((element) => {
                let obj = {
                    label: element.showName,
                    value: element.showValue
                }
                this.fromjson.form_item[5].options.push(obj)
            })
        })
        dataDictionaryFindEstateStatus().then((res) => {
            console.log(res)
            res.forEach((element) => {
                let obj = {
                    label: element.showName,
                    value: element.showValue
                }
                this.fromjson.form_item[3].options.push(obj)
            })
        })
    },
    methods: {
        drawerClose() {
            this.drawer_vrisible = false
            this.froms = []
            this.$refs.childFroms.reset()
            this.$emit('handleClose', 'Close')
        },
        ruleSubmit(val) {
            this.bool = val
        },
        onSubmit() {
            this.$refs.childFroms.submitForm()
        },
        // 提交
        addRuleSuccess() {
            // 检查form表单校验
            let resList = []
            this.froms.map((item) => {
                // .submitForm()
                resList.push(item.addForm.ruleForm)
            })
            if (resList.length > 0) {
                for (let i = 0; i < resList.length; i++) {
                    this.$refs.childFrom[i].submitForm()
                    if (!this.froms[i].addForm.ruleForm.name) {
                        return
                    }
                }
            }
            let requestData = {
                estate: {
                    buildingUnitId: this.fromjson.ruleForm.buildingUnitId,
                    roomNumber: this.fromjson.ruleForm.roomNumber,
                    status: this.fromjson.ruleForm.status, //不输入业主信息 只能填4
                    type: this.fromjson.ruleForm.type,
                    constructionArea: parseInt(
                        this.fromjson.ruleForm.constructionArea
                    ),
                    indoorArea: parseInt(this.fromjson.ruleForm.indoorArea),
                    deviceNumber: this.fromjson.ruleForm.deviceNumber
                },
                residentList: resList
            }
            console.log(requestData)
            houseManagementInsert(requestData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                     this.$emit('addEidtSuccess')// 调用父组件方法
                    this.drawerClose()
                    
                   
                }
            })
        },
        onEdit(){
             // 检查form表单校验
            let resList = []
            this.froms.map((item) => {
                // .submitForm()
                resList.push(item.addForm.ruleForm)
            })
            if (resList.length > 0) {
                for (let i = 0; i < resList.length; i++) {
                    this.$refs.childFrom[i].submitForm()
                    if (!this.froms[i].addForm.ruleForm.name) {
                        return
                    }
                }
            }
            let requestData = {
                estate: {
                    id:this.editId,
                    buildingUnitId: this.fromjson.ruleForm.buildingUnitId,
                    roomNumber: this.fromjson.ruleForm.roomNumber,
                    status: this.fromjson.ruleForm.status, //不输入业主信息 只能填4
                    type: this.fromjson.ruleForm.type,
                    constructionArea: parseInt(
                        this.fromjson.ruleForm.constructionArea
                    ),
                    indoorArea: parseInt(this.fromjson.ruleForm.indoorArea),
                    deviceNumber: this.fromjson.ruleForm.deviceNumber
                },
                residentList: resList
            }
            console.log(requestData)
            houseManagementUpdate(requestData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    
                    this.drawerClose()
                    
                }
            })
        },
        // 修改用户
        edit(id,data) {
            this.editId = id
            let findData = {
                id: id
            }
            this.fromjson.ruleForm.buildingId=data.buildingId
            if (this.fromjson.ruleForm.buildingId) {
                this.fromjson.ruleForm.buildingUnitId=data.buildingUnitId
            }
            cpmBuildingUnitEstateFindById(findData).then((res) => {
                console.log(res.cpmBuildingUnitEstate)
                // this.fromjson.ruleForm.buildingId = res.cpmBuildingUnitEstate.buildingId
                this.fromjson.ruleForm.roomNumber = res.cpmBuildingUnitEstate.roomNumber
                this.fromjson.ruleForm.status = res.cpmBuildingUnitEstate.status
                this.fromjson.ruleForm.type = res.cpmBuildingUnitEstate.type
                this.fromjson.ruleForm.constructionArea = res.cpmBuildingUnitEstate.constructionArea
                this.fromjson.ruleForm.indoorArea = res.cpmBuildingUnitEstate.indoorArea
                this.fromjson.ruleForm.deviceNumber = res.cpmBuildingUnitEstate.deviceNumber

                console.log(res.userResidentList.length)
                for (let i = 0; i < res.userResidentList.length; i++) {
                    this.froms.push({
                        addForm: {
                            ruleForm: {
                                tel: res.userResidentList[i].tel,
                                name: res.userResidentList[i].name,
                                idType: res.userResidentList[i].idType,
                                idNumber: res.userResidentList[i].idNumber
                            },
                            form_item: [
                                {
                                    type: 'Input',
                                    label: '业主姓名',
                                    placeholder: '请输入',
                                    width: '50%',
                                    prop: 'name',disabled:'true'
                                },
                                {
                                    type: 'Int',
                                    label: '联系方式',
                                    placeholder: '请输入',
                                    width: '50%',
                                    prop: 'tel',disabled:'true'
                                },
                                {
                                    type: 'Select',
                                    label: '证件类型',
                                    placeholder: '请输入',
                                    options: [
                                        { value: 1, label: '身份证' },
                                        { value: 2, label: '营业执照' }
                                    ],
                                    width: '50%',
                                    prop: 'idType',disabled:'true'
                                },
                                {
                                    type: 'Input',
                                    label: '证件号码',
                                    placeholder: '请输入',
                                    width: '50%',
                                    prop: 'idNumber',disabled:'true'
                                }
                            ]
                        },
                        key: Date.now()
                    })
                }
                // houseManagementUpdate
            })
            this.drawer_vrisible = true
        },
        del(item) {
            console.log(item)
            let index = this.froms.indexOf(item)
            if (index !== -1) {
                this.froms.splice(index, 1)
            }
        },
        addForms() {
            let that = this
            this.froms.push({
                addForm: {
                    ruleForm: {
                        tel: null,
                        name: null,
                        idType: null,
                        idNumber: null
                    },
                    rules: {
                        name: [
                            {
                                required: true,
                                message: '请填写业主姓名',
                                trigger: 'blur'
                            }
                        ],
                        tel: [
                            {
                                required: true,
                                message: '请填写手机号',
                                trigger: 'blur'
                            }
                        ],
                        idType: [
                            {
                                required: true,
                                message: '请选择证件类型',
                                trigger: 'blur'
                            }
                        ],
                        idNumber: [
                            {
                                required: true,
                                message: '请填写证件号码',
                                trigger: 'blur'
                            }
                        ]
                    },
                    form_item: [
                        {
                            type: 'Input',
                            label: '业主姓名',
                            placeholder: '请输入',
                            width: '50%',
                            prop: 'name'
                        },
                        {
                            type: 'Int',
                            label: '联系方式',
                            placeholder: '请输入',
                            width: '50%',
                            prop: 'tel'
                        },
                        {
                            type: 'Select',
                            label: '证件类型',
                            placeholder: '请输入',
                            options: [
                                { value: 1, label: '身份证' },
                                { value: 2, label: '营业执照' }
                            ],
                            width: '50%',
                            prop: 'idType'
                        },
                        {
                            type: 'Input',
                            label: '证件号码',
                            placeholder: '请输入',
                            width: '50%',
                            prop: 'idNumber'
                        }
                    ]
                },
                key: Date.now()
            })
        },
        unitData(value) {
          this.fromjson.form_item[1].options=[]
            let resData = {
                id: value
            }
            findByBuildingId(resData).then((res) => {
                // 给单元号赋值
                console.log(res);
                this.fromjson.form_item[1].options=res
            })
        }
    },
    watch: {
        drawerVrisible: {
            handler(newValue) {
                this.drawer_vrisible = newValue
            }
        },
        'fromjson.ruleForm.buildingId': {
            handler(newValue) {
                this.unitData(newValue)
                this.fromjson.ruleForm.buildingUnitId = null
            },
            deep: true
        }
    }
}
</script>

<style scoped lang='scss'>
</style>

