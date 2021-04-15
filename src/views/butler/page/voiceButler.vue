<template>
  <div class="main-content">
    <div class="main-titel">
      <span>语音管家</span>
    </div>
    <div class="content">
      <VueTable ref="table"
                :config='config'
                @tableCheck="tableCheck">
        <template slot="tabs">
          <el-tabs v-model="activeName"
                   @tab-click="handleClick">
            <el-tab-pane label="全部"
                         name="0"></el-tab-pane>
            <el-tab-pane label="未处理"
                         name="1"></el-tab-pane>
            <el-tab-pane label="已处理"
                         name="2"></el-tab-pane>
          </el-tabs>
        </template>
        <template v-slot:voiceUrl="slotData">
          <div>
            <div>
              <audio controls="controls">
                <source :src="$ImgUrl + slotData.data.voiceUrl"
                        type="audio/mp3">
              </audio>
            </div>
          </div>
        </template>
        <template slot="footer">
          <div class="table-footer">
            <button>添加备注</button>
          </div>
        </template>
      </VueTable>
      <audio ref='audio'
             :src="audioUrl"
             hidden></audio>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: '0',
      // 选中表格数据
      table_row: [],
      audioUrl: '',
      config: {
        thead: [
          { label: '序号', type: 'index', width: '80' },
          { label: '房屋信息', prop: 'roomName', width: 'auto' },
          { label: '姓名', prop: 'name', width: 'auto' },
          { label: '联系方式', prop: 'tel', width: 'auto' },
          { label: '语音', prop: 'voiceUrl', width: '500', type: 'slot', slotName: 'voiceUrl' },
          { label: '状态', prop: 'status', width: 'auto' },
          { label: '备注', prop: 'remake', width: 'auto' },
        ],
        table_data: [],
        url: 'voiceHousekeeperList',
        search_item: [
          {
            type: 'Input',
            label: '房屋信息',
            placeholder: '楼栋/单元/室号',
            prop: 'userName1'
          },
          {
            type: 'Input',
            label: '姓名',
            placeholder: '请输入',
            prop: 'userName'
          },
          {
            type: 'Input',
            label: '联系方式',
            placeholder: '请输入',
            prop: 'tel'
          }
        ],
        data: {
          pageNum: 1,
          size: 10
        },
      },
    }
  },
  methods: {
    handlePlay (url) {
      // this.audioUrl = this.$ImgUrl + url
      this.$refs.audio.play()
      console.log(this.$refs.audio)
    },
    handleClick (tab, event) {
      let status = null
      if (this.activeName != 0) {
        status = this.activeName
      } else {
        status = null
      }
      const requestData = {
        pageNum: 1,
        size: 10,
        status: status
      }
      this.$refs.table.requestData(requestData);
    },
    tableCheck (data) {
      this.table_row = data;
    },
    onSubmit () {
    },

  }
}
</script>
