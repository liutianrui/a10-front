/**
 * 请求的方法
 */

// import axios from 'axios'
import base from './base'
//node>js
// const qs = require('querystring')
//导入二次封装的axios文件
import axios from '../utils/request'

//axios接口配置基础地址
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
// http://localhost:8989

const api = {
    /**
     * 登录接口
     */
    getLogin(params) {//params={username:'',password:''}
        return axios.post(base.login, params)
    },

    doClassify() {
        return axios.get(base.classify)
    },

    doShowPie(stuno) {
        return axios.get(base.cardPie + `/${stuno}`)
    },

    /**
     * 成绩列表
     */
    getdataList(params) {//{page:xx}
        return axios.get(base.dataList, {
            params
        })
    },

    delDataset(ID) {
        return axios.post(base.delDataset, {
            ID
        })
    },

    /**
     * 搜索成绩数据
     * search
     */
    getSearch(params) {//{search:xx}
        return axios.get(base.search, {params})
    },
    /**
     * 获取类目选择
     * {id：cid}
     */
    getSelectCategory(params) {
        return axios.get(base.selectCategory, {params})
    },
    /**
     * 添加成绩
     * 参数： title cid  category sellPoint price num desc paramsInfo image
     */
    addGoods(params) {//={}
        return axios.get(base.addGoods, {
            params
        })
    },
    /**
     * 删除成绩 id
     */
    deleteGoods(params) {
        return axios.get(base.deleteGoods, {params})
    },
    /**
     * 编辑成绩id
     */
    updateGoods(params) {
        return axios.get(base.updateGoods, {params})
    },
    /**
     * 统计数据
     */
    getStatistical() {
        return axios.get(base.statistical)
    },

    getSellTotal() {
        return axios.get(base.sellTotal)
    },
    /**
     * 规格参数获取列表
     * page：xx
     */
    getParams(params) {
        return axios.get(base.params, {params})
    },
    /**
     * 获取行为数据
     * 原始数据集的增删改查
     * currPage:xx
     */
    behavedata({sample_id, page}) {
        return axios.get(base.behavedata + `/${sample_id}/${page}`)
    },
    /**
     * 规格参数新增
     *  参数：itemCatId,content,specsName
     */
    insertItemParam(params) {
        return axios.get(base.insertItemParam, {params})
    },
    /**
     * 成绩列表---获取类目规格配置
     * cid
     */
    categoryData(params) {
        return axios.get(base.categoryData, {params})
    },
    fileUpload(file) {
        return axios.post(base.fileUpload, {
            file
        })
    }


}

export default api
