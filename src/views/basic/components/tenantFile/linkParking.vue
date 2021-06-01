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
                <span slot="title">车位信息</span>
                <div
                    class="flex"
                    v-for="(item, index) in parkingArray"
                    :key="index"
                >
                    <div class="label-span">
                        <span
                            >车位信息<span v-show="index !== 0">{{
                                index + 1
                            }}</span></span
                        >
                    </div>
                    <div>
                        <el-select
                            size="small"
                            @change="(value) => parkChange(index, value)"
                            :remote-method="parkRemoteMethod"
                            remote
                            @focus="parkFocus"
                            filterable
                            style="margin-right: 16px"
                            v-model="item.id"
                            placeholder="请输入"
                        >
                            <el-option
                                v-for="obj in parkingOptions"
                                :key="obj.value"
                                :label="obj.label"
                                :value="obj.value"
                            >
                            </el-option>
                        </el-select>
                        <el-date-picker
                            v-model="parkingArray[index].effectiveTimeStart"
                            type="date"
                            size="mini"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择开始日期"
                        >
                        </el-date-picker>
                        <el-date-picker
                            v-model="parkingArray[index].effectiveTimeEnd"
                            type="date"
                            size="mini"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择结束日期"
                        >
                        </el-date-picker>
                    </div>
                    <div>
                        <span style="font-size: 19px" @click="parkingAdd"
                            ><i class="el-icon-circle-plus-outline"></i
                        ></span>
                        <span
                            style="font-size: 19px; margin-left: 8px"
                            v-if="index !== 0"
                            @click="parkingRemove(index)"
                            ><i class="el-icon-remove-outline"></i
                        ></span>
                    </div>
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
    userResidentFindParkingSpaceById,
    cpmParkingSpaceList,
    cpmParkingSpaceFindById,
    tenantUpdateParkingSpace,
    tenantUpdateEstate
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
            loading: false,
            drawer_vrisible: false,
            // 车位
            parkingOptions: [],
            parkingArray: [
                {
                    id: null,
                    status: 2,
                    effectiveTimeStart: null,
                    effectiveTimeEnd: null
                }
            ],
            // 基本信息
            fromjson: {
                ruleForm: {
                    tel: null,
                    name: null,
                    idType: null,
                    idNumber: null
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
     
    },
    methods: {
        parkChange() {},
        // 车位模糊查询
        parkRemoteMethod(val) {
            this.parkingOptions = []
            let resData = {
                pageNum: 1,
                size: 50,
                code: val
            }
            this.loading = true
            cpmParkingSpaceList(resData).then((res) => {
                res.tableList.map((item) => {
                    this.parkingOptions.push({
                        value: item.id,
                        label: item.code
                    })
                })
                this.loading = false
                console.log(res)
            })
        },
        // 车位初始加载50条数据
        parkFocus() {
            this.parkingOptions = []
            let resData = {
                pageNum: 1,
                size: 50
            }
            this.loading = true
            cpmParkingSpaceList(resData).then((res) => {
                res.tableList.map((item) => {
                    this.parkingOptions.push({
                        value: item.id,
                        label: item.code
                    })
                })
                this.loading = false
                console.log(res)
            })
        },
        //  提交
        onSubmit() {
            console.log(this.parkingOptions)
        },
        getData(id) {
            let resData = {
                id: id
            }
            userResidentFindParkingSpaceById(resData).then((res) => {
              console.log(res);
                this.fromjson.ruleForm.tel = res.userResident.tel
                this.fromjson.ruleForm.name = res.userResident.name
                this.fromjson.ruleForm.idType = res.userResident.idType
                this.fromjson.ruleForm.idNumber = res.userResident.idNumber
            })
            //  cpmParkingSpaceFindById(resData).then(res=>{
            //   console.log(res);
            // })
        },
        parkingAdd() {
            this.parkingArray.push({
                id: null
            })
        },
        parkingRemove(index) {
            this.parkingArray.splice(index, 1)
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

