<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="vueForm"
                 @ruleSuccess='ruleSuccess'
                 :formObj='reportRepairFrom'>
          <template slot='type'>
            <el-radio v-model="reportRepairFrom.ruleForm.type"
                      label="1">部分公开</el-radio>
            <el-radio v-model="reportRepairFrom.ruleForm.type"
                      label="2">不公开</el-radio>
          </template>
          <template slot='fileUrls'>
            <template>
              <el-upload :action="`${$baseUrl}upload/uploadRepair`"
                         :on-success="voteImgeSuccess"
                         :show-file-list="false"
                         :before-upload="beforeAvatarUpload">
                <div class='sys-image'
                     style='width:104px; height:104px'>
                  <div v-if="!reportRepairFrom.ruleForm.fileUrls">
                    <i class="el-icon-plus"></i>
                    <p>上传照片</p>
                  </div>
                  <el-image v-else
                            :src="`${$ImgUrl}temp/${reportRepairFrom.ruleForm.fileUrls}`"
                            style="width: 104px; height: 104px"></el-image>
                </div>
              </el-upload>
            </template>

          </template>
          <template v-slot:repairman>
            <el-select v-model="reportRepairFrom.ruleForm.repairman"
                       :remote-method='remoteMethod'
                       @change='change'
                       @focus='sefocus'
                       :loading="loading"
                       remote
                       style="width:240px"
                       filterable
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
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
import { reportRepairInsert, reportRepairFindById } from '@/api/butler'
import { userResidentFindAllBySearch } from '@/api/basic'

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
      options: [],
      loading: false,
      drawer_vrisible: false,
      editBool: false, //是否为编辑状态
      editid: 0,
      // 保修上传图片路径显示
      fileUrls: '',
      reportRepairFrom: {
        ruleForm: {
          type: '1',
          fileUrls: [],
          reportDetail: null,
          repairman: null,
          tel: null,
          repairDate: null,
          repairFrom: 1,
        },
        form_item: [
          {
            type: 'Slot',
            label: '报修区域',
            placeholder: '请输入',
            width: '100%',
            prop: 'type',
            slotName: 'type'
          },
          {
            type: 'Slot',
            label: '图片',
            placeholder: '请输入',
            width: '100%',
            prop: 'fileUrls',
            slotName: 'fileUrls'
          },
          {
            type: 'textarea',
            label: '报修详情',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'reportDetail'
          },
          // {
          //   type: 'Slot',
          //   label: '报修人',
          //   placeholder: '请输入',
          //   width: '50%',
          //   prop: 'repairman',
          //   slotName: 'repairman'
          // },
          {
            type: 'Slot',
            label: '报修人',
            placeholder: '请输入',
            width: '50%',
            slotName: 'repairman',
            prop: 'repairman'
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            width: '50%',
            prop: 'tel'
          },
          {
            type: 'DateTime',
            label: '报修时间',
            placeholder: '请输入',
            width: '50%',
            prop: 'repairDate'
          },
          {
            type: 'Select',
            label: '报修来源',
            placeholder: '请输入',
            disabled: true,
            options: [
              { value: 1, label: '业主来电' },
            ],
            width: '50%',
            prop: 'repairFrom'
          },
        ],
        rules: {
          type: [{ required: true, message: '请填写投票标题', trigger: 'blur' }],
          fileUrls: [{ required: true, message: '请上传图片', trigger: 'change' }],
          reportDetail: [{ required: true, message: '请输入报修详情', trigger: 'change' }],
          tel: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
          repairDate: [{ required: true, message: '请选择报修时间', trigger: 'blur' }],
          repairman: [{ required: true, message: '请填写投票内容', trigger: 'blur' }],
          repairFrom: [{ required: true, message: '请输入报修人', trigger: 'change' }]
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
    remoteMethod (val) {
      let reeData = {
        pageNum: 1,
        size: 20,
        name: val
      }
      this.loading = true
      userResidentFindAllBySearch(reeData).then(res => {
        this.options = res.tableList
        this.loading = false
      })
    },
    sefocus () {
      let reeData = {
        pageNum: 1,
        size: 20
      }
      this.loading = true
      userResidentFindAllBySearch(reeData).then(res => {
        this.options = res.tableList
        // let obj = {
        //   id: 0,
        //   idNumber: "",
        //   idType: '',
        //   name: "（空）",
        //   tel: "",
        // }
        // this.options.unshift(obj)
        this.loading = false
        console.log(this.options)
      })
    },
    change (value) {
      console.log(value)
    },
    // 图片上传成功
    voteImgeSuccess (res, file) {
      this.fileUrls = res.url

      this.reportRepairFrom.ruleForm.fileUrls[0] = res.url
    },
    // vueForm 验证通过提交服务器
    ruleSuccess (val) {
      let resData = {
        type: parseInt(this.reportRepairFrom.ruleForm.type),
        fileUrls: this.reportRepairFrom.ruleForm.fileUrls,
        reportDetail: this.reportRepairFrom.ruleForm.reportDetail,
        repairman: this.reportRepairFrom.ruleForm.repairman,
        tel: this.reportRepairFrom.ruleForm.tel,
        repairDate: this.reportRepairFrom.ruleForm.repairDate,
      }
      reportRepairInsert(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$emit('submitSuccess')
          this.drawerClose()
        }
      })

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
      reportRepairFindById(resData).then(result => {
        console.log(result)
        this.reportRepairFrom.ruleForm.type = result.type + ''
        this.reportRepairFrom.ruleForm.fileUrls = this.$imgUrl + result.imgUrls[0].url
        this.reportRepairFrom.ruleForm.reportDetail = result.reportDetail
        this.reportRepairFrom.ruleForm.repairman = result.repairman
        this.reportRepairFrom.ruleForm.tel = result.tel
        this.reportRepairFrom.ruleForm.repairDate = result.repairDate
      })
      console.log(this.reportRepairFrom.ruleForm)
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
      this.$refs.vueForm.reset()

      this.reportRepairFrom.ruleForm.fileUrls = []
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