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
  <div>
    <div v-if="chargeComponents">
      <div class="main-content">
        <div class="main-titel">
          <span>品牌资质</span>
        </div>
        <div class="content">
          <div class="content-btn">
            <el-button class="init-button"
                       icon="el-icon-plus"
                       @click="chargeComponents=false">新增品牌</el-button>
          </div>
          <!-- 查询重制 -->
          <div class="">
            <input-form :formItem="input_form"
                        :btnWidth="'20%'"> </input-form>
            <!-- 头部输入框 -->
            <div class="content-table">
              <tableData :config="table_config"
                         @clickrow="tableRow">
                <template v-slot:table6="slotData">
                  <div>
                    <el-button class="init-text"
                               type="text">{{
                  slotData.data.table6
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
    </div>
    <div v-else>
      <addQualification></addQualification>
    </div>
  </div>

</template>
<script>
import addQualification from '../components/brandQualification/addQualification'
// conveniencePhone
export default {
    components: { addQualification },
    data() {
        return {
            chargeComponents: true,
            // 选中表格数据
            table_row: {},
            // 搜索重置数据
            input_form: [
                {
                    type: 'Input',
                    label: '品牌名称',
                    placeholder: '请输入',
                    prop: 'userName',
                },
                {
                    type: 'select',
                    label: '品牌状态',
                    placeholder: '请选择',
                    prop: 'phone',
                    options: [],
                },
            ],
            // 表格数据
            table_config: {
                thead: [
                    { label: '品牌中文名', prop: 'table1', width: 'auto' },
                    { label: '品牌英文名', prop: 'table2', width: '120' },
                    { label: '商标注册号', prop: 'table3', width: '240' },
                    { label: '所属类目', prop: 'table4', width: '180' },
                    {
                        label: '失效时间',
                        prop: 'table5',
                        width: '120',
                    },
                    {
                        label: '资质图片',
                        prop: 'table6',
                        width: '180',
                        type: 'slot',
                        slotName: 'table6',
                    },
                    { label: '授权状态', prop: 'table7', width: '180' },
                ],
                table_data: [
                    {
                        table1: '左家右厨',
                        table2: '',
                        table3: '14897344',
                        table4: '服饰箱包>男装>套装',
                        table5: '2020-04-13',
                        table6: '查看 ',
                        table7: '已生效',
                    },
                    {
                        table1: '三只松鼠',
                        table2: '',
                        table3: '14897344',
                        table4: '服饰箱包>男装>套装',
                        table5: '2020-02-01',
                        table6: '查看 ',
                        table7: '已生效',
                    },
                    {
                        table1: '戴森',
                        table2: 'Dyson',
                        table3: '14897344',
                        table4: '服饰箱包>男装>套装',
                        table5: '2020-04-05',
                        table6: '查看 ',
                        table7: '已生效',
                    },
                    {
                        table1: '南极人',
                        table2: '',
                        table3: '14897344',
                        table4: '服饰箱包>男装>套装',
                        table5: '2020-04-03',
                        table6: '查看 ',
                        table7: '已生效',
                    },
                    {
                        table1: '果壳',
                        table2: '',
                        table3: '14897344',
                        table4: '服饰箱包>男装>套装',
                        table5: '2020-04-03',
                        table6: '查看 ',
                        table7: '已生效',
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
