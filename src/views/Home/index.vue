<template>
  <div class="home">
    <div class="header">
      <div class="item">
        原始学生校园卡刷卡记录数据总量
        <div class='num'>112,065,20</div>
        <div class="bottom">card_final_test.txt</div>
      </div>
      <div class="item">专业号为8的学生校园卡数据总量
        <div class='num'>125,430,3</div>
         <div class="bottom">merge_grade_8.txt</div>
      </div>
      <div class="item">原始学生GPA成绩排名数据
        <div class='num'>920,7</div>
         <div class="bottom">score_final_test.txt</div>
      </div>
      <div class="item">专业号为8的学生GPA成绩排名数据
        <div class='num'>973</div>
         <div class="bottom">stno_major8_rank.txt</div>
      </div>
    </div> -->
    <div class="header">
      <div class="item" v-for="item in totalData" :key="item.id">
        {{ item.title }}
        <div class="num">{{ item.total }}</div>
        <!-- <div class="bottom">今日销售额: {{ item.current }}</div> -->
      </div>
    </div>

    <div class="content">
      <div class="time-info">
        <div class="title">
          <!-- <img src="../../assets/images/123.jpg" width='1100' height="500"> -->
          <img src="../../assets/images/card.png" width='500' height="650">
          <img src="../../assets/images/score.png" width='500' height="650">
        </div>
        <div id="charts" style="width: 100%; height: 360px"></div>
      </div> -->
      <!-- <div class="area">地区分布</div> -->
    </div>
    <div>
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传txt文件，且不超过500Mb</div>
      </el-upload>
    </div>

    <!-- 最新内容  -->
    <!-- <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>最新内容</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>新增产品</span>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalData: [],
      fileList: [
        {name: 'card_final_test.txt', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, 
        {name: 'score_final_test.txt', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ]
    };
  },
  mounted() {
    console.log("this.$echarts.init", this.$echarts);
    console.log(document.getElementById("charts"));

    //进度
    // this.$api.getStatistical().then((res) => {
    //   console.log("数据量", res.data);
    //   //totalData
    //   if (res.data.status === 200) {
    //     this.totalData = res.data.list;
    //   }
    // });
    //--销售比----------------------
    this.$api.getSellTotal().then((res) => {
      console.log(res.data);
      //获取x轴数据
      let xData = res.data.info.date;
      //获取数据
      let xResult = res.data.info.xResult;
      let titleArr = [];
      let data =[]

      xResult.forEach((ele) => {
        titleArr.push(ele.xName);
        ele.data.forEach(item=>{
          data.push(item.num)
        })
      });
      //折线 
      this.initCharts(xData,data.slice(0,6),data.slice(6,12),data.slice(12,18));
    });
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    //折线图
    initCharts(data,data1,data2,data3) {
      let charts = this.$echarts.init(document.getElementById("charts"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["1", "2","3"],
          left:100,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "1",
            type: "line",
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data:data1,
          },
          {
            name: "2",
            type: "line",
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: data2,
          },
          {
            name: "3",
            type: "line",
            smooth: true,
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: data3,
          },
        ],
      };
      charts.setOption(option);
    },
  },
};
</script>

<style lang='less' scoped>
.home{
  margin: 10px;
}
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
          color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
          color: #fff;
          font-weight: normal;
    }
  }
   .item:nth-child(1){
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2){
    background-image: linear-gradient(#409eff, #2e556e);
  }
   .item:nth-child(3){
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
   .item:nth-child(4){
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}
.content {
  margin: 20px;
  display: flex;
  height: 650px;
  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }
  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}
.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom:20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
  }
}
</style>