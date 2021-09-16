<template>
  <div class="main-content">
    <div class="main-titel">
      <span>公告管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="add()"
                   icon="el-icon-plus">新增公告</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <!-- <button @click="dialogPreview = true">预览</button> -->
              <button @click="edit(table_row)">修改</button>
              <!-- <button>打印</button> -->
              <button @click="release(table_row)">发布</button>
              <button @click='del(table_row)'>删除</button>
            </div>
          </template>
</VueTable>

<!-- 新增修改公告 -->
<Drawer :drawerTitle="announceTitle" @drawerClose="announceClose" :drawerVrisible='announce_vrisible'>
    <div style="padding:30px">
        <FromCard>
            <template slot="title">基本信息</template>
            <template>
                <VueForm ref="announceVueForm"
                         @ruleSuccess='announceRuleSubmit'
                         :formObj='announceForm'>
                  <template slot='excelFileUrls'>
                    <template>
                      <el-upload :action="`${$baseUrl}upload/uploadAnnouncement`"
                                 :on-success="ImgeSuccess"
                                 :file-list="imglist"
                                 :on-exceed="handleExceed"
                                 :limit="1"
                                 accept=".jpg,.png,.JPG,.PNG"
                                 :before-upload="beforeAvatarUpload">
                        <el-button icon="el-icon-edit"
                                   size="small">上传图片</el-button>
                        <span style='margin-left:10px;font-size:12px;color:#444444'>建议比例：3:2</span>
                        <div slot="tip"
                             class="el-upload__tip">
                          <span>支持扩展名：png,jpg</span>
                        </div>
                      </el-upload>
                    </template>
            </template>
            <template slot='fileDocUrl'>
                    <template>
                      <el-upload :action="`${$baseUrl}upload/uploadAnnouncementDoc`"
                                 :on-success="fileSuccess"
                                 :on-remove="wordRemove"
                                 :on-exceed="handleExceed"
                                 :file-list="wordList"
                                 accept=".doc,.DOC,.docx,.DOCX"
                                 :limit="1"
                                 :before-upload="beforeFileUpload">
                        <el-button icon="el-icon-edit"
                                   size="small">上传文件</el-button>
                        <div slot="tip"
                             class="el-upload__tip">
                          <span>支持扩展名：doc,docx</span>
                        </div>
                      </el-upload>
                    </template>
            </template>
            </VueForm>
            </template>
        </FromCard>
    </div>
    <div slot="footer">
        <button class="btn-orange" @click="announceSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray" @click="announceClose"><span>取消</span></button>
    </div>
</Drawer>
<!-- 预览 -->
<el-dialog class="dialogPreview" title="预览" :visible.sync="dialogPreview" width="100%%" height="100%" top="0" Dialog>
    <div class="preview-header">
        <div class="esc-preview" @click="dialogPreview = false">
            <i class="el-icon-s-marketing" style="font-size:24px;margin-left:33px;margin-right:9px"></i>
            <span>退出预览</span>
        </div>
    </div>
    <div class="preview-body">
        <div class="body-content">
            <div class="preview-img">
                <div class="preview-content">
                    <div class="preview-title">
                        <span>新政！宁波市“无房家庭”可优先购买一套商品房</span>
                    </div>
                    <div class="preview-content-img"></div>
                    <div class="preview-content-text">
                        <p>
                            今天，宁波市住房和城乡建设局、宁波市自然资源和规 划局联合发布《关于进一步完善商品住房销售行为切实保障居民自住需求的通知》（以下简称《通知》）。 该《通知》意在保障居民自住需求，抑制投机投资行为， 《通知》明确符合条件的“无房家庭”可在市六区优先认购1套商品 住房，该套房要求在取得不动产权属证书满5年后方可转让，该新政从发布之日起实施。
                        </p>
                        <p>
                            今天，宁波市住房和城乡建设局、宁波市自然资源和规 划局联合发布《关于进一步完善商品住房销售行为切实保障居民自住需求的通知》（以下简称《通知》）。 该《通知》意在保障居民自住需求，抑制投机投资行为， 《通知》明确符合条件的“无房家庭”可在市六区优先认购1套商品 住房，该套房要求在取得不动产权属证书满5年后方可转让，该新政从发布之日起实施。
                        </p>
                        <p>
                            今天，宁波市住房和城乡建设局、宁波市自然资源和规 划局联合发布《关于进一步完善商品住房销售行为切实保障居民自住需求的通知》（以下简称《通知》）。 该《通知》意在保障居民自住需求，抑制投机投资行为， 《通知》明确符合条件的“无房家庭”可在市六区优先认购1套商品 住房，该套房要求在取得不动产权属证书满5年后方可转让，该新政从发布之日起实施。
                        </p>
                        <p>
                            今天，宁波市住房和城乡建设局、宁波市自然资源和规 划局联合发布《关于进一步完善商品住房销售行为切实保障居民自住需求的通知》（以下简称《通知》）。 该《通知》意在保障居民自住需求，抑制投机投资行为， 《通知》明确符合条件的“无房家庭”可在市六区优先认购1套商品 住房，该套房要求在取得不动产权属证书满5年后方可转让，该新政从发布之日起实施。
                        </p>
                    </div>
                    <div class="preview-content-footer">
                        <span>广西印象物业服务有限责任公司 发布于 2020-08-12</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</el-dialog>
</div>
</div>
</div>
</template>
<script>
    import {
        announcementManagementRelease,
        announcementManagementFindById,
        announcementManagementInsert,
        announcementManagementUpdate
    } from '@/api/operation.js'
    import previewImg from '@/assets/images/dialogPreviewbg.png'
    export default {
        data() {
            return {
                // 添加
                announceTitle: '新增公告',
                announce_vrisible: false,
                previewImg: previewImg,
                dialogPreview: false,
                table_row: [],
                // 上传word文件
                wordList: [],
                // 上传img文件
                imglist: [],
                config: {
                    thead: [{
                        label: '序号',
                        type: 'index',
                        width: '80'
                    }, {
                        label: '公告标题',
                        prop: 'title',
                        width: 'auto'
                    }, {
                        label: '推送对象',
                        prop: 'pushObject',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.pushObject) {
                                case 1:
                                    return '业主'
                                    break
                                case 2:
                                    return '租户'
                                    break
                                case 3:
                                    return '业主和租户'
                                    break
                                case 4:
                                    return '管家'
                                    break
                            }
                        }
                    }, {
                        label: '阅读量',
                        prop: 'readingVolume',
                        width: 'auto'
                    }, {
                        label: '状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '未发布'
                                    break
                                case 2:
                                    return '已发布'
                                    break
                                case 3:
                                    return '定时发布'
                                    break
                            }
                        }
                    }, {
                        label: '创建人',
                        prop: 'createName',
                        width: 'auto'
                    }, {
                        label: '更新时间',
                        prop: 'updateDate',
                        width: 'auto'
                    }],
                    table_data: [],
                    url: 'announcementManagementList',
                    search_item: [{
                        type: 'Input',
                        label: '公告标题',
                        placeholder: '请输入内容',
                        prop: 'title'
                    }, {
                        type: 'select',
                        label: '公告状态',
                        value: '',
                        options: [{
                            label: '未发布',
                            value: '1'
                        }, {
                            label: '已发布',
                            value: '2'
                        }],
                        placeholder: '请选择',
                        prop: 'status'
                    }],
                    data: {
                        pageNum: 1,
                        size: 10
                    }
                },
                announceForm: {
                    ruleForm: {
                        title: null,
                        pushObject: null,
                        excelFileUrls: [],
                        content: null,
                        fileDocUrl: null,
                        fileDocName:null,
                        status: 1,
                        scheduledReleaseTime: null
                    },
                    form_item: [{
                        type: 'Input',
                        label: '公告标题',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'title'
                    }, {
                        type: 'Select',
                        label: '推送对象',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'pushObject',
                        options: [{
                            label: '业主',
                            value: 1
                        }, {
                            label: '租户',
                            value: 2
                        }, {
                            label: '业主和租户',
                            value: 3
                        },{
                            label: '管家',
                            value: 4
                        }]
                    }, {
                        type: 'Slot',
                        label: '公告图片',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'excelFileUrls',
                        slotName: 'excelFileUrls'
                    }, {
                        type: 'textarea',
                        label: '公告内容',
                        placeholder: '请输入公告内容',
                        prop: 'content',
                        width: '100%',
                        rows: 5
                    }, {
                        type: 'Slot',
                        label: '上传文件',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'fileDocUrl',
                        slotName: 'fileDocUrl'
                    }, {
                        type: 'Select',
                        label: '状态',
                        placeholder: '请输入',
                        prop: 'status',
                        width: '100%',
                        options: [{
                            label: '未发布',
                            value: 1
                        }, {
                            label: '已发布',
                            value: 2
                        }, {
                            label: '定时发布',
                            value: 3
                        }]
                    }, {
                        type: 'DateTime',
                        label: '定时时间',
                        placeholder: '请输入',
                        width: '100%',
                        disabled: true,
                        prop: 'scheduledReleaseTime'
                            // disabled:true
                    }],
                    rules: {
                        title: [{
                            required: true,
                            message: '请输入',
                            trigger: 'blur'
                        }],
                        pushObject: [{
                            required: true,
                            message: '请输入',
                            trigger: 'change'
                        }],
                        excelFileUrls: [{
                            required: true,
                            message: '请上传图片',
                            trigger: 'change'
                        }],
                        content: [{
                            required: true,
                            message: '请输入公告内容',
                            trigger: 'blur'
                        }],
                        fileDocUrl: [{
                            required: true,
                            message: '请选择文件',
                            trigger: 'change'
                        }],
                        status: [{
                            required: true,
                            message: '请选择状态',
                            trigger: 'change'
                        }]
                    }
                }
            }
        },
        methods: {
            // 表格选中
            tableCheck(data) {
                this.table_row = data
            },
            // 弹窗关闭
            announceClose() {
                this.announce_vrisible = false
                this.wordList = []
                this.imglist = []
                this.$refs.announceVueForm.reset()
            },
            // 提交验证通过
            announceRuleSubmit() {
                let resData = {
                        title: this.announceForm.ruleForm.title,
                        pushObject: this.announceForm.ruleForm.pushObject,
                        excelFileUrls: this.announceForm.ruleForm.excelFileUrls,
                        content: this.announceForm.ruleForm.content,
                        fileDocUrl: this.announceForm.ruleForm.fileDocUrl,
                        status: this.announceForm.ruleForm.status,
                        fileDocName: this.announceForm.ruleForm.fileDocName,
                        scheduledReleaseTime: this.announceForm.ruleForm
                            .scheduledReleaseTime
                    }
                    // scheduledReleaseTime
                if (
                    this.announceForm.ruleForm.status === 3 &&
                    !this.announceForm.ruleForm.scheduledReleaseTime
                ) {
                    this.$message.error('请选择定时时间')

                    return
                }

                if (this.announceTitle === '新增公告') {
                    // 新增公告
                    announcementManagementInsert(resData).then((res) => {
                        console.log(res)
                        if (res.status) {
                            this.$message({
                                message: res.message,
                                type: 'success'
                            })
                            this.announceClose()
                            this.$refs.table.loadData()
                        }
                    })
                } else {
                    resData.id = this.table_row[0].id
                        // 修改公告
                    announcementManagementUpdate(resData).then((res) => {
                        console.log(res)
                        if (res.status) {
                            this.$message({
                                message: res.message,
                                type: 'success'
                            })
                            this.announceClose()
                            this.$refs.table.loadData()
                        }
                    })
                }

            },
            // 提交验证
            announceSubmit() {
                this.$refs.announceVueForm.submitForm()
            },
            // 添加
            add() {
                this.announceTitle = '新增公告'
                this.announce_vrisible = true
            },
            // 修改
            edit(data) {
                if (data.length) {
                    if (data.length > 1) {
                        this.$message.error('只能单条数据修改')
                        return
                    }
                } else {
                    this.$message.error('请选中需要修改的数据')
                    return
                }
                let resData = {
                    id: data[0].id
                }
                announcementManagementFindById(resData).then((res) => {
                    if (res.status) {
                        console.log(res.data)
                        const data = res.data
                        this.announceForm.ruleForm.title = data.title
                        this.announceForm.ruleForm.pushObject = data.pushObject
                        this.announceForm.ruleForm.excelFileUrls[0] =
                            data.imgUrls[0].url

                        this.announceForm.ruleForm.content = data.content
                        this.announceForm.ruleForm.fileDocUrl = data.fileDocUrl
                        this.announceForm.ruleForm.status = data.status
                        this.announceForm.ruleForm.scheduledReleaseTime =
                            data.scheduledReleaseTime
                            // this.wordList[0].name = data.fileDocUrl
                            // this.wordList[0].url = data.url

                        let obj = {
                            name: data.fileDocUrl,
                            url: data.fileDocUrl
                        }
                        this.$set(this.wordList, '0', obj)

                        let imgObj = {
                            name: data.imgUrls[0].url,
                            url: data.imgUrls[0].url
                        }
                        this.$set(this.imglist, '0', imgObj)
                        this.announceTitle = '修改公告'

                        this.announce_vrisible = true
                    }
                })
            },
            // 图片上传成功
            ImgeSuccess(res, file) {
                this.announceForm.ruleForm.excelFileUrls[0] = file.response.url
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
            // word 文件上传成功
            fileSuccess(res, file) {
                this.announceForm.ruleForm.fileDocUrl = file.response.url
            },
            // word 文件上传限制提示
            handleExceed(files, fileList) {
                this.$message.warning(
                    `当前限制选择 1 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
                )
            },
            wordRemove() {
                this.announceForm.ruleForm.fileDocUrl = null
            },
            // word 文件上传之前
            beforeFileUpload(file) {
                console.log(file)
                this.announceForm.ruleForm.fileDocName = file.name
                const isLt2M = file.size / 1024 / 1024 < 2
                const fileType =
                    file.name.endsWith('.doc') || file.name.endsWith('.docx')
                console.log(fileType)
                if (!fileType) {
                    this.$message.error('上传头像图片只能是 doc/docx 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 2MB!')
                }
                return fileType && isLt2M
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
            },
            // 发布
            release(data) {
                if(data.length!=1){
                    this.$message.error('只能选择一条公告发布')
                    return
                }
                    if(data[0].status===2){
                        this.$message({
                            type:'error',
                            message:'已发布'
                        })
                        return
                    }
                    let arr = []
                    for (let i = 0; i < this.table_row.length; i++) {
                        arr.push(this.table_row[i].id)
                    }
                    this.$confirm('确认现在发布？', '发布提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            confirmButtonClass: 'confirmButton',
                            cancelButtonClass: 'cancelButton'
                        })
                        .then(() => {
                            let resData = {
                                ids: arr
                            }
                            announcementManagementRelease(resData).then(
                                (result) => {
                                    if (result.status) {
                                        this.$message({
                                            type: 'success',
                                            message: result.message
                                        })
                                        this.$refs.table.loadData()
                                    }
                                }
                            )
                        })
                        .catch((action) => {})
                    
            }
        },
        watch: {
            //  announceForm: {
            // ruleForm:
            'announceForm.ruleForm.status': {
                handler(newValue) {
                    console.log(newValue)
                    if (newValue === 3) {
                        //   // form_item
                        // scheduledReleaseTime
                        this.announceForm.form_item.find((item) => {
                            if (item.prop === 'scheduledReleaseTime') {
                                item.disabled = false
                            }
                        })
                    } else {
                        this.announceForm.form_item.find((item) => {
                            if (item.prop === 'scheduledReleaseTime') {
                                item.disabled = true
                            }
                        })
                    }
                },
                immediate: true
            }
        },

    }
</script>
<style scoped>
    .preview-header {
        width: 100%;
        height: 62px;
        display: flex;
        align-items: center;
        /* background: #e6e7e9; */
    }
    
    .esc-preview {
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
    }
    
    .body-content {
        width: 100%;
        height: calc(100vh - 62px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    /* previewImg */
    
    .preview-img {
        width: 344px;
        height: 689px;
        background-image: url(../../../assets/images/dialogPreviewbg.png);
        background-size: 100% 100%;
    }
    
    .preview-titel {
        font-size: 20px;
    }
    
    .preview-content {
        margin: 120px 30px 90px 30px;
        height: calc(100% - 210px);
        overflow-y: auto;
    }
    
    .preview-title {
        text-align: center;
        font-family: PingFangSC-Medium, PingFang SC;
        font-size: 12px;
        font-weight: 600;
        color: #000000;
        line-height: 17px;
    }
    
    .preview-content-img {
        width: 276px;
        height: 94px;
        margin: 22px auto;
        background: gray;
    }
    
    .preview-content-text {
        font-size: 12px;
        font-weight: 400;
        color: #333333;
        line-height: 23px;
        transform: scale(0.91);
    }
    
    .preview-content-footer {
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        margin-left: -20px;
        transform: scale(0.75);
    }
</style>