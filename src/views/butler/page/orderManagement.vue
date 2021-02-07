
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>派工单管理</span>
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
              <el-tab-pane label="待分配"
                           name="1"></el-tab-pane>
              <el-tab-pane label="已分配未接单"
                           name="2"></el-tab-pane>
              <el-tab-pane label="已分配处理中"
                           name="3"></el-tab-pane>
              <el-tab-pane label="已处理"
                           name="4"></el-tab-pane>
              <el-tab-pane label="已确认已完成"
                           name="5"></el-tab-pane>
              <el-tab-pane label="已关闭"
                           name="6"></el-tab-pane>
              <el-tab-pane label="已作废"
                           name="7"></el-tab-pane>
              <el-tab-pane label="已取消"
                           name="8"></el-tab-pane>
            </el-tabs>
          </template>
          <template slot="footer">
            <div class="table-footer">
              <button>详情</button>
              <button>编辑</button>
              <button>派工</button>
              <button>回访</button>
              <button>作废</button>

              <button @click="del(table_row)">删除</button>
            </div>
          </template>
        </VueTable>
      </div>
    </div>
    <!-- 删除提示弹窗-->
    <Dialog :dialogVisible='dialog_visible'
            :dialog_config='dialog_config'
            @cancel='cancel'
            @confirm='confirm'>
    </Dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 控制dialog显示隐藏
      dialog_visible: false,
      dialog_config: {
        title: '',
        content: '',
      },
      // 选中表格数据
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '工单单号', prop: 'code', width: '180' },
          { label: '工单类型', prop: 'workOrderTypeName', width: '180' },
          { label: '状态', prop: 'status', width: '180' },
          { label: '派工时间', prop: 'dispatchDate', width: '120' },
          { label: '工单时限', prop: 'workOrderTimeLimit', width: '180' },
          { label: '提交人', prop: 'createName', width: '180' },
          { label: '提交人电话', prop: 'tel', width: '120' },
          { label: '维修人', prop: 'operatorName', width: '120' },
          { label: '房屋信息', prop: 'roomName', width: '180' },
          { label: '要求处理事项', prop: 'reportDetail', width: '180' },
          { label: '派工备注', prop: 'remake', width: '180' },
          { label: '开始处理时间', prop: 'beginDate', width: '180' },
          { label: '回访时间', prop: 'revisitDate', width: '180' },
          { label: '回访情况说明', prop: 'revisitDetail', width: '180' }
        ],
        url: 'dispatchList',
        table_data: [],
        search_item: [
          {
            type: 'Input',
            label: '工单单号',
            placeholder: '请输入',
            prop: 'code'
          },
          {
            type: 'Input',
            label: '提交人',
            placeholder: '请输入',
            prop: 'createName'
          },
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '单元/楼栋/房号',
            prop: 'roomName'
          },
          {
            type: 'startDate',
            label: '开始日期',
            placeholder: '请选择开始日期',
            prop: 'beginDateStart'
          },
          {
            type: 'endDate',
            label: '结束时间',
            placeholder: '请选择结束日期',
            prop: 'beginDateEnd'
          },
          // {
          //   type: 'Input',
          //   label: '分配人',
          //   placeholder: '请输入分配人',
          //   prop: 'distributor'
          // },
          {
            type: 'Input',
            label: '维修人',
            placeholder: '请输入维修人	',
            prop: 'operatorName'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      // tab默认绑定
      activeName: 0,
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
    tableCheck (arr) {
      this.table_row = arr

    },
    // 删除
    del (data) {
      console.log(data)
      if (data.length) {
        this.dialog_config.title = '删除提示'
        this.dialog_config.content = '是否确认删除？删除无法撤回！'
        this.dialog_visible = true
      } else {
        this.$message.error('请选中需要删除的表格数据')
      }
    },
    // 监听子组件取消事件
    cancel (data) {
      this.dialog_visible = false
    },
    // 监听删除确认确认事件
    confirm (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      // 调用子组件的方法
      this.$refs.table.tableDelete(arr)
      this.dialog_visible = false
    }
  },
}
</script>
