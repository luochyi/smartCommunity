<template>
  <div class="main-content">
    <div class="main-titel">
      <span>物品管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus">添加物品</el-button>
      </div>
      <div class="">

        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <!-- <template slot="tabs">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="0"></el-tab-pane>
              <el-tab-pane label="正常"
                           name="1"></el-tab-pane>
              <el-tab-pane label="破损"
                           name="2"></el-tab-pane>
            </el-tabs>
          </template> -->
          <template slot="footer">
            <div class="table-footer">
              <button @click="del(table_row)">删除</button>
              <button>编辑</button>
              <button>打印二维码</button>
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
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '物品名称', prop: 'name', width: 'auto' },
          { label: '照片', prop: 'table7', width: 'auto' },
          { label: '数量', prop: 'quantity', width: 'auto' },
          { label: '库存', prop: 'stock', width: 'auto' },
          // { label: '物品状态', prop: 'status', width: 'auto' },
        ],
        table_data: [],
        url: 'articleList',
        search_item: [
          {
            type: 'Input',
            label: '物品名称',
            placeholder: '请输入',
            prop: 'name'
          },
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
    },
    // 删除
    del (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      this.$confirm('暂无', '删除', {
        confirmButtonText: '确定',
        // showCancelButton: false
        cancelButtonText: '取消',
        // confirmButtonClass: 'confirmButton',
        // cancelButtonClass: 'cancelButton'
      }).then(() => { }).catch(action => { });
    },
  }
}
</script>
