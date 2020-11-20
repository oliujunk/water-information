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
      <vxe-table-column field="prop1" title="行政区划" width="200"></vxe-table-column>
      <vxe-table-column field="prop2" title="灌区名称" width="200"></vxe-table-column>
      <vxe-table-column field="prop3" title="用水合作组织名称" width="200"></vxe-table-column>
      <vxe-table-column field="prop4" title="组织类型" width="200"></vxe-table-column>
      <vxe-table-column field="prop5" title="注册方式" width="200"></vxe-table-column>
      <vxe-table-column field="prop6" title="经度" width="200"></vxe-table-column>
      <vxe-table-column field="prop7" title="纬度" width="200"></vxe-table-column>
      <vxe-table-column field="prop8" title="人员数量" width="200"></vxe-table-column>
      <vxe-table-column field="prop9" title="建立时间" width="200"></vxe-table-column>
      <vxe-table-column field="prop10" title="服务覆盖的乡镇数" width="200"></vxe-table-column>
      <vxe-table-column field="prop11" title="服务覆盖的乡镇名称" width="200"></vxe-table-column>
      <vxe-table-column field="prop12" title="管理体制" width="200"></vxe-table-column>
      <vxe-table-column field="prop13" title="机构性质" width="200"></vxe-table-column>
      <vxe-table-column field="prop14" title="管理面积" width="200"></vxe-table-column>
      <vxe-table-column field="prop15" title="人员经费是否纳入县级财政预算" width="200"></vxe-table-column>
      <vxe-table-column field="prop16" title="人员经费落实到位比例" width="200"></vxe-table-column>
      <vxe-table-column field="prop17" title="公益性业务经费是否纳入县级财政预算" width="200"></vxe-table-column>
      <vxe-table-column field="prop18" title="业务经费落实到位比例" width="200"></vxe-table-column>
      <vxe-table-column field="prop19" title="工作条件改革的财政投入" width="200"></vxe-table-column>
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
  width: 100%;
}
</style>
