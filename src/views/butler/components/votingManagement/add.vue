<template>
  <div>
    <Drawer :drawerTitle="drawerTitle"
            @drawerClose="drawerClose"
            :drawerVrisible='drawer_vrisible'>
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="childFroms"
                 :formObj='votingFrom'>
          <!-- fileUrls -->
          <template slot='fileUrls'>
            <el-upload class="upload-demo"
                       action="http://test.akuhotel.com:8804/IntelligentCommunity/manage/upload/uploadVoteTitle"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :on-success="handleAvatarSuccess"
                       :before-remove="beforeRemove"
                       multiple
                       :limit="1"
                       :on-exceed="handleExceed"
                       :file-list="fileList">
              <el-button size="small"
                         type="primary">点击上传</el-button>
              <div slot="tip"
                   class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
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
      loading: false,
      options: [],
      drawer_vrisible: false,
      bool: false,
      votingFrom: {
        ruleForm: {
          title: null,
          status: null,
          type: null,
        },
        form_item: [
          {
            type: 'Input',
            label: '投票标题',
            placeholder: '请输入',
            width: '50%',
            prop: 'title'
          },
          {
            type: 'DateTime',
            label: '投票起始时间',
            placeholder: '请输入',
            width: '50%',
            prop: 'beginDate'
          },
          {
            type: 'DateTime',
            label: '投票结束时间',
            placeholder: '请输入',
            width: '50%',
            prop: 'endDate'
          }, {
            type: 'Select',
            label: '公开人群',
            placeholder: '请输入',
            options: [
              { value: 1, label: '业主' },
              { value: 2, label: '租户' },
              { value: 3, label: '全部' },
            ],
            width: '50%',
            prop: 'type'
          }, {
            type: 'textarea',
            label: '投票内容',
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
            prop: 'fileUrls',
            slotName: 'fileUrls'
          },
        ],
        rules: { title: [{ required: true, message: '请填写投票标题', trigger: 'blur' }] }
      },
      importHeaders: {
        'X-Admin-Token': sessionStorage.getItem(
          'X-Admin-Token'
        )
      },
      fileList: [
      ],
      froms: [],
      imageUrl: null
    }
  },
  mounted () {
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(fileList);
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    drawerClose () {
      this.drawer_vrisible = false;
      this.froms = []
      this.$refs.childFroms.reset()
      this.$emit('handleClose', 'Close')
    },
    ruleSubmit (val) {
      this.bool = val;
    },
    // 提交
    onSubmit () {

    },
    addForms () {
    }
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
</style>

