<template>
  <div class="main-content">
    <div class="main-titel">
      <span>通知管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus"
                   @click="add()">新增公告</el-button>
        <el-button type="init-button2"
                   @click="viewsRecords = true"
                   plain>查看发送记录</el-button>
      </div>
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button @click="viewsDetails = true">详情</button>
              <button @click='edit(table_row)'>修改</button>
              <button>推送</button>
              <button @click="newNotification = true">发送短信</button>
              <button @click='del(table_row)'>删除</button>
            </div>
          </template>
        </VueTable>

        <!-- 添加 -->
        <el-drawer title="我是标题"
                   :visible.sync="viewsRecords"
                   size="56.26%"
                   :with-header="false">
          <views-records></views-records>
        </el-drawer>

        <!-- 详情 -->
        <el-drawer title="我是标题"
                   :visible.sync="viewsDetails"
                   size="56.26%"
                   :with-header="false">
          <views-details></views-details>
        </el-drawer>
      </div>
      <!-- 增加修改 -->
      <Drawer :drawerTitle="addEidtTitle"
              @drawerClose="addEidtClose"
              :drawerVrisible='addEidt_vrisible'>
        <div style="padding:30px">
          <FromCard>
            <template slot="title">基本信息</template>
            <template>
              <VueForm ref="addEidtForm"
                       :formObj='addEidtForm'>
                <template slot='pushObject'>

                  <el-radio :label="-1"
                            v-model="addEidtForm.ruleForm.pushObject">全体业主</el-radio>

                  <div style="margin: 6px 0 ">
                    <el-radio :label="-2"
                              v-model="addEidtForm.ruleForm.pushObject">全体租户</el-radio>
                  </div>
                  <div style="margin: 6px 0 ">
                    <el-radio :label="1"
                              v-model="addEidtForm.ruleForm.pushObject">自定义楼栋</el-radio>
                  </div>
                  <div>
                    <el-select v-model="BuildID"
                               :disabled='BuildDisabled'
                               style="width:240px"
                               placeholder="请选择楼栋">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </div>
                </template>
                <template slot='pushStatus'>
                  <el-radio :label="1"
                            v-model="addEidtForm.ruleForm.pushStatus">实时推送</el-radio>
                  <div style="margin:6px 0 ">
                    <el-radio :label="2"
                              v-model="addEidtForm.ruleForm.pushStatus">定时推送</el-radio>
                  </div>
                  <div>
                    <el-date-picker v-model="addEidtForm.ruleForm.timingPush"
                                    :disabled='timeDisabled'
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    align="right">
                    </el-date-picker>
                  </div>
                </template>
              </VueForm>

            </template>
          </FromCard>
        </div>
        <div slot="footer">
          <button class="btn-orange"
                  @click="addEidtSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
          <button class="btn-gray"
                  @click="addEidtClose"><span>取消</span></button>
        </div>
      </Drawer>
    </div>
  </div>
</template>
<script>
import viewsRecords from '@/views/operation/components/notificationManagement/viewsRecords'
import viewsDetails from '@/views/operation/components/notificationManagement/viewsDetails'
import { cpmBuildingUnitFindAll } from '@/api/basic'
import { notificationManagementInsert, notificationManagementFindById, notificationManagementUpdate } from '@/api/operation'

// notificationManagementInsert

export default {

  data () {
    return {
      addEidtTitle: '',
      addEidt_vrisible: false,
      timeDisabled: true,
      BuildDisabled: true,
      BuildID: null,
      options: null,
      editId: null,
      addEidtForm: {
        ruleForm: {
          title: null,
          content: null,
          suffix: null,
          pushObject: null,
          timingPush: null,
          pushStatus: null,
        },
        form_item: [
          {
            type: 'Input',
            label: '通知标题',
            placeholder: '请输入',
            width: '100%',
            prop: 'title',
          },
          {
            type: 'textarea',
            label: '通知内容',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'content'
          },
          {
            type: 'Input',
            label: '通知后缀',
            placeholder: '请输入',
            width: '100%',
            prop: 'suffix',
          },
          // 1.元/月 平方米，2.元/ 立方米，3.元/ 次
          //  
          {
            type: 'Slot',
            label: '推送对象',
            placeholder: '请输入',
            width: '100%',
            prop: 'pushObject',
            slotName: 'pushObject'
          },
          {
            type: 'Slot',
            label: '推送时间',
            placeholder: '请输入',
            width: '100%',
            prop: 'pushStatus',
            slotName: 'pushStatus'
          },
        ],
        rules: {
          typeName: [{ required: true }],
          marker: [{ required: true, message: '请输入费用项目名称', trigger: 'blur' }],

        }
      },
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '通知标题', prop: 'title', width: 'auto' },
          // { label: '有效开始时间', prop: 'table3', width: 'auto' },
          // { label: '有效结束时间', prop: 'table4', width: 'auto' },
          { label: 'app阅读量', prop: 'readingVolume', width: 'auto' },
          { label: '推送状态', prop: 'pushStatus', width: 'auto' },
          { label: '短信状态', prop: '1', width: 'auto' },
          { label: '创建人', prop: 'createName', width: 'auto' },
          { label: '更新时间', prop: 'updateDate', width: 'auto' },
        ],
        table_data: [],
        url: 'notificationManagementList',
        search_item: [
          {
            type: 'Input',
            label: '通知标题',
            placeholder: '请输入内容',
            prop: 'title'
          },
          {
            type: 'select',
            label: '推送状态',
            value: '',
            options: [
              { label: '已推送', value: '1' },
              { label: '未推送', value: '2' },
            ],
            placeholder: '请选择推送状态',
            prop: 'pushStatus'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        }
      },
      // 添加
      viewsDetails: false,
      viewsRecords: false,
      newNotification: false,

    }
  },
  created () {
    cpmBuildingUnitFindAll().then(res => {
      this.options = res
    })
  },
  components: {
    viewsRecords,
    viewsDetails
  },
  computed: {},
  methods: {
    add () {
      this.addEidt_vrisible = true;
    },
    edit (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      notificationManagementFindById({ id: this.table_row[0].id }).then(res => {
        console.log(res)
        this.editId = res.id
        this.addEidtForm.ruleForm.title = res.title
        this.addEidtForm.ruleForm.content = res.content
        this.addEidtForm.ruleForm.suffix = res.suffix

        this.addEidtForm.ruleForm.timingPush = res.timingPush
        this.addEidtForm.ruleForm.pushStatus = res.pushStatus
        if (res.pushObject !== -1 && res.pushObject !== -2) {
          // resData.pushObject = this.addEidtForm.ruleForm.pushObject
          this.BuildID = res.pushObject
          this.addEidtForm.ruleForm.pushObject = 1
        } else {
          this.addEidtForm.ruleForm.pushObject = res.pushObject
        }
        this.addEidt_vrisible = true;

      })
    },

    addEidtSubmit () {
      let resData = {
        title: this.addEidtForm.ruleForm.title,
        content: this.addEidtForm.ruleForm.content,
        suffix: this.addEidtForm.ruleForm.suffix,
        pushObject: this.BuildID,
        timingPush: this.addEidtForm.ruleForm.timingPush,
        pushStatus: this.addEidtForm.ruleForm.pushStatus
      }
      for (let key in resData) {
        if (key == 'pushObject') {
          if (this.addEidtForm.ruleForm.pushObject === 1 && !this.BuildID) {
            this.$message.error(`选择楼栋`)
            console.log(resData)
            return
          } else if (this.addEidtForm.ruleForm.pushObject !== 1) {
            resData.pushObject = this.addEidtForm.ruleForm.pushObject
            console.log(resData)
          }
        } else {
          if (!resData[key]) {
            let data = this.addEidtForm.form_item.find(item => key === item.prop)
            this.$message.error(`请填写${data.label}`)
            console.log(resData)
            return
          }
        }


      }

      // 新增
      if (!this.editId) {
        notificationManagementInsert(resData).then(res => {
          console.log(res)
          // message: "添加通知管理信息成功", status: true
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.addEidtClose()
            this.$refs.table.loadData()
          }
        })

      } else {
        resData.id = this.editId
        // 编辑
        notificationManagementUpdate(resData).then(res => {
          console.log(resData)
          // message: "添加通知管理信息成功", status: true
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.addEidtClose()
            this.$refs.table.loadData()
          }
        })
      }

    },
    addEidtClose () {
      this.addEidt_vrisible = false;
      this.editId = null;
      this.BuildID = null
      for (let key in this.addEidtForm.ruleForm) {
        this.addEidtForm.ruleForm[key] = null
      }
    },
    tableCheck (data) {
      this.table_row = data;
    },

    // 发布
    release (data) {
      // if (JSON.stringify(data) != "{}") {
      //   this.dialog_config.title = '发布'
      //   this.dialog_config.content = '确定现在发布？'
      //   this.dialog_visible = true
      // } else {
      //   this.$message.error('请选中需要删除的表格数据');
      // }
    },
    // 删除
    del (data) {
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
    submitForm (formName) { },
    resetForm (formName) { }
  },
  watch: {
    'addEidtForm.ruleForm.pushStatus': {
      handler (newValue) {
        if (newValue === 2) {
          this.timeDisabled = false
        } else {
          this.timeDisabled = true
          // 当前日期格式化
          let date = new Date()
          let seperator1 = "-";
          let seperator2 = ":";
          let month = date.getMonth() + 1;
          let strDate = date.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
          this.addEidtForm.ruleForm.timingPush = currentdate
        }
      },
      immediate: true
    },
    'addEidtForm.ruleForm.pushObject': {
      handler (newValue) {
        if (newValue === 1) {
          this.BuildDisabled = false
        } else {
          this.BuildDisabled = true
        }
      },
      immediate: true
    }
  }
}
</script>
<style scoped>
.main-titel span {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    padding-left: 21px;
}
.content {
    padding: 20px;
}
.content-btn {
    padding-bottom: 20px;
}
.form-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.form-box > .form-input {
    margin-right: 170px;
}
.form-btn {
    flex: 1;
}
.input-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.input-box > div > span {
    color: #999999;
    font-size: 14px;
    padding-right: 10px;
}
.content-table {
    margin-top: 20px;
    border: 1px solid #f5f5f6;
}
</style>
