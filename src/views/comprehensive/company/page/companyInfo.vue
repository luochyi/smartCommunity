<template>
  <div class="main-content">
    <el-card>
      <div class="cart-title">
        <span>企业资料</span>
      </div>
      <div class="cart-box">
        <div class="cart-item cart-item_l">
          <div class="item-headImg">
            <img src="https://thirdqq.qlogo.cn/g?b=oidb&k=hyaFKtN1qiacRpXwh7aL5JQ&s=100&t=1600061487"
                 alt="">
          </div>
          <div class="item-txt">
            <div class="txt-title">
              <span>深圳市凯达来科技有限公司</span>
            </div>
            <div class="txt-small">
              <p><span><i class="el-icon-suitcase"></i></span> 计算机/互联网 计算机软件</p>
              <p><span><i class="el-icon-phone"></i></span>-</p>
              <p><span><i class="el-icon-location-outline"></i></span>深圳市 龙岗区 横岗街道沙荷路40-11号</p>
            </div>
          </div>
        </div>
        <div class="cart-item cart-r">
          <p><span><i class="el-icon-s-custom"></i></span> -</p>
          <p><span><i class="el-icon-view"></i></span>www.kaidalai.cn</p>
        </div>
      </div>
      <div class="cart-content">
        <span class="cart-content_title">相关项目</span>
        <div class="cart-content_txt">
          <p><span><i class="el-icon-circle-plus-outline"></i></span> 相关项目</p>
        </div>
      </div>
    </el-card>
  </div>

</template>
<style scoped>
.cart-item.cart-r p,
.txt-small p {
    font-size: 22px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 42px;
}
.cart-box i {
    padding: 0 10px;
}
.el-main {
    font-family: PingFangSC-Medium, PingFang SC;
}
.cart-item_l {
    display: flex;
}
.item-headImg {
    height: 134px;
    width: 134px;
    margin-right: 41px;
    border-radius: 50%;
    overflow: hidden;
}
.item-headImg img {
    width: 100%;
}
.el-card.is-always-shadow {
    height: 100%;
    box-sizing: border-box;
}
.cart-box {
    width: 90%;
    margin: 0 auto;
    display: flex;
    align-items: center;

    border-bottom: 1px solid #cccccc;
}
.cart-item {
    padding: 118px 0px 97px 84px;
}
.box-title span {
    font-size: 24px;
    font-weight: 500;
    color: #333333;
    line-height: 33px;
}
.cart-title {
    padding: 20px;
    width: 100%;
    border-bottom: 1px solid #cccccc;
}
.cart-title span {
    font-size: 16px;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
}
.txt-title span {
    font-size: 30px;
    font-weight: 500;
    color: #333333;
    line-height: 42px;
}
.cart-content {
    width: 90%;
    margin: 23px auto;
}
.cart-content_title {
    font-size: 24px;
    font-weight: 500;
    color: #333333;
    line-height: 33px;
}
.cart-content_txt {
    margin-top: 22px;
    font-size: 18px;
    font-weight: 400;
    color: #666666;
    line-height: 25px;
}
</style>