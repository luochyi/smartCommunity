<template>
  <div class="main-content">
    <div class="main-titel">
      <span>工单设置</span>
    </div>
    <div class="content">
      <div class="">
        <el-tabs v-model="activeName">
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
                                    :content="item.remake?item.remake:item.name"
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
                    <button @click="orderTypeEidt(orderTypeCheckData)">编辑</button>
                    <button @click="orderTypeDetailDel(orderTypeCheckData)">删除</button>
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
                           icon="el-icon-plus"
                           @click="orderTimeAdd">新增工单时限</el-button>
              </div>
              <VueTable ref="orderTimeTable"
                        :config="orderTimeTable"
                        @tableCheck='orderTimeCheck'>
                <template slot="footer">
                  <div class="table-footer">
                    <button @click='orderTimeEidt(orderTimeCheckData)'>编辑</button>
                    <button @click="orderTimeDel(orderTimeCheckData)"> 删除</button>
                  </div>
                </template>
              </VueTable>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 工单类型明细增加修改 -->
    <Drawer :drawerTitle="orderDetailTitle"
            @drawerClose="orderDetailClose"
            :drawerVrisible='orderDetail_vrisible'>
      <div style="padding:30px">
        <FromCard>
          <template slot="title">基本信息</template>
          <template>
            <VueForm ref="orderDetailVueForm"
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
                     :formObj='orderTimeForm'>
              <template slot='timeLimit'>
                <el-input placeholder="请选择工单大类"
                          style="width:240px"
                          size="small"
                          v-model.number="orderTimeForm.ruleForm.timeLimit">
                  <span slot="suffix">小时</span>
                </el-input>
              </template>
            </VueForm>
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
  </div>
</template>

<script>
import {
  workOrderType, workOrderTypeList, workOrderTypeUpdate, workOrderTypeFindById, workOrderTypeDetailUpdate,
  workOrderTypeInsert, workOrderTypeDelete, workOrderTypeDetailDelete, workOrderTypeDetailInsert, workOrderTimeLimitInsert, workOrderTimeLimitFindById, workOrderTimeLimitUpdate
} from '@/api/butler'
export default {
  data () {
    return {
      orderTimeTitle: '新增工单时限',
      orderTime_vrisible: false,
      // 工单时限新增修改form表单
      orderTimeForm: {
        ruleForm: {
          name: null,
          timeLimit: null,
          remake: null,
        },

        form_item: [
          {
            type: 'Input',
            label: '名称',
            placeholder: '请输入',
            width: '100%',
            prop: 'name'
          },
          {
            type: 'Slot',
            label: '工单处理时限',
            placeholder: '请输入',
            width: '100%',
            prop: 'timeLimit',
            slotName: 'timeLimit'
          },
          {
            type: 'textarea',
            label: '备注',
            placeholder: '请输入备注信息',
            width: '100%',
            rows: 5,
            prop: 'remake'
          }
        ],
        rules: {
          name: [{ required: true, message: '请填写工单名称', trigger: 'blur' }],
          timeLimit: [{ required: true, message: '请输入工单处理时限', trigger: 'blur' },
          { type: 'number', message: '年工单处理时限必须为数字值' }]
        }
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
        form_item: [
          {
            type: 'Select',
            label: '工单大类',
            placeholder: '请选择',
            disabled: true,
            options: [],
            width: '50%',
            prop: 'workOrderTypeId'
          },
          {
            type: 'Input',
            label: '工单类型名称',
            placeholder: '请输入',
            width: '100%',
            prop: 'name'
          }
        ],
        rules: {
          name: [{ required: true, message: '请填写工单名称', trigger: 'blur' }],
          workOrderTypeId: [{ required: true, message: '请选择工单大类', trigger: 'change' }]
        }
      },
      orderDetailEidtId: 0,
      // 工单明细表格数据
      orderTypeCheckData: [],
      // 工单类型明细
      orderTpeData: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
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
          // { label: '编号', prop: 'id', width: 'auto' },
          { label: '序号', type: 'index', width: '80' },
          { label: '名称', prop: 'name', width: 'auto' },
          { label: '处理时限（小时）', prop: 'timeLimit', width: 'auto' },
          { label: '备注', prop: 'remake', width: 'auto' },
        ],
        table_data: [
        ],
        url: 'workOrderTimeLimitList',
        data: {
          pageNum: 1,
          size: 10
        },
      },
      orderTimeEidtId: 0,
      // 工单时限选中数据
      orderTimeCheckData: [],
      // tab切换 工单大类切换
      activeName: '1',
    }
  },
  mounted () {
    this.getType()
    //给工单类型明细匹配值 
    this.getOrderTypeData()
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
    //给工单类型明细匹配值 
    getOrderTypeData () {
      workOrderType().then(res => {
        let arr = res.map(item => ({
          label: item.name,
          value: item.id
        }))
        this.orderDetailForm.form_item[0].options = arr
      })
    },
    // 工单明细添加
    orderTypeDetailAdd () {
      this.orderDetail_vrisible = true
      this.orderDetailForm.ruleForm.workOrderTypeId = this.typeList[this.typeActive].id
    },
    // 工单明细选中
    tableTypeRow (data) {
      this.orderTypeCheckData = data;
    },
    // 工单明细修改
    orderTypeEidt (data) {
      if (data.length) {
        if (data.length > 1) {
          this.$message.error('不能批量编辑');
          return
        }
        let resData = {
          id: data[0].id
        }
        workOrderTypeFindById(resData).then(result => {
          if (result) {
            this.orderDetailEidtId = result.id
            this.orderDetailForm.ruleForm.name = result.name
            this.orderDetailForm.ruleForm.workOrderTypeId = this.typeList[this.typeActive].id
            this.orderDetail_vrisible = true
          }
          console.log(result)
        })
      } else {
        this.$message.error('请选择需要编辑的数据');
      }
    },
    // 工单明细删除
    orderTypeDetailDel (data) {
      if (data.length) {
        let arr = []
        for (let i = 0; i < this.orderTypeCheckData.length; i++) {
          arr.push(this.orderTypeCheckData[i].id)
        }
        this.$confirm('是否确认删除？删除不可恢复', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(() => {
          let resData = {
            ids: arr
          }
          workOrderTypeDetailDelete(resData).then(result => {
            this.$message({
              type: 'success',
              message: result.message
            });
            this.getType()
            this.typeActive = 0
            this.orderDetailClose()
          })

        }).catch(action => { });
      } else {
        this.$message.error('请选中需要删除的数据');
      }
    },
    // 工单明细提交
    orderDetailSubmit () {
      this.$refs.orderDetailVueForm.submitForm()
    },
    // 工单明细验证通过提交
    orderDetailRuleSubmit () {
      if (!this.orderDetailEidtId) {
        let resData = {
          name: this.orderDetailForm.ruleForm.name,
          workOrderTypeId: this.orderDetailForm.ruleForm.workOrderTypeId
        }
        workOrderTypeDetailInsert(resData).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          });
          this.getType()

          this.orderDetailClose()
        })
      } else {
        let resData = {
          id: this.orderDetailEidtId,
          name: this.orderDetailForm.ruleForm.name
        }
        workOrderTypeDetailUpdate(resData).then(res => {
          this.$message({
            type: 'success',
            message: res.message
          });
          this.getType()
          this.orderDetailClose()
        })
      }

    },
    // 工单明细弹窗关闭
    orderDetailClose () {
      this.$refs.orderDetailVueForm.reset()
      this.orderDetailEidtId = 0
      this.orderDetail_vrisible = false
    },
    // 工单时限添加
    orderTimeAdd () {
      this.orderTime_vrisible = true
    },
    // 工单时限编辑
    orderTimeEidt (data) {
      if (data.length) {
        if (data.length > 1) {
          this.$message.error('不能批量编辑');
          return
        }
        let resData = {
          id: data[0].id
        }
        workOrderTimeLimitFindById(resData).then(result => {
          if (result) {
            this.orderTimeEidtId = result.id
            this.orderTimeForm.ruleForm.name = result.name
            this.orderTimeForm.ruleForm.timeLimit = result.timeLimit
            this.orderTimeForm.ruleForm.remake = result.remake
            this.orderTime_vrisible = true
          }
        })
      } else {
        this.$message.error('请选择需要编辑的数据');
      }
    },
    // 工单时限提交
    orderTimeSubmit () {
      this.$refs.orderTimeVueForm.submitForm()
    },
    // 工单时限验证通过提交
    orderTimeRuleSubmit () {
      let resData = {
        name: this.orderTimeForm.ruleForm.name,
        timeLimit: this.orderTimeForm.ruleForm.timeLimit,
        remake: this.orderTimeForm.ruleForm.remake,
      }
      // id等于0 添加否则修改
      if (!this.orderTimeEidtId) {
        workOrderTimeLimitInsert(resData).then(result => {
          this.$message({
            type: 'success',
            message: result.message
          });
          this.orderTimeClose()
          this.$refs.orderTimeTable.loadData()
        })
      } else {
        resData.id = this.orderTimeEidtId
        console.log(resData)
        workOrderTimeLimitUpdate(resData).then(result => {
          if (result.status) {
            this.$message({
              type: 'success',
              message: result.message
            });
          }

          this.orderTimeClose()
          this.$refs.orderTimeTable.loadData()
        })
      }

    },
    orderTimeClose () {
      this.orderTime_vrisible = false
      this.orderTimeEidtId = 0
      this.$refs.orderTimeVueForm.reset()
    },
    // 初始化数据 侧边栏
    getType () {
      workOrderType().then(res => {
        this.typeList = res
        this.typeList.map(item => {
          this.$set(item, "editBool", false)
        })
        this.TypeList(this.typeList[this.typeActive].id)
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
          this.getOrderTypeData()
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
    // 工单时限多选
    orderTimeCheck (data) {
      this.orderTimeCheckData = data
    },
    // 工单时限删除
    orderTimeDel (data) {
      if (data.length) {
        let arr = []
        for (let i = 0; i < this.orderTimeCheckData.length; i++) {
          arr.push(this.orderTimeCheckData[i].id)
        }
        this.$confirm('是否确认删除？删除不可恢复', '删除', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          confirmButtonClass: 'confirmButton',
          cancelButtonClass: 'cancelButton'
        }).then(() => {
          this.$refs.orderTimeTable.tableDelete(arr)
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
