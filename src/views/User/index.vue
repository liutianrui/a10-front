<template>
  <div class="user">
    <!-- 1. 查看 -->
    <!-- <div class="hetong">
      签约合同内容：<el-button type="primary" size="small" @click="look"
        >查看合同</el-button
      >
    </div> -->
    <!-- <VuePdf ref="myPdf" /> -->

    <!-- 2. 查看 -->
    <!-- <div class="money">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button
                @click="download"
                style="float: right; padding: 3px 0"
                type="text"
                >下载发票</el-button
              >
            </div>
            <div class="text item">
              <img ref="img" style="width: 400px" :src="imgUrl" alt="" />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button
                @click="downs"
                style="float: right; padding: 3px 0"
                type="text"
                >下载不同源发票</el-button
              >
            </div>
            <div class="text item">
              <img
                ref="myimg"
                style="width: 400px"
                src="../../assets/images/11.jpg"
                alt=""
              />
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>卡片名称</span>
              <el-button
                @click="down()"
                style="float: right; padding: 3px 0"
                type="text"
                >下载本地发票</el-button
              >
            </div>
            <div class="text item">
              <img class="img1" style="width: 400px" :src="imgUrl" alt="" />
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div> -->
    <!-- 3. 导出表格 -->
    <div class="table">
      <div class="header">
        <div class="title">用户信息</div>
        <el-button @click="exportData" size='small'>导出表格</el-button>
      </div>
      <el-table border :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="入学日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="stno" label="学号" width="180">
        </el-table-column>
        <el-table-column prop="address" label="家庭地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import VuePdf from "./VuePdf.vue";
import img from "../../assets/images/11.jpg";
import { export2Excel } from "../../common/js/util";
export default {
  data() {
    return {
      imgUrl: img,
      columns: [//定义表头
        { title: "日期", key: "date" },
        { title: "姓名", key: "name" },
        { title: "学号", key: "stno" },
        { title: "地址", key: "address" },
      ],
      tableData: [
        {
          date: "2018-09-08",
          name: "谷鹏飞",
          stno: "201811101098",
          address: "山东省济南市历城区港沟街道凤鸣路1000号",
        },
        {
          date: "2019-09-14",
          name: "何小珂",
          stno: "201911101075",
          address: "山东省泰安市泰山区通天街65号",
        },
        {
          date: "2020-09-05",
          name: "王小虎",
          stno: "202011101023",
          address: "上海市普陀区金沙江路1519号",
        },
        {
          date: "2021-09-08",
          name: "李达康",
          stno: "202111101102",
          address: "汉东省京州市财源大街192号",
        },
      ],
    };
  },
  components: {
    VuePdf,
  },
  methods: {
    /**
     * 查看合同
     */
    look() {
      this.$refs.myPdf.dialogVisible = true;
    },
    download() {
      //1. 新窗口打开
      let url = this.$refs.img;
      window.location.href = url.src;
    },
    //必须同源才能下载
    down() {
      var alink = document.createElement("a");
      alink.href = this.imgUrl;
      console.log(this.imgUrl);
      alink.download = "pic"; //图片名
      alink.click();
    },
    //解决图片不同源下载问题：
    downloadIamge(imgsrc, name) {
      //下载图片地址和图片名
      var image = new Image(); //<img />
      // 解决跨域 Canvas 污染问题
      image.setAttribute("crossOrigin", "anonymous");
      image.onload = function () {
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        var context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        var url = canvas.toDataURL("image/png"); //得到图片的base64编码数据 图片格式，默认为 image/png
        var a = document.createElement("a"); // 生成一个a元素
        var event = new MouseEvent("click"); // 创建一个单击事件
        a.download = name || "photo"; // 设置图片名称
        a.href = url; // 将生成的URL设置为a.href属性
        a.dispatchEvent(event); // 触发a的单击事件
      };
      image.src = imgsrc;
    },
    downs() {
      this.downloadIamge(this.$refs.myimg.src, "pic");
    },
    /**
     * 导出到本地
     */
    exportData() {
      // export2Excel('表头','需要导出的数据')
      export2Excel(this.columns, this.tableData,'用户列表');
    },
  },
};
</script>

<style lang='less' scoped>
.user {
  margin: 10px;
}
.hetong,
.table {
  padding: 10px;
  border: 1px solid #eee;
  background: #fff;
  color: #666;
}
.money {
  margin: 10px 0;
}
.header{
    display: flex;
    padding: 10px;
    .title{
        flex: 1;
        color: #333;
        font-weight: bold;
    }
}
</style>