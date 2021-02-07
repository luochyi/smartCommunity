<template>

  <div class="drawer_box">
    <el-drawer title="添加房屋"
               :visible.sync="isVisibleDrawe"
               size="58%"
               :before-close="handleClose"
               :with-header="true">
      <div class="">
        <div class="">
          <div class="dra-content">
            <div class="content-titel">
              <span>基本信息</span>
            </div>
            <div class="">
              <form-datechildren :formItem="form_item"
                                 ref="formData">
                <template v-slot:f5>
                  <el-input placeholder="请输入"
                            style="width:240px"
                            size="small"
                            v-model="form_item.f5">
                    <i slot="suffix">㎡</i>
                  </el-input>
                </template>
                <template v-slot:f7>
                  <el-input placeholder="请输入"
                            size="small"
                            style="width:240px"
                            v-model="form_item.f7">
                    <i slot="suffix">㎡</i>
                  </el-input>
                </template>
              </form-datechildren>
            </div>
          </div>
          <div class="dra-content">
            <div class="content-titel">
              <span>业主关联</span>
            </div>
            <div class="">
              <form-datechildren :formItem="form_item2"
                                 ref="formData">
                <template v-slot:f3>
                  <el-input placeholder="请选择日期"
                            style="width:240px"
                            size="small"
                            v-model="form_item.f3">
                  </el-input>
                  <span style="font-size:24px; color:#444444;margin-left:10px">
                    <i class="el-icon-circle-plus-outline"></i>
                  </span>
                </template>
              </form-datechildren>
            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <button class="dra-submit el-icon-circle-check"
                    @click="onSubmit"><span>提交</span></button>
            <button class="dra-cancel"
                    @click="handleClose"><span>取消</span></button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import formDatechildren from '@/components/form/formDatechildren'
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    formDatechildren
  },
  data () {
    return {
      isVisibleDrawe: false,
      form_item: [
        {
          type: 'select',
          label: '楼栋',
          options: [
            { label: '1栋', value: '1' },
            { label: '2栋', value: '2' }
          ],
          placeholder: '请输入',
          prop: 'f1',
          width: '50%'
        },

        {
          type: 'select',
          label: '单元号',
          options: [
            { label: '一单元', value: '1' },
            { label: '二单元', value: '2' }
          ],
          placeholder: '请选择',
          prop: 'f2',
          width: '50%'
        }, {
          type: 'Input',
          label: '房屋名称',
          placeholder: '请输入',
          prop: 'f3',
          width: '50%'
        },
        {
          type: 'select',
          label: '单元号',
          options: [
            { label: '已出租', value: '1' },
            { label: '已销售', value: '2' }
          ],
          placeholder: '请选择',
          prop: 'f4',
          width: '50%'
        },
        {
          type: 'Slot',
          label: '建筑面积',
          prop: 'f5',
          slotName: 'f5',
          width: '50%'
        },
        {
          type: 'select',
          label: '房屋类型',
          options: [
            { label: '公寓', value: '1' },
            { label: '普通住宅', value: '2' }
          ],
          placeholder: '请选择',
          prop: 'f6',
          width: '50%'
        },
        {
          type: 'Slot',
          label: '室内面积',
          prop: 'f7',
          slotName: 'f7',
          width: '50%'
        },
      ],
      form_item2: [
        {
          type: 'Input',
          label: '业主姓名',
          placeholder: '请输入',
          prop: 'f1',
          width: '50%'
        },
        {
          type: 'Input',
          label: '联系方式',
          placeholder: '请输入',
          prop: 'f2',
          width: '50%'
        },
        {
          type: 'Slot',
          label: '证件类型',
          prop: 'f3',
          slotName: 'f3',
          width: '50%'
        },
        {
          type: 'Input',
          label: '证件号码',
          placeholder: '请输入',
          prop: 'f4',
          width: '50%'
        },
      ]

    }
  },
  mounted () {
  },
  methods: {
    // 提交
    onSubmit () {
      this.$emit('handleClose', 'Close')

    },
    // 重置
    // 取消关闭esc
    handleClose () {
      // this.$refs['ruleForm'].resetFields()
      this.$emit('handleClose', 'Close')
    }
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.isVisibleDrawe = newValue
      },
      immediate: true,
    }
  },
}
</script>
<style lang="scss">
.drawer_box {
    .el-drawer__header {
        span {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #333333;
        }
    }
    .el-drawer__body {
        background: #e8ebf2;
        overflow-y: auto;
        padding-bottom: 81px;
    }
    :focus {
        outline: 0;
    }

    .dra-content {
        padding-bottom: 60px;
    }
}
</style>
