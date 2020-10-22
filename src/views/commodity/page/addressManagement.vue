<template>
  <div class="main-content">
    <div class="main-titel">
      <span>地址库管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus">新增地址</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow="tableRow">
            <template v-slot:table3="slotData">
              <div>
                <el-radio class="init-radio"
                          v-model="slotData.data.table3.value"
                          :label="slotData.data.table3.label"></el-radio>
              </div>
            </template>
            <template v-slot:table2="slotData">
              <div>
                <el-radio class="init-radio"
                          v-model="slotData.data.table2.value"
                          :label="slotData.data.table2.label"></el-radio>
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
    data() {
        return {
            // 选中表格数据
            table_row: {},
            // 表格数据
            table_config: {
                thead: [
                    { label: '序号', prop: 'table1', width: 'auto' },
                    {
                        label: '发货地址',
                        prop: 'table2',
                        width: '120',
                        type: 'slot',
                        slotName: 'table2',
                    },
                    {
                        label: '退货地址',
                        prop: 'table3',
                        width: '120',
                        type: 'slot',
                        slotName: 'table3',
                    },
                    { label: '联系人', prop: 'table4', width: '120' },
                    {
                        label: '退货地址',
                        prop: 'table5',
                        width: '350',
                    },
                    {
                        label: '邮政编码',
                        prop: 'table6',
                        width: '180',
                    },
                    { label: '电话号码', prop: 'table7', width: '180' },
                    {
                        label: '手机号码',
                        prop: 'table8',
                        width: '180',
                    },
                    { label: '公司名称', prop: 'table9', width: '280' },

                    // 申请时间
                ],
                table_data: [
                    {
                        table1: '1',
                        table2: {
                            label: '默认',
                            value: true,
                        },
                        table3: {
                            label: '默认',
                            value: true,
                        },
                        table4: '毛包包',
                        table5: ' 宁波市海曙区战船街2号',
                        table6: '315000 ',
                        table7: '0574-76998577',
                        table8: '18233326809',
                        table9: '蚂蚁金服集团有限公司',
                    },
                    {
                        table1: '2',
                        table2: {
                            label: '默认',
                            value: true,
                        },
                        table3: {
                            label: '默认',
                            value: true,
                        },
                        table4: '张勇',
                        table5: '宁波市海曙区开明街333号',
                        table6: '315000 ',
                        table7: '0574-76998386',
                        table8: '18233326809',
                        table9: '阿里巴巴集团',
                    },
                    {
                        table1: '3',
                        table2: {
                            label: '默认',
                            value: true,
                        },
                        table3: {
                            label: '默认',
                            value: true,
                        },
                        table4: '马云',
                        table5: '宁波市鄞州区四明中路999号万达商业广场',
                        table6: '315000 ',
                        table7: '0574-76998577',
                        table8: '18233326809',
                        table9: '宁波沙马家居外贸有限公司',
                    },
                    {
                        table1: '4',
                        table2: {
                            label: '默认',
                            value: true,
                        },
                        table3: {
                            label: '默认',
                            value: true,
                        },
                        table4: '申极佳',
                        table5: '浙江省宁波市海曙区中山西路1000号808室',
                        table6: '315000 ',
                        table7: '0574-76998577',
                        table8: '18233326809',
                        table9: '宁波埃美柯金融集团',
                    },
                    {
                        table1: '5',
                        table2: {
                            label: '默认',
                            value: true,
                        },
                        table3: {
                            label: '默认',
                            value: true,
                        },
                        table4: '刘德副',
                        table5: '宁波市中山东路1083号世纪东方广场三楼 ',
                        table6: '315000 ',
                        table7: '0574-76998577',
                        table8: '18233326809',
                        table9: '宁波奥特乃是公司',
                    },
                    {
                        table1: '6',
                        table2: {
                            label: '默认',
                            value: true,
                        },
                        table3: {
                            label: '默认',
                            value: true,
                        },
                        table4: '爱美林',
                        table5: '浙江省宁波市奉文化路南口新星大道',
                        table6: '315000 ',
                        table7: '0574-76998577',
                        table8: '18233326809',
                        table9: '宁波外汇通外贸有限公司',
                    },
                    {
                        table1: '7',
                        table2: {
                            label: '默认',
                            value: true,
                        },
                        table3: {
                            label: '默认',
                            value: true,
                        },
                        table4: '王小明',
                        table5: '宁波市江北区江北大道188号',
                        table6: '315000 ',
                        table7: '0574-76998577',
                        table8: '18233326809',
                        table9: '宁波沙马家居外贸有限公司',
                    },
                    {
                        table1: '8',
                        table2: {
                            label: '默认',
                            value: true,
                        },
                        table3: {
                            label: '默认',
                            value: true,
                        },
                        table4: '李开复',
                        table5: '浙江省宁波市海曙区中山西路1000号808室',
                        table6: '315000 ',
                        table7: '0574-76998577',
                        table8: '18233326809',
                        table9: '宁波沙马家居外贸有限公司',
                    },
                ],
            },
        }
    },

    methods: {
        // table选中行
        tableRow(data) {
            this.table_row = data
        },
    },
}
</script>
