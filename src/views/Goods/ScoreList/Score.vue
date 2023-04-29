<template>
  <div class="goods">
    <!-- 位置显示 -->
    <div class='position'>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/goods' }">数据集管理</el-breadcrumb-item>
        <el-breadcrumb-item>数据集列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card">
      <el-form :inline="true" size="small"
               style="padding-top: 5px;padding-left: 15px;">
        <el-form-item label="sample_id">
          <el-input v-model="sample_id" placeholder="sample_id" clearable></el-input>
        </el-form-item>
        <el-form-item label="label">
          <el-input v-model="label" placeholder="请输入label" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 2. 表格区域展示数据 -->
    <div class="text item">
      <el-table :data="tableData" stripe border highlight-current-row style="width: 100%;margin-top: 5px;" size="small">
        <el-table-column align="center" header-align="center" type="selection"
                         width="50"></el-table-column>
<!--        <el-table-column align="center" header-align="center" label="序号" type="index" :index="indexStart"-->
<!--                         width="50"></el-table-column>-->
        <el-table-column prop="sample_id" width="120" align="center" sortable label="sample_id">
        </el-table-column>
        <!-- 名称 -->
        <el-table-column prop="feature0" label="feature0">
        </el-table-column>
        <el-table-column prop="feature1" label="feature1" width="120">
        </el-table-column>
        <el-table-column prop="feature2" label="feature2">
        </el-table-column>
        <el-table-column prop="feature3" label="feature3">
        </el-table-column>
        <el-table-column prop="feature4" label="feature4">
        </el-table-column>
        <el-table-column prop="feature5" label="feature5">
        </el-table-column>
        <el-table-column prop="feature6" label="feature6">
        </el-table-column>
<!--        <el-table-column prop="feature7" label="feature7">-->
<!--        </el-table-column>-->
        <el-table-column prop="label" width="120" align="center" sortable label="label" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-button size="mini">查看</el-button> -->
            <!--              <el-button-->
            <!--                type="primary"-->
            <!--                size="mini"-->
            <!--                @click="handleEdit(scope.$index, scope.row)"-->
            <!--                icon="el-icon-edit"-->
            <!--              >-->
            <!--                编辑</el-button-->
            <!--              >-->
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.sample_id)"
                icon="el-icon-delete"
            >删除
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 全选 -- 反选 -- 批量删除 -->
    <!--      <div class="bottom">-->
    <!--        <el-button type="primary" size="small">全选</el-button>-->
    <!--        <el-button type="primary" size="small">反选</el-button>-->
    <!--        <el-button type="primary" size="small">批量删除</el-button>-->
    <!--      </div>-->
    <!-- 3. 分页 -->
    <MyPagination
        :total="total"
        :pageSize="pageSize"
        @changePage="changePage"
    />

    <!-- 4. 显示弹框组件 操作子组件：1. 父传子 2. children   3. ref  -->
    <!-- <GoodsDialog :dialogVisible='dialogVisible'  @changeDialog='changeDialog'/> -->
    <GoodsDialog ref="dialog" :title="title" :rowData="rowData"/>
  </div>
</template>

<script>
import MyPagination from "../../../components/MyPagination.vue";
import GoodsDialog from "./GoodsDialog.vue";

export default {
  components: {
    MyPagination,
    GoodsDialog,
  },
  data() {
    return {
      dataForm: {},
      input: "",
      sample_id: "",
      label: "",
      formInline: {
        user: "",
        region: "",
      },
      tableData: [],
      total: 10,
      pageSize: 20,
      type: 1,
      list: [],
      dialogVisible: false,
      currentPage: 1, //选中的高亮页码
      title: "添加成绩",
      rowData: {}, //当前行的数据对象
      fileList: []
    };
  },
  methods: {

    handleSearch() {
      this.http(1)
    },
    /**
     * 添加--出现弹框
     */
    addGoods() {
      // this.dialogVisible = true;
      //修改子组件实例的数据
      this.$refs.dialog.dialogVisible = true;
      this.title = "添加成绩";
    },
    changeDialog() {
      this.dialogVisible = false;
    },
    /**
     * 分页页码
     */
    changePage(num) {
      this.http(num)
    },
    /**
     搜索查询数据
     */
    searchInp(val) {
      if (!val) {
        this.http(1);
        this.currentPage = 1;
        this.type = 1;
        return;
      }
      this.$api
          .getSearch({
            search: val,
          })
          .then((res) => {
            console.log("搜索---", res.data);
            this.currentPage = 1;
            if (res.data.status === 200) {
              this.list = res.data.result; //获取的搜索的总数据条数---数据分割
              //假设需要分页---我们处理分页----
              this.total = res.data.result.length;
              this.pageSize = 3;
              this.tableData = res.data.result.slice(0, 3);
              this.type = 2;
              console.log("分页", this.currentPage);
            } else {
              this.tableData = [];
              this.total = 1;
              this.pageSize = 1;
              this.type = 1;
            }
          });
    },
    /**
     * 编辑操作
     */
    handleEdit(index, row) {
      //row={}
      //1. 点击编辑按钮 显示弹框  2. 弹框上回显数据展示 -当前的行的数据
      this.$refs.dialog.dialogVisible = true;
      this.title = "编辑信息";
      this.rowData = {...row};
      // this.$refs.dialog.goodsForm = row;//方法1：
    },
    /**
     * 删除操作
     */
    handleDelete(ID) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            //请求接口----
            this.$api
                .delDataset(ID)
                .then((res) => {
                  if (res.data.status === 200) {
                    this.$message({
                      type: "success",
                      message: "删除成功!",
                    });
                    //视图更新
                    this.http(1);
                  } else {
                    this.$message.error(res.data.info)
                  }
                }).catch(err => {
              this.$message.error('出错了')
            })
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },
    /**
     * 数据集列表获取
     */
    http(page) {
      const loading = this.$loading({fullscreen: true, text: '加载中...'})
      this.$api
          .getdataList(Object.assign({page},//原ScoreList
              this.sample_id.length > 0 ? {sample_id: this.sample_id} : {},
              this.label.length > 0 ? {label: this.label} : {}))
          .then((res) => {
            console.log('data', res.data);
            if (res.data.status === 200) {
              this.tableData = res.data.data.list; //数据列表
              this.total = res.data.data.total_data;
            }
          }).catch(err => {
        this.$message.error(`获取数据失败： ${err.message || JSON.stringify(err)}`)
      }).finally(() => {
        loading.close()
      })
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
    }
  },
  //生命周期函数
  created() {
    this.http(1);
  },
};
</script>

<style lang='less' scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 33%;
}
.goods {
  margin: 10px;
}

.position {
  // background: #fff;
  padding: 10px;
  // border: 1px solid #eee;
  margin-bottom: 10px;
}

.header {
  display: flex;
  background: #fff;
  padding: 10px;
  border: 1px solid #eee;

  button {
    margin-left: 20px;
  }

  .el-form-item {
    margin-bottom: 0;
  }
}

.wrapper {
  margin: 10px 0;
}
</style>
