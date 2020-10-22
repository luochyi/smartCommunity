<template>
  <div>
    <div v-if="change">
      <div class="main-content">
        <!-- 日常缴费组件 -->
        <div class="main-titel">
          <span>日常缴费</span>
        </div>
        <div class="content">
          <div class="content-btn">
            <el-button class="init-button"
                       icon="el-icon-plus"
                       @click="addFee()">添加费用</el-button>
            <el-button type="init-button2"
                       icon="el-icon-folder-add"
                       plain>导出Excel</el-button>
          </div>
          <!-- 查询重制 -->
          <div class="">
            <!-- 头部输入框 -->
            <input-form :formItem="input_form"></input-form>
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="first"></el-tab-pane>
              <el-tab-pane label="未缴纳"
                           name="second"></el-tab-pane>
              <el-tab-pane label="部分缴纳"
                           name="third"></el-tab-pane>
            </el-tabs>
            <div class="content-table">
              <tableData :config="table_config"></tableData>
              <div class="table-footer">
                <button @click="Pay()">缴费</button>
                <button>备注</button>
                <button @click="drawer_vrisible = true">推送提醒</button>
              </div>
            </div>
            <table-pagination :pageSize='10'
                              :totalNumber="30"></table-pagination>
          </div>
        </div>
        <!-- 添加费用 -->
        <drawer :drawerVrisible='drawer_vrisible'
                @handleClose='getClose'
                :drawer_config="drawer_config"></drawer>
      </div>
      <!-- 添加费用组件 -->
    </div>
    <addFee v-if="addFee_show"
            @cancel="cancel"></addFee>

    <Pay v-if="Pay_show"
         @cancel="cancel"></Pay>
  </div>

</template>

<script>
// basic-admin/src/views/charge/components/dailyMayment/add.vue
import drawer from '@/components/Drawer/drawer.vue'
import addFee from '@/views/charge/components/dailyMayment/addFee.vue'
import Pay from '@/views/charge/components/dailyMayment/Pay.vue'
export default {
  data () {
    return {
      // 切换日常缴费组件和添加费用组件
      addFee_show: false,
      Pay_show: false,
      change: true,
      activeName: 'first',
      // 添加点击确认后弹出抽屉
      // 添加抽屉数据
      drawer_config: {
        drawer_vrisible: false,
        head_title: '访客编辑',
        content_title: '访客信息',
        ruleForm: {
          name: '何晓佳',
          jj: '',
        },
        form_item: [
          {
            type: "span",
            label: "被推送人姓名",
            width: "100%",
            prop: "name",
          },
          {
            type: "textarea",
            label: "推送内容",
            placeholder: "请输入",
            rows: 6,
            width: "100%",
            prop: "jj",
          }
        ],
      },
      drawer_vrisible: false,
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: '110' },
          { label: '收费项目名称', prop: 'table2', width: '180' },
          { label: '房屋信息', prop: 'table3', width: '180' },
          { label: '计费开始时间', prop: 'table4', width: '180' },
          { label: '计费结束时间', prop: 'table5', width: '180' },
          { label: '计费单价/单位', prop: 'table6', width: '180' },
          { label: '面积/用量/数量', prop: 'table7', width: '180' },
          { label: '费用金额', prop: 'table8', width: '180' },
          { label: '已缴金额', prop: 'table9', width: '180' },
          { label: '应收金额', prop: 'table10', width: '180' },
          { label: '待缴金额', prop: 'table11', width: '180' },
          { label: '状态', prop: 'table12', width: '180' },
          { label: '备注', prop: 'table13', width: '180' },
          { label: '创建人', prop: 'table14', width: '180' },
          { label: '更新时间', prop: 'table15', width: '180' },

        ],
        table_data: [
          {
            table1: 1,
            table2: '物业费',
            table3: '4-2-108',
            table4: '2020-08-01',
            table5: '2021-07-31',
            table6: '2.9元/月/平方米',
            table7: '100平方米',
            table8: '1200.00',
            table9: '1000.00',
            table10: '1200.00',
            table11: '200.00',
            table12: '部分缴纳',
            table13: '200.00',
            table14: '-',
            table15: '2020-08-01',
          },
          {
            table1: 2,
            table2: '公共能耗费',
            table3: '3-2-201',
            table4: '2020-08-01',
            table5: '2021-07-31',
            table6: '2.9元/月/平方米',
            table7: '100平方米',
            table8: '1200.00',
            table9: '1000.00',
            table10: '1200.00',
            table11: '200.00',
            table12: '未缴纳',
            table13: '200.00',
            table14: '-',
            table15: '2020-08-01',
          },
          {
            table1: 3,
            table2: '水费',
            table3: '3-1-808',
            table4: '2020-08-01',
            table5: '2021-07-31',
            table6: '0.7元/月/平方米',
            table7: '100平方米',
            table8: '1200.00',
            table9: '1000.00',
            table10: '1200.00',
            table11: '200.00',
            table12: '未缴纳',
            table13: '',
            table14: '',
            table15: '2020-08-01',
          },
          {
            table1: 4,
            table2: '公共能耗费',
            table3: '1-3-009',
            table4: '2020-08-01',
            table5: '2021-07-31',
            table6: '2.9元/月/平方米',
            table7: '50平方米',
            table8: '1200.00',
            table9: '1000.00',
            table10: '1200.00',
            table11: '200.00',
            table12: '部分缴纳',
            table13: '',
            table14: '',
            table15: '2020-08-01',
          }
        ]
      },
      input_form: [

        {
          type: 'select',
          label: '费用名称',
          placeholder: '请输入',
          value: '',
          prop: 'houssssd',
          options: [
            {
              label: '水电费',
              value: '1'
            },
            {
              label: '车辆费',
              value: '2'
            }
          ],
        },
        {
          type: 'startEndDate',
          label: '计费时间',
          rangeSeparator: '~',
          startPlaceholder: '请选择开始日期',
          endPlaceholder: '结束时间',
          prop: 'date1'
        },
        {
          type: 'Input',
          label: '缴费人',
          placeholder: '请选择',
          prop: 'houses'
        },
        {
          type: 'Input',
          label: '联系方式',
          placeholder: '请输入',
          prop: 'housad22ssssd'
        },
        {
          type: 'Input',
          label: '房屋信息',
          placeholder: '楼栋/单元/房间号',
          prop: 'hou23sadasssssd'
        },
        // 房屋信息
      ]
    }
  },
  components: {
    drawer,
    addFee,
    Pay
  },
  methods: {
    addFee () {
      this.change = false;
      this.addFee_show = true;
    },
    Pay () {
      this.change = false;
      this.Pay_show = true;
    },
    handleClick (row) {
      console.log(row)
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false;
      console.log(data + "投票管理父组件");
    },
    cancel (data) {
      this.addFee_show = false;
      this.Pay_show = false;

      this.change = true;
      console.log(data + "")
    }
  }
}
</script>
