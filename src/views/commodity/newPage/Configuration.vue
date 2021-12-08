<template>
    <div>
        <div class="main-content">
            <el-tabs v-model="act_tab">
                <el-tab-pane label="轮播主图" name="first">
                    <el-col class="til">
                        <span>轮播主图管理</span>
                        <el-button style="margin-left: 3rem" size="small" @click="insert"
                            >添加轮播图</el-button
                        >
                    </el-col>
                    <el-col
                        v-for="item in card_data"
                        :key="item.id"
                        style="padding: 1rem 0rem"
                    >
                        <div class="card">
                            <!-- <div class="image">
                                <img :src="imgheader + item.imgList[0]">
                            </div> -->
                            <el-upload
                                class="image"
                                :action="`${$baseUrl}/upload/uploadJcookRotation`"
                                :show-file-list="false"
                                :on-success="function (res, file) {
                                        return ImgeSuccess(res, file, item)
                                    }
                                "
                                :before-upload="beforeAvatarUpload"
                                :data="item"
                            >
                                <img
                                    v-if="item.imgList[0]"
                                    :src="imgheader + item.imgList[0].url"
                                />
                                <i
                                    v-else
                                    class="el-icon-plus avatar-uploader-icon"
                                ></i>
                            </el-upload>
                            <el-row class="texts">
                                <el-col class="text_til">
                                    <span>商品SKU</span>
                                    <el-popconfirm
                                        title="确定删除吗？"
                                        @onConfirm="del(item)"
                                        ><i
                                            class="el-icon-close"
                                            slot="reference"
                                        ></i>
                                    </el-popconfirm>
                                </el-col>
                                <el-col>
                                    <el-input
                                        size="small"
                                        :placeholder="item.skuId"
                                        disabled
                                    >
                                        <el-button
                                            slot="append"
                                            @click="changelink(item)"
                                            >更改链接</el-button
                                        >
                                    </el-input>
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {
    jcookRotationFindRotationList,
    jcookRotationInsert,
    jcookRotationUpdate,
    jcookRotationDelete
} from '@/api/shop.js'
export default {
    data() {
        return {
            act_tab: 'first',
            imgheader: process.env.VUE_APP_Image_API,
            card_data: [
                {
                    id: 2,
                    imgList: [
                        '/img/jcook/rotation/c46f4838c7544dc8b227bd46a9dd68ea.jpg'
                    ],
                    jcookGoodsId: 432281,
                    skuId: 122024
                }
            ],
            img_id: null,
            img_skuid: null,
            img_url: null
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            jcookRotationFindRotationList().then((res) => {
                this.card_data = res.data
            })
        },
        insert(item) {
            this.$prompt('商品SKU', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(({ value }) => {
                    jcookRotationInsert({
                        skuId: value,
                        imgUrls: []
                    }).then((res) => {
                        if (res.status) {
                            this.getData()
                            this.$message({
                                message: res.message,
                                type: 'success'
                            })
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                })
        },
        changelink(item) {
            this.$prompt('商品SKU', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
                .then(({ value }) => {
                    jcookRotationUpdate({
                        id: item.id,
                        skuId: value,
                        imgUrls: []
                    }).then((res) => {
                        if (res.status) {
                            this.getData()
                            this.$message({
                                message: res.message,
                                type: 'success'
                            })
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })
                })
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
        // 图片上传成功
        ImgeSuccess(res, file, item) {
            this.img_url = res.url
            this.img_id = item.id
            this.img_skuid = item.skuId
            if (this.img_id && this.img_url) {
                jcookRotationUpdate({
                    id: this.img_id,
                    skuId: this.img_skuid,
                    imgUrls: [this.img_url]
                }).then((res) => {
                    if (res.status) {
                        this.getData()
                        this.$message({
                            message: res.message,
                            type: 'success'
                        })
                    }
                })
            }
        },
        del(data) {
            // alert(1)
            jcookRotationDelete({
                rotationId: data.id
            }).then((res) => {
                if (res.status) {
                    this.getData()
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-tabs__content {
    padding: 1rem;
    .til {
        font-size: 18px;
    }
}
.card {
    // border: red solid 1px;
    width: 562px;
    height: 159px;
    display: flex;
    box-shadow: 0px 0px 3px;
    // background-color: black;
    border-radius: 10px;
    /deep/ .el-input-group__append {
        background-color: rgb(255, 108, 78);
        color: white;
    }
    .image {
        width: 50%;
        height: 89%;
        padding: 7px;

        img {
            width: 100%;
            max-height: 100%;
        }
        /deep/ .el-upload {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            text-align: center;
        }
    }
    .texts {
        width: 50%;
        .text_til {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            // color: rgb(255, 108, 78);
        }
        .el-col {
            padding: 0rem 1rem;
            margin-top: 1rem;
        }
    }
}
.el-button {
    background-color: rgb(255, 108, 78);
    color: white;
}
</style>