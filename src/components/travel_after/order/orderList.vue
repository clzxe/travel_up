<template>
  <div >
    <VNav :currentNav="7" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div >
          <el-button class="dataNavListItem" @click="getList(0)"  >所有订单</el-button>
          <el-button class="dataNavListItem" @click="getList(1)" >路线订单</el-button>
          <el-button class="dataNavListItem"  @click="getList(2)" >酒店订单</el-button>
        </div>
        <div class="page_title">
          <h2 class="fl">订单列表</h2>
        </div>
        <section class="mtb">

          <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." />
          <input type="button" value="查询" class="group_btn" @click="subForm()"/>
        </section>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th>全选</th>
            <th>订单编号</th>
            <th>订单名称</th>
            <th>用户</th>
            <th>订单类别</th>
            <th>酒店或路线名称</th>
            <th>数量</th>
            <th>单价</th>
            <th>总价</th>
            <th>订单状态</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody id="showtable" v-for="(order,index) in orderList">
          <tr>
            <th><input type="checkbox" name="id" ></th>
            <td style="padding-left: 20px;max-width: 200px;">{{order.orderId}}</td>
            <td style="padding-left: 20px;max-width: 200px;">{{order.orderName}}</td>
            <td style="padding-left: 20px;">{{order.userName}}</td>
            <td style="text-align: center;">
              <span v-if="order.orderType===1">路线</span>
              <span v-if="order.orderType===2">酒店</span>
            </td>
            <td style="text-align: center;">
              <span v-if="order.orderType===2">{{order.typeName}}{{order.roomName}}</span>
              <span v-if="order.orderType===1">{{order.typeName}}</span>
            </td>
            <td style="text-align: center;">{{order.orderCount}}</td>
            <td style="text-align: center;">{{order.orderSingelPrice}}</td>
            <td style="text-align: center;">{{order.orderTotalPrice}}</td>
            <td style="text-align: center;">
              <span v-if="order.orderStatus===0">待付款</span>
              <span v-if="order.orderStatus===1">已完成</span>
              <span v-if="order.orderStatus===2">待确认</span>
              <span v-if="order.orderStatus===3">已取消</span>
              <span v-if="order.orderStatus===4">待评价</span>
              <span v-if="order.orderStatus===5">已失效</span>

            </td>
            <td style="text-align: center;">{{order.creatTime}}</td>

            <td class="center"><a href='http://localhost:8080/manager/product/updateView/"+item.pid+"' title="编辑" class="link_icon">&#101;</a>
              <a  title="删除" class="iconfont travel-iconshanchu"  style="color: #00a0e9;font-size: 25px"  @click="del(order)"></a>
              <a  title="查看" data-toggle="modal"
                  data-target="#seeScenic" class="iconfont travel-iconchakan"  style="color: #ff79c6;font-size: 29px"  @click="getScenic(order)"></a>
            </td>
          </tr>
          </tbody>


        </table>
        <div class="modal fade" id="seeScenic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" style="width: 800px;height: auto">
          <div class="modal-dialog" style="width: 658px;height: auto">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3 class="modal-title" id="seeScenicLabel">查看订单</h3>
              </div>
              <div class="modal-body">
                <form  method="post" name="travel-cus" class="cusForm">

                  <ul class="cus-table">
                    <li style="margin-top: 2%">
                      <label style="width: 98px">订单名称：</label>

                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="order.orderName" ></el-input>
                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">用户：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="order.userName"></el-input>

                    </li>

                    <li style="margin-top: 2%">
                      <label style="width: 98px">订单类别：</label>
                      <span v-if="order.orderType===1"> <el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="路线"></el-input></span>
                      <span v-if="order.orderType===2"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="酒店"></el-input></span>


                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">  路线或酒店名称：</label>
                      <span v-if="order.orderType===1"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="order.typeName+order.roomName"></el-input></span>
                      <span v-if="order.orderType===2"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="order.typeName"></el-input><</span>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">  数量：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="order.orderCount"></el-input>
                    </li>

                    <li style="margin-top: 2%">
                      <label style="width: 98px">单价：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="order.orderSingelPrice"></el-input>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">总价：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="order.orderTotalPrice"></el-input>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">创建时间：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="order.creatTime"></el-input>

                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">订单状态：</label>
                      <span v-if="order.orderStatus===0"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="待付款"></el-input></span>
                      <span v-if="order.orderStatus===1"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="已完成"></el-input></span>
                      <span v-if="order.orderStatus===2"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="待确认"></el-input></span>
                      <span v-if="order.orderStatus===3"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="已取消"></el-input></span>
                      <span v-if="order.orderStatus===4"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="待评价"></el-input></span>
                      <span v-if="order.orderStatus===5"><el-input style="font-weight: 100;width: 60%;" readonly="readonly" value="已失效"></el-input></span>
                    </li>
                    <li style="margin-top: 2%">
                      <label>图片：</label>
                      <label> <ul class="el-upload-list el-upload-list--picture-card" >
                        <li class="el-upload-list__item is-success"  style="width: 146px" >
                          <img style="width: 100%; height: 100%" :src="order.orderImg" />
                        </li>

                      </ul></label>

                    </li>
                  </ul>


                </form>
                <div>
                  <center>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
            </span>
                  </center>
                </div>
              </div>

            </div><!-- /.modal-content -->
          </div><!-- /.modal -->
        </div>
        <div id="pags">
          <!-- 分页  -->
          <div id="pagination" style="float:left;"></div>
          <div class="pageNum" style="margin-left:30%" >
            <!--分页-->

            <ul>
              <li style="width: 80px"><div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">共{{all}}页/{{totalCount}}条</div></li>
              <li style="font-size: 12px" class="threeword"><a href="">首页</a></li>
              <li style="font-size: 12px" class="threeword" v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
              <li style="font-size: 12px" class="threeword" v-if="cur===1"><a class="banclick">上一页</a></li>
              <li style="font-size: 12px" v-for="index in indexs" v-bind:class="{ 'header_active': cur === index}">
                <a v-on:click="btnClick(index)">{{index}}</a>
              </li>
              <li style="font-size: 12px" class="threeword" v-if="cur!==all"><a v-on:click="cur++,pageClick()">下一页</a></li>
              <li style="font-size: 12px" class="threeword" v-if="cur === all"><a class="banclick">下一页</a></li>
            </ul>
          </div>
        </div>


      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import VNav from "@/components/travel_after/common/nav";
  export default {
    name: "lineList",
    components:{
      VNav
    },
    data(){
      return{
        navList:['线路评价','酒店评价'],
        move:0,
        dataNavListRealWidth:0,
        dataNavListViewWidth:0,
        modalStatus2: false,
        m_title: "添加订单图片",
        m_content: "我是首页的内容",
        searchDate:{
          searchTitle:'',
          pageIndex:1,
          size:10,
          searchType:0
        },
        ImageList:[],
        orderList:'',
        order:[],
        total:'',
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }
    },
    created: function () {
      this.init();
    },
    computed:{
      indexs: function(){
        var left = 1;
        var right = this.all;
        var ar = [];
        if(this.all>= 5){
          if(this.cur > 3 && this.cur < this.all-2){
            left = this.cur - 2
            right = this.cur + 2
          }else{
            if(this.cur<=3){
              left = 1
              right = 5
            }else{
              right = this.all
              left = this.all -4
            }
          }
        }
        while (left <= right){
          ar.push(left)
          left ++
        }
        return ar
      }
    },

    methods:{
      dateFormat:function(dateT){
        var date = new Date(dateT);
        var str=date.getFullYear()+'-';
        str+=date.getMonth()+1+'-';
        str+=date.getDate()+' ';
        str+=date.getHours()+':';
        str+=date.getMinutes()+':';
        str+=date.getHours();
        return str;
      },
      getScenic(order){
        this.order=order;
      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("order/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.orderList=[];
            this.orderList=data.orderList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.searchType=data.searchType;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      },
//分页
      btnClick: function(data){//页码点击事件
        if(data != this.cur){
          this.cur = data
        }
//根据点击页数请求数据
        this.dataListFn(this.cur.toString());
      },
      pageClick: function(){
//根据点击页数请求数据
        this.dataListFn(this.cur.toString());
      },
      init() {
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=1;
        this.$axios.post("order/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.orderList=[];
            this.orderList=data.orderList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.searchType=data.searchType;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },


      del(order) {

        if(confirm("确实要删除吗？")){
          if(order.orderStatus===1){
            var qs=require('querystring')
            let config={
              header:{'Content-type':'application/x-www-form-urlencoded'}
            };
            this.$axios.post("order/del?orderId="+order.orderId,config)
              .then(successResponse=>{
                if(successResponse.data==="noLogin"){
                  alert("没有登录")
                  this.$router.replace({path:'/adminLogin'})
                }
                else {
                  alert("删除成功")
                  this.init()
                }
              })
              .catch(failResponse=>{
                alert("响应异常")
              })
          }
          else {
            alert("该订单处于运行状态不能删除");
          }
        }else {
          alert("已经取消了删除操作");
        }

      },
      subForm(){
        //获取输入框值
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=1;
        this.$axios.post("order/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.orderList=[];
            this.orderList=data.orderList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.searchType=data.searchType;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      },
      getList(typeNumber){
        this.searchDate.searchType=typeNumber;
        if(typeNumber===0){
          this.searchDate.searchTitle="";
        }
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=1;
        this.$axios.post("order/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.orderList=[];
            this.orderList=data.orderList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.searchType=data.searchType;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      }
    }
  }

</script>

<style scoped lang="less">
  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateY(-10px);
    opacity: 0;
  }

  .modal {
    width: 1000px;
    top: 30%;
    left: 50%;
    margin-toP: -250px;
    margin-left: -400px;
    border: 1px solid #666;

    .header {
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #666;
      border-bottom: 1px solid #000;
      box-sizing: border-box;
    }

    .content {
      background: orange;
      height: 290px;

    }

    .footer {
      height: 50px;
      line-height: 50px;

      button {
        vertical-align: middle;
        display: inline-block;
        width: 80px;
        height: 40px;
        line-height: 40px;
        color: #fff;

        &.danger {
          background: red;


        }

        &.default {
          background: #ddd;
        }

      }

    }
  }

  .header_active {
    background-color: #ffd800;
    height: 37px;
  }
</style>
