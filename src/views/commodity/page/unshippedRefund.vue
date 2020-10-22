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
                    :btnWidth="'20%'"> </input-form>
        <!-- 头部输入框 -->
        <div style="margin-bottom:20px">
          <el-radio-group v-model="radio1"
                          size="small">
            <el-radio-button label="全部"></el-radio-button>
            <el-radio-button label="待审核"></el-radio-button>
            <el-radio-button label="客服仲裁"></el-radio-button>
            <el-radio-button label="退款成功"></el-radio-button>
            <el-radio-button label="退款失败"></el-radio-button>
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
          <div class="table-footer">
            <button>查看</button>
            <button>编辑</button>
            <button>删除</button>
          </div>
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
      radio1: '退款成功',
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
          type: 'Input',
          label: '客户姓名',
          placeholder: '请输入',
          prop: 'p2'
        },
        {
          type: 'Input',
          label: '客户手机号',
          placeholder: '请输入',
          prop: 'p3'
        }
      ],
      // 表格数据
      table_config: {
        thead: [
          { label: '订单号', prop: 'table1', width: '180' },
          { label: '商品名称', prop: 'table2', width: '300' },
          { label: '客户姓名', prop: 'table4', width: '180' },
          { label: '客户电话', prop: 'table5', width: '180' },
          {
            label: '退款金额',
            prop: 'table6',
            width: '120'
          },
          {
            label: '退款原因',
            prop: 'table7',
            width: '180'
          },
          {
            label: '申请状态', prop: 'table8', width: '180', type: 'slot',
            slotName: 'table8'
          },
          {
            label: '审核时间',
            prop: 'table9',
            width: '180',

          },
          { label: '操作', prop: 'table9', width: '180' }

          // 申请时间
        ],
        table_data: [
          {
            table1: '323534520359',
            table2:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table3: '14897344',
            table4: '何非希',
            table5: '1834562309',
            table6: '¥28.8 ',
            table7: '其他',
            table8: '查看',
            table9: ''
          },
          {
            table1: '323534520359',
            table2:
              '【超定制】三只松鼠 零食坚果大礼包1490g中秋节礼盒送礼9袋装',
            table3: '14897344',
            table4: '韩梅',
            table5: '13034562489',
            table6: '¥38.8 ',
            table7: '多拍/排错/不想要了',
            table8: '查看',
            table9: ''
          },
          {
            table1: '323534520374',
            table2:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table3: '14897344',
            table4: '朱健健',
            table5: '13534563249',
            table6: '¥22.8 ',
            table7: '其他',
            table8: '查看',
            table9: ''
          },
          {
            table1: '323534520375',
            table2:
              '【超定制】三只松鼠 零食坚果大礼包1490g中秋节礼盒送礼9袋装',
            table3: '14897344',
            table4: '韩尧尧',
            table5: '18034562389',
            table6: '¥48.8 ',
            table7: '多拍/排错/不想要了',
            table8: '查看',
            table9: ''
          },
          {
            table1: '323534520359',
            table2:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table3: '14897344',
            table4: '何非希',
            table5: '13034562489',
            table6: '¥28.8 ',
            table7: '多拍/排错/不想要了',
            table8: '查看',
            table9: ''
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
