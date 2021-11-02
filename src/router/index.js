import Vue from 'vue'
import Router from 'vue-router'
import cityList from '@/components/travel_after/city/cityList'
import cityAdd from '@/components/travel_after/city/cityAdd'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/travel_up/common/index'
import login from "@/components/travel_up/login";
import register from "@/components/travel_up/register/register";
import register_ok from "@/components/travel_up/register/register_ok";
import adminLogin from "@/components/travel_after/adminLogin";
import adminIndex from "@/components/travel_after/common/adminIndex";
import scenicAdd from "@/components/travel_after/scenic/scenicAdd";
import scenicList from "@/components/travel_after/scenic/scenicList";
import scenicUpdate from "@/components/travel_after/scenic/scenicUpdate";
import user_order from "@/components/travel_up/user/user_order";
import search from "@/components/travel_up/search";
import user_password from "@/components/travel_up/user/user_password";
import user_update from "@/components/travel_up/user/user_update";
import user_collect from "@/components/travel_up/user/user_collect";
import user_money from "@/components/travel_up/user/user_money";
import user_eveal from "@/components/travel_up/user/user_eveal";
import user_strategy from "@/components/travel_up/user/user_strategy";
import favoriteScenicRank from "@/components/travel_up/favoriteScenicRank";
import car from "@/components/travel_up/car";
import scenic from  "@/components/travel_up/scenic";
import strategy from "@/components/travel_up/strategy";
import cityUpdate from '@/components/travel_after/city/cityUpdate'
import lines from '@/components/travel_up/line';
import hotel from '@/components/travel_up/hotel';
import notice from '@/components/travel_up/notice';
import orders from '@/components/travel_up/orders';
import order from '@/components/travel_up/order';
import provinceList from '@/components/travel_after/city/provinceList';
import linesAdd from '@/components/travel_after/lines/lineAdd';
import chart from '@/components/travel_after/chart/chart';
import chart_order from '@/components/travel_after/chart/chart_order';
import linesList from '@/components/travel_after/lines/lineList';
import linesUpdate from '@/components/travel_after/lines/lineUpdate';
import themeList from  '@/components/travel_after/themes/themeList';
import theme from '@/components/travel_up/theme';
import hotelAdd from '@/components/travel_after/hotel/hotelAdd';
import hotelList from '@/components/travel_after/hotel/hotelList';
import hotelUpdate from '@/components/travel_after/hotel/hotelUpdate';
import noticeList from '@/components/travel_after/notice/noticeList';
import leaderAdd from '@/components/travel_after/leader/leaderAdd';
import leaderList from '@/components/travel_after/leader/leaderList';
import leaderUpdate from '@/components/travel_after/leader/leaderUpdate';
import groupList from '@/components/travel_after/group/groupList';
import orderList from '@/components/travel_after/order/orderList';
import leaderIndex from '@/components/travel_leader/common/leaderIndex';
import leader_history from '@/components/travel_leader/leader_history';
import leader_lines from '@/components/travel_leader/leader_lines';
import leader_information from '@/components/travel_leader/leader_information';
import leader_password from '@/components/travel_leader/leader_password';
import userList from '@/components/travel_after/user/userList';
import evaluateList from '@/components/travel_after/evaluate/evaluateList';
import s_commentsList from '@/components/travel_after/comments/s_commentsList';
import groupLineAdd from '@/components/travel_after/group_line/groupLineAdd';
import groupLineList from '@/components/travel_after/group_line/groupLineList';
import groupLineUpdate from '@/components/travel_after/group_line/groupLineUpdate';
import strategyList from '@/components/travel_after/strategy/strategyList';
import nav_hotel from '@/components/travel_up/nav_hotel';
import nav_scenic from '@/components/travel_up/nav_scenic';
import nav_line from '@/components/travel_up/nav_line';
import nav_strategy from '@/components/travel_up/nav_strategy';
import add_strategy from '@/components/travel_up/add_strategy';
import update_strategy from '@/components/travel_up/update_strategy';
import try1 from '@/components/travel_up/try';
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 0,
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/h',
      name: 'HelloWord',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/register_ok',
      name: 'register_ok',
      component: register_ok
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: adminLogin
    },
    {
      path: '/adminIndex',
      name: 'adminIndex',
      component: adminIndex
    },
    {
      path: '/scenicAdd',
      name: '1-1',
      component: scenicAdd
    },
    {
      path: '/scenicList',
      name: 'scenicList',
      component: scenicList
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/scenicUpdate',
      name: 'scenicUpdate',
      component: scenicUpdate
    },
    {
      path: '/user_order',
      name: '1',
      component: user_order
    },
    {
      path: '/search',
      name: 'search',
      component: search
    }
    ,
    {
      path: '/user_password',
      name: '2',
      component:  user_password
    },
    {
      path: '/user_money',
      name: '3',
      component:  user_money
    },
    {
      path: '/user_update',
      name: '4',
      component:  user_update
    }
    ,
    {
      path: '/user_eveal',
      name: '5',
      component: user_eveal
    }
    ,
    {
      path: '/user_collect',
      name: '6',
      component: user_collect
    },
    {
      path: '/favoriteScenicRank',
      name: 'favoriteScenicRank',
      component: favoriteScenicRank
    },
    {
      path: '/car',
      name: 'car',
      component: car
    },
    {
      path: '/scenic',
      name: 'scenic',
      component: scenic
    },
    {
      path: '/strategy',
      name: 'strategy',
      component: strategy
    },
    {
      path: '/cityList',
      name: 'cityList',
      component: cityList
    },
    {
      path: '/cityAdd',
      name: 'cityAdd',
      component: cityAdd
    },
    {
      path: '/cityUpdate',
      name: 'cityUpdate',
      component: cityUpdate
    },
    {
      path: '/lines',
      name: 'lines',
      component: lines
    },
    {
      path: '/hotel',
      name: 'hotel',
      component: hotel
    },
    {
      path: '/theme',
      name: 'theme',
      component: theme
    },
    {
      path: '/add_strategy',
      name: 'add_strategy',
      component: add_strategy
    },
    {
      path: '/provinceList',
      name: 'provinceList',
      component: provinceList
    },
    {
      path: '/linesAdd',
      name: 'linesAdd',
      component: linesAdd
    },
    {
      path: '/linesList',
      name: 'linesList',
      component: linesList
    },
    {
      path: '/themeList',
      name: 'themeList',
      component: themeList
    },
    {
      path: '/linesUpdate',
      name: 'linesUpdate',
      component: linesUpdate
    },
    {
      path: '/hotelAdd',
      name: 'hotelAdd',
      component: hotelAdd
    },
    {
      path: '/hotelList',
      name: 'hotelList',
      component: hotelList
    },
    {
      path: '/hotelUpdate',
      name: 'hotelUpdate',
      component: hotelUpdate
    },
    {
      path: '/noticeList',
      name: 'noticeList',
      component: noticeList
    },
    {
      path: '/leaderAdd',
      name: 'leaderAdd',
      component: leaderAdd
    },
    {
      path: '/leaderList',
      name: 'leaderList',
      component: leaderList
    },
    {
      path: '/leaderUpdate',
      name: 'leaderUpdate',
      component: leaderUpdate
    },
    {
      path: '/groupList',
      name: 'groupList',
      component: groupList
    },
    {
      path: '/groupLineAdd',
      name: 'groupLineAdd',
      component: groupLineAdd
    },
    {
      path: '/groupLineList',
      name: 'groupLineList',
      component: groupLineList
    },
    {
      path: '/groupLineUpdate',
      name: 'groupLineUpdate',
      component: groupLineUpdate
    },
    {
      path: '/evaluateList',
      name: 'evaluateList',
      component: evaluateList
    },
    {
      path: '/s_commentsList',
      name: 's_commentsList',
      component: s_commentsList
    },
    {
      path: '/leaderIndex',
      name: 'leaderIndex',
      component: leaderIndex
    },
    {
      path: '/leader_information',
      name: 'leader_information',
      component: leader_information
    },
    {
      path: '/leader_password',
      name: 'leader_password',
      component: leader_password
    },
    {
      path: '/leader_lines',
      name: 'leader_lines',
      component: leader_lines
    },
    {
      path: '/leader_history',
      name: 'leader_history',
      component: leader_history
    },
    {
      path: '/userList',
      name: 'userList',
      component: userList
    },
    {
      path: '/nav_hotel',
      name: 'nav_hotel',
      component: nav_hotel
    },
    {
      path: '/nav_strategy',
      name: 'nav_strategy',
      component: nav_strategy
    },
    {
      path: '/nav_scenic',
      name: 'nav_scenic',
      component: nav_scenic
    },
    {
      path: '/nav_line',
      name: 'nav_line',
      component: nav_line
    },
    {
      path: '/try1',
      name: 'try1',
      component: try1
    },
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    {
      path: '/orders',
      name: 'orders',
      component: orders
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/update_strategy',
      name: 'update_strategy',
      component: update_strategy
    },
    {
      path: '/user_strategy',
      name: '7',
      component: user_strategy
    },
    {
      path: '/chart',
      name: 'chart',
      component: chart
    },
    {
      path: '/chart_order',
      name: 'chart_order',
      component: chart_order
    },
    {
      path: '/strategyList',
      name: 'strategyList',
      component: strategyList
    }

  ]
})
