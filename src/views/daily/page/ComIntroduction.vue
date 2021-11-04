<template>
  <div>
    <div class="main-content">
      <div class="main-titel">
        <span>住房说明</span>
      </div>
      <div class="content">
        <div class="content-btn">
          <el-button class="init-button"
                     @click="add()"
                     icon="el-icon-plus">新增说明</el-button>
                     
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
                <el-tab-pane label="未发布"
                             name="1"></el-tab-pane>
                <el-tab-pane label="已发布"
                             name="2"></el-tab-pane>
              </el-tabs>
            </template>
            <template slot="footer">
              <div class="table-footer">
                <button @click="detail(table_row)">编辑</button>
                <button @click="lease(table_row)" v-if="activeName !== '2'">发布</button>
                <button @click="lease2(table_row)" v-else>取消发布</button>
                <button @click="del(table_row)">删除</button>
              </div>
            </template>
          </VueTable>
        </div>
        <!-- 新增 -->
        <Drawer drawerTitle="新增包裹"
                @drawerClose="addClose"
                :drawerVrisible='add_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">基本信息</template>
              <template>
                <VueForm ref="addForm"
                         :formObj='addForm'
                         @ruleSuccess="addRuleSuccess">
                  <!-- Slot -->
                  <template slot="fileUrls">
                      <template>
                          <el-upload
                          :action="`${$baseUrl}upload/uploadHouseTypeDescriptionImg`"
                          :on-success="ImgeSuccess"
                          :file-list="imglist"
                          ref="myUpload1"
                          :on-exceed="handleExceed"
                          :limit="10"
                          accept=".jpg,.png,.JPG,.PNG"
                          :before-upload="beforeAvatarUpload">
                            <el-button
                            icon="el-icon-edit"
                            size="small"
                            >上传图片</el-button>
                                <div
                                slot="tip"
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
                    @click="addSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
            <button class="btn-gray"
                    @click="addClose"><span>取消</span></button>
          </div>
        </Drawer>
        <!-- detail -->
        <Drawer drawerTitle="编辑包裹"
                @drawerClose="detailClose"
                :drawerVrisible='detail_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">基本信息</template>
              <template>
                <VueForm ref="detailForm"
                         :formObj='detailForm'
                         @ruleSuccess="detailRuleSuccess">
                  <!-- Slot -->
                  <template slot="fileUrls">
                      <template>
                          <el-upload
                          :action="`${$baseUrl}upload/uploadHouseTypeDescriptionImg`"
                          :on-success="ImgeSuccess"
                          :file-list="imglist"
                          :on-remove="handleChange"
                          :on-change="handleChange2"
                          ref="myUpload1"
                          :on-exceed="handleExceed"
                          :limit="10"
                          accept=".jpg,.png,.JPG,.PNG"
                          :before-upload="beforeAvatarUpload">
                            <el-button
                            icon="el-icon-edit"
                            size="small"
                            >上传图片</el-button>
                                <div
                                slot="tip"
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
                    @click="detailSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
            <button class="btn-gray"
                    @click="detailClose"><span>取消</span></button>
          </div>
        </Drawer>
      </div>
    </div>
  </div>
</template>

<script>
import {
    houseTypeDescriptionInsert,
    houseTypeDescriptionUpdate,
    houseTypeDescriptionFindById,
    houseTypeDescriptionRelease,
    houseTypeDescriptionCancelRelease
} from '@/api/daily'
export default {
    data() {
        return {
            add_vrisible: false,
            detail_vrisible: false,
            addDate: null,
            addForm: {
                ruleForm: {
                    name: null,
                    content: null,
                    status: null,
                    fileUrls: []
                },
                rules:{
                    name: [
                    { required: true, message: '请输入', trigger: 'change' }
                    ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '户型名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'textarea',
                        label: '户型内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                    {
                        type: 'Select',
                        label: '发布状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options: [
                            {
                                label: '未发布',
                                value: 1
                            },
                            {
                                label: '已发布',
                                value: 2
                            }
                        ]
                    },
                    {
                        type: 'Slot',
                        label: '图片上传',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'fileUrls',
                        slotName: 'fileUrls'
                    }
                ]
            },
            detailForm: {
                ruleForm: {
                    id: null,
                    name: null,
                    content: null,
                    status: null,
                    fileUrls: []
                },
                rules:{
                    name: [
                    { required: true, message: '请输入', trigger: 'change' }
                    ]
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '户型名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'textarea',
                        label: '户型内容',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'content'
                    },
                    {
                        type: 'Select',
                        label: '发布状态',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'status',
                        options: [
                            {
                                label: '未发布',
                                value: 1
                            },
                            {
                                label: '已发布',
                                value: 2
                            }
                        ]
                    },
                    {
                        type: 'Slot',
                        label: '图片上传',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'fileUrls',
                        slotName: 'fileUrls'
                    }
                ]
            },
            table_row: [],
            // 上传img文件
            imglist: [],
            activeName: '0',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '户型名称', prop: 'name', width: 'auto' },
                    { label: '户型内容', prop: 'content', width: 'auto' },
                    {
                        label: '发布状态',
                        prop: 'status',
                        width: 'auto',
                        type: 'function',
                        callback(row, prop) {
                            switch (row.status) {
                                case 1:
                                    return '未发布'
                                    break
                                case 2:
                                    return '已发布'
                                    break
                            }
                        }
                    },
                    { label: '创建人', prop: 'createName', width: 'auto' },
                    { label: '发布时间', prop: 'releaseDate', width: 'auto' }
                ],
                table_data: [],
                url: 'houseTypeDescriptionList',
                search_item: [
                    {
                        type: 'Input',
                        label: '户型名称',
                        placeholder: '请输入',
                        prop: 'name'
                    },
                    {
                        type: 'Input',
                        label: '创建人',
                        placeholder: '请输入',
                        prop: 'createName'
                    },
                    {
                        type: 'picker',
                        label: '发布时间',
                        placeholder: '请输入',
                        prop: 'date',
                        startDate: 'releaseDateStart',
                        endDate: 'releaseDateEnd',
                        width: '350px'
                    }
                    // Slot
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            }
        }
    },
    methods: {
        handleChange(file, fileList) {
            // this.fileList = fileList.slice(-3);
            // console.log(file)
            // this.imglist = fileList
            if (file.url === undefined){
                console.log(file.response.url)
                let arr = []
                this.detailForm.ruleForm.fileUrls.forEach(el => {
                    if (el !== file.response.url){
                    arr.push(el)
                    }
                })
            this.detailForm.ruleForm.fileUrls = arr
            }else{
                console.log(file.url)
                let arr = []
                this.detailForm.ruleForm.fileUrls.forEach(el => {
                    if (el !== file.url){
                    arr.push(el)
                    }
                })
            this.detailForm.ruleForm.fileUrls = arr
            }
            // console.log(fileList)
        },
        handleChange2(file, fileList) {
            // this.fileList = fileList.slice(-3);
            // console.log(file)
            // console.log(fileList)
            // let obj = {
            //     name: file.name,
            //     status: file.status,
            //     uid: file.uid,
            //     url: file.response.url
            // }
            // this.imglist.push(obj)
            // console.log(fileList)
        },
        add() {
            this.add_vrisible = true
            this.addForm.ruleForm.fileUrls = []
            this.imglist = []
        },
        addClose() {
            this.$refs.addForm.reset()
            this.add_vrisible = false
        },
        addRuleSuccess() {
            let resData = {
                ...this.addForm.ruleForm
            }
            // console.log('resData')
            // console.log(resData)
            houseTypeDescriptionInsert(resData).then((res) => {
            if (res.status) {
              this.$message({
                message: res.message,
                type: 'success'
              })
              console.log(resData)
              this.$refs.table.loadData()
              this.addClose()
            }
          })
        },
        addSubmit() {
            this.$refs.addForm.submitForm()
        },
        detail(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能编辑一条数据',
                    type: 'error'
                })
            } else {
                this.detail_vrisible = true
                console.log(data[0].id)
                this.detailForm.ruleForm.id = data[0].id
                this.imglist = []
                houseTypeDescriptionFindById({ id: data[0].id }).then((res) => {
                    // console.log(res.data)
                    if (res.data.imgUrls.length) {
                          res.data.imgUrls.forEach(element => {
                              let obj = {
                                name: element.url,
                                url: element.url
                            }
                            this.imglist.push(obj)
                            this.detailForm.ruleForm.fileUrls.push(element.url)
                            // this.detailForm.ruleForm.fileUrls = this.imglist
                          });
                        } else {
                            this.detailForm.ruleForm.fileUrls = []
                        }
                    this.detailForm.ruleForm.name = res.data.name
                    this.detailForm.ruleForm.content = res.data.content
                    this.detailForm.ruleForm.status = res.data.status
                    // this.detailForm.ruleForm.fileUrls = res.data.imgUrls
                    // this.imglist = res.data.imgUrls
                    // this.detailForm.ruleForm.fileUrls = []
                    // this.imglist = []
                    // for (let index = 0; index < res.data.imgUrls.length; index++) {
                    //     this.detailForm.ruleForm.fileUrls.push(res.data.imgUrls[index].url)
                    //     this.imglist.push(res.data.imgUrls[index].url)
                    // }
                })
                // this.detailForm.ruleForm
            }
        },
        detailClose() {
            this.$refs.detailForm.reset()
            this.detail_vrisible = false
        },
        detailRuleSuccess() {
            // console.log(this.imglist)
            // this.detailForm.ruleForm.fileUrls = []
            // console.log('提交前验证')
            // this.detailForm.ruleForm.fileUrls.forEach(el => {
            //     console.log(el)
            // })
            // this.imglist.forEach(el => {
            //     this.detailForm.ruleForm.fileUrls.push(el.url)
            // })
            let resData = {
                ...this.detailForm.ruleForm,
                id: this.detailForm.ruleForm.id
            }
            houseTypeDescriptionUpdate(resData).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                    this.detailClose()
                }
            })
        },
        detailSubmit() {
            this.$refs.detailForm.submitForm()
        },
        dateTimeChange(arr) {
            this.addForm.ruleForm.openStartDate = arr[0]
            this.addForm.ruleForm.openEndDate = arr[1]
        },
        // tabs切换
        handleClick(tab, event) {
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
            this.$refs.table.requestData(requestData)
        },
        // 表格选中
        tableCheck(data) {
            this.table_row = data
        },
        // 删除
        del(data) {
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
                })
                    .then(() => {
                        this.$refs.table.tableDelete(arr)
                    })
                    .catch((action) => {})
            } else {
                this.$message.error('请选中需要删除的数据')
            }
        },
        //发布
        lease(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能编辑一条数据',
                    type: 'error'
                })
            } else {
                houseTypeDescriptionRelease({id: data[0].id}).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                }
            })
            }
        },
        //发布
        lease2(data) {
            if (data.length != 1) {
                this.$message({
                    message: '只能编辑一条数据',
                    type: 'error'
                })
            } else {
                houseTypeDescriptionCancelRelease({id: data[0].id}).then((res) => {
                if (res.status) {
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                    this.$refs.table.loadData()
                }
            })
            }
        },
        // 图片上传成功
        ImgeSuccess(res, file) {
            this.addForm.ruleForm.fileUrls.push(file.response.url)
            this.detailForm.ruleForm.fileUrls.push(file.response.url)
        },
        // 图片文件上传之前
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 2
            const isJPG = file.type === 'image/png'
            const isPNG = file.type === 'image/jpeg'
            if (!isJPG && !isPNG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return (isJPG || isPNG) && isLt2M
        },
        //  上传限制提示
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 10 个文件，本次选择了 ${
                    files.length
                } 个文件，共选择了 ${files.length + fileList.length} 个文件`
            )
        }
    }
}
</script>
