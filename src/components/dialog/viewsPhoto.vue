<template>
  <div class="views-photo">
    <el-dialog :show-close="false"
               @open="open"
               @close="close"
               :visible.sync="dialogVisible"
               width="58%">
      <div class="imglist">
        <div class="imgitem">
          <!-- <img :src="imgstart"
               alt="" /> -->
          <el-image :src="imgstart"
                    fit="cover"
                    style="width: 100%; height: 100%"></el-image>
        </div>
        <div class="imgfooter">
          <span>{{ number }}/{{ imgtotal }}</span>
        </div>
        <div class="imgleft"
             v-if="imglist.length > 1"
             @click="imgleft()">
          <img :src="leftImg"
               alt="" />
        </div>
        <div class="imgright"
             v-if="imglist.length > 1"
             @click="imgright()">
          <img :src="rightImg"
               alt="" />
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    goodsImgsList: {
      type: Array,
      default: () => [],
    }
  },
  data () {
    return {
      imglist: [],
      leftImg: require('../../../src/assets/images/leftImg.png'),
      rightImg: require('../../../src/assets/images/rightImg.png'),
      dialogVisible: false,
      imgstart: '', //图片开始路径
      imgnumber: 0,
      number: 1, //图片开始
      imgtotal: '', //图片总数
    }
  },
  methods: {
    // 控制左移动
    imgleft () {
      if (this.number > 1) {
        this.imgnumber--
        this.number--
        this.imgstart = this.imglist[this.imgnumber]
      }
    },
    // 控制右移动
    imgright () {
      if (this.number < this.imgtotal) {
        this.number++
        this.imgnumber++
        this.imgstart = this.imglist[this.imgnumber]
      }
    },
    // 打开触发
    open () {
      this.imgnumber = 0
      this.number = 1
      this.imgstart = this.imglist[this.imgnumber]
      this.imgtotal = this.imglist.length
      // console.log('打开触发')
    },
    // 关闭触发
    close () {
      // console.log('关闭触发' + this.dialogVisible)
      this.$emit('closeViews')
    },
    getImageList (newValue) {
      let list = []
      let url = ''
      newValue.map(item => {
        url = this.$ImgUrl + item.url
        list.push(url)
        url = ''
      })
      this.imglist = list
      console.log(list)
    },
  },
  watch: {
    isVisible: {
      handler (newValue) {
        this.dialogVisible = this.isVisible
      },
      immediate: true
    },
    goodsImgsList: {
      handler (newValue) {
        if (newValue.length) {
          this.getImageList(newValue)
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
/* .imgbtn {
    cursor: pointer;
    width: 100px;
    height: 40px;
    border-radius: 8px;
    background: skyblue;
    margin: 200px auto;
    opacity: 0.8;
}

.imgbtn:hover {
    opacity: 1;
} */
.imgitem {
    width: 100%;
    height: 665px;
    font-style: 0;
}
/* .imgitem img {
    width: 100%;
    height: 100%;
    font-size: 0;
    z-index: 10;
} */
.imglist {
    position: relative;
}
.imgfooter {
    z-index: 100;
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
}
.imgfooter span {
    font-size: 20px;
    font-size: 20px;
    font-weight: 500;
    color: #ffffff;
    line-height: 28px;
}
.imgleft img,
.imgright img {
    width: 100%;
}
.imgleft,
.imgright {
    cursor: pointer;
    position: relative;
    width: 24px;
    height: 40px;
}
.imgleft {
    position: absolute;
    top: 50%;
    left: 20px;
}
.imgright {
    position: absolute;
    top: 50%;
    right: 20px;
}
</style>
