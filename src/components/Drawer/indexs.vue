<template>
  <div class="drawers_box">
    <el-drawer :title="drawerTitle"
               :size='drawerSize'
               :visible.sync="drawer_visible"
               direction="rtl"
               :before-close="handleClose">
      <div class="dra-body">
        <slot></slot>
      </div>
      <div class="dra-footer"
           v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  props: {
    drawerVrisible: {
      type: Boolean,
      default: false
    },
    drawerTitle: {
      type: String,
      default: ''
    },
    drawerSize: {
      type: String,
      default: () => '58%'
    }
  },
  data () {
    return {
      drawer_visible: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('drawerClose', 'false')
    }
  },
  watch: {
    drawerVrisible: {
      handler (newValue) {
        this.drawer_visible = newValue
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss">
.drawers_box {
    .el-drawer__header {
        padding: 0 20px;
        margin: 0;
        height: 81px;
        line-height: 81px;
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
    .dra-footer {
        height: 81px;
        line-height: 81px;
        padding: 0 20px;
    }
}

// .el-drawer__header {
//     display: none;
// }
</style>
