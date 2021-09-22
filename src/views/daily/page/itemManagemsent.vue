<template>
    <div class="main-content">
        <div class="main-titel">
            <span>物品管理</span>
        </div>
        <div class="content">
            <div class="content-btn">
                <el-button
                    class="init-button"
                    icon="el-icon-plus"
                    @click="addGoods"
                    >添加物品</el-button
                >
            </div>
            <div class="">
                <VueTable ref="table" :config="config" @tableCheck="tableCheck">
                    <!-- <template slot="tabs">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="0"></el-tab-pane>
              <el-tab-pane label="正常"
                           name="1"></el-tab-pane>
              <el-tab-pane label="破损"
                           name="2"></el-tab-pane>
            </el-tabs>
          </template> -->
                    <template v-slot:imgUrls="slotData">
                        <div v-if="slotData.data.imgUrls.length">
                            <el-button
                                class="init-text"
                                type="text"
                                @click="getPhotoView(slotData.data.imgUrls)"
                            >
                                <span>查看</span>
                            </el-button>
                        </div>
                        <div v-else>-</div>
                    </template>
                    <template slot="footer">
                        <div class="table-footer">
                            <button @click="editGoods(table_row)">编辑</button>
                            <button @click="del(table_row)">删除</button>
                            <!-- <button>打印二维码</button> -->
                        </div>
                    </template>
                </VueTable>
            </div>

            <Drawer
                :drawerTitle="addEidtTitle"
                @drawerClose="addEidtClose"
                :drawerVrisible="addEidt_vrisible"
            >
                <div style="padding: 30px">
                    <FromCard>
                        <template slot="title">基本信息</template>
                        <template>
                            <VueForm ref="addEidtFrom" :formObj="addEidtForm">
                                <template slot="fileUrls">
                                    <template>
                                        <el-upload
                                            :action="`${$baseUrl}upload/uploadArticle`"
                                            :on-success="voteImgeSuccess"
                                            :show-file-list="false"
                                            :before-upload="beforeAvatarUpload"
                                        >
                                            <div
                                                class="sys-image"
                                                style="
                                                    width: 104px;
                                                    height: 104px;
                                                "
                                            >
                                                <div v-if="!fileUrls">
                                                    <i class="el-icon-plus"></i>
                                                    <p>上传照片</p>
                                                </div>
                                                <!-- editBool -->
                                                <div v-else>
                                                    <el-image
                                                        v-if="this.addEidtTitle=='添加物品'"
                                                        :src="`${$ImgUrl}/temp${fileUrls}`"
                                                        style="
                                                            width: 104px;
                                                            height: 104px;
                                                        "
                                                    ></el-image>
                                                    <el-image
                                                        v-else
                                                        :src="`${$ImgUrl}${fileUrls}`"
                                                        style="
                                                            width: 104px;
                                                            height: 104px;
                                                        "
                                                    ></el-image>
                                                </div>
                                            </div>
                                        </el-upload>
                                    </template>
                                </template>
                                <template slot="quantity">
                                    <el-input-number
                                        v-model="VotingUserList.length"
                                        controls-position="right"
                                        :disabled="true"
                                        :min="1"
                                        :max="99"
                                    ></el-input-number>
                                </template>
                                <!-- 物品 -->
                                <template slot="articleDetailList">
                                    <!-- <el-checkbox
                                        v-model="imageShow"
                                        label="图片"
                                    ></el-checkbox>
                                    <el-checkbox
                                        v-model="telShow"
                                        label="电话"
                                    ></el-checkbox> -->
                                    <div class="sysVote-box">
                                        <div
                                            class="sys-box"
                                            v-for="(
                                                item, index
                                            ) in VotingUserList"
                                            :key="index"
                                        >
                                            <div class="sys-title">
                                                <span>物品{{ index + 1 }}</span>
                                                <span
                                                    v-if="
                                                        VotingUserList.length ===
                                                        index + 1
                                                    "
                                                    style="color: #fb4702"
                                                    @click="addVotingUser"
                                                    >添加物品</span
                                                >
                                                <span
                                                    v-else
                                                    style="color: #fb4702"
                                                    @click="delVotingUser(item)"
                                                    >删除</span
                                                >
                                            </div>
                                            <div class="sys-item">
                                                <template v-if="imageShow">
                                                    <template>
                                                        <el-upload
                                                            :action="`${$baseUrl}upload/uploadVoteTitle`"
                                                            :on-success="
                                                                (res, file) =>
                                                                    handleAvatarSuccess(
                                                                        index,
                                                                        res,
                                                                        file
                                                                    )
                                                            "
                                                            :show-file-list="
                                                                false
                                                            "
                                                            :before-upload="
                                                                beforeAvatarUpload
                                                            "
                                                        >
                                                            <div
                                                                class="sys-image"
                                                            >
                                                                <div
                                                                    v-if="
                                                                        !item
                                                                            .fileUrls[0]
                                                                    "
                                                                >
                                                                    <i
                                                                        class="el-icon-plus"
                                                                    ></i>
                                                                    <p>
                                                                        上传照片
                                                                    </p>
                                                                </div>
                                                                <template
                                                                    v-else
                                                                >
                                                                    <!-- 临时地址 -->
                                                                    <el-image
                                                                        v-if="
                                                                            item.temporary
                                                                        "
                                                                        :src="`${$ImgUrl}/temp${item.fileUrls[0]}`"
                                                                        style="
                                                                            width: 80px;
                                                                            height: 80px;
                                                                        "
                                                                    ></el-image>
                                                                    <!-- 非临时地址 -->
                                                                    <el-image
                                                                        v-else
                                                                        :src="`${$ImgUrl}${item.fileUrls}`"
                                                                        style="
                                                                            width: 80px;
                                                                            height: 80px;
                                                                        "
                                                                    ></el-image>
                                                                </template>
                                                            </div>
                                                        </el-upload>
                                                    </template>
                                                </template>
                                                <div class="sys-input">
                                                    <el-input
                                                        v-model="item.name"
                                                        placeholder="物品明细名称"
                                                    ></el-input>
                                                    <el-input
                                                        v-model="item.code"
                                                        v-if="telShow"
                                                        placeholder="物品单号"
                                                    ></el-input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </VueForm>
                        </template>
                    </FromCard>
                </div>
                <div slot="footer">
                    <button class="btn-orange" @click="addEidtSubmit()">
                        <span> <i class="el-icon-circle-check"></i>提交</span>
                    </button>
                    <button class="btn-gray" @click="addEidtClose">
                        <span>取消</span>
                    </button>
                </div>
            </Drawer>
        </div>
        <views-photo
            :isVisible="photos_Visible"
            :goodsImgsList="goodsImgsList"
            @closeViews="getclose"
        ></views-photo>
    </div>
</template>
<script>
import viewsPhoto from '@/components/dialog/viewsPhoto'
import { articleFindById, articleInsert,articleUpdate } from '@/api/butler'
export default {
    data() {
        return {
            // 选中表格数据
            table_row: [],
            thatID:null,
            imageShow: true,
            telShow: true,
            editBool: false, //是否为编辑
            fileUrls: '',
            VotingUserList: [
                {
                    fileUrls: [],
                    name: null,
                    code: null
                }
            ],
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '物品名称', prop: 'name', width: 'auto' },
                    {
                        label: '照片',
                        prop: 'imgUrls',
                        width: 'auto',
                        type: 'slot',
                        slotName: 'imgUrls'
                    },
                    { label: '数量', prop: 'quantity', width: 'auto' },
                    { label: '库存', prop: 'stock', width: 'auto' }
                    // { label: '物品状态', prop: 'status', width: 'auto' },
                ],
                table_data: [],
                url: 'articleList',
                search_item: [
                    {
                        type: 'Input',
                        label: '物品名称',
                        placeholder: '请输入',
                        prop: 'name'
                    }
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            },
            addEidt_vrisible: false,
            addEidtForm: {
                ruleForm: {
                    name: null,
                    fileUrls: [],
                    quantity: null,
                    articleDetailList: []
                    // sysVoteCandidateList: []
                },
                rules:{
                    name: [
                        {
                            required: true,
                            message: '请填名称',
                            trigger: 'blur'
                        }
                    ],
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '物品名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Slot',
                        label: '照片',
                        width: '100%',
                        prop: 'fileUrls',
                        slotName: 'fileUrls'
                    },
                    {
                        type: 'Slot',
                        label: '数量',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'quantity',
                        slotName: 'quantity'
                    },
                    {
                        type: 'Slot',
                        label: '添加物品',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'articleDetailList',
                        slotName: 'articleDetailList'
                    }
                ]
                // rules: {
                //     name: [
                //         {
                //             required: true,
                //             message: '请输入物品名称',
                //             trigger: 'blur'
                //         }
                //     ],
                //     // fileUrls: [
                //     //     {
                //     //         required: true,
                //     //         message: '请上传图片',
                //     //         trigger: 'change'
                //     //     }
                //     // ],
                //     quantity: [
                //         {
                //             required: true,
                //             message: '请输入数量',
                //             trigger: 'change'
                //         }
                //     ]
                // }
            },
            addEidtTitle: '',
            goodsImgsList: [],
            photos_Visible: false
        }
    },
    components: {
        viewsPhoto
    },
    methods: {
        addVotingUser() {
            this.VotingUserList.push({
                fileUrls: [],
                name: null,
                code: null
            })
        },

        delVotingUser(item) {
            let index = this.VotingUserList.indexOf(item)
            if (index !== -1) {
                this.VotingUserList.splice(index, 1)
            }
        },
        // 添加物品
        addGoods() {
            this.addEidtTitle = '添加物品'
            this.addEidt_vrisible = true
        },
        // 编辑
        editGoods(data) {
            if (data.length > 1) {
                this.$message.error('只能查看一条数据的详情')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            }
            this.thatID = data[0].id
            this.addEidtTitle = '修改物品'
            this.addEidt_vrisible =true
            articleFindById({ id: data[0].id }).then((res) => {
                console.log(res)
                this.addEidtForm.ruleForm.name = res.name
                if(res.imgUrl.length){
                    this.fileUrls = res.imgUrl[0].url
                }
                for (let i = 0; i < res.quantity; i++) {
                    this.VotingUserList[i].id = res.voFindByIdArticleDetailList[i].id
                    this.VotingUserList[i].fileUrls = [res.voFindByIdArticleDetailList[i].imgUrl[0].url]
                    this.VotingUserList[i].name = res.voFindByIdArticleDetailList[i].name
                    this.VotingUserList[i].code = res.voFindByIdArticleDetailList[i].code
                        // id:res.voFindByIdArticleDetailList[i].id,
                        // fileUrls: [res.voFindByIdArticleDetailList[i].imgUrl[0].url],
                        // name: res.voFindByIdArticleDetailList[i].name,
                        // code: res.voFindByIdArticleDetailList[i].code
                }
                console.log(this.VotingUserList);
            })
        },
        // vueForm 验证提交
        addEidtSubmit() {
            if(this.addEidtTitle=='添加物品'){
                if(this.addEidtForm.ruleForm.name==''||this.addEidtForm.ruleForm.name==null){
                this.$message.error('物品名称不能为空')
                return
            }
            for (let i = 0; i < this.VotingUserList.length; i++) {
                if(this.VotingUserList[i].name ==''||this.VotingUserList[i].name ==null){
                    this.$message.error('物品明细名称不能为空')
                return
                }
                if(this.VotingUserList[i].code ==''||this.VotingUserList[i].code ==null){
                    this.$message.error('物品单号不能为空')
                return
                }
                
            }
            let resData = {
                name: this.addEidtForm.ruleForm.name,
                fileUrls: this.addEidtForm.ruleForm.fileUrls,
                quantity: this.VotingUserList.length,
                articleDetailList: this.VotingUserList
            }
            articleInsert(resData).then((res) => {
                if (res.status == true) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.addEidtClose()
                    this.$refs.table.loadData()
                } else if (res.status == 500) {
                    this.$message({
                        message: '添加失败',
                        type: 'error'
                    })
                }
                this.addEidtClose()
            })
            }else{
                let resData = {
                id:this.thatID,
                name: this.addEidtForm.ruleForm.name,
                fileUrls: [this.fileUrls],
                quantity: this.VotingUserList.length,
                articleDetailList: this.VotingUserList
            }
            articleUpdate(resData).then((res) => {
                if (res.status == true) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.addEidtClose()
                    this.$refs.table.loadData()
                } else if (res.status == 500) {
                    this.$message({
                        message: '添加失败',
                        type: 'error'
                    })
                }
                this.addEidtClose()
            })
            }
        },
        addEidtClose() {
            this.addEidt_vrisible = false
            this.fileUrls = ''
            this.$refs.addEidtFrom.reset()
            this.addEidtForm.ruleForm.fileUrls = []
            this.VotingUserList=[{
                fileUrls: [],
                name: null,
                code: null
            }]
        },
        // 查看图片
        getPhotoView(item) {
            this.photos_Visible = true
            this.goodsImgsList = item
        },
        // 关闭查看图片
        getclose() {
            this.photos_Visible = false
        },
        tableCheck(data) {
            this.table_row = data
        },
        onSubmit() {},
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
        // 上传照片
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 /1024   <2
            const isJPG = file.type === 'image/png'
            const isPNG = file.type === 'image/jpeg'
            console.log(file);
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return (isJPG || isPNG) && isLt2M
        },
        // 图片上传成功
        voteImgeSuccess(res, file) {
            this.fileUrls = res.url
            this.editBool = false
            // this.$set(this.reportRepairFrom.ruleForm.fileUrls)
            this.addEidtForm.ruleForm.fileUrls[0] = res.url
        }, // 候选人文件上传成功
        handleAvatarSuccess(index, res, file) {
            this.VotingUserList[index].fileUrls.splice(0, 1, res.url)
            this.VotingUserList[index].temporary = true
            console.log(this.VotingUserList)
        }
        // 状态切换
        // handleClick (tab, event) {
        //   let status = null
        //   if (this.activeName != 0) {
        //     status = this.activeName
        //   } else {
        //     status = null
        //   }
        //   const requestData = {
        //     pageNum: 1,
        //     size: 10,
        //     status: status
        //   }
        //   this.$refs.table.requestData(requestData);
        // },
    },
    watch: {
        drawerVrisible: {
            handler(newValue) {
                this.drawer_vrisible = newValue
            }
        },
        // checkBoox 控制投票候选人列表内容是否有值
        // 候选人图片
        imageShow: {
            handler(newValue) {
                this.VotingUserList.map((item) => {
                    item.fileUrls = []
                })
            }
        },
        // 候选人电话
        telShow: {
            handler(newValue) {
                this.VotingUserList.map((item) => {
                    item.tel = null
                })
            }
        }
        // 候选人名称
        // nameShow: {
        //   handler (newValue) {
        //     this.VotingUserList.map(item => {
        //       item.name = null
        //     })
        //   }
        // },
    }
}
</script>
<style scoped lang='scss'>
.sysVote-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .sys-box {
        width: 340px;
        height: 130px;
        margin-right: 50px;
        margin-bottom: 30px;
        background: #f9f9f9;
        border-radius: 4px;
        padding: 12px;
        .sys-title {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            margin-bottom: 12px;
            span {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
            }
        }
        .sys-item {
            display: flex;
            align-content: space-between;
            height: 80px;
            .sys-input {
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
            }
        }
    }
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
