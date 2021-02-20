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
        </VueForm>
        <div style="padding:20px">
          <!-- 表格 -->
          <VueTable ref="table"
                    :config='config'>
            <template v-slot:handle="slotData">
              <div>
                <el-button class="init-text"
                           @click="details(slotData.data.id)"
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
                @click="goBack"><span>返回</span></button>
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
    },
    detailsData: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
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
            width: '100%',
            label: '投票标题',
            prop: 'title',
          },
          {
            type: 'span',
            width: '100%',
            label: '投票内容',
            prop: 'content',
          }
        ],
        rules: {
          content: [{ required: true },],
          title: [
            { required: true, message: '', trigger: 'blur' }
          ]
        },
      },
      config: {
        checkbox: false,
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '选项名', prop: 'name', width: 'auto' },
          { label: '票数', prop: 'total', width: 'auto' },
          { label: '操作', type: 'slot', prop: 'handle', slotName: 'handle', width: 'auto' },
        ],
        url: 'voteListVotePersonnel',
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
    details (obj) {
      this.$emit('details_obj', obj)
    },
    // 重置
    // 取消关闭esc
    handleClose () {
      this.$emit('handleClose', "Close")
    },
    // 返回详情弹窗
    goBack () {
      this.$emit('goBack', "goBack")
    }
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

        this.config.data.id = newValue
      },
      immediate: true
    },
    detailsData: {
      handler (newValue) {
        this.formData.ruleForm.title = newValue.title
        this.formData.ruleForm.content = newValue.content
      },
      deep: true
    },

  }
}
</script>

