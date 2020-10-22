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
      <span>未发货退款</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        开启极速退款助手，自动处理退款订单。
        <el-button class="init-text"
                   type="text"
                   style="font-size:12px">去开启></el-button>
      </p>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus">新增品牌</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="input_form"
                    :btnWidth="'10%'"> </input-form>
        <!-- 头部输入框 -->
        <div style="margin-bottom:20px">
          <el-radio-group v-model="radio1"
                          size="small">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="待审核"></el-radio-button>
            <el-radio-button label="待收货"></el-radio-button>
            <el-radio-button label="未解决"></el-radio-button>
            <el-radio-button label="已完成"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow="tableRow">
            <template v-slot:table8="slotData">
              <div>
                <el-button class="init-text"
                           type="text">{{
                  slotData.data.table8
                }}</el-button>
              </div>
            </template>
          </tableData>
        </div>
        <table-pagination :pageSize="10"
                          :totalNumber="100"></table-pagination>
      </div>
    </div>
  </div>
</template>
<script>
// conveniencePhone
export default {
  data () {
    return {
      radio1: '全部',
      // 选中表格数据
      table_row: {},
      // 搜索重置数据
      input_form: [
        {
          type: 'Input',
          label: '订单号',
          placeholder: '请输入',
          prop: 'userName'
        },

        {
          type: 'startEndDate',
          label: '申请时间',
          prop: 'p6',
          startPlaceholder: '请选择开始时间',
          rangeSeparator: ' ～',
          endPlaceholder: '结束时间'
        },
        {
          type: 'Input',
          label: '退货单号',
          placeholder: '请输入',
          prop: 'p2'
        },
        {
          type: 'select',
          label: '客户期望',
          placeholder: '全部',
          options: [
            {
              label: '购买',
              value: '1'
            },
            {
              label: '售后',
              value: '2'
            }
          ],
          prop: 'p3'
        },
        {
          type: 'Input',
          label: '客户姓名',
          placeholder: '请输入',
          prop: 'p4'
        },
        {
          type: 'Input',
          label: '客户电话',
          placeholder: '请输入',
          prop: 'p5'
        }
      ],
      // 表格数据
      table_config: {
        thead: [
          { label: '订单号', prop: 'table1', width: '180' },
          { label: '商品名称', prop: 'table2', width: '300' },
          { label: '买家帐号', prop: 'table3', width: '180' },
          { label: '客户期望', prop: 'table4', width: '180' },
          {
            label: '状态',
            prop: 'table5',
            width: '120'
          },
          {
            label: '申请时间',
            prop: 'table6',
            width: '180'
          },
          { label: '审核时间', prop: 'table7', width: '180' },
          {
            label: '操作',
            prop: 'table8',
            width: '180',
            type: 'slot',
            slotName: 'table8'
          }
        ],
        table_data: [
          {
            table1: '323534520359',
            table2:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table3: '何非希',
            table4: '退货',
            table5: '退款成功-售后退款 ',
            table6: '2020-08-20 09:00:33',
            table7: '2020-08-20 09:00:33',
            table8: '处理'
          },
          {
            table1: '323534520359',
            table2:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table3: '韩梅',
            table4: '退货',
            table5: '退款成功-售后退款 ',
            table6: '2020-08-20 09:00:33',
            table7: '2020-08-20 09:00:33',
            table8: '处理'
          },
          {
            table1: '323534520359',
            table2:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table3: '朱健健',
            table4: '退款',
            table5: '退款成功-售后退款 ',
            table6: '2020-08-20 09:00:33',
            table7: '2020-08-20 09:00:33',
            table8: '处理'
          },
          {
            table1: '323534520359',
            table2:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table3: '韩尧尧',
            table4: '退款',
            table5: '退款成功-售后退款 ',
            table6: '2020-08-20 09:00:33',
            table7: '2020-08-20 09:00:33',
            table8: '处理'
          }
        ]
      }
    }
  },

  methods: {
    // table选中行
    tableRow (data) {
      this.table_row = data
    }
  }
}
</script>
