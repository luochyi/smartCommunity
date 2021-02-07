<template>

  <div class="drawer_box">
    <el-drawer :title="configObj.head_title"
               :visible.sync="isVisibleDrawe"
               size="58%"
               :before-close="handleClose"
               :with-header="true">
      <div class="">
        <div class="">
          <div class="dra-content">
            <div class="content-titel">
              <span>{{configObj.content_title}}</span>
            </div>
            <div class="">
              <el-form label-position="right"
                       :rules="configObj.rules"
                       size="small"
                       ref="ruleForm"
                       :model="configObj.ruleForm"
                       label-width="auto"
                       class="demo-ruleForm">
                <el-form-item v-for="item in configObj.form_item"
                              :key="item.prop"
                              :label="item.label"
                              :prop="item.prop"
                              :style="{width: item.width}">
                  <!-- input输入框 -->
                  <el-input v-if="item.type === 'Input'"
                            v-model.trim="configObj.ruleForm[item.prop]"
                            :placeholder="item.placeholder"
                            :disabled="item.disabled"
                            style="width: 240px;"></el-input>
                  <!-- slot插槽 -->
                  <slot v-else-if="item.type === 'Slot'"
                        :name="item.slotName" />
                  <!-- 单选框 -->
                  <el-radio-group v-else-if="item.type === 'Radio'"
                                  v-model="configObj.ruleForm[item.prop]">
                    <el-radio v-for="radio in item.options"
                              :label="radio.value"
                              :key="radio.value">{{ radio.label }}</el-radio>
                  </el-radio-group>
                  <!-- 开始结束日期 -->
                  <!-- <el-date-picker v-else-if="item.type === 'date'"
                                  type="date"
                                  size="small"
                                  v-model.trim="configObj.ruleForm[item.prop]"
                                  :placeholder="item.placeholder"
                                  :disabled="item.disabled"
                                  style="width: 240px;"></el-date-picker> -->
                  <!-- select -->
                  <el-select size="small"
                             v-else-if="item.type === 'Select'"
                             v-model.trim="configObj.ruleForm[item.prop]"
                             :placeholder="item.placeholder"
                             :disabled="item.disabled"
                             style="width: 240px;">
                    <el-option v-for="selectItem in item.options"
                               :key="selectItem.value || selectItem[item.select_vlaue]"
                               :value="selectItem.value || selectItem[item.select_vlaue]"
                               :label="selectItem.label || selectItem[item.select_label]"></el-option>
                  </el-select>
                  <!-- span -->
                  <span v-else-if="item.type === 'span'"
                        style="width: 240px;"
                        :style="{ color: item.color }">{{configObj.ruleForm[item.prop]}}</span>
                  <el-input v-else-if="item.type === 'textarea'"
                            type="textarea"
                            :rows="item.rows"
                            size="small"
                            v-model.trim="configObj.ruleForm[item.prop]"
                            :placeholder="item.placeholder">
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
        <div class="dra-footer">
          <div class="dra-footer-content">
            <!-- 绑定事件 将验证规则和所有数据传出去 -->
            <!--    @click="item.handler && item.handler(configObj,$refs['ruleForm'])" -->
            <button v-for="item in formHandler"
                    :key="item.key"
                    @click="item.handler && item.handler(configObj,$refs['ruleForm'])"
                    :class="item.class"><span> {{ item.label }}</span></button>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false,
    },
    drawer_config: {
      type: Object,
      default: () => ({}),
    },
    // 按钮
    formHandler: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      input: '',
      isVisibleDrawe: false,
      configObj: {
        // 标题
        head_title: '',
        // 抬头
        content_title: '',
        // 绑定数据
        ruleForm: {},
        rules: {},
        form_item: [],
      },
    }
  },
  mounted () {
    console.log(this.configObj.ruleForm)
    console.log(this.$refs['ruleForm'])
  },
  methods: {
    // 提交
    onSubmit (formName) {
      //
      console.log(this.$refs['ruleForm'])
      // this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //         console.log('submit!')
      //         this.$refs['ruleForm'].resetFields()
      //         console.log(this.$refs['ruleForm'])
      //         // this.$emit('handleClose', 'submit')
      //     } else {
      //         console.log('error submit!!')
      //         return false
      //     }
      // })
    },
    // 重置
    // 取消关闭esc
    handleClose () {
      this.$refs['ruleForm'].resetFields()
      this.$emit('handleClose', 'Close')
    },
    initConfig () {
      // 父组件传递数据过滤
      for (const key in this.drawer_config) {
        if (Object.keys(this.configObj).includes(key)) {
          this.configObj[key] = this.drawer_config[key]
        }
      }
    },
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.isVisibleDrawe = newValue
      },
      immediate: true,
    },
    drawer_config: {
      handler (newValue) {
        this.initConfig()
      },
      immediate: true,
    },
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

// .el-drawer__header {
//     display: none;
// }
</style>
