<style scoped lang="scss">
.tips_titles {
    margin-top: 20px;
    margin-left: 20px;
    .tips {
        margin: 20px;
        height: 38px;
        padding: 0 20px;
        line-height: 38px;
        background: #fafafa;
        border-radius: 4px;
        opacity: 0.8;
        border: 1px solid #e8e8e8;
    }
    span {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
    }
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel"
         style="border-bottom:none">
      <span>服务请求</span>
    </div>
    <div class="content">
      <!-- 查询重制 -->
      <div class="">
        <el-tabs v-model="activeName"
                 @tab-click="handleClick">
          <el-tab-pane label="待处理"
                       name="first"></el-tab-pane>
          <el-tab-pane label="已完成"
                       name="second"></el-tab-pane>
        </el-tabs>
        <div class="content-table">
          <tableData :config="table_config"
                     @clickrow="tableRow">
            <template v-slot:table8="slotData">
              <div>
                <el-button class="init-text"
                           type="text">{{
                  slotData.data.table8
                }}</el-button>
              </div>
            </template>
          </tableData>
          <div class="table-footer">
            <button @click='isVisibleDrawe2 = true
            '>编辑</button>
            <button @click='isVisibleDrawe=true'>查看订单</button>
            <button>查看处理</button>
          </div>
        </div>
        <table-pagination :pageSize="10"
                          :totalNumber="150"></table-pagination>
      </div>
    </div>
    <div class="drawer_box">
      <el-drawer title="服务请求处理"
                 :visible.sync="isVisibleDrawe2"
                 size="58%"
                 :before-close="handleClose"
                 :with-header="true">
        <div class="">
          <div class="">
            <div class="dra-content">
              <div class="content-titel">
                <span>供应商信息</span>
              </div>
              <div class=""
                   style="padding:0 20px">
                <form-datechildren :formItem="form_item1"
                                   ref="formData">
                </form-datechildren>
                <div class=""
                     style="background: #E8EBF2;width:100%;height:1px">
                </div>
                <div class='tips_titles'>
                  <span>服务内容</span>
                  <div class='tips'>
                    <p>用户反馈收到商品少件，要求商家回电协商处理，请商家24小时内联系用户处理</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="dra-content">
              <div class="content-titel">
                <span>回复</span>
              </div>
              <div class=""
                   style="padding:0 20px">
                <form-datechildren :formItem="form_item2"
                                   ref="formData">
                </form-datechildren>
              </div>
            </div>
          </div>
          <div class="dra-footer">
            <div class="dra-footer-content">
              <!-- 绑定事件 将验证规则和所有数据传出去 -->
              <!--    @click="item.handler && item.handler(configObj,$refs['ruleForm'])" -->
              <button class="dra-submit el-icon-circle-check"
                      @click="handleClose"><span>提交</span></button>
              <button class="dra-cancel"
                      @click="handleClose()"><span>取消</span></button>
            </div>
          </div>
        </div>
      </el-drawer>
      <el-drawer title="服务请求处理"
                 :visible.sync="isVisibleDrawe"
                 size="58%"
                 :before-close="handleClose"
                 :with-header="true">
        <div class="">
          <div class="">
            <div class="dra-content">
              <div class="content-titel">
                <span>供应商信息</span>
              </div>
              <div class=""
                   style="padding:0 20px">
                <form-datechildren :formItem="form_item1"
                                   ref="formData">
                </form-datechildren>
                <div class=""
                     style="background: #E8EBF2;width:100%;height:1px">
                </div>
                <div class='tips_titles'>
                  <span>服务内容</span>
                  <div class='tips'>
                    <p>用户反馈收到商品少件，要求商家回电协商处理，请商家24小时内联系用户处理</p>
                  </div>
                </div>
                <div class='tips_titles'>
                  <span>回复内容 </span>
                  <div class='tips'>
                    <p>已与用户协商处理</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="dra-footer">
            <div class="dra-footer-content">
              <!-- 绑定事件 将验证规则和所有数据传出去 -->
              <!--    @click="item.handler && item.handler(configObj,$refs['ruleForm'])" -->
              <button class="dra-submit el-icon-circle-check"
                      @click="handleClose"><span>提交</span></button>
              <button class="dra-cancel"
                      @click="handleClose()"><span>取消</span></button>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import formDatechildren from '@/components/form/formDatechildren'

export default {
    components: {
        formDatechildren,
    },
    data() {
        return {
            isVisibleDrawe: false,
            isVisibleDrawe2: false,
            activeName: 'first',
            // 选中表格数据
            table_row: {},
            form_item1: [
                {
                    type: 'span',
                    label: '服务请求ID  ',
                    value: '324520359 ',
                    prop: 'f1',
                    width: '50%',
                },
                {
                    type: 'span',
                    label: '创建时间  ',
                    value: '2020-08-23 19:23:01 ',
                    prop: 'f2',
                    width: '50%',
                },

                {
                    type: 'span',
                    label: '处理人  ',
                    value: '萧阿美 ',
                    prop: 'f4',
                    width: '50%',
                },
                {
                    type: 'span',
                    label: '处理时间  ',
                    value: '2020-08-24 10:10:24 ',
                    prop: 'f3',
                    width: '50%',
                },
            ],
            form_item2: [{}],

            // 表格数据
            table_config: {
                thead: [
                    { label: '服务请求ID', prop: 'table1', width: '180' },
                    { label: '订单ID', prop: 'table2', width: '200' },
                    { label: '创建时间', prop: 'table3', width: '220' },
                    { label: '处理时间', prop: 'table4', width: '220' },
                    {
                        label: '处理人',
                        prop: 'table5',
                        width: '120',
                    },
                    {
                        label: '服务内容',
                        prop: 'table6',
                        width: '180',
                    },
                    { label: '回复内容', prop: 'table7', width: '220' },
                ],
                table_data: [
                    {
                        table1: '324520352',
                        table2: '323534520387',
                        table3: '2020-08-20 09:00:33',
                        table4: '2020-08-20 09:00:33',
                        table5: '何非希',
                        table6:
                            '用户反馈收到商品少件，要求商家回电协商处理，请商家24小时内联系用户处理 ',
                        table7: '已经回电，但用户没接',
                    },
                    {
                        table1: '323534520359',
                        table2: '323534520359',
                        table3: '2020-08-20 09:00:33',
                        table4: '2020-08-20 09:00:33',
                        table5: '张亮',
                        table6:
                            '用户反馈收到商品丢失，要求商家回电协商处理，请商家24小时内联系用户处理 ',
                        table7: '以协商一致，重新发货',
                    },
                    {
                        table1: '323534520312',
                        table2: '323534520319',
                        table3: '2020-08-20 09:00:33',
                        table4: '2020-08-20 09:00:33',
                        table5: '刘吨',
                        table6:
                            '用户反馈收到商品损坏，要求商家回电协商处理，请商家24小时内联系用户处理 ',
                        table7: '已经回电，但用户没接',
                    },
                    {
                        table1: '323534520359',
                        table2: '323534520323',
                        table3: '2020-08-20 09:00:33',
                        table4: '2020-08-20 09:00:33',
                        table5: '章东升',
                        table6:
                            '用户反馈收到商品丢失，要求商家回电协商处理，请商家24小时内联系用户处理 ',
                        table7: '已经回电，但用户没接',
                    },
                    {
                        table1: '323534523359',
                        table2: '323534520359',
                        table3: '2020-08-20 09:00:33',
                        table4: '2020-08-20 09:00:33',
                        table5: '何非希',
                        table6:
                            '用户反馈收到商品少件，要求商家回电协商处理，请商家24小时内联系用户处理 ',
                        table7: '已经回电，但用户没接',
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
        handleClick() {},
        handleClose() {
            this.isVisibleDrawe = false
            this.isVisibleDrawe2 = false
        },
    },
}
</script>
