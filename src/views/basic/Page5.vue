<template>
  <div>
    <div class="function-area">
      <el-input
        placeholder="请输入搜索内容"
        v-model="searchContent"
        size="small"
        style="width: 240px;"
      >
        <el-button type="primary" slot="append" icon="el-icon-search">搜索</el-button>
      </el-input>
      <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-left: 20px;"
        size="mini"
      >新增</el-button>
      <el-button
        type="success"
        icon="el-icon-download"
        style="margin-left: 20px;"
        size="mini"
        @click="handleExport"
      >导出</el-button>
    </div>
    <vxe-table
      align="center"
      ref="table"
      :data.sync="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      round
      border
      class="table"
      size="mini"
      show-overflow
      show-header-overflow
    >
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="compartment" title="行政区划"></vxe-table-column>
      <vxe-table-column field="name" title="灌区名称"></vxe-table-column>
      <vxe-table-column field="area" title="改革面积"></vxe-table-column>
      <vxe-table-column field="plot" title="地块"></vxe-table-column>
      <vxe-table-column field="longitude" title="经度"></vxe-table-column>
      <vxe-table-column field="latitude" title="纬度"></vxe-table-column>
      <vxe-table-column field="operationTime" title="操作时间"></vxe-table-column>
      <vxe-table-column field="operator" title="操作员"></vxe-table-column>
      <vxe-table-column title="操作" width="200">
        <template v-slot="{ row }">
          <el-button size="mini" type="primary" plain @click="handleEdit(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-pagination
      :total="tableData.length"
      background
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentChange"
      style="text-align: center;"
    ></el-pagination>

  </div>
</template>

<script>
import dayjs from 'dayjs';

export default {

  data() {
    return {
      searchContent: '',
      pageSize: 10,
      currentPage: 1,
      tableData: [
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
        },
        {
          name: '查哈阳灌区', area: 25.97, plot: '查哈阳地块', longitude: 115.2678, latitude: 39.2562, operationTime: '2020-10-25 10:00:00',
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
    handlePageSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(row) {
      this.$refs.table.remove(row);
    },
  },
};
</script>

<style lang="scss" scoped>
.function-area {
  margin: 20px;
  display: flex;
  height: 31px;
}

.table {
  margin: 20px;
}
</style>
