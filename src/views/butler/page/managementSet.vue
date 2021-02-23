<template>
  <div class="main-content">
    <div class="main-titel">
      <span>工单设置</span>
    </div>
    <div class="content">
      <div class="">
        <el-tabs v-model="activeName"
                 @tab-click="orderHandle">
          <el-tab-pane label="工单类型管理"
                       name="1">
            <div class="row_nav">
              <div class="left_nav">
                <div class="left-title">
                  <span class="title_text">工单大类</span>
                  <div class='title-icon'>
                    <div class='icon-box'
                         @click="typeListAdd()">
                      <span class="el-icon-plus"></span>
                    </div>
                    <div class='icon-box'
                         @click="typeListDelete()">
                      <span class="el-icon-delete-solid"></span>
                    </div>
                  </div>

                </div>
                <div class="ul-list">
                  <ul>
                    <li v-for="(item,index) in typeList"
                        :key='item.id'
                        :class="index===typeActive?'active':''"
                        @click="typeChange(index,item.id)">
                      <el-input v-model="item.name"
                                @blur='(e) => editInputBlur(e,item.name,item.id,index)'
                                @focus='(e) => editInputFocus(e,item.name)'
                                v-focus
                                v-if="item.editBool"
                                style='flex:1'
                                size="small"></el-input>
                      <span v-else>{{item.name}}</span>
                      <span>
                        <i class="el-icon-edit"
                           @click.stop="editType(index)"></i>
                        <el-tooltip class="item"
                                    effect="dark"
                                    :content="item.name"
                                    placement="right">
                          <i class="el-icon-warning-outline"></i>
                        </el-tooltip>
                      </span>

                    </li>
                  </ul>
                </div>
              </div>
              <div class="right_nav">
                <div class="content-btn">
                  <el-button class="init-button"
                             icon="el-icon-plus"
                             @click="orderTypeDetailAdd()">新增工单类型</el-button>
                </div>
                <div class="content-table"
                     style="width:574px">
                  <tableData :config="orderTpeData"
                             @clickrow='tableTypeRow'>
                  </tableData>
                  <div class="table-footer">
                    <button>编辑</button>
                    <button @click="orderTypeDetailDel(table_row)">删除</button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="工单限时管理"
                       name="2">
            <div class="right_nav">
              <div class="content-btn">
                <el-button class="init-button"
                           icon="el-icon-plus">新增工单类型</el-button>
              </div>
              <VueTable ref="table"
                        :config="orderTimeTable"
                        @tableCheck='orderTimeCheck'>
                <template slot="footer">
                  <div class="table-footer">
                    <button>编辑</button>
                    <button @click="orderTimeDel(orderTimeCheckData)"> 删除</button>
                  </div>
                </template>
              </VueTable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 工单时限增加修改 -->
    <Drawer :drawerTitle="orderTimeTitle"
            @drawerClose="orderTimeClose"
            :drawerVrisible='orderTime_vrisible'>
      <div style="padding:30px">
        <FromCard>
          <template slot="title">基本信息</template>
          <template>
            <VueForm ref="orderTimeVueForm"
                     @ruleSuccess='orderTimeRuleSubmit'
                     :formObj='orderTimeForm'></VueForm>
          </template>
        </FromCard>
      </div>
      <div slot="footer">
        <button class="btn-orange"
                @click="orderTimeSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="orderTimeClose"><span>取消</span></button>
      </div>
    </Drawer>
    <!-- 工单类型明细增加修改 -->
    <Drawer :drawerTitle="orderDetailTitle"
            @drawerClose="orderDetailClose"
            :drawerVrisible='orderDetail_vrisible'>
      <div style="padding:30px">
        <FromCard>
          <template slot="title">基本信息</template>
          <template>
            <VueForm ref="orderTimeVueForm"
                     @ruleSuccess='orderDetailRuleSubmit'
                     :formObj='orderDetailForm'></VueForm>
          </template>
        </FromCard>
      </div>
      <div slot="footer">
        <button class="btn-orange"
                @click="orderDetailSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="orderDetailClose"><span>取消</span></button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { workOrderType, workOrderTypeList, workOrderTypeUpdate, workOrderTypeInsert, workOrderTypeDelete } from '@/api/butler'
export default {
  data () {
    return {
      orderTimeTitle: '新增工单时限',
      orderTime_vrisible: false,
      // 工单时限新增修改form表单
      orderTimeForm: {
        ruleForm: {
          name: null,
          workOrderTypeId: null
        },
        rules: {
          code: [
            {
              required: true,
              message: '工单大类',
              trigger: 'blur'
            }
          ],
          no: [
            { required: true, message: '请填写楼栋编号', trigger: 'blur' }
          ],
          name: [
            {
              required: true,
              message: '请填写楼栋名称',
              trigger: 'blur'
            }
          ]
        },
        form_item: [
          {
            type: 's',
            label: '工单大类',
            placeholder: '请输入',
            width: '100%',
            prop: 'no'
          },
          {
            type: 'Input',
            label: '工单类型名称',
            placeholder: '请输入',
            width: '100%',
            prop: 'name'
          }
        ]
      },
      // 工单类型明细title Drawer显示隐藏
      orderDetailTitle: '新增工单类型',
      orderDetail_vrisible: false,
      // 工单类型明细表单
      orderDetailForm: {
        ruleForm: {
          name: null,
          workOrderTypeId: null
        },
        rules: {
          code: [
            {
              required: true,
              message: '工单大类',
              trigger: 'blur'
            }
          ],
          no: [
            { required: true, message: '请填写楼栋编号', trigger: 'blur' }
          ],
          name: [
            {
              required: true,
              message: '请填写楼栋名称',
              trigger: 'blur'
            }
          ]
        },
        form_item: [
          {
            type: 's',
            label: '工单大类',
            placeholder: '请输入',
            width: '100%',
            prop: 'no'
          },
          {
            type: 'Input',
            label: '工单类型名称',
            placeholder: '请输入',
            width: '100%',
            prop: 'name'
          }
        ]
      },
      // 选中表格数据
      table_row: {},
      orderTpeData: {
        thead: [
          { label: '编号', prop: 'id', width: 'auto' },
          { label: '名称', prop: 'name', width: 'auto' },
        ],
        table_data: [
        ],
        loading: true,
      },
      // 类型管理 - 分类
      // 在修改工单大类获取焦点时记录记录工单大类名称 
      typeListName: '',
      typeList: [],
      typeActive: 0,
      // 工单时限
      orderTimeTable: {
        thead: [
          { label: '编号', prop: 'id', width: 'auto' },
          { label: '名称', prop: 'name', width: 'auto' },
          { label: '处理时限（小时）', prop: 'remake', width: 'auto' },
          { label: '备注', prop: 'timeLimit', width: 'auto' },
        ],
        table_data: [
        ],
        url: 'workOrderTimeLimitList',
        data: {
          pageNum: 1,
          size: 10
        },
      },
      // 工单时限选中数据
      orderTimeCheckData: [],
      // tab切换 工单大类切换
      activeName: '1',
    }
  },
  mounted () {
    this.getType()
  },
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector('input').focus()
      }
    }
  },
  methods: {
    // 工单明细添加
    orderTypeDetailAdd () {
    },
    // 工单明细删除
    orderTypeDetailDel () {
    },
    // 工单明细提交
    orderDetailSubmit () {
    },
    // 工单明细提交
    orderDetailRuleSubmit () {
    },
    // 工单明细弹窗关闭
    orderDetailClose () {
    },
    // 工单时限提交
    orderTimeSubmit () {
    },
    // 工单时限验证通过提交
    orderTimeRuleSubmit () {
    },
    orderTimeClose () {
    },
    // 初始化数据 侧边栏
    getType () {
      workOrderType().then(res => {
        this.typeList = res
        this.typeList.map(item => {
          this.$set(item, "editBool", false)
        })
        this.TypeList(res[0].id)
      })
    },
    // 工单大类添加
    typeListAdd () {
      this.$prompt('请输入工单名称', '添加工单大类', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        let resData = {
          name: value
        }
        workOrderTypeInsert(resData).then(result => {
          console.log(result)
          this.$message({
            type: 'success',
            message: result.message
          });
          this.getType()
          this.typeActive = 0
        })

      }).catch(() => { });
    },
    // 工单大类删除 
    typeListDelete () {
      this.$confirm('是否确认删除工单大类？删除不可恢复', '工单大类删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'confirmButton',
        cancelButtonClass: 'cancelButton'
      }).then(() => {
        let resData = {
          id: this.typeList[this.typeActive].id
        }
        workOrderTypeDelete(resData).then(result => {
          this.$message({
            type: 'success',
            message: result.message
          });
          this.getType()
          this.typeActive = 0
        })
      }).catch(action => { });

    },
    //工单大类修改 控制input 显示
    editType (index) {
      this.$set(this.typeList[index], "editBool", true)
    },
    // 工单大类修改 input 失去焦点焦点时 修改名称
    editInputBlur (e, name, id, index) {
      this.$set(this.typeList[index], "editBool", false)
      // 在修改时新值和旧值相同不请求后台
      if (this.typeListName === name) {
        return
      }
      // 内容为空  重新给当前输入赋旧值 
      if (name === '') {
        this.typeList[index].name = this.typeListName
        this.$message.error('内容不能为空');

        return
      }
      let resData = {
        id: id,
        name: name,
      }
      workOrderTypeUpdate(resData).then(result => {
        console.log(result)
      })
    },
    // 工单大类修改 input获取焦点时 获取name  
    editInputFocus (e, name) {
      this.typeListName = name
    },
    // 根据工单类型查找工单明细数据
    TypeList (id) {
      let resData = {
        id: id,
      }
      workOrderTypeList(resData).then(res => {
        this.orderTpeData.table_data = res
        this.orderTpeData.loading = false
      })
    },
    // 侧边栏切换
    typeChange (index, id) {
      this.typeActive = index
      this.TypeList(id)
    },

    orderHandle () {
    },
    onSubmit () {
    },
    tableTypeRow (data) {
      this.table_row = data;
    },
    // 工单时限多选
    orderTimeCheck (data) {
      this.orderTimeCheckData = data
    },
    // 工单时限删除
    orderTimeDel (data) {
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
  }
}
</script>

<style scoped lang="scss">
.main-content {
    min-height: calc(100vh - 160px);
}
.row_nav {
    display: flex;
    flex: 1;
    border-radius: 0px 4px 4px 0px;
    border: 1px solid #e7e7e7;
    padding: 20px;
    .left_nav {
        width: 20%;
        min-height: 500px;
        margin-right: 24px;
        border-radius: 0px 4px 4px 0px;
        border: 1px solid #e7e7e7;
        .left-title {
            display: flex;
            padding: 18px 24px 18px 24px;
            justify-content: space-between;
            align-items: center;
            .title_text {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 20px;
            }
            .title-icon {
                font-size: 18px;
                .icon-box {
                    cursor: pointer;
                    display: inline-block;
                    padding: 6px;
                    &:hover {
                        opacity: 0.8;
                    }
                }
            }
        }
    }
}

.ul-list ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 0 24px;
    height: 44px;
    line-height: 44px;
    cursor: pointer;
    i {
        font-size: 16px;
        padding: 4px 8px;
    }
}
.ul-list ul li.active {
    background: #fff5f2;
    font-weight: bold;
    border-left: 4px solid #fb4702;
}
</style>
