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
      <span>投诉表扬</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日新增保修
        <span style="color:rgba(251, 71, 2, 1)">13</span>
        条
      </p>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="reviseDrawer = true"
                   icon="el-icon-plus">新增报修</el-button>
        <!-- <el-button type="init-button2" icon="el-icon-folder-add" plain>批量导入</el-button>
        <el-button class="init-text" type="text">模板下载</el-button> -->
      </div>
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <input-form :formItem="input_form"></input-form>
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="全部"
                       name="first"></el-tab-pane>
          <el-tab-pane label="待分配"
                       name="second"></el-tab-pane>
          <el-tab-pane label="已分配未接单"
                       name="third"></el-tab-pane>
          <el-tab-pane label="已处理"
                       name="fourth"></el-tab-pane>
          <el-tab-pane label="已确认已完成"
                       name="four12h"></el-tab-pane>
          <el-tab-pane label="已关闭"
                       name="fou2rth"></el-tab-pane>
          <el-tab-pane label="已取消"
                       name="fou3rth"></el-tab-pane>
          <el-tab-pane label="已作废"
                       name="four31th"></el-tab-pane>
        </el-tabs>
        <div class="content-table">
          <tableData :config="table_config"></tableData>
          <div class="table-footer">
            <button>详情</button>
            <button>编辑</button>
            <button>派工</button>
            <button>回访</button>
            <button>作废</button>
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
          { label: '报修单号', prop: 'table2', width: '180' },
          { label: '状态', prop: 'table3', width: '180' },
          { label: '房屋信息', prop: 'table4', width: '180' },
          { label: '报修人', prop: 'table5', width: '120' },
          { label: '报修人电话', prop: 'table6', width: '180' },
          { label: '报修时间', prop: 'table7', width: '180' },
          { label: '分配人', prop: 'table8', width: '120' },
          { label: '维修人', prop: 'table9', width: '120' },
          { label: '工单时限', prop: 'table10', width: '180' },
          { label: '来源', prop: 'table11', width: '180' }
        ],
        table_data: [
          {
            table1: 1,
            table2: '374691283192',
            table3: '待分配',
            table4: '1-2-0801',
            table5: '李佳',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '胡兰',
            table9: '胡兰兰',
            table10: '8小时内处理',
            table11: '业主来电'
          },
          {
            table1: 2,
            table2: '374691223192',
            table3: '已分配',
            table4: '1-2-0801',
            table5: '利涉',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '胡兰兰',
            table9: '胡兰兰',
            table10: '8小时内处理',
            table11: '业主来电'
          },
          {
            table1: 3,
            table2: '374691283121',
            table3: '已分配处理中',
            table4: '1-2-0801',
            table5: '李嘉琪',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '李龙',
            table9: '张磊',
            table10: '8小时内处理',
            table11: '业主来电'
          },
          {
            table1: 4,
            table2: '374691283192',
            table3: '待分配',
            table4: '1-2-0801',
            table5: '刘佳',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '李龙',
            table9: '张磊',
            table10: '8小时内处理',
            table11: '业主来电'
          },
          {
            table1: 5,
            table2: '374691283192',
            table3: '待分配',
            table4: '1-2-0801',
            table5: '张亮',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '胡兰兰',
            table9: '胡兰兰',
            table10: '8小时内处理',
            table11: '业主来电'
          },
          {
            table1: 6,
            table2: '374691283192',
            table3: '待分配',
            table4: '1-2-0801',
            table5: '陈康',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '胡兰兰',
            table9: '胡兰兰',
            table10: '8小时内处理',
            table11: '业主来电'
          },
          {
            table1: 7,
            table2: '374691283192',
            table3: '待分配',
            table4: '1-2-0801',
            table5: '王珂佳',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '李龙',
            table9: '张磊',
            table10: '12小时内处理',
            table11: '业主来电'
          },
          {
            table1: 8,
            table2: '374691283192',
            table3: '待分配',
            table4: '1-2-0801',
            table5: '吴洋',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '胡兰兰',
            table9: '胡兰兰',
            table10: '8小时内处理',
            table11: '业主来电'
          },
          {
            table1: 9,
            table2: '374691283192',
            table3: '待分配',
            table4: '1-2-0801',
            table5: '王珂佳',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '胡兰兰',
            table9: '胡兰兰',
            table10: '8小时内处理',
            table11: '业主来电'
          },
          {
            table1: 10,
            table2: '374691283192',
            table3: '待分配',
            table4: '1-2-0801',
            table5: '刘洋',
            table6: '18850988790',
            table7: '2020-01-20',
            table8: '胡兰兰',
            table9: '胡兰兰',
            table10: '8小时内处理',
            table11: '业主来电'
          }
        ]
      },
      input_form: [
        {
          type: 'Input',
          label: '报修单号',
          placeholder: '请输入',
          prop: 'houssssd'
        },
        {
          type: 'Input',
          label: '报修人',
          placeholder: '请输入',
          prop: 'houses'
        },

        {
          type: 'select',
          label: '工单大类',
          placeholder: '请选择',
          value: [],
          prop: 'house',
          options: [
            { value: '1', label: '阿斯顿' },
            { value: '2', label: '阿斯as顿' }
          ]
        },
        {
          type: 'Input',
          label: '房屋信息',
          placeholder: '单元/楼栋/房号',
          prop: 'hous2wsssd'
        },
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
          label: '分配人',
          placeholder: '请输入',
          prop: 'hou22ssssd'
        },
        {
          type: 'Input',
          label: '维修人',
          placeholder: '请ss输入',
          prop: 'hou23ssssd'
        }
      ]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    }
  }
}
</script>
