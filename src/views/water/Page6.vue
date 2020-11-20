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
    >
      <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
      <vxe-table-column field="unit" title="用水单位"></vxe-table-column>
      <vxe-table-column field="year" title="年份"></vxe-table-column>
      <vxe-table-column field="right" title="水权量(m3)"></vxe-table-column>
      <vxe-table-colgroup title="收费水量">
        <vxe-table-column field="quota" title="定额内(m3)"></vxe-table-column>
        <vxe-table-column field="outOfQuota" title="超定额(m3)"></vxe-table-column>
        <vxe-table-column field="totalUse" title="合计(m3)"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="应收水费">
        <vxe-table-column field="quotaCost" title="定额内(元)"></vxe-table-column>
        <vxe-table-column field="outOfQuotaCost" title="超定额(元)"></vxe-table-column>
        <vxe-table-column field="totalCost" title="合计(元)"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-column field="charges" title="实收水费(元)"></vxe-table-column>
      <vxe-table-column field="remain" title="余欠(元)"></vxe-table-column>
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
  name: 'Directories',

  data() {
    return {
      searchContent: '',
      pageSize: 10,
      currentPage: 1,
      tableData: [
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
        },
        {
          unit: '单位1', year: '2020', right: 800, quota: 700, outOfQuota: 0, totalUse: 700, quotaCost: 700, outOfQuotaCost: 0, totalCost: 700, charges: 800, remain: 100,
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
