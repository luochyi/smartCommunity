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
      <span>主题明细管理</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <input-form :formItem="input_form"></input-form>
        <div class="content-table">
          <tableData :config="table_config"></tableData>
          <div class="table-footer">
            <button>恢复</button>
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
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '话题标题', prop: 'table2', width: '380' },
          { label: '话题摘要', prop: 'table3', width: '180' },
          { label: '发布人昵称', prop: 'table4', width: '180' },
          { label: '发布人姓名', prop: 'table5', width: '180' },
          { label: '发布内容', prop: 'table6', width: '380' },
          { label: '是否公开', prop: 'table7', width: '110' },
          { label: '是否可评论', prop: 'table8', width: '110' },
          { label: '发布时间', prop: 'table9', width: '180', sortable: true },
          { label: '评论人昵称', prop: 'table10', width: '180' },
          { label: '评论人姓名', prop: 'table11', width: '110' },
          { label: '评论时间', prop: 'table12', width: '180', sortable: true },
          { label: '评论内容', prop: 'table13', width: '280' },
          { label: '点赞人数', prop: 'table14', width: '180', sortable: true },
          { label: '评论人数', prop: 'table15', width: '180', sortable: true },
          { label: '状态', prop: 'table16', width: 'auto' }
        ],
        table_data: [
          {
            table1: 1,
            table2: '请大家谈谈一名社区工作者有什么前途？',
            table3: '社区工作者',
            table4: '丁奔奔',
            table5: '丁奔奔 ',
            table6:
              '我已经在社区工作3年了，当初进来时爸妈说一个女孩子不求有很大的报复和理想，做社区工作很稳定…',
            table7: '是',
            table8: '是',
            table9: '2020-08-18  02:39:10',
            table10: '丁奔奔',
            table11: '丁奔奔',
            table12: ' 2020-08-18  02:39:10',
            table13: '社区究其特性来说有四点需要满足：1、有人。人是社…',
            table14: '10',
            table15: '5',
            table16: '正常 '
          },
          {
            table1: 2,
            table2: '社区应该如何定义？',
            table3: '社区',
            table4: '邱丹丹',
            table5: '邱丹丹 ',
            table6:
              '我已经在社区工作3年了，当初进来时爸妈说一个女孩子不求有很大的报复和理想，做社区工作很稳定…',
            table7: '是',
            table8: '是',
            table9: '2020-08-18  02:39:10',
            table10: '邱丹丹',
            table11: '邱丹丹',
            table12: ' 2020-08-18  02:39:10',
            table13: '社区究其特性来说有四点需要满足：1、有人。人是社区组成的基础。2、社区内人与人之间有交互…',
            table14: '08',
            table15: '4',
            table16: '正常 '
          },
          {
            table1: 3,
            table2: '什么样的社区才能叫做智慧社区？',
            table3: '智慧社区',
            table4: '赵羽',
            table5: '赵羽 ',
            table6:
              '就像生活在潮流尖尖的人在三里屯，披星戴月写代码的人在西二旗，想实现财务自由的创业狗在望京。…',
            table7: '否',
            table8: '否',
            table9: '2020-08-12  07:50:08',
            table10: '赵羽',
            table11: '赵羽',
            table12: ' 2020-08-18  02:39:10',
            table13: '社群（community是互联网时代前的产物，理想状态…',
            table14: '10',
            table15: '5',
            table16: '正常 '
          },
          {
            table1: 4,
            table2: '请大家谈谈一名社区工作者有什么前途？',
            table3: '社区工作者',
            table4: '龚娣',
            table5: '龚娣 ',
            table6:
              '我已经在社区工作3年了，当初进来时爸妈说一个女孩子不求有很大的报复和理想，做社区工作很稳定…',
            table7: '是',
            table8: '是',
            table9: '2020-08-18  02:39:10',
            table10: '余晓轳',
            table11: '余晓轳',
            table12: ' 2020-08-18  02:39:10',
            table13: '我已经在社区工作3年了，当初进来时爸妈说一个…',
            table14: '20',
            table15: '15',
            table16: '删除 '
          },
          {
            table1: 5,
            table2: '知乎、虎扑、用户群体有什么不同？',
            table3: '社区工作者',
            table4: '蔡璨',
            table5: '蔡璨 ',
            table6:
              '我已经在社区工作3年了，当初进来时爸妈说一个女孩子不求有很大的报复和理想，做社区工作很稳定…',
            table7: '是',
            table8: '是',
            table9: '2020-08-18  02:39:10',
            table10: '蔡璨',
            table11: '蔡璨',
            table12: ' 2020-08-18  02:39:10',
            table13: '我已经在社区工作3年了，当初进来时爸妈说一个…',
            table14: '18',
            table15: '7',
            table16: '删除 '
          },
          {
            table1: 6,
            table2: '如何在教师节让老师感动哭？',
            table3: '社区',
            table4: '余晓轳',
            table5: '余晓轳 ',
            table6:
              '我已经在社区工作3年了，当初进来时爸妈说一个女孩子不求有很大的报复和理想，做社区工作很稳定…',
            table7: '是',
            table8: '是',
            table9: '2020-08-18  02:39:10',
            table10: '姜富珍',
            table11: '姜富珍',
            table12: ' 2020-08-18  02:39:10',
            table13: '我已经在社区工作3年了，当初进来时爸妈说一个…',
            table14: '10',
            table15: '5',
            table16: '正常 '
          }
        ]
      },
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
          label: '话题标题',
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
          type: 'Input',
          label: '发布人昵称',
          placeholder: '请输入',
          prop: 'pho32sad3ne'
        },
        {
          type: 'Input',
          label: '话题摘要',
          placeholder: '请输入',
          prop: 'pho3sd23ne',
          width: '50%',
          inputWidth: '658px'
        },
        {
          type: 'Input',
          label: '话题摘要',
          placeholder: '请输入',
          prop: 'pho3sd2ssd3ne',
          width: '50%',

          inputWidth: '658px'
        },
        {
          type: 'Input',
          label: '话题摘要',
          placeholder: '请输入',
          width: '50%',

          prop: 'pho3sd2sd3ne',
          inputWidth: '658px'
        },
        {
          type: 'Input',
          label: '状态',
          placeholder: '请输入',
          prop: 'houses'
        }
      ],
      tableData: [
        {
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333
        },
        {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333
        },
        {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          id: 5,
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          id: 6,
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        },
        {
          id: 7,
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333
        }
      ]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    onSubmit () {
      console.log('submit!')
    },
    ckimg () {
      this.showViewer = true
    }, // 关闭查看器
    closeViewer () {
      this.showViewer = false
    }
  }
}
</script>
