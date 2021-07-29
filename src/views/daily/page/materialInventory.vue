<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>物资盘点</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增盘点</el-button
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
                                <!-- <button @click="detail(table_row)">详情</button> -->
                                <!-- <button @click="del(table_row)">删除</button> -->
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!-- 新增 -->
                <Drawer
                    drawerTitle="新增钥匙"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">钥匙信息</template>
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
                                </VueForm>
                                <template>
                                    <div>
                                        <div class="hr"></div>
                                        <div>
                                            <div class="add">
                                                <span @click="addMember"
                                                    >添加成员</span
                                                >
                                            </div>
                                            <div class="content-table">
                                                <template>
                                                    <el-table
                                                        :data="tableData"
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
                                                            prop="date"
                                                            label="姓名"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-input
                                                                    size="small"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .name
                                                                    "
                                                                    placeholder="请输入"
                                                                ></el-input>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="name"
                                                            label="手机号"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-input
                                                                    size="small"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .tel
                                                                    "
                                                                    placeholder="请输入"
                                                                ></el-input>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="address"
                                                            label="身份"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-select
                                                                    size="small"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .identity
                                                                    "
                                                                    placeholder="请输入"
                                                                >
                                                                    <el-option
                                                                        v-for="item in identityOptions"
                                                                        :key="
                                                                            item.value
                                                                        "
                                                                        :label="
                                                                            item.label
                                                                        "
                                                                        :value="
                                                                            item.value
                                                                        "
                                                                    >
                                                                    </el-option>
                                                                </el-select>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            label="证件类型"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-select
                                                                    size="small"
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .idType
                                                                    "
                                                                    placeholder="请输入"
                                                                >
                                                                    <el-option
                                                                        v-for="item in userOptions"
                                                                        :key="
                                                                            item.value
                                                                        "
                                                                        :label="
                                                                            item.label
                                                                        "
                                                                        :value="
                                                                            item.value
                                                                        "
                                                                    >
                                                                    </el-option>
                                                                </el-select>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="address"
                                                            width="220"
                                                            label="证件号码"
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
                                                                            size="small"
                                                                            v-model="
                                                                                scope
                                                                                    .row
                                                                                    .idNumber
                                                                            "
                                                                            placeholder="请输入"
                                                                        ></el-input>
                                                                    </div>
                                                                    <div
                                                                        @click="
                                                                            deleteRow(
                                                                                scope.$index,
                                                                                tableData
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
    keyManagementUpdate
} from '@/api/daily'
export default {
    data() {
        return {
            tableData: [],
            add_vrisible: false,
            detail_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {},
                // rules: {
                //     tel: [
                //         // {
                //         //     required: true,
                //         //     message: '请输入手机号',
                //         //     trigger: 'blur'
                //         // },
                //         {
                //             min: 11,
                //             max: 11,
                //             message: '请输入正确的手机号',
                //             trigger: 'blur'
                //         }
                //     ]
                // },
                form_item: []
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '盘点期次', prop: 'periodTime', width: 'auto' },
                    {
                        label: '盘点种类数量',
                        prop: 'speciesNum',
                        width: 'auto'
                    },
                    {
                        label: '盘点时间开始',
                        prop: 'inventoryDateStart',
                        width: 'auto'
                    },
                    {
                        label: '盘点时间结束',
                        prop: 'inventoryDateEnd',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'materialInventoryList',
                search_item: [
                    {
                        type: 'Input',
                        label: '盘点期次',
                        placeholder: '请输入',
                        prop: 'periodTime'
                    }
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
        addMember() {
            this.tableData.push({
                name: null,
                tel: null,
                idType: null,
                idNumber: null,
                identity: null
            })
        },
        add() {
            this.add_vrisible = true
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit() {
            let resData = {
                ...this.addForm.ruleForm
                // code: this.addForm.ruleForm.code,
                // name: this.addForm.ruleForm.name,
                // openStartDate: this.openStartDate,
                // openEndDate:  this.openEndDate,
                // imgUrls:this.addForm.ruleForm.imgUrls,
            }
            keyManagementInsert(resData).then((res) => {
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
