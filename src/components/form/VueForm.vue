<template>
  <div class="vform_box">
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
        <el-select size="small"
                   v-else-if="item.type === 'Select'"
                   v-model.trim="configObj.ruleForm[item.prop]"
                   :placeholder="item.placeholder"
                   :disabled="item.disabled"
                   style="width: 240px;">
          <el-option v-for="(selectItem,index) in item.options"
                     :key="index"
                     :value="selectItem.value"
                     :label="selectItem.label"></el-option>
        </el-select>
        <el-date-picker v-else-if="item.type === 'DateTime'"
                        value-format="yyyy/MM/dd HH:mm:ss"
                        type="datetime"
                        v-model="configObj.ruleForm[item.prop]"
                        :disabled="item.disabled"
                        style="width: 240px;"
                        :placeholder="item.placeholder"></el-date-picker>
        <el-input v-else-if="item.type === 'Int'"
                  oninput="value=value.replace(/[^\d]/g,'')"
                  v-model.trim="configObj.ruleForm[item.prop]"
                  :placeholder="item.placeholder"
                  :disabled="item.disabled"
                  style="width: 240px;"></el-input>
        <el-input v-else-if="item.type === 'Number'"
                  oninput="value=value.replace(/[^0-9.]/g,'')"
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
</template>
<script>
export default {
  props: {
    formObj: {
      type: Object,
      default: () => ({}),
    }
  },
  data () {
    return {
      configObj: {
        // 绑定数据
        ruleForm: {},
        rules: {},
        form_item: [],
      },
    }
  },
  methods: {
    // 重置
    reset () {
      console.log(this.configObj.ruleForm)
      this.$refs['ruleForm'].resetFields()
    },
    submitForm () {
      console.log(this.configObj.ruleForm)
      this.$refs['ruleForm'].validate((valid) => {
        this.$emit('ruleSubmit', valid)
        if (valid) {
          return true
        } else {
          return false;
        }

      });
    },
    initConfig () {
      // 父组件传递数据过滤
      // console.log(this.formObj)
      for (const key in this.formObj) {
        if (Object.keys(this.configObj).includes(key)) {
          this.configObj[key] = this.formObj[key]
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
    formObj: {
      handler (newValue) {
        this.initConfig()
      },
      immediate: true,
    },
  },
}
</script>
<style lang="scss">
.vform_box {
    .el-form {
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
    }
}
@media screen and (min-width: 1600px) {
    .vform_box {
        .el-form {
            width: 85%;
            display: flex;
            flex-wrap: wrap;
        }
    }
}
</style>
