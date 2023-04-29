<template>
  <div class="container">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order' }"
        >预测结果
        </el-breadcrumb-item
        >
        <el-breadcrumb-item>测试集分析</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card" style="margin-top: 10px;">
      <div class="clearfix">
        <div style="background-color: #3E7DEB;width: 10px;height: 25px; float: left; margin-right: 10px;"></div>
        <span style="font-weight: bold;float: left; font-size: 18px">测试集分析   &nbsp  &nbsp</span>
        <el-upload
            style="float: left"
            class="upload-demo"
            ref="upload"
            :action="baseURL"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success='successUpload'
            :on-error='errorUpload'
            :before-upload='beforeUpload'
            :limit="1"
            accept=".csv"
            :on-exceed="handleExceed"
            :auto-upload="false"
            :file-list="fileList">
          <el-button size="small" type="primary">选择文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传csv文件</div>
        </el-upload>
        <el-button style="margin-left: 10px;float: left" size="small" type="success" @click="submitUpload">上传</el-button>
        <el-button v-if="isShowJson" style="margin-left: 10px;float: left" size="small" type="warning" @click="jsonDownload">下载预测结果文件</el-button>
      </div>
    </el-card>
    <br>
    <div v-if="macro_F1">
      <h2>预测结果:</h2>
      <h2>macro_F1: {{ macro_F1 * 100 }}%</h2>
      <h2>macro_P: {{ macro_P * 100 }}%</h2>
      <h2>macro_R: {{ macro_R * 100 }}%</h2>
    </div>
    <br>
    <!--  Echarts 图形 start  -->
    <div style="float: left" id="pieChart" :style="{width: '500px', height: '500px'}"></div>
    <div style="float: left" id="bar1Chart" :style="{width: '450px', height: '450px'}"></div>
    <div style="float: left" id="bar2Chart" :style="{width: '450px', height: '450px'}"></div>

  </div>

</template>

<script>
import * as echarts from 'echarts'
import { Loading } from 'element-ui';

export default {
  data() {

    return {
      baseURL:process.env.VUE_APP_BASE_URL+'/file_upload11', // 文件上传路径
      macro_F1: null,
      macro_P: null,
      macro_R: null,
      fileList: [],
      LABEL0: '',
      LABEL1: '',
      LABEL2: '',
      LABEL3: '',
      LABEL4: '',
      LABEL5: '',
      precision_i:[],
      recall_i:[],
      isloading:'', //遮罩层控制
      isShowJson:'' //json下载控制
    }
  },
  mounted() {

  },
  methods: {
    //饼图初始化
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      var pieChart = this.$echarts.init(document.getElementById('pieChart'))
      // 绘制图表
      pieChart.setOption({
        title: {
          text: 'label类别占比',
          // subtext: 'Fake Data',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              {value: this.label0, name: 'label0'},
              {value: this.label1, name: 'label1'},
              {value: this.label2, name: 'label2'},
              {value: this.label3, name: 'label3'},
              {value: this.label4, name: 'label4'},
              {value: this.label5, name: 'label5'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    },
    //柱状图1初始化
    drawBar1() {
      // 基于准备好的dom，初始化echarts实例
      var bar1Chart = this.$echarts.init(document.getElementById('bar1Chart'))
      // 绘制图表
      bar1Chart.setOption({
        title: {
          text: 'precision_i数据',
        },
        xAxis: {
          type: 'category',
          data: ['label0', 'label1', 'label2', 'label3', 'label4', 'label5']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {
                value: this.precision_i[0],
                itemStyle: {
                  color: '#587dd7'
                }
              },
              {
                value: this.precision_i[1],
                itemStyle: {
                  color: '#8ecc79'
                }
              },
              {
                value: this.precision_i[2],
                itemStyle: {
                  color: '#fdc65f'
                }
              },
              {
                value: this.precision_i[3],
                itemStyle: {
                  color: '#f36366'
                }
              },
              {
                value: this.precision_i[4],
                itemStyle: {
                  color: '#6cc1dd'
                }
              },
              {
                value: this.precision_i[5],
                itemStyle: {
                  color: '#2fa274'
                }
              },
            ],
            // data: this.precision_i,
            type: 'bar'
          }
        ]
      });
    },
    //柱状图2初始化
    drawBar2() {
      // 基于准备好的dom，初始化echarts实例
      var bar2Chart = this.$echarts.init(document.getElementById('bar2Chart'))
      // 绘制图表
      bar2Chart.setOption({
        title: {
          text: 'recall_i数据',
        },
        xAxis: {
          type: 'category',
          data: ['label0', 'label1', 'label2', 'label3', 'label4', 'label5']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [
              {
                value: this.recall_i[0],
                itemStyle: {
                  color: '#587dd7'
                }
              },
              {
                value: this.recall_i[1],
                itemStyle: {
                  color: '#8ecc79'
                }
              },
              {
                value: this.recall_i[2],
                itemStyle: {
                  color: '#fdc65f'
                }
              },
              {
                value: this.recall_i[3],
                itemStyle: {
                  color: '#f36366'
                }
              },
              {
                value: this.recall_i[4],
                itemStyle: {
                  color: '#6cc1dd'
                }
              },
              {
                value: this.recall_i[5],
                itemStyle: {
                  color: '#2fa274'
                }
              },
            ],
            // data: this.precision_i,
            type: 'bar'
          }
        ]
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    beforeUpload(file, fileList) {
      Loading.service({ fullscreen: true, text: '文件分析中，请耐心等待...' });// 打开遮罩层
    },
    /**
     * 上传成功的函数
     */
    successUpload(response, file, fileList) {
      console.log('上传成功', response, file, fileList);
      if (response.status == 200) {
        // 图形参数赋值
        this.label0 = response.data.LABEL0
        this.label1 = response.data.LABEL1
        this.label2 = response.data.LABEL2
        this.label3 = response.data.LABEL3
        this.label4 = response.data.LABEL4
        this.label5 = response.data.LABEL5
        this.macro_F1 = response.data.macro_F1
        this.macro_P = response.data.macro_P
        this.macro_R = response.data.macro_R
        this.precision_i = response.data.precision_i
        this.recall_i = response.data.recall_i

        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          Loading.service().close()
        });
        // 图形展示
        this.drawPie()
        this.drawBar1()
        this.drawBar2()
        // 预测结果可下载
        this.isShowJson = true
      }
      this.$message({
        message: '分析成功',
        type: 'success'
      });
    },
    // 上传失败
    errorUpload(response, file, fileList) {
      this.$message.error('上传失败！');
      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        Loading.service().close()
      });
    },
    async submitUpload() {
      if (this.$refs.upload.uploadFiles.length == 0){ // 判断是否有文件
        this.$message('请先上传文件')
        return
      }
      this.$refs.upload.submit();
    },
    // 预测结果json下载
    jsonDownload(){
      this.$api.jsonDownload().then((res) => {
        const blobUrl = window.URL.createObjectURL(res.data)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.download = '预测结果.json'
        a.href = blobUrl
        a.click()
      })
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

.graph-wrapper {
  width: 100%;
  /*border: #333333 1px solid;*/
  display: flex;
  justify-content: center;
  align-items: center;


  .accuracy {
    align-self: flex-start;
  }
}

#graph {
  width: 800px;
  height: 120px;
  /*border: #0d2641 1px solid;*/
}

</style>
