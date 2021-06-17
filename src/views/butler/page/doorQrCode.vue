<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>门禁二维码</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >添加设备二维码</el-button
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
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="添加设备二维码"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">设备二维码信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm">
                                    <!-- Slot -->
                                    <template v-slot:hours>
                                        <el-select
                                            v-model="buildValue"
                                            filterable
                                            style="
                                                width: 30%;
                                                margin-right: 16px;
                                            "
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
                                            style="
                                                width: 30%;
                                                margin-right: 16px;
                                            "
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
                                            v-model="hoursValue"
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
import { AddQrCode,removeQrCode } from '@/api/butler'
import {
    userCarFindById,
    cpmBuildingUnitFindAll,
    findByBuildingUnitId,
    findByBuildingId,
    findUserCarStatus,
    userCarInsert,
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
            hoursValue: null,
            hoursOptions: [],
            add_vrisible: false,
            edit_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    estateId: null
                },
                rules: {},
                form_item: [
                    {
                        type: 'Slot',
                        label: '房屋信息',
                        placeholder: '请输入',
                        width: '70%',
                        slotName: 'hours',
                        prop: 'estateId'
                    },
                    {
                        type: 'Input',
                        label: '用户姓名',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Int',
                        label: '手机号',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'tel'
                    },
                    {
                        type: 'Input',
                        label: '身份证号',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'idCard'
                    },
                    {
                        type: 'DateTime',
                        label: '生效时间',
                        placeholder: '请选择开始日期',
                        width: '100%',
                        prop: 'startTime'
                    },
                    {
                        type: 'DateTime',
                        label: '失效时间',
                        placeholder: '请选择结束时间',
                        width: '100%',
                        prop: 'endTime'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '房产名称', prop: 'roomName', width: 'auto' },
                    { label: '用户姓名', prop: 'name', width: '130' },
                    {
                        label: '手机号',
                        prop: 'tel',
                        width: 'auto'
                    },
                    { label: '身份证号', prop: 'idCard', width: 'auto' },
                    { label: '生效时间', prop: 'startTime', width: 'auto' },
                    { label: '失效时间', prop: 'endTime', width: 'auto' },
                    { label: '创建人姓名', prop: 'createName', width: '130' },
                    { label: '创建时间', prop: 'createDate', width: 'auto' },
                ],
                table_data: [],
                url: 'doorQRCodeList',
                search_item: [
                    {
                        type: 'Int',
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
    mounted() {
        // 弹窗内下拉框
        cpmBuildingUnitFindAll().then((res) => {
            this.buildOptions = res
        })
    },
    methods: {
        add() {
            this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.buildValue = null
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
            }
            AddQrCode(resData).then((res) => {
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
                        let resData = {
                            id:data[0].id,
                            estateId:data[0].estateId,
                            tel:data[0].tel
                        }
                        removeQrCode(resData).then(res=>{
                            console.log(res);
                            this.$refs.table.loadData()
                        })
                    })
                    .catch((action) => {})
            } else {
                this.$message.error('请选中需要删除的数据')
            }
        }
    },
    watch: {
        buildValue: {
            handler(newValue) {
                this.unitData(newValue)
                this.unitValue = null
            },
            deep: true
        },
        unitValue: {
            handler(newValue) {
                this.hoursData(newValue)
                this.hoursValue = null
            },
            deep: true
        },
        hoursValue: {
            handler(newValue) {
                this.addForm.ruleForm.estateId = newValue
                console.log(this.addForm.ruleForm.estateId)
            },
            deep: true
        }
    }
}
</script>
