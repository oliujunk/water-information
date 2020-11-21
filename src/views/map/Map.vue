<template>
  <div class="dispatch">
    <div id="map" class="map-container"></div>
    <el-dialog
      title="水资源调度"
      :visible.sync="dialogDiapatchVisible"
      :modal="false"
      width="600px"
    >
      <el-card>
        <el-form :model="dispatch">
          <el-form-item label="区域总水量" label-width="100px">
            <el-input-number v-model="dispatch.totalWater" placeholder=""></el-input-number>m3
          </el-form-item>
          <el-form-item label="雨量" label-width="100px">
            <el-input-number v-model="dispatch.rainfall" placeholder=""></el-input-number>m3
          </el-form-item>
          <el-form-item label="预计雨量" label-width="100px">
            <el-input-number v-model="dispatch.futureRainfall" placeholder=""></el-input-number>m3
          </el-form-item>
          <el-form-item label="灌区需水量" label-width="100px">
            <el-input-number v-model="dispatch.demand" placeholder=""></el-input-number>m3
          </el-form-item>
          <el-form-item label="灌区给水量" label-width="100px">
            <el-input-number v-model="dispatch.supply" placeholder=""></el-input-number>m3
          </el-form-item>
        </el-form>
      </el-card>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      map: null,
      dialogDiapatchVisible: false,
      dispatch: {
        totalWater: 15,
        rainfall: 1,
        futureRainfall: 2,
        demand: 3,
        supply: 2,
      },
    };
  },
  methods: {
  },
  mounted() {
    const map = new AMap.Map('map', {
      resizeEnable: true,
      zoom: 12,
      center: [130.553343, 46.239185],
      lang: 'zh_cn',
    });
    AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.DistrictSearch'], () => {
      const scale = new AMap.Scale();
      map.addControl(scale);
    });

    const layers = [
      new AMap.TileLayer.Satellite(),
      new AMap.TileLayer.RoadNet(),
    ];
    map.setLayers(layers);

    const path = [
      new AMap.LngLat(126.459462, 46.309068),
      new AMap.LngLat(126.618006, 46.308764),
      new AMap.LngLat(126.617986, 46.181787),
      new AMap.LngLat(126.459440, 46.182091),
    ];

    const text = new AMap.Text({
      text: '兰西灌区',
      anchor: 'center', // 设置文本标记锚点
      draggable: true,
      cursor: 'pointer',
      angle: 10,
      position: [126.529462, 46.259068],
    });
    text.on('click', () => {
      this.dialogDiapatchVisible = true;
    });
    // text.setMap(map);

    const polyline = new AMap.Polygon({
      path,
      fillColor: '#fff',
      fillOpacity: 0.5,
      borderWeight: 1, // 线条宽度，默认为 1
      strokeColor: 'blue', // 线条颜色
      lineJoin: 'round', // 折线拐点连接处样式
    });

    polyline.on('click', () => {
      this.dialogDiapatchVisible = true;
    });

    // map.add(polyline);

    const district = new AMap.DistrictSearch({
      // 返回行政区边界坐标等具体信息
      extensions: 'all',
      // 设置查询行政区级别为 区
      level: 'district',
    });

    district.search('桦南县', (status, result) => {
      const bounds = result.districtList[0].boundaries;
      const polygons = [];
      if (bounds) {
        for (let i = 0, len = bounds.length; i < len; i += 1) {
          // 生成行政区划polygon
          const polygon = new AMap.Polygon({
            map,
            strokeWeight: 1,
            path: bounds[i],
            fillOpacity: 0.7,
            fillColor: '#CCF3FF',
            strokeColor: '#CC66CC',
          });
          polygons.push(polygon);
        }
        // 地图自适应
        map.setFitView();
      }
    });

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
.dispatch {
  width: 100%;
  height: 100%;
  .map-container {
    width: 100%;
    height: 100%;
  }
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
