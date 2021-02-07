<template>
  <div>
    <div class="drawer-box">
      <div class="dra-header">
        <span>修改</span>
      </div>
      <div class="dra-body">
        <div class="dra-content">
          <div class="content-titel">
            <span>基本信息</span>
          </div>
          <div class="">
            <el-form ref="form"
                     label-position="right"
                     :model="form"
                     label-width="100px">
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="楼栋">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="单元号">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </div>
              <div class="form-box">
                <div class="form-item">
                  <el-form-item label="房屋名称">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="房屋状态">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="车位编号">
                    <el-input v-model="form.name"
                              size="small"
                              style="width:240px"
                              placeholder="请输入">
                      <i slot="suffix"
                         style="font-style:normal"
                         class="metre">㎡</i>
                    </el-input>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="房屋类型">
                    <el-select v-model="value"
                               placeholder="请选择"
                               size="small"
                               style="width:240px">
                      <el-option v-for="item in options"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div class="form-item">
                  <el-form-item label="车位编号">
                    <el-input v-model="form.name"
                              size="small"
                              style="width:240px"
                              placeholder="请输入">
                      <i slot="suffix"
                         style="font-style:normal"
                         class="metre">㎡</i>
                    </el-input>
                  </el-form-item>
                </div>
                <div class="form-item">
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div class="dra-content"
             v-for="(item) in dynamicValidateForm.froms"
             :key="item.key">

          <contentBox>
            <span slot="title">业主关联</span>
            <span slot="btn">
              <el-button type="text"
                         @click='del(item.addForm)'><span style="color:#fb4702">取消</span></el-button>
            </span>
            <div class="">
              <Form ref="childFrom"
                    :formObj='item.addForm'></Form>
            </div>
          </contentBox>
        </div>
        <div style="display:flex;justify-content: center;">
          <el-button @click="addForms()"
                     type="text"><span style="color:#fb4702">添加</span></el-button>
        </div>
      </div>
      <div class="dra-footer">
        <div class="dra-footer-content">
          <button class="btn-orange "><span><span><i class="el-icon-circle-check"></i></span> 提交</span></button>
          <button class="dra-cancel"><span>取消</span></button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { UnitEstateFindById, Login } from '@/api/basic'
export default {
  data () {
    return {
      dynamicValidateForm: {
        froms: [{
          addForm: {
            ruleForm: {
              no: null,
              name: null,
              totalFloor: null
            },
            rules: {
              name: [
                {
                  required: true,
                  message: '请填写业主姓名',
                  trigger: 'blur'
                }
              ],
              no: [
                { required: true, message: '请填写楼栋名称', trigger: 'blur' }
              ],
            },
            form_item: [
              {
                type: 'Int',
                label: '业主姓名',
                placeholder: '请输入',
                width: '50%',
                prop: 'name'
              },
              {
                type: 'Input',
                label: '联系方式',
                placeholder: '请输入',
                width: '50%',
                prop: 'tel'
              },
              {
                type: 'Select',
                label: '证件类型',
                placeholder: '请输入',
                options: [
                  { value: 1, label: '身份证' },
                  { value: 2, label: '营业执照' },

                ],
                width: '50%',
                prop: 'stuats'
              },
              {
                type: 'Input',
                label: '证件号码',
                placeholder: '请输入',
                width: '50%',
                prop: 'nameID'
              }
            ]
          },
        }],
        key: '1'
      },
      form: {
        name: '123',
        region: '12',
        date1: '3',
        date2: '11',
        delivery: false,
        type: [],
        resource: '2',
        desc: ''
      },
      options: [{
        value: '选项1',
        label: '黄金糕'
      },
      {
        value: '选项2',
        label: '双皮奶'
      },
      {
        value: '选项3',
        label: '蚵仔煎'
      },
      {
        value: '选项4',
        label: '龙须面'
      },
      {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    del (item) {

      let index = this.dynamicValidateForm.froms.indexOf(item)
      if (index !== -1) {
        this.froms.splice(index, 1)
      }
    },
    addForms () {
      let that = this
      this.dynamicValidateForm.froms.push({
        addForm: that.dynamicValidateForm.froms[0].addForm,
        key: Date.now()
      })
      console.log(this.dynamicValidateForm)
    },
    getData () {
      let requestData = {
        id: 1,
      }
      UnitEstateFindById(requestData)
        .then((res) => {
          console.log(res)
        }).catch((error) => {
          console.log(error)
        })
    },
  }
}
</script>
<style lang="scss" scoped>
.content-titel.btn {
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>