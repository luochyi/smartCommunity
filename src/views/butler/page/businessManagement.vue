
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>业委会管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus">新增成员</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button>编辑</button>
              <button @click="del(table_row)">删除</button>

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
          { label: '职位', prop: 'positionId', width: 'auto' },
          { label: '姓名', prop: 'name', width: 'auto' },
          { label: '性别', prop: 'sexId', width: 'auto' },
          { label: '年龄', prop: 'age', width: 'auto' },
          { label: '学历', prop: 'educationId', width: 'auto' },
          { label: '房屋信息', prop: 'roomName', width: 'auto' },
          { label: '职业', prop: 'profession', width: 'auto' },
        ],
        table_data: [],
        url: 'ownersCommitteeList',
        search_item: [
          {
            type: 'select',
            label: '职位',
            placeholder: '请输入',
            prop: 'positionId',
            value: '',
            options: [
              { value: 1, label: '业委会主任' },
              { value: 2, label: '业委会副主任' },
              { value: 3, label: '业委会委员' },
            ]
          },
          {
            type: 'Input',
            label: '姓名',
            placeholder: '请输入',
            prop: 'name',
          },
          {
            type: 'select',
            label: '学历',
            placeholder: '请选择',
            prop: 'educationId',
            options: [
              { value: 1, label: '专科' },
              { value: 2, label: '本科' },
              { value: 3, label: '硕士' },
              { value: 4, label: '博士' },
            ]
          },
          {
            type: 'select',
            label: '性别',
            placeholder: '请选择',
            prop: 'sexId',
            value: '',
            options: [
              { value: '1', label: '男' },
              { value: '2', label: '女' }
            ]
          },
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '请输入',
            prop: 'roomName'
          },
          {
            type: 'Input',
            label: '职业',
            placeholder: '请输入',
            prop: 'profession'
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
    tableCheck (data) {
      this.table_row = data;
    },
    onSubmit () {
    },
    // 提醒
    del (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      if (!arr.length) {
        this.$message.error('请选中需要删除的表格数据')
        return
      }
      this.$confirm('是否删除？删除不可找回', '删除', {
        confirmButtonText: '确定',
        // showCancelButton: false
        cancelButtonText: '取消',
        // confirmButtonClass: 'confirmButton',
        // cancelButtonClass: 'cancelButton'
      }).then(() => {
        this.$refs.table.tableDelete(arr)
      }).catch(action => { });
    },
  }
}
</script>
