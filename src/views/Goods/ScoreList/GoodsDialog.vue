<template>
  <div>
    <!--
            title="添加" 弹框的标题
            :visible.sync="dialogVisible" 控制弹框显示隐藏 boolean  true显示
            width="70%" 宽度 大小
       -->
       <!-- 弹框添加 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="clearForm"
    >
      <!-- 内容区域 -->
      <el-form
        :model="goodsForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <!-- <el-form-item label="类目选择" prop="category">
          <el-button type="primary" @click="innerVisible = true"
            >类目选择</el-button
          >
          <span style="margin-left: 10px">{{ goodsForm.category }}</span>
        </el-form-item> -->
        <el-form-item label="ID" prop="id">
          <el-input v-model="goodsForm.id"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="stu_name">
          <el-input v-model="goodsForm.stu_name"></el-input>
        </el-form-item>
        <el-form-item label="Java" prop="JAVA">
          <el-input v-model="goodsForm.JAVA"></el-input>
        </el-form-item>
        <el-form-item label="Python" prop="Python">
          <el-input v-model="goodsForm.Python"></el-input>
        </el-form-item>
        <el-form-item label="数据结构" prop="DS">
          <el-input v-model="goodsForm.DS"></el-input>
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
        
        <el-form-item label="操作系统" prop="OS">
          <el-input v-model="goodsForm.OS"></el-input>
        </el-form-item>

        <el-form-item label="组成原理" prop="CS">
          <el-input v-model="goodsForm.CS"></el-input>
        </el-form-item>

        <el-form-item label="计网" prop="CN">
          <el-input v-model="goodsForm.CN"></el-input>
        </el-form-item>
        <el-form-item label="排名" prop="rank">
          <el-input v-model="goodsForm.rank"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="grade">
          <el-input v-model="goodsForm.grade"></el-input>
        </el-form-item>
        <!-- <el-form-item label="图片" prop="image">
          <el-button type="primary" @click="innerVisibleImg = true"
            >上传图片</el-button
          >
          <img
            :src="goodsForm.image"
            height="200px"
            style="margin-left: 10px"
            alt=""
          />
        </el-form-item> -->

        <!-- <el-form-item label="备注" prop="notice">
          <WangEditor ref="myEditor" @sendEditor="sendEditor" />
        </el-form-item> -->
        <!-- 规格参数配置 -->
        <el-form-item label="规格参数配置" v-show="isShow">
          <el-form
            ref="dynamicValidateForm"
            label-width="120px"
            class="demo-dynamic"
          >
            <el-form-item
              v-for="(item, index) in groups"
              :label="item.title"
              :key="index"
              :prop="item.value"
            >
                <el-input v-model="item.value"></el-input>
              <!-- 内层的表单项 -->
              <el-form-item
                v-for="(ele, i) in item.children"
                :label="ele.title"
                :key="i"
                :prop="ele.value"
              >
                  <el-input v-model="ele.value"></el-input>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>

      <!-- 弹框底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>

      <!-- 1. 内弹框--- 类目选择 -->
      <el-dialog
        width="40%"
        title="类目选择"
        :visible.sync="innerVisible"
        append-to-body
      >
        <TreeGoods @sendTreeData="sendTreeData" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="showTreeData">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 2. 内弹框 --- 上传图片 -->
      <!-- <el-dialog
        width="40%"
        title="上传图片"
        :visible.sync="innerVisibleImg"
        append-to-body
      >
        <UploadImg @sendImg="sendImg" ref="upload" />
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisibleImg = false">取 消</el-button>
          <el-button type="primary" @click="showImg">确 定</el-button>
        </span>
      </el-dialog> -->
    </el-dialog>
  </div>
</template>

<script>
import TreeGoods from "./TreeGoods.vue";
import UploadImg from "./UploadImg.vue";
import WangEditor from "./WangEditor.vue";
export default {
  props: {
    title: {
      type: String,
      default: "添加成绩",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  components: {
    TreeGoods,
    UploadImg,
    WangEditor,
  },
  data() {
    return {
      isShow: false, //是否显示规格参数配置
      dialogVisible: false, //外弹框
      innerVisible: false, //内弹框
      innerVisibleImg: false, //图片弹框
      treeData: {}, //接受tree数据
      imgUrl: "",
      goodsForm: {
        //表单容器-对象
        id: "",
        title: "", //商品名称
        price: "",
        num: "",
        sellPoint: "",
        jizu: "",
        jiwang: "",
        image: "",
        descs: "",
        rank:"",
        grade:"",
        cid: "", //类目的id
        category: "", //商品类目
        date1: "", //商品时间
        date2: "", //商品时间
      },
      groups: [],//规格参数
      rules: {
        //校验规则
        title: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入数据", trigger: "blur" }],
        num: [{ required: true, message: "请输入数据", trigger: "blur" }],
      },
    };
  },
  //监听器---------
  watch: {
    rowData(val) {
      console.log("监听数据变化", val);
      this.goodsForm = val;
      //设置富文本编辑的数据内容
      this.$nextTick(() => {
        this.$refs.myEditor.editor.txt.html(val.descs);
      });
      //是否显示规格配置参数----------------------
      if(val.paramsInfo){//显示规格参数
        this.isShow = true;
        this.groups = JSON.parse(val.paramsInfo)
      }
    },
  },
  methods: {
    /**
     * 接受wangeditor数据
     */
    sendEditor(val) {
      this.goodsForm.notice = val;
    },
    /**
     * 显示图片的地址
     */
    sendImg(val) {
      console.log("显示图片的地址", val);
      this.imgUrl = val;
    },
    /**
     * 显示图片--确定按钮
     */
    showImg() {
      this.innerVisibleImg = false;
      this.goodsForm.image = this.imgUrl;
      //清空图片上传的列表
      this.$refs.upload.fileList = [];
    },
    /**
     * 显示tree数据
     */
    showTreeData() {
      this.innerVisible = false;
      //显示tree数据
      this.goodsForm.category = this.treeData.name;
      this.goodsForm.cid = this.treeData.cid;
      //显示规格参数--- 获取--------------
      // this.isShow = true;
      this.$api
        .categoryData({
          cid: this.treeData.cid,
        })
        .then((res) => {
          console.log("显示规格参数--- 获取-", res.data);
          if (res.data.status === 200) {
            //有类目规格配置参数-------------
            this.isShow = true;
            //存储规格参数
            let result = res.data.result[res.data.result.length - 1];
            console.log(result.paramData);
            this.groups = JSON.parse(result.paramData);
          } else {
            this.isShow = false;
          }
        });
    },
    /**
     * 获取tree数据
     */
    sendTreeData(val) {
      console.log("tree数据", val);
      this.treeData = val;
    },
    //自定义事件--通知父亲--修改dialogVisible
    close() {
      this.$emit("changeDialog");
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log("获取输入的信息", this.goodsForm);
          console.log('规格参数配置信息',this.groups);
          //title cid  category sellPoint price num descs paramsInfo image
          let {
            title,
            cid,
            category,
            sellPoint,
            jizu,
            jiwang,
            price,
            num,
            descs,
            rank,
            grade,
            image,
            id,
          } = this.goodsForm;
          //判断当前的确定按钮类型：
          if (this.title === "添加成绩") {
            console.log("添加成绩");
            this.$api
              .addGoods({
                title,
                cid,
                category,
                sellPoint,
                jizu,
                jiwang,
                price,
                num,
                descs,
                rank,
                grade,
                image,
                paramsInfo:JSON.stringify(this.groups)
              })
              .then((res) => {
                console.log("添加---实现---", res.data);
                if (res.data.status === 200) {
                  //成功
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "添加成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                } else {
                  this.$message.error("错了哦，这是一条错误消息");
                }
              });
          } else {
            console.log("编辑信息");
            this.$api
              .updateGoods({
                id,
                title,
                cid,
                category,
                sellPoint,
                jizu,
                jiwang,
                price,
                num,
                descs,
                rank,
                grade,
                image,
                 paramsInfo:JSON.stringify(this.groups)
              })
              .then((res) => {
                console.log(res.data);
                if (res.data.status === 200) {
                  this.$parent.http(1); //更新父组件列表数据
                  this.$message({
                    message: "修改成功",
                    type: "success",
                  });
                  //清空表单
                  this.clearForm();
                } else {
                  //修改失败了--
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * 清空表单数据列表
     */
    clearForm() {
      this.dialogVisible = false; //1.关闭弹框
      // 清空表单  1 使用element里面的重置表单  2 自己手动初始化goodsForm
      // this.$refs.ruleForm.resetFields();
      this.goodsForm = {
        title: "", 
        price: "",
        num: "",
        sellPoint: "",
        jizu: "",
        jiwang: "",
        image: "",
        descs: "",
        rank:"",
        grade:"",
        cid: "", 
        category: "", 
        date1: "", 
        date2: "", 
      };
      //单独-清空编辑器内容--editor.txt.clear()
      this.$refs.myEditor.editor.txt.clear();
      //清空规格参数
      this.groups =[];
      this.isShow = false;
    },
  },
};
</script>

<style lang='less' scoped>
.line {
  text-align: center;
}
</style>
