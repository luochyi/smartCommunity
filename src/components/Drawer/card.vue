<template>
  <div class="drawer-content">
    <div class="box">
      <div class="title">
        <span>
          <slot name="title"></slot>
        </span>
        <span>
          <slot name="btn"></slot>
        </span>
      </div>
      <div class="hr">
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {

  }
}
</script>
<style scoped lang='scss'>
.drawer-content {
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #e8e8e8;
    .hr {
        width: 100%;
        height: 1px;
        background: #e8e8e8;
    }
    .box {
        .title {
            height: 50px;
            line-height: 50px;
            padding: 0 22px;
            display: flex;
            justify-content: space-between;
            span {
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #333333;
            }
        }
    }
}
</style>

