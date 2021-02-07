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
            <VueTable ref="table"
                      :config='config'
                      @tableCheck="tableCheck">
              <template slot="tabs">
                <el-tabs v-model="activeName"
                         @tab-click="handleClick">
                  <el-tab-pane label="全部"
                               name="0"></el-tab-pane>
                  <el-tab-pane label="未缴纳"
                               name="1"></el-tab-pane>
                  <el-tab-pane label="部分缴纳"
                               name="2"></el-tab-pane>
                </el-tabs>
              </template>
              <template slot="footer">
                <div class="table-footer">
                  <button @click="Pay()">缴费</button>
                  <button>备注</button>
                  <button @click="drawer_vrisible = true">推送提醒</button>
                </div>
              </template>
            </VueTable>
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
            type: 'span',
            label: '被推送人姓名',
            width: '100%',
            prop: 'name',
          },
          {
            type: 'textarea',
            label: '推送内容',
            placeholder: '请输入',
            rows: 6,
            width: '100%',
            prop: 'jj',
          },
        ],
      },
      drawer_vrisible: false,
      activeName: '0',
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '收费项目名称', prop: 'name', width: '180' },
          { label: '房屋信息', prop: 'roomName', width: '180' },
          { label: '计费开始时间', prop: 'beginDate', width: '180' },
          { label: '计费结束时间', prop: 'endDate', width: '180' },
          { label: '计费单价/单位', prop: 'unitPrice', width: '180' },
          { label: '面积/用量/数量', prop: 'num', width: '180' },
          { label: '费用金额', prop: 'costPrice', width: '180' },
          { label: '已缴金额', prop: 'paidPrice', width: '180' },
          { label: '应收金额', prop: 'totalPrice', width: '180' },
          { label: '待缴金额', prop: 'paymentPrice', width: '180' },
          { label: '状态', prop: 'status', width: '180' },
          { label: '备注', prop: 'remake', width: '180' },
          { label: '创建人', prop: 'createName', width: '180' },
          { label: '更新时间', prop: 'updateDate', width: '180' },
        ],
        table_data: [],
        url: 'dailyPaymentList',
        search_item: [
          {
            type: 'select',
            label: '费用名称',
            placeholder: '请输入',
            value: '',
            prop: 'workOrderTypeDetailId',
            options: [
              {
                label: '水电费',
                value: '1',
              },
              {
                label: '车辆费',
                value: '2',
              },
            ],
          },
          {
            type: 'startDate',
            label: '计费时间',
            placeholder: '请选择开始日期',
            prop: 'beginDate',
          },
          {
            type: 'endDate',
            label: '计费时间',
            placeholder: '结束时间',
            prop: 'endDate',
          },
          {
            type: 'Input',
            label: '缴费人',
            placeholder: '请选择',
            prop: 'payName',
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            prop: 'tel',
          },
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '楼栋/单元/房间号',
            prop: 'roomName',
          },
          // 房屋信息
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
    }
  },
  components: {
    drawer,
    addFee,
    Pay,
  },
  methods: {
    handleClick (tab, event) {
      let status = null
      if (this.activeName != 0) {
        status = this.activeName
      } else {
        status = null
      }
      const requestData = {
        pageNum: 1,
        size: 10,
        status: status
      }
      this.$refs.table.requestData(requestData);
    },
    tableCheck (data) {
      this.table_row = data;
    },
    addFee () {
      this.change = false
      this.addFee_show = true
    },
    Pay () {
      this.change = false
      this.Pay_show = true
    },
    // 关闭抽屉
    getClose (data) {
      this.drawer_vrisible = false
      console.log(data + '投票管理父组件')
    },
    cancel (data) {
      this.addFee_show = false
      this.Pay_show = false

      this.change = true
      console.log(data + '')
    },
  },
}
</script>
