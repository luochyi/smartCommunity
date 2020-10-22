<template>
  <div>
    <div class="main-content">
      <div class="main-titel">
        <span>账户中心</span>
      </div>
      <div class="content">
        <p class='txt-btn'>在线支付账单</p>
        <div>
          <span class='titel'>平台服务费 </span>
          <el-input placeholder="请输入内容"
                    v-model="input"
                    size="small"
                    style="width:120px;  margin:26px 12px;"
                    :disabled="true">
          </el-input>
          <div class='btn'>
            <span>修改</span>
          </div>
        </div>
        <div class='box'>
          <div class="item">
            <div class="item-title">
              <span>支付宝账户</span>
            </div>
            <div class="item-box">
              <div>
                <div>
                  <p>暂未开通</p>
                </div>
                <div>
                  <span>去开通</span>
                </div>
              </div>

            </div>
          </div>
          <div class="item">
            <div class="item-title">
              <span>微信账户</span> <span style="color: #FB4702;">编辑</span>
            </div>
            <div class="item-body">
              <div class='body-content'>
                <p>宁波永成物业有限公司</p>
                <p>621226*********3381</p>
                <p>中国工商银行</p>
              </div>
            </div>
            <div class="item-footer">
              <div>
                <p>动帐明细<span>¥1020.57</span></p>
              </div>
              <div>
                <p>2020-08-31 16:30:22</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.txt-btn {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #fb4702;
  line-height: 20px;
}
.btn {
  display: inline-block;
  border: 1px solid #cccccc;
  border-radius: 4px;
  width: 60px;
  height: 32px;
  line-height: 32px;
  text-align: center;
}
.title {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.box {
  display: flex;
}
.item {
  width: 420px;
  height: 304px;
  background: #ffffff;
  box-shadow: 0px 2px 16px 6px rgba(124, 124, 124, 0.1);
  border-radius: 2px;
  margin-right: 60px;
}
.item-title,
.item-footer {
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f6;
  padding: 0 20px;
}
.item-body {
  height: 180px;
  display: flex;
  justify-content: space-between;
}
.body-content {
  padding: 0 20px;
}
.body-content p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 40px;
}
.item-footer {
  border-top: 1px solid #f5f5f6;
  border-bottom: none;
}
.item-title span {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.item-box {
  text-align: center;
  height: 241px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-box p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  line-height: 40px;
}
.item-box span {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #fb4702;
}
.item-footer p {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.item-footer p span {
  padding-left: 10px;

  font-weight: 500;
  color: #333333;
}
.main-content {
  padding-bottom: 200px;
}
</style>
