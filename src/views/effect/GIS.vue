<template>
  <div class="location">
    <div id="map" class="map-container"></div>
    <el-dialog
      title="数据预览"
      :visible.sync="dialogPreviewVisible"
      :modal="false"
      width="400px"
    >
      <el-card class="preview-card">
        <div slot="header">
          <span>{{ '设备名称' }}: {{currentDevice.facName}}</span>
          <el-button type="primary" size="mini" style="float: right;" @click="handleClickDetail">{{ '详情' }}</el-button>
        </div>
        <div v-if="entity.length > 0">{{ '更新时间' }}: {{entity[0].datetime}}</div>
        <div v-for="(item, index) in entity" :key="index">
          {{`${item.eName}: ${item.eValue} ${item.eUnit}`}}
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'location',
  data() {
    return {
      devices: null,
      searchLocation: null,
      map: null,
      dialogPreviewVisible: false,
      currentDevice: {},
      entity: [],
      geocoder: null,
    };
  },
  methods: {
    handleSearchChange(value) {
      if (value.indexOf(',') === -1) {
        this.geocoder.getLocation(value, (status, result) => {
          if (status === 'complete') {
            this.map.setZoomAndCenter(16, new AMap.LngLat(result.geocodes[0].location.lng, result.geocodes[0].location.lat));
          }
        });
      } else {
        const lngLat = value.split(',');
        const point = new AMap.LngLat(parseFloat(lngLat[0].trim()), parseFloat(lngLat[1].trim()));
        this.map.setZoomAndCenter(16, point);
      }
    },
    handleClickDetail() {
      this.$store.commit('currentDeviceId', { currentDeviceId: this.currentDevice.facId });
      this.$router.push('/effect/data');
    },
  },
  mounted() {
    this.$store.commit('searchKeyword', { searchKeyword: '' });
    const username = sessionStorage.getItem('username');
    const lang = localStorage.getItem('language');

    const map = new AMap.Map('map', {
      resizeEnable: true,
      zoom: 16,
      center: [114.426986, 30.436675],
      lang: lang === 'en_US' ? 'en' : 'zh_cn',
    });
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Geocoder'], () => {
      const scale = new AMap.Scale();
      map.addControl(scale);
      this.geocoder = new AMap.Geocoder();
    });

    const markerIcon = new AMap.Icon({
      size: new AMap.Size(50, 50),
      image: `http://${this.$HOST}:5503/images/onstage/location.png`,
      imageSize: new AMap.Size(50, 50),
    });

    this.$http
      .get(`/user/${username}`, {
        headers: {
          token: sessionStorage.getItem('token'),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const { data } = response;
          this.devices = JSON.parse(JSON.stringify(data.devices));
          for (let i = 0; i < this.devices.length; i += 1) {
            const marker = new AMap.Marker({
              position: new AMap.LngLat(this.devices[i].longitude ? this.devices[i].longitude : 0, this.devices[i].latitude ? this.devices[i].latitude : 0),
              icon: markerIcon,
            });
            marker.on('click', () => {
              this.dialogPreviewVisible = true;
              this.currentDevice = this.devices[i];
              this.$http
                .get(`/intfa/queryData/${this.devices[i].facId}`)
                .then((res) => {
                  this.entity = res.data.entity;
                })
                .catch((error) => console.log(error));
            });
            marker.setTitle(this.devices[i].facName);
            map.add([marker]);
          }
        }
      })
      .catch((error) => console.log(error));

    this.map = map;
  },
  computed: {
    language() {
      return this.$store.state.language;
    },
  },
  watch: {
    language() {
      switch (this.language) {
        case 'zh_CN':
          this.map.setLang('zh_cn');
          break;
        case 'en_US':
          this.map.setLang('en');
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.location {
  width: 100%;
  height: 100%;
  .map-container {
    width: 100%;
    height: 100%;
  }

  .location-search {
    position: fixed;
    top: 100px;
    left: 250px;
    width: 350px;
  }
}

.el-select .el-input {
  width: 130px;
}

.preview-card {
  text-align: left;
}

.location::v-deep .amap-logo {
  display: none;
  opacity:0 !important;
}
.location::v-deep .amap-copyright {
  display: none;
  opacity:0 !important;
}

</style>
