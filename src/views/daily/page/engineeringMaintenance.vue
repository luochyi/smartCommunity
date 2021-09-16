
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>工程维修</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus"
                   @click="addOwnersCommittee">新增工程维修</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button @click="detail(table_row)">
                详情
              </button>
              <!-- <button @click='edit(table_row)'>编辑</button>
              <button @click="del(table_row)">删除</button> -->

            </div>
          </template>
        </VueTable>
      </div>
    </div>
    <!--业委会增加修改 -->
    <Drawer :drawerTitle="ownersCommitteeTitle"
            @drawerClose="ownersCommitteeClose"
            :drawerVrisible='ownersCommittee_vrisible'>
      <div style="padding:30px">
        <FromCard>
          <template slot="title">基本信息</template>
          <template>
            <VueForm ref="ownersCommitteeVueForm"
                     @ruleSuccess='ownersCommitteeRuleSubmit'
                     :formObj='addForm'>
              <template slot='fileUrls'>
                <template>
                  <el-upload :action="`${$baseUrl}upload/uploadButlerAppEngineeringRepair`"
                             :on-success="ownersImgeSuccess"
                             :show-file-list="false"
                             :before-upload="beforeAvatarUpload">
                    <div class='sys-image'
                         style='width:104px; height:104px'>
                      <div v-if="!fileUrls">
                        <i class="el-icon-plus"></i>
                        <p>上传照片</p>
                      </div>
                      <template v-else>
                        <!-- 临时地址 新增状态 -->
                        <el-image v-if="!editBool"
                                  :src="`${$ImgUrl}/temp${fileUrls}`"
                                  style="width: 104px; height: 104px"></el-image>
                        <!-- 非临时地址  编辑状态-->
                        <el-image v-else
                                  :src="`${$ImgUrl}${fileUrls}`"
                                  style="width: 104px; height: 104px"></el-image>
                      </template>
                    </div>
                  </el-upload>
                </template>
              </template>
              <!-- editId?'true':'false' -->
              <template v-slot:residentId>
                <el-select v-model="addForm.ruleForm.residentId"
                           :disabled="editId?true:false"
                           :remote-method='remoteMethod'
                           @change='(value) => change(value,options)'
                           @focus='focus'
                           :loading="loading"
                           remote
                           style="width:240px"
                           filterable
                           placeholder="请选择">
                  <el-option v-for="(item,index) in options"
                             :key="index"
                             :label="item.label"
                             :value="item.value">
                  </el-option>
                </el-select>
              </template>

            </VueForm>
          </template>
        </FromCard>
      </div>
      <div slot="footer">
        <button class="btn-orange"
                @click="ownersCommitteeSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
        <button class="btn-gray"
                @click="ownersCommitteeClose"><span>取消</span></button>
      </div>
    </Drawer>
  </div>
</template>

<script>
import { ownersCommitteeInsert, ownersCommitteeUpdate, ownersCommitteeFindById } from '@/api/daily'
import { userResident, userResidentFindResidentNameBySearch } from '@/api/basic'
import {repairEngineeringInsert} from '@/api/butler'
export default {
  data () {
    return {
      options: [],
      loading: false,
      // 业委会标题 业委会显示隐藏
      ownersCommitteeTitle: '',
      ownersCommittee_vrisible: false,
      editBool: false,
      editId: 0,
      // 选中表格数据
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '工程报修单号', prop: 'code', width: 'auto' 
          },
          { label: '报修区域', prop: 'repairArea', width: 'auto' },
          // { label: '性别', prop: 'sexId', width: 'auto',
          // type: 'function',
          //               callback: (row, prop) => {
          //                   switch (row.sexId) {
          //                       case 1:
          //                           return '男'
          //                           break
          //                       case 2:
          //                           return '女'
          //                           break
          //                   }
          //               } },
          { label: '报修详情', prop: 'reportDetail', width: 'auto' },
          { label: '状态', prop: 'status', width: 'auto',
          type: 'function',
                        callback: (row, prop) => {
                            switch (row.status) {
                                case 1:
                                    return '待派单（维修公司）'
                                    break
                                case 2:
                                    return '待派单（维修人员）'
                                    break
                                case 3:
                                    return '待接单'
                                    break
                                case 4:
                                    return '处理中'
                                    break
                                case 5:
                                    return '已处理'
                                    break
                                case 6:
                                    return '验收失败'
                                    break
                                case 7:
                                    return '验收成功'
                                    break
                                case 8:
                                    return '已作废'
                                    break
                                case 9:
                                    return '已取消'
                                    break
                            }
                        } },
          { label: '维修员工名称', prop: 'maintenanceStaffName', width: 'auto' },
          { label: '所属部门', prop: 'subordinateDepartments', width: 'auto' },
           { label: '维修单位名称', prop: 'organizationName', width: 'auto' },
          { label: '申请人名称', prop: 'createName', width: 'auto' },
          { label: '申请人电话', prop: 'createTel', width: 'auto' },
          { label: '报修时间', prop: 'createDate', width: 'auto' },
        ],
        table_data: [],
        url: 'repairEngineeringList',
        search_item: [
          {
            type: 'Input',
            label: '工程报修单号',
            placeholder: '请输入',
            prop: 'code',
          },
          {
            type: 'select',
            label: '状态',
            placeholder: '请选择',
            prop: 'status',
            options: [
              { value: 1, label: '待派单（维修公司）' },
              { value: 2, label: '待派单（维修人员）' },
              { value: 3, label: '待接单' },
              { value: 4, label: '处理中' },
              { value: 5, label: '已处理' },
              { value: 6, label: '验收失败' },
              { value: 7, label: '验收成功' },
              { value: 8, label: '已作废' },
              { value: 9, label: '已取消' },
            //   状态（1.待派单（维修公司），2.待派单（维修人员），3.待接单，4.处理中（或开始整改），5.已处理（待验收），6.验收失败，7.验收成功，8.已作废，9.已取消）
            ]
          },
          {
            type: 'Input',
            label: '报修区域',
            placeholder: '请输入',
            prop: 'repairArea',

          },
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      fileUrls: '',
      addForm: {
        ruleForm: {
          fileUrls: []
        },
        form_item: [
          {
            type: 'Input', label: '报修区域', placeholder: '请输入区域', width: '50%', prop: 'repairArea',
          },
          // {
          //   type: 'Select', label: '学历', placeholder: '请选择学历', width: '50%', prop: 'educationId',
          //   options: [
          //     { value: 1, label: '专科' },
          //     { value: 2, label: '本科' },
          //     { value: 3, label: '硕士' },
          //     { value: 4, label: '博士' }
          //   ]
          // },
          { type: 'Input', label: '报修详情', placeholder: '请输入详情', width: '50%', prop: 'reportDetail' },
          { type: 'Slot', label: '图片上传', width: '100%', prop: 'fileUrls', slotName: 'fileUrls' },
        ],
        rules: {
          // residentId: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        }
      },
      ownersObj: {}
    }
  },
  methods: {
    remoteMethod (val) {
      let reeData = {
        pageNum: 1,
        size: 20,
        name: val
      }
      this.loading = true
      userResidentFindResidentNameBySearch(reeData).then(res => {
        this.options = res.tableList
        this.loading = false
      })
    },
    focus () {
      let reeData = {
        pageNum: 1,
        size: 20
      }
      this.loading = true
      userResidentFindResidentNameBySearch(reeData).then(res => {
        this.options = res.tableList
        this.loading = false
        console.log(res)
      })
    },
    change (value, options) {
      let arr2 = options.filter(function (item) {
        if (item.value === value) {
          return item;
        }
      });
      this.ownersObj = arr2[0]
      this.addForm.ruleForm.roomName = this.ownersObj.roomName
      console.log(this.ownersObj)
    },
    // 添加修改弹窗提交验证通过
    ownersCommitteeRuleSubmit () {
      let resData = {
        repairArea:this.addForm.ruleForm.repairArea,
        type:1,
        reportDetail:this.addForm.ruleForm.reportDetail,
        fileUrls: this.addForm.ruleForm.fileUrls,
      }
      if (!this.editId) {

        console.log(resData)
        repairEngineeringInsert(resData).then(res => {
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.ownersCommitteeClose()
            this.$refs.table.loadData()
          }
        })
      } else {
        resData.id = this.editId
        ownersCommitteeUpdate(resData).then(res => {
          if (res.status) {
            this.$message({
              message: res.message,
              type: 'success'
            })
            this.$refs.table.loadData()
            this.ownersCommitteeClose()
          }
        })
      }
    },
    // 添加修改弹窗提交
    ownersCommitteeSubmit () {
      this.$refs.ownersCommitteeVueForm.submitForm()
    },
    // 添加成员 弹窗显示
    addOwnersCommittee () {
      this.ownersCommitteeTitle = ' 添加工程维修'
      this.ownersCommittee_vrisible = true;
    },
    detail(data){
      if(data.length!=1){
        this.$message({message:'请选择一条数据查看'})
        return
      }
      this.$router.push({ path:'/butler/engineeringMaintenanceDetail',query:{id:data[0].id}})
    },
    // 修改 弹窗显示
    edit (data) {
      if (data.length) {
        if (data.length > 1) {
          this.$message.error('不能批量编辑');
          return
        }
        this.ownersCommitteeTitle = ' 修改工程维修'
        this.ownersCommittee_vrisible = true;
        let resData = {
          id: data[0].id
        }
        this.addForm.ruleForm.residentId = data[0].name
        this.addForm.ruleForm.roomName = data[0].roomName
        this.addForm.ruleForm.positionId = data[0].positionId
        this.addForm.ruleForm.age = data[0].age
        this.addForm.ruleForm.educationId = data[0].educationId
        this.addForm.ruleForm.profession = data[0].profession
        this.ownersObj.value = data[0].estateId
        this.ownersObj.estateId = data[0].estateId
        ownersCommitteeFindById(resData).then(result => {
          console.log(result)
          this.editBool = true;
          this.editId = result.id
          this.add.ruleForm.fileUrls[0] = result.imgUrls[0].url
          this.fileUrls = result.imgUrls[0].url
        })
      } else {
        this.$message.error('请选择需要编辑的数据');
      }
    },
    tableCheck (data) {
      this.table_row = data;
    },
    //  弹窗关闭显示
    ownersCommitteeClose () {
      // 初始化数据 重置
      this.editId = 0
      this.fileUrls = ''
      this.ownersObj = {}
      for (let key in this.addForm.ruleForm) {
        this.$set(this.addForm.ruleForm, key, null)
      }
      console.log(this.addForm.ruleForm)
      this.$refs.ownersCommitteeVueForm.reset()
      this.ownersCommittee_vrisible = false
    },
    // 删除
    del (data) {
      let arr = []
      for (let i = 0; i < this.table_row.length; i++) {
        arr.push(this.table_row[i].id)
      }
      if (!arr.length) {
        this.$message.error('请选中需要删除的表格数据')
        return
      }
      this.$confirm('是否删除？删除不可找回', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$refs.table.tableDelete(arr)
      }).catch(action => { });
    },
    // 图片上传成功
    ownersImgeSuccess (res, file) {
      this.fileUrls = res.url
      this.addForm.ruleForm.fileUrls[0] = res.url
      this.editBool = false
    },
    // 图片上传之前
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
  }
}
</script>
<style>
.sys-image {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    margin-right: 12px;
}
</style>
