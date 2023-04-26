## GPA成绩预测管理系统
GPA成绩预测管理系统，包含成绩管理 预测成绩 课程信息等。 

## 项目启动和运行
1. 首先启动MySQL数据库管理工具，使用
phpMyAdmin，的登录进去。
2. 使用VsCode打开前端项目，下载安装所需的依赖：npm install
3. 使用Pycahrm打开后端项目，运行app.py
4. 查看package.json文件，使用npm run serve命令启动前端项目
5. 点击启动成功后的网址进入系统。

## 前后端分离：
   用户 --> 前端-视图-数据 --> 后台提供接口 --> 数据库  

## 技术点
   Vue + Flask + Vue-router  + Vuex + Element-ui + Echarts + MySQL

## 后台服务
1. flask
2. jwt（生成token）jsonwebtoken   解析token: 安装： jwt-decode 
3. mysql

## 接口名称	对应路由
登录	/user_login
预测结果刷卡记录	/stu_card/<stuno>/<page>
预测结果饼状图	/pie/<stuno>
可视化运行算法	/classify
获取成绩列表	/stu_score
删除学生记录	/delStu
..
## echarts 
1. 安装：npm install echarts -S
2. 使用方式
   1. 导入echarts在组件内使用
   2. 导入全局 挂载原型上 全局使用
   3. 开发成vue插件 

3. 使用 -main.js
   1. import * as echarts from 'echarts'
        Vue.prototype.$echarts = echarts;

    2. 直接使用
       this.$echarts.xxx

## VUE项目实现表格导出EXCEL表格 
1. 安装 -- 使用npm安装：
    npm install file-saver xlsx -S
    npm install script-loader -D
2. 在/src目录下新建一个excel文件夹，存入Blob.js和Export2Excel.js文件
3. 在common文件夹里新建js文件夹再新建util.js
4. 在vue项目中的使用 --- 在需要的页面import引入
   import { export2Excel } from '../../common/js/util'
5. 表头初始化
6. 点击导出


