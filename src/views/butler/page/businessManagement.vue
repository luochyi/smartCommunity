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
      <span>业委会管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="reviseDrawer = true"
                   icon="el-icon-plus">新增成员</el-button>
        <el-button type="init-button2"
                   icon="el-icon-folder-add"
                   plain>新增问卷调查</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="input_form"></input-form>
        <!-- 头部输入框 -->
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
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
      <Dialog :dialogVisible='dialog_visible'
              :dialog_config='dialog_config'
              @cancel='cancel'
              @confirm='confirm'>
      </Dialog>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: ''
      },
      // 选中表格数据
      table_row: {},
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '职位', prop: 'table2', width: 'auto' },
          { label: '姓名', prop: 'table3', width: 'auto' },
          { label: '性别', prop: 'table4', width: 'auto' },
          { label: '年龄', prop: 'table5', width: 'auto' },
          { label: '学历', prop: 'table6', width: 'auto' },
          { label: '房屋信息', prop: 'table7', width: 'auto' },
          { label: '职业', prop: 'table8', width: 'auto' },
        ],
        table_data: [
          {
            table1: 1,
            table2: '业委会主任',
            table3: '白初梓',
            table4: '男',
            table5: '45 ',
            table6: '本科',
            table7: '1-3-1101',
            table8: '语文老师',
          },
          {
            table1: 2,
            table2: '业委会副主任',
            table3: '龚丹丹',
            table4: '女',
            table5: '44  ',
            table6: '本科',
            table7: '2-4-0802',
            table8: '科长',
          },
          {
            table1: 3,
            table2: '业委会委员',
            table3: '毛杵亦',
            table4: '男',
            table5: '45 ',
            table6: '本科',
            table7: '2-2-1204',
            table8: '化学老师',
          },
          {
            table1: 4,
            table2: '业委会委员',
            table3: '谭涔海',
            table4: '男',
            table5: '45 ',
            table6: '本科',
            table7: '3-1-1003 ',
            table8: '大学教授',
          },
          {
            table1: 5,
            table2: '业委会委员',
            table3: '侯淡夫',
            table4: '女',
            table5: '42 ',
            table6: '本科',
            table7: '1-2-0602',
            table8: '公司经理',
          }
        ]
      },
      input_form: [
        {
          type: 'select',
          label: '职位',
          placeholder: '请输入',
          prop: 'userName1',
          value: '',
          options: []
        },
        {
          type: 'Input',
          label: '姓名',
          placeholder: '请输入',
          prop: 'userName2',
          value: '',
          options: []
        },
        {
          type: 'select',
          label: '学历',
          placeholder: '请选择',
          prop: 'phone2ssobj'
        },
        {
          type: 'select',
          label: '性别',
          placeholder: '请选择',
          prop: 'sex',
          value: '',
          options: [
            { value: '1', label: '男' },
            { value: '2', label: '女' }
          ]
        },
        {
          type: 'Input',
          label: '房屋信息',
          placeholder: '请输入',
          prop: 'use232rName'
        },
        {
          type: 'Input',
          label: '职业',
          placeholder: '请输入',
          prop: 'use3rName'
        }
      ],
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
