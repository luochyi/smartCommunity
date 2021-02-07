<template>

  <div>
    <Drawer drawerTitle="投票详情"
            :drawerVrisible="isVisibleDrawe"
            size="58%"
            :before-close="handleClose">
      <FromCard style="margin:30px">
        <span slot="title">基本信息</span>
        <VueForm ref="childFroms"
                 :formObj='formData'>
        </VueForm>
        <div style="padding:20px">
          <!-- 表格 -->
          <!-- <tableData :config="table_config">
            <template slot="button"
                      slot-scope="slotData">
              <el-button type="text"
                         class="init-text"
                         v-model="slotData.data.button"
                         @click="details(slotData.data)">详情</el-button>
            </template>
          </tableData> -->
          <VueTable ref="table"
                    :config='config'>

          </VueTable>
        </div>
      </FromCard>
      <div slot="footer">
        <button class="btn-orange"
                @click="onSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="handleClose"><span>取消</span></button>
      </div>
    </Drawer>

  </div>
</template>

<script>
import { voteFindDetailById, voteListVotePersonnel, voteListDetailCandidate } from '@/api/butler'
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
  },
  data () {
    return {
      drawer: false,
      isVisibleDrawe: false,
      formData: {
        ruleForm: {
          title: '123123',
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
            type: 'imagePreview',
            width: '50%',
            label: '公开人群',
            prop: 'imgUrls',
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
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          endDate: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          imgUrls: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          ],
          type: [
            { required: true, message: '', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '', trigger: 'blur' }
          ]
          // date userNam2e
        },
      },
      details_voteId: null,
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '选项名', prop: 'table2', width: 'auto' },
          { label: '票数', prop: 'table3', width: 'auto' },
          {
            label: '操作', prop: 'button', width: 'auto', type: "slot",
            slotName: "button",
          },
        ],
        table_data: [
          {
            table1: '1',
            table2: '紫薯龙舟队',
            table3: '20',
            button: '详情',
          },
          {
            table1: '2',
            table2: '龙舟队',
            table3: '22',
            button: '详情',
          }, {
            table1: '3',
            table2: '端午龙舟队',
            table3: '50',
            table4: '详情',
          }, {
            table1: '4',
            table2: '衬衣龙舟队',
            table3: '20',
            button: '详情',
          },

        ]
      },
      config: {
        checkbox: false,
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '投票标题', prop: 'title', width: 'auto' },
          { label: '投票开始时间', prop: 'beginDate', width: 'auto' },
          { label: '投票结束时间', prop: 'endDate', width: 'auto' },
          { label: '活动状态', prop: 'status', width: 'auto' },
          { label: '备注', prop: 'voteResult', width: 'auto' },
        ],
        url: 'voteList',
        table_data: [],
        search_item: [],
        data: {
          pageNum: 1,
          size: 3,
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
    getData () {
      if (!this.isVisibleDrawe || !this.details_voteId) {
        return
      }
      let resData = {
        id: this.details_voteId
      }
      voteFindDetailById(resData).then(res => {
        // console.log(res)
      })
      let resDataD = {
        pageNum: 1,
        size: 10,
        id: this.details_voteId
      }
      voteListDetailCandidate(resDataD).then(res => {
        console.log(res)
      })
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