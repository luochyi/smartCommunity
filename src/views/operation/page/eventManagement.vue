<template>
  <div class="main-content">
    <div class="main-titel">
      <span>活动管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="add()"
                   icon="el-icon-plus">新增活动</el-button>
      </div>
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="tabs">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="0"></el-tab-pane>
              <el-tab-pane label="未开始"
                           name="1"></el-tab-pane>
              <el-tab-pane label="进行中"
                           name="2"></el-tab-pane>
              <el-tab-pane label="已结束"
                           name="3"></el-tab-pane>
            </el-tabs>
          </template>
          <template slot="footer">
            <div class="table-footer">
              <button @click='edit(table_row)'>修改</button>
              <button @click='del(table_row)'>删除</button>
              <button @click="registratinRecord(table_row)">报名记录</button>
            </div>
          </template>
        </VueTable>
        <!-- 新增修改 -->
        <Drawer :drawerTitle="addEidtTitle"
                @drawerClose="addEidtClose"
                :drawerVrisible='addEidt_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">基本信息</template>
              <template>
                <VueForm ref="addEidtVueForm"
                         :formObj='addEidtForm'>
                  <template slot='fileUrls'>
                    <template>
                      <el-upload :action="`${$baseUrl}upload/uploadActivity`"
                                 :on-success="ImgeSuccess"
                                 :file-list="imglist"
                                 :on-exceed="handleExceed"
                                 :limit="1"
                                 accept=".jpg,.png,.JPG,.PNG"
                                 :before-upload="beforeAvatarUpload">
                        <el-button icon="el-icon-edit"
                                   size="small">上传图片</el-button>
                        <span style='margin-left:10px;font-size:12px;color:#444444'>建议比例：3:2</span>
                        <div slot="tip"
                             class="el-upload__tip">
                          <span>支持扩展名：png,jpg</span>
                        </div>
                      </el-upload>
                    </template>
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
        <!-- record 报名记录-->
        <Drawer drawerTitle="报名记录"
                @drawerClose="recordClose"
                :drawerVrisible='record_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">基本信息</template>
              <div class="flex"
                   style="padding:10px 0">
                <div style="width:60px;">活动标题</div>
                <div style="flex:1;padding-left:10px">{{table_row.length?table_row[0].title:''}}</div>
              </div>
              <!-- <div class="flex"
                   style="padding:10px 0">
                <div style="width:60px;">活动类型</div>
                <div style="flex:1;padding-left:10px">社区问</div>
              </div> -->
              <div class="flex"
                   style="padding:10px 0">
                <div style="width:60px;">文化传播</div>
                <div style="flex:1;padding-left:10px">
                  <tableData :config="recordTableData">
                  </tableData>
                </div>
              </div>
            </FromCard>
          </div>
          <div slot="footer">
            <button class="btn-orange"
                    @click="recordClose()"><span> <i class="el-icon-circle-check"></i>确定</span></button>

          </div>
        </Drawer>
      </div>
    </div>
  </div>
</template>
<script>
import { activityManagementUpdate, activityManagementFindById, sponsorManagementList, activityManagementInsert, activityManagementFindRegistrationById } from '@/api/operation'
import { activityManagementFindEnableTempleDetail } from '@/api/charge'


export default {
  data () {
    return {
      table_row: [],
      imglist: [],
      record_vrisible: false,
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '通知标题', prop: 'title', width: '180' },
          { label: '主办方', prop: 'sponsorUnit', width: '100' },
          // { label: '图片', prop: 'imgs', width: 'auto' },
          { label: '活动地点', prop: 'location', width: '140' },
          { label: '活动联系人', prop: 'name', width: '140' },
          { label: '联系电话', prop: 'tel', width: '140' },
          { label: '报名开始时间', prop: 'registrationStartTime', width: '180' },
          { label: '报名截止时间', prop: 'registrationEndTime', width: '180' },
          { label: '活动开始时间', prop: 'activityStartTime', width: '180' },
          { label: '活动结束时间', prop: 'activityEndTime', width: '180' },
          { label: '状态', prop: 'status', width: 'auto' ,type:'function',
            callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '未开始'
                                    break
                                case 2:
                                    return '进行中'
                                    break
                                case 3:
                                    return '已结束'
                                    break
                            }
                        }
          },
          { label: '报名人数', prop: 'registrationNumber', width: ' 180' },
          { label: '收费标准', prop: 'participantsNumber', width: '120' },
          { label: '退费', prop: 'refund', width: '120' },
          { label: '创建人', prop: 'createName', width: '100' },
          { label: '更新时间', prop: 'updateDate', width: '180' },
        ],
        table_data: [],
        url: 'activityManagementList',
        search_item: [
          {
            type: 'Input',
            label: '通知标题',
            placeholder: '请输入内容',
            prop: 'title'
          },
          {
            type: 'startDate',
            label: '活动开始时间',
            placeholder: '请选择开始日期',
            prop: 'activityStartTimeStart',
          },
          {
            type: 'endDate',
            label: '活动结束时间',
            placeholder: '请选择结束时间',
            prop: 'activityStartTimeEnd',
          },
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      addEidtTitle: '新增公告',
      addEidt_vrisible: false,
      addEidtForm: {
        ruleForm: {
          sponsorId: null,
          title: null,
          content: null,
          fileUrls: [],
          location: null,
          registrationStartTime: null,
          registrationEndTime: null,
          activityStartTime: null,
          activityEndTime: null,
          participantsNumber: null,
          chargesTemplateDetailId: null,
          status: null,
          refund: null,
          name: null,
          tel: null
        },
        form_item: [
          {
            type: 'Select',
            label: '主办方',
            width: '50%',
            placeholder: '请选择',
            prop: 'sponsorId',
            options: []
          },
          {
            type: 'Input',
            label: '活动标题',
            placeholder: '请输入',
            prop: 'title',
            width: '100%'
          },
          {
            type: 'textarea',
            label: '活动内容 ',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'content'
          },
          // fileUrls
          {
            type: 'Slot',
            label: '图片',
            placeholder: '请输入',
            width: '100%',
            rows: 5,
            prop: 'fileUrls',
            slotName: 'fileUrls'
          },
          {
            type: 'Input',
            label: '活动地点',
            placeholder: '请输入',
            prop: 'location',
            width: '100%'
          },
          {
            type: 'DateTime',
            label: '报名开始时间',
            placeholder: '请选择',
            width: '50%',
            prop: 'registrationStartTime'
          },
          {
            type: 'DateTime',
            label: '报名截止时间',
            placeholder: '请选择',
            width: '50%',
            prop: 'registrationEndTime',
          },
          {
            type: 'DateTime',
            label: '活动开始时间',
            placeholder: '请选择',
            width: '50%',
            prop: 'activityStartTime'
          },
          {
            type: 'DateTime',
            label: '活动截止时间',
            placeholder: '请选择',
            width: '50%',
            prop: 'activityEndTime',
          },
          {
            type: 'Input',
            label: '参与人数',
            width: '50%',
            placeholder: '请输入',
            prop: 'participantsNumber'
          },
          {
            type: 'Select',
            label: '收费标准',
            width: '50%',
            placeholder: '请选择',
            prop: 'chargesTemplateDetailId',
            options: [
              {
                value: 1,
                label: '半年付'
              },
              {
                value: 2,
                label: '一年付'
              }
            ]
          },
          {
            type: 'Input',
            label: '退费',
            width: '50%',
            placeholder: '请输入',
            prop: 'refund'
          },
          {
            type: 'Input',
            label: '联系人',
            width: '50%',
            placeholder: '请输入',
            prop: 'name'
          },
          {
            type: 'Input',
            label: '联系电话',
            width: '50%',
            placeholder: '请输入',
            prop: 'tel'
          },
          {
            type: 'Select',
            label: '状态',
            width: '50%',
            placeholder: '请选择',
            prop: 'status',
            options: [
              {
                value: 1,
                label: '未开始'
              },
              {
                value: 2,
                label: '进行中'
              }
            ]
          }
        ]
      },
      activeName: '0',
      editID: null,
      recordTableData: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '姓名', prop: 'residentName', width: 'auto' },
          { label: '联系方式', prop: 'residentTel', width: 'auto' },
          { label: '报名时间', prop: 'registrationDate', width: 'auto' },
        ],
        table_data: [
        ],
        checkbox: false
      }
    }
  },
  created () {
    let resData = {
      pageNum: 1,
      size: 100
    }
    // 主办方
    sponsorManagementList(resData).then(res => {
      console.log(res)
      const data = res.tableList.map(item => {
        return {
          value: item.id,
          label: item.sponsorUnit
        }
      })
      let sponsorIdObj = this.addEidtForm.form_item.find(item => item.prop === 'sponsorId')
      sponsorIdObj.options = data
    })
    // 收费标准
    activityManagementFindEnableTempleDetail().then(result => {
      const feeData = result.data.map(item => {
        return {
          value: item.id,
          label: item.name,
          unitPrice: item.unitPrice,
          type: item.type
        }
      })
      let chargesTemplateDetailIdObj = this.addEidtForm.form_item.find(item => item.prop === 'chargesTemplateDetailId')
      chargesTemplateDetailIdObj.options = feeData
    })
  },
  methods: {
    handleClick (tab, event) {
      let status = null
      if (this.activeName != 0) {
        status = this.activeName
      } else {
        status = null
      }
      const requestData = {
        pageNum: 1,
        size: 10,
        status: status
      }
      this.$refs.table.requestData(requestData);
    },
    recordClose () {
      this.record_vrisible = false
    },
    // 报名记录
    registratinRecord (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }

      activityManagementFindRegistrationById({ id: data[0].id }).then(res => {
        console.log(res)
        this.recordTableData.table_data = res ? res : []
        this.record_vrisible = true

      })
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
    tableCheck (data) {
      this.table_row = data;
    },
    // 弹窗关闭
    addEidtClose () {
      this.addEidt_vrisible = false
      this.imglist = []
      for (let key in this.addEidtForm.ruleForm) {
        this.addEidtForm.ruleForm[key] = null
        this.addEidtForm.ruleForm.file = []
      }
    },
    // 提交
    addEidtSubmit () {
      for (let key in this.addEidtForm.ruleForm) {
        if (!this.addEidtForm.ruleForm[key]) {
          let data = this.addEidtForm.form_item.find(item => key === item.prop)
          this.$message.error(`请填写${data.label}`)
          return
        }
      }
      if (!this.addEidtForm.ruleForm.fileUrls.length) {
        this.$message.error(`请上传图片`)
        return
      }
      console.log(this.addEidtForm.ruleForm)
      if (!this.editID) {
        activityManagementInsert(this.addEidtForm.ruleForm).then((res) => {
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
        let resData = {
          id: this.editID,
          ...this.addEidtForm.ruleForm
        }
        activityManagementUpdate(resData).then((res) => {
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
    // 修改
    edit (data) {
      if (data.length > 1) {
        this.$message.error('只能查看一条数据的详情');
        return
      }
      if (!data.length) {
        this.$message.error('请选择');
        return
      }
      //进行中不可修改
      if(data[0].status==2){
        this.$message({
          message:'该状态不可修改',
          type:'error'
        })
      }
      activityManagementFindById({ id:data[0].id }).then(res => {
        console.log(res)
        this.editID = res.id

        if (res.imgUrls.length) {
          let obj = {
            name: res.imgUrls[0].url,
            url: res.imgUrls[0].url,
          }
          this.addEidtForm.ruleForm.fileUrls = [res.imgUrls[0].url]
          this.$set(this.imglist, 0, obj)
        } else {
          this.addEidtForm.ruleForm.fileUrls = []
        }
        this.addEidtForm.ruleForm.sponsorId = res.sponsorId
        this.addEidtForm.ruleForm.title = res.title
        this.addEidtForm.ruleForm.content = res.content
        this.addEidtForm.ruleForm.location = res.location
        this.addEidtForm.ruleForm.registrationStartTime = res.registrationStartTime
        this.addEidtForm.ruleForm.registrationEndTime = res.registrationEndTime
        this.addEidtForm.ruleForm.activityStartTime = res.activityStartTime
        this.addEidtForm.ruleForm.activityEndTime = res.activityEndTime
        this.addEidtForm.ruleForm.participantsNumber = res.participantsNumber
        this.addEidtForm.ruleForm.chargesTemplateDetailId = res.chargesTemplateDetailId
        this.addEidtForm.ruleForm.status = res.status
        this.addEidtForm.ruleForm.refund = res.refund
        this.addEidtForm.ruleForm.name = res.name
        this.addEidtForm.ruleForm.tel = res.tel
        this.addEidt_vrisible = true
      })
    },
    // 添加
    add () {
      this.addEidt_vrisible = true
    },
    // 图片上传成功
    ImgeSuccess (res, file) {
      console.log(res)
      this.$set(this.addEidtForm.ruleForm.fileUrls, 0, res.url)
    },
    // 图片文件上传之前
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isJPG = file.type === 'image/png'
      const isPNG = file.type === 'image/jpeg'
      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return (isJPG || isPNG) && isLt2M;
    },

    // 上传限制提示
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },

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
