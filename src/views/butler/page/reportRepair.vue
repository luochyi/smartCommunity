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
      <span>投诉表扬</span>
    </div>
    <div class="tips">
      <p>
        <span class="el-icon-warning-outline"
              style="margin:0 12px"></span>
        温馨提示：今日新增保修
        <span style="color:rgba(251, 71, 2, 1)">13</span>
        条
      </p>
    </div>
    <div class="content">

      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus"
                   @click="add()">新增报修</el-button>
      </div>
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
              <button @click='edit(table_row)'>编辑</button>
              <button>派工</button>
              <button>回访</button>
              <button>作废</button>
              <button @click="del(table_row)">删除</button>
            </div>
          </template>
        </VueTable>
      </div>
      <!--        @submitSuccess='submitSuccess'
               @handleClose="addEidtHandleClose" -->
      <addEidt :drawerTitle="addEidtDrawerTitle"
               ref="addEdit"
               @submitSuccess='submitSuccess'
               @handleClose="addEidtHandleClose"
               :drawerVrisible='addEidt_vrisible'></addEidt>
    </div>

  </div>
</template>

<script>
import addEidt from '@/views/butler/components/reportRepair/addEidt'

export default {
  data () {
    return {
      addEidtDrawerTitle: '',
      addEidt_vrisible: false,
      // 选中表格数据
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '报修单号', prop: 'code', width: '180' },
          { label: '状态', prop: 'status', width: '180' },
          { label: '房屋信息', prop: 'roomName', width: '180' },
          { label: '报修人', prop: 'repairmanName', width: '120' },
          { label: '报修人电话', prop: 'repairTel', width: '180' },
          { label: '报修时间', prop: 'repairDate', width: '180' },
          { label: '分配人', prop: 'distributorName', width: '120' },
          { label: '维修人', prop: 'operatorName', width: '120' },
          { label: '工单时限', prop: 'workOrderTimeLimit', width: '180' },
          { label: '来源', prop: 'fromsName', width: '180' }
        ],
        url: 'reportRepairList',
        table_data: [],
        search_item: [
          {
            type: 'Input',
            label: '报修单号',
            placeholder: '请输入',
            prop: 'code'
          },
          {
            type: 'Input',
            label: '报修人',
            placeholder: '请输入',
            prop: 'repairman'
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
            prop: 'repairDateStart'
          },
          {
            type: 'endDate',
            label: '结束时间',
            placeholder: '请选择结束日期',
            prop: 'repairDateEnd'
          },
          {
            type: 'Input',
            label: '分配人',
            placeholder: '请输入分配人',
            prop: 'distributor'
          },
          {
            type: 'Input',
            label: '维修人',
            placeholder: '请输入维修人	',
            prop: 'operator'
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
  components: {
    addEidt
  },
  methods: {
    // 编辑
    edit (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      this.addEidt_vrisible = true;
      this.$refs.addEdit.edit(data[0].id)

    },
    // 新增
    add () {
      this.addEidt_vrisible = true
      this.addEidtDrawerTitle = '新增保修'
    },
    addEidtHandleClose () {
      this.addEidt_vrisible = false

    },
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
      if (data.length) {
        let arr = []
        for (let i = 0; i < this.table_row.length; i++) {
          arr.push(this.table_row[i].id)
        }
        this.$confirm('是否确认删除？删除不可恢复', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(() => {
          this.$refs.table.tableDelete(arr)
        }).catch(action => { });
      } else {
        this.$message.error('请选中需要删除的数据');
      }
    },
    // 添加修改成功
    submitSuccess () {
      this.$refs.table.loadData()
    },
  },
}
</script>
