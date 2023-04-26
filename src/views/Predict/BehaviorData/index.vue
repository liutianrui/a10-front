<template>
  <div class="container">
    <!-- 1. 目录位置 -->
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order' }"
          >预测结果</el-breadcrumb-item
        >
        <el-breadcrumb-item>行为数据</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 2. 搜索区域 -->
    <div class="header">
      <!-- change	仅在输入框失去焦点或用户按下回车时触发 -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="编号">
          <el-input v-model="formInline.user" placeholder="编号"></el-input>
        </el-form-item>
        <el-form-item label="年级">
          <el-select v-model="formInline.region" placeholder="年级">
            <el-option label="大一" value="1"></el-option>
            <el-option label="大二" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生姓名">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleSearch" type="primary" icon="el-icon-search">搜索</el-button>
          <!-- <el-button type="primary">查询</el-button> -->
          <el-button type="success" icon="el-icon-magic-stick" @click="showPie">查看饼状图</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 3. 表格 -->
     <div class="order-list">
      <el-table :data="tableData" border>
<!--        <el-table-column type="selection" width="55"></el-table-column>-->
<!--        <el-table-column prop="id" label="ID" width="80"></el-table-column>-->
        <!-- <el-table-column prop="name" label="学生姓名">
        </el-table-column> -->
        <el-table-column prop="location" label="刷卡地点">
          <template slot-scope="scope">{{scope.row.location | locationTextFilter}}</template>
        </el-table-column>
        <el-table-column prop="consume" label="消费金额">
        </el-table-column>
        <el-table-column prop="date" label="刷卡时间">
        </el-table-column>
<!--        <el-table-column prop="time" label="购买日期"> </el-table-column>-->
<!--        <el-table-column label="操作">-->
<!--          <template slot-scope="scope">-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="primary"-->
<!--              icon="el-icon-edit-outline"-->
<!--              @click="handleEdit(scope.$index, scope.row)"-->
<!--              >编辑</el-button-->
<!--            >-->
<!--            <el-button-->
<!--              size="mini"-->
<!--              type="danger"-->
<!--              @click="handleDelete(scope.$index, scope.row)"-->
<!--              icon="el-icon-delete-solid"-->
<!--              >删除</el-button-->
<!--            >-->
<!--          </template>-->
<!--        </el-table-column>-->
      </el-table>
    </div>

    <el-dialog
      title="学生刷卡记录饼状图"
      :visible.sync="isShowPie"
      width="50%"
    >
      <div id="pie-wrapper" ref="pie"></div>

    </el-dialog>

    <!-- 4. 分页 -->
    <MyPagination :total="total" :pageSize="pageSize" @changePage="changePage" />
  </div>
</template>

<script>
import MyPagination from "../../../components/MyPagination.vue";
import * as echarts from 'echarts'
const locationMap = {
  'washingroom': '洗衣房',
  'library': '图书馆',
  'bus':'校车',
  'office':'教务处',
  'pringting':'文印中心',
  'boiling':'开水',
  'supermarket':'超市',
  'hospital':'校医院',
  'etc':'其他',
  'bath':'淋浴',
  'canteen':'食堂'
}
export default {
  components: {
    MyPagination,
  },
  data() {
    return {
      input: "",
      formInline: {
        user: "",
        region: "",
      },
      isShowPie: false,
      tableData: [],
      total: 1,
      pageSize: 20,
    };
  },
  filters:{
    locationTextFilter(location){
      return locationMap[location]
    }
  },
  methods: {
    /**
     * 点击分页
     */
    changePage(num) {
      this.handleSearch(num)
    },

    async showPie(){
      const {user} = this.formInline
      if (user){
        const loading = this.$loading({fullscreen:true})
        try {
          const res = await this.$api.doShowPie(user)
          if (res.data.status === 200){
            console.log(res.data)
            this.isShowPie = true
            this.$nextTick(() => {
              echarts.init(this.$refs['pie']).setOption({
                series: [
                  {
                    type: 'pie',
                    data: Object.keys(res.data.data).map(key => ({
                      name: locationMap[key],
                      value: res.data.data[key]
                    }))
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
          this.$message.error('查看饼状图出错')
        }finally {
          loading.close()
        }

      }else {
        this.$message.warning('请输入学生编号')
      }
    },

    async handleSearch(page){
      const loading = this.$loading({fullscreen: true})
      const {user} = this.formInline
      try {
        const res = await this.$api.orderList({page: typeof page === 'number' ? page : 1, stu_id: user})
        if (res.data.status === 200){
          this.tableData = res.data.data.list
          this.total = res.data.data.total_data
        }else {
          this.$message.error(res.data.info)
        }
      }catch (err){
        this.$message.error('查询失败')
      }finally {
        loading.close()
      }

    },
    /**
     * 编辑
     */
    handleEdit() {

    },
    /**
     * 删除
     */
    handleDelete() {

    },
    /**
     * 获取订单数据
     */
    // http(page) {
    //   this.$api.orderList({ page }).then((res) => {
    //     console.log(res.data);
    //     if (res.data.status === 200) {
    //       this.tableData = res.data.data.list;
    //       this.total = res.data.data.totalPage;
    //     } else {
    //       this.tableData = [];
    //       this.total = 1;
    //     }
    //   });
    // },
  },
  // created() {
  //   this.http(1);
  // },
};
</script>

<style lang='less' scoped>
.container {
  margin: 10px;
}
.nav {
  padding: 10px;
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
// 订单列表
.order-list {
  margin: 20px 0;
  padding: 16px;
  border: 1px solid #eee;
  background: #fff;
}

#pie-wrapper{
  width: 100%;
  height: 500px;
}
</style>
