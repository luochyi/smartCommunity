<template>
    <div class="main-content">
        <div class="main-titel">
            <span>车辆档案</span>
        </div>
        <div class="content">
            <div class="content-btn">
                <el-button
                    class="init-button"
                    @click="add()"
                    icon="el-icon-plus"
                    >新增车辆</el-button
                >
                <!-- <el-button type="init-button2"
                   icon="el-icon-folder-add"
                   plain>批量导入</el-button>
        <el-button class="init-text"
                   type="text">模板下载</el-button> -->
            </div>
            <VueTable ref="table" :config="config" @tableCheck="tableCheck">
                <template slot="footer">
                    <div class="table-footer">
                        <button @click="revises(table_row)">修改</button>
                        <button @click="del(table_row)">删除</button>
                        
                    </div>
                </template>
            </VueTable>
        </div>
        <Drawer
            :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible="drawer_vrisible"
        >
            <div style="padding: 30px">
                <FromCard>
                    <template slot="title">基本信息</template>
                    <template>
                        <VueForm
                            ref="childFrom"
                             @ruleSuccess="addRuleSuccess"
                            :formObj="addEidtForm"
                        >
                            <template v-slot:hours>
                                <el-select
                                    v-model="buildValue"
                                    filterable
                                    style="width: 30%; margin-right: 16px"
                                    placeholder="幢"
                                >
                                    <el-option
                                        v-for="item in buildOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                                <el-select
                                    v-model="unitValue"
                                    filterable
                                    style="width: 30%; margin-right: 16px"
                                    placeholder="单元"
                                >
                                    <el-option
                                        v-for="item in unitOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                                <el-select
                                    v-model="buildingUnitEstateId"
                                    filterable
                                    style="width: 30%"
                                    placeholder="房间号"
                                >
                                    <el-option
                                        v-for="item in hoursOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </template>
                            <!-- chewei -->
                            <template v-slot:cpmParkingSpaceList>
                                <el-select
                                    v-model="addEidtForm.ruleForm.parkingSpaceId"
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
                                        v-for="item in parkOptions"
                                        :key="item.id"
                                        :label="item.code"
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
                <button class="btn-orange" @click="onSubmit()">
                    <span> <i class="el-icon-circle-check"></i>提交</span>
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
    userCarFindById,
    cpmBuildingUnitFindAll,
    findByBuildingUnitId,
    findByBuildingId,
    findUserCarStatus,
    userCarInsert,
    userCarUpdate,
    cpmParkingSpaceList
} from '@/api/basic'

export default {
    data() {
        return {
            // 楼栋
            buildValue: null,
            buildOptions: [],
            // 单元
            unitValue: null,
            unitOptions: [],
            // 房屋
            hoursOptions: [],
            parkOptions: [],
            loading: false,
            // 业主
            userName: '',
            // 抽屉标题
            drawerTitle: '',
            // 是否通过校验
            // 抽屉显示隐藏
            drawer_vrisible: false,
            table_row: [],
            addEidtForm: {
                ruleForm: {
                    id:null,
                    code: null,
                    parkingSpaceId: null,
                    owner: null,
                    tel: null,
                    idType: null,
                    idNumber: null,
                    status: null,
                    cpmParkingSpaceList:null,
                    type: null,
                    brand: null,
                    model: null,
                    color: null,
                    hours:null,
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '车牌号',
                        placeholder: '请输入车牌号',
                        width: '50%',
                        prop: 'code'
                    },
                    {
                        type: 'Slot',
                        label: '车位号',
                        placeholder: '请输入车位号',
                        width: '50%',
                        prop: 'parkingSpaceId',
                        slotName: 'cpmParkingSpaceList'
                    },
                    {
                        type: 'Input',
                        label: '所属人',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'owner'
                    },
                    {
                        type: 'Input',
                        label: '手机号',
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
                        label: '证件号码	',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'idNumber'
                    },
                    {
                        type: 'Select',
                        label: '状态',
                        placeholder: '请输入',
                        options: [],
                        width: '50%',
                        prop: 'status'
                    },
                    {
                        type: 'Slot',
                        label: '房屋信息',
                        placeholder: '请输入',
                        width: '70%',
                        slotName: 'hours',
                        prop: 'hours'
                    },
                    {
                        type: 'Select',
                        label: '车辆类型',
                        placeholder: '请输入',
                        options: [
                            {
                                label:'私家车',
                                value:1
                            },
                            {
                                label:'货车',
                                value:2
                            },
                            {
                                label:'大巴',
                                value:3
                            },
                            {
                                label:'牵引汽车',
                                value:4
                            },
                            {
                                label:'其他',
                                value:5
                            },
                        ],
                        width: '50%',
                        prop: 'type'
                    },
                    {
                        type: 'Input',
                        label: '车辆品牌',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'brand'
                    },
                    {
                        type: 'Input',
                        label: '车辆型号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'model'
                    },
                    {
                        type: 'Select',
                        label: '车辆颜色',
                        placeholder: '请输入',
                        options: [
                            {
                                label:'红',
                                value:1
                            },
                            {
                                label:'橙',
                                value:2
                            },
                            {
                                label:'黄',
                                value:3
                            },
                            {
                                label:'绿',
                                value:4
                            },
                            {
                                label:'青',
                                value:5
                            },
                            {
                                label:'蓝',
                                value:6
                            },
                            {
                                label:'紫',
                                value:7
                            },
                            {
                                label:'黑',
                                value:8
                            },
                            {
                                label:'白',
                                value:9
                            },
                            {
                                label:'灰',
                                value:10
                            },
                            {
                                label:'金',
                                value:11
                            },
                            {
                                label:'磨砂',
                                value:12
                            },
                            {
                                label:'其他',
                                value:13
                            },
                        ],
                        width: '50%',
                        prop: 'color'
                    },
                ],
                rules: {
                    code: [
                        {
                            required: true,
                            message: '请输入车牌号',
                            trigger: 'blur'
                        }
                    ],
                    parkingSpaceId: [
                        {
                            required: true,
                            message: '请输入车位号',
                            trigger: 'blur'
                        }
                    ],
                    owner: [
                        {
                            required: true,
                            message: '请输入所属人',
                            trigger: 'blur'
                        }
                    ],
                    tel: [
                        {
                            required: true,
                            message: '请输入手机号',
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
                            message: '请输入证件号',
                            trigger: 'blur'
                        }
                    ],
                    status: [
                        {
                            required: true,
                            message: '请选择状态',
                            trigger: 'blur'
                        }
                    ],
                }
            },
            config: {
                // 搜索
                search_item: [
                    {
                        type: 'Input',
                        label: '所属手机号',
                        placeholder: '请输入所属手机号',
                        prop: 'tel'
                    },
                    {
                        type: 'Input',
                        label: '车牌号',
                        placeholder: '请输入车牌号',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '车位号',
                        placeholder: '请输入车位号',
                        prop: 'parkingSpaceCode'
                    }
                ],
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '车牌号', prop: 'code', width: 'auto' },
                    { label: '姓名', prop: 'owner', width: 'auto' },
                    { label: '手机号', prop: 'tel', width: 'auto' },
                    { label: '状态', prop: 'status', width: 'auto' ,type:'function',
                        callback(row,prop){
                            switch (row.status) {
                                case 1:
                                    return '产权车位'
                                    break;
                                case 2:
                                    return '包年'
                                    break;
                                case 3:
                                    return '包月'
                                    break;
                                case 4:
                                    return '临时'
                                    break;
                            
                            }
                        }
                    },
                    {
                        label: '截止时间',
                        prop: 'effectiveTimeEnd',
                        width: 'auto'
                    },
                    {
                        label: '车位号',
                        prop: 'parkingSpaceCode',
                        width: 'auto'
                    },
                    { label: '房屋信息', prop: 'roomName', width: 'auto' },
                    { label: '证件类型', prop: 'idType', width: 'auto' ,type:'function',
                        callback(row,prop){
                            switch (row.status) {
                                case 1:
                                    return '身份证'
                                    break;
                                case 2:
                                    return '营业执照'
                                    break;
                            
                            }
                        }},
                    { label: '证件号码', prop: 'idNumber', width: 'auto' },
                    { label: '车辆类型', prop: 'type', width: 'auto',type:'function',callback:(row,prop)=>{
                        switch (row.type) {
                            case 1:
                                return '私家车'
                                break;
                            case 2:
                                return '货车'
                                break;
                            case 3:
                                return '大巴'
                                break;
                            case 4:
                                return '牵引汽车'
                                break;
                            case 5:
                                return '其他'
                                break;
                            default:
                                break;
                        }
                    } },
                    { label: '车辆品牌', prop: 'brand', width: 'auto' },
                    { label: '车辆型号', prop: 'model', width: 'auto' },
                    { label: '车辆颜色', prop: 'color', width: 'auto' ,type:'function',callback:(row,prop)=>{
                        switch (row.color) {
                            case 1:
                                return '红'
                                break;
                            case 2:
                                return '橙'
                                break;
                            case 3:
                                return '黄'
                                break;
                            case 4:
                                return '绿'
                                break;
                            case 5:
                                return '青'
                                break;
                            case 6:
                                return '蓝'
                                break;
                            case 7:
                                return '紫'
                                break;
                            case 8:
                                return '黑'
                                break;
                            case 9:
                                return '白'
                                break;
                            case 10:
                                return '灰'
                                break;
                            case 11:
                                return '金'
                                break;
                            case 12:
                                return '磨砂'
                                break;
                            case 13:
                                return '其他'
                                break;
                            default:
                                break;
                        }
                    }},

                ],
                url: 'vehicleList',
                data: {
                    pageNum: 1,
                    size: 10
                }
            },
            options: [],
            buildingUnitEstateId: null
        }
    },
    mounted() {
        // 弹窗内下拉框
        cpmBuildingUnitFindAll().then((res) => {
            this.buildOptions = res
        })
        findUserCarStatus().then((res) => {
            console.log(res)
            let arr = res.map((item) => ({
                label: item.showName,
                value: item.showValue
            }))
            console.log(arr)
            this.addEidtForm.form_item[6].options = arr
        })
    },
    methods: {
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20
            }

            this.loading = true
            cpmParkingSpaceList(reeData).then((res) => {
                console.log(res)
                this.parkOptions = res.tableList
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

        onSubmit() {
            this.$refs.childFrom.submitForm()
        },
        addRuleSuccess(val) {
            if(this.drawerTitle == '新增车辆'){
                if(this.buildingUnitEstateId==null||this.buildingUnitEstateId==''){
                this.$message.error('请选择房产')
                return
            }
            let resData = {
                buildingUnitEstateId: this.buildingUnitEstateId,
                code: this.addEidtForm.ruleForm.code,
                parkingSpaceId: this.addEidtForm.ruleForm.parkingSpaceId,
                type: 1,
                owner:  this.addEidtForm.ruleForm.owner,
                tel: this.addEidtForm.ruleForm.tel,
                idType: this.addEidtForm.ruleForm.idType,
                idNumber: this.addEidtForm.ruleForm.idNumber,
                status: this.addEidtForm.ruleForm.status,
                type: this.addEidtForm.ruleForm.type,
                brand: this.addEidtForm.ruleForm.brand,
                model: this.addEidtForm.ruleForm.model,
                color: this.addEidtForm.ruleForm.status,
            }
            userCarInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.drawerClose()
                    this.$refs.table.loadData()
                }
            })
            }else{
                let resData = {
                id:this.addEidtForm.ruleForm.id,
                buildingUnitEstateId: this.buildingUnitEstateId,
                code: this.addEidtForm.ruleForm.code,
                parkingSpaceId: this.addEidtForm.ruleForm.parkingSpaceId,
                type: 1,
                owner:  this.addEidtForm.ruleForm.owner,
                tel: this.addEidtForm.ruleForm.tel,
                idType: this.addEidtForm.ruleForm.idType,
                idNumber: this.addEidtForm.ruleForm.idNumber,
                status: this.addEidtForm.ruleForm.status,
                type: this.addEidtForm.ruleForm.type,
                brand: this.addEidtForm.ruleForm.brand,
                model: this.addEidtForm.ruleForm.model,
                color: this.addEidtForm.ruleForm.status,
            }
            userCarUpdate(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.drawerClose()
                    this.$refs.table.loadData()
                }
            })
            }
        },
        // 弹窗关闭
        drawerClose() {
            this.drawer_vrisible = false
            this.$refs.childFrom.reset()
            this.buildValue = null
            this.unitValue = null 
            this.buildingUnitEstateId = null
        },
        revises(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message.error('只能单条数据修改')
                    return
                }
            } else {
                this.$message.error('请选中需要修改的数据')
                return
            }
            ;(this.drawerTitle = '修改车辆'), (this.drawer_vrisible = true)
            let resData = {
                id: data[0].id
            }
            userCarFindById(resData).then((res) => {
                this.addEidtForm.ruleForm.id = data[0].id
                 this.addEidtForm.ruleForm.code = res.code
                  this.addEidtForm.ruleForm.parkingSpaceId = res.parkingSpaceId
                   this.addEidtForm.ruleForm.owner= res.owner
                    this.addEidtForm.ruleForm.tel= res.tel
                     this.addEidtForm.ruleForm.idType= res.idType
                      this.addEidtForm.ruleForm.idNumber= res.idNumber
                       this.addEidtForm.ruleForm.status= res.status
                    //    this.addEidtForm.ruleForm.cpmParkingSpaceList= res.cpmParkingSpaceList
                       this.addEidtForm.ruleForm.type= res.type
                       this.addEidtForm.ruleForm.brand= res.brand
                       this.addEidtForm.ruleForm.model= res.model
                       this.addEidtForm.ruleForm.color= res.color

                       this.buildValue = res.buildingId
                       this.unitValue = res.buildingUnitId
                       this.buildingUnitEstateId = res.buildingUnitEstateId
                    
            })
        },
        add() {
            ((this.drawerTitle = '新增车辆')),
                (this.drawer_vrisible = true)
        },
        handleClose() {
            this.drawer_vrisible = false
        },
        tableCheck(arr) {
            console.log(arr)
            this.table_row = arr
        },
        getData() {
            // 调用子组件的方法
            this.$refs.table.loadData()
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
        // 单元楼栋
        unitData(value) {
            let resData = {
                id: value
            }
            findByBuildingId(resData).then((res) => {
                // 给单元号赋值
                this.unitOptions = res
            })
        },
        hoursData(value) {
            let resData = {
                id: value
            }
            findByBuildingUnitId(resData).then((res) => {
                console.log(res)
                this.hoursOptions = res
            })
        }
    },
    watch: {
        buildValue: {
            handler(newValue) {
                this.unitData(newValue)
            },
            deep: true
        },
        unitValue: {
            handler(newValue) {
                this.hoursData(newValue)
            },
            deep: true
        },
        hoursValue: {
            handler(newValue) {
                this.addForm.ruleForm.hours = newValue
                console.log(this.addForm.ruleForm.hours)
                },
            deep: true
        },
    },
}
</script>
<style scoped lang='scss'>
</style>
