<template>
  <div class="Dialog">
    <el-dialog :title="configObj.title"
               :visible.sync="isVisibleDialog"
               @close="close"
               @opened="opened"
               width="30%"
               top="40vh"
               Dialog>
      <div class="dialog-content">
        <span>{{configObj.content}} </span>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <div class="input-btn">
          <button class="inquire-button"
                  @click="confirm()">
            确定
          </button>
          <button class="reset-button"
                  @click="close()">
            取消
          </button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialog_config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      isVisibleDialog: false,
      configObj: {
        title: '',
        content: '',
        button: {},
      },
    }
  },
  methods: {
    initConfig () {
      // 父组件传递数据过滤
      for (const key in this.dialog_config) {
        if (Object.keys(this.configObj).includes(key)) {
          this.configObj[key] = this.dialog_config[key]
        }
      }
    },
    close () {
      this.$emit('cancel', this.isVisibleDialog)
    },
    opened () {
      // console.log('opened')
    },
    cancel () {
    },
    confirm () {
      this.$emit('confirm', this.isVisibleDialog)
    }
  },
  watch: {
    dialogVisible: {
      handler (newValue) {
        this.isVisibleDialog = newValue
      },
      immediate: true
    },
    dialog_config: {
      handler (newValue) {
        this.initConfig()
      },
      immediate: true,
      deep: true
    }
  }
}
</script>

<style>
.Dialog .el-dialog__body {
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}
</style>
