<template>
    <div>
        <div>
            <div class="main-content">
                <div class="main-titel">
                    <span>产品类型系列</span>
                </div>
                <div class="content">
                    <!-- <el-button class="init-button" size="small" @click="edit()"
                        >修改类目</el-button
                    > -->
                    <div class="btn">
                        <el-button
                            class="init-button"
                            size="small"
                            @click="add()"
                            >新增类目</el-button
                        >
                    </div>
                    <div class="category">
                        <el-row>
                            <el-col :span="4">
                                <ul style="border-right: 1px solid #e6e6fa">
                                    <li
                                        v-for="(item, index) in this.options"
                                        :key="index"
                                        :class="{red: changeRed == index}" @click="change(index)"
                                    >
                                        <span
                                            class="cateName"
                                            @click="getChild(item)"
                                        >
                                            {{ item.name }}
                                        </span>
                                        <template>
                                            <el-button
                                                size="mini"
                                                @click="handleEdit(item)"
                                                >编辑</el-button
                                            >
                                            <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(item)"
                                                >删除</el-button
                                            >
                                        </template>
                                    </li>
                                </ul>
                            </el-col>
                            <el-col :span="10">
                                <ul style="margin-left: 30px">
                                    <li
                                        v-for="(item, index) in this
                                            .childrenOptions"
                                        :key="index"
                                    >
                                        <span class="cateName">
                                            {{ item.name }}
                                        </span>
                                        <template>
                                            <el-button
                                                size="mini"
                                                @click="handleEdit(item)"
                                                >编辑</el-button
                                            >
                                            <el-button
                                                size="mini"
                                                type="danger"
                                                @click="handleDelete(item)"
                                                >删除</el-button
                                            >
                                        </template>
                                    </li>
                                </ul>
                            </el-col>
                        </el-row>
                    </div>

                    <!-- 新增 -->
                    <Drawer
                        drawerTitle="新增分类"
                        @drawerClose="addClose"
                        :drawerVrisible="add_vrisible"
                    >
                        <div style="padding: 30px">
                            <FromCard>
                                <template slot="title">填写分类信息</template>
                                <template>
                                    <VueForm ref="addForm" :formObj="addForm">
                                        <template slot="imgUrls">
                                            <template>
                                                <el-upload
                                                    :action="`${$baseUrl}upload/uploadShoppingCategory`"
                                                    :on-success="ImgeSuccess"
                                                    :file-list="imglist"
                                                    :on-exceed="handleExceed"
                                                    :limit="1"
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
                                </template>
                            </FromCard>
                        </div>
                        <div slot="footer">
                            <button class="btn-orange" @click="addSubmit()">
                                <span>
                                    <i class="el-icon-circle-check"></i
                                    >提交</span
                                >
                            </button>
                            <button class="btn-gray" @click="addClose">
                                <span>取消</span>
                            </button>
                        </div>
                    </Drawer>
                    <Drawer
                        drawerTitle="修改分类名称"
                        @drawerClose="editClose"
                        :drawerVrisible="edit_vrisible"
                    >
                        <div style="padding: 30px">
                            <FromCard>
                                <template slot="title">填写分类名称</template>
                                <template>
                                    <VueForm ref="editForm" :formObj="editForm">
                                        <template slot="imgUrls">
                                            <template>
                                                <el-upload
                                                    :action="`${$baseUrl}upload/uploadShoppingCategory`"
                                                    :on-success="ImgeSuccess"
                                                    :file-list="imglist"
                                                    :on-exceed="handleExceed"
                                                    :limit="1"
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
                                </template>
                            </FromCard>
                        </div>
                        <div slot="footer">
                            <button class="btn-orange" @click="editSubmit()">
                                <span>
                                    <i class="el-icon-circle-check"></i
                                    >提交</span
                                >
                            </button>
                            <button class="btn-gray" @click="editClose">
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
    shopCategoryList,
    shopCategoryUpdate,
    shopCategoryDelete,
    shopCategoryInsert
} from '@/api/shop.js'
export default {
    data() {
        return {
            changeRed: -1,
            edit_vrisible: false,
            add_vrisible: false,
            imglist: [],
            options: [],
            childrenOptions: [],
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
            }
        }
    },
    mounted() {
        this.getDate()
    },
    methods: {
        change:function (index) {
        this.changeRed=index;
      },
        add() {
            this.add_vrisible = true
            this.addForm.form_item[0].options = [
                {
                    label: '顶层类',
                    value: '0'
                }
            ]
            shopCategoryList({ parentId: 0 }).then((res) => {
                res.data.forEach((element) => {
                    let obj = {
                        value: element.id,
                        label: element.name
                    }
                    this.addForm.form_item[0].options.push(obj)
                })
            })
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
            this.imglist = []
        },
        addSubmit() {
            let resData = {
                name: this.addForm.ruleForm.name,
                parentId: this.addForm.ruleForm.parentId,
                imgUrls: this.addForm.ruleForm.imgUrls,
                idPath: this.addForm.ruleForm.idPath
            }
            shopCategoryInsert(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    // this.$refs.table.loadData()
                    this.addClose()
                    this.getDate()
                }
            })
        },
        handleEdit(data) {
            console.log(data)
            this.edit_vrisible = true
            this.editForm.ruleForm.name = data.name
            this.editForm.ruleForm.id = data.id
            // this.editForm.ruleForm.imgUrls=data.imgList[0].url
             if (data.imgList.length) {
                            let obj = {
                                name: data.imgList[0].url,
                                url: data.imgList[0].url
                            }
                            this.editForm.ruleForm.imgUrls = [
                                data.imgList[0].url
                            ]
                            this.$set(this.imglist, 0, obj)
                        } else {
                            this.editForm.ruleForm.imgUrls = []
                        }
            console.log(this.editForm.ruleForm);
        },
        getDate() {
            shopCategoryList({ parentId: 0 }).then((res) => {
                console.log(res)
                this.options = res.data
            })
        },
        getChild(data) {
            // console.log(this.$refs['cascaderAddr'].getCheckedNodes()[0].data);
            // let that = this.$refs['cascaderAddr'].getCheckedNodes()[0].data
            // console.log(that);
            // shopCategoryList({parentId:that.id}).then((res)=>{
            //     this.$set(that,'children',res.data)
            //     console.log(that);
            // })
            console.log(data.id)
            shopCategoryList({ parentId: data.id }).then((res) => {
                console.log(res)
                this.childrenOptions = res.data
            })
        },
        editClose() {
            this.$refs.editForm.reset()
            this.edit_vrisible = false
             this.imglist = []
        },
        editSubmit() {
            let resData = {
                ...this.editForm.ruleForm,
                id: this.editForm.ruleForm.id,
                imgUrls: this.addForm.ruleForm.imgUrls,
            }
            shopCategoryUpdate(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.getDate()
                    this.editClose()
                    this.getChild(resData.id)
                }
            })
        },
        // 图片上传成功
        ImgeSuccess(res, file) {
            this.addForm.ruleForm.imgUrls[0] = file.response.url
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
                `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        },
        handleDelete(data) {
            console.log(data.id)
            this.$confirm('是否确认删除？删除不可恢复', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                confirmButtonClass: 'confirmButton',
                cancelButtonClass: 'cancelButton'
            })
                .then(() => {
                    shopCategoryDelete({ categoryId: data.id }).then((res) => {
                        if(res.status==false){
                            return
                        }else{
                            this.$message({
                            message: res.message,
                            type: 'success'
                        })
                        this.getDate()
                        this.getChild(data.id)
                        }
                        
                    })
                }).catch(action => { })
        }
    },
    watch: {
        'addForm.ruleForm.parentId': {
            handler(newValue) {
                console.log(newValue)
                if (newValue == 0) {
                    this.addForm.ruleForm.idPath = '0::'
                } else {
                    this.addForm.ruleForm.idPath = '0::' + newValue + '::'
                }
                console.log(this.addForm.ruleForm.idPath)
            },
            immediate: true
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
.red{
    color: red;
  }
</style>
