<template>
  <section class="sub-sys">
    <div class="section-title">
      <label class="first">门禁数据</label>
      <label class="second">Item collection</label>
    </div>
    <el-row :gutter="10"
            style="margin-top: 20px">
      <el-col v-for="(item,i) in collectionItems"
              :span="4"
              :key="i">
        <collection-item :icon="item.icon"
                         :centerFirst="item.centerFirst"
                         :centerSecond="item.centerSecond"
                         :rightFirst="item.rightFirst"
                         :rightSecond="item.rightSecond">
        </collection-item>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="margin-top: 20px">
      <el-col :span="12">
        <div class="section-title">
          <label class="first">监控</label>
          <label class="second">Monitor</label>
        </div>
        <div style="height: 200px;margin-top: 10px">
          <el-row>
            <el-col :span="12">
              <div class="video-item">
                <video width="100%"
                       height="100%"
                       muted
                       loop
                       autoplay
                       controls>
                  <source src="../../assets/mp4/03.mp4"
                          type="video/mp4">
                </video>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="video-item">
                <video width="100%"
                       height="100%"
                       loop
                       muted
                       autoplay
                       controls>
                  <source src="../../assets/mp4/feiwo.mp4"
                          type="video/mp4">
                </video>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <div class="video-item">
                <video width="100%"
                       height="100%"
                       loop
                       muted
                       autoplay
                       controls>
                  <source src="../../assets/mp4/02.mp4"
                          type="video/mp4">
                </video>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="video-item">
                <video width="100%"
                       height="100%"
                       muted
                       loop
                       autoplay
                       controls>
                  <source src="../../assets/mp4/01.mp4"
                          type="video/mp4">
                </video>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="section-title">
          <label class="first">车流出入</label>
          <label class="second">Traffic in and out</label>
        </div>
        <div class="block-item"
             style="height: 200px;margin-top: 10px">
          <vue-echart id="ec-1"
                      style="width: 100%;height: 100%"
                      :options="options1"></vue-echart>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="margin-top: 20px">
      <el-col :span="24">
        <div class="section-title">
          <label class="first">设备状态</label>
          <label class="second">Resources</label>
        </div>
        <div class="block-item"
             style="height: 136px;margin-top: 10px">
          <div style="display: table;width: 100%;height:100%;text-align: center">
            <div style="display: table-cell;width: 12.5%;vertical-align: middle">
              <div style="display: inline-block;width: 120px;text-align: left">
                <div style="font-size: 11px">监控类型占比</div>
                <div style="font-size: 10px;margin-top: 12px">
                  <span>监控异常</span><span style="font-size: 20px;font-weight: bold">18</span><span>个</span>
                </div>
              </div>
            </div>
            <div style="display: table-cell;width: 12.5%;vertical-align: middle">
              <vue-echart id="ec-2"
                          style="width: 100%;height: 100%"
                          :options="options2"></vue-echart>
            </div>
            <div style="display: table-cell;width: 12.5%;vertical-align: middle">
              <div style="display: inline-block;width: 120px;text-align: left">
                <div style="font-size: 11px">烟感报警变化</div>
                <div style="font-size: 10px;margin-top: 12px">
                  <span>报警次数</span><span style="font-size: 20px;font-weight: bold">8</span><span>次</span>
                </div>
              </div>
            </div>
            <div style="display: table-cell;width: 12.5%;vertical-align: middle">
              <vue-echart id="ec-3"
                          style="width: 100%;height: 100%"
                          :options="options3"></vue-echart>
            </div>
            <div style="display: table-cell;width: 12.5%;vertical-align: middle">
              <div style="display: inline-block;width: 120px;text-align: left">
                <div style="font-size: 11px">小区巡检完成率</div>
                <div style="font-size: 10px;margin-top: 12px">
                  <span>占比</span><span style="font-size: 20px;font-weight: bold">60%</span>
                </div>
              </div>
            </div>
            <div style="display: table-cell;width: 12.5%;vertical-align: middle">
              <vue-echart id="ec-4"
                          style="width: 100%;height: 100%"
                          :options="options4"></vue-echart>
            </div>
            <div style="display: table-cell;width: 12.5%;vertical-align: middle">
              <div style="display: inline-block;width: 120px;text-align: left">
                <div style="font-size: 11px">绿化保洁完成率</div>
                <div style="font-size: 10px;margin-top: 12px">
                  <span>占比</span><span style="font-size: 20px;font-weight: bold">18%</span>
                </div>
              </div>
            </div>
            <div style="display: table-cell;width: 12.5%;vertical-align: middle">
              <vue-echart id="ec-5"
                          style="width: 100%;height: 100%"
                          :options="options5"></vue-echart>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20"
            style="margin-top: 20px">
      <el-col :span="12">
        <div class="section-title">
          <label class="first">最近事件</label>
          <label class="second">Recent events</label>
        </div>
        <div v-for="(cells, i) in recentEvents"
             class="recent-row"
             :key="i"
             style="margin-top: 10px">
          <div v-for="(cell, j) in cells"
               class="recent-cell"
               :style="{color:cell.normal?'white':'#07D10C'}"
               :key="j">{{cell.title}}</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="section-title">
          <label class="first">漏洞类型</label>
          <label class="second">Vulnerability type</label>
        </div>
        <div class="block-item"
             style="height: 112px;margin-top: 10px">
          <div style="display: table;width: 100%;height:100%;text-align: center">
            <div style="display: table-cell;width: 50%;vertical-align: middle">
              <div style="display: inline-block;width: 128px">
                <div style="font-size: 20px">15,453,070次</div>
                <div style="font-size: 12px;text-align: right">全部次数</div>
              </div>
            </div>
            <div style="display: table-cell;width: 50%">
              <vue-echart id="ec-6"
                          style="width: 100%;height: 100%"
                          :options="options6"></vue-echart>
            </div>
          </div>
        </div>
        <div class="block-item"
             style="height: 88px;margin-top: 18px">
          <div style="display: table;width: 100%;height:100%;text-align: center">
            <div style="display: table-cell;width: 25%;vertical-align: middle">
              <div style="display: inline-block;width: 120px;text-align: left">
                <div style="font-size: 11px">小区设备</div>
                <div style="font-size: 10px;margin-top: 12px">正常设备运行：100</div>
                <div style="font-size: 10px">异常设备运行：20</div>
              </div>
            </div>
            <div style="display: table-cell;width: 25%">
              <vue-echart id="ec-7"
                          style="width: 100%;height: 100%"
                          :options="options7"></vue-echart>
            </div>
            <div style="display: table-cell;width: 25%;vertical-align: middle">
              <div style="display: inline-block;width: 120px;text-align: left">
                <div style="font-size: 11px">外围设备</div>
                <div style="font-size: 10px;margin-top: 12px">正常设备运行：32</div>
                <div style="font-size: 10px">异常设备运行：9</div>
              </div>
            </div>
            <div style="display: table-cell;width: 25%">
              <vue-echart id="ec-8"
                          style="width: 100%;height: 100%"
                          :options="options8"></vue-echart>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import echarts from 'echarts'
import VueEchart from '../../components/Charts/VueEchart.vue'
import CollectionItem from '../../components/CollectionItem.vue'
import ImgItem1 from '../../assets/img-collection-item-1.png'
import ImgItem2 from '../../assets/img-collection-item-2.png'
import ImgItem3 from '../../assets/img-collection-item-3.png'
import ImgItem4 from '../../assets/img-collection-item-4.png'
import ImgItem5 from '../../assets/img-collection-item-5.png'
import ImgItem6 from '../../assets/img-collection-item-6.png'
export default {
  name: 'IntegrationSys',
  data() {
    let options6Series1 = {
      name: '漏洞统计',
      type: 'pie',
      radius: ['50%', '80%'],
      roseType: 'radius',
      label: {
        show: true,
        normal: {
          position: 'outside',
          fontSize: 12,
        },
      },
      labelLine: {
        length: 1,
        length2: 20,
        smooth: true,
      },
      data: [
        {
          value: 35,
          name: '未授权口令',
          label: {
            color: '#F09819',
          },
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: '#FF5858', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#F09819', // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 15,
          name: '弱口令',
          label: {
            color: 'transparent',
          },
          itemStyle: {
            color: 'transparent',
          },
        },
        {
          value: 15,
          name: '外部入侵',
          label: {
            color: 'transparent',
          },
          itemStyle: {
            color: 'transparent',
          },
        },
        {
          value: 35,
          name: '未知',
          label: {
            color: 'transparent',
          },
          itemStyle: {
            color: 'transparent',
          },
        },
      ],
    }
    let options6Series2 = {
      name: '漏洞统计',
      type: 'pie',
      radius: ['50%', '70%'],
      // roseType: 'radius',
      label: {
        show: true,
        normal: {
          position: 'outside',
          fontSize: 12,
        },
      },
      labelLine: {
        length: 1,
        length2: 20,
        smooth: true,
      },
      data: [
        {
          value: 35,
          name: '未授权口令',
          label: {
            color: 'transparent',
          },
          itemStyle: {
            color: 'transparent',
          },
        },
        {
          value: 15,
          name: '弱口令',
          label: {
            color: '#FA71CD',
          },
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: '#C471F5', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#FA71CD', // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 15,
          name: '外部入侵',
          label: {
            color: '#836DF0',
          },
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: '#B1AFF0', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#836DF0', // 100% 处的颜色
                },
              ],
            },
          },
        },
        {
          value: 35,
          name: '未知',
          label: {
            color: '#00F2FE',
          },
          itemStyle: {
            color: {
              colorStops: [
                {
                  offset: 0,
                  color: '#4FACFE', // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#00F2FE', // 100% 处的颜色
                },
              ],
            },
          },
        },
      ],
    }

    return {
      collectionItems: [
        {
          icon: ImgItem1,
          centerFirst: '人脸识别',
          centerSecond: 'Face detect',
          rightFirst: '使用次数',
          rightSecond: -1292,
        },
        {
          icon: ImgItem2,
          centerFirst: '指纹识别',
          centerSecond: 'Fingerprint',
          rightFirst: '使用次数',
          rightSecond: 612,
        },
        {
          icon: ImgItem3,
          centerFirst: '蓝牙识别',
          centerSecond: 'Bluetooth',
          rightFirst: '使用次数',
          rightSecond: -3252,
        },
        {
          icon: ImgItem4,
          centerFirst: '二维码识别',
          centerSecond: 'QR code',
          rightFirst: '使用次数',
          rightSecond: -60,
        },
        {
          icon: ImgItem5,
          centerFirst: 'IC卡',
          centerSecond: 'IC card',
          rightFirst: '领用次数',
          rightSecond: 67,
        },
        {
          icon: ImgItem6,
          centerFirst: '尾气检测',
          centerSecond: 'Gas test',
          rightFirst: '检测次数',
          rightSecond: 86,
        },
      ],
      recentEvents: [
        [
          {
            title: '序号',
            normal: true,
          },
          {
            title: '活动时间',
            normal: true,
          },
          {
            title: '紧急情况',
            normal: true,
          },
          {
            title: '事件内容',
            normal: true,
          },
        ],
        [
          {
            title: '32',
            normal: true,
          },
          {
            title: '2020-02-17 11:50',
            normal: true,
          },
          {
            title: '高',
            normal: true,
          },
          {
            title: '停车位故障',
            normal: false,
          },
        ],
        [
          {
            title: '31',
            normal: true,
          },
          {
            title: '2020-04-15 12:56',
            normal: true,
          },
          {
            title: '高',
            normal: true,
          },
          {
            title: '聚众斗殴',
            normal: false,
          },
        ],
        [
          {
            title: '30',
            normal: true,
          },
          {
            title: '2020-05-13 14:56',
            normal: true,
          },
          {
            title: '标准',
            normal: true,
          },
          {
            title: '20幢王客户电瓶车失窃',
            normal: false,
          },
        ],
        [
          {
            title: '29',
            normal: true,
          },
          {
            title: '2020-05-13 11:26',
            normal: true,
          },
          {
            title: '高',
            normal: true,
          },
          {
            title: '监控看到12幢住户乱踩花坛',
            normal: false,
          },
        ],
        [
          {
            title: '28',
            normal: true,
          },
          {
            title: '2020-05-11 10:57',
            normal: true,
          },
          {
            title: '低',
            normal: true,
          },
          {
            title: '损坏墙体',
            normal: false,
          },
        ],
      ],
      options1: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          icon: 'emptycircle',
          itemWidth: 10,
          itemHeight: 6,
          data: ['进入', '出去'],
          right: '2%',
          top: '2%',
          textStyle: {
            color: '#c1cadf',
            fontSize: 12,
          },
        },
        grid: {
          left: '2%',
          right: '2%',
          top: '15%',
          bottom: '2%',
          containLabel: true,
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          x: 'right',
          y: 'center',
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: [
              '09:00',
              '12:00',
              '15:00',
              '18:00',
              '21:00',
              '00:00',
              '03:00',
            ],
            axisLine: {
              lineStyle: {
                color: 'transparent',
              },
            },
            axisLabel: {
              interval: 0,
              rotate: '45',
              color: '#c1cadf',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '次数',
            nameTextStyle: {
              color: '#c1cadf',
              align: 'right',
              lineHeight: 10,
            },
            axisLine: {
              lineStyle: {
                color: 'transparent',
              },
            },
            axisLabel: {
              interval: 0,
              color: '#c1cadf',
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: '进入',
            type: 'line',
            smooth: true,
            symbolSize: 8,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(240,152,25,0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(240,199,37,0.01)',
                },
              ]),
            },
            data: [127, 224, 120, 278, 227, 237, 137],
            barWidth: '30%',
            itemStyle: { normal: { color: '#F09819' } },
          },
          {
            name: '出去',
            type: 'line',
            smooth: true,
            symbolSize: 8,
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(188,122,146,0.5)',
                },
                {
                  offset: 1,
                  color: 'rgba(188,122,146,0.2)',
                },
              ]),
            },
            data: [27, 124, 70, 178, 127, 157, 57],
            barWidth: '30%',
            itemStyle: {
              normal: {
                color: '#fff',
              },
            },
          },
        ],
      },
      options2: {
        legend: {
          show: false,
          icon: 'circle',
          bottom: 30,
          center: 0,
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 21,
          orient: 'horizontal',
          data: ['a', 'b'],
          textStyle: {
            fontSize: '70%',
            color: '#8C8C8C',
          },
        },

        radar: {
          radius: '80%',
          triggerEvent: true,
          name: {
            textStyle: {
              color: '#B9BFD6',
              fontSize: '8',
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          nameGap: '2',
          indicator: [
            {
              name: 'PLC',
              max: 100,
            },
            { name: 'SCADR', max: 100 },
            { name: 'DVR', max: 100 },
            { name: 'OWS', max: 100 },
            { name: 'CCD', max: 100 },
          ],
          splitArea: {
            areaStyle: {
              color: [
                'rgba(0,180,255, 0.1)',
                'rgba(0,180,255, 0.2)',
                'rgba(0,180,255, 0.4)',
                'rgba(0,180,255, 0.6)',
                'rgba(0,180,255, 0.8)',
                'rgba(0,180,255, 1)',
              ].reverse(),
            },
          },
          axisLine: {
            // 指向外圈文本的分隔线样式
            lineStyle: {
              color: 'rgba(0,0,0,0)',
            },
          },
          splitLine: {
            lineStyle: {
              width: 0,
              color: [
                'rgba(0,180,255, 0.1)',
                'rgba(0,180,255, 0.2)',
                'rgba(0,180,255, 0.4)',
                'rgba(0,180,255, 0.6)',
                'rgba(0,180,255, 0.8)',
                'rgba(0,180,255, 1)',
              ].reverse(),
            },
          },
        },
        series: [
          {
            name: '一级权重分析',
            type: 'radar',
            // areaStyle: {normal: {}},
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                  { offset: 0, color: '#3ABFFE' },
                  { offset: 1, color: '#0DE6FE' },
                ]),
                opacity: 1,
              },
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: 'transparent',
                width: 0,
              },
            },
            data: [
              {
                value: [70, 66, 60, 75, 72],
                name: '因素',
              },
            ],
          },
        ],
      },
      options3: {
        legend: {
          show: false,
          icon: 'circle',
          bottom: 30,
          center: 0,
          itemWidth: 14,
          itemHeight: 14,
          itemGap: 21,
          orient: 'horizontal',
          data: ['a', 'b'],
          textStyle: {
            fontSize: '70%',
            color: '#8C8C8C',
          },
        },

        radar: {
          radius: '80%',
          triggerEvent: true,
          name: {
            textStyle: {
              color: '#B9BFD6',
              fontSize: '8',
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          nameGap: '2',
          indicator: [
            {
              name: 'AO1',
              max: 100,
            },
            { name: 'SO2', max: 100 },
            { name: 'NO2', max: 100 },
            { name: 'PMP', max: 100 },
            { name: 'PM2.5', max: 100 },
          ],
          splitArea: {
            areaStyle: {
              color: [
                'rgba(136,117,240, 0.1)',
                'rgba(136,117,240, 0.2)',
                'rgba(136,117,240, 0.4)',
                'rgba(136,117,240, 0.6)',
                'rgba(136,117,240, 0.8)',
                'rgba(136,117,240, 1)',
              ].reverse(),
            },
          },
          axisLine: {
            // 指向外圈文本的分隔线样式
            lineStyle: {
              color: 'rgba(0,0,0,0)',
            },
          },
          splitLine: {
            lineStyle: {
              width: 0,
              color: [
                'rgba(136,117,240, 0.1)',
                'rgba(136,117,240, 0.2)',
                'rgba(136,117,240, 0.4)',
                'rgba(136,117,240, 0.6)',
                'rgba(136,117,240, 0.8)',
                'rgba(136,117,240, 1)',
              ].reverse(),
            },
          },
        },
        series: [
          {
            name: '一级权重分析',
            type: 'radar',
            // areaStyle: {normal: {}},
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                  { offset: 0, color: '#A8A8F0' },
                  { offset: 1, color: '#9084F0' },
                ]),
                opacity: 1,
              },
            },
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: 'transparent',
                width: 0,
              },
            },
            data: [
              {
                value: [70, 66, 60, 64, 68],
                name: '因素',
              },
            ],
          },
        ],
      },
      options4: {
        title: {
          text: '60%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: 'white',
            fontSize: '11',
          },
        },
        legend: {
          show: false,
          itemGap: 12,
          data: ['正常', ''],
        },
        color: ['rgba(255, 255, 255, 0.1)'],
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '66%'],
            startAngle: 210,
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: 60,
                name: '01',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#4FACFE', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#00F2FE', // 100% 处的颜色
                        },
                      ],
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: '02',
                value: 40,
              },
            ],
          },
        ],
      },
      options5: {
        title: {
          text: '18%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: 'white',
            fontSize: '11',
          },
        },
        color: ['rgba(255, 255, 255, 0.1)'],
        legend: {
          show: false,
          itemGap: 12,
          data: ['01', '02'],
        },

        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '66%'],
            startAngle: 270,
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: 18,
                name: '01',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#B1AFF0', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#836DF0', // 100% 处的颜色
                        },
                      ],
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: '02',
                value: 82,
              },
            ],
          },
        ],
      },
      options6: {
        legend: {
          orient: 'vertical',
          top: 'center',
          right: '5%',
          data: ['未授权口令', '弱口令', '外部入侵', '未知'],
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
          show: false,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        series: [options6Series1, options6Series2],
      },
      options7: {
        title: {
          text: '70%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: 'white',
            fontSize: '11',
          },
        },
        legend: {
          show: false,
          itemGap: 12,
          data: ['正常', ''],
        },
        color: ['rgba(255, 255, 255, 0.1)'],
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '66%'],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: 70,
                name: '01',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#C471F5', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#9B4BFE', // 100% 处的颜色
                        },
                      ],
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: '02',
                value: 30,
              },
            ],
          },
        ],
      },
      options8: {
        title: {
          text: '37%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: 'white',
            fontSize: '11',
          },
        },
        color: ['rgba(255, 255, 255, 0.1)'],
        legend: {
          show: false,
          itemGap: 12,
          data: ['01', '02'],
        },
        series: [
          {
            name: 'Line 1',
            type: 'pie',
            clockWise: true,
            radius: ['50%', '66%'],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: 37,
                name: '01',
                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: '#00cefc', // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: '#367bec', // 100% 处的颜色
                        },
                      ],
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {
                name: '02',
                value: 63,
              },
            ],
          },
        ],
      },
    }
  },
  methods: {
    handleCommand(cmditem) {
      if (!cmditem) {
        this.$message('菜单选项缺少command属性')
        return
      }
      switch (cmditem) {
        case 'gotoPolice':
          this.gotoPolice()
          break
        case 'gotoSystem':
          this.gotoSystem()
          break
        case 'gotoDang':
          this.gotoDang()
          break
      }
    },
    gotoPolice() {
      this.$router.push('/Integration')
    },
    gotoDang() {
      this.$router.push('/System')
    },
    gotoSystem() {
      this.$router.push('/home')
    },
  },
  components: {
    CollectionItem,
    VueEchart,
  },
}
</script>

<style scoped lang="stylus">
.sub-sys
  padding 40px
  .section-title
    label
      display inline-block
    .first
      font-weight bold
      font-size 13px
    .second
      font-weight bold
      margin-left 20px
      font-size 12px
  .block-item, .recent-row
    background-color #2A2A2A
    border-radius 8px
  .recent-row
    width 100%
    height 28px
    font-size 11px
    display table
    .recent-cell
      padding-left 15px
      display table-cell
      vertical-align middle
      width 25%
      &:first-child
        width 10%
      &:last-child
        width 40%
  .video-item
    height 100px
    border dashed 1px rgba(255, 255, 255, 0.5)
    video
      object-fit fill
  .sel
    float right
    .el-button--primary
      width 270px
      height 34px
      line-height 34px
      font-size 14px
      padding 0
      background-color rgba(42, 42, 42, 1)
      border-color rgba(42, 42, 42, 1)
      border-radius 2px
    .el-icon--right
      margin-left 150px
</style>
