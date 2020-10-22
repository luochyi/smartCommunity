<template>

  <div>
    <el-drawer title="我是标题"
               :visible.sync="isVisibleDrawe"
               size="58%"
               :before-close="handleClose"
               :with-header="false">
      <div class="drawer-box">
        <div class="dra-header">
          <span>投票详情</span>
        </div>
        <div class="dra-body">
          <div class="dra-content">
            <div class="content-titel">
              <span>活动信息</span>
            </div>
            <div class="">
              <!-- from 表单 -->
              <form-datechildren :formItem="form_item"
                                 :rulesItem="rules_item"
                                 ref="formData">
              </form-datechildren>
              <div style="padding:20px">
                <!-- 表格 -->
                <tableData :config="table_config">
                  <template slot="button"
                            slot-scope="slotData">
                    <el-button type="text"
                               class="init-text"
                               v-model="slotData.data.button"
                               @click="details(slotData.data)">详情</el-button>
                  </template>
                </tableData>
                <!-- 页码 -->
                <table-pagination :pageSize='10'
                                  :totalNumber='30'>
                </table-pagination>
              </div>
            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <button class="dra-cancel"
                    @click="goBack()"><span>返回</span></button>
          </div>
        </div>
      </div>
    </el-drawer>

  </div>
</template>

<script>
// /Users/apple/Desktop/smartCommunity/basic-admin/src/components/form/formDate.vue
import formDatechildren from '@/components/form/formDatechildren'

export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    formDatechildren
  },
  data () {
    return {
      isVisibleDrawe: false,
      form_item: [
        {
          type: 'span',
          value: '赛龙舟节目最美龙舟评选',
          label: '投票标题',
          prop: 'userNam2e',
          // disabled: 1
        },
        {
          type: 'span',
          value: '请大家踊跃参加，选举出2020年最美龙舟队',
          label: '投票内容',
          prop: 'content',
          width: '100%'
        }
        // imagePreview
      ],
      rules_item: {
        userNam2e: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '', trigger: 'blur' }
        ]
        // date userNam2e
      },
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '选项名', prop: 'table2', width: 'auto' },
          { label: '票数', prop: 'table3', width: 'auto' },
          {
            label: '操作', prop: 'table4', width: 'auto'
          },
        ],
        table_data: [
          {
            table1: '12幢1023',
            table2: '曾号',
            table3: '1884567790',
            table4: '2020-06-23 12:00',
          },
          {
            table1: '13幢1223',
            table2: '曾号',
            table3: '1884567792',
            table4: '2020-06-23 12:00',
          }, {
            table1: '1幢123',
            table2: '陈美',
            table3: '1884567790',
            table4: '2020-06-23 12:00',
          }, {
            table1: '10幢1023',
            table2: '李佳',
            table3: '1184527790',
            table4: '2020-06-23 12:00',
          },

        ]
      }

    }
  },
  mounted () {
  },
  methods: {

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
        console.log(newValue)
      },
      immediate: true
    },

  }
}
</script>
<style scoped>
.content-titel2 {
  margin: 0px 0px 20px 30px;
  padding-top: 30px;
  border-top: 1px solid #e8e8e8;
}
</style>
