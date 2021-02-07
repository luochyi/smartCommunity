
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>借还管理</span>
    </div>
    <div class="content">
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="tabs">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="0"></el-tab-pane>
              <el-tab-pane label="出借中"
                           name="1"></el-tab-pane>
              <el-tab-pane label="已还"
                           name="2"></el-tab-pane>
            </el-tabs>
          </template>
          <template slot="footer">
            <div class="table-footer">
              <button @click="msg(table_row)">提醒</button>
            </div>
          </template>
        </VueTable>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 选中表格数据
      table_row: [],
      activeName: '0',
      value1: 3.7,
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '物品名称', prop: 'name', width: '120' },
          { label: '物品编号', prop: 'code', width: 'auto' },
          { label: '借用人', prop: 'borrowName', width: 'auto' },
          { label: '联系方式', prop: 'tel', width: '130' },
          { label: '出借时间', prop: 'beginDate', width: '130' },
          { label: '归还时间', prop: 'endDate', width: '180' },
          { label: '出借时长', prop: 'borrowDate', width: '180' },
          { label: '状态', prop: 'status', width: 'auto' },
          { label: '物品状态', prop: 'borrowStatus', width: 'auto' },
          { label: '备注', prop: 'remake', width: 'auto' },
          // { label: '备注', prop: 'table25', width: '100', type: 'tooltip' }
        ],
        table_data: [],
        url: 'borrowList',
        search_item: [
          {
            type: 'Input',
            label: '物品名称',
            placeholder: '请输入',
            prop: 'name'
          },
          {
            type: 'Input',
            label: '借用人',
            placeholder: '请输入',
            prop: 'borrowName'
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            prop: 'tel'
          },
          {
            type: 'startDate',
            label: '借用时间',
            placeholder: '请选择开始日期',
            prop: 'beginDate'
          }
          ,
          {
            type: 'endDate',
            label: '借用时间',
            placeholder: '请选择结束时间',
            prop: 'endDate'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
    }
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
    onSubmit () {
      console.log('submit!')
    },
    // 提醒
    msg (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      this.$confirm('提醒成功，已将信息发送给用户', '提醒', {
        confirmButtonText: '确定',
        showCancelButton: false
        // cancelButtonText: '取消',
        // confirmButtonClass: 'confirmButton',
        // cancelButtonClass: 'cancelButton'
      }).then(() => { }).catch(action => { });
    },
  }
}
</script>
