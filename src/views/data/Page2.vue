<template>
  <div class="page2">
    <div class="function-area">
      <el-button type="success" :icon="style === 0 ? 'icon-third-liebiao' : 'icon-third-tubiao'" circle plain @click="handleChangeStyle"></el-button>
    </div>
    <div>
      <div v-if="style === 0">
        <vxe-table
          align="center"
          ref="table"
          :data.sync="tableData"
          round
          border
          class="table"
          size="mini"
          show-overflow
          show-header-overflow
        >
          <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="站点名称" width="160"></vxe-table-column>
          <vxe-table-column field="time" title="监测时间" width="160"></vxe-table-column>
          <vxe-table-column field="data" title="监测数据">
            <template v-slot="{ row }">
              <span v-for="(item, index) in row.data" :key="index">{{item.eName}} {{item.eValue}} </span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="timeDifference" title="据目前时间差" width="160"></vxe-table-column>
          <vxe-table-column field="warning" title="报警状态" width="100"></vxe-table-column>
          <vxe-table-column title="操作" width="100">
            <template v-slot="{ row }">
              <el-button size="mini" type="primary" plain @click="handleEdit(row)">详细</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <div v-else style="height: 700px;">
        <el-scrollbar style="height: 100%;">
          <div class="device">
            <el-card class="device-card" v-for="(item, index) in tableData" :key="index">
              <div slot="header" class="header">
                <span>{{item.name}}</span>
                <span>{{item.time}}</span>
              </div>
              <div class="body">
                <div class="left"></div>
                <div class="right">
                  <el-scrollbar style="height: 100%;">
                    <div v-for="(item, index) in item.data" :key="index">{{item.eName}}: {{item.eValue}} {{item.eUnit}}</div>
                  </el-scrollbar>
                </div>
              </div>
            </el-card>
          </div>
        </el-scrollbar>
      </div>
    </div>

  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      style: 0,
      searchContent: '',
      pageSize: 10,
      currentPage: 1,
      tableData: [
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
        {
          name: '监测点1',
          time: '2020-11-01 10:00:00',
          data: [
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'm/s',
              eValue: '0.3',
              eKey: 'e1',
              eName: '风速',
              eNum: '108',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '°',
              eValue: '311',
              eKey: 'e2',
              eName: '风向',
              eNum: '109',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '℃',
              eValue: '23.2',
              eKey: 'e3',
              eName: '大气温度',
              eNum: '101',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: '%RH',
              eValue: '33.7',
              eKey: 'e4',
              eName: '大气湿度',
              eNum: '102',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'dB',
              eValue: '52.8',
              eKey: 'e5',
              eName: '噪声',
              eNum: '118',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e6',
              eName: 'PM2.5',
              eNum: '150',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '55',
              eKey: 'e7',
              eName: 'PM10',
              eNum: '151',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '39',
              eKey: 'e8',
              eName: '5min-PM25',
              eNum: '189',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'ug/m3',
              eValue: '52',
              eKey: 'e9',
              eName: '5min-PM10',
              eNum: '190',
            },
            {
              datetime: '2020-11-02 15:57:32',
              eUnit: 'hPa',
              eValue: '1019.2',
              eKey: 'e10',
              eName: '数字气压',
              eNum: '127',
            },
          ],
          timeDifference: '5小时',
        },
      ],
    };
  },

  methods: {
    handleExport() {
      this.$refs.table.exportData({
        filename: `${dayjs().format('YYYY-MM-DD_HH_mm_ss')}`,
        sheetName: 'Sheet1',
        type: 'xlsx',
      });
    },
    handleEdit(row) {
      let message = '';
      row.data.forEach((element) => {
        message += `${element.eName}: ${element.eValue} ${element.eUnit} `;
      });
      this.$message(message);
    },
    handleChangeStyle() {
      this.style = this.style === 0 ? 1 : 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.page2 {
  display: flex;
  flex-direction: column;
}

.function-area {
  margin: 20px;
  display: flex;
  font-size: 20px;
}

.table {
  margin: 20px;
}

.device {
  display: flex;
  flex-wrap: wrap;
}

.device-card {
  width: 480px;
  margin: 20px;
  .header {
    display: flex;
    justify-content: space-around;
  }
  .body {
    display: flex;
    height: 200px;
    .left {
      width: 200px;
      background: url('../../assets/login_bg.jpg');
      background-size: cover;
    }
    .right {
      margin-left: 40px;
      width: 240px;
      text-align: left;
    }
  }
}
</style>
