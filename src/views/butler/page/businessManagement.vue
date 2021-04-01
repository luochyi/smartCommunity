
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>业委会管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus"
                   @click="addOwnersCommittee">新增成员</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <template slot="footer">
            <div class="table-footer">
              <button @click='edit(table_row)'>编辑</button>
              <button @click="del(table_row)">删除</button>

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
                     :formObj='ownersCommitteeForm'>
              <template slot='fileUrls'>
                <template>
                  <el-upload :action="`${$baseUrl}upload/uploadOwnersCommittee`"
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
                <el-select v-model="ownersCommitteeForm.ruleForm.residentId"
                           :disabled="editId?true:false"
                           :remote-method='remoteMethod'
                           @focus='focus'
                           :loading="loading"
                           remote
                           style="width:240px"
                           filterable
                           placeholder="请选择">
                  <el-option v-for="item in options"
                             :key="item.id"
                             :label="item.name"
                             :value="item.id">
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
import { ownersCommitteeInsert, ownersCommitteeUpdate, ownersCommitteeFindById } from '@/api/butler'
import { userResident, userResidentFindResidentNameBySearch } from '@/api/basic'
export default {
  data () {
    return {
      options: [],
      loading: false,
      // 业委会标题 业委会显示隐藏
      ownersCommitteeTitle: '',
      ownersCommittee_vrisible: false,
      editBool: false,
      estateOption: [],
      estateLoading: false,
      editId: 0,
      // 选中表格数据
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '职位', prop: 'positionId', width: 'auto' },
          { label: '姓名', prop: 'name', width: 'auto' },
          { label: '性别', prop: 'sexId', width: 'auto' },
          { label: '年龄', prop: 'age', width: 'auto' },
          { label: '学历', prop: 'educationId', width: 'auto' },
          { label: '房屋信息', prop: 'roomName', width: 'auto' },
          { label: '职业', prop: 'profession', width: 'auto' },
        ],
        table_data: [],
        url: 'ownersCommitteeList',
        search_item: [
          {
            type: 'select',
            label: '职位',
            placeholder: '请输入',
            prop: 'positionId',
            value: '',
            options: [
              { value: 1, label: '业委会主任' },
              { value: 2, label: '业委会副主任' },
              { value: 3, label: '业委会委员' },
            ]
          },
          {
            type: 'Input',
            label: '姓名',
            placeholder: '请输入',
            prop: 'name',
          },
          {
            type: 'select',
            label: '学历',
            placeholder: '请选择',
            prop: 'educationId',
            options: [
              { value: 1, label: '专科' },
              { value: 2, label: '本科' },
              { value: 3, label: '硕士' },
              { value: 4, label: '博士' },
            ]
          },
          {
            type: 'select',
            label: '性别',
            placeholder: '请选择',
            prop: 'sexId',
            value: '',
            options: [
              { value: '1', label: '男' },
              { value: '2', label: '女' }
            ]
          },
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '请输入',
            prop: 'roomName'
          },
          {
            type: 'Input',
            label: '职业',
            placeholder: '请输入',
            prop: 'profession'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      fileUrls: '',
      ownersCommitteeForm: {
        ruleForm: {
          residentId: null,
          positionId: null,
          age: null,
          educationId: null,
          estateId: null,
          profession: null,

          // sex: null,
          fileUrls: []
        },
        form_item: [
          { type: 'Slot', label: '姓名', placeholder: '请输入姓名', width: '50%', prop: 'residentId', slotName: 'residentId' },
          {
            type: 'Select', label: '职位', placeholder: '请选择职位', width: '50%', prop: 'positionId',
            options: [
              { value: 1, label: '业委会主任' },
              { value: 2, label: '业委会副主任' },
              { value: 3, label: '业委会委员' }
            ]
          },
          // { type: 'Select', label: '性别', placeholder: '请选择性别', options: [], width: '50%', prop: 'sex' },
          {
            type: 'Input', label: '年龄', placeholder: '请输入年龄', width: '50%', prop: 'age',
          },
          {
            type: 'Select', label: '学历', placeholder: '请选择学历', width: '50%', prop: 'educationId',
            options: [
              { value: 1, label: '专科' },
              { value: 2, label: '本科' },
              { value: 3, label: '硕士' },
              { value: 4, label: '博士' }
            ]
          },
          { type: 'Input', label: '房屋信息', placeholder: '请输入房屋信息', width: '50%', prop: 'estateId' },
          {
            type: 'Input', label: '职业', placeholder: '请输入职业', width: '50%', prop: 'profession'
          },
          { type: 'Slot', label: '图片上传', width: '100%', prop: 'fileUrls', slotName: 'fileUrls' },
        ],
        rules: {
          residentId: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
          positionId: [{ required: true, message: '请选择职位', trigger: 'change' }],
          sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
          age: [{ required: true, message: '请输入工单名称', trigger: 'blur' }],
          educationId: [{ required: true, message: '请选择学历', trigger: 'change' }],
          estateId: [{ required: true, message: '请输入房屋信息', trigger: 'blur' }],
          profession: [{ required: true, message: '请选择职业', trigger: 'blur' }],
          fileUrls: [{ required: true, message: '请上传图片', trigger: 'change' }],
        }
      },
    }
  },
  methods: {
    // 添加业主
    remoteMethod (val) {
      let reeData = {
        pageNum: 1,
        size: 20,
        name: val
      }
      this.loading = true
      userResidentFindResidentNameBySearch(reeData).then(res => {
        this.estateOption = res.tableList
        this.estateLoading = false
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
    change (value) {
      console.log(value)
    },
    tableCheck (data) {
      this.table_row = data;
    },
    // 添加成员 弹窗显示
    addOwnersCommittee () {
      this.ownersCommitteeTitle = ' 添加成员'
      this.ownersCommittee_vrisible = true;
    },
    // 图片上传成功
    ownersImgeSuccess (res, file) {
      this.fileUrls = res.url
      this.ownersCommitteeForm.ruleForm.fileUrls[0] = res.url
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
    // 修改 弹窗显示
    edit (data) {
      if (data.length) {
        if (data.length > 1) {
          this.$message.error('不能批量编辑');
          return
        }
        this.ownersCommitteeTitle = ' 修改成员'
        this.ownersCommittee_vrisible = true;
        let resData = {
          id: data[0].id
        }
        ownersCommitteeFindById(resData).then(result => {
          console.log(result)
          this.editBool = true;
          this.editId = result.id
          this.ownersCommitteeForm.ruleForm.residentId = result.name
          this.ownersCommitteeForm.ruleForm.positionId = result.positionId
          this.ownersCommitteeForm.ruleForm.age = result.age
          this.ownersCommitteeForm.ruleForm.educationId = result.educationId
          this.ownersCommitteeForm.ruleForm.estateId = result.estateId
          this.ownersCommitteeForm.ruleForm.profession = result.profession
          this.ownersCommitteeForm.ruleForm.fileUrls[0] = result.imgUrls[0].url
          this.fileUrls = result.imgUrls[0].url
        })
      } else {
        this.$message.error('请选择需要编辑的数据');
      }

    },
    //  弹窗关闭显示
    ownersCommitteeClose () {
      this.ownersCommittee_vrisible = false;
      this.fileUrls = ''
      this.editId = 0
      this.$refs.ownersCommitteeVueForm.reset()
    },
    // 添加修改弹窗提交验证通过
    ownersCommitteeRuleSubmit () {

      if (!this.editId) {
        let resData = {
          residentId: this.ownersCommitteeForm.ruleForm.residentId,
          positionId: this.ownersCommitteeForm.ruleForm.positionId,
          age: this.ownersCommitteeForm.ruleForm.age,
          educationId: this.ownersCommitteeForm.ruleForm.educationId,
          estateId: this.ownersCommitteeForm.ruleForm.estateId,
          profession: this.ownersCommitteeForm.ruleForm.profession,
          fileUrls: this.ownersCommitteeForm.ruleForm.fileUrls,
        }
        console.log(resData)
        ownersCommitteeInsert(resData).then(res => {
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
        let resData = {
          id: this.editId,
          positionId: this.ownersCommitteeForm.ruleForm.positionId,
          age: this.ownersCommitteeForm.ruleForm.age,
          educationId: this.ownersCommitteeForm.ruleForm.educationId,
          estateId: this.ownersCommitteeForm.ruleForm.estateId,
          profession: this.ownersCommitteeForm.ruleForm.profession,
          fileUrls: this.ownersCommitteeForm.ruleForm.fileUrls,
        }
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
