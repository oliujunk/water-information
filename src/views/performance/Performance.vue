<template>
  <div class="performance">
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
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60" title="序号"></vxe-table-column>
      <vxe-table-column field="unit" title="行政单位" width="200"></vxe-table-column>
      <vxe-table-column field="year" title="年度" width="100"></vxe-table-column>
      <vxe-table-column field="type" title="评价类别" width="100"></vxe-table-column>
      <vxe-table-column field="indicator" title="指标"></vxe-table-column>
      <vxe-table-column field="score" title="得分" width="100"></vxe-table-column>
      <vxe-table-column field="total" title="合计" width="100"></vxe-table-column>
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
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
        },
        {
          unit: '单位1', year: '2018', type: '工作评价', indicator: '省级层面工作责任落实', score: 80, total: '',
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
.performance {
  display: flex;
  flex-direction: column;
  background-color: rgb(236, 236, 238);
  height: 100%;
}

.function-area {
  margin: 20px;
  display: flex;
  height: 31px;
}

.table {
  margin: 20px;
}
</style>
