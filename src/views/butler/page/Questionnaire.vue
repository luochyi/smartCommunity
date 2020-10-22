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
      <span>问卷调查</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="reviseDrawer = true"
                   icon="el-icon-plus">新增电话</el-button>
        <el-button type="init-button2"
                   icon="el-icon-folder-add"
                   plain>新增问卷调查</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="input_form"></input-form>
        <!-- 头部输入框 -->
        <div class="content-table">
          <tableData :config="table_config"></tableData>
          <div class="table-footer">
            <button>预览</button>
            <button>编辑</button>
            <button>分析报表</button>
            <button>删除</button>
            <button>打印</button>
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
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '标题', prop: 'table2', width: '280' },
          { label: '问卷对象', prop: 'table3', width: '180' },
          { label: '状态', prop: 'table4', width: '180' },
          { label: '是否允许匿名', prop: 'table5', width: '200' },
          { label: '开始时间', prop: 'table6', width: '180' },
          { label: '开始时间', prop: 'table7', width: '180' },
          { label: '答题数量', prop: 'table8', width: 'auto' }
        ],
        table_data: [
          {
            table1: 1,
            table2: '关于物业服务满意度的调查问卷',
            table3: '无限制',
            table4: '正在进行',
            table5: '允许 ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '10'
          },
          {
            table1: 2,
            table2: '针对建设小区活动中心的调查问卷',
            table3: '无限制',
            table4: '正在进行',
            table5: '允许 ',
            table6: '2020-06-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '10'
          },
          {
            table1: 3,
            table2: '关于小区垃圾清运时间的调查问卷',
            table3: '无限制',
            table4: '正在进行',
            table5: '允许 ',
            table6: '2020-08-20 09:00',
            table7: '2020-10-20 09:00',
            table8: '10'
          },
          {
            table1: 4,
            table2: '最美保洁人员评选',
            table3: '无限制',
            table4: '正在进行',
            table5: '允许 ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '10'
          },
          {
            table1: 5,
            table2: '业委会评选',
            table3: '无限制',
            table4: '正在进行',
            table5: '允许 ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '10'
          },
          {
            table1: 6,
            table2: '关于小区环境满意度调查评分',
            table3: '无限制',
            table4: '正在进行',
            table5: '不允许 ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '10'
          },
          {
            table1: 7,
            table2: '关于物业服务满意度调查',
            table3: '无限制',
            table4: '正在进行',
            table5: '允许 ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '10'
          },
          {
            table1: 8,
            table2: '关于小区活动中心开放时间调查',
            table3: '无限制',
            table4: '正在进行',
            table5: '允许 ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '10'
          },
          {
            table1: 9,
            table2: '业委会评选',
            table3: '无限制',
            table4: '正在进行',
            table5: '允许 ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '10'
          },
          {
            table1: 10,
            table2: '最美物业人员评选',
            table3: '无限制',
            table4: '正在进行',
            table5: '允许 ',
            table6: '2020-08-20 09:00',
            table7: '2020-08-20 09:00',
            table8: '10'
          }
        ]
      },

      input_form: [
        {
          type: 'Input',
          label: '问卷标题',
          placeholder: '请输入',
          prop: 'userName'
        },
        {
          type: 'select',
          label: '状态',
          placeholder: '请选择',
          prop: 'phonessobj',
          value: [],
          options: []
        },
        {
          type: 'select',
          label: '问卷对象',
          placeholder: '请选择',
          prop: 'phoneobj',
          value: [],
          options: []
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
