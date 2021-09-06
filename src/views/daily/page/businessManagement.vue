
<template>
    <div class="main-content">
        <div class="main-titel">
            <span>业委会管理</span>
        </div>
        <div class="content">
            <div class="content-btn">
                <el-button
                    class="init-button"
                    icon="el-icon-plus"
                    @click="addOwnersCommittee"
                    >新增成员</el-button
                >
            </div>
            <!-- 查询重制 -->
            <div class="">
                <VueTable ref="table" :config="config" @tableCheck="tableCheck">
                    <template slot="footer">
                        <div class="table-footer">
                            <button @click="edit(table_row)">编辑</button>
                            <button @click="del(table_row)">删除</button>
                            <button @click="jieshao">查看业委会概况</button>
                        </div>
                    </template>
                </VueTable>
            </div>
        </div>
        <!--业委会增加修改 -->
        <Drawer
            :drawerTitle="ownersCommitteeTitle"
            @drawerClose="ownersCommitteeClose"
            :drawerVrisible="ownersCommittee_vrisible"
        >
            <div style="padding: 30px">
                <FromCard>
                    <template slot="title">基本信息</template>
                    <template>
                        <VueForm
                            ref="ownersCommitteeVueForm"
                            @ruleSuccess="ownersCommitteeRuleSubmit"
                            :formObj="ownersCommitteeForm"
                        >
                            <template slot="fileUrls">
                                <template>
                                    <el-upload
                                        :action="`${$baseUrl}upload/uploadOwnersCommittee`"
                                        :on-success="ownersImgeSuccess"
                                        :show-file-list="false"
                                        :before-upload="beforeAvatarUpload"
                                    >
                                        <div
                                            class="sys-image"
                                            style="width: 104px; height: 104px"
                                        >
                                            <div v-if="!fileUrls">
                                                <i class="el-icon-plus"></i>
                                                <p>上传照片</p>
                                            </div>
                                            <template v-else>
                                                <!-- 临时地址 新增状态 -->
                                                <el-image
                                                    v-if="!editBool"
                                                    :src="`${$ImgUrl}/temp${fileUrls}`"
                                                    style="
                                                        width: 104px;
                                                        height: 104px;
                                                    "
                                                ></el-image>
                                                <!-- 非临时地址  编辑状态-->
                                                <el-image
                                                    v-else
                                                    :src="`${$ImgUrl}${fileUrls}`"
                                                    style="
                                                        width: 104px;
                                                        height: 104px;
                                                    "
                                                ></el-image>
                                            </template>
                                        </div>
                                    </el-upload>
                                </template>
                            </template>
                            <!-- editId?'true':'false' -->
                            <template v-slot:residentId>
                                <el-select
                                    v-model="
                                        ownersCommitteeForm.ruleForm.residentId
                                    "
                                    :disabled="editId ? true : false"
                                    :remote-method="remoteMethod"
                                    @change="(value) => change(value, options)"
                                    @focus="focus"
                                    :loading="loading"
                                    remote
                                    style="width: 240px"
                                    filterable
                                    placeholder="请选择"
                                >
                                    <el-option
                                        v-for="(item, index) in options"
                                        :key="index"
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
                <button class="btn-orange" @click="ownersCommitteeSubmit()">
                    <span> <i class="el-icon-circle-check"></i>提交</span>
                </button>
                <button class="btn-gray" @click="ownersCommitteeClose">
                    <span>取消</span>
                </button>
            </div>
        </Drawer>
        <el-card class="detailcard" v-if="ifShow">
            <el-container>
                <el-header>
                  <h2>业委会概况<span @click="closejieshao" style="position:absolute;right:14px;cursor:pointer">x</span></h2>
                </el-header>
                <el-container>
                    <el-main>
                      <p style="lineHeight:25px;padding:30px;fontSize:17px">
                        业主委员会由业主大会会议选举产生，由5至11人单数组成
                        业主委员会
                        业主委员会
                        。业主委员会委员应当是物业管理区域内的业主，并符合下列条件：
                        （一）具有完全民事行为能力；
                        （二）遵守国家有关法律、法规；
                        （三）遵守业主大会议事规则、管理规约，模范履行业主义务；
                        （四）热心公益事业，责任心强，公正廉洁；
                        （五）具有一定的组织能力；
                        （六）具备必要的工作时间。
                        业主委员会委员必须符合下列条件
                        1．是本物业管理区域内业主；
                        2．能够遵守物业管理法规、规章、规范性文件和管理规约、业主大会议事规则、业主委员会章程；
                        3．有一定组织能力和必要工作时间，能够较好履行业主委员会成员职责；
                        4．品行端正无劣迹；
                        5．热心公益事业。

                      </p>
                      <div>
                        <img style="marginLeft:50px;border:1px solid #999999;" src="https://img1.baidu.com/it/u=1946873511,4277103188&fm=26&fmt=auto&gp=0.jpg" alt="">
                      </div>
                    </el-main>
                </el-container>
            </el-container>
        </el-card>
    </div>
</template>

<script>
import {
    ownersCommitteeInsert,
    ownersCommitteeUpdate,
    ownersCommitteeFindById
} from '@/api/daily'
import { userResident, userResidentFindResidentNameBySearch } from '@/api/basic'
export default {
    data() {
        return {
            ifShow: false,
            options: [],
            loading: false,
            // 业委会标题 业委会显示隐藏
            ownersCommitteeTitle: '',
            ownersCommittee_vrisible: false,
            editBool: false,
            editId: 0,
            // 选中表格数据
            table_row: [],
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    {
                        label: '职位',
                        prop: 'positionId',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.positionId) {
                                case 1:
                                    return '业委会主任'
                                    break
                                case 2:
                                    return '业委会副主任'
                                    break
                                case 3:
                                    return '业委会委员'
                                    break
                            }
                        }
                    },
                    { label: '姓名', prop: 'name', width: 'auto' },
                    // { label: '性别', prop: 'sexId', width: 'auto',
                    // type: 'function',
                    //               callback: (row, prop) => {
                    //                   switch (row.sexId) {
                    //                       case 1:
                    //                           return '男'
                    //                           break
                    //                       case 2:
                    //                           return '女'
                    //                           break
                    //                   }
                    //               } },
                    { label: '年龄', prop: 'age', width: 'auto' },
                    {
                        label: '学历',
                        prop: 'educationId',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.educationId) {
                                case 1:
                                    return '专科'
                                    break
                                case 2:
                                    return '本科'
                                    break
                                case 3:
                                    return '硕士'
                                    break
                                case 4:
                                    return '博士'
                                    break
                            }
                        }
                    },
                    { label: '房屋信息', prop: 'roomName', width: 'auto' },
                    { label: '职业', prop: 'profession', width: 'auto' }
                ],
                table_data: [],
                url: 'ownersCommitteeList',
                search_item: [
                    {
                        type: 'select',
                        label: '职位',
                        placeholder: '请输入',
                        prop: 'positionId',
                        value: '',
                        options: [
                            { value: 1, label: '业委会主任' },
                            { value: 2, label: '业委会副主任' },
                            { value: 3, label: '业委会委员' }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '姓名',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'select',
                        label: '学历',
                        placeholder: '请选择',
                        prop: 'educationId',
                        options: [
                            { value: 1, label: '专科' },
                            { value: 2, label: '本科' },
                            { value: 3, label: '硕士' },
                            { value: 4, label: '博士' }
                        ]
                    },
                    {
                        type: 'select',
                        label: '性别',
                        placeholder: '请选择',
                        prop: 'sexId',
                        value: '',
                        options: [
                            { value: '1', label: '男' },
                            { value: '2', label: '女' }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '房屋信息',
                        placeholder: '请输入',
                        prop: 'roomName'
                    },
                    {
                        type: 'Input',
                        label: '职业',
                        placeholder: '请输入',
                        prop: 'profession'
                    }
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            },
            fileUrls: '',
            ownersCommitteeForm: {
                ruleForm: {
                    residentId: null,
                    positionId: null,
                    age: null,
                    educationId: null,
                    roomName: null,
                    profession: null,
                    // sex: null,
                    fileUrls: []
                },
                form_item: [
                    {
                        type: 'Slot',
                        label: '姓名',
                        placeholder: '请输入姓名',
                        width: '50%',
                        prop: 'residentId',
                        slotName: 'residentId'
                    },
                    {
                        type: 'Select',
                        label: '职位',
                        placeholder: '请选择职位',
                        width: '50%',
                        prop: 'positionId',
                        options: [
                            { value: 1, label: '业委会主任' },
                            { value: 2, label: '业委会副主任' },
                            { value: 3, label: '业委会委员' }
                        ]
                    },
                    // { type: 'Select', label: '性别', placeholder: '请选择性别', options: [], width: '50%', prop: 'sex' },
                    {
                        type: 'Input',
                        label: '年龄',
                        placeholder: '请输入年龄',
                        width: '50%',
                        prop: 'age'
                    },
                    {
                        type: 'Select',
                        label: '学历',
                        placeholder: '请选择学历',
                        width: '50%',
                        prop: 'educationId',
                        options: [
                            { value: 1, label: '专科' },
                            { value: 2, label: '本科' },
                            { value: 3, label: '硕士' },
                            { value: 4, label: '博士' }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '房屋信息',
                        placeholder: '请输入房屋信息',
                        width: '50%',
                        prop: 'roomName',
                        disabled: true
                    },
                    {
                        type: 'Input',
                        label: '职业',
                        placeholder: '请输入职业',
                        width: '50%',
                        prop: 'profession'
                    },
                    {
                        type: 'Slot',
                        label: '图片上传',
                        width: '100%',
                        prop: 'fileUrls',
                        slotName: 'fileUrls'
                    }
                ],
                rules: {
                    residentId: [
                        {
                            required: true,
                            message: '请输入姓名',
                            trigger: 'change'
                        }
                    ],
                    positionId: [
                        {
                            required: true,
                            message: '请选择职位',
                            trigger: 'change'
                        }
                    ],
                    sex: [
                        {
                            required: true,
                            message: '请选择性别',
                            trigger: 'change'
                        }
                    ],
                    age: [
                        {
                            required: true,
                            message: '请输入工单名称',
                            trigger: 'blur'
                        }
                    ],
                    educationId: [
                        {
                            required: true,
                            message: '请选择学历',
                            trigger: 'change'
                        }
                    ],
                    roomName: [
                        {
                            required: true,
                            message: '请输入房屋信息',
                            trigger: 'blur'
                        }
                    ],
                    profession: [
                        {
                            required: true,
                            message: '请选择职业',
                            trigger: 'blur'
                        }
                    ],
                    fileUrls: [
                        {
                            required: true,
                            message: '请上传图片',
                            trigger: 'change'
                        }
                    ]
                }
            },
            ownersObj: {}
        }
    },
    methods: {
        jieshao() {
            this.ifShow = !this.ifShow
        },
        closejieshao(event){
          this.ifShow = !this.ifShow
        },
        remoteMethod(val) {
            let reeData = {
                pageNum: 1,
                size: 20,
                name: val
            }
            this.loading = true
            userResidentFindResidentNameBySearch(reeData).then((res) => {
                this.options = res.tableList
                this.loading = false
            })
        },
        focus() {
            let reeData = {
                pageNum: 1,
                size: 20
            }
            this.loading = true
            userResidentFindResidentNameBySearch(reeData).then((res) => {
                this.options = res.tableList
                this.loading = false
                console.log(res)
            })
        },
        change(value, options) {
            let arr2 = options.filter(function (item) {
                if (item.value === value) {
                    return item
                }
            })
            this.ownersObj = arr2[0]
            this.ownersCommitteeForm.ruleForm.roomName = this.ownersObj.roomName
            console.log(this.ownersObj)
        },
        // 添加修改弹窗提交验证通过
        ownersCommitteeRuleSubmit() {
            let resData = {
                residentId: this.ownersObj.value,
                positionId: this.ownersCommitteeForm.ruleForm.positionId,
                age: this.ownersCommitteeForm.ruleForm.age,
                educationId: this.ownersCommitteeForm.ruleForm.educationId,
                estateId: this.ownersObj.estateId,
                profession: this.ownersCommitteeForm.ruleForm.profession,
                fileUrls: this.ownersCommitteeForm.ruleForm.fileUrls
            }
            if (!this.editId) {
                console.log(resData)
                ownersCommitteeInsert(resData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.ownersCommitteeClose()
                        this.$refs.table.loadData()
                    }
                })
            } else {
                resData.id = this.editId
                ownersCommitteeUpdate(resData).then((res) => {
                    if (res.status) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.$refs.table.loadData()
                        this.ownersCommitteeClose()
                    }
                })
            }
        },
        // 添加修改弹窗提交
        ownersCommitteeSubmit() {
            this.$refs.ownersCommitteeVueForm.submitForm()
        },
        // 添加成员 弹窗显示
        addOwnersCommittee() {
            this.ownersCommitteeTitle = ' 添加成员'
            this.ownersCommittee_vrisible = true
        },

        // 修改 弹窗显示
        edit(data) {
            if (data.length) {
                if (data.length > 1) {
                    this.$message.error('不能批量编辑')
                    return
                }
                this.ownersCommitteeTitle = ' 修改成员'
                this.ownersCommittee_vrisible = true
                let resData = {
                    id: data[0].id
                }
                this.ownersCommitteeForm.ruleForm.residentId = data[0].name
                this.ownersCommitteeForm.ruleForm.roomName = data[0].roomName
                this.ownersCommitteeForm.ruleForm.positionId =
                    data[0].positionId
                this.ownersCommitteeForm.ruleForm.age = data[0].age
                this.ownersCommitteeForm.ruleForm.educationId =
                    data[0].educationId
                this.ownersCommitteeForm.ruleForm.profession =
                    data[0].profession
                this.ownersObj.value = data[0].estateId
                this.ownersObj.estateId = data[0].estateId
                ownersCommitteeFindById(resData).then((result) => {
                    console.log(result)
                    this.editBool = true
                    this.editId = result.id
                    this.ownersCommitteeForm.ruleForm.fileUrls[0] =
                        result.imgUrls[0].url
                    this.fileUrls = result.imgUrls[0].url
                })
            } else {
                this.$message.error('请选择需要编辑的数据')
            }
        },
        tableCheck(data) {
            this.table_row = data
        },
        //  弹窗关闭显示
        ownersCommitteeClose() {
            // 初始化数据 重置
            this.editId = 0
            this.fileUrls = ''
            this.ownersObj = {}
            for (let key in this.ownersCommitteeForm.ruleForm) {
                this.$set(this.ownersCommitteeForm.ruleForm, key, null)
            }
            console.log(this.ownersCommitteeForm.ruleForm)
            this.$refs.ownersCommitteeVueForm.reset()
            this.ownersCommittee_vrisible = false
        },
        // 删除
        del(data) {
            let arr = []
            for (let i = 0; i < this.table_row.length; i++) {
                arr.push(this.table_row[i].id)
            }
            if (!arr.length) {
                this.$message.error('请选中需要删除的表格数据')
                return
            }
            this.$confirm('是否删除？删除不可找回', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(() => {
                    this.$refs.table.tableDelete(arr)
                })
                .catch((action) => {})
        },
        // 图片上传成功
        ownersImgeSuccess(res, file) {
            this.fileUrls = res.url
            this.ownersCommitteeForm.ruleForm.fileUrls[0] = res.url
            this.editBool = false
        },
        // 图片上传之前
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2
            const isJPG = file.type === 'image/png'
            const isPNG = file.type === 'image/jpeg'
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return (isJPG || isPNG) && isLt2M
        }
    }
}
</script>
<style>
.detailcard {
    position: fixed;
    height: 700px;
    width: 800px;
    left: 30%;
    top: 40px;z-index: 999;
}
.sys-image {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-right: 12px;
}
</style>
