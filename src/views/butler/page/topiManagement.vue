<style scoped>
.tips {
  margin: 20px;
  height: 38px;
  line-height: 38px;
  background: #fafafa;
  border-radius: 4px;
  opacity: 0.8;
  border: 1px solid #e8e8e8;
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>话题管理</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <div class="content-btn">
          <el-button class="init-button"
                     @click="reviseDrawer = true"
                     icon="el-icon-plus">新增话题</el-button>
        </div>
        <input-form :formItem="input_form"></input-form>
        <div class="content-table">
          <tableData :config="table_config"></tableData>
          <div class="table-footer">
            <button>编辑</button>
            <button>审查</button>
            <button>删除</button>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      input_form: [
        {
          type: 'startEndDate',
          label: '发布时间',
          rangeSeparator: '~',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '结束时间',
          prop: 'date1'
        },
        {
          type: 'Input',
          label: '话题资源标题',
          placeholder: '请输入',
          prop: 'house'
        },

        {
          type: 'Input',
          label: '发布人姓名',
          placeholder: '请输入',
          prop: 'pho323ne'
        },
        {
          type: 'select',
          label: '状态',
          placeholder: '请输入',
          value: [],
          options: [],
          prop: 'houses'
        },

        {
          type: 'Input',
          label: '话题摘要',
          placeholder: '请输入',
          prop: 'pho3sd23ne',
          inputWidth: '692px'
        }
      ],
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '话题资源ID', prop: 'table2', width: '180' },
          { label: '话题标题', prop: 'table3', width: '380' },
          { label: '话题摘要', prop: 'table4', width: '180' },
          { label: '话题内容', prop: 'table5', width: '380' },
          { label: '开始时间', prop: 'table6', width: '180' },
          { label: '结束时间', prop: 'table7', width: '180' },
          { label: '状态', prop: 'table8', width: 'auto' },
          { label: '发布人', prop: 'table9', width: '180' },
          { label: '发布时间', prop: 'table10', width: '180' },
          { label: '是否可评论', prop: 'table11', width: '110' },
          { label: '参与人数', prop: 'table12', width: '110' }
        ],
        table_data: [

          {
            table1: 1,
            table2: '0001',
            table3: '什么样的社区才能叫做智慧社区？',
            table4: '智慧社区',
            table5:
              '社区究其特性来说有四点需要满足：1、有人。人是社区组成的基础。2、社区内人与人之间有交互… ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '禁用中',
            table9: '丁奔奔',
            table10: '2020-09-10',
            table11: '是',
            table12: '0'
          },
          {
            table1: 3,
            table2: '0003',
            table3: '知乎、虎扑、用户群体有什么不同？',
            table4: '教师节',
            table5:
              '就像生活在潮流尖尖的人在三里屯，披星戴月写代码的人在西二旗，想实现财务自由的创业狗在望京。… ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '禁用中',
            table9: '邱丹丹',
            table10: '2020-09-10',
            table11: '是',
            table12: '0'
          },
          {
            table1: 4,
            table2: '0004',
            table3: '如何在教师节让老师感动哭？',
            table4: '知乎、虎扑',
            table5:
              '社区究其特性来说有四点需要满足：1、有人。人是社区组成的基础。2、社区内人与人之间有交互… ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '启用中',
            table9: '赵羽',
            table10: '2020-09-10',
            table11: '是',
            table12: '0'
          },
          {
            table1: 6,
            table2: '0006',
            table3: '致植树节',
            table4: '社区工作者',
            table5:
              '就像生活在潮流尖尖的人在三里屯，披星戴月写代码的人在西二旗，想实现财务自由的创业狗在望京。… ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '禁用中',
            table9: '龚娣',
            table10: '2020-09-10',
            table11: '是',
            table12: '0'
          },
          {
            table1: 6,
            table2: '0005',
            table3: '社区应该如何定义？',
            table4: '社区工作者',
            table5:
              '社群（community是互联网时代前的产物，理想状态趋势应该是自治化，现时IT圈流行“去中心化”，… ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '禁用中',
            table9: '潘肖',
            table10: '2020-09-10',
            table11: '是',
            table12: '0'
          },
        ]
      }
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>
