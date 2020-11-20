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
      <vxe-table-column field="prop1" title="行政区划"></vxe-table-column>
      <vxe-table-column field="prop2" title="灌区名称"></vxe-table-column>
      <vxe-table-colgroup title="成本水价">
        <vxe-table-column field="prop3" title="水价"></vxe-table-column>
        <vxe-table-column field="prop4" title="水价组成"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="收费方式">
        <vxe-table-column field="prop5" title="按方收费(元/m3)"></vxe-table-column>
        <vxe-table-colgroup title="按亩收费">
          <vxe-table-column field="prop6" title="粮食作物(元/亩)"></vxe-table-column>
          <vxe-table-column field="prop7" title="经济作物(元/亩)"></vxe-table-column>
        </vxe-table-colgroup>
      </vxe-table-colgroup>
      <vxe-table-column field="prop8" title="工业水价"></vxe-table-column>
      <vxe-table-column field="prop9" title="水利发电水价"></vxe-table-column>
      <vxe-table-column field="prop10" title="水产水价"></vxe-table-column>
      <vxe-table-column field="prop11" title="自流水价"></vxe-table-column>
      <vxe-table-column field="prop12" title="节水奖励"></vxe-table-column>
      <vxe-table-column field="prop13" title="超定额加价"></vxe-table-column>
      <vxe-table-column title="操作" width="160">
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
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
        },
        {
          prop2: 10001, prop3: '灌区1', prop4: '大型灌区', prop5: '是', prop6: '是',
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
