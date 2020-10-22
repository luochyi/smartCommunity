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
      <span>新增供应商</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus">新增供应商</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <input-form :formItem="input_form"
                    :btnWidth="'20%'"> </input-form>
        <!-- 头部输入框 -->
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow="tableRow">
            <template v-slot:table5="slotData">
              <div>
                <el-button class="init-text"
                           type="text">{{
                  slotData.data.table5
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
      // 选中表格数据
      table_row: {},
      // 搜索重置数据
      input_form: [
        {
          type: 'Input',
          label: '供应商名称',
          placeholder: '请输入',
          prop: 'userName'
        },
        {
          type: 'select',
          label: '审核状态',
          placeholder: '请选择',
          prop: 'phone',
          options: []
        }
      ],
      // 表格数据
      table_config: {
        thead: [
          { label: '序号', prop: 'table1', width: 'auto' },
          { label: '供应商ID', prop: 'table2', width: '120' },
          { label: '供应商名称', prop: 'table3', width: '240' },
          { label: '联系方式', prop: 'table4', width: '180' },
          {
            label: '三证',
            prop: 'table5',
            width: '120',
            type: 'slot',
            slotName: 'table5'
          },
          { label: '创建时间', prop: 'table6', width: '180' },
          { label: '审核时间', prop: 'table7', width: '180' },
          { label: '审核状态', prop: 'table8', width: '100' },
          { label: '账号状态', prop: 'table9', width: '100' }
        ],
        table_data: [
          {
            table1: '1',
            table2: '1110',
            table3: '阿里巴巴集团股份有限公司',
            table4: '0574-76998577',
            table5: '查看',
            table6: '2020-08-20 09:00',
            table7: '',
            table8: '待审核',
            table9: '使用中'
          },
          {
            table1: '2',
            table2: '1111',
            table3: '蚂蚁金服集团',
            table4: '0574-76998587',
            table5: '查看 ',
            table6: '2020-08-20 09:00',
            table7: '',
            table8: '审核通过',
            table9: '待使用'
          },
          {
            table1: '3',
            table2: '1112',
            table3: '宁波盛世经贸有限公司',
            table4: '0574-76998577',
            table5: '查看 ',
            table6: '2020-08-20 09:00',
            table7: '',
            table8: '审核通过',
            table9: '待使用'
          },
          {
            table1: '4',
            table2: '1113',
            table3: '宁波电信分公司',
            table4: '0574-76998587',
            table5: '查看 ',
            table6: '2020-08-20 09:00',
            table7: '',
            table8: '待审核',
            table9: '使用中'
          },
          {
            table1: '5',
            table2: '1114',
            table3: '宁波移动公司分公司',
            table4: '0574-76998577',
            table5: '查看 ',
            table6: '2020-08-20 09:00',
            table7: '',
            table8: '待审核',
            table9: '使用中'
          },
          {
            table1: '6',
            table2: '1115',
            table3: '宁波外汇通外贸有限公司',
            table4: '0574-76998577',
            table5: '查看 ',
            table6: '2020-08-20 09:00',
            table7: '',
            table8: '待审核',
            table9: '使用中'
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
