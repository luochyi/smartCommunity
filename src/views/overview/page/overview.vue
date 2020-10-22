<template>
  <div class="over-bg">
    <div class="overContent">
      <div class="over-box">
        <el-input placeholder="请输入内容"
                  prefix-icon="el-icon-search"
                  size="small">
        </el-input>
        <div class="ul-box">

          <div class="ul-list">
            <p class="ul-title">基础档案</p>
            <ul>
              <li>房产管理</li>
              <li>车位信息</li>
              <li>车辆档案</li>
              <li>业主档案</li>
              <li>房产管理</li>
              <li>租户信息</li>
            </ul>
          </div>
          <div class="ul-list">
            <p class="ul-title">管家服务</p>
            <ul>
              <li>物品出门</li>
              <li>装修管理</li>
              <li>投票管理</li>
              <li>常用电话</li>
              <li>咨询建议</li>
              <li>投诉表扬</li>
            </ul>
          </div>
          <div class="ul-list">
            <p class="ul-title">收费管理</p>
            <ul>
              <li>费用类型</li>
              <li>房屋收费</li>
              <li>基础档案</li>
              <li>车位收费</li>
              <li>费用催交</li>
              <li>费用台账</li>
              <li>押金管理</li>
            </ul>
          </div>
          <div class="ul-list">
            <p class="ul-title">运营管理</p>
            <ul>
              <li>通知公告</li>
              <li>绿化管理</li>
              <li>保洁记录</li>
              <li>社区活动</li>
              <li>电子投票</li>
            </ul>
          </div>
          <div class="ul-list">
            <p class="ul-title">商城中心</p>
            <ul>
              <li>商品管理</li>
              <li>订单中心</li>
              <li>物流管理</li>
              <li>售后管理</li>
            </ul>
          </div>
          <div class="ul-list">
            <p class="ul-title">系统管理</p>
            <ul>
              <li>编码管理</li>
              <li>APP管理</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },

  methods: {}
}
</script>

<style scoped>
.over-bg {
  width: calc(100% - 40px);
  padding: 20px;
  background: #e8ebf2;
}
.overContent {
  background: white;
  height: calc(100vh - 100px);
  overflow: auto;
}
.over-box {
  padding: 65px 269px 100px 165px;
}
.over-box > .el-input {
  max-width: 840px;
  margin-bottom: 74px;
}
.ul-title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
  line-height: 25px;
  margin-bottom: 42px;
}
.ul-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.ul-list {
  padding: 20px 80px;
}
ul li {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 30px;
}
</style>
