<template>
  <div>
    <div class="main-content">
      <div class="main-titel">
        <span>绿化区域</span>
      </div>
      <div class="content">
        <div class="content-btn">
          <el-button class="init-button"
                     @click="add()"
                     icon="el-icon-plus">新增区域</el-button>
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
                <el-tab-pane label="使用中"
                             name="1"></el-tab-pane>
                <el-tab-pane label="空置中"
                             name="2"></el-tab-pane>
                <el-tab-pane label="停用"
                             name="3"></el-tab-pane>
              </el-tabs>
            </template> -->
            <template slot="footer">
              <div class="table-footer">
                <button @click="detail(table_row)">编辑</button>
                <button @click="del(table_row)">删除</button>

              </div>
            </template>
          </VueTable>
        </div>
        <!-- 新增 -->
        <Drawer drawerTitle="新增区域"
                @drawerClose="addClose"
                :drawerVrisible='add_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">区域信息</template>
              <template>
                <VueForm ref="addForm"
                         :formObj='addForm'>
                  <!-- Slot -->
                  <template v-slot:date>
                    <el-time-picker is-range
                                    v-model="addDate"
                                    range-separator="至"
                                    @change='dateTimeChange'
                                    value-format='HH:MM:SS'
                                    start-placeholder="开始时间"
                                    end-placeholder="结束时间"
                                    placeholder="选择时间范围">
                    </el-time-picker>
                  </template>
                  <template slot='imgUrls'>
                    <template>
                      <el-upload :action="`${$baseUrl}upload/uploadAnnouncement`"
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
                    @click="addSubmit()"><span> <i class="el-icon-circle-check"></i>提交</span></button>
            <button class="btn-gray"
                    @click="addClose"><span>取消</span></button>
          </div>
        </Drawer>
         <!-- detail -->
      <Drawer drawerTitle="编辑区域"
                @drawerClose="detailClose"
                :drawerVrisible='detail_vrisible'>
          <div style="padding:30px">
            <FromCard>
              <template slot="title">区域信息</template>
              <template>
                <VueForm ref="detailForm"
                         :formObj='detailForm'>
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
import { greenAreaInsert,greenAreaFindById,greenAreaUpdate} from '@/api/daily'
export default {
  data () {
    return {
      add_vrisible: false,detail_vrisible: false,
      addDate: null,
      addForm: {
        ruleForm: {
          name: null,
        },
        form_item: [
          {
            type: 'Input',
            label: '区域名称',
            placeholder: '请输入',
            width: '100%',
            prop: 'name'
          },
        //   {
        //     type: 'Input',
        //     label: '类型编号',
        //     placeholder: '请输入',
        //     width: '100%',
        //     disabled: true,
        //     prop: 'code'
        //   },
        //   {
        //     type: 'Slot',
        //     label: '图片上传',
        //     placeholder: '请输入',
        //     width: '100%',
        //     prop: 'imgUrls',
        //     slotName: 'imgUrls'
        //   }
        //   ,
        //   {
        //     type: 'Slot',
        //     label: '开放时间',
        //     placeholder: '请输入',
        //     width: '100%',
        //     prop: 'date',
        //     slotName: 'date'
        //   },

        ]
      },
      detailForm: {
        ruleForm: {
          name: null,
        },
        form_item: [
          {
            type: 'Input',
            label: '区域名称',
            placeholder: '请输入',
            width: '100%',
            prop: 'name'
          },
        ]
      },
      table_row: [],
      // 上传img文件
      imglist: [],
      // activeName: '0',
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '区域名称', prop: 'name', width: 'auto' },
          { label: '创建人名称', prop: 'createName', width: 'auto' },
          { label: '创建时间', prop: 'createDate', width: 'auto' },
        ],
        table_data: [],
        url: 'greenAreaList',
        search_item: [

          {
            type: 'Input',
            label: '区域名称',
            placeholder: '请选择',
            prop: 'name',
          },
          {
            type: 'Input',
            label: '创建人名称',
            placeholder: '请输入',
            prop: 'createName',
          },
          {
            type: 'picker',
            label: '发布时间',
            placeholder: '请输入',
            prop: 'date',
            startDate: 'createDateStart',
            endDate: 'createDateEnd',
            width: '280px',
          },
          // Slot
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      }
    }
  },
  methods: {
    add () {
      this.add_vrisible = true
      let random = Math.floor(Math.random()*100000000)
      this.addForm.ruleForm.code = random
    },
    addClose () {
      this.$refs.addForm.reset()
      this.add_vrisible = false
    },
    addSubmit () {
      // this.add_vrisible = false
      /**
       * 
       *  code	       :null, 设施分类编号	是	[string]		
        2	name	       :null,   设施分类名称	是	[string]		
        3	openStartDate:null,	      开放开始时间	是	[datetime]	"3:41:44"	查看
        4	openEndDate	 :null,     开放结束时间	是	[datetime]	"21:41:44"	查看
        5	imgUrls:null,
       * 
       * **/
      let resData = {
        ...this.addForm.ruleForm
        // code: this.addForm.ruleForm.code,
        // name: this.addForm.ruleForm.name,
        // openStartDate: this.openStartDate,
        // openEndDate:  this.openEndDate,
        // imgUrls:this.addForm.ruleForm.imgUrls,
      }
      greenAreaInsert(resData).then(res => {
        if (res.status) {
          this.$message({
            message: res.message,
            type: 'success'
          })
          this.$refs.table.loadData()
          this.addClose()
        }
      })
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
                greenAreaFindById({ id: data[0].id }).then((res) => {
                    console.log(res.data)
                    this.detailForm.ruleForm.name = res.data.name
                })
                // this.detailForm.ruleForm
            }
        },
        detailClose() {
            this.$refs.detailForm.reset()
            this.detail_vrisible = false
        },
        detailSubmit() {
            let resData = {
                ...this.detailForm.ruleForm,
                id: this.detailForm.ruleForm.id
                // code: this.addForm.ruleForm.code,
                // name: this.addForm.ruleForm.name,
                // openStartDate: this.openStartDate,
                // openEndDate:  this.openEndDate,
                // imgUrls:this.addForm.ruleForm.imgUrls,
            }
            greenAreaUpdate(resData).then((res) => {
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
    dateTimeChange (arr) {
      this.addForm.ruleForm.openStartDate = arr[0]
      this.addForm.ruleForm.openEndDate = arr[1]
    },
    // 图片上传成功
    ImgeSuccess (res, file) {
      this.addForm.ruleForm.imgUrls[0] = file.response.url
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
    //  上传限制提示
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // // tabs切换
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

    // 表格选中
    tableCheck (data) {
      this.table_row = data;
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
  }
}
</script>
