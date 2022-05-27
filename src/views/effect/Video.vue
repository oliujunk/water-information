<template>
  <div class="video">
    <DeviceList :devices="deviceList"></DeviceList>
    <el-scrollbar style="width: 100%; height: 100%;">
      <el-tabs
        v-model="currentPane"
        class="content-contanier"
      >
        <el-tab-pane :key="0" label="视频监控" name="video">
          <div>
            <el-row>
              <el-col :span="18">
                <div class="video-container">
                  <video
                    id="video-element"
                    class="video-js vjs-default-skin video-content"
                    controls
                    preload="auto"
                    autoplay
                    :poster="`http://${$HOST}:8081/images/摄像机.jpg`"
                  >
                    <source :src="video.address" type="application/x-mpegURL">
                  </video>
                </div>
              </el-col>
              <el-col :span="6">
                <el-row style="min-width: 340px;">
                  <el-col :span="14" style="min-width: 200px;">
                    <el-row>
                      <el-tooltip content="按住向左上移动" placement="top-start">
                        <el-button @mousedown.native="videoMove(4)" @mouseup.native="videoStop" icon="el-icon-third-zuoshang" style="height: 60px;"></el-button>
                      </el-tooltip>
                      <el-tooltip content="按住向上移动" placement="top">
                        <el-button @mousedown.native="videoMove(0)" @mouseup.native="videoStop" icon="el-icon-third-shang" style="height: 60px;"></el-button>
                      </el-tooltip>
                      <el-tooltip content="按住向右上移动" placement="top-end">
                        <el-button @mousedown.native="videoMove(6)" @mouseup.native="videoStop" icon="el-icon-third-youshang" style="height: 60px;"></el-button>
                      </el-tooltip>
                    </el-row>
                    <el-row>
                      <el-tooltip content="按住向左移动" placement="left">
                        <el-button @mousedown.native="videoMove(2)" @mouseup.native="videoStop" icon="el-icon-third-zuo" style="height: 60px; margin-top: 10px;"></el-button>
                      </el-tooltip>
                      <el-tooltip content="点击抓拍" placement="top">
                        <el-button type="primary" @click="handleCapture" icon="el-icon-third-zhuapai"></el-button>
                      </el-tooltip>
                      <el-tooltip content="按住向右移动" placement="right">
                        <el-button @mousedown.native="videoMove(3)" @mouseup.native="videoStop" icon="el-icon-third-you" style="height: 60px;"></el-button>
                      </el-tooltip>
                    </el-row>
                    <el-row>
                      <el-tooltip content="按住向左下移动" placement="bottom-start">
                        <el-button @mousedown.native="videoMove(5)" @mouseup.native="videoStop" icon="el-icon-third-zuoxia" style="height: 60px; margin-top: 10px;"></el-button>
                      </el-tooltip>
                      <el-tooltip content="按住向下移动" placement="bottom">
                        <el-button @mousedown.native="videoMove(1)" @mouseup.native="videoStop" icon="el-icon-third-xia" style="height: 60px;"></el-button>
                      </el-tooltip>
                      <el-tooltip content="按住向右下移动" placement="bottom-end">
                        <el-button @mousedown.native="videoMove(7)" @mouseup.native="videoStop" icon="el-icon-third-youxia" style="height: 60px;"></el-button>
                      </el-tooltip>
                    </el-row>
                  </el-col>
                  <el-col :span="10" style="min-width: 130px;">
                    <el-row>
                      <el-tooltip content="按住拉近焦距" placement="top-start">
                        <el-button @mousedown.native="videoMove(10)" @mouseup.native="videoStop" icon="el-icon-third-jinjiao" style="height: 60px;"></el-button>
                      </el-tooltip>
                      <el-tooltip content="按住拉远焦距" placement="top-end">
                        <el-button @mousedown.native="videoMove(11)" @mouseup.native="videoStop" icon="el-icon-third-yuanjiao" style="height: 60px;"></el-button>
                      </el-tooltip>
                    </el-row>
                    <el-row>
                      <el-tooltip content="按住放大" placement="top">
                        <el-button @mousedown.native="videoMove(8)" @mouseup.native="videoStop" icon="el-icon-third-fangda" style="height: 60px; margin-top: 10px;"></el-button>
                      </el-tooltip>
                      <el-tooltip content="按住缩小" placement="top">
                        <el-button @mousedown.native="videoMove(9)" @mouseup.native="videoStop" icon="el-icon-third-suoxiao" style="height: 60px;"></el-button>
                      </el-tooltip>
                    </el-row>
                    <el-row>
                      <el-tooltip content="点击水平翻转图像" placement="bottom-start">
                        <el-button @click="videoMirror(1)" icon="el-icon-third-shuipingfanzhuan" style="height: 60px; margin-top: 10px;"></el-button>
                      </el-tooltip>
                      <el-tooltip content="点击垂直翻转图像" placement="bottom-end">
                        <el-button @click="videoMirror(0)" icon="el-icon-third-chuizhifanzhuan" style="height: 60px;"></el-button>
                      </el-tooltip>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-divider content-position="left">{{'抓拍'}}</el-divider>
            <div class="photo-container">
              <el-card
                v-for="(item, index) in photo.records"
                :key="index"
                class="photo"
                :body-style="{ padding: '0px' }"
              >
                <viewer>
                  <img :src="item.url">
                </viewer>
                <div style="padding-left: 14px;">
                  <div style="padding-top: 2px; padding-right: 10px;">
                    <el-tag size="mini">{{ item.name }}</el-tag>
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      circle
                      size="mini"
                      @click="handleChangePhotoInfo(item)"
                      style="float: right;"
                    ></el-button>
                  </div>
                  <div style="padding-top: 10px; padding-right: 10px;">
                    <el-tag size="mini">{{ item.createTime }}</el-tag>
                    <el-button
                      type="danger"
                      icon="el-icon-delete"
                      circle
                      size="mini"
                      @click="handlePhotoDelete(item)"
                      style="float: right;"
                    ></el-button>
                  </div>
                </div>
              </el-card>
            </div>
            <el-pagination
              background
              layout="total, prev, pager, next, jumper"
              :total="photo.total"
              :page-size="8"
              :current-page.sync="photo.current"
              @current-change="handleCaptureCurrentChange"
              style="text-align: left; margin-bottom: 20px;"
            ></el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script>
import qs from 'qs';
import videojs from 'video.js';
import 'video.js/dist/video-js.min.css';
import DeviceList from '../components/DeviceList.vue';

export default {
  name: 'Video',

  data() {
    return {
      token: '',
      currentPane: 'video',
      deviceList: [97316343, 97316437, 97316463, 97316496, 97316507, 97316515, 97316524, 97316550, 10283679, 10283682, 10283732, 10283862],
      video: {
        hasVideo: true, // 是否有摄像头
        hasHolder: false, // 是否有云台，可控制摄像头移动
        address: '',
        token: '',
        serialNumber: '',
        channel: 0,
        player: null,
      },
      photo: {},
    };
  },

  components: {
    DeviceList,
  },

  methods: {
    getVideoInfo(deviceId) {
      this.$http
        .get(`/video/${deviceId}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.data) {
            this.video.hasVideo = true;
            const {
              type, accessToken, channel, serialNumber, hls,
            } = response.data;
            if (type === 1) this.video.hasHolder = true;
            else this.video.hasHolder = false;
            this.video.token = accessToken;
            this.video.serialNumber = serialNumber;
            this.video.channel = channel;
            this.video.address = hls;
            if (!this.hasElement && !this.hasRelay) {
              this.currentPane = 'video';
            }

            setTimeout(() => {
              this.videoInit();
            }, 500);
          } else {
            this.video.hasVideo = false;
            if (!this.hasElement && !this.hasRelay && this.hasPhoto) {
              this.currentPane = 'photo';
              this.getPhotos(this.currentDeviceId, 1, 8);
            }
          }
        })
        .catch((error) => console.log(error));
    },
    videoInit() {
      if (!this.video.player) {
        this.video.player = videojs('video-element', {
          posterImage: true,
          errorDisplay: false,
          controlBar: true,
        });
      }
      this.video.player.src({
        src: this.video.address,
        type: 'application/x-mpegURL',
      });
      this.video.player.play();
    },
    videoMove(direction) {
      const payload = {
        accessToken: this.video.token,
        deviceSerial: this.video.serialNumber,
        channelNo: this.video.channel,
        direction,
        speed: 1,
      };
      this.$http
        .post('https://open.ys7.com/api/lapp/device/ptz/start', qs.stringify(payload))
        .then((response) => {
          console.log(response.data);
          if (response.data.code !== '200') {
            this.$notify.error({
              title: '摄像头',
              message: response.data.msg,
            });
          }
        })
        .catch();
    },
    videoStop() {
      const payload = {
        accessToken: this.video.token,
        deviceSerial: this.video.serialNumber,
        channelNo: this.video.channel,
      };
      this.$http
        .post('https://open.ys7.com/api/lapp/device/ptz/stop', qs.stringify(payload))
        .then((response) => {
          console.log(response.data);
          if (response.data.code !== '200') {
            this.$notify.error({
              title: '摄像头',
              message: response.data.msg,
            });
          }
        })
        .catch();
    },
    videoMirror(command) {
      const payload = {
        accessToken: this.video.token,
        deviceSerial: this.video.serialNumber,
        channelNo: this.video.channel,
        command,
      };
      this.$http
        .post('https://open.ys7.com/api/lapp/device/ptz/mirror', qs.stringify(payload))
        .then((response) => {
          console.log(response.data);
          if (response.data.code !== '200') {
            this.$notify.error({
              title: '摄像头',
              message: response.data.msg,
            });
          }
        })
        .catch();
    },

    getPhotos(deviceId, type, pageNum, pageSize) {
      this.photo.list = [];
      this.$http
        .get(`/photo/${deviceId}`, {
          params: {
            type,
            pageNum,
            pageSize,
          },
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.photo = response.data;
          }
        })
        .catch();
    },
    handlePhotosCurrentChange(current) {
      this.getPhotos(this.currentDeviceId, 0, current, this.photo.size);
    },
    handleClickZoom() {
      this.loadingZoom = true;
      this.$http
        .post('/photo', {
          deviceId: this.currentDeviceId,
          focalLength: this.photoZoom,
        }, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.data) {
            this.$message.success(this.$t('home.photo.zoomSuccess'));
          } else {
            this.$message.error(this.$t('home.photo.zoomError'));
          }
          this.loadingZoom = false;
        })
        .catch(() => {
          this.$message.error(this.$t('home.photo.zoomError'));
          this.loadingZoom = false;
        });
    },
    handleCapture() {
      this.$http
        .get(`/video/capture/${this.currentDeviceId}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          console.log(response.data);
          if (response.data) {
            this.$notify.success({
              title: '摄像头',
              message: '抓拍成功',
            });
          } else {
            this.$notify.error({
              title: '摄像头',
              message: '抓拍失败',
            });
          }
        })
        .catch(() => {
          this.$notify.error({
            title: '摄像头',
            message: '抓拍失败',
          });
        });
    },
    handleCaptureCurrentChange(current) {
      this.getPhotos(this.currentDeviceId, 1, current, this.photo.size);
    },

  },

  computed: {
    currentDeviceId() {
      return this.$store.state.currentDeviceId;
    },
  },

  watch: {
    currentDeviceId() {
      this.getVideoInfo(this.currentDeviceId);
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.content-contanier {
  margin-left: 20px;
  min-width: 700px;
}

.tag {
  text-align: left;
  margin-left: 20px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1100px;
}

.element-data {
  margin-top: 15px;
  font-size: 18px;
}
.element-data1 {
  margin-top: 5px;
  font-size: 16px;
}

.photo {
  width: 300px;
  height: 270px;
  text-align: left;
  margin: 10px;
  img {
    width: 300px;
    height: 200px;
    overflow: hidden;
  }
}

.photo-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1300px;
}

.element-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
}

.today-table {
  width: 90%;
  margin-left: 10px;
}

.easy-chart {
  width: 90%;
  height: 400px;
  flex-wrap: wrap;
  margin-left: 10px;
  margin-bottom: 20px;
}

.device-information {
  width: 400px;
  max-height: 600px;
  margin-right: 50px;
  min-width: 300px;
  @media screen and (max-width: 1440px) {
    width: 300px;
    max-height: 600px;
    margin-right: 10px;
    min-width: 300px;
  }
  .device-cover {
    width: 100%;
    max-height: 100%;
  }
  img {
    width: 100%;
    max-height: 400px;
  }
}

.relay-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
}

.log-information {
  margin-top: 20px;
  min-width: 400px;
}

.video-container {
  width:100%;
  position:relative;
  padding-bottom:56.25%;    /*需要用padding来维持16:9比例,也就是9除以16*/
  height: 0;
}

.video-content {
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  height: 100%
}

.capture-button {
  text-align: left;
  margin-left: 20px;
  margin-top: 20px;
}

.relay-setting-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.pest-container {
  display: flex;
  flex-wrap: wrap;
}

.pest-block {
  width: 240px;
  height: 100px;
  margin: 10px;
  background-color: #909399;
  display: flex;
  border-radius: 3px;
}
.open {
  background-color: #67C23A;
}

.pest-block .image {
  width: 64px;
  height: 64px;
  color: white;
  margin-top: 20px;
  margin-left: 20px;
}
.pest-block .name {
  color: white;
  font-size: 20px;
  margin-top: 15px;
}
.pest-block .value {
  color: white;
  font-size: 20px;
  margin-top: 10px;
}
.pest-data-block {
  background-color: #409EFF;
}

.pest-photo-container {
  display: flex;
  flex-wrap: wrap;
}
.pest-photo {
  width: 300px;
  height: 200px;
  margin: 10px;
  img {
    width: 300px;
    height: 200px;
    overflow: hidden;
  }
}

.search-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  width: 99%;
}

.search-select {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  min-height: 40px;
  max-width: 1500px;
  margin: 5px;
  margin-right: 20px;
  .interval {
    width: 100px;
    margin-left: 10px;
  }
  .date-range {
    margin-left: 10px;
    margin-right: 10px;
  }
}

.history-table {
  height: 800px;
  @media screen and (max-width: 1440px) {
    height: 600px;
  }
}

.search-table {
  width: 99%;
}
</style>
