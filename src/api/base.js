/**
 * 接口路径配置：
 * 一般文件目录：base.js  index.js
 * 但是公司不一定
 *      config
 *          login  index.js config.js
 *       index.js
 *       xxxx.js
 */
const base ={
    login:'/user_login',//登录接口
    register:'/register',//注册接口
    behavedata:"/stu_card",// //原stu_card
    dataList:'/fault_diagnosis_data', //成绩列表 -- 故障诊断数据列表
    search:'/api/search',//搜索
    selectCategory:'/api/backend/itemCategory/selectItemCategoryByParentId',//类目选择
    uploadUrl:'/api/upload',//图片上传 post请求
    addGoods:'/api/backend/item/insertTbItem',//添加
    deleteGoods:'/api/backend/item/deleteItemById',//删除
    updateGoods:'/api/backend/item/updateTbItem',//编辑
    params:'/api/backend/itemParam/selectItemParamAll',//参数列表
    statistical:'/api/statistical',//统计数据
    sellTotal:"/api/sellTotal",//统计数据

    insertItemParam:"/api/backend/itemParam/insertItemParam",//规格参数配置-添加
    categoryData:"/api/category/data",//规格参数配置
    classify: '/classify',
    cardPie: '/pie', //行为数据饼状图
    delDataset: '/delDataset',
    fileUpload: '/file_upload', //数据集文件上传
    jsonDownload: '/jsonDownload' //预测结果json下载
}

export default base;
