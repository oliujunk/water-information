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
      ref="directoriesTable"
      :data.sync="directoriesTableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      round
      class="table"
      size="mini"
    >
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="id" title="水价改革单位代码"></vxe-table-column>
      <vxe-table-column field="name" title="水价改革单位名称"></vxe-table-column>
      <vxe-table-column field="createTime" title="建立时间"></vxe-table-column>
      <vxe-table-column field="finishTime" title="终止时间"></vxe-table-column>
      <vxe-table-column title="操作" width="200">
        <template v-slot="{ row }">
          <el-button size="mini" type="primary" plain @click="handleEdit(row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-pagination
      :total="directoriesTableData.length"
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
      directoriesTableData: [
        {
          id: 10001, name: '单位1', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10002, name: '单位2', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10003, name: '单位3', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10004, name: '单位4', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10001, name: '单位1', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10002, name: '单位2', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10003, name: '单位3', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10004, name: '单位4', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10001, name: '单位1', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10002, name: '单位2', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10003, name: '单位3', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
        {
          id: 10004, name: '单位4', createTime: '2020-10-27 15:00:00', finishTime: '2020-10-31 15:00:00',
        },
      ],
    };
  },

  methods: {
    handleExport() {
      this.$refs.directoriesTable.exportData({
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
      this.$refs.directoriesTable.remove(row);
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
