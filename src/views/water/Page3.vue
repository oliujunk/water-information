<template>
  <div class="page3">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="涵闸类型">
        <el-select v-model="form.gate" placeholder="请选择涵闸类型" style="width: 220px;">
          <el-option label="类型一" :value="0"></el-option>
          <el-option label="类型二" :value="1"></el-option>
          <el-option label="类型三" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="水流形式">
        <el-select v-model="form.flow" placeholder="请选择水流形式" style="width: 220px;">
          <el-option label="类型一" :value="0"></el-option>
          <el-option label="类型二" :value="1"></el-option>
          <el-option label="类型三" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="翼墙类型">
        <el-select v-model="form.wall" placeholder="请选择翼墙类型" style="width: 220px;">
          <el-option label="类型一" :value="0"></el-option>
          <el-option label="类型二" :value="1"></el-option>
          <el-option label="类型三" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流量系数">
        <el-input v-model="form.coefficient" placeholder="请输入流量系数" style="width: 220px;"></el-input>
      </el-form-item>
      <el-form-item label="闸门孔数">
        <el-input-number v-model="form.coefficient" placeholder="请输入流量系数" style="width: 220px;"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">计算</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        gate: 0,
        flow: 0,
        wall: 0,
        coefficient: 1,
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    };
  },

  methods: {
    onSubmit() {
      console.log('submit!');
    },
  },
};
</script>

<style lang="scss" scoped>
.page3 {
  background: white;
  margin: 20px;
  border-radius: 5px;
  padding: 20px;
  text-align: left;
}
</style>
