<template>
    <div>
        <Drawer
            :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible="drawer_vrisible"
        >
            <FromCard style="margin: 30px">
                <span slot="title">基本信息</span>
                <VueForm ref="childFrom" :formObj="fromjson"> </VueForm>
            </FromCard>
            <FromCard style="margin: 30px">
                <span slot="title">房屋信息</span>
                <div
                    v-for="(item, index) in hoursArray"
                    class="flex"
                    :key="index"
                >
                    <template>
                        <div class="label-span">
                            <span
                                >房屋信息<span v-show="index !== 0">{{
                                    index + 1
                                }}</span></span
                            >
                        </div>
                        <div>
                            <el-select
                                v-model="item.buildValue"
                                filterable
                                @change="(value) => buildChange(value, index)"
                                size="small"
                                style="width: 108px; margin-right: 16px"
                                placeholder="幢"
                            >
                                <el-option
                                    v-for="obj in buildOptions"
                                    :key="obj.value"
                                    :label="obj.label"
                                    :value="obj.value"
                                >
                                </el-option>
                            </el-select>
                            <el-select
                                v-model="item.unitValue"
                                filterable
                                @change="(value) => unitChange(value, index)"
                                size="small"
                                style="width: 108px; margin-right: 16px"
                                placeholder="单元"
                            >
                                <el-option
                                    v-for="obj in item.unitOptions"
                                    :key="obj.value"
                                    :label="obj.label"
                                    :value="obj.value"
                                >
                                </el-option>
                            </el-select>
                            <el-select
                                v-model="item.hoursValue"
                                filterable
                                size="small"
                                style="width: 108px; margin-right: 16px"
                                placeholder="房间号"
                            >
                                <el-option
                                    v-for="obj in item.hoursOptions"
                                    :key="obj.value"
                                    :label="obj.label"
                                    :value="obj.value"
                                >
                                </el-option>
                            </el-select>
                        </div>
                        <div>
                            <span
                                style="font-size: 19px; margin-right: 8px"
                                @click="houseAdd"
                                ><i class="el-icon-circle-plus-outline"></i
                            ></span>
                            <span
                                style="font-size: 19px"
                                v-if="index !== 0"
                                @click="houseRemove(index)"
                                ><i class="el-icon-remove-outline"></i
                            ></span>
                        </div>
                    </template>
                </div>
            </FromCard>
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
    userResidentFindEstateById,
    cpmBuildingUnitFindAll,
    findByBuildingId,
    findByBuildingUnitId,
    userResidentUpdateEstate
} from '@/api/basic'
export default {
    props: {
        drawerVrisible: {
            type: Boolean,
            default: () => false
        },
        drawerTitle: {
            type: String,
            default: () => ''
        },
        owerId: {
            type: Number,
            default: () => null
        }
    },
    data() {
        return {
            estateIds: [],
            drawer_vrisible: false,
            buildOptions: [],
            hoursArray: [],
            // 基本信息
            fromjson: {
                ruleForm: {
                    tel: null,
                    name: null,
                    idType: null,
                    idNumber: null,
                    id:null
                },
                form_item: [
                    {
                        type: 'span',
                        label: '业主姓名',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'span',
                        width: '50%',
                        label: '联系方式',
                        prop: 'tel'
                    },
                    {
                        type: 'span',
                        width: '50%',
                        label: '证件类型',
                        prop: 'idType'
                    },
                    {
                        type: 'span',
                        width: '50%',
                        label: '证件号码',
                        prop: 'idNumber'
                    }
                ]
            }
        }
    },
    mounted() {
        // 楼栋下拉选择
        cpmBuildingUnitFindAll().then((res) => {
            this.buildOptions = res
            console.log(res)
        })
    },
    methods: {
        //  提交
        onSubmit() {
            let resData = {
                userResident: this.fromjson.ruleForm,
                estateIds: this.estateIds
            }
            userResidentUpdateEstate(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                    this.drawerClose()
                } else {
                    this.$message({
                        type: 'error',
                        message: '修改房屋失败'
                    })
                }
            })
        },
        getData(id) {
            this.hoursArray = []
            let resData = {
                id: id
            }
            userResidentFindEstateById(resData).then((res) => {
                this.estateIds = []
                console.log(res)
                for (
                    let i = 0;
                    i < res.cpmBuildingUnitEstateIdList.length;
                    i++
                ) {
                    this.houseAdd()

                    this.hoursArray[i].hoursValue =
                        res.cpmBuildingUnitEstateIdList[i].roomNumber
                    this.hoursArray[i].unitValue =
                        res.cpmBuildingUnitEstateIdList[i].unitNo
                    this.hoursArray[i].buildValue =
                        res.cpmBuildingUnitEstateIdList[i].buildingNo

                    this.estateIds.push(
                        res.cpmBuildingUnitEstateIdList[i].estateId
                    )
                }
                this.fromjson.ruleForm.tel = res.userResident.tel
                this.fromjson.ruleForm.name = res.userResident.name
                this.fromjson.ruleForm.idType = res.userResident.idType
                this.fromjson.ruleForm.idNumber = res.userResident.idNumber
                this.fromjson.ruleForm.id = res.userResident.id
                console.log(this.estateIds)
            })
        },
        // 房产添加
        houseAdd() {
            this.hoursArray.push({
                buildValue: null,
                // 单元
                unitValue: null,
                unitOptions: [],
                hoursOptions: [],
                // 房屋
                hoursValue: null
            })
        },
        // 楼栋数据变化
        buildChange(value, index) {
            this.hoursArray[index].unitOptions = []
            this.hoursArray[index].hoursOptions = []
            this.hoursArray[index].unitValue = null
            this.hoursArray[index].hoursValue = null
            let resData = {
                id: value
            }
            findByBuildingId(resData).then((res) => {
                // 给单元号赋值
                this.hoursArray[index].unitOptions = res
            })
        },
        // 单元数据变化
        unitChange(value, index) {
            this.hoursArray[index].hoursValue = null
            this.hoursArray[index].hoursOptions = []
            let resData = {
                id: value
            }
            findByBuildingUnitId(resData).then((res) => {
                this.hoursArray[index].hoursOptions = res
            })
        },
        houseRemove(index) {
            this.hoursArray.splice(index, 1)
        },
        // 弹窗关闭
        drawerClose() {
            this.drawer_vrisible = false
            this.$emit('handleClose', 'Close')
        }
    },
    watch: {
        drawerVrisible: {
            handler(newValue) {
                this.drawer_vrisible = newValue
            }
        },
        owerId: {
            handler(newValue) {
                this.getData(newValue)
            }
        }
    }
}
</script>

<style scoped lang='scss'>
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

