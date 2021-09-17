<style lang="scss" scoped>
.main {
    margin: 20px;
    .head-box {
        background: #fff;
        border-radius: 4px;
        border: 1px solid #cfd0dd;
        margin-bottom: 20px;
        .titel {
            line-height: 50px;
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
            padding-left: 20px;
            border-bottom: 1px solid #d8d8d8;
        }
    }
    .box {
        background: #fff;
        padding: 20px;
        margin: 20px 0;
        border-radius: 4px;
        border: 1px solid #cfd0dd;

        .title {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: bold;
            color: #333333;
            margin-bottom: 20px;
        }
    }
}
</style>
<template>
    <div>
        <div class="main-content" v-show="handleChangeShow">
            <div class="main-titel">
                <span>排班计划</span>
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
                                <button @click="detail(table_row)">详情</button>
                                <button @click="del(table_row)">删除</button>
                                <button @click="enable(table_row)">
                                    开启/关闭
                                </button>
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
                            <template slot="title">基本信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm" @ruleSuccess="addRuleSuccess">
                                </VueForm>
                                <template>
                                    <div>
                                        <div>
                                            <div class="add">
                                                <span @click="addWorkingdays"
                                                    >添加工作日</span
                                                >
                                            </div>
                                            <div class="content-table">
                                                <template>
                                                    <el-table
                                                        :data="
                                                            sysAttendanceSchedulingPlanDetails
                                                        "
                                                        highlight-current-row
                                                        :header-cell-style="{
                                                            background:
                                                                '#F5F5F6',
                                                            color: '#999999'
                                                        }"
                                                        style="width: 100%"
                                                    >
                                                        <!-- <el-table-column
                                                            label="序号"
                                                            width="80"
                                                            type="index"
                                                        >
                                                        </el-table-column> -->
                                                        <el-table-column
                                                            prop="workingDays"
                                                            label="工作日"
                                                            width="130"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-select
                                                                    size="small"
                                                                    @change="
                                                                        currStationChange(
                                                                            scope.row
                                                                        )
                                                                    "
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .workingDays
                                                                    "
                                                                >
                                                                    <el-option
                                                                        v-for="item in WorkingdaysOptions"
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
                                                            prop="firstTimeStart"
                                                            label="第一时段开始"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-time-picker
                                                                    value-format="HH:mm:ss"
                                                                    size="mini"
                                                                    style="
                                                                        width: 150px;
                                                                    "
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .firstTimeStart
                                                                    "
                                                                    placeholder="选择开始时间"
                                                                >
                                                                </el-time-picker>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="firstTimeEnd"
                                                            label="第一时段结束"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-time-picker
                                                                    value-format="HH:mm:ss"
                                                                    size="mini"
                                                                    style="
                                                                        width: 150px;
                                                                    "
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .firstTimeEnd
                                                                    "
                                                                    placeholder="选择结束时间"
                                                                >
                                                                </el-time-picker>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="secondTimeStart"
                                                            label="第二时段开始"
                                                        >
                                                            <template
                                                                slot-scope="scope"
                                                            >
                                                                <el-time-picker
                                                                    value-format="HH:mm:ss"
                                                                    size="mini"
                                                                    style="
                                                                        width: 150px;
                                                                    "
                                                                    v-model="
                                                                        scope
                                                                            .row
                                                                            .secondTimeStart
                                                                    "
                                                                    placeholder="选择开始时间"
                                                                >
                                                                </el-time-picker>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column
                                                            prop="secondTimeEnd"
                                                            label="第二时段结束"
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
                                                                        <el-time-picker
                                                                            value-format="HH:mm:ss"
                                                                            size="mini"
                                                                            style="
                                                                                width: 150px;
                                                                            "
                                                                            v-model="
                                                                                scope
                                                                                    .row
                                                                                    .secondTimeEnd
                                                                            "
                                                                            placeholder="选择结束时间"
                                                                        >
                                                                        </el-time-picker>
                                                                    </div>
                                                                    <div
                                                                        @click="
                                                                            deleteRow(
                                                                                scope.$index,
                                                                                sysAttendanceSchedulingPlanDetails
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
                                <FromCard style="margintop: 20px">
                                    <template slot="title">例外情况</template>
                                    <template>
                                        <div>
                                            <div>
                                                <div class="add">
                                                    <span @click="adddays"
                                                        >添加日期</span
                                                    >
                                                </div>
                                                <div class="content-table">
                                                    <template>
                                                        <el-table
                                                            :data="
                                                                sysAttendanceSchedulingPlanExceptionList
                                                            "
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
                                                                width="60"
                                                                type="index"
                                                            >
                                                            </el-table-column>
                                                            <el-table-column
                                                                prop="dateRange"
                                                                label="日期区间"
                                                                width="162"
                                                            >
                                                                <template
                                                                    slot-scope="scope"
                                                                >
                                                                    <el-date-picker
                                                                        value-format="yyyy-MM-dd HH:mm:ss"
                                                                        v-model="
                                                                            scope
                                                                                .row
                                                                                .dateRange
                                                                        "
                                                                        type="date"
                                                                        size="mini"
                                                                        style="
                                                                            width: 135px;
                                                                        "
                                                                        placeholder="选择日期"
                                                                    >
                                                                    </el-date-picker>
                                                                </template>
                                                            </el-table-column>

                                                            <el-table-column
                                                                prop="type"
                                                                label="类型"
                                                                width="120"
                                                            >
                                                                <template
                                                                    slot-scope="scope"
                                                                >
                                                                    <el-select
                                                                        size="small"
                                                                        v-model="
                                                                            scope
                                                                                .row
                                                                                .type
                                                                        "
                                                                    >
                                                                        <el-option
                                                                            v-for="item in typeOptions"
                                                                            :key="
                                                                                item.value
                                                                            "
                                                                            :label="
                                                                                item.label
                                                                            "
                                                                            :value="
                                                                                item.value
                                                                            "
                                                                        ></el-option>
                                                                    </el-select>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column
                                                                prop="firstTimeStart"
                                                                label="第一时段开始"
                                                                width="162"
                                                            >
                                                                <template
                                                                    slot-scope="scope"
                                                                >
                                                                    <el-time-picker
                                                                        value-format="HH:mm:ss"
                                                                        size="mini"
                                                                        style="
                                                                            width: 120px;
                                                                        "
                                                                        @change="
                                                                            timechange(
                                                                                scope
                                                                            )
                                                                        "
                                                                        v-model="
                                                                            scope
                                                                                .row
                                                                                .firstTimeStart
                                                                        "
                                                                        placeholder="选择开始时间"
                                                                    >
                                                                    </el-time-picker>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column
                                                                prop="firstTimeEnd"
                                                                label="第一时段结束"
                                                                width="162"
                                                            >
                                                                <template
                                                                    slot-scope="scope"
                                                                >
                                                                    <el-time-picker
                                                                        value-format="HH:mm:ss"
                                                                        size="mini"
                                                                        style="
                                                                            width: 120px;
                                                                        "
                                                                        @change="
                                                                            timechange(
                                                                                scope
                                                                            )
                                                                        "
                                                                        v-model="
                                                                            scope
                                                                                .row
                                                                                .firstTimeEnd
                                                                        "
                                                                        placeholder="选择结束时间"
                                                                    >
                                                                    </el-time-picker>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column
                                                                prop="secondTimeStart"
                                                                label="第二时段开始"
                                                                width="162"
                                                            >
                                                                <template
                                                                    slot-scope="scope"
                                                                >
                                                                    <el-time-picker
                                                                        value-format="HH:mm:ss"
                                                                        size="mini"
                                                                        style="
                                                                            width: 120px;
                                                                        "
                                                                        @change="
                                                                            timechange(
                                                                                scope
                                                                            )
                                                                        "
                                                                        v-model="
                                                                            scope
                                                                                .row
                                                                                .secondTimeStart
                                                                        "
                                                                        placeholder="选择开始时间"
                                                                    >
                                                                    </el-time-picker>
                                                                </template>
                                                            </el-table-column>
                                                            <el-table-column
                                                                prop="secondTimeEnd"
                                                                label="第二时段结束"
                                                                width="182"
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
                                                                            <el-time-picker
                                                                                value-format="HH:mm:ss"
                                                                                size="mini"
                                                                                style="
                                                                                    width: 120px;
                                                                                "
                                                                                v-model="
                                                                                    scope
                                                                                        .row
                                                                                        .secondTimeEnd
                                                                                "
                                                                                placeholder="选择结束时间"
                                                                            >
                                                                            </el-time-picker>
                                                                        </div>
                                                                        <div
                                                                            @click="
                                                                                deleteRow(
                                                                                    scope.$index,
                                                                                    sysAttendanceSchedulingPlanExceptionList
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
                                                            <el-table-column
                                                                prop="remakes"
                                                                label="备注"
                                                                width="120"
                                                            >
                                                                <template
                                                                    slot-scope="scope"
                                                                >
                                                                    <el-input
                                                                        v-model="
                                                                            scope
                                                                                .row
                                                                                .remakes
                                                                        "
                                                                        size="mini"
                                                                    ></el-input>
                                                                </template>
                                                            </el-table-column>
                                                        </el-table>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </FromCard>
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
        <div v-show="!handleChangeShow">
            <div class="main details-box" v-if="!handleChangeShow">
                <div class="head-box">
                    <div class="titel">
                        <span>排班明细</span>
                        <button
                            style="marginleft: 50px"
                            class="btn-orange"
                            @click="handleChangeShow = true"
                        >
                            <span> 返回</span>
                        </button>
                    </div>
                    <div class="content">
                        <!-- detailData -->
                        <div class="box-item">
                            <div class="item">
                                <div class="span">
                                    <span>小组名称</span>
                                </div>
                                <div>
                                    <span>{{ detailData.name }}</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="span">
                                    <span>关联小组</span>
                                </div>
                                <div>
                                    <span>{{ detailData.teamName }}</span>
                                </div>
                            </div>
                            <div class="item">
                                <div class="span">
                                    <span>所属部门名称</span>
                                </div>
                                <div>
                                    <span>{{
                                        detailData.organizationName
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <template>
                        <el-table
                            :data="
                                detailData.sysAttendanceSchedulingPlanDetailVoList
                            "
                            style="width: 100%"
                        >
                            <!-- <el-table-column
                                type="index"
                                label="序号"
                                width="80">
                            </el-table-column> -->
                            <el-table-column
                                prop="workingDays"
                                :formatter="dateFormat"
                                label="工作日"
                                width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="firstTimeStart"
                                label="第一时段开始"
                                width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="firstTimeEnd"
                                label="第一时段结束"
                                width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="secondTimeStart"
                                label="第二时段开始"
                                width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="secondTimeEnd"
                                label="第二时段结束"
                                width="130"
                            >
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
                <div class="box">
                    <div>例外情况</div>
                    <template>
                        <el-table
                            :data="
                                detailData.sysAttendanceSchedulingPlanExceptionVOList
                            "
                            style="width: 100%"
                        >
                            <!-- <el-table-column
                                type="index"
                                label="序号"
                                width="80">
                            </el-table-column> -->
                            <el-table-column
                                prop="dateRange"
                                label="日期"
                                width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="firstTimeStart"
                                label="第一时段开始"
                                width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="firstTimeEnd"
                                label="第一时段结束"
                                width="100"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="secondTimeStart"
                                label="第二时段开始"
                                width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="secondTimeEnd"
                                label="第二时段结束"
                                width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                prop="type"
                                label="类型"
                                width="130"
                            >
                            <template slot-scope="scope">
                                <span v-if="scope.row.type===1">休假</span>
                                <span v-else-if="scope.row.type===2">上班</span>
                            </template>
                            </el-table-column>
                            <el-table-column
                                prop="remakes"
                                label="备注"
                                width="130"
                            >
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    attendanceTeamList,
    attendanceSchedulingPlanInsert,
    attendanceSchedulingPlanEnable,
    attendanceSchedulingPlanFindById
} from '@/api/company'
export default {
    inject: ['reload'],
    data() {
        return {
            detailData: {
                name: null,
                teamName: null,
                organizationName: null,
                sysAttendanceSchedulingPlanDetailVoList: [],
                sysAttendanceSchedulingPlanExceptionVOList: []
            },
            handleChangeShow: true,

            typeOptions: [
                { label: '休假', value: 1 },
                { label: '上班', value: 2 }
            ],
            sysAttendanceSchedulingPlanDetails: [],
            sysAttendanceSchedulingPlanExceptionList: [],
            add_vrisible: false,
            addDate: null,
            WorkingdaysOptions: [
                {
                    label: '周日',
                    value: 1
                },
                {
                    label: '周一',
                    value: 2
                },
                {
                    label: '周二',
                    value: 3
                },
                {
                    label: '周三',
                    value: 4
                },
                {
                    label: '周四',
                    value: 5
                },
                {
                    label: '周五',
                    value: 6
                },
                {
                    label: '周六',
                    value: 7
                }
            ],
            addForm: {
                ruleForm: {
                    name: null,
                    teamId: null,
                    status: 2
                },
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入名称',
                            trigger: 'blur'
                        },
                    ],
                     teamId: [
                        {
                            required: true,
                            message: '请选择小组',
                            trigger: 'blur'
                        },
                    ],
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '计划名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Select',
                        label: '考勤小组',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'teamId',
                        options: []
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
                    { label: '计划名称', prop: 'name', width: 'auto' },
                    {
                        label: '考勤小组名称',
                        prop: 'teamName',
                        width: 'auto'
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '启用'
                                    break
                                case 2:
                                    return '停用'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '所属部门名称',
                        prop: 'organizationName',
                        width: 'auto'
                    },
                    {
                        label: '创建时间',
                        prop: 'createDate',
                        width: 'auto'
                    },
                    {
                        label: '创建人名称',
                        prop: 'createName',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'attendanceSchedulingPlanList',
                search_item: [
                    {
                        type: 'Input',
                        label: '计划名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'select',
                        label: '状态',
                        placeholder: '请输入',
                        prop: 'status',
                        options: [
                            { label: '启用', value: 1 },
                            { label: '停用', value: 2 }
                        ]
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
        addWorkingdays() {
            this.sysAttendanceSchedulingPlanDetails.push({
                workingDays: null,
                firstTimeStart: null,
                firstTimeEnd: null,
                secondTimeStart: null,
                secondTimeEnd: null
            })
        },
        adddays() {
            this.sysAttendanceSchedulingPlanExceptionList.push({
                dateRange: null,
                remakes: null,
                type: null,
                firstTimeStart: null,
                firstTimeEnd: null,
                secondTimeStart: null,
                secondTimeEnd: null
            })
        },
        add() {
            this.addForm.form_item[1].options = []
            this.add_vrisible = true
            attendanceTeamList().then((res) => {
                console.log(res.tableList)
                res.tableList &&
                    res.tableList.forEach((element) => {
                        let obj = {
                            value: element.id,
                            label: element.name
                        }
                        this.addForm.form_item[1].options.push(obj)
                    })
            })
        },
        deleteRow(index, rows) {
            rows.splice(index, 1)
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addSubmit(){
            this.$refs.addForm.submitForm()

        },
        addRuleSuccess() {
            console.log(this.sysAttendanceSchedulingPlanDetails)
            console.log(this.sysAttendanceSchedulingPlanExceptionList)
            let resData = {
                name: this.addForm.ruleForm.name,
                teamId: this.addForm.ruleForm.teamId,
                status: this.addForm.ruleForm.status,
                sysAttendanceSchedulingPlanDetails:
                    this.sysAttendanceSchedulingPlanDetails,
                sysAttendanceSchedulingPlanExceptionList:
                    this.sysAttendanceSchedulingPlanExceptionList
            }
            console.log(resData)
            // return
            attendanceSchedulingPlanInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.requestData()
                    this.add_vrisible = false
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },
        dateFormat(row,col){
            switch (row.workingDays) {
                case 1:
                    return '周日'
                    break;
                case 2:
                    return '周一'
                    break;
                case 3:
                    return '周二'
                    break;
                case 4:
                    return '周三'
                    break;
                case 5:
                    return '周四'
                    break;
                case 6:
                    return '周五'
                    break;
                case 7:
                    return '周六'
                    break;
                default:
                    break;
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

        // 物资种类更换获取现存量，单位
        currStationChange(a) {
            console.log(a)
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
        },
        enable(data) {
            if (data.length != 1) {
                this.$message({ message: '请选择一条数据开启', type: 'error' })
            }
            attendanceSchedulingPlanEnable({ id: data[0].id }).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.requestData()
                    this.add_vrisible = false
                } else {
                    this.$message({
                        message: res.message,
                        type: 'error'
                    })
                }
            })
        },
        detail(data) {
            if (data.length != 1) {
                this.$message({ type: 'error', message: '请选择一条数据查看' })
            } else {
                this.handleChangeShow = false
                attendanceSchedulingPlanFindById({ id: data[0].id }).then(
                    (res) => {
                        console.log(res.data)
                        let detaildata = res.data
                        this.detailData.name = detaildata.name
                        this.detailData.teamName = detaildata.teamName
                        this.detailData.organizationName =
                            detaildata.organizationName
                        this.detailData.sysAttendanceSchedulingPlanDetailVoList =
                            detaildata.sysAttendanceSchedulingPlanDetailVoList
                        this.detailData.sysAttendanceSchedulingPlanExceptionVOList =
                            detaildata.sysAttendanceSchedulingPlanExceptionVOList
                        console.log(this.detailData)
                    }
                )
            }
        }
        // edit(data){
        //     if(data.length!=1){
        //         this.$message({type:'error',message:'请选择一条数据修改'})
        //     }else{

        //     }
        // },
    },
    watch: {}
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
// /deep/ .el-table_body{
//     border-collapse:separate;
//     border-spacing:0 6px;
//     table-layout: auto !important;
// }
</style>
