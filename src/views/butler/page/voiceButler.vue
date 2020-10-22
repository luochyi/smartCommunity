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
      <span>语音管家</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="reviseDrawer = true"
                   icon="el-icon-plus">新增成员</el-button>
        <el-button type="init-button2"
                   icon="el-icon-folder-add"
                   plain>新增问卷调查</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">

        <input-form :formItem="form_item"
                    :btnWidth="'20%'"> </input-form>
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="全部"
                       name="first"></el-tab-pane>
          <el-tab-pane label="未处理"
                       name="second"></el-tab-pane>
          <el-tab-pane label="已处理"
                       name="third"></el-tab-pane>
        </el-tabs>
        <!-- 头部输入框 -->
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow='tableRow'></tableData>
          <div class="table-footer">
            <button>添加备注</button>
          </div>
        </div>
        <table-pagination></table-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      form_item: [
        {
          type: 'Input',
          label: '房屋信息',
          placeholder: '楼栋/单元/室号',
          prop: 'userName1'
        },
        {
          type: 'Input',
          label: '姓名',
          placeholder: '请输入',
          prop: 'userName'
        },
        {
          type: 'Input',
          label: '联系方式',
          placeholder: '请输入',
          prop: 'use232rName'
        }
      ],
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '房屋信息', prop: 'table7', width: 'auto' },
          { label: '姓名', prop: 'table3', width: 'auto' },
          { label: '联系方式', prop: 'table4', width: 'auto' },
          { label: '语音', prop: 'table5', width: 'auto' },
          { label: '状态', prop: 'table6', width: 'auto' },
          { label: '备注', prop: 'table2', width: 'auto' },
        ],
        table_data: [
          {
            table1: 1,
            table2: '',
            table3: '白初梓',
            table4: '15038578761',
            table5: '',
            table6: '未处理 ',
            table7: '1-3-1101',
            table8: '语文老师',
          },
          {
            table1: 2,
            table2: '',
            table3: '龚丹丹',
            table4: '13906273103',
            table5: '',
            table6: '未处理 ',
            table7: '2-4-0802',
            table8: '科长',
          },
          {
            table1: 3,
            table2: '',
            table3: '毛杵亦',
            table4: '17601798148',
            table5: '',
            table6: '未处理 ',
            table7: '2-2-1204',
            table8: '化学老师',
          },
          {
            table1: 4,
            table2: '',
            table3: '谭涔海',
            table4: '15120327106',
            table5: '',
            table6: '未处理 ',
            table7: '3-1-1003 ',
            table8: '大学教授',
          },
          {
            table1: 5,
            table2: '',
            table3: '侯淡夫',
            table4: '18199983338',
            table5: '',
            table6: '未处理 ',
            table7: '1-2-0602',
            table8: '公司经理',
          }
        ]
      },
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
    },
    onSubmit () {
      console.log('submit!')
    },
    ckimg () {
      this.showViewer = true
    }, // 关闭查看器
    closeViewer () {
      this.showViewer = false
    }
  }
}
</script>
