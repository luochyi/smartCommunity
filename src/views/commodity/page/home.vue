<template>
  <div style='margin:20px'>
    <div class="main_title">
      <img :src="title"
           alt="" />
      <span>欢迎使用商城管理系统</span>
    </div>
    <div class="home_box">
      <div class="home_itme">
        <div class="home_title">
          <img :src="home_icon1"
               alt="" /> <span>待办事项</span>
        </div>
        <div class="home_item1_box">
          <div class="item1">
            <p class="p1">待付款 <span class="el-icon-arrow-right"></span></p>
            <p class="p2">10</p>
          </div>
          <div class="item1">
            <p class="p1">待发货 <span class="el-icon-arrow-right"></span></p>
            <p class="p2">12</p>
          </div>
          <div class="item1">
            <p class="p1">
              未回复服务请求 <span class="el-icon-arrow-right"></span>
            </p>
            <p class="p2">6</p>
          </div>
          <div class="item1">
            <p class="p1">退款处理 <span class="el-icon-arrow-right"></span></p>
            <p class="p2">2</p>
          </div>
        </div>
      </div>
      <div class="home_itme">
        <div class="home_title">
          <img :src="home_icon2"
               alt="" /> <span>运营数据</span>
        </div>
        <div class="home_item1_box">
          <div class="item1">
            <p class="p3">生单数</p>
            <p class="p2">100</p>
          </div>
          <div class="item1">
            <p class="p3">生单金额</p>
            <p class="p2">¥10,000.00</p>
          </div>
          <div class="item1">
            <p class="p3">
              上架商品数
            </p>
            <p class="p2">23</p>
          </div>
        </div>
      </div>
      <div class="home_itme">
        <div class="home_title">
          <img :src="home_icon3"
               alt="" /> <span>快捷入口</span>
        </div>
        <div class="home_item_box">
          <div class="box_item">
            <img :src="item1"
                 alt="" />
            <div><span>添加商品</span></div>
          </div>
          <div class="box_item">
            <img :src="item2"
                 alt="" />
            <div><span>添加商品</span></div>
          </div>
          <div class="box_item">
            <img :src="item3"
                 alt="" />
            <div><span>添加商品</span></div>
          </div>
          <div class="box_item">
            <img :src="item4"
                 alt="" />
            <div><span>添加商品</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // /Users/apple/Desktop/smartCommunity/basic-admin/src/assets/images/commodity/home/home_icon1.png
  data () {
    return {
      title: require('@/assets/images//commodity/home/title.png'),
      home_icon1: require('@/assets/images//commodity/home/home_icon1.png'),
      home_icon2: require('@/assets/images//commodity/home/home_icon2.png'),
      home_icon3: require('@/assets/images//commodity/home/home_icon3.png'),
      item1: require('@/assets/images//commodity/home/item1.png'),
      item2: require('@/assets/images//commodity/home/item2.png'),
      item3: require('@/assets/images//commodity/home/item3.png'),
      item4: require('@/assets/images//commodity/home/item4.png')
    }
  },
  methods: {}
}
</script>

<style scoped>
.main_title {
  display: flex;
  align-items: center;
  padding-left: 20px;
  margin-top: 20px;
  height: 43px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
}
.main_title img {
  width: 16px;
  height: 16px;
  padding-right: 10px;
}
.main_title span {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.home_box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.home_box .home_itme {
  cursor: pointer;
  margin-top: 20px;
  padding: 23px 0px 48px 20px;
  box-sizing: border-box;
  border-radius: 4px;
  width: 48%;
  height: 220px;
  background: #ffffff;
}
.home_title {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.home_title span {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.home_title img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.home_item1_box,
.home_item_box {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.home_item1_box .item1 .p1 {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  margin-bottom: 19px;
  font-weight: 500;
  color: #333333;
  line-height: 20px;
}
.home_item1_box .item1 .p2 {
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #666666;
  line-height: 50px;
}
.home_item1_box .item1 .p3 {
  font-size: 14px;
  margin-bottom: 19px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
}
.box_item img {
  width: 58px;
  height: 58px;
  margin-bottom: 17px;
}
</style>
