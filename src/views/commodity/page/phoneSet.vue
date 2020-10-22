<style scoped>
.tips {
  margin: 20px;
  height: 38px;
  line-height: 38px;
  background: #fafafa;
  border-radius: 4px;
  opacity: 0.8;
  border: 1px solid #e8e8e8;
}
</style>
<template>
  <div class="main-content">
    <div class="main-titel">
      <span>客服信息</span>
    </div>
    <div class="content">
      <div>
        <div class="phone_title"><span>电话</span></div>
        <div class="phone_row">
          <div class="phone_box">
            <div>
              <span class="phone_txt">手机</span>
              <span class="phone_del">删除</span>
            </div>
            <div>
              <span>1592830791</span>
            </div>
          </div>
          <div class="phone_add">
            <span class="el-icon-circle-plus-outline">
              添加
            </span>
          </div>
        </div>
      </div>
      <div style="margin-top:60px">
        <div class="phone_title"><span>微信</span></div>
        <div class="phone_row">
          <div class="phone_box">
            <div>
              <span class="phone_txt">微信号</span>
              <span class="phone_del">编辑</span>
            </div>
            <div>
              <span>1592830791</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 详情 -->
  </div>
</template>

<script>
import drawerDetails from '@/views/butler/components/suggestConsultation/details.vue'
export default {
  data() {
    return {}
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
.phone_title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 22px;
}
.content {
  height: 100vh;
}
.phone_row {
  display: flex;
  margin-top: 23px;
}
.phone_box {
  width: 199px;
  height: 80px;

  box-sizing: border-box;
  padding: 10px;
  background: #ffffff;
  box-shadow: 0px 2px 16px 6px rgba(124, 124, 124, 0.1);
  border-radius: 2px;
}
.phone_box > div {
  display: flex;
  justify-content: space-between;
}
.phone_txt {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 20px;
}
.phone_del {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fb4702;
  line-height: 20px;
}
.phone_add {
  cursor: pointer;
  margin-left: 20px;
  width: 199px;
  font-size: 14px;
  line-height: 80px;
  text-align: center;
  height: 80px;
  background: #ffffff;
  border-radius: 2px;
  border: 1px dashed #e8e8e8;
}
</style>
