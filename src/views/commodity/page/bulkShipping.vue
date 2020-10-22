<template>
  <div class="main-content">
    <div class="main-titel">
      <span>批量发货</span>
    </div>
    <div>
      <div class="box">
        <div class="item">
          <div class="itme_img">
            <img :src="download_img"
                 alt="" />
          </div>
          <div class="itme_txt">
            <p>请按照模板填写发货信息，运单号勿使用科学计数法</p>
            <span class="txt_color">下载模板</span>
            <span class="txt_color">下载物流公司编码</span>
          </div>
        </div>
        <div class="item">
          <div class="itme_img">
            <img :src="Import_img"
                 alt="" />
          </div>
          <div class="itme_txt">
            <p>
              单次最多导入5000条订单，超过分批导入，支持csv、xls、xlsx格式文件
            </p>
            <span class="txt_color"></span>
          </div>
        </div>
      </div>
      <div class="tips">
        <p>
          <span class="el-icon-warning-outline"
                style="margin:0 12px"></span>
          请确认实际发货时填写的手机号与平台收货人电话保持一致，否则可能会判定为虚假发货
        </p>
      </div>
      <div class="main-titel"
           style="border-bottom:none">
        <span>批量发货</span>
      </div>
      <div style="padding:20px">
        <el-input placeholder="请输入内容"
                  size="small"
                  style="width:320px"
                  clearable>
        </el-input>
        <el-button type="init-button2"
                   style="margin:0px 20px"
                   size="small"
                   plain>立即上传</el-button>
        <button class="dra-cancel"
                size="small"><span>发货</span></button>
        <el-checkbox v-model="checked">允许覆盖</el-checkbox>
      </div>
      <div class="main-titel"
           style="border-bottom:none">
        <span>本次上传订单</span>
      </div>
      <div style="margin-bottom:300px;padding:20px">
        <div class="shop_table">
          <div class="shop_th"><span>订单号</span></div>
          <div class="shop_th"><span>快递公司</span></div>
          <div class="shop_th">
            <span>运单号</span>
          </div>
          <div class="shop_th">
            <span>发货结果</span>
          </div>
          <div class="shop_th">
            <span>备注</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// basic-admin/src/assets/images/commodity/bulkShipping/download.png
// /Users/apple/Desktop/smartCommunity/basic-admin/src/assets/images/commodity/bulkShipping/Import.png
export default {
    data() {
        return {
            checked: false,
            download_img: require('@/assets/images/commodity/bulkShipping/download.png'),
            Import_img: require('@/assets/images/commodity/bulkShipping/Import.png'),

            msg: '',
        }
    },
    methods: {},
}
</script>

<style scoped>
.box {
    width: 80%;
    margin: 80px auto;
    display: flex;
    justify-content: space-between;
}
.tips {
    margin: 20px;
    height: 38px;
    line-height: 38px;
    background: #fafafa;
    border-radius: 4px;
    opacity: 0.8;
    border: 1px solid #e8e8e8;
}
.shop_table {
    height: 44px;
    width: 100%;
    display: flex;
    align-items: center;
    background: #f5f5f6;
    justify-content: space-around;
}
.item {
    display: flex;
}
.itme_img {
    width: 76px;
    height: 76px;
    margin-right: 20px;
    background: #fff5f1;
}
.itme_img img {
    width: 100%;
}
.itme_txt {
    width: 252px;
    height: 76px;
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    align-items: space;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.txt_color {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    padding-right: 10px;
    color: #fb4702;
}
</style>
