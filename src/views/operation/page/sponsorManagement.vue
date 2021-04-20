<template>
  <div class="main-content">
    <div class="main-titel">
      <span>主办方管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   @click="add()"
                   icon="el-icon-plus">新增主办方</el-button>
      </div>
      <!-- 查询重制 -->
      <div class="">
        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">

          <template v-slot:imgUrls="slotData">
            <div v-if="slotData.data.imgUrls.length">
              <el-button class="init-text"
                         type="text"
                         @click="getPhotoView(slotData.data.imgUrls)">
                <span>查看</span>
              </el-button>
            </div>
            <div v-else>
              -
            </div>
          </template>
          <template slot="footer">
            <div class="table-footer">
              <button @click='edit(table_row)'>修改</button>
              <button @click="del(table_row)">删除</button>
            </div>
          </template>
        </VueTable>
        <!-- 新增修改公告 -->
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
                      <el-upload :action="`${$baseUrl}upload/uploadSponsor`"
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
        <views-photo :isVisible.sync="photos_Visible"
                     :goodsImgsList="goodsImgsList"
                     @closeViews="getclose"></views-photo>
      </div>
    </div>
  </div>
</template>

<script>
import viewsPhoto from '@/components/dialog/viewsPhoto'

import { sponsorManagementInsert, sponsorManagementFindById, sponsorManagementUpdate } from '@/api/operation'

export default {
  data () {
    return {
      editID: null,
      photos_Visible: false,
      addEidtTitle: '添加主办方',
      addEidt_vrisible: false,
      table_row: [],
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '主办方单位', prop: 'sponsorUnit', width: 'atuo' },
          {
            label: '营业执照', prop: 'imgUrls', width: '180',
            type: 'slot',
            slotName: 'imgUrls',
          },
          { label: '负责人', prop: 'director', width: 'atuo' },
          { label: '联系方式', prop: 'tel', width: 'atuo' },
          { label: '证件类型', prop: 'idType', width: 'atuo' },
          { label: '证件号码', prop: 'idNumber', width: 'atuo' },
          {
            label: '主办次数', prop: 'num',
            width: 'atuo', //   typetype: 'slot',  slotName: 'table8'
          },
        ],
        table_data: [],
        url: 'sponsorManagementList',
        search_item: [
          {
            type: 'Input',
            label: '联系人',
            placeholder: '请输入内容',
            prop: 'director'
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入内容',
            prop: 'tel'
          },

          {
            type: 'Input',
            label: '证件号码',
            placeholder: '请输入内容',
            prop: 'idNumber'
          },
          {
            type: 'select',
            label: '证件类型',
            value: '',
            options: [
              { label: '身份证', value: '1' },
              { label: '学生证', value: '2' },
            ],
            placeholder: '请选择',
            prop: 'idType'
          },
          {
            type: 'Input',
            label: '主办方单位',
            placeholder: '请输入内容',
            prop: 'sponsorUnit'
          },
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
      imglist: [],
      addEidtForm: {
        ruleForm: {
          sponsorUnit: null,
          fileUrls: [],
          director: null,
          tel: null,
          idType: null,
          idNumber: null
        },
        form_item: [
          {
            type: 'Input',
            label: '主办方单位',
            placeholder: '请输入',
            width: '100%',
            prop: 'sponsorUnit',
          },

          {
            type: 'Slot',
            label: '营业执照 ',
            placeholder: '请输入',
            width: '100%',
            prop: 'fileUrls',
            slotName: 'fileUrls'
          },
          {
            type: 'Input',
            label: '负责人',
            placeholder: '请输入',
            width: '100%',
            prop: 'director',
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            width: '100%',
            prop: 'tel',
          },
          {
            type: 'Select',
            label: '证件类型',
            placeholder: '请输入',
            prop: 'idType',
            width: '100%',
            options: [
              { label: '未发布', value: 1 },
              { label: '已发布', value: 2 },
              { label: '定时发布', value: 3 },
            ],
          },
          {
            type: 'Input',
            label: '证件号码',
            placeholder: '请输入',
            width: '100%',
            prop: 'idNumber',
          },
        ]
      },
      goodsImgsList: [],
    }
  },
  components: {
    viewsPhoto
  },
  computed: {},
  methods: {
    getPhotoView (item) {
      this.photos_Visible = true
      this.goodsImgsList = item
    },
    getclose () {
      this.photos_Visible = false
    },
    add () {
      this.addEidt_vrisible = true;
    },
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

      if (!this.editID) {
        sponsorManagementInsert(this.addEidtForm.ruleForm).then((res) => {
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
        sponsorManagementUpdate(resData).then((res) => {
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
      sponsorManagementFindById({ id: this.table_row[0].id }).then(res => {
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
        this.addEidtForm.ruleForm.director = res.director
        this.addEidtForm.ruleForm.idNumber = res.idNumber
        this.addEidtForm.ruleForm.idType = res.idType
        this.addEidtForm.ruleForm.sponsorUnit = res.sponsorUnit
        this.addEidtForm.ruleForm.tel = res.tel
        this.addEidt_vrisible = true
      })
    },
    addEidtClose () {
      this.addEidt_vrisible = false
      this.editID = null
      this.imglist = []
      for (let key in this.addEidtForm.ruleForm) {
        this.addEidtForm.ruleForm[key] = null
        this.addEidtForm.ruleForm.file = []
      }
    },
    tableCheck (data) {
      this.table_row = data;
    },
    // 图片上传成功
    ImgeSuccess (res, file) {
      this.addEidtForm.ruleForm.fileUrls = [res.url]
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

    //上传限制提示
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
  }
}
</script>
