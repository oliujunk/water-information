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
      <!-- <el-button
        type="primary"
        icon="el-icon-plus"
        style="margin-left: 20px;"
        size="mini"
      >新增</el-button> -->
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
      class="table"
      size="mini"
      show-footer
      :footer-method="footerMethod"
    >
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="渠道名称"></vxe-table-column>
      <vxe-table-column field="area" title="灌溉面积(亩)"></vxe-table-column>
      <vxe-table-column field="avg" title="亩均用水范围(立方米)"></vxe-table-column>
      <vxe-table-column field="sum" title="合计">
        <template v-slot="{ row }">
          <span>{{ row.area * row.avg}}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="5" title="5月放水比例(40%)">
        <template v-slot="{ row }">
          <span>{{ row.area * row.avg * 0.4}}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="6" title="6月放水比例(25%)">
        <template v-slot="{ row }">
          <span>{{ row.area * row.avg * 0.25}}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="7" title="7月放水比例(25%)">
        <template v-slot="{ row }">
          <span>{{ row.area * row.avg * 0.25}}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="8" title="8月放水比例(10%)">
        <template v-slot="{ row }">
          <span>{{ row.area * row.avg * 0.1}}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="200">
        <template v-slot="{ row }">
          <el-button size="mini" type="primary" plain @click="handleEdit(row)">编辑</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(row)">删除</el-button> -->
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
import XEUtils from 'xe-utils';

export default {
  name: 'Directories',

  data() {
    return {
      searchContent: '',
      pageSize: 10,
      currentPage: 1,
      tableData: [
        {
          name: '敖来一支分水闸', area: 705, avg: 700,
        },
        {
          name: '实验站分水闸', area: 205, avg: 680,
        },
        {
          name: '北二支分水闸', area: 425, avg: 700,
        },
        {
          name: '南干分水闸', area: 1011, avg: 685,
        },
        {
          name: '北四支分水闸', area: 1838, avg: 705,
        },
        {
          name: '永乐斗渠分水闸', area: 262, avg: 605,
        },
        {
          name: '民主分水闸', area: 558, avg: 680,
        },
        {
          name: '北五支分水闸', area: 775, avg: 680,
        },
        {
          name: '北六支分水闸', area: 1025, avg: 680,
        },
      ],
    };
  },

  methods: {
    handleExport() {
      this.$refs.table.exportData({
        filename: `年度用水量${dayjs().format('YYYY-MM-DD_HH_mm_ss')}`,
        sheetName: 'Sheet1',
        type: 'xlsx',
        data: this.tableData.map((item) => {
          item.sum = item.area * item.avg;
          item['5'] = item.sum * 0.4;
          item['6'] = item.sum * 0.25;
          item['7'] = item.sum * 0.25;
          item['8'] = item.sum * 0.1;
          return item;
        }),
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
    footerMethod({ columns, data }) {
      const sums = [];
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          sums.push('合计');
        } else {
          let sumCell = null;
          switch (column.property) {
            case 'area':
            case 'avg':
              sumCell = XEUtils.sum(data, column.property);
              break;
            case 'sum': {
              let sum = 0;
              data.forEach((item) => {
                sum += item.area * item.avg;
              });
              sumCell = sum;
              break;
            }
            case '5': {
              let sum = 0;
              data.forEach((item) => {
                sum += item.area * item.avg * 0.4;
              });
              sumCell = sum;
              break;
            }

            case '6': {
              let sum = 0;
              data.forEach((item) => {
                sum += item.area * item.avg * 0.25;
              });
              sumCell = sum;
              break;
            }
            case '7': {
              let sum = 0;
              data.forEach((item) => {
                sum += item.area * item.avg * 0.25;
              });
              sumCell = sum;
              break;
            }
            case '8': {
              let sum = 0;
              data.forEach((item) => {
                sum += item.area * item.avg * 0.1;
              });
              sumCell = sum;
              break;
            }

            case 'name':
              sumCell = ' ';
              break;
            default:
              break;
          }
          sums.push(sumCell);
        }
      });
      return [sums];
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
