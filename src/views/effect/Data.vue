<template>
  <div class="data">
    <DeviceList :devices="deviceList"></DeviceList>
    <el-scrollbar style="width: 100%; height: 100%;">
      <el-tabs
        v-model="currentPane"
        @tab-click="handleClickTab"
        class="content-contanier"
      >
        <el-tab-pane :key="0" label="数据预览" name="data">
          <div>
            <div style="display: flex; justify-content: space-between;">
              <div>
                <div class="tag">
                  <el-tag>{{'更新时间: '}}{{ moment(elementData.dataTime).format('YYYY-MM-DD HH:mm:ss') }}</el-tag>
                  <el-tag style="margin-left: 20px;" v-if="device">{{'设备ID: '}}{{ device.facId }}</el-tag>
                </div>
                <div class="element-container">
                  <el-card
                    class="element-card"
                    v-for="(item, index) in element"
                    :key="index"
                    :body-style="cardStyle()"
                  >
                    <div>
                      <img :src="`http://${$HOST}:8081/images/onstage/element/${item.index}.png`" class="image">
                    </div>
                    <div style="width: 100%; text-align: center; color: white;">
                      <span class="element-name">{{ item.name }}</span>
                      <div v-if="item.index === '109' && elementData[item.ch] !== 32767" class="element-data1">
                        {{ accMul(elementData[item.ch], item.prec) + ' ' + item.unit }}<br>
                        {{ calWindDirection(elementData[item.ch]) }}
                      </div>
                      <div v-else-if="item.index === '108' && elementData[item.ch] !== 32767" class="element-data1">
                        {{ accMul(elementData[item.ch], item.prec) + ' ' + item.unit }}<br>
                        {{ calWindSpeed(elementData[item.ch]) + ' 级' }}
                      </div>
                      <div v-else-if="item.index === '143' && elementData[item.ch] !== 32767" class="element-data1">
                        {{ accMul(elementData[item.ch], item.prec) + ' ' + item.unit }}<br>
                        {{ calWindSpeed(elementData[item.ch]/10) + ' 级' }}
                      </div>
                      <div v-else-if="elementData[item.ch] !== 32767" class="element-data">
                        {{ accMul(elementData[item.ch], item.prec) + ' ' + item.unit }}
                      </div>
                      <div v-else class="element-data">
                        {{ '------' + ' ' + item.unit }}
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
              <div class="device-information">
                <el-card :body-style="{ padding: '0px' }" class="device-cover">
                  <img v-if="device && device.coverUrl" :src="device.coverUrl">
                  <img v-else :src="`http://${$HOST}:8081/images/onstage/login_bg.jpg`">
                  <div style="display: flex; padding-left: 10px; justify-content: space-between;">
                    <div>
                      <div style="text-align: left;" v-if="device">{{'设备名称: '}}{{ device.facName }}</div>
                      <div style="text-align: left;" v-if="device">{{'设备ID: '}}{{ device.facId }}</div>
                    </div>
                    <div style="margin-right: 10px;">
                      <el-upload
                        :action="`${this.$API_BASE_URL}/device/upload`"
                        :headers="{ token }"
                        :data="{ deviceId: elementData.facId }"
                        :before-upload="beforeUploadDevice"
                        :on-success="handleUploaddCoverSuccess"
                        :show-file-list="false"
                      >
                        <el-button size="small" type="primary">{{'上传'}}</el-button>
                      </el-upload>
                    </div>
                  </div>
                </el-card>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :key="1" label="控制" name="control">
          <div style="display: flex;">
            <div class="relay-container">
              <div class="relay-container">
                <el-card
                  v-for="(item, index) in relayElement"
                  :key="index"
                  class="switch-card"
                  v-loading="relayLoading[index]"
                  element-loading-text="加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                  <img :src="`http://${$HOST}:8081/images/onstage/element/${item.index}.png`" class="image">
                  {{ item.name }}
                  <br>
                  <el-switch
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    v-model="relayStateBit[item.num]"
                    :active-value="1"
                    :inactive-value="0"
                    @change="handleSwitchChange(index, item.ch, item.num, relayStateBit[item.num])"
                  ></el-switch>
                </el-card>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :key="2" label="数据查询" name="search">
          <div class="search-container">
            <div class="search-select">
              <el-select v-model="interval" placeholder="间隔" class="interval" size="mini">
                <el-option
                  v-for="(item, index) in intervalOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-date-picker
                v-model="dateRange"
                type="datetimerange"
                range-separator="~"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                class="date-range"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="handleDateChange"
                size="mini"
              ></el-date-picker>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="handleSearchHistoryDataByDate"
                :disabled="!searchReady"
                size="mini"
              >{{'查询'}}
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-download"
                @click="handleExport(element)"
                size="mini"
              >{{'导出'}}
              </el-button>
            </div>
            <div class="search-table">
              <el-table
                :data.sync="historys"
                size="mini"
                border
                stripe
                highlight-current-row
                style="width: 100%;"
                v-loading="tableLoading"
              >
                <el-table-column
                  fixed
                  prop="dataTime"
                  width="150"
                  label="日期"
                  align="center"
                ></el-table-column>
                <el-table-column
                  v-for="(item, index) in element"
                  :key="index"
                  :prop="item.ch"
                  :label="`${item.name}\n(${item.unit})`"
                  min-width="90"
                  show-overflow-tooltip
                  align="center"
                ></el-table-column>
              </el-table>
              <el-pagination
                background
                layout="total, prev, pager, next, jumper"
                :total="total"
                :page-size="pageSize"
                :current-page.sync="currentPage"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                style="text-align: right; margin: 10px;"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </div>
</template>

<script>
import moment from 'moment';
import { accMul } from '../../utils/index';
import DeviceList from '../components/DeviceList.vue';

export default {
  name: 'Data',

  data() {
    return {
      moment,
      device: null,
      name: '',
      token: '',
      elementData: {},
      relayStateByte: [],
      relayStateBit: [],
      element: [],
      cardStyle: () => {
        const background = `hsl(${((Math.random() * 1000) % 270) + 90}, ${((Math.random() * 1000) % 40) + 60}%, ${((Math.random() * 1000) % 40) + 20}%`;
        return {
          display: 'flex',
          width: '100%',
          'padding-top': '20px',
          background,
        };
      },
      currentPane: 'data',
      relayElement: [],
      relayExtendElement: [],
      relayLoading: [],
      relayExtendLoading: [],
      accMul,
      hasElement: true,
      hasRelay: false, // 是否有继电器
      lineChart: null,
      direction: [
        '正北',
        '东北偏北',
        '东北',
        '东北偏东',
        '正东',
        '东南偏东',
        '东南',
        '东南偏南',
        '正南',
        '西南偏南',
        '西南',
        '西南偏西',
        '正西',
        '西北偏西',
        '西北',
        '西北偏北',
      ],
      calWindDirection: (arg) => {
        let windDirection = '正北';
        if (arg < 12) {
          windDirection = this.direction[0];
        } else if (arg < 34) {
          windDirection = this.direction[1];
        } else if (arg < 57) {
          windDirection = this.direction[2];
        } else if (arg < 79) {
          windDirection = this.direction[3];
        } else if (arg < 102) {
          windDirection = this.direction[4];
        } else if (arg < 124) {
          windDirection = this.direction[5];
        } else if (arg < 147) {
          windDirection = this.direction[6];
        } else if (arg < 169) {
          windDirection = this.direction[7];
        } else if (arg < 192) {
          windDirection = this.direction[8];
        } else if (arg < 214) {
          windDirection = this.direction[9];
        } else if (arg < 237) {
          windDirection = this.direction[10];
        } else if (arg < 259) {
          windDirection = this.direction[11];
        } else if (arg < 282) {
          windDirection = this.direction[12];
        } else if (arg < 304) {
          windDirection = this.direction[13];
        } else if (arg < 327) {
          windDirection = this.direction[14];
        } else if (arg < 349) {
          windDirection = this.direction[15];
        } else if (arg <= 360) {
          windDirection = this.direction[0];
        }
        return windDirection;
      },
      calWindSpeed: (arg) => {
        const speed = arg / 10;
        let windSpeed = 0;
        if (speed <= 0.2) {
          windSpeed = 0;
        } else if (speed <= 1.5) {
          windSpeed = 1;
        } else if (speed <= 3.3) {
          windSpeed = 2;
        } else if (speed <= 5.4) {
          windSpeed = 3;
        } else if (speed <= 7.9) {
          windSpeed = 4;
        } else if (speed <= 10.7) {
          windSpeed = 5;
        } else if (speed <= 13.8) {
          windSpeed = 6;
        } else if (speed <= 17.1) {
          windSpeed = 7;
        } else if (speed <= 20.7) {
          windSpeed = 8;
        } else if (speed <= 24.4) {
          windSpeed = 9;
        } else if (speed <= 28.4) {
          windSpeed = 10;
        } else if (speed <= 32.6) {
          windSpeed = 11;
        } else if (speed <= 36.9) {
          windSpeed = 12;
        } else {
          windSpeed = '超过12';
        }
        return windSpeed;
      },
      deviceList: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112],

      searchReady: false,
      searchMode: 'default',
      historys: [],
      pageSize: 15,
      interval: 1,
      dateRange: [],
      intervalOptions: [
        { value: 1, label: '1分钟' },
        { value: 2, label: '2分钟' },
        { value: 5, label: '5分钟' },
        { value: 10, label: '10分钟' },
        { value: 30, label: '30分钟' },
        { value: 60, label: '1分钟' },
        { value: 240, label: '4分钟' },
        { value: 360, label: '6分钟' },
        { value: 720, label: '12分钟' },
        { value: 1440, label: '24分钟' },
      ],
      tableLoading: false,
      total: 0,
      currentPage: 1,
    };
  },

  components: {
    DeviceList,
  },

  methods: {
    getDeviceData(deviceId) {
      this.$http
        .get(`/data/${deviceId}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            if (typeof (response.data) !== 'string') {
              this.elementData = response.data;
              this.relayStateByte = [];
              for (let i = 0; i < 32; i += 1) {
                this.relayStateByte.push(this.elementData[`j${i + 1}`]);
              }
              this.relayStateBit = [];
              for (let i = 0; i < 256; i += 1) {
                this.relayStateBit.push(((this.relayStateByte[i % 32] >> (i / 32)) & 0x01));
              }
              this.$store.commit('dataRefresh', { dataRefresh: false });
              for (let i = 0, len = this.element.length; i < len; i += 1) {
                const cardStyle = {
                  h: (Math.random() * 1000) % 360,
                  s: ((Math.random() * 1000) % 40) + 50,
                  l: ((Math.random() * 1000) % 40) + 50,
                };
                this.cardStyle[i] = {
                  background: `hsl(${cardStyle.h}, ${cardStyle.s}%, ${
                    cardStyle.l
                  }%)`,
                };
              }
            } else {
              this.elementData = {};
            }
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 403) {
              sessionStorage.removeItem('username');
              sessionStorage.removeItem('token');
            } else {
              this.elementData = {};
            }
          }
        });
    },
    getDeviceInfo(deviceId) {
      this.$http
        .get(`/device/${deviceId}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.device = JSON.parse(JSON.stringify(response.data));
            this.name = response.data.facName;
            this.hasPhoto = response.data.photo;
            const eleNum = response.data.eleNum.split('/');
            const eleName = response.data.eleName.split('/');
            const element = [];
            eleNum.forEach((item, index) => {
              if (item !== '100') {
                const detail = this.getDetail(item);
                if (eleName[index] !== '-') {
                  detail.name = eleName[index];
                }
                detail.ch = `e${index + 1}`;
                element.push(detail);
              }
            });
            this.element = element;
            if (element.length >= 1) {
              this.hasElement = true;
              this.currentPane = 'data';
            } else { this.hasElement = false; }

            const relayNum = response.data.relayNum.split('/');
            const relayName = response.data.relayName.split('/');
            const relayElement = [];
            this.relayLoading = [];
            for (let i = 0; i < 32; i += 1) {
              if (relayNum[i] === '0') continue;
              const detail = this.getRelayDetail(parseInt(relayNum[i], 10));
              if (relayName[i] !== '-') {
                detail.name = relayName[i];
              }
              detail.ch = `j${i + 1}`;
              detail.num = i;
              relayElement.push(detail);
              this.relayLoading.push(false);
            }
            this.relayElement = relayElement;
            if (relayElement.length >= 1) {
              this.hasRelay = true;
              if (!this.hasElement) {
                this.currentPane = 'control';
                this.getControlLog(this.currentDeviceId, 1, 5);
              }
            } else { this.hasRelay = false; }

            this.relayExtendLoading = [];
            this.relayExtendElement = [];
            if (response.data.relayExtend) {
              const relayExtendNum = response.data.relayExtendNum.split('/');
              const relayExtendName = response.data.relayExtendName.split('/');
              const { relayExtendCount } = response.data;
              const relayExtendElement = [];
              for (let i = 0; i < relayExtendCount; i += 1) {
                if (relayExtendNum[i] === '0') continue;
                const detail = this.getRelayDetail(parseInt(relayExtendNum[i], 10));
                if (relayExtendName[i] !== '-') {
                  detail.name = relayExtendName[i];
                }
                detail.ch = `j${i + 33}`;
                detail.num = i + 32;
                relayExtendElement.push(detail);
                this.relayExtendLoading.push(false);
              }
              this.relayExtendElement = relayExtendElement;
            }

            if (response.data.elementExtend) {
              const elementExtendNum = response.data.elementExtendNum.split('/');
              const elementExtendName = response.data.elementExtendName.split('/');
              elementExtendNum.forEach((item, index) => {
                if (item !== '100') {
                  const detail = this.getDetail(item);
                  if (elementExtendName[index] !== '-') {
                    detail.name = elementExtendName[index];
                  }
                  detail.ch = `e${index + 17}`;
                  element.push(detail);
                }
              });
            }

            this.$store.commit('deviceInfo', {
              deviceInfo: { name: this.name, element },
            });
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 403) {
              sessionStorage.removeItem('username');
              sessionStorage.removeItem('token');
            }
          }
        });
    },
    getDetail(elementNum) {
      const element = this.elementInfo;
      const detail = element.find((item) => item.index === elementNum);
      return JSON.parse(JSON.stringify(detail));
    },
    getRelayDetail(relayNum) {
      const relayArray = this.relayInfo;
      const detail = relayArray.find((item) => item.index === relayNum);
      return JSON.parse(JSON.stringify(detail));
    },
    handleSwitchChange(index, ch, num, value) {
      if (num < 32) {
        this.relayLoading[index] = true;
      } else {
        this.relayExtendLoading[index] = true;
      }

      this.$http
        .post('/relay', {
          deviceId: this.currentDeviceId,
          relayNum: num,
          relayState: value,
        }, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
          timeout: 15000,
        })
        .then((response) => {
          if (num < 32) {
            this.relayLoading[index] = false;
          } else {
            this.relayExtendLoading[index] = false;
          }
          if (response.data) {
            this.$message.success('控制成功');
          } else {
            this.relayStateBit[num] = (value === 0 ? 1 : 0);
            this.$message.error('控制失败');
          }
          this.$forceUpdate();
        })
        .catch((error) => {
          console.log(error);
          if (num < 32) {
            this.relayLoading[index] = false;
          } else {
            this.relayExtendLoading[index] = false;
          }
          this.relayStateBit[num] = (value === 0 ? 1 : 0);
          this.$message.error('控制失败');
          this.$forceUpdate();
        });
    },
    handleClickTab(component) {
      if (component.name === 'search') {
        this.getHistoryDataCount(this.currentDeviceId);
        this.getHistoryData(this.currentDeviceId, 1, this.pageSize);
      }
    },
    initChart() {
      this.lineChart = echarts.init(document.getElementById('easy-chart'), 'light');
    },
    chartDraw(dataset) {
      const data = JSON.parse(JSON.stringify(dataset));
      const dimensions = ['日期'];
      const series = [];
      const element = JSON.parse(JSON.stringify(this.element));
      for (let i = 0, len = element.length; i < len; i += 1) {
        dimensions.push(`${element[i].name}(${element[i].unit})`);
        series.push({ type: 'line', smooth: true, symbol: 'none' });
      }
      const options = {
        backgroundColor: '#F2F6FC',
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          formatter: (name) => name.substring(0, name.indexOf('(')),
        },
        xAxis: {
          data: data.map((item) => item.dataTime),
        },
        yAxis: {
          // splitLine: {
          //   show: false,
          // },
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
          },
          {
            type: 'inside',
            xAxisIndex: [0],
          },
        ],
        dataset: {
          dimensions,
          source: data.map((item) => {
            const ret = [item.dataTime];
            for (let i = 0, len = element.length; i < len; i += 1) {
              ret.push(this.accMul(item[element[i].ch], parseFloat(element[i].prec)));
            }
            return ret;
          }),
        },
        series,
      };
      this.lineChart.setOption(options);
    },
    tableChartDraw(deviceId) {
      this.todayData = [];
      this.$http
        .get(`/todaydata/${deviceId}`, {
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const { data } = response;
          if (data && data.length > 0) {
            this.initChart();
            this.chartDraw(data);
            const todayData = JSON.parse(JSON.stringify(this.element));
            todayData.forEach((item) => {
              item.minData = 32767;
              item.maxData = -32767;
              item.avgData = 0;
              item.sumData = 0;
              item.add = 0;
            });
            data.forEach((item, index) => {
              for (let i = 0, len = todayData.length; i < len; i += 1) {
                const elementData = item[[todayData[i].ch]];
                if (elementData < todayData[i].minData) {
                  todayData[i].minData = elementData;
                  todayData[i].minTime = item.dataTime;
                }
                if (elementData !== 32767 && elementData > todayData[i].maxData) {
                  todayData[i].maxData = elementData;
                  todayData[i].maxTime = item.dataTime;
                }
                if (elementData !== 32767) {
                  todayData[i].sumData += elementData;
                  todayData[i].add += 1;
                }
                if (index === data.length - 1) {
                  todayData[i].avgData = Math.round(todayData[i].sumData / todayData[i].add);
                }
              }
            });
            todayData.forEach((item) => {
              item.minData = this.accMul(item.minData, parseFloat(item.prec));
              item.maxData = this.accMul(item.maxData, parseFloat(item.prec));
              item.avgData = this.accMul(item.avgData, parseFloat(item.prec));
            });
            this.todayData = todayData;
          }
        })
        .catch();
    },
    beforeUploadDevice(file) {
      const suffixName = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = suffixName === 'jpg';
      const extension2 = suffixName === 'png';
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!extension && !extension2) {
        this.$message.error('上传失败');
      }
      if (!isLt1M) {
        this.$message.error('超过最大图片尺寸');
      }
      // eslint-disable-next-line no-mixed-operators
      return (extension || extension2 && isLt1M);
    },
    handleUploaddCoverSuccess() {
      this.$forceUpdate();
    },
    getHistoryData(deviceId, pageNum, pageSize) {
      this.historys = [];
      this.tableLoading = true;
      this.$http
        .get(`/datas/${deviceId}`, {
          params: {
            pageNum,
            pageSize,
          },
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const { element } = this;
          if (response.status === 200) {
            this.historys = response.data;
            this.historys.forEach((item) => {
              for (let i = 0, len = element.length; i < len; i += 1) {
                item[[element[i].ch]] = accMul(item[element[i].ch], parseFloat(element[i].prec));
              }
            });
          }
          this.tableLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.tableLoading = false;
        });
    },

    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.historys = [];
      if (this.searchMode === 'default') {
        if (this.currentDeviceType === 0) {
          this.getHistoryData(this.currentDeviceId, 1, this.pageSize);
        } else if (this.currentDeviceType === 1) {
          this.getPestData(this.currentDeviceId, 1, this.pageSize);
        }
      } else if (this.currentDeviceType === 0) {
        this.getHistoryDataByDate(this.currentDeviceId, 1, this.pageSize, this.dateRange[0], this.dateRange[1]);
      } else if (this.currentDeviceType === 1) {
        this.getPestDataByDate(this.currentDeviceId, 1, this.pageSize, this.dateRange[0], this.dateRange[1]);
      }
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.searchMode === 'default') {
        switch (this.currentDeviceType) {
          case 0:
            this.getHistoryData(this.currentDeviceId, currentPage, this.pageSize);
            break;
          case 1:
            this.getPestData(this.currentDeviceId, currentPage, this.pageSize);
            break;
          default:
            break;
        }
      } else {
        switch (this.currentDeviceType) {
          case 0:
            this.getHistoryDataByDate(this.currentDeviceId, this.currentPage, this.pageSize, this.dateRange[0], this.dateRange[1], this.interval);
            break;
          case 1:
            this.getPestDataByDate(this.currentDeviceId, this.currentPage, this.pageSize, this.dateRange[0], this.dateRange[1], this.interval);
            break;
          default:
            break;
        }
      }
    },

    handleDateChange() {
      if (this.dateRange && this.dateRange.length !== 0) {
        this.searchReady = true;
      } else {
        this.searchReady = false;
      }
    },

    handleSearchHistoryDataByDate() {
      this.searchMode = 'date';
      this.currentPage = 1;
      if (this.currentDeviceType === 0) {
        this.getHistoryDataCount(this.currentDeviceId, this.dateRange[0], this.dateRange[1], this.interval);
        this.getHistoryDataByDate(this.currentDeviceId, this.currentPage, this.pageSize, this.dateRange[0], this.dateRange[1], this.interval);
      } else if (this.currentDeviceType === 1) {
        this.getPestDataCount(this.currentDeviceId, this.dateRange[0], this.dateRange[1]);
        this.getPestDataByDate(this.currentDeviceId, this.currentPage, this.pageSize, this.dateRange[0], this.dateRange[1]);
      }
    },

    getHistoryDataByDate(deviceId, pageNum, pageSize, startTime, endTime, interval) {
      this.historys = [];
      this.tableLoading = true;
      this.$http
        .get(`/datas/${deviceId}`, {
          params: {
            pageNum,
            pageSize,
            startTime,
            endTime,
            interval,
          },
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          const { element } = this;
          if (response.status === 200) {
            this.historys = response.data;
            this.historys.forEach((item) => {
              for (let i = 0, len = element.length; i < len; i += 1) {
                item[[element[i].ch]] = accMul(item[element[i].ch], parseFloat(element[i].prec));
              }
            });
          }
          this.tableLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.tableLoading = false;
        });
    },
    getHistoryDataCount(deviceId, startTime, endTime, interval) {
      this.$http
        .get(`/datas/${deviceId}/count`, {
          params: {
            startTime,
            endTime,
            interval,
          },
          headers: {
            token: sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.total = response.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    if (this.currentDeviceType === 0) {
      if (this.currentDeviceId) {
        this.getDeviceData(this.currentDeviceId);
        this.getDeviceInfo(this.currentDeviceId);
        this.tableChartDraw(this.currentDeviceId);
      }
      this.token = sessionStorage.getItem('token');
      window.onresize = () => {
        if (this.lineChart) {
          this.lineChart.resize();
        }
      };
      this.timer = setInterval(() => {
        if (this.relayLoading.some((item) => item)) return;
        if (this.relayExtendLoading.some((item) => item)) return;
        this.getDeviceData(this.currentDeviceId);
      }, 60000);
    }
  },

  computed: {
    currentDeviceId() {
      return this.$store.state.currentDeviceId;
    },
    currentDeviceType() {
      return this.$store.state.currentDeviceType;
    },
    elementInfo() {
      return this.$store.state.elementInfo;
    },
    relayInfo() {
      return this.$store.state.relayInfo;
    },
    dataRefresh() {
      return this.$store.state.dataRefresh;
    },
    language() {
      return this.$store.state.language;
    },
  },

  watch: {
    currentDeviceId() {
      if (this.currentDeviceType === 0 && this.currentDeviceId) {
        this.getDeviceData(this.currentDeviceId);
        this.getDeviceInfo(this.currentDeviceId);
        if (this.lineChart) {
          this.lineChart.clear();
          this.lineChart = null;
        }
        this.tableChartDraw(this.currentDeviceId);
      }
    },
    dataRefresh() {
      if (this.dataRefresh) {
        if (this.currentDeviceType === 0) {
          this.getDeviceData(this.currentDeviceId);
        }
      }
    },
    elementInfo() {
      setTimeout(() => {
        this.getDeviceInfo(this.currentDeviceId);
      }, 500);
    },
    language() {
    },
  },
};
</script>

<style lang="scss" scoped>
.data {
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .element-card {
    width: 240px;
    @media screen and (max-width: 1440px) {
      width: 200px;
      margin: 5px;
    }
    height: 100px;
    margin: 10px;
    display: flex;
    .image {
      width: 64px;
      height: 64px;
    }
    .element-name {
      font-size: 1em;
    }
  }
  .switch-card {
    position: relative;
    width: 240px;
    @media screen and (max-width: 1440px) {
      width: 200px;
    }
    height: 100px;
    background-color: rgb(218, 225, 226);
    margin: 10px;
    float: left;
    .image {
      float: left;
      padding-top: 0;
      width: 64px;
      height: 64px;
    }
  }
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
.data::v-deep .el-button {
  height: 26px;
}
</style>
