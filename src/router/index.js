import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Home from '../views/Home/index.vue'
import Login from '../views/Login/Login.vue'

//异步
const Goods = ()=>import('../views/Goods/index.vue')
const ScoreList = ()=>import('../views/Goods/ScoreList/Score.vue')
const ScoreVerify = ()=>import('../views/Goods/ScoreVerify/index.vue')
const Params = ()=>import('../views/Params/Params.vue')
const DetailedInfo =()=>import('../views/Params/ParamsInfo/DetailedInfo.vue')
const ClassifyModel = ()=>import('../views/ClassifyModel/ClassifyModel.vue')
const Predict = ()=>import('../views/Predict/index.vue')
const BehaviorData = ()=>import('../views/Predict/BehaviorData/index.vue')
const InitialData = ()=>import('../views/Predict/InitialData/index.vue')
const BackGround =()=>import('../views/Predict/BackGround/index.vue')
const Visualization =()=>import('../views/Predict/Visualization/index.vue')
const User =() =>import('../views/User/index.vue')
//子级路由
const AddGoods = ()=>import('../views/Goods/ScoreList/AddScore.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    component:Layout,
    //路由元信息
    meta:{
      isLogin:true
    },
    children:[
      {
        path:'/',
        name:'Home',
        component:Home
      },
      {
        path:'/goods',
        name:'Goods',
        component:Goods,
        redirect:'/goods/goods-list',
        children:[
          {
            path:'goods-list',
            name:'GoodsList',
            component:ScoreList
          },{
            path:'goods-verify',
            name:'ScoreVerify',
            component:ScoreVerify
          }
        ]
      },
      {
        path:'/add-goods',
        name:'AddGoods',
        component:AddGoods
      },
      {
        path:'/params',
        name:'Params',
        component:Params,
        redirect:'/params/specifications',
        children:[
          {
            path:'specifications',
            name:'DetailedInfo',
            component:DetailedInfo
          }
        ]
      },
      {
        path:'/advert',
        name:'ClassifyModel',
        component:ClassifyModel
      },
      {
        path:'/user',
        name:'User',
        component:User
      },
      {
        path:'/order',
        name:'Predict',
        component:Predict,
        redirect:'/order/order-list',
        children:[
          {
            path:'order-list',
            component:BehaviorData
          },
          {
            path:'order-back',
            component:InitialData
          },
          {
            path:'change-goods',
            component:BackGround
          },
          {
            path:'send-goods',
            component:Visualization
          }
        ]
      }
    ]
  },
  {
    path:'/login',
    name:'Login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})



export default router
