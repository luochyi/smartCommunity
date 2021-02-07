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
    <div v-if="change">
      <div class="main-content">
        <div class="main-titel">
          <span>团购商品管理</span>
        </div>

        <div class="content">
          <div class="content-btn">
            <el-button class="init-button"
                       icon="el-icon-plus"
                       @click="change= false">新增团购</el-button>
          </div>
          <!-- 查询重制 -->
          <div class="">
            <!-- 头部输入框 -->
            <div>
              <input-form :formItem="input_form"
                          :btnWidth="'20%'"> </input-form>
            </div>
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部商品"
                           name="first"></el-tab-pane>
              <el-tab-pane label="出售中"
                           name="second"></el-tab-pane>
              <el-tab-pane label="库存预警"
                           name="third"></el-tab-pane>
              <el-tab-pane label="已下架"
                           name="third1"></el-tab-pane>
              <el-tab-pane label="回收站"
                           name="fourth"></el-tab-pane>
            </el-tabs>
            <div class="content-table">
              <tableData :config="table_config"
                         @clickrow="tableRow"></tableData>
              <div class="table-footer">
                <button @click="drawer_details = true">查询</button>
                <button @click="del">删除</button>
              </div>
            </div>
            <table-pagination></table-pagination>
          </div>
        </div>
        <!-- 详情 -->
        <drawerDetails :drawerVrisible="drawer_details"
                       @handleClose="getClose"></drawerDetails>
        <!-- 删除 提示弹窗-->
        <Dialog :dialogVisible="dialog_visible"
                :dialog_config="dialog_config"
                @cancel="cancel"
                @confirm="confirm">
        </Dialog>
      </div>
    </div>
    <div v-else>
      <index @handleClose='handleClose'></index>
    </div>
  </div>

</template>

<script>
import drawerDetails from '@/views/butler/components/suggestConsultation/details.vue'
import Dialog from '@/components/dialog/Dialog.vue'
import index from '@/views/commodity/components/commodityCreation/index.vue'

export default {
    data() {
        return {
            change: true,
            input_form: [
                {
                    type: 'startEndDate',
                    label: '下单时间',
                    prop: 'p1',
                    startPlaceholder: '请选择开始时间',
                    rangeSeparator: ' ～',
                    endPlaceholder: '结束时间',
                },
                {
                    type: 'Input',
                    label: '商品标题',
                    placeholder: '请输入商品编号',
                    prop: 'p2',
                },
            ],

            // 控制dialog显示隐藏
            dialog_visible: false,
            // 传入dialog的参数
            dialog_config: {
                title: '',
                content: '',
            },
            activeName: 'first',
            // drawerDetails
            drawer_details: false,
            table_config: {
                thead: [
                    { label: '序号', prop: 'table1', width: '100' },
                    { label: '商品信息', prop: 'table2', width: '280' },
                    { label: '开始时间', prop: 'table3', width: '180' },
                    { label: '结束时间 ', prop: 'table4', width: '180' },
                    { label: '拼团人数', prop: 'table5', width: '120' },
                    { label: '团购价', prop: 'table6', width: '120' },
                    { label: '单独购买价', prop: 'table7', width: '120' },
                    { label: '划线价（原价）', prop: 'table8', width: '120' },
                    { label: '销量', prop: 'table9', width: '120' },
                    { label: '库存', prop: 'table10', width: '120' },
                    { label: '上架状态', prop: 'table11', width: '120' },
                ],
                table_data: [
                    {
                        table1: '1',
                        table2:
                            '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
                        table3: '2020-08-10 12:31:29',
                        table4: '2020-08-17 12:31:29',
                        table5: '100',
                        table6: '¥29.9',
                        table7: '¥39.9',
                        table8: '¥39.9',
                        table9: '100',
                        table10: '500',
                        table11: '上架中',
                    },
                    {
                        table1: '2',
                        table2:
                            '【超定制】三只松鼠 零食坚果大礼包1490g中秋节礼盒送礼9袋装',
                        table3: '2020-08-10 12:31:29',
                        table4: '2020-08-17 12:31:29',
                        table5: '100',
                        table6: '¥29.9',
                        table7: '¥39.9',
                        table8: '¥39.9',
                        table9: '100',
                        table10: '500',
                        table11: '上架中',
                    },
                    {
                        table1: '3',
                        table2:
                            '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
                        table3: '2020-08-10 12:31:29',
                        table4: '2020-08-17 12:31:29',
                        table5: '100',
                        table6: '¥29.9',
                        table7: '¥39.9',
                        table8: '¥39.9',
                        table9: '100',
                        table10: '500',
                        table11: '上架中',
                    },
                    {
                        table1: '4',
                        table2:
                            '【超定制】三只松鼠 零食坚果大礼包1490g中秋节礼盒送礼9袋装',
                        table3: '2020-08-10 12:31:29',
                        table4: '2020-08-17 12:31:29',
                        table5: '100',
                        table6: '¥29.9',
                        table7: '¥39.9',
                        table8: '¥39.9',
                        table9: '100',
                        table10: '500',
                        table11: '上架中',
                    },
                    {
                        table1: '5',
                        table2:
                            '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
                        table3: '2020-08-10 12:31:29',
                        table4: '2020-08-17 12:31:29',
                        table5: '100',
                        table6: '¥29.9',
                        table7: '¥39.9',
                        table8: '¥39.9',
                        table9: '100',
                        table10: '500',
                        table11: '上架中',
                    },
                    {
                        table1: '6',
                        table2:
                            '【超定制】三只松鼠 零食坚果大礼包1490g中秋节礼盒送礼9袋装',
                        table3: '2020-08-10 12:31:29',
                        table4: '2020-08-17 12:31:29',
                        table5: '100',
                        table6: '¥29.9',
                        table7: '¥39.9',
                        table8: '¥39.9',
                        table9: '100',
                        table10: '500',
                        table11: '上架中',
                    },
                    {
                        table1: '7',
                        table2:
                            '俏美味综合蔬菜干果蔬脆水果干混合装果蔬脆片秋葵香菇脆儿童零食',
                        table3: '2020-08-10 12:31:29',
                        table4: '2020-08-17 12:31:29',
                        table5: '100',
                        table6: '¥29.9',
                        table7: '¥39.9',
                        table8: '¥39.9',
                        table9: '100',
                        table10: '500',
                        table11: '上架中',
                    },
                ],
            },
        }
    },
    components: {
        drawerDetails,
        Dialog,
        index,
    },
    methods: {
        handleClick(row) {
            console.log(row)
        },
        // table选中行
        tableRow(data) {
            this.table_row = data
        },
        // 监听子组件取消事件
        cancel(data) {
            this.dialog_visible = false
        },
        // 监听子组件确认事件
        confirm(data) {
            this.dialog_visible = false
            this.$message({
                message: '删除成功',
                type: 'success',
            })
        },
        // 删除
        del(data) {
            console.log(this.table_row.table6 + '0000')
            if (JSON.stringify(data) != '{}') {
                this.dialog_config.title = '删除提示'
                if (this.table_row.table6 != '已反馈') {
                    this.dialog_config.content =
                        '该条信息，还为回复是否确认删除？'
                } else {
                    this.dialog_config.content = '是否确认删除该信息？'
                }
                this.dialog_visible = true
            } else {
                this.$message.error('请选中需要删除的表格数据')
            }
        },
        // 关闭抽屉
        getClose(data) {
            this.drawer_details = false
        },
        handleClose() {
            this.change = true
        },
    },
}
</script>
