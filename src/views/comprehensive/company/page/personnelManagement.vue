<template>
    <div class="bg">
        <div class="main-content comprehensive">
            <div class="main-titel">
                <span>员工管理</span>
            </div>
            <div class="content" style="display: flex">
                <div class="orgLeft">
                    <div class="org-search">
                        <el-input placeholder="请输入内容" v-model="filterText">
                        </el-input>
                    </div>
                    <el-tree
                        class="filter-tree"
                        :data="organizationData"
                        :expand-on-click-node="false"
                        :highlight-current="true"
                        :props="defaultProps"
                        @node-click="organizationChange"
                        default-expand-all
                        :filter-node-method="filterNode"
                        ref="tree"
                    >
                    </el-tree>
                </div>
                <div class="orgRight content">
                    <div
                        class="flex justify-between"
                        style="padding-bottom: 20px"
                    >
                        <div
                            class="flex align-center justify-between"
                            style="flex: 5"
                        >
                            <div>
                                <span>昵称：</span>
                                <el-input
                                    placeholder="请输入内容"
                                    size="small"
                                    style="width: 240px"
                                    v-model="nickName"
                                >
                                </el-input>
                            </div>
                            <div>
                                <span>状态：</span>
                                <el-select
                                    v-model="status"
                                    size="mini"
                                    placeholder="请选择"
                                    style="width: 240px"
                                >
                                    <el-option
                                        v-for="item in statusOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div
                            class="flex align-center justify-center"
                            style="flex: 2"
                        >
                            <el-button
                                size="small"
                                @click="search()"
                                type="primary"
                                >查询</el-button
                            >
                            <el-button @click="reset()" size="small"
                                >重置</el-button
                            >
                        </div>
                        <div>
                            <el-button
                                size="small"
                                @click="addPerson()"
                                type="primary"
                                >新建员工</el-button
                            >
                            <el-button
                                size="small"
                                @click="addIdentity()"
                                type="primary"
                                >新建岗位</el-button
                            >
                        </div>
                    </div>
                    <!-- 表格 -->
                    <el-table
                        :data="tableData"
                        style="width: 100%; margin-bottom: 20px"
                        row-key="id"
                        border
                        size="small"
                        default-expand-all
                        :cell-style="{ fontWeight: $store.state.fontWeight }"
                        :tree-props="{
                            children: 'children',
                            hasChildren: 'hasChildren'
                        }"
                        :header-cell-style="{
                            background: '#eef1f6',
                            color: '#606266'
                        }"
                    >
                        <el-table-column
                            prop="nickName"
                            label="昵称（系统名）"
                            width="130"
                        ></el-table-column>
                        <el-table-column
                            prop="actualName"
                            label="真实姓名"
                            width="100"
                        ></el-table-column>
                        <el-table-column prop="tel" width="130" label="电话">
                        </el-table-column>
                        <el-table-column
                            prop="organizationName"
                            width="160"
                            label="部门名称"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="positionName"
                            width="100"
                            label="职位"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            width="70"
                            label="状态"
                            :formatter="statusVal"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="remake"
                            width="auto"
                            label="备注"
                        ></el-table-column>
                        <el-table-column width="280" label="操作">
                            <template slot-scope="scope">
                                <el-button
                                    @click="edit(scope.row)"
                                    type="text"
                                    size="small"
                                    >编辑</el-button
                                >
                                <el-button
                                    @click="allowLogins(scope.row)"
                                    type="text"
                                    size="small"
                                    >允许登录
                                </el-button>
                                <el-button
                                    @click="disableLogins(scope.row)"
                                    type="text"
                                    size="small"
                                    >禁止登录
                                </el-button>
                                <el-button
                                    @click="resetPwd(scope.row)"
                                    type="text"
                                    size="small"
                                    >重置密码</el-button
                                >
                                <el-button
                                    @click="recovery(scope.row)"
                                    type="text"
                                    size="small"
                                    >恢复</el-button
                                ><el-button
                                    @click="stop(scope.row)"
                                    type="text"
                                    size="small"
                                    >停用</el-button
                                >
                                <el-button
                                    @click="del(scope.row)"
                                    type="text"
                                    size="small"
                                    >删除</el-button
                                >
                                <el-button
                                    @click="reward(scope.row)"
                                    type="text"
                                    size="small"
                                    >奖惩记录</el-button
                                >
                                <el-button
                                    @click="postchange(scope.row)"
                                    type="text"
                                    size="small"
                                    >岗位变动</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <template>
                        <div class="pagination-box">
                            <div class="pagination-item">
                                <p>当前1-4，共4条 <span>每页显示10条</span></p>
                            </div>
                            <div class="pagination-item">
                                <div class="block">
                                    <el-pagination
                                        @current-change="handleCurrentChange"
                                        :page-size="10"
                                        :current-page="currentPage"
                                        background
                                        :pager-count="9"
                                        layout="prev, pager, next,jumper"
                                        :total="rowCount"
                                    >
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <!--重置密码-->
                <el-dialog
                    title="重置密码"
                    width="480px"
                    top="40vh"
                    @close="resetDialog()"
                    :visible.sync="resetPassword"
                >
                    <div class="dialang-box">
                        <el-input
                            placeholder="请输入密码"
                            size="mini"
                            v-model="Password"
                            show-password
                            style="width: 423px; height: 32px"
                        ></el-input>
                    </div>
                    <div class="password-prompt">
                        <span
                            >重置密码后，系统不会发短信通知员工；请将密码告知员工，确保其正常使用。</span
                        >
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button size="mini" @click="resetPassword = false"
                            >取 消</el-button
                        >
                        <el-button
                            size="mini"
                            type="primary"
                            @click="resetPasswordOk()"
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
                            <template slot="title">员工基本信息</template>
                            <template>
                                <VueForm ref="addForm" :formObj="addForm" @ruleSuccess="addRuleSuccess">
                                    <template v-slot:sysOrganization>
                                        <el-select
                                            v-model="
                                                addForm.ruleForm.organizationId
                                            "
                                            :remote-method="remoteMethod"
                                            @change="sChange"
                                            @focus="sefocus"
                                            :loading="loading"
                                            remote
                                            style="width: 240px"
                                            filterable
                                            placeholder="请选择"
                                        >
                                            <el-option
                                                v-for="item in sysOptions"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                            >
                                            </el-option>
                                        </el-select>
                                    </template>
                                    <template v-slot:upload>
                                        <!-- uploadBusinessSysUserResume   file-->
                                        <el-upload
                                            :action="`${$baseUrl}upload/uploadBusinessSysUserResume`"
                                            :on-success="fileSuccess"
                                            :on-remove="wordRemove"
                                            :on-exceed="handleExceed"
                                            :file-list="wordList"
                                            accept=".pdf,.PDF,.jpg,.png,.JPG,.PNG"
                                            :limit="1"
                                            :before-upload="beforeFileUpload"
                                        >
                                            <el-button
                                                icon="el-icon-edit"
                                                size="small"
                                                >上传文件</el-button
                                            >
                                            <div
                                                slot="tip"
                                                class="el-upload__tip"
                                            >
                                                <span
                                                    >支持扩展名：pdf,jpg,png</span
                                                >
                                            </div>
                                        </el-upload>
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
                <Drawer
                    drawerTitle="新增岗位"
                    @drawerClose="identityClose"
                    :drawerVrisible="identity_vrisible"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">基本信息</template>
                            <template>
                                <VueForm
                                    ref="identityForm"
                                    :formObj="identityForm"
                                >
                                </VueForm>
                            </template>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-orange" @click="identitySubmit()">
                            <span>
                                <i class="el-icon-circle-check"></i>提交</span
                            >
                        </button>
                        <button class="btn-gray" @click="identityClose">
                            <span>取消</span>
                        </button>
                    </div>
                </Drawer>
                <Drawer
                    :drawerVrisible="drawer_reward"
                    @drawerClose="getClose"
                    drawerTitle="新增保养记录"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">基本信息</template>
                            <div style="fontsize: 16px; lineheight: 20px">
                                <el-row>
                                    <el-col :span="5"
                                        >真实姓名：{{ basicInfo.name }}</el-col
                                    >
                                    <el-col :span="5"
                                        >职位：{{
                                            basicInfo.positionName
                                        }}</el-col
                                    >
                                </el-row>
                            </div>
                        </FromCard>
                        <FromCard style="margintop: 20px">
                            <template slot="title">奖惩记录</template>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="addreward()"
                                >新增奖惩</el-button
                            >
                            <el-table :data="rewardList">
                                <el-table-column
                                    prop="happenDate"
                                    label="发生日期"
                                ></el-table-column>
                                <el-table-column prop="type" label="类型">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row.type === 1"
                                            >奖励</span
                                        >
                                        <span v-else-if="scope.row.type === 2"
                                            >惩罚</span
                                        >
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="content"
                                    label="内容"
                                ></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="danger"
                                            icon="el-icon-delete"
                                            circle
                                            @click="handleDelete(scope.row)"
                                        ></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table
                                :data="addList"
                                v-if="thisadd"
                                :show-header="false"
                            >
                                <el-table-column
                                    prop="happenDate"
                                    label="发生时间"
                                    width="200"
                                >
                                    <template slot-scope="scope">
                                        <el-date-picker
                                            v-model="scope.row.happenDate"
                                            type="date"
                                            size="mini"
                                            value-format="yyyy-MM-dd hh:mm:ss"
                                            style="width: 150px"
                                            placeholder="选择日期"
                                        >
                                        </el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="type" label="奖惩类型">
                                    <template slot-scope="scope">
                                        <el-select
                                            v-model="scope.row.type"
                                            size="mini"
                                            placeholder="请选择类型"
                                        >
                                            <el-option
                                                v-for="item in rewardoption"
                                                :label="item.label"
                                                :value="item.value"
                                                :key="item.value"
                                            ></el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="content" label="内容">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.content"
                                            size="mini"
                                            placeholder="请输入内容"
                                        ></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="success"
                                            icon="el-icon-check"
                                            circle
                                            @click="sub(scope.row)"
                                        ></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-gray" @click="getClose">
                            <span>取消</span>
                        </button>
                    </div>
                </Drawer>
                <!--  gangweibiandong-->
                <Drawer
                    :drawerVrisible="drawer_post"
                    @drawerClose="postgetClose"
                    drawerTitle="新增岗位变动记录"
                >
                    <div style="padding: 30px">
                        <FromCard>
                            <template slot="title">基本信息</template>
                            <div style="fontsize: 16px; lineheight: 20px">
                                <el-row>
                                    <el-col :span="5"
                                        >真实姓名：{{ basicInfo.name }}</el-col
                                    >
                                    <el-col :span="5"
                                        >职位：{{
                                            basicInfo.positionName
                                        }}</el-col
                                    >
                                </el-row>
                            </div>
                        </FromCard>
                        <FromCard style="margintop: 20px">
                            <template slot="title">岗位变动记录</template>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="addpostchange()"
                                >新增岗位变动</el-button
                            >
                            <el-table :data="postList">
                                <el-table-column
                                    prop="changeDate"
                                    label="变动时间"
                                ></el-table-column>
                                <el-table-column
                                    prop="oldStation"
                                    label="旧岗位信息"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="newStation"
                                    label="新岗位信息"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="changeReason"
                                    label="变动原因"
                                ></el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="danger"
                                            icon="el-icon-delete"
                                            circle
                                            @click="handlepostDelete(scope.row)"
                                        ></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-table
                                :data="addpostList"
                                v-if="thispostadd"
                                :show-header="false"
                            >
                                <el-table-column
                                    prop="changeDate"
                                    label="变动时间"
                                    width="200"
                                >
                                    <template slot-scope="scope">
                                        <el-date-picker
                                            v-model="scope.row.changeDate"
                                            type="date"
                                            size="mini"
                                            value-format="yyyy-MM-dd hh:mm:ss"
                                            style="width: 150px"
                                            placeholder="选择日期"
                                        >
                                        </el-date-picker>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="oldStation"
                                    label="旧岗位信息"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.oldStation"
                                            size="mini"
                                            placeholder="请输入内容"
                                        ></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="newStation"
                                    label="新岗位信息"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.newStation"
                                            size="mini"
                                            placeholder="请输入内容"
                                        ></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="changeReason"
                                    label="变动原因"
                                >
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.changeReason"
                                            size="mini"
                                            placeholder="请输入内容"
                                        ></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="success"
                                            icon="el-icon-check"
                                            circle
                                            @click="postsub(scope.row)"
                                        ></el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </FromCard>
                    </div>
                    <div slot="footer">
                        <button class="btn-gray" @click="getClose">
                            <span>取消</span>
                        </button>
                    </div>
                </Drawer>
            </div>
        </div>
    </div>
</template>
<script>
// import newRule from '@/views/company/components/personnelManagement/newRule.vue'
import {
    sysOrganizationList,
    sysUserAllowLogins,
    sysUserDisableLogins,
    sysUserRecovery,
    sysUserStop,
    sysUserResetPWD,
    sysUserList,
    sysUserInsert,
    identityListAll,
    sysUserFindById,
    sysUserUpdate,
    sysUserFalseDelete,
    identityInsert,
    RPRecordsList,
    RPRecordsInsert,
    RPRecordsdelete,
    stationChangeList,
    stationChangeInsert,
    stationChangedelete
} from '@/api/company'
import { sysOrganizationFindAllDepartment } from '@/api/daily'
export default {
    inject: ['reload'],
    data() {
        return {
            drawer_reward: false,
            thisadd: false,
            rewardList: [],
            tabelstatus: false,
            rewardoption: [
                {
                    value: 1,
                    label: '奖励'
                },
                {
                    value: 2,
                    label: '惩罚'
                }
            ],
            basicInfo: {},
            addList: [{ happenDate: null, type: null, content: null }],

            drawer_post: false,
            thispostadd: false,
            postList: [],
            postoption: [
                {
                    value: 1,
                    label: '奖励'
                },
                {
                    value: 2,
                    label: '惩罚'
                }
            ],
            addpostList: [
                {
                    changeDate: null,
                    oldStation: null,
                    newStation: null,
                    changeReason: null
                }
            ],
            wordList: [],
            sysOptions: [],
            add_vrisible: false,
            identity_vrisible: false,
            loading: false,
            drawerTitle: null,
            filterText: '',
            Password: '', //密码
            prohibitLogin: false, //禁止登陆
            resetPassword: false, //重置密码'
            pwdId: null,
            handleId: null, //操作id  用于编辑禁止登陆 重置密码、停用等
            // 表格数据
            tableData: [],
            // 组织结构
            organizationData: [],
            // 组织结构属性配置
            defaultProps: {
                children: 'organizationList',
                label: 'name'
            },
            addForm: {
                ruleForm: {
                    nickName: null,
                    actualName: null,
                    tel: null,
                    sex: null,
                    pwd: null,
                    organizationId: null,
                    idCard: null,
                    userCode: null,
                    positionId: null,
                    entryDate: null,
                    remake:null,
                    id: null,
                    imgUrls: []
                },
                rules: {
                  // 表单必填
                  nickName: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  actualName: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  tel: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  sex: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  pwd: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  organizationId: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ],
                  idCard: [
                    { required: true, message: '请输入', trigger: 'change' }
                  ],
                  positionId: [
                    { required: true, message: '请选择', trigger: 'change' }
                  ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '昵称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'nickName'
                    },
                    {
                        type: 'Input',
                        label: '真实姓名',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'actualName'
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
                        label: '密码',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'pwd'
                    },
                    {
                        type: 'Slot',
                        label: '部门',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'organizationId',
                        slotName: 'sysOrganization'
                    },
                    {
                        type: 'Input',
                        label: '身份证',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'idCard'
                    },
                    {
                        type: 'Input',
                        label: '用户编号',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'userCode',
                        disabled: true
                    },
                    {
                        type: 'Select',
                        label: '职位',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'positionId',
                        options: []
                    },
                    {
                        type: 'DateTime',
                        label: '入职时间',
                        placeholder: '请选择日期',
                        width: '50%',
                        prop: 'entryDate'
                    },
                    {
                        type: 'textarea',
                        label: '工作内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'remake'
                    },
                    {
                        type: 'Slot',
                        label: '工作简历',
                        placeholder: '请选择日期',
                        width: '100%',
                        prop: 'imgUrls',
                        slotName: 'upload'
                    }
                ]
            },
            identityForm: {
                ruleForm: {
                    name: null,
                    remakes: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '职位名称',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'name'
                    },
                    {
                        type: 'textarea',
                        label: '岗位职责',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'remakes'
                    }
                ]
            },
            currentPage: 1,
            limit: 10,
            pageCount: null,
            rowCount: null,
            organizationId: null,
            // 搜索条件
            nickName: null,
            // 搜索条件
            status: null,
            statusOptions: [
                { value: 1, label: '正常' },
                { value: 2, label: '禁止登录' },
                { value: 3, label: '停用' }
            ]
        }
    },
    created() {
        this.getData()
        this.getTableData()
        identityListAll().then((res) => {
            console.log(res)
            res.data.forEach((element) => {
                let obj = {
                    value: element.id,
                    label: element.name
                }
                this.addForm.form_item[8].options.push(obj)
            })
        })
    },
    methods: {
        // 获取奖惩列表
        getrewardlist() {
            RPRecordsList({ userId: this.userId }).then((res) => {
                console.log(res)
                this.rewardList = res.tableList
            })
        },
        // 保养reward
        reward(data) {
            console.log(data)
            this.drawer_reward = true
            this.userId = data.id
            this.basicInfo.name = data.actualName
            this.basicInfo.positionName = data.positionName
            this.getrewardlist()
        },
        // 新增保养
        addreward() {
            this.thisadd = true
        },
        // 删除保养
        handleDelete(row) {
            RPRecordsdelete({ ids: [row.id] }).then((res) => {
                console.log(res)
                if (res.status) {
                    this.$message({ message: res.message, type: 'success' })
                    this.getrewardlist()
                }
            })
        },
        // 提交新增保养
        sub(row) {
            console.log(row)
            let resData = {
                userId: this.userId,
                happenDate: row.happenDate,
                type: row.type,
                content: row.content
            }
            RPRecordsInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({ type: 'success', message: res.message })
                    this.thisadd = false
                    this.getrewardlist()
                    this.addList = [
                        { happenDate: null, type: null, content: null }
                    ]
                }
            })
        },
        // 关闭drawer
        getClose(data) {
            this.drawer_reward = false
            this.userId = null
            this.thisadd = false
            this.addList = [
                {
                    checkDate: null,
                    status: null,
                    administrator: null,
                    details: null
                }
            ]
        },

        // 获取奖惩列表
        getpostlist() {
            stationChangeList({ userId: this.userId }).then((res) => {
                console.log(res)
                this.postList = res.tableList
            })
        },
        // 获取奖惩列表
        postchange(data) {
            console.log(data)
            this.drawer_post = true
            this.userId = data.id
            this.basicInfo.name = data.actualName
            this.basicInfo.positionName = data.positionName
            this.getpostlist()
        },
        // 新增变动
        addpostchange() {
            this.thispostadd = true
        },
        // 删除变动
        handlepostDelete(row) {
            stationChangedelete({ ids: [row.id] }).then((res) => {
                console.log(res)
                if (res.status) {
                    this.$message({ message: res.message, type: 'success' })
                    this.getpostlist()
                }
            })
        },
        // 提交变动
        postsub(row) {
            console.log(row)
            let resData = {
                userId: this.userId,
                changeDate: row.changeDate,
                oldStation: row.oldStation,
                newStation: row.newStation,
                changeReason: row.changeReason
            }
            stationChangeInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({ type: 'success', message: res.message })
                    this.thispostadd = false
                    this.getpostlist()
                    this.addpostList = [
                        {
                            changeDate: null,
                            oldStation: null,
                            newStation: null,
                            changeReason: null
                        }
                    ]
                }
            })
        },
        // 关闭drawer
        postgetClose(data) {
            this.drawer_post = false
            this.userId = null
            this.thispostadd = false
            this.addpostList = [
                {
                    changeDate: null,
                    oldStation: null,
                    newStation: null,
                    changeReason: null
                }
            ]
        },
        // word 文件上传成功
        fileSuccess(res, file) {
            this.addForm.ruleForm.imgUrls[0] = file.response.url
        },
        // word 文件上传限制提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        },
        // 移出
        wordRemove() {
            this.addForm.ruleForm.fileDocUrl = []
        },
        // word 文件上传之前
        beforeFileUpload(file) {
            console.log(file)
            this.addForm.ruleForm.fileDocName = file.name
            const isLt2M = file.size / 1024 / 1024 < 20
            const fileType =
                file.name.endsWith('.pdf') ||
                file.name.endsWith('.PDF') ||
                file.name.endsWith('.jpg') ||
                file.name.endsWith('.jpg') ||
                file.name.endsWith('.png') ||
                file.name.endsWith('.PNG')
            console.log(fileType)
            if (!fileType) {
                this.$message.error('上传文件只能是 pdf/jpg/png 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传文件大小不能超过 20MB!')
            }
            return fileType && isLt2M
        },

        // 表格中status的值
        statusVal(row, column) {
            switch (row.status) {
                case 1:
                    return '正常'
                    break
                case 2:
                    return '禁止登录'
                    break
                case 3:
                    return '停用'
                    break
                case 4:
                    return '停用'
                    break
                default:
                    break
            }
        },
        // 新建员工
        addPerson() {
            this.addForm.form_item[4].placeholder = '请输入'
            this.add_vrisible = true
            this.drawerTitle = '新建员工'
            this.addForm.ruleForm.userCode = Math.floor(
                Math.random() * 100000000
            )
        },
        addIdentity() {
            this.identity_vrisible = true
        },
        identitySubmit() {
          let resData = {
            name: this.identityForm.ruleForm.name,
            remakes: this.identityForm.ruleForm.remakes,
            parentId: 0
          }
          identityInsert(resData).then((res) => {
            if (res.status) {
              this.$message({ message: '添加成功', type: 'success' })
              this.identityClose()
              this.reload()
            }
          })
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.addForm.form_item[4].disabled = false
            this.wordList = []
        },
        identityClose() {
            this.$refs.identityForm.reset()
            this.identity_vrisible = false
        },

        // 校验成功后调用接口
        addRuleSuccess() {
          if (this.drawerTitle == '新建员工') {
            let resData = {
              ...this.addForm.ruleForm
            }
            sysUserInsert(resData).then((res) => {
              if (res.status) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.getTableData()
                this.addClose()
              }
            })
          } else {
            let resData = {
              ...this.addForm.ruleForm,
              id: this.addForm.ruleForm.id
            }
            sysUserUpdate(resData).then((res) => {
              if (res.status) {
                this.$message({
                  message: res.message,
                  type: 'success'
                })
                this.getTableData()
                this.addClose()
              }
            })
          }
        },

        addSubmit() {
            this.$refs.addForm.submitForm()
        },
        //编辑
        edit(row) {
            this.add_vrisible = true
            this.drawerTitle = '修改员工信息'
            this.addForm.form_item[4].disabled = true
            this.addForm.form_item[4].placeholder = '密码'
            console.log(row)
            sysUserFindById({ id: row.id }).then((res) => {
                console.log(res)
                this.addForm.ruleForm.nickName = res.nickName
                this.addForm.ruleForm.actualName = res.actualName
                this.addForm.ruleForm.tel = res.tel
                this.addForm.ruleForm.sex = res.sex
                this.addForm.ruleForm.organizationId = res.organizationId
                this.addForm.ruleForm.idCard = res.idCard
                this.addForm.ruleForm.userCode = res.userCode
                this.addForm.ruleForm.positionId = res.positionId
                this.addForm.ruleForm.entryDate = res.entryDate
                this.addForm.ruleForm.id = res.id
                this.addForm.ruleForm.remake = res.remake
                if(res.imgList.length){this.wordList.push(res.imgList[0].url)}
                if (res.imgList.length === 0) {
                    this.wordList = []
                } else {
                    let obj = {
                        name: res.imgList[0].url,
                        url: res.imgList[0].url
                    }
                    this.$set(this.wordList, '0', obj)
                }
            })
        },
        //允许登录
        allowLogins(data) {
            this.$confirm('是否允许登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '允许登录成功'
                    })
                    sysUserAllowLogins({ id: data.id }).then((res) => {
                        this.getTableData()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消允许登录'
                    })
                })
        },
        //禁止登录
        disableLogins(data) {
            this.$confirm('是否禁止登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '禁止登录成功'
                    })
                    sysUserDisableLogins({ id: data.id }).then((res) => {
                        this.getTableData()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消禁止登录'
                    })
                })
        },
        // 恢复
        recovery(data) {
            this.$confirm('是否恢复?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '恢复成功'
                    })
                    sysUserRecovery({ id: data.id }).then((res) => {
                        this.getTableData()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消恢复'
                    })
                })
        },
        // 停用账号
        stop(data) {
            this.$confirm('是否停用?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '停用成功'
                    })
                    sysUserStop({ id: data.id }).then((res) => {
                        this.getTableData()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消停用'
                    })
                })
        },
        // 删除
        del(data) {
            this.$confirm('是否删除员工?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                // center: true
            })
                .then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    sysUserFalseDelete({ id: data.id }).then((res) => {
                        this.getTableData()
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
        },
        getUserList(val) {
            let reeData = {
                pageNum: 1,
                size: 20
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
            console.log(value) //sysUserList
        },
        sChange(value) {
            console.log(value)
        },
        // 组织点击
        organizationChange(data) {
            console.log(data)
            this.organizationId = data.id
            this.getTableData()
        },
        //查询
        search() {
            this.currentPage =1
            this.getTableData()
        },
        // 重置
        reset() {
            this.nickName = null
            this.status = null
            this.getTableData()
        },
        // 禁止登录确认
        prohibitLoginOk() {
            this.prohibitLogin = false
        },
        resetPwd(data) {
            this.resetPassword = true
            console.log(data)
            this.pwdId = data.id
        },
        // 重置密码确定
        resetPasswordOk() {
            let resData = {
                id: this.pwdId,
                pwd: this.Password
            }
            sysUserResetPWD(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        type: 'success',
                        message: res.message
                    })
                }
            })
            this.resetPassword = false
            this.Password = null
            this.pwdId = null
        },
        // 重制密码对话框的关闭事件
        resetDialog() {},
        // 表格数据
        getTableData() {
            let resData = {
                pageNum: this.currentPage,
                size: this.limit,
                organizationId: this.organizationId,
                nickName: this.nickName,
                status: this.status
            }
            sysUserList(resData).then((result) => {
                console.log(result)
                this.tableData = result.tableList
                this.rowCount = result.rowCount
            })
        },

        // 树形结构过滤
        filterNode(value, data) {
            console.log(value)
            if (!value) return true
            return data.name.indexOf(value) !== -1
        },
        // 人员管理结构
        getData() {
            sysOrganizationList().then((res) => {
                console.log(res)
                this.organizationData = res
            })
        },

        // 表格分页
        handleCurrentChange(val) {
            this.currentPage = val
            this.getTableData()
        }
    },
    watch: {
        // 树形结构过滤
        filterText(val) {
            this.$refs.tree.filter(val)
        },
        drawerTitle:{
            handler(newV){
                if(newV=='修改员工信息'){
                    this.addForm.form_item[4]={
                        type: '',
                        label: '',
                        placeholder: '',
                        width: '0%',
                        prop: ''
                    }
                }else{
                    this.addForm.form_item[4]={
                        type: 'Input',
                        label: '密码',
                        placeholder: '请输入',
                        width: '50%',
                        prop: 'pwd'
                    }
                }
            }
        }
    }
}
</script>
<style scoped lang='scss'>
.status_icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 10px;
    border-radius: 50%;
    background: #52c41a;
}
.orgLeft {
    width: 20%;
    height: auto;
    overflow: auto;
    border-radius: 4px;
    border: 1px solid #cfd0dd;
    margin-right: 20px;
}
.org-search {
    width: 80%;
    margin: 0 auto;
    padding: 20px;
}
.orgRight {
    flex: 1;
    height: 100%;
    overflow: auto;
    border: 1px solid #cfd0dd;
}
// .org-box {
//     box-sizing: content-box;
//     display: flex;
//     padding: 20px;
// }
.permission-input {
    width: 486px;
    margin-right: 88px;
}
.permission-btn {
    flex: 1;
}
.pagination-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.pagination-item {
    height: 68px;
    display: flex;
    align-items: center;
}
.password-prompt {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    text-align: left;
    line-height: 22px;
}
</style>
