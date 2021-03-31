<template>

  <div>
    <Drawer drawerTitle="投票详情"
            :drawerVrisible="isVisibleDrawe"
            size="58%"
            @drawerClose="handleClose">
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="childFroms"
                 :formObj='formData'>
          <template slot='imgUrls'>
            <div class='demo-image__preview'>
              <el-image style="width: 100px; height: 100px"
                        :src="url"
                        :preview-src-list="srcList">
              </el-image>
            </div>
          </template>
        </VueForm>
        <div style="padding:20px">
          <!-- 表格 -->
          <VueTable ref="table"
                    :config='config'>
            <template v-slot:handle="slotData">
              <div>
                <el-button class="init-text"
                           @click="details(slotData.data)"
                           type="text">
                  <span>详情</span>
                </el-button>
              </div>
            </template>
          </VueTable>
        </div>
      </FromCard>
      <div slot="footer">
        <button class="btn-gray"
                @click="handleClose"><span>关闭</span></button>
      </div>
    </Drawer>
  </div>
</template>
<script>
import { voteFindDetailById } from '@/api/butler'
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false
    },
    voteId: {
      type: Number,
      default: () => 0
    }
  },
  data () {
    return {
      url: '',
      srcList: ['https://dss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1999921673,816131569&fm=26&gp=0.jpg'],
      drawer: false,
      isVisibleDrawe: false,
      formData: {
        ruleForm: {
          title: null,
          beginDate: null,
          content: null,
          endDate: null,
          imgUrls: null,
          type: null,
        },
        form_item: [
          {
            type: 'span',
            width: '50%',
            label: '投票标题',
            prop: 'title',
          },
          {
            type: 'span',
            width: '50%',
            label: '投票起始时间',
            prop: 'beginDate',
          },
          {
            type: 'span',
            width: '50%',
            label: '投票结束时间',
            prop: 'endDate',
          }
          ,
          {
            type: 'span',
            width: '50%',
            label: '公开人群',
            prop: 'type',
          },
          {
            type: 'Slot',
            width: '50%',
            label: '图片查看',
            prop: 'imgUrls',
            slotName: 'imgUrls',

            width: '100%'
          }
          ,
          {
            type: 'span',
            width: '50%',
            label: '投票内容',
            prop: 'content',
            width: '100%'
          }
        ],
        rules: {
          content: [{ required: true },],
          beginDate: [
            { required: true, message: '', trigger: 'blur' },
          ],
          endDate: [
            { required: true, message: '', trigger: 'blur' },
          ],
          imgUrls: [
            { required: true, message: '', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '', trigger: 'blur' }
          ]
        },
      },
      details_voteId: null,
      config: {
        checkbox: false,
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '选项名', prop: 'name', width: 'auto' },
          { label: '票数', prop: 'total', width: 'auto' },
          { label: '操作', type: 'slot', prop: 'handle', slotName: 'handle', width: 'auto' },
        ],
        url: 'voteListDetailList',
        table_data: [],
        search_item: [],
        data: {
          pageNum: 1,
          size: 5,
          id: 1
        },
      },
    }
  },
  methods: {
    // 提交
    onSubmit () {
      this.isVisibleDrawe = false
      this.$emit('handleClose', "onSubmit")
    },
    details (data) {
      data.title = this.formData.ruleForm.title
      data.content = this.formData.ruleForm.content
      this.$emit('details_obj', data)
    },
    getData () {
      if (!this.isVisibleDrawe || !this.details_voteId) {
        return
      }
      let resData = {
        id: this.details_voteId
      }
      // 修改表格Id
      this.config.data.id = this.details_voteId
      voteFindDetailById(resData).then(res => {
        this.formData.ruleForm.title = res.voFindDetailByIdVote.title
        this.formData.ruleForm.beginDate = res.voFindDetailByIdVote.beginDate
        this.formData.ruleForm.content = res.voFindDetailByIdVote.content
        this.formData.ruleForm.endDate = res.voFindDetailByIdVote.endDate
        // this.formData.ruleForm.imgUrls = res.voFindDetailByIdVote.imgUrls[0]
        this.url = this.$ImgUrl + res.voFindDetailByIdVote.imgUrls[0].url
        this.srcList[0] = this.$ImgUrl + res.voFindDetailByIdVote.imgUrls[0].url
        this.formData.ruleForm.type = res.voFindDetailByIdVote.type

      })
      // let resDataD = {
      //   pageNum: 1,
      //   size: 10,
      //   id: this.details_voteId
      // }
      // voteListDetailCandidate(resDataD).then(res => {
      //   console.log(res)
      // })
    },
    // 重置
    // 取消关闭esc
    handleClose () {
      this.isVisibleDrawe = false
      this.$emit('handleClose', "Close")
    },

  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.isVisibleDrawe = newValue
      },
      immediate: true
    },
    voteId: {
      handler (newValue) {
        this.details_voteId = newValue
        this.getData()
      },
      immediate: true
    },

  }
}
</script>
<style lang="scss" scoped>
</style>