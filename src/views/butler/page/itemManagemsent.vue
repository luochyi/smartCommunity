<template>
  <div class="main-content">
    <div class="main-titel">
      <span>物品管理</span>
    </div>
    <div class="content">
      <div class="content-btn">
        <el-button class="init-button"
                   icon="el-icon-plus"
                   @click="addGoods">添加物品</el-button>
      </div>
      <div class="">

        <VueTable ref="table"
                  :config='config'
                  @tableCheck="tableCheck">
          <!-- <template slot="tabs">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
              <el-tab-pane label="全部"
                           name="0"></el-tab-pane>
              <el-tab-pane label="正常"
                           name="1"></el-tab-pane>
              <el-tab-pane label="破损"
                           name="2"></el-tab-pane>
            </el-tabs>
          </template> -->
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
              <button @click='editGoods(table_row)'>编辑</button>
              <button @click="del(table_row)">删除</button>
              <!-- <button>打印二维码</button> -->
            </div>
          </template>
        </VueTable>
      </div>

      <Drawer :drawerTitle="addEidtTitle"
              @drawerClose="addEidtClose"
              :drawerVrisible='addEidt_vrisible'>
        <div style="padding:30px">
          <FromCard>
            <template slot="title">基本信息</template>
            <template>
              <VueForm ref="addEidtFrom"
                       @ruleSuccess='addEidtSuccess'
                       :formObj='addEidtForm'>
                <template slot='fileUrls'>
                  <template>
                    <el-upload :action="`${$baseUrl}upload/uploadArticle`"
                               :on-success="voteImgeSuccess"
                               :show-file-list="false"
                               :before-upload="beforeAvatarUpload">
                      <div class='sys-image'
                           style='width:104px; height:104px'>
                        <div v-if="!fileUrls">
                          <i class="el-icon-plus"></i>
                          <p>上传照片</p>
                        </div>
                        <!-- editBool -->
                        <div v-else>
                          <el-image v-if="!editBool"
                                    :src="`${$ImgUrl}/temp${fileUrls}`"
                                    style="width: 104px; height: 104px"></el-image>
                          <el-image v-else
                                    :src="`${$ImgUrl}${fileUrls}`"
                                    style="width: 104px; height: 104px"></el-image>
                        </div>

                      </div>
                    </el-upload>
                  </template>

                </template>
                <template slot='quantity'>
                  <el-input-number v-model="addEidtForm.ruleForm.quantity"
                                   controls-position="right"
                                   :min="1"
                                   :max="99"></el-input-number>
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
    <views-photo :isVisible="photos_Visible"
                 :goodsImgsList="goodsImgsList"
                 @closeViews="getclose"></views-photo>
  </div>
</template>
<script>
import viewsPhoto from '@/components/dialog/viewsPhoto'
import { articleFindById } from '@/api/butler'
export default {
    data() {
        return {
            // 选中表格数据
            table_row: [],
            editBool: false, //是否为编辑
            fileUrls: '',
            config: {
                thead: [
                    { label: '序号', type: 'index', width: '80' },
                    { label: '物品名称', prop: 'name', width: 'auto' },
                    {
                        label: '照片',
                        prop: 'imgUrls',
                        width: 'auto',
                        type: 'slot',
                        slotName: 'imgUrls'
                    },
                    /**
           *
           *  prop: 'goodsImgUrls',
            width: '180',
            type: 'slot',
            slotName: 'goodsImgUrls',
           * */
                    { label: '数量', prop: 'quantity', width: 'auto' },
                    { label: '库存', prop: 'stock', width: 'auto' }
                    // { label: '物品状态', prop: 'status', width: 'auto' },
                ],
                table_data: [],
                url: 'articleList',
                search_item: [
                    {
                        type: 'Input',
                        label: '物品名称',
                        placeholder: '请输入',
                        prop: 'name'
                    }
                ],
                data: {
                    pageNum: 1,
                    size: 10
                }
            },
            addEidt_vrisible: false,
            addEidtForm: {
                ruleForm: {
                    name: null,
                    fileUrls: [],
                    quantity: null,
                    articleDetailList: null
                },
                form_item: [
                    {
                        type: 'Input',
                        label: '物品名称',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'name'
                    },
                    {
                        type: 'Slot',
                        label: '照片',
                        width: '100%',
                        prop: 'fileUrls',
                        slotName: 'fileUrls'
                    },
                    {
                        type: 'Slot',
                        label: '数量',
                        placeholder: '请输入',
                        width: '100%',
                        prop: 'quantity',
                        slotName: 'quantity'
                    }
                ],
                rules: {
                    name: [
                        {
                            required: true,
                            message: '请输入物品名称',
                            trigger: 'blur'
                        }
                    ],
                    // fileUrls: [
                    //     {
                    //         required: true,
                    //         message: '请上传图片',
                    //         trigger: 'change'
                    //     }
                    // ],
                    quantity: [
                        {
                            required: true,
                            message: '请输入数量',
                            trigger: 'change'
                        }
                    ]
                }
            },
            addEidtTitle: '',
            goodsImgsList: [],
            photos_Visible: false
        }
    },
    components: {
        viewsPhoto
    },
    methods: {
        // 添加物品
        addGoods() {
            this.addEidtTitle = '添加物品'
            this.addEidt_vrisible = true
        },
        // 编辑
        editGoods(data) {
            if (data.length > 1) {
                this.$message.error('只能查看一条数据的详情')
                return
            }
            if (!data.length) {
                this.$message.error('请选择')
                return
            }

            articleFindById({ id: data[0].id }).then((result) => {
                console.log(result)
            })
        },
        // vueForm 验证通过提交服务器
        addEidtSuccess() {},
        // vueForm 验证提交
        addEidtSubmit() {
            this.$refs.addEidtFrom.submitForm()
        },
        addEidtClose() {
            this.addEidt_vrisible = false
            this.fileUrls = ''
            this.$refs.addEidtFrom.reset()
            this.addEidtForm.ruleForm.fileUrls = []
        },
        // 查看图片
        getPhotoView(item) {
            this.photos_Visible = true
            this.goodsImgsList = item
        },
        // 关闭查看图片
        getclose() {
            this.photos_Visible = false
        },
        tableCheck(data) {
            this.table_row = data
        },
        onSubmit() {},
        // 删除
        del(data) {
            let arr = []
            for (let i = 0; i < this.table_row.length; i++) {
                arr.push(this.table_row[i].id)
            }
            this.$confirm('暂无', '删除', {
                confirmButtonText: '确定',
                // showCancelButton: false
                cancelButtonText: '取消'
                // confirmButtonClass: 'confirmButton',
                // cancelButtonClass: 'cancelButton'
            })
                .then(() => {})
                .catch((action) => {})
        },
        // 上传照片
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
        // 图片上传成功
        voteImgeSuccess(res, file) {
            this.fileUrls = res.url
            this.editBool = false
            // this.$set(this.reportRepairFrom.ruleForm.fileUrls)
            this.addEidtForm.ruleForm.fileUrls[0] = res.url
        }
        // 状态切换
        // handleClick (tab, event) {
        //   let status = null
        //   if (this.activeName != 0) {
        //     status = this.activeName
        //   } else {
        //     status = null
        //   }
        //   const requestData = {
        //     pageNum: 1,
        //     size: 10,
        //     status: status
        //   }
        //   this.$refs.table.requestData(requestData);
        // },
    }
}
</script>
<style scoped>
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
