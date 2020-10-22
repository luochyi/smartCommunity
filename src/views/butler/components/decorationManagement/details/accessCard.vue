
<template>
  <!-- 装修人员-->
  <div>
    <div class="content-table">
      <tableData :config="table_config"></tableData>
    </div>
    <table-pagination :pageSize='10'
                      :totalNumber='150'></table-pagination>
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
          { label: '门禁卡类型', prop: 'table2', width: 'auto' },
          { label: '状态', prop: 'table3', width: 'auto' },
          { label: '卡号', prop: 'table4', width: 'auto' },
          { label: '有效开始日期', prop: 'table5', width: 'auto' },
          { label: '有效结束日期', prop: 'table6', width: 'auto' },
        ],
        table_data: [
          {
            table1: 1,
            table2: '临时',
            table3: '正常',
            table4: '23145452345',
            table5: '2020-03-03 ',
            table6: '2020-08-03 ',
          },
          {
            table1: 2,
            table2: '临时',
            table3: '正常',
            table4: '23145452345',
            table5: '2020-03-03 ',
            table6: '2020-08-03 ',
          },
        ]
      },
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
