<template>
    <div>
        <div>
            <div class="main-content">
                <div class="main-titel">
                    <span>产品类型系列</span>
                    <!-- {{currentCHildId}}{{currentCHildId2}} -->
                </div>
                <div class="content">
                    <div class="category">
                        <el-row>
                            <!-- 一级类目 -->
                            <el-col :span="6">
                                <ul style="border-right: 1px solid #e6e6fa">
                                    <li
                                        v-for="(item, index) in this.options"
                                        :key="index"
                                        :class="{ red: changeRed == index }"
                                        @click="change(index)"
                                        style="
                                            display: flex;
                                            justify-content: space-between;
                                        "
                                    >
                                        <span
                                            class="cateName"
                                            @click="getChild(item)"
                                        >
                                            {{ item.name }}
                                        </span>
                                        <template>
                                            <div>
                                                <el-button
                                                    size="mini"
                                                    @click="detail(item)"
                                                    >编辑</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    v-if="item.isShow === 1"
                                                    @click="hide(item)"
                                                    style="color: green"
                                                    >在app中显示</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    v-else-if="
                                                        item.isShow === 0
                                                    "
                                                    @click="show(item)"
                                                    style="color: red"
                                                    >在app中隐藏</el-button
                                                >
                                            </div>
                                        </template>
                                    </li>
                                </ul>
                            </el-col>
                            <!-- 二级类目 -->
                            <el-col :span="6">
                                <ul style="margin-left: 50px">
                                    <li
                                        v-for="(item, index) in this
                                            .childrenOptions"
                                        :key="index"
                                        :class="{ red2: changeRed2 == index }"
                                        @click="change2(index)"
                                        style="
                                            display: flex;
                                            justify-content: space-between;
                                        "
                                    >
                                        <span
                                            class="cateName"
                                            @click="getChild2(item)"
                                        >
                                            {{ item.name }}
                                        </span>
                                        <template>
                                            <div>
                                                <el-button
                                                    size="mini"
                                                    @click="detail(item)"
                                                    >编辑</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    v-if="item.isShow === 1"
                                                    @click="hide(item)"
                                                    style="color: green"
                                                    >在app中显示</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    v-else-if="
                                                        item.isShow === 0
                                                    "
                                                    @click="show(item)"
                                                    style="color: red"
                                                    >在app中隐藏</el-button
                                                >
                                            </div>
                                        </template>
                                    </li>
                                </ul>
                            </el-col>
                            <!-- 三级类目 -->
                            <el-col :span="6">
                                <ul style="margin-left: 50px">
                                    <li
                                        v-for="(item, index) in this
                                            .childrenOptions2"
                                        :key="index"
                                        style="
                                            display: flex;
                                            justify-content: space-between;
                                        "
                                    >
                                        <span class="cateName">
                                            {{ item.name }}
                                        </span>
                                        <template>
                                            <div>
                                                <el-button
                                                    size="mini"
                                                    @click="detail(item)"
                                                    >编辑</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    v-if="item.isShow === 1"
                                                    @click="hide(item)"
                                                    style="color: green"
                                                    >在app中显示</el-button
                                                >
                                                <el-button
                                                    size="mini"
                                                    v-else-if="
                                                        item.isShow === 0
                                                    "
                                                    @click="show(item)"
                                                    style="color: red"
                                                    >在app中隐藏</el-button
                                                >
                                            </div>
                                        </template>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                    </div>
                    <!-- detail -->
                    <Drawer
                        drawerTitle="编辑企业信息"
                        @drawerClose="detailClose"
                        :drawerVrisible="detail_vrisible"
                    >
                        <div style="padding: 30px">
                            <FromCard>
                                <template slot="title">基本信息</template>
                                <template>
                                    {{ detailForm.ruleForm.imgUrls }}
                                    <VueForm
                                        ref="detailForm"
                                        :formObj="detailForm"
                                        @ruleSuccess="detailRuleSuccess"
                                    >
                                        <!-- Slot -->
                                        <template slot="imgUrls">
                                            <template>
                                                <el-upload
                                                    :action="`${$baseUrl}upload/uploadJcookCategory`"
                                                    :on-success="ImgeSuccess"
                                                    :file-list="imglist"
                                                    list-type="picture"
                                                    :on-remove="handleChange"
                                                    :on-change="handleChange2"
                                                    ref="myUpload1"
                                                    :on-exceed="handleExceed"
                                                    :limit="10"
                                                    accept=".jpg,.png,.JPG,.PNG"
                                                    :before-upload="
                                                        beforeAvatarUpload
                                                    "
                                                >
                                                    <el-button
                                                        icon="el-icon-edit"
                                                        size="small"
                                                        >上传图片</el-button
                                                    >
                                                    <span
                                                        style="
                                                            margin-left: 10px;
                                                            font-size: 12px;
                                                            color: #444444;
                                                        "
                                                        >建议比例：3:2</span
                                                    >
                                                    <div
                                                        slot="tip"
                                                        class="el-upload__tip"
                                                    >
                                                        <span
                                                            >支持扩展名：png,jpg</span
                                                        >
                                                    </div>
                                                </el-upload>
                                            </template>
                                        </template>
                                    </VueForm>
                                    <!-- <div
                                        v-for="(item, index) in this.imglist"
                                        :key="index"
                                        style="
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            box-shadow: 0px 0px  5px #888888;
                                        "
                                    >
                                        {{ item.name }}
                                        <img :src="imgheader + item.url" />
                                    </div> -->
                                </template>
                            </FromCard>
                        </div>
                        <div slot="footer">
                            <button class="btn-orange" @click="detailSubmit()">
                                <span>
                                    <i class="el-icon-circle-check"></i
                                    >提交</span
                                >
                            </button>
                            <button class="btn-gray" @click="detailClose">
                                <span>取消</span>
                            </button>
                        </div>
                    </Drawer>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    jcookCategoryListByParentId,
    jcookCategoryShow,
    jcookCategoryHide,
    jcookCategoryUpdateCategoryImg
} from '@/api/shop.js'
export default {
    data() {
        return {
            changeRed: -1,
            changeRed2: -1,
            edit_vrisible: false,
            add_vrisible: false,
            detail_vrisible: false,
            options: [],
            childrenOptions: [],
            childrenOptions2: [],
            currentCHildId: -1,
            currentCHildId2: -1,
            editForm: {
                ruleForm: {
                    name: null,
                    id: null,
                    parentId: null,
                    imgUrls: [],
                    idPath: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '分类名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Slot',
                        label: '图片上传',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'imgUrls',
                        slotName: 'imgUrls'
                    }
                ]
            },
            addForm: {
                ruleForm: {
                    name: null,
                    parentId: null,
                    imgUrls: [],
                    idPath: null
                },
                rules: {
                    // 表单必填
                    parentId: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ],
                    name: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ]
                },
                form_item: [
                    {
                        type: 'Select',
                        label: '所属类别',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'parentId',
                        options: [
                            {
                                label: '顶层类',
                                value: '0'
                            }
                        ]
                    },
                    {
                        type: 'Input',
                        label: '分类名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Slot',
                        label: '图片上传',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'imgUrls',
                        slotName: 'imgUrls'
                    }
                ]
            },
            detailForm: {
                ruleForm: {
                    id: null,
                    name: null,
                    imgUrls: []
                },
                rules: {
                    imgUrls: [
                        { required: true, message: '请输入', trigger: 'change' }
                    ]
                },
                form_item: [
                    {
                        type: 'span',
                        label: '类目名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Slot',
                        label: '图片上传',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'imgUrls',
                        slotName: 'imgUrls'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            imgheader: process.env.VUE_APP_Image_API
        }
    },
    mounted() {
        this.getDate()
    },
    methods: {
        change: function (index) {
            this.changeRed = index
        },
        change2: function (index) {
            this.changeRed2 = index
        },
        show(data) {
            jcookCategoryShow({ jcookCategoryId: data.id }).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.getDate()
                    this.getChild3()
                }
            })
        },
        hide(data) {
            jcookCategoryHide({ jcookCategoryId: data.id }).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.getDate()
                    this.getChild3()
                }
            })
        },
        getDate() {
            jcookCategoryListByParentId({ parentId: 0 }).then((res) => {
                console.log(res)
                this.options = res.tableList
            })
        },
        getChild(data) {
            jcookCategoryListByParentId({ parentId: data.id }).then((res) => {
                console.log(res)
                this.childrenOptions = res.tableList
                this.currentCHildId = data.id
                this.changeRed2 = 0
                this.currentCHildId2 = res.tableList[0].id
                this.getChild2(res.tableList[0])
            })
        },
        getChild2(data) {
            this.currentCHildId2 = data.id
            jcookCategoryListByParentId({ parentId: data.id }).then((res) => {
                console.log(res)
                this.childrenOptions2 = res.tableList
            })
        },
        getChild3() {
            jcookCategoryListByParentId({ parentId: this.currentCHildId }).then(
                (res) => {
                    console.log(res)
                    this.childrenOptions = res.tableList
                    jcookCategoryListByParentId({
                        parentId: this.currentCHildId2
                    }).then((res) => {
                        this.childrenOptions2 = res.tableList
                    })
                }
            )
        },
        detail(data) {
            console.log(data)
            this.detailForm.ruleForm.id = data.id
            this.detailForm.ruleForm.name = data.name
            var arr = []
            this.imglist = []
            data.imgUrls.forEach((res) => {
                arr.push(res.url)
                this.imglist.push({
                    name: res.url,
                    url: this.imgheader + res.url
                })
            })
            this.detailForm.ruleForm.imgUrls = arr
            this.detail_vrisible = true
            // console.log(data[0].id)
            // this.detailForm.ruleForm.id = data[0].id
            // this.imglist = []
            // surroundingEnterprisesFindById({ surroundingEnterprisesId: data[0].id }).then((res) => {
            //     // console.log(res.data)
            //     if (res.data.imgList.length) {
            //         res.data.imgList.forEach((element) => {
            //             let obj = {
            //                 name: element.url,
            //                 url: element.url
            //             }
            //             this.imglist.push(obj)
            //             this.detailForm.ruleForm.imgUrls.push(element.url)
            //             // this.detailForm.ruleForm.imgUrls = this.imglist
            //         })
            //     } else {
            //         this.detailForm.ruleForm.imgUrls = []
            //     }
            //     this.detailForm.ruleForm.name = res.data.name
            //     this.detailForm.ruleForm.content = res.data.content
            //     this.detailForm.ruleForm.status = res.data.status
            // })
        },
        detailClose() {
            this.$refs.detailForm.reset()
            this.detail_vrisible = false
        },
        detailRuleSuccess() {
            let resData = {
                categoryId: this.detailForm.ruleForm.id,
                imgList: this.detailForm.ruleForm.imgUrls
            }
            jcookCategoryUpdateCategoryImg(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.getDate()
                    this.getChild3()
                    this.detailClose()
                }
            })
        },
        detailSubmit() {
            this.$refs.detailForm.submitForm()
        },
        handleChange(file, fileList) {
            if (file.url === undefined) {
                console.log(file.response.url)
                let arr = []
                this.detailForm.ruleForm.imgUrls.forEach((el) => {
                    if (el !== file.response.url) {
                        arr.push(el)
                    }
                })
                this.detailForm.ruleForm.imgUrls = arr
            } else {
                console.log(file.url.split('https://test.kaidalai.cn/static')[1])
                console.log(fileList)
                let arr = []
                this.detailForm.ruleForm.imgUrls.forEach((el) => {
                    if (el !== file.url.split('https://test.kaidalai.cn/static')[1]) {
                        arr.push(el)
                    }
                })
                this.detailForm.ruleForm.imgUrls = arr
            }
            // console.log(fileList)
        },
        handleChange2(file, fileList) {},
        // 图片上传成功
        ImgeSuccess(res, file) {
            this.addForm.ruleForm.imgUrls.push(file.response.url)
            this.detailForm.ruleForm.imgUrls.push(file.response.url)
        },
        // 图片文件上传之前
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
        },
        //  上传限制提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 10 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        }
    }
}
</script>

<style lang="scss" scoped>
.btn {
    margin-bottom: 20px;
}
.editBtn span {
    color: blue;
    cursor: pointer;
    padding: 10px;
}
.creation_box {
    margin: 0;
    height: 100%;
    height: 100% !important;
}
.cateName {
    font-size: 19px;
    cursor: pointer;
    padding-right: 20px;
}
.red {
    color: red;
}
.red2 {
    color: red;
}
</style>
