<template>
  <div class="add-goods">
    <!-- 面包屑 -->
    <div class="title">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }"
          >学生管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 表单数据 -->
    <div class="myform">
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- <el-form-item label="类目选择" prop="category">
          <el-button type="primary">类目选择</el-button>
        </el-form-item> -->

        <el-form-item label="学生姓名" prop="title">
          <el-input v-model="goodsForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Java" prop="price">
          <el-input v-model="goodsForm.price"></el-input>
        </el-form-item>
        <el-form-item label="Python" prop="num">
          <el-input v-model="goodsForm.num"></el-input>
        </el-form-item>
        <!-- <el-form-item label="时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="goodsForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker
                placeholder="选择时间"
                v-model="goodsForm.date2"
                style="width: 100%"
              ></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item> -->
        <el-form-item label="数据结构" prop="category">
          <el-input v-model="goodsForm.category"></el-input>
        </el-form-item>
        <el-form-item label="操作系统" prop="sellPoint">
          <el-input v-model="goodsForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="计算机组成原理" prop="jizu">
          <el-input v-model="goodsForm.jizu"></el-input>
        </el-form-item>
        <el-form-item label="计算机网络" prop="jiwang">
          <el-input v-model="goodsForm.jiwang"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图片" prop="image">
          <el-button type="primary">上传图片</el-button>
        </el-form-item> -->
        <el-form-item label="描述" prop="descs">
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </el-form-item>
        <el-form-item label="排名" prop="rank">
          <el-input v-model="goodsForm.rank"></el-input>
          <el-form-item label="等级" prop="grade">
          <el-input v-model="goodsForm.grade"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsForm: {
        //表单容器-对象
        title: "", //名称
        price: "",
        num: "",
        sellPoint: "",
        jizu: "",
        jiwang: "",
        image: "",
        descs: "",
        rank:"",
        grade:"",
        category: "", //类目
        date1: "", //时间
        date2: "", //时间
      },
      rules: {
        //校验规则
        title: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入数据", trigger: "blur" }],
        num: [{ required: true, message: "请输入数据", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang='less' scoped>
.add-goods {
  margin: 20px;
}
.title {
  padding: 10px;
  background: #fff;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.myform {
  background: #fff;
  padding: 10px;
  padding-right: 30px;
}
.line{
    text-align: center;
}
</style>