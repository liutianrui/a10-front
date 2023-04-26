<template>
  <div class="container">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order' }"
        >预测结果</el-breadcrumb-item
        >
        <el-breadcrumb-item>可视化</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="graph-wrapper" v-if="accuracy">
      <div ref="graph" id="graph"></div>
      <!-- <h2 class="accuracy">训练集数量:778 </h2><br>
      <h2 class="accuracy">测试集数量:195 </h2><br> -->
      <h2 class="accuracy">准确率: {{accuracy * 100}}%</h2>
      <h2 class="accuracy">精确率: {{precision * 100}}%</h2>
      <h2 class="accuracy">召回率: {{recall * 100}}%</h2>
      <!-- <h2 class="accuracy">训练集数量: {{length_train}}</h2>
      <h2 class="accuracy">测试集数量: {{length_test}}</h2> -->
    </div>
    <el-button type="primary" @click="handleClassify">点击运行</el-button>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data(){
    return {
      accuracy: null,
      precision: null,
      recall: null,
      // length_train:null,
      // length_test:null,
    }
  },

  methods:{
    async handleClassify(){
      const loading = this.$loading({fullscreen: true})
      try {
        const res = await this.$api.doClassify()
        if (res.data.status === 200){
          console.log(res.data.data)
          const {accuracy,precision,recall,count_A,count_B,count_C} = res.data.data
          this.accuracy = accuracy.toFixed(4)
          this.precision = precision.toFixed(4)
          this.recall = recall.toFixed(4)
          this.$nextTick(() => {
            echarts.init(this.$refs.graph).setOption({
              series: [
                {
                  type: 'pie',
                  data: [
                    {
                      value: count_A,
                      name: 'rank<800'
                    },
                    {
                      value: count_B,
                      name: 'rank in 800-1800'
                    },
                    {
                      value: count_C,
                      name: 'rank>1800'
                    }
                  ]
                }
              ],
              tooltip: {
                trigger: 'item'
              },
              legend: {
                left: 'center'
              }
            })
          })
        }else {
          this.$message.error(res.data.info)
        }
      }catch (err){
        this.$message.error('运行发生错误')
      }finally {
        loading.close()
      }

    }
  }
}
</script>

<style lang="less" scoped>
.container {
  margin: 10px;
}
.nav {
  padding: 10px;
}

.graph-wrapper{
  width: 100%;
  /*border: #333333 1px solid;*/
  display: flex;
  justify-content: center;
  align-items: center;

  .accuracy{
    align-self: flex-start;
  }
}

#graph{
  width: 800px;
  height: 300px;
  /*border: #0d2641 1px solid;*/
}

</style>
