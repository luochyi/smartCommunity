<template>
  <div>
    <div class="box">
      <div class="box_box">
        <div class="box-body">
          <div class="main-titel">
            <span>添加缴费</span>
          </div>
          <div class="content">
            <div class="">
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>缴费详情</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item"
                                     ref="formData"></form-datechildren>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>费用详情</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item2"
                                     ref="formData"></form-datechildren>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>备注</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item3"
                                     ref="formData"></form-datechildren>
                </div>
              </div>
              <div class="item">
                <div class="title">
                  <div class="line"></div><span>付款</span>
                </div>
                <div>
                  <form-datechildren :formItem="form_item4"
                                     ref="formData"></form-datechildren>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="box_footer">
        <div class="box_footer_content">
          <div class="content-btn">
            <el-button class="init-button"
                       icon="el-icon-circle-check"
                       @click="cancel()">确定</el-button>
            <el-button class="init-button"
                       @click="cancel()">确定并打印</el-button>
            <el-button type="init-button2"
                       style="margin-right:10px"
                       plain
                       @click="paymentPreview = true">打印预览</el-button>
            <button class="dra-cancel"
                    @click="cancel()"><span>取消</span></button>

          </div>
        </div>
        <paymentPreview :dialogVisible="paymentPreview"
                        @dialogPreview="dialogPreview"></paymentPreview>
      </div>
    </div>
  </div>
</template>

<script>
import formDatechildren from '@/components/form/formDatechildren'
import paymentPreview from '@/components/dialog/Preview.vue'

export default {
    components: {
        formDatechildren,
        paymentPreview,
    },
    data() {
        return {
            paymentPreview: false,
            form_item: [
                {
                    type: 'select',
                    label: '费用名称',
                    placeholder: '请选择',
                    prop: 'building ',
                    width: '50%',
                    options: [
                        {
                            value: '1',
                            label: '一栋',
                        },
                        {
                            value: '2',
                            label: '2栋',
                        },
                    ],
                },

                {
                    type: 'Input',
                    label: '房屋信息 ',
                    placeholder: '请输入',
                    prop: 'totalFloors',
                    // width: "100%"
                    width: '50%',
                },
                {
                    type: 'date',
                    label: '计费开始时间',
                    placeholder: '请选择开始时间',
                    prop: 'elevator',
                    // width: "100%"
                    width: '50%',
                },
                {
                    type: 'date',
                    label: '计费结束时间',
                    placeholder: '请选择开始时间',
                    prop: 'enddate',
                    // width: "100%"
                    width: '50%',
                },
            ],
            form_item2: [
                {
                    type: 'Input',
                    label: '计费单价/单位 ',
                    placeholder: '请选择',
                    prop: 'building ',
                    width: '50%',
                    disabled: true,
                },

                {
                    type: 'Input',
                    label: '面积/用量  ',
                    placeholder: '请输入',
                    prop: 'totalFloors',
                    // width: "100%"
                    width: '50%',
                    disabled: true,
                },
                {
                    type: 'Input',
                    label: '费用金额  ',
                    placeholder: '请输入',
                    prop: 'fyje',
                    // width: "100%"
                    width: '50%',
                    disabled: true,
                },
                // 费用金额
            ],
            form_item3: [
                {
                    type: 'textarea',
                    label: '备注  ',
                    rows: 4,
                    placeholder: '请输入',
                    prop: 'fyje',
                    // width: "100%"
                    width: '50%',
                },
            ],
            form_item4: [
                {
                    type: 'Input',
                    label: '计费单价/单位 ',
                    placeholder: '请选择',
                    prop: 'building ',
                    width: '100%',
                },
                {
                    type: 'Input',
                    label: '计费单价/单位 ',
                    placeholder: '请选择',
                    prop: 'buildsing ',
                    width: '100%',
                },
            ],
        }
    },
    methods: {
        cancel() {
            this.$emit('cancel', '取消')
        },
        dialogPreview() {
            this.paymentPreview = false
        },
    },
}
</script>
<style scoped>
.box {
    position: relative;
    height: calc(100vh - 80px);
}
.box-body {
    margin: 20px;
    margin-bottom: 17px;
    background: #fff;
    overflow: auto;
    height: calc(100vh - 179px);
}
.item {
    padding-bottom: 28px;
}
.title {
    display: flex;
    align-items: center;
    padding-bottom: 26px;
}
.title span {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 22px;
}
.line {
    display: inline-block;
    width: 3px;
    height: 16px;
    margin-right: 10px;
    background: rgba(251, 71, 2, 1);
}
.box_footer {
    position: absolute;
    margin-top: 20px;
    width: 100%;
    bottom: 0;
    height: 81px;
    background: white;
}
.box_footer_content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
</style>
