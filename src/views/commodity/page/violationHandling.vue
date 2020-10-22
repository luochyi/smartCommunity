<template>
  <div class="main-content">
    <div class="main-titel">
      <span>违规管理</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <!-- 头部输入框 -->
        <div>
          <input-form :formItem="input_form"
                      :btnWidth="'10%'"> </input-form>
        </div>
        <el-table ref="multipleTable"
                  :data="tableData"
                  :header-cell-style="{ background: '#F5F5F6', color: '#999999' }"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column type="selection"
                           width="60"> </el-table-column>
          <el-table-column label="违规订单号"
                           prop="table1"
                           width="180">
          </el-table-column>
          <el-table-column prop="table2"
                           label="违规快递单号"
                           width="180">
          </el-table-column>
          <el-table-column prop="table3"
                           label="违规时间"
                           width="200">
          </el-table-column>
          <el-table-column prop="table4"
                           label="违规类型"
                           width="180">
            <template slot-scope="scope">{{ scope.row.table4 }}</template>
          </el-table-column>
          <el-table-column prop="table5"
                           label="判罚原因"
                           width="180">
            <template slot-scope="scope">{{ scope.row.table5 }}</template>
          </el-table-column>
          <el-table-column prop="table6"
                           width="180">
            <template slot="header">
              <span>违规判定</span>
              <el-tooltip placement="bottom-start">
                <i class="el-icon-question"></i>
                <div slot="content">每条判罚最多可申诉两次，判罚后7天内可以首次申<br />诉申诉失败后3天内可第二次申诉，第二次申诉失<br />败不可再申诉</div>
              </el-tooltip>
            </template>
            <template slot-scope="scope">{{ scope.row.table6 }}</template>
          </el-table-column>
          <el-table-column prop="table7"
                           label="违规结果"
                           width="180">
            <template slot-scope="scope">
              <span> {{ scope.row.table7[0].label }}</span>
              <el-tooltip placement="bottom-start">
                <div slot="content">预警：平台判定可能存在违规，商家需尽快核实改正<br />已违规：平台判定订单存在违规</div>
                <span style="color:rgba(153, 153, 153, 1)"> {{ scope.row.table7[0].status }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="table8"
                           label="处罚时间"
                           width="180">
            <template slot-scope="scope">{{ scope.row.table8 }}</template>
          </el-table-column>
          <el-table-column prop="table9"
                           label="申诉状态"
                           width="180">
            <template slot-scope="scope">{{ scope.row.table9 }}</template>
          </el-table-column>

          <!-- 更新日期 -->
          <!-- show-overflow-tooltip -->
        </el-table>
        <div class="table-footer">
          <button>导出</button>
          <button>申诉 <el-tooltip placement="top">
              <i class="el-icon-question"></i>
              <div slot="content">每条判罚最多可申诉两次，判罚后7天内可以首次申
                <br />诉，申诉失败后3天内可第二次申诉，第二次申诉失
                <br />败不可再申诉
              </div>
            </el-tooltip></button>
          <!-- <el-tooltip class="item"
                      effect="dark"
                      content="每条判罚最多可申诉两次，判罚后7天内可以首次申诉，
                      申诉失败后3天内可第二次申诉，第二次申诉失败不可再申诉"
                      placement="top">
            <el-button>申诉 <span class='el-icon-question'></span></el-button>
          </el-tooltip> -->

          <button>批量申诉</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      input_form: [
        {
          type: 'startEndDate',
          label: '下单时间',
          prop: 'p1',
          startPlaceholder: '请选择开始时间',
          rangeSeparator: ' ～',
          endPlaceholder: '结束时间'
        },
        {
          type: 'select',
          label: '违规类型',
          placeholder: '请选择',
          prop: 'p2',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '上衣',
              value: '2'
            },
            {
              label: '裙子',
              value: '3'
            },
            {
              label: '袜子',
              value: '4'
            }
          ]
        },
        {
          type: 'select',
          label: '判罚原因',
          placeholder: '请选择',
          prop: 'p3',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '是',
              value: '2'
            },
            {
              label: '否',
              value: '3'
            }
          ]
        },
        {
          type: 'select',
          label: '违规判定',
          placeholder: '请选择',
          prop: 'p4',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '是',
              value: '2'
            },
            {
              label: '否',
              value: '3'
            }
          ]
        },
        {
          type: 'startEndDate',
          label: '卖家回复',
          prop: 'p5',
          startPlaceholder: '请选择开始时间',
          rangeSeparator: ' ～',
          endPlaceholder: '结束时间'
        },

        {
          type: 'select',
          label: '违规结果',
          placeholder: '请选择',
          prop: 'p6',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '是',
              value: '2'
            },
            {
              label: '否',
              value: '3'
            }
          ]
        },
        {
          type: 'select',
          label: '申诉状态',
          placeholder: '请选择',
          prop: 'p7',
          value: '全部',
          options: [
            {
              label: '全部',
              value: '1'
            },
            {
              label: '是',
              value: '2'
            },
            {
              label: '否',
              value: '3'
            }
          ]
        },
        {
          type: 'Input',
          label: '订单号',
          placeholder: '请输入',
          prop: 'p8',
          value: ''
        }
      ],
      tableData: [
        {
          table1: '323534520359',
          table2: '323520359',
          table3: '2020-08-20 09:00:33',
          table4: '揽件超时',
          table5: '揽件超时',
          table6: '已违规',
          table7: [
            {
              label: '严重警告',
              status: '未扣保证金'
            }],
          table8: '2020-07-21 09:24:12',
          table9: '未申诉',
        },
        {

          table1: '323534521678',
          table2: '323521678',
          table3: '2020-08-20 09:00:33',
          table4: '揽件超时',
          table5: '揽件超时',
          table6: '预警',
          table7: [
            {
              label: '严重警告',
              status: '未扣保证金'
            }],
          table8: '2020-07-21 09:24:12',
          table9: '未申诉',
        },
        {
          table1: '323534520332',
          table2: '323520359',
          table3: '2020-08-20 09:00:33',
          table4: '虚假发货',
          table5: '揽件超时',
          table6: '已违规',
          table7: [
            {
              label: '严重警告',
              status: '未扣保证金'
            }],
          table8: '2020-07-21 09:24:12',
          table9: '未申诉',
        },
        {
          table1: '323234420359',
          table2: '323520359',
          table3: '2020-08-20 09:00:33',
          table4: '揽件超时',
          table5: '物流单重复',
          table6: '预警',
          table7: [
            {
              label: '已扣保证金',
              status: ''
            }],
          table8: '2020-07-21 09:24:12',
          table9: '未申诉',
        },
        {
          table1: '323534520359',
          table2: '323520359',
          table3: '2020-08-20 09:00:33',
          table4: '虚假发货',
          table5: '物流单重复',
          table6: '已违规',
          table7: [
            {
              label: '严重警告',
              status: ''
            }],
          table8: '2020-07-21 09:24:12',
          table9: '未申诉',
        }
      ],
      multipleSelection: []
    }
  },
  methods: {}
}
</script>

<style scoped></style>
