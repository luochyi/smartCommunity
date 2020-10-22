
<template>
  <!-- 装修人员-->
  <div>
    <div class="content-table">
      <tableData :config="table_config">
      </tableData>
      <div class="table-footer">
        <button>编辑</button>
        <button>删除</button>
      </div>
    </div>
    <!-- <table-pagination></table-pagination> -->
    <table-pagination :pageSize='10'
                      :totalNumber='150'></table-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      switch_disabled: "",
      activeName: 'first',
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '跟踪记录', prop: 'table2', width: '180' },
          { label: '跟踪时间', prop: 'table3', width: '180' },
          {
            label: '电路', prop: 'table4', width: 'auto',
            type: "slot_check",
          },
          {
            label: '水路', prop: 'table5', width: 'auto',
            type: "slot_check",
          },
          {
            label: '墙面', prop: 'table6', width: 'auto',
            type: "slot_check",
          },
          { label: '门窗', prop: 'table7', width: 'auto', type: "slot_check", },
          {
            label: "水路",
            prop: "table8",
            type: "slot_check",
            width: 'auto'
          },
          {
            label: '跟踪描述',
            prop: 'table9',
            width: '320'
          },
          /**
           *  prop: "status",
            type: "slot",
            slotName: "status"
           */
          { label: '跟踪结果', prop: 'table10', width: '180', type: 'txtbtn' },



        ],
        table_data: [
          {
            table1: 1,
            table2: '王珂佳',
            table3: '2020.08.09 12:00',
            table4: '1',
            table5: '0',
            table6: '0',
            table7: '0',
            table8: '1',
            table9: '墙面破裂，门窗不可打通，希望尽快修复',
            table10: {
              label: "不合格",
              status: '查看'
            },
          },
          {
            table1: 2,
            table2: '马小明',
            table3: '2020.08.09 12:00',
            table4: '1',
            table5: '1',
            table6: '1',
            table7: '0',
            table8: '1',
            table9: '墙面破裂，门窗不可打通，希望尽快修复',
            table10: {
              label: "合格",
              status: '查看'
            },
          },
          {
            table1: 3,
            table2: '周丽',
            table3: '2020.08.09 12:00',
            table4: '0',
            table5: '1',
            table6: '0',
            table7: '1',
            table8: '1',
            table9: '墙面破裂，门窗不可打通，希望尽快修复',
            table10: {
              label: "合格",
              status: '查看'
            },
          },
          {
            table1: 4,
            table2: '周晓晓',
            table3: '2020.08.09 12:00',
            table4: '0',
            table5: '1',
            table6: '0',
            table7: '0',
            table8: '1',
            table9: '墙面破裂，门窗不可打通，希望尽快修复',
            table10: {
              label: "不合格",
              status: '查看'
            },
          },
          {
            table1: 5,
            table2: '王珂佳',
            table3: '2020.08.09 12:00',
            table4: '1',
            table5: '0',
            table6: '0',
            table7: '0',
            table8: '1',
            table9: '墙面破裂，门窗不可打通，希望尽快修复',
            table10: {
              label: "不合格",
              status: '查看'
            },
          },
          {
            table1: 6,
            table2: '王珂佳',
            table3: '2020.08.09 12:00',
            table4: '1',
            table5: '0',
            table6: '0',
            table7: '0',
            table8: '1',
            table9: '墙面破裂，门窗不可打通，希望尽快修复',
            table10: {
              label: "不合格",
              status: '查看'
            },
          },
          {
            table1: 7,
            table2: '王珂佳',
            table3: '2020.08.09 12:00',
            table4: '1',
            table5: '0',
            table6: '0',
            table7: '0',
            table8: '1',
            table9: '墙面破裂，门窗不可打通，希望尽快修复',
            table10: {
              label: "不合格",
              status: '查看'
            },
          },
          {
            table1: 8,
            table2: '王珂佳',
            table3: '2020.08.09 12:00',
            table4: '1',
            table5: '0',
            table6: '0',
            table7: '0',
            table8: '1',
            table9: '墙面破裂，门窗不可打通，希望尽快修复',
            table10: {
              label: "不合格",
              status: '查看'
            },
          },
          {
            table1: 9,
            table2: '王珂佳',
            table3: '2020.08.09 12:00',
            table4: '0',
            table5: '1',
            table6: '0',
            table7: '0',
            table8: '1',
            table9: '',
            table10: {
              label: "不合格",
              status: '查看'
            },
          },
          {
            table1: 10,
            table2: '刘佳佳',
            table3: '2020.08.09 12:00',
            table4: '1',
            table5: '0',
            table6: '1',
            table7: '0',
            table8: '1',
            table9: '',
            table10: {
              label: "不合格",
              status: '查看'
            },
          }
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
    },
    /** 禁启用 */
    switchChange (data) {
      console.log(data)
    },
  }
}
</script>
