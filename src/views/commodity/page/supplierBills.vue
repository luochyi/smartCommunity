<template>
  <div class="main-content">
    <div class="main-titel"
         style="border-bottom: none">
      <span>订单结算列表</span>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="全部"
                   name="first"></el-tab-pane>
      <el-tab-pane label="待结算"
                   name="second"></el-tab-pane>
      <el-tab-pane label="已结算"
                   name="trid"></el-tab-pane>
    </el-tabs>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <div>
          <input-form :formItem="input_form"
                      :btnWidth="'30%'"> </input-form>
        </div>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow="tableRow">
            <template v-slot:table3="slotData">
              <div>
                <el-button class="init-text"
                           @click='isVisibleDrawe=true'
                           type="text">{{
                  slotData.data.table3
                }}</el-button>
              </div>
            </template>
          </tableData>
          <div class="table-footer">
            <button @click='isVisibleDrawe2 =true'>结算</button>
          </div>
        </div>
        <table-pagination :pageSize="10"
                          :totalNumber="150"></table-pagination>
      </div>
    </div>
    <div class="drawer_box">
      <el-drawer title="订单明细"
                 :visible.sync="isVisibleDrawe"
                 size="58%"
                 :before-close="handleClose"
                 :with-header="true">
        <div class="">
          <div class="">
            <div class="dra-content">
              <div class="content-titel">
                <span>基本信息</span>
              </div>
              <div class=""
                   style="padding:0 20px">
                <tableData :config="table_config2"
                           @clickrow="tableRow">

                </tableData>
              </div>
            </div>
          </div>
          <div class="dra-footer">
            <div class="dra-footer-content">
              <!-- 绑定事件 将验证规则和所有数据传出去 -->
              <!--    @click="item.handler && item.handler(configObj,$refs['ruleForm'])" -->
              <button class="dra-submit el-icon-circle-check"
                      @click="handleClose"><span>确定</span></button>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
    <div class="drawer_box">
      <el-drawer title="订单明细"
                 :visible.sync="isVisibleDrawe2"
                 size="58%"
                 :before-close="handleClose"
                 :with-header="true">
        <div class="">
          <div class="">
            <div class="dra-content">
              <div class="content-titel">
                <span>供应商信息</span>
              </div>
              <div class=""
                   style="padding:0 20px">
                <form-datechildren :formItem="form_item1"
                                   ref="formData">
                </form-datechildren>
              </div>
            </div>
            <div class="dra-content">
              <div class="content-titel">
                <span>结算信息</span>
              </div>
              <div class=""
                   style="padding:0 20px">
                <form-datechildren :formItem="form_item2"
                                   ref="formData">
                </form-datechildren>
              </div>
            </div>
          </div>
          <div class="dra-footer">
            <div class="dra-footer-content">
              <!-- 绑定事件 将验证规则和所有数据传出去 -->
              <!--    @click="item.handler && item.handler(configObj,$refs['ruleForm'])" -->
              <button class="dra-submit el-icon-circle-check"
                      @click="handleClose"><span>确定</span></button>
              <button class="dra-cancel"
                      @click="handleClose()"><span>取消</span></button>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import formDatechildren from '@/components/form/formDatechildren'

export default {
  components: {
    formDatechildren,
  },
  data () {
    return {
      isVisibleDrawe: false,
      isVisibleDrawe2: false,
      date1: '',
      activeName: 'first',
      // 选中表格数据
      table_row: {},
      input_form: [
        {
          type: 'startEndDate',
          label: '结算时间',
          prop: 'p1',
          startPlaceholder: '请选择开始时间',
          rangeSeparator: ' ～',
          endPlaceholder: '结束时间',
        },
        {
          type: 'Input',
          label: '供应商名称',
          placeholder: '请输入商品编号',
          prop: 'p2',
        },
      ],
      table_config2: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          {
            label: '订单号',
            prop: 'table2',
            width: 'auto',
          },
          {
            label: '商品信息',
            prop: 'table3',
            width: '180',
          },
          {
            label: '商品总价',
            prop: 'table4',
            width: 'auto',
          },
          {
            label: '优惠信息',
            prop: 'table5',
            width: 'auto',
          },
          {
            label: '实付款',
            prop: 'table6',
            width: 'auto',
          },
        ],
        table_data: [
          {
            table1: '1',
            table2: '323534520359',
            table3:
              '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
            table4: '¥28.8',
            table5: '',
            table6: '¥28.8',
          },
        ],
      },
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          {
            label: '所属供应商',
            prop: 'table2',
            width: '220',
          },
          {
            label: '订单数量',
            prop: 'table3',
            width: '120',
            type: 'slot',
            slotName: 'table3',
          },

          { label: '订单数量', prop: 'table4', width: '180' },
          { label: '创建时间', prop: 'table5', width: '180' },
          { label: '结束时间', prop: 'table6', width: '180' },
          { label: '结算时间', prop: 'table7', width: '180' },
          { label: '订单总额', prop: 'table8', width: '180' },
          { label: '支付金额', prop: 'table9', width: '180' },
          { label: '支付税率', prop: 'table10', width: '180' },
          { label: '结算手续费', prop: 'table11', width: '180' },
          {
            label: '供应商商品结算金额',
            prop: 'table12',
            width: '180',
          },
          {
            label: '供应商实际结算金额',
            prop: 'table13',
            width: '180',
          },
          { label: '结算状态', prop: 'table14', width: '180' },
          { label: '结算账期(月)', prop: 'table15', width: '120' },
        ],
        table_data: [
          {
            table1: '1',
            table2: '宁波世纪大厦',
            table3: '5898',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9',
          },
          {
            table1: '2',
            table2: '宁波绿地分公司',
            table3: '3233',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9',
          },
          {
            table1: '3',
            table2: '宁波建设银行分行',
            table3: '31233',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9',
          },
          {
            table1: '4',
            table2: '宁波医科达集团股份有限公司',
            table3: '331231',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9',
          },
          {
            table1: '5',
            table2: '宁波沙马家居外贸有限公司',
            table3: '32133',
            table4: '2020-08-01',
            table5: '2020-08-31',
            table6: '2020-09-01',
            table7: '¥1000.00',
            table8: '¥1000.00',
            table9: '¥1000.00',
            table10: '0.060',
            table11: '¥60.00',
            table12: '¥1000.00',
            table13: '¥940.00',
            table14: '待结算',
            table15: '9',
          },
        ],
      },
      form_item1: [
        {
          type: 'span',
          label: '供应商 ',
          value: '宁波永成物业有限公司 ',
          prop: 'f1',
          elwidth: '320px',
          width: '100%',
        },
        {
          type: 'span',
          label: '开户银行 ',
          value: '中国建设银行',
          prop: 'f2',
          elwidth: '320px',
          width: '100%',
        },
        {
          type: 'span',
          label: '帐号 ',
          value: '6212263901007716783 ',
          prop: 'f3',
          elwidth: '320px',
          width: '100%',
        },
        {
          type: 'span',
          label: '支付税率 ',
          value: '0.060 ',
          slotName: 'f5',
          prop: 'f5',
          width: '100%',
        },
        {
          type: 'span',
          label: '结算手续费  ',
          value: '0.060 ',
          slotName: 'f6',
          prop: 'f6',
          width: '100%',
        },
      ],
      form_item2: [
        {
          type: 'span',
          label: '供应商 ',
          value: '宁波永成物业有限公司 ',
          prop: 'f1',
          elwidth: '320px',
          width: '100%',
        },
        {
          type: 'span',
          label: '开户银行 ',
          value: '中国建设银行',
          prop: 'f2',
          elwidth: '320px',
          width: '100%',
        },
        {
          type: 'select',
          label: '结算方式  ',
          value: '1',
          options: [
            { label: '向他行账户转账 ', value: '1' },
            { label: '向他行微信转账 ', value: '2' },
          ],

          prop: 'f3',
          elwidth: '320px',
          width: '100%',
        },
        {
          type: 'Input',
          label: '开户银行 ',

          prop: 'f4',
          elwidth: '320px',
          width: '100%',
        },
      ],
    }
  },

  methods: {
    // table选中行
    tableRow (data) {
      this.table_row = data
    },
    handleClose () {
      this.isVisibleDrawe = false
      this.isVisibleDrawe2 = false
    },
  },
}
</script>
<style scoped>
</style>
