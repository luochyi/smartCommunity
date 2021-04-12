<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="vueForm"
                 @ruleSuccess='ruleSuccess'
                 :formObj='topiManagementFrom'>
          <template slot='fileUrls'>
            <template>
              <el-upload :action="`${$baseUrl}upload/uploadGambit`"
                         :on-success="uploadImgeSuccess"
                         :show-file-list="false"
                         :before-upload="beforeAvatarUpload">
                <div class='sys-image'
                     style='width:104px; height:104px'>
                  <div v-if="!fileUrls">
                    <i class="el-icon-plus"></i>
                    <p>上传照片</p>
                  </div>

                  <div v-else>
                    <el-image v-if="!editBool"
                              :src="`${$ImgUrl}/temp${fileUrls}`"
                              style="width: 104px; height: 104px"></el-image>
                    <el-image v-else
                              :src="`${$ImgUrl}${fileUrls}`"
                              style="width: 104px; height: 104px"></el-image>

                  </div>

                </div>
              </el-upload>
            </template>
          </template>

        </VueForm>
      </FromCard>
      <div slot="footer">
        <button class="btn-orange"
                @click="onSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="drawerClose"><span>取消</span></button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { gambitInsert, gambitFindById, gambitUpdate } from '@/api/butler'

export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: () => false
    },
    drawerTitle: {
      type: String,
      default: () => ""
    }
  },
  data () {
    return {
      drawer_vrisible: false,
      editBool: false, //是否为编辑状态
      editid: 0,
      // 保修上传图片路径显示
      fileUrls: '',
      topiManagementFrom: {
        ruleForm: {
          title: null,
          fileUrls: [],
          summary: null,
          endDate: null,
          beginDate: null,
          status: 1,
          isPublic: 1,
          isRating: 1,
          content: null
        },
        form_item: [
          {
            type: 'Input',
            label: '话题标题',
            placeholder: '请输入',
            width: '100%',
            prop: 'title',
            slotName: 'title'
          },
          {
            type: 'Input',
            label: '话题摘要',
            placeholder: '请输入',
            width: '100%',
            prop: 'summary',
            slotName: 'summary'
          },
          {
            type: 'DateTime',
            label: '开始时间',
            placeholder: '请输入',
            width: '100%',
            prop: 'beginDate'
          },
          {
            type: 'DateTime',
            label: '结束时间',
            placeholder: '请输入',
            width: '100%',
            prop: 'endDate'
          },
          {
            type: 'Select',
            label: '状态',
            placeholder: '请输入',
            options: [
              { value: 1, label: '启动(默认)' },
            ],
            width: '100%',
            prop: 'status'
          },
          {
            type: 'Select',
            label: '是否公开',
            placeholder: '请输入',
            options: [
              { value: 1, label: '是' },
            ],
            width: '100%',
            prop: 'isPublic'
          },
          {
            type: 'Select',
            label: '是否可评论',
            placeholder: '请输入',
            options: [
              { value: 1, label: '是' },
            ],
            width: '100%',
            prop: 'isRating'
          },
          {
            type: 'textarea',
            label: '话题内容',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'content'
          },
          {
            type: 'Slot',
            label: '图片上传',
            placeholder: '请输入',
            width: '100%',
            slotName: 'fileUrls',
            prop: 'fileUrls'
          },
        ],
        rules: {
          title: [{ required: true, message: '请填写话题标题', trigger: 'blur' }],
          fileUrls: [{ required: true, message: '请上传图片', trigger: 'change' }],
          summary: [{ required: true, message: '请输入话题摘要', trigger: 'change' }],
          tel: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
          beginDate: [{ required: true, message: '请选择话题开始时间', trigger: 'change' }],
          endDate: [{ required: true, message: '请选择话题结束时间', trigger: 'change' }],
          status: [{ required: true, message: '请选择状态', trigger: 'change' }],
          isPublic: [{ required: true, message: '请选择是否公开', trigger: 'change' }],
          isRating: [{ required: true, message: '请选择是否评论', trigger: 'change' }],
          content: [{ required: true, message: '请选择内容', trigger: 'blur' }],

        }
      },
      importHeaders: {
        'X-Admin-Token': sessionStorage.getItem(
          'X-Admin-Token'
        )
      },
    }
  },
  computed: {
  },
  methods: {
    // 图片上传成功
    uploadImgeSuccess (res, file) {
      console.log(res)
      this.fileUrls = res.url
      this.topiManagementFrom.ruleForm.fileUrls[0] = res.url
      this.editBool = false
    },
    // vueForm 验证通过提交服务器
    ruleSuccess (val) {
      let resData = {
        title: this.topiManagementFrom.ruleForm.title,
        fileUrls: this.topiManagementFrom.ruleForm.fileUrls,
        summary: this.topiManagementFrom.ruleForm.summary,
        endDate: this.topiManagementFrom.ruleForm.endDate,
        beginDate: this.topiManagementFrom.ruleForm.beginDate,
        status: this.topiManagementFrom.ruleForm.status,
        isPublic: this.topiManagementFrom.ruleForm.isPublic,
        isRating: this.topiManagementFrom.ruleForm.isRating,
        content: this.topiManagementFrom.ruleForm.content
      }
      if (this.editId) {
        resData.id = this.editId
        console.log(resData)
        gambitUpdate(resData).then(res => {
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$emit('submitSuccess')
            this.drawerClose()
          }
        })
      } else {
        gambitInsert(resData).then(res => {
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$emit('submitSuccess')
            this.drawerClose()
          }
        })
      }



    },
    // 提交调用子组件校验方法
    onSubmit () {
      this.$refs.vueForm.submitForm()
    },
    // 编辑
    edit (id) {
      let resData = {
        id: id,
      }

      gambitFindById(resData).then(result => {
        console.log(result)
        this.editId = result.id
        this.editBool = true
        this.topiManagementFrom.ruleForm.title = result.title
        this.topiManagementFrom.ruleForm.fileUrls[0] = result.imgUrls[0].url
        this.fileUrls = result.imgUrls[0].url
        this.topiManagementFrom.ruleForm.summary = result.summary
        this.topiManagementFrom.ruleForm.endDate = result.endDate
        this.topiManagementFrom.ruleForm.beginDate = result.beginDate
        this.topiManagementFrom.ruleForm.status = result.status
        this.topiManagementFrom.ruleForm.isPublic = result.isPublic
        this.topiManagementFrom.ruleForm.isRating = result.isRating
        this.topiManagementFrom.ruleForm.content = result.content
      })
    },
    // 候选人文件上传之前
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isJPG = file.type === 'image/png'
      const isPNG = file.type === 'image/jpeg'
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },
    drawerClose () {
      this.drawer_vrisible = false;
      this.editid = 0
      this.$refs.vueForm.reset()
      this.fileUrls = ''

      this.$emit('handleClose', 'Close')
    },
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.drawer_vrisible = newValue
      }
    }
  }
}
</script>
<style scoped lang='scss'>
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