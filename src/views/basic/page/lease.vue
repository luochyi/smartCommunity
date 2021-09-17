<template>
    <div>
        <div class="main-content">
            <div class="main-titel">
                <span>租赁管理</span>
            </div>
            <div class="content">
                <div class="content-btn">
                    <el-button
                        class="init-button"
                        @click="add()"
                        icon="el-icon-plus"
                        >新增租赁信息</el-button
                    >
                </div>
                <div style="width: 50px">
                    <download-excel
                        class="export-excel-wrapper"
                        :fetch="fetchData"
                        :fields="json_fields"
                        :before-finish="finishDownload"
                        name="租赁管理.xls"
                    >
                        <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                        <el-button size="mini" icon="el-icon-folder-add" plain
                            >导出Excel</el-button
                        >
                    </download-excel>
                </div>
                <div class="">
                    <VueTable
                        ref="table"
                        :config="config"
                        @tableCheck="tableCheck"
                    >
                        <!-- 过滤租赁时间 只显示年月日 -->
                        <template v-slot:leaseDateStart="slotData">
                            <div>
                                {{ slotData.data.leaseDateStart | capitalize }}
                            </div>
                        </template>
                        <template v-slot:leaseDateEnd="slotData">
                            <div>
                                {{ slotData.data.leaseDateEnd | capitalize }}
                            </div>
                        </template>
                        <!-- <template slot="tabs">
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
                        </template> -->
                        <template slot="footer">
                            <div class="table-footer">
                                <button @click="edit(table_row)">编辑</button>
                                <button @click="audit(table_row)">签署合同审核</button>
                                <button @click="end(table_row)">合同终止审核</button>
                                <button @click="refund(table_row)">保证金退还审核</button>
                                <button @click="renewal(table_row)">续签</button>
                                <button @click="alter(table_row)">变更</button>
                                <button @click="del(table_row)">删除</button>
                            </div>
                        </template>
                    </VueTable>
                </div>
                <!--审核签署合同内容-->
                <el-dialog
                    title="审核签署合同内容"
                    width="480px"
                    top="40vh"
                    @close="dialogclose()"
                    :visible.sync="auditDialog"
                >
                    <div class="dialang-box">
                        <el-select
                            v-model="optionsVal"
                            placeholder="请选择办理状态"
                            size="small"
                            style="padding-bottom: 20px"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-input
                            placeholder="请输入审核备注"
                            size="mini"
                            type="textarea"
                            v-model="auditRemake"
                            style="width: 423px; height: 32px"
                        ></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="auditDialog = false"
                            >取 消</el-button
                        >
                        <el-button size="mini" type="primary" @click="auditOk()"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
                 <!--终止合同-->
                <el-dialog
                    title="审核终止合同申请"
                    width="480px"
                    top="40vh"
                    @close="dialogclose()"
                    :visible.sync="endDialog"
                >
                    <div class="dialang-box">
                        <el-select
                            v-model="optionsVal"
                            placeholder="请选择办理状态"
                            size="small"
                            style="padding-bottom: 20px"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <div style="marginBottom:10px">不再计租时间：{{notMeterRentDate}}</div>
                        <div>剩余需结清房租（元）：{{requiredRent}}</div>
                        <!-- <el-input
                            placeholder="请输入审核备注"
                            size="mini"
                            type="textarea"
                            v-model="auditRemake"
                            style="width: 423px; height: 32px"
                        ></el-input> -->
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="auditDialog = false"
                            >取 消</el-button
                        >
                        <el-button size="mini" type="primary" @click="endOk()"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
                 <!--reviewDepositRefundApplication保证金退还-->
                <el-dialog
                    title="审核保证金退还申请"
                    width="480px"
                    top="40vh"
                    @close="dialogclose()"
                    :visible.sync="refundDialog"
                >
                    <div class="dialang-box">
                        <el-select
                            v-model="optionsVal"
                            placeholder="请选择办理状态"
                            size="small"
                            style="padding-bottom: 20px"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-input
                            placeholder="请输入审核备注"
                            size="mini"
                            type="textarea"
                            v-model="depositRefundReviewRemake"
                            style="width: 423px; height: 32px"
                        ></el-input>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="refundDialog = false"
                            >取 消</el-button
                        >
                        <el-button size="mini" type="primary" @click="refundOk()"
                            >确 定</el-button
                        >
                    </span>
                </el-dialog>
                <!-- 新增 -->
                <Drawer
                    :drawerTitle="drawerTitle"
                    @drawerClose="addClose"
                    :drawerVrisible="add_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">租赁信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm" @ruleSuccess="addRuleSuccess">
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
                                            @change="buildchange(buildValue)"
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
                                            @change="unitchange(unitValue)"
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
                <!-- 续签 变更 -->
                <Drawer
                    :drawerTitle="nextdrawerTitle"
                    @drawerClose="nextClose"
                    :drawerVrisible="next_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">租赁信息</template>
                            <template>
                                <VueForm ref="nextForm" :formObj="nextForm">
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
                                            @change="buildchange(buildValue)"
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
                                            @change="unitchange(unitValue)"
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
                                            v-model="hourValue"
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
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-orange" @click="nextSubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="nextClose">
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
    leaseInsert,
    leaseUpdate,
    leaseFindById,
    leaseRenew,
    cpmBuildingUnitFindAll,
    findByBuildingUnitId,
    findByBuildingId,
    UnitEstateFindById,
    leaseReviewer,
    reviewTerminationApplication,
    reviewDepositRefundApplication //reviewDepositRefundApplication保证金退还
} from '@/api/basic'
// import func from 'vue-editor-bridge'
export default {
    data() {
        return {
            notMeterRentDate:null,
            requiredRent:null,
            thatId: null,
            options: [
                {
                    value: '4',
                    label: '驳回'
                },
                {
                    value: '5',
                    label: '通过'
                }
            ],
            auditDialog: false,
            endDialog: false,
            refundDialog: false,
            optionsVal: null,
            depositRefundReviewRemake:null,
            auditRemake: null,
            drawerTitle: null,
            add_vrisible: false,
            nextdrawerTitle: null,
            next_vrisible: false,
            // 楼栋
            buildValue: null,
            buildOptions: [],
            // 单元
            unitValue: null,
            unitOptions: [],
            // 房屋
            hoursValue: null,
            hourValue:null,
            hoursOptions: [],
            addDate: null,
            loading: false,
            leaseParentId:null,
            addForm: {
                ruleForm: {
                    id: null,
                    code: null,
                    name: null,
                    sex: null,
                    idCard: null,
                    tel: null,
                    estateId: null,
                    type: null,
                    estateType: null,
                    estateStructure: null,
                    constructionArea: null,
                    indoorArea: null,
                    rentStandard: null,
                    margin: null,
                    leaseDateStart: null,
                    leaseDateEnd: null,

                },
                rules: {
                  // 表单必填
                  code: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  name: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  sex: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  idCard: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  tel: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  estateId: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  type: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  estateType: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  estateStructure: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  constructionArea: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  indoorArea: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  rentStandard: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  margin: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  leaseDateStart: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  leaseDateEnd: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '合同编号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '租户名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Select',
                        label: '性别',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'sex',
                        options: [
                            {
                                value: 1,
                                label: '男'
                            },
                            {
                                value: 2,
                                label: '女'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '身份证号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'idCard'
                    },
                    {
                        type: 'Int',
                        label: '手机号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'tel'
                    },
                    {
                        type: 'Slot',
                        label: '房屋信息',
                        placeholder: '请输入',
                        width: '70%',
                        slotName: 'hours',
                        prop: 'estateId'
                    },
                    {
                        type: 'Select',
                        label: '人才类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '一类人才'
                            },
                            {
                                value: 2,
                                label: '二类人才'
                            },
                            {
                                value: 3,
                                label: '三类人才'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '房屋户型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'estateType'
                    },
                    {
                        type: 'Input',
                        label: '房屋结构',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'estateStructure'
                    },
                    {
                        type: 'Input',
                        label: '建筑面积',
                        placeholder: '请选择房屋信息',
                        width: '50%',
                        prop: 'constructionArea',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '使用面积（室内面积）',
                        placeholder: '请选择房屋信息',
                        width: '50%',
                        prop: 'indoorArea',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '租金标准/月',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'rentStandard'
                    },
                    {
                        type: 'Input',
                        label: '保证金',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'margin'
                    },
                    {
                        type: 'DateTime',
                        label: '租赁开始时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'leaseDateStart'
                    },
                    {
                        type: 'DateTime',
                        label: '租赁结束时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'leaseDateEnd'
                    }
                ]
            },
            nextForm: {
                ruleForm: {
                    code: null,
                    name: null,
                    sex: null,
                    idCard: null,
                    tel: null,
                    estateId: null,
                    type: null,
                    estateType: null,
                    estateStructure: null,
                    constructionArea: null,
                    indoorArea: null,
                    rentStandard: null,
                    margin: null,
                    leaseDateStart: null,
                    leaseDateEnd: null,

                    emergencyContact:null,
                    emergencyContactNumber:null,
                    correspondenceAddress:null,
                    workUnits:null,
                    payBank:null,
                    bankAccountName:null,
                    bankAccount:null,
                    idCardFrontImgOldUrl:[],
                    idCardBackImgOldUrl:[],
                    idCardFrontImgNewUrl:[],
                    idCardBackImgNewUrl:[],
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '合同编号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'code'
                    },
                    {
                        type: 'Input',
                        label: '租户名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'Select',
                        label: '性别',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'sex',
                        options: [
                            {
                                value: 1,
                                label: '男'
                            },
                            {
                                value: 2,
                                label: '女'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '身份证号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'idCard'
                    },
                    {
                        type: 'Int',
                        label: '手机号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'tel'
                    },
                    {
                        type: 'Slot',
                        label: '房屋信息',
                        placeholder: '请输入',
                        width: '70%',
                        slotName: 'hours',
                        prop: 'estateId'
                    },
                    {
                        type: 'Select',
                        label: '人才类型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '一类人才'
                            },
                            {
                                value: 2,
                                label: '二类人才'
                            },
                            {
                                value: 3,
                                label: '三类人才'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '房屋户型',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'estateType'
                    },
                    {
                        type: 'Input',
                        label: '房屋结构',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'estateStructure'
                    },
                    {
                        type: 'Input',
                        label: '建筑面积',
                        placeholder: '请选择房屋信息',
                        width: '50%',
                        prop: 'constructionArea',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '使用面积（室内面积）',
                        placeholder: '请选择房屋信息',
                        width: '50%',
                        prop: 'indoorArea',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '租金标准/月',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'rentStandard'
                    },
                    {
                        type: 'Input',
                        label: '保证金',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'margin'
                    },
                    {
                        type: 'DateTime',
                        label: '租赁开始时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'leaseDateStart'
                    },
                    {
                        type: 'DateTime',
                        label: '租赁结束时间',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'leaseDateEnd'
                    },
                    {
                        type: 'Input',
                        label: '紧急联系人',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'emergencyContact'
                    },
                    {
                        type: 'Input',
                        label: '紧急联系人电话',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'emergencyContactNumber'
                    },

                    {
                        type: 'Input',
                        label: '通讯地址',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'correspondenceAddress'
                    },
                    {
                        type: 'Input',
                        label: '工作单位',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'workUnits'
                    },
                    {
                        type: 'Input',
                        label: '代缴银行',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'payBank'
                    },
                    {
                        type: 'Input',
                        label: '代缴银行账户名',
                        placeholder: '请选择',
                        width: '50%',
                        prop: 'bankAccountName'
                    },
                    {
                        type: 'Input',
                        label: '代缴银行账户',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'bankAccount'
                    },
                    // {
                    //     type: 'Input',
                    //     label: '身份证照正面照片原路径',
                    //     placeholder: '请输入',
                    //     width: '50%',
                    //     prop: 'idCardFrontImgOldUrl'
                    // },
                    // {
                    //     type: 'Input',
                    //     label: '身份证照正面照片原路径',
                    //     placeholder: '请输入',
                    //     width: '50%',
                    //     prop: 'idCardBackImgOldUrl'
                    // },
                    // {
                    //     type: 'Input',
                    //     label: '身份证照正面照片新路径',
                    //     placeholder: '请输入',
                    //     width: '50%',
                    //     prop: 'idCardFrontImgNewUrl'
                    // },
                    // {
                    //     type: 'Input',
                    //     label: '身份证照正面照片新路径',
                    //     placeholder: '请输入',
                    //     width: '50%',
                    //     prop: 'idCardBackImgNewUrl'
                    // },

                ]
            },
            table_row: [],
            json_fields: {
                合同编号: 'code',
                租户姓名: 'name',
                性别: {
                    field:"sex",
                     callback: (value) => {
                        switch (value) {
                            case 1:
                                return '男'
                                break
                            default:
                                return '女'
                        }
                    }

                },
                身份证号: 'idCard',
                房产名称: 'roomName',
                人才类型: {
                    field:"type",
                     callback: (value) => {
                        switch (value) {
                            case 1:
                                return '一类人才'
                                break
                            case 2:
                                return '二类人才'
                                break
                            default:
                                return '三类人才'
                        }
                    }

                },
                房屋户型: 'estateType',
                '租金标准/月': 'rentStandard',
                保证金: 'margin',
                租赁开始时间: 'leaseDateStart',
                租赁结束时间: 'leaseDateEnd',
                办理状态: {
                    field:"status",
                     callback: (value) => {
                        switch (value) {
                            case 1:
                                    return '待签署'
                                    break
                                case 2:
                                    return '待提交'
                                    break
                                case 3:
                                    return '审核中'
                                    break
                                case 4:
                                    return '已驳回'
                                    break
                                case 5:
                                    return '待支付'
                                    break
                                case 6:
                                    return '已完成'
                                    break
                                case 11:
                                    return '申请终止合同'
                                    break
                                case 12:
                                    return '申请终止失败'
                                    break
                                case 13:
                                    return '申请终止成功'
                                    break
                                case 14:
                                    return '已支付剩余租金'
                                    break
                                case 15:
                                    return '申请退还保证金'
                                    break
                                case 16:
                                    return '申请退还保证金驳回'
                                    break
                                case 17:
                                    return '申请退还保证金成功'
                                    break
                                default:
                                    break
                        }
                    }

                },
                审核人姓名: 'reviewerName',
                审核时间: 'auditDate',
                创建人姓名: 'createName',
                创建时间: 'createDate'
            },
            activeName: '0',
            config: {
                thead: [
                    {
                        label: '序号',
                        type: 'index',
                        width: '80'
                    },
                    {
                        label: '合同编号',
                        prop: 'code',
                        width: '170'
                    },
                    {
                        label: '租户姓名',
                        prop: 'name',
                        width: '80'
                    },
                    {
                        label: '性别',
                        prop: 'sex',
                        width: '80',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.sex == 1) {
                                return '男'
                            } else {
                                return '女'
                            }
                        }
                    },
                    {
                        label: '身份证号',
                        prop: 'idCard',
                        width: '180'
                    },
                    {
                        label: '房产名称',
                        prop: 'roomName',
                        width: '150'
                    },
                    {
                        label: '人才类型',
                        prop: 'type',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            if (row.type == 1) {
                                return '一类人才'
                            } else if (row.type == 2) {
                                return '二类人才'
                            } else {
                                return '三类人才'
                            }
                        }
                    },
                    {
                        label: '房屋户型',
                        prop: 'estateType',
                        width: 'auto'
                    },
                    {
                        label: '租金标准/月',
                        prop: 'rentStandard',
                        width: 'auto'
                    },
                    {
                        label: '保证金',
                        prop: 'margin',
                        width: 'auto'
                    },
                    {
                        label: '租赁开始时间',
                        prop: 'leaseDateStart',
                        width: '150',
                        type: 'slot',
                        slotName: 'leaseDateStart'
                    },
                    {
                        label: '租赁结束时间',
                        prop: 'leaseDateEnd',
                        width: '150',
                        type: 'slot',
                        slotName: 'leaseDateEnd'
                    },
                    {
                        label: '办理状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '待签署'
                                    break
                                case 2:
                                    return '待提交'
                                    break
                                case 3:
                                    return '审核中'
                                    break
                                case 4:
                                    return '已驳回'
                                    break
                                case 5:
                                    return '待支付'
                                    break
                                case 6:
                                    return '已完成'
                                    break
                                case 11:
                                    return '申请终止合同'
                                    break
                                case 12:
                                    return '申请终止失败'
                                    break
                                case 13:
                                    return '申请终止成功'
                                    break
                                case 14:
                                    return '已支付剩余租金'
                                    break
                                case 15:
                                    return '申请退还保证金'
                                    break
                                case 16:
                                    return '申请退还保证金驳回'
                                    break
                                case 17:
                                    return '申请退还保证金成功'
                                    break
                                default:
                                    break
                            }
                        }
                    },
                    {
                        label: '审核人姓名',
                        prop: 'reviewerName',
                        width: 'auto'
                    },
                    {
                        label: '审核时间',
                        prop: 'auditDate',
                        width: 'auto'
                    },
                    {
                        label: '创建人姓名',
                        prop: 'createName',
                        width: 'auto'
                    },
                    {
                        label: '创建时间',
                        prop: 'createDate',
                        width: 'auto'
                    }
                ],
                table_data: [],
                url: 'leaseList',
                search_item: [
                    {
                        type: 'Input',
                        label: '租户姓名',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '身份证号',
                        placeholder: '请输入',
                        prop: 'idCard'
                    },
                    {
                        type: 'Int',
                        label: '手机号',
                        placeholder: '请输入',
                        prop: 'tel'
                    },
                    {
                        type: 'select',
                        label: '人才类型',
                        placeholder: '请输入',
                        prop: 'type',
                        options: [
                            {
                                value: 1,
                                label: '一类人才'
                            },
                            {
                                value: 2,
                                label: '二类人才'
                            },
                            {
                                value: 3,
                                label: '三类人才'
                            }
                        ]
                    },
                    {
                        type: 'select',
                        label: '办理状态',
                        placeholder: '请输入',
                        prop: 'status',
                        options: [
                            {
                                value: 1,
                                label: '待签署'
                            },
                            {
                                value: 2,
                                label: '待提交'
                            },
                            {
                                value: 3,
                                label: '审核中'
                            },
                            {
                                value: 4,
                                label: '已驳回'
                            },
                            {
                                value: 5,
                                label: '待支付'
                            },
                            {
                                value: 6,
                                label: '已完成'
                            }
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
    mounted() {
        // 弹窗内下拉框
        cpmBuildingUnitFindAll().then((res) => {
            this.buildOptions = res
        })
    },
    methods: {
        // 楼栋变化
        buildchange(data) {
            console.log(data)
            this.unitData(data)
            this.unitValue = null
            this.hoursValue = null
            this.hourValue = null
        },
        // 单元变化
        unitchange(data) {
            this.hoursData(data)
            this.hoursValue = null
            this.hourValue = null
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
        // Excel导出
        async fetchData() {
            let Excel = []
            let params = {
                url: 'leaseList',
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
        // 续签   父类租赁主键id 正整数代表是续签租赁
        renewal(data){
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条信息操作'
                })
                return
            }
             leaseFindById({ id: data[0].id }).then((res) => {
                    console.log(res)
                    // 赋值
                    this.nextForm.ruleForm.id = res.data.id
                    this.nextForm.ruleForm.code = res.data.code
                    this.nextForm.ruleForm.name = res.data.name
                    this.nextForm.ruleForm.sex = res.data.sex
                    this.nextForm.ruleForm.idCard = res.data.idCard
                    this.nextForm.ruleForm.tel = res.data.tel
                    this.nextForm.ruleForm.type = res.data.type
                    this.nextForm.ruleForm.estateType = res.data.estateType
                    this.nextForm.ruleForm.estateStructure =
                        res.data.estateStructure
                    this.nextForm.ruleForm.constructionArea =
                        res.data.constructionArea
                    this.nextForm.ruleForm.indoorArea = res.data.indoorArea
                    this.nextForm.ruleForm.rentStandard = res.data.rentStandard
                    this.nextForm.ruleForm.margin = res.data.margin
                    this.nextForm.ruleForm.leaseDateStart =
                        res.data.leaseDateStart
                    this.nextForm.ruleForm.leaseDateEnd = res.data.leaseDateEnd

                    this.nextForm.ruleForm.emergencyContact = res.data.emergencyContact
                    this.nextForm.ruleForm.emergencyContactNumber = res.data.emergencyContactNumber
                    this.nextForm.ruleForm.correspondenceAddress = res.data.correspondenceAddress
                    this.nextForm.ruleForm.workUnits = res.data.workUnits
                    this.nextForm.ruleForm.payBank = res.data.payBank
                    this.nextForm.ruleForm.correspondenceAddress = res.data.correspondenceAddress
                    this.nextForm.ruleForm.workUnits = res.data.workUnits
                    this.nextForm.ruleForm.payBank = res.data.payBank
                    this.nextForm.ruleForm.bankAccountName = res.data.bankAccountName
                    this.nextForm.ruleForm.bankAccount = res.data.bankAccount
                    this.nextForm.ruleForm.idCardFrontImgOldUrl.push(res.data.idCardFrontFiles[0].url)
                    this.nextForm.ruleForm.idCardBackImgOldUrl.push(res.data.idCardBackFiles[0].url)

                    //房产信息
                    this.buildValue = res.data.buildingId
                    this.unitValue = res.data.unitId
                    this.hourValue = res.data.estateId
                    // 修改drawer
                    this.next_vrisible = true
                    this.nextdrawerTitle = '续签'
                    // 修改 parentid
                    this.leaseParentId = data[0].id
                })
        },
        // 变更  父类租赁主键id 负整数代表是续签租赁
        alter(data){
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条信息操作'
                })
                return
            }
            leaseFindById({ id: data[0].id }).then((res) => {
                    console.log(res)
                    // 赋值
                    this.nextForm.ruleForm.id = res.data.id
                    this.nextForm.ruleForm.code = res.data.code
                    this.nextForm.ruleForm.name = res.data.name
                    this.nextForm.ruleForm.sex = res.data.sex
                    this.nextForm.ruleForm.idCard = res.data.idCard
                    this.nextForm.ruleForm.tel = res.data.tel
                    this.nextForm.ruleForm.type = res.data.type
                    this.nextForm.ruleForm.estateType = res.data.estateType
                    this.nextForm.ruleForm.estateStructure =
                        res.data.estateStructure
                    this.nextForm.ruleForm.constructionArea =
                        res.data.constructionArea
                    this.nextForm.ruleForm.indoorArea = res.data.indoorArea
                    this.nextForm.ruleForm.rentStandard = res.data.rentStandard
                    this.nextForm.ruleForm.margin = res.data.margin
                    this.nextForm.ruleForm.leaseDateStart =
                        res.data.leaseDateStart
                    this.nextForm.ruleForm.leaseDateEnd = res.data.leaseDateEnd

                    this.nextForm.ruleForm.emergencyContact = res.data.emergencyContact
                    this.nextForm.ruleForm.emergencyContactNumber = res.data.emergencyContactNumber
                    this.nextForm.ruleForm.correspondenceAddress = res.data.correspondenceAddress
                    this.nextForm.ruleForm.workUnits = res.data.workUnits
                    this.nextForm.ruleForm.payBank = res.data.payBank
                    this.nextForm.ruleForm.correspondenceAddress = res.data.correspondenceAddress
                    this.nextForm.ruleForm.workUnits = res.data.workUnits
                    this.nextForm.ruleForm.payBank = res.data.payBank
                    this.nextForm.ruleForm.bankAccountName = res.data.bankAccountName
                    this.nextForm.ruleForm.bankAccount = res.data.bankAccount
                    this.nextForm.ruleForm.idCardFrontImgOldUrl.push(res.data.idCardFrontFiles[0].url)
                    this.nextForm.ruleForm.idCardBackImgOldUrl.push(res.data.idCardBackFiles[0].url)

                    //房产信息
                    this.buildValue = res.data.buildingId
                    this.unitValue = res.data.unitId
                    this.hourValue = res.data.estateId
                    // 修改drawer
                    this.next_vrisible = true
                    this.nextdrawerTitle = '变更'
                    // 修改 parentid
                    this.leaseParentId = - data[0].id
                })
        },
        nextSubmit(){
            let resData = {
                ...this.nextForm.ruleForm,
                leaseParentId :this.leaseParentId
            }
            console.log(resData);
            leaseRenew(resData).then(res=>{
                if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                        this.nextClose()
                    }
            })
        },
        end(data){
            /**
             *  notMeterRentDate  不再计租时间
                requiredRent  需结清房租
             */
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条信息审核'
                })
                return
            }
            //只有审核中才能审核
            if (data[0].status != 11) {
                this.$message({
                    type: 'error',
                    message: '该状态不可审核'
                })
                return
            }
            leaseFindById({id:data[0].id}).then(res=>{
                console.log(res);
                this.notMeterRentDate = res.data.notMeterRentDate
                this.requiredRent = res.data.requiredRent
                console.log(this.notMeterRentDate);
                this.options = []
                this.options = [
                    {
                    value: '12',
                    label: '申请终止驳回'
                },
                {
                    value: '13',
                    label: '申请终止通过'
                }
                ]

                 this.thatId = data[0].id
            })
            this.endDialog = true
        },
        refund(data){
            /**
             *  notMeterRentDate  不再计租时间
                requiredRent  需结清房租
             */
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条信息审核'
                })
                return
            }
            //只有审核中才能审核
            if (data[0].status != 15) {
                this.$message({
                    type: 'error',
                    message: '该状态不可审核'
                })
                return
            }
            this.thatId = data[0].id
            this.options=[]
            this.options = [
                {
                     value: '16',
                    label: '申请退还保证金驳回'
                },
                {
                     value: '17',
                    label: '申请退还保证金成功'
                }
            ]
            this.refundDialog = true
        },
        //审核
        audit(data) {
            if (data.length != 1) {
                this.$message({
                    type: 'error',
                    message: '请选择一条信息审核'
                })
                return
            }
            //只有审核中才能审核
            if (data[0].status != 3) {
                this.$message({
                    type: 'error',
                    message: '该状态不可审核'
                })
                return
            }
            this.auditDialog = true
            console.log(data)
            this.thatId = data[0].id
        },
        endOk(){
             let resData = {
                id: this.thatId,
                status: this.optionsVal,
                notMeterRentDate:this.notMeterRentDate,
                requiredRent:this.requiredRent
            }
            console.log(resData)
            // return
            reviewTerminationApplication(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                }
            })
            this.endDialog = false
            this.thatId = null
            this.optionsVal = null
            this.$refs.table.loadData()
        },
        // 审核提交
        auditOk() {
            let resData = {
                id: this.thatId,
                status: this.optionsVal,
                auditRemake: this.auditRemake
            }
            console.log(resData)
            leaseReviewer(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                }
            })
            this.auditDialog = false
            this.thatId = null
            this.optionsVal = null
            this.rejectReason = null
            this.$refs.table.loadData()
        },
        // 审核提交
        refundOk() {
            let resData = {
                id: this.thatId,
                status: this.optionsVal,
                depositRefundReviewRemake: this.depositRefundReviewRemake
            }
            console.log(resData)
            reviewDepositRefundApplication(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                }
            })
            this.refundDialog = false
            this.thatId = null
            this.optionsVal = null
            this.depositRefundReviewRemake = null
            this.$refs.table.loadData()
        },
        // 关闭审核框
        dialogclose() {},
        // 新增
        add() {
            this.drawerTitle = '新增租赁信息'
            this.add_vrisible = true
            // this.getUserList()
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.buildValue = null
            this.unitValue = null
            this.hoursValue = null
        },
        nextClose() {
            this.$refs.nextForm.reset()
            this.next_vrisible = false
            this.buildValue = null
            this.unitValue = null
            this.hourValue = null
            this.leaseParentId = null
        },
        addRuleSuccess() {
          if (this.drawerTitle == '新增租赁信息') {
            let resData = {
              ...this.addForm.ruleForm,
              leaseParentId:0
            }
            leaseInsert(resData).then((res) => {
              if (res.status) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.$refs.table.loadData()
                this.addClose()
              }
            })
          } else if (this.drawerTitle == '修改租赁信息') {
            let resData = {
              id: this.addForm.ruleForm.id,
              ...this.addForm.ruleForm
            }
            leaseUpdate(resData).then((res) => {
              if (res.status) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.$refs.table.loadData()
                this.addClose()
              }
            })
          }
        },
        addSubmit() {
          this.$refs.addForm.submitForm()
        },
        edit(data) {
            if (data.length != 1) {
                this.$message({
                    message: '请选择一条信息进行修改',
                    type: 'error'
                })
            } else {
                leaseFindById({ id: data[0].id }).then((res) => {
                    console.log(res)
                    // 赋值
                    this.addForm.ruleForm.id = res.data.id
                    this.addForm.ruleForm.code = res.data.code
                    this.addForm.ruleForm.name = res.data.name
                    this.addForm.ruleForm.sex = res.data.sex
                    this.addForm.ruleForm.idCard = res.data.idCard
                    this.addForm.ruleForm.tel = res.data.tel
                    this.addForm.ruleForm.type = res.data.type
                    this.addForm.ruleForm.estateType = res.data.estateType
                    this.addForm.ruleForm.estateStructure =
                        res.data.estateStructure
                    this.addForm.ruleForm.constructionArea =
                        res.data.constructionArea
                    this.addForm.ruleForm.indoorArea = res.data.indoorArea
                    this.addForm.ruleForm.rentStandard = res.data.rentStandard
                    this.addForm.ruleForm.margin = res.data.margin
                    this.addForm.ruleForm.leaseDateStart =
                        res.data.leaseDateStart
                    this.addForm.ruleForm.leaseDateEnd = res.data.leaseDateEnd
                    //房产信息
                    this.buildValue = res.data.buildingId
                    this.unitValue = res.data.unitId
                    this.hoursValue = res.data.estateId
                    // 修改drawer
                    this.add_vrisible = true
                    this.drawerTitle = '修改租赁信息'
                })
            }
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
    },
    // 监听
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
                this.addForm.ruleForm.estateId = newValue
                console.log(this.addForm.ruleForm.estateId)
                UnitEstateFindById({ id: newValue }).then((res) => {
                    console.log(res.cpmBuildingUnitEstate)
                    if (res.cpmBuildingUnitEstate) {
                        this.addForm.ruleForm.constructionArea =
                            res.cpmBuildingUnitEstate.constructionArea
                        this.addForm.ruleForm.indoorArea =
                            res.cpmBuildingUnitEstate.indoorArea
                    }
                })
            },
            deep: true
        },
        hourValue: {
            handler(newValue) {
                this.nextForm.ruleForm.estateId = newValue
                console.log(this.nextForm.ruleForm.estateId)
                UnitEstateFindById({ id: newValue }).then((res) => {
                    console.log(res.cpmBuildingUnitEstate)
                    if (res.cpmBuildingUnitEstate) {
                        this.nextForm.ruleForm.constructionArea =
                            res.cpmBuildingUnitEstate.constructionArea
                        this.nextForm.ruleForm.indoorArea =
                            res.cpmBuildingUnitEstate.indoorArea
                    }
                })
            },
            deep: true
        }
    },
    //过滤租赁时间 只显示年月日
    filters: {
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.substring(0, 10)
        }
    }
}
</script>
