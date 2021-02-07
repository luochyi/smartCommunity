<template>

  <div class="drawer_box">
    <el-drawer title="添加车辆"
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
                <template v-slot:f7>
                  <el-select v-model="form_item.f7"
                             size="small"
                             style="width:108px;margin-right:10px"
                             placeholder="幢">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"
                               :disabled="item.disabled">
                    </el-option>
                  </el-select>
                  <el-select v-model="form_item.f7"
                             size="small"
                             style="width:108px;margin-right:10px"
                             placeholder="单元号">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"
                               :disabled="item.disabled">
                    </el-option>
                  </el-select>
                  <el-select v-model="form_item.f7"
                             size="small"
                             style="width:108px;margin-right:10px"
                             placeholder="房间号">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value"
                               :disabled="item.disabled">
                    </el-option>
                  </el-select>
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
      options: [],
      form_item: [
        {
          type: 'Input',
          label: '车牌号',
          placeholder: '请输入',
          prop: 'f1',
          width: '50%'
        },
        {
          type: 'Input',
          label: '车位号',
          placeholder: '请输入',
          prop: 'f2',
          width: '50%'
        }, {
          type: 'Input',
          label: '所属人',
          placeholder: '请输入',
          prop: 'f3',
          width: '50%'
        }, {
          type: 'Input',
          label: '手机号',
          placeholder: '请输入',
          prop: 'f4',
          width: '50%'
        },

        {
          type: 'select',
          label: '证件类型',
          options: [
            { label: '身份证', value: '1' },
            { label: '银行卡', value: '2' }
          ],
          placeholder: '请选择',
          prop: 'f5',
          width: '50%'
        },
        {
          type: 'Input',
          label: '证件号码',
          placeholder: '请输入',
          prop: 'f6',
          width: '50%'
        },
        {
          type: 'select',
          label: '状态',
          options: [
            { label: '普通停车位', value: '1' },
            { label: '特殊停车位', value: '2' }
          ],
          placeholder: '请选择状态',
          prop: 'f8',
          width: '50%'
        },

        {
          type: 'Slot',
          label: '房屋信息',
          prop: 'f7',
          slotName: 'f7',
          width: '100%'
        },

      ],
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
