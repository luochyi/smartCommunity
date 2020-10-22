<template>
  <div>
    <div class="main-content">
      <div class="main-titel">
        <span>极速退款助手</span>
      </div>
      <div class="content_box">
        <div class="box">
          <div class="box_titel">
            <span>什么是极速退款助手</span>
          </div>
          <div class="box_itme">
            <div class="item">
              <p>自动执行极速退款</p>
              <span>系统将自动识别小于300元，且成功下单时间小于6小时的未发货订单，执行极速退款</span>
            </div>
            <div class="item">
              <p>极速退款标识</p>
              <span>开通后，商品带上【极速退款】标识，退款有保障买家更放心</span>
            </div>
          </div>
          <div class="box_titel">
            <span>开通极速退款的优势</span>
          </div>
          <div class='box_item1'>
            <div class="item1">
              <div class="item1_img">
                <img :src="itme1_img"
                     alt="">
              </div>
              <div class='item1_txt'>
                <p>提高日常处理效率</p>
                <span>有效节省人力成本</span>
              </div>
            </div>
            <div class="item1">
              <div class="item1_img">
                <img :src="itme2_img"
                     alt="">
              </div>
              <div class='item1_txt'>
                <p>极速处理售后服务请求</p>
                <span>高店铺评分带动高转化</span>
              </div>
            </div>
            <div class="item1">
              <div class="item1_img">
                <img :src="itme3_img"
                     alt="">
              </div>
              <div class='item1_txt'>
                <p>自动处理大量退款</p>
                <span>轻松应对爆单</span>
              </div>
            </div>
          </div>
          <div>
            <div class="footer_btn">
              <span>马上开启</span>
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
      itme1_img: require('@/assets/images/commodity/refundAssistant/item1.png'),
      itme2_img: require('@/assets/images/commodity/refundAssistant/item2.png'),
      itme3_img: require('@/assets/images/commodity/refundAssistant/item3.png')
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.content_box {
  height: 772px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  width: 100%;
  height: 648px;
}
.box_titel {
  width: 100%;
  text-align: center;
}
.box_titel span {
  position: relative;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.box_titel span::after {
  content: '';
  display: block;
  position: absolute;
  border-radius: 50%;
  border: 2px solid #fb4702;
  top: 0px;
  right: -20px;
  width: 8px;
  height: 8px
  ;
}
.box_itme {
  margin: 60px 0px 112px 0px;
  display: flex;
  justify-content: center;
}
.item {
  padding: 20px;
  box-sizing: border-box;
  line-height: 30px;
  width: 376px;
  height: 128px;
  margin-right: 56px;
  background: #ffffff;
  box-shadow: 0px 2px 16px 6px rgba(124, 124, 124, 0.1);
  border-radius: 2px;
}
.item p {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.item span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.box_item1 {
  margin-top: 69px;
  display: flex;
  justify-content: center;
}
.item1 {
  margin-right: 100px;
  display: flex;
  align-items: center;
}
.item1 .item1_img {
  margin-right: 20px;
  width: 76px;
  height: 76px;
}
.item1 .item1_img img {
  width: 100%;
}
.item1_txt {
  text-align: center;
  height: 76px;
  line-height: 30px;
}
.item1_txt p {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.item1_txt span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
}
.footer_btn {
  cursor: pointer;
  width: 216px;
  text-align: center;
  line-height: 40px;
  height: 40px;
  background: #fb4702;
  border-radius: 4px;
  margin: 112px auto;
}
.footer_btn:hover {
  opacity: 0.8;
}
.footer_btn span {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
</style>
