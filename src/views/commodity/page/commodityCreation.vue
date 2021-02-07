<template>
  <div>
    <div v-if="change">
      <div class="main-content">
        <div class="main-titel">
          <span>选择商品类目</span>
        </div>
        <div class="content">
          <div class="creation_box">
            <el-input placeholder="搜索类目"
                      prefix-icon="el-icon-search"
                      v-model="input"
                      style="width:514px;"
                      size="mini">
            </el-input>
            <el-cascader-panel :options="options"
                               v-model="value"
                               ref="cascaderAddr"
                               @change="changeCategory"
                               size="mini"
                               style=" margin:20px 0"></el-cascader-panel>
            <span>已选：{{ this.$store.state.CategorySelected }}</span>
            <div class="btn_footer"
                 @click="change = false">
              <span>下一步</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <index @handleClose='handleClose'></index>
    </div>
  </div>
</template>

<script>
import index from '@/views/commodity/components/commodityCreation/index.vue'
export default {
  components: {
    index,
  },
  mounted () {
    console.log(this.$store.state.CategorySelected + ':vuex')
  },

  data () {
    return {
      change: true,
      input: '',
      value: [],
      CategorySelected: '',
      options: [
        {
          value: 'zhinan',
          label: '居家生活',
          children: [
            {
              value: 'shejiyuanze',
              label: '男装',
              children: [
                {
                  value: 'yizhi',
                  label: '裤子',
                },
                {
                  value: 'fankui',
                  label: '上装',
                },
                {
                  value: 'xiaolv',
                  label: '正式套装',
                },
                {
                  value: 'kekong',
                  label: '运动穿搭',
                },
                {
                  value: 'jjuf',
                  label: '家居服',
                },
                {
                  value: 'wz',
                  label: '袜子',
                },
              ],
            },
            {
              value: 'daohang',
              label: '女装',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '上装',
                },
                {
                  value: 'dingbudaohang',
                  label: '裙子',
                },
              ],
            },
          ],
        },
        {
          value: 'zujian',
          label: '服饰箱包',
          children: [
            {
              value: 'basic',
              label: '衣服',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局',
                },
                {
                  value: 'color',
                  label: 'Color 色彩',
                },
                {
                  value: 'typography',
                  label: 'Typography 字体',
                },
                {
                  value: 'icon',
                  label: 'Icon 图标',
                },
                {
                  value: 'button',
                  label: 'Button 按钮',
                },
              ],
            },
            {
              value: 'form',
              label: '下身',
              children: [
                {
                  value: 'radio',
                  label: '碎花裙',
                },
                {
                  value: 'checkbox',
                  label: '长裙',
                },
                {
                  value: 'input',
                  label: '短裙',
                },
                {
                  value: 'input-number',
                  label: '皮裤',
                },
                {
                  value: 'select',
                  label: 'Select 选择器',
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器',
                },
                {
                  value: 'switch',
                  label: 'Switch 开关',
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块',
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器',
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器',
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器',
                },
                {
                  value: 'upload',
                  label: 'Upload 上传',
                },
                {
                  value: 'rate',
                  label: 'Rate 评分',
                },
                {
                  value: 'form',
                  label: 'Form 表单',
                },
              ],
            },
            {
              value: 'data',
              label: '手提箱',
              children: [
                {
                  value: 'table',
                  label: '书包',
                },
                {
                  value: 'tag',
                  label: '电脑',
                },
                {
                  value: 'progress',
                  label: '公文包',
                },
                {
                  value: 'tree',
                  label: '书包',
                },

              ],
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告',
                },
                {
                  value: 'loading',
                  label: 'Loading 加载',
                },
                {
                  value: 'message',
                  label: 'Message 消息提示',
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框',
                },
                {
                  value: 'notification',
                  label: 'Notification 通知',
                },
              ],
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单',
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页',
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑',
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单',
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条',
                },
              ],
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框',
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示',
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框',
                },
                {
                  value: 'card',
                  label: 'Card 卡片',
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯',
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板',
                },
              ],
            },
          ],
        },
        {
          value: 'ziyuan',
          label: '休闲副食',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
        {
          value: 'ziysuan',
          label: '滋补保健',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
        {
          value: 'ziysssuan',
          label: '彩妆香水',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
        {
          value: 'smjd',
          label: '数码家电',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
        {
          value: 'mydw',
          label: '母婴玩具',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
        {
          value: 'mysaddw',
          label: '饮料酒水',
          children: [
            {
              value: 'axure',
              label: 'Axure Components',
            },
            {
              value: 'sketch',
              label: 'Sketch Templates',
            },
            {
              value: 'jiaohu',
              label: '组件交互文档',
            },
          ],
        },
      ],
    }
  },
  methods: {
    // 切换类目
    changeCategory () {
      this.CategorySelected = ''
      let item = this.$refs['cascaderAddr'].getCheckedNodes()[0]
        .pathLabels
      // this.selected = item[0] + ' >' + item[1] + ' >' + item[2]
      for (let i = 0; i < item.length; i++) {
        if (i === 0) {
          this.CategorySelected += '' + item[i]
        } else {
          this.CategorySelected += '>' + item[i]
        }
      }
      this.$store.commit('changeCategory', this.CategorySelected)
    },
    search () {
      this.value = ['zhinan', 'shejiyuanze', 'yizhi']
      console.log(1)
      console.log(this.value)
    },
    handleClose () {
      this.change = true
    },
  },
}
</script>
<style lang="scss">
</style>
