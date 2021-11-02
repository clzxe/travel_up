<template>
  <div >
    <VNav :currentNav="11" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">订单列表</h2>
        </div>
        <section class="mtb">

          <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." />
          <input type="button" value="查询" class="group_btn" @click="subForm()"/>
        </section>
        <div>
          <el-button class="el-icon-s-home" :class="{active:searchDate.level===0}" @click="init" >全部评价</el-button>
          <el-button class="iconfont travel-iconhaoping3" style="color: #5cb85c" :class="{active:searchDate.level===1}" @click="getEvaluate(1)" >好评</el-button>
          <el-button class="iconfont travel-iconzhongping1" style="color: #EA8010" :class="{active:searchDate.level===2}" @click="getEvaluate(2)">中评</el-button>
          <el-button class="iconfont travel-iconchapingtongzhi" style="color: #dd4a68" :class="{active:searchDate.level===3}" @click="getEvaluate(3)">差评</el-button>
        </div>
        <table class="table table-bevaluateed">
          <thead>
          <tr>
            <th><input type="checkbox" name="id" ></th>
            <th style="text-align: center;">订单编号</th>
            <th style="text-align: center;">用户</th>
            <th style="text-align: center;">路线等级</th>
            <th style="text-align: center;">酒店等级</th>
            <th style="text-align: center;">评价内容</th>
            <th style="text-align: center;">评价时间</th>
            <th style="text-align: center;">操作</th>
          </tr>
          </thead>
          <tbody  v-for="(evaluate,index) in evaluateList" v-if="evaluateList.length!==0">
          <tr>
            <th><input type="checkbox" name="id" ></th>
            <td style="text-align: center;">{{evaluate.orderId}}</td>
            <td style="text-align: center;">{{evaluate.userName}}</td>
            <td style="text-align: center;">
              <span  v-if="evaluate.evaluateLevel===1">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
              <span  v-else-if="evaluate.evaluateLevel===2">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
              <div  v-else-if="evaluate.evaluateLevel===3">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </div>
              <span  v-else-if="evaluate.evaluateLevel===4">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
              <span v-else>
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
              </span>
            </td>
            <td style="text-align: center;">
              <span  v-if="evaluate.hotelLevel===1">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
              <span  v-else-if="evaluate.hotelLevel===2">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
              <div  v-else-if="evaluate.hotelLevel===3">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </div>
              <span  v-else-if="evaluate.hotelLevel===4">
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
              </span>
              <span v-else>
                <i style="float: left;margin-left: 20%"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
              </span>
            </td>
            <td style="text-align: center;">{{evaluate.evaluateContent}}</td>
            <td style="text-align: center;">{{evaluate.createTime}}</td>

            <td class="center">
              <a  title="删除" class="iconfont travel-iconshanchu"  style="color: #00a0e9;font-size: 25px"  @click="del(evaluate.evaluateId)"></a>
              <a  title="查看" data-toggle="modal"
                  data-target="#seeScenic" class="iconfont travel-iconchakan"  style="color: #ff79c6;font-size: 29px"  @click="getScenic(evaluate)"></a>
              <a  title="查看" data-toggle="modal"
                  data-target="#seeReply"  style="color: #ff79c6;font-size: 29px"  @click="getReply(evaluate.evaluateId)"><img style="    display: inherit;" src="@/assets/images/comment.png"></a>

            </td>
          </tr>
          </tbody>


        </table>
        <div class="modal fade" id="seeReply" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" style="width: 800px;height: auto">
          <div class="modal-dialog" style="width: 658px;height: auto">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3 class="modal-title" id="seeReplyLabel">查看回复</h3>
              </div>
              <div class="modal-body">
                <table v-if="replyList.length!==0">
                  <thead>
                  <tr>
                    <td>编号</td>
                    <td>用户</td>
                    <td>回复信息</td>
                    <td>创建时间</td>
                    <td>操作</td>
                  </tr>
                  </thead>
                  <tbody v-for="(reply,index) in replyList" >
                  <tr>
                    <td>
                      {{index+1}}
                    </td>
                    <td>
                      {{reply.userName}}
                    </td>
                    <td>
                      {{reply.replyContent}}
                    </td>
                    <td>
                      {{dateFormat(reply.createTime)}}
                    </td>
                    <td>
                      <el-button>删除</el-button>

                    </td>
                  </tr>
                  </tbody>
                </table>
                <center>
            <span slot="footer" class="dialog-footer">
                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
            </span>
                </center>
              </div>
            </div>

          </div><!-- /.modal-content -->
        </div><!-- /.modal -->

        <div class="modal fade" id="seeScenic" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" style="width: 800px;height: auto">
          <div class="modal-dialog" style="width: 658px;height: auto">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h3 class="modal-title" id="seeScenicLabel">查看评价</h3>
              </div>
              <div class="modal-body">
                <form  method="post" name="travel-cus" class="cusForm">

                  <ul class="cus-table">
                    <li style="margin-top: 2%">
                      <label style="width: 98px">订单编号：</label>

                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="evaluate.orderId" ></el-input>
                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">用户：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="evaluate.userName"></el-input>

                    </li>

                    <li style="margin-top: 2%">
                      <label style="width: 98px;float: left">评价类别：</label>
                      <span  v-if="evaluate.evaluateLevel===1">
                      <i style="float: left;"><img  src="@/assets/images/start_on.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                      <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                      </span>
                      <span  v-else-if="evaluate.evaluateLevel===2">
                        <i style="float: left;"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                      </span>
                      <div  v-else-if="evaluate.evaluateLevel===3">
                        <i style="float: left;"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                      </div>
                      <span  v-else-if="evaluate.evaluateLevel===4">
                        <i style="float: left;"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                      </span>
                      <span v-else>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                      </span>
                      <br>
                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">  评价内容：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="evaluate.evaluateContent"></el-input>
                    </li>
                    <li style="margin-top: 2%">
                      <label style="width: 98px">  创建时间：</label>
                      <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="evaluate.createTime"></el-input>
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
        modalStatus2: false,
        m_title: "添加订单图片",
        m_content: "我是首页的内容",
        searchDate:{
          searchTitle:'',
          pageIndex:1,
          size:10,
          level:0
        },
        replyList:[],
        ImageList:[],
        evaluateList:'',
        total:'',
        pageCount:'',
        evaluate:[],
        totalData:'', all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
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
      getScenic(evaluate){
        this.evaluate=evaluate;
      },
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
      // 当菜单项向右的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即右移移动一个菜单项的宽度），
      // 当菜单项向右的可移动距离小于单个菜单项的宽度时，move等于0（即回到最开始没有移动的状态）
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("evaluates/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.evaluateList=[];
            this.evaluateList=data.evaluateList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.level=data.level;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      },
//分页
      getReply:function(commentId){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/e_comment/getReplyList?commentId="+commentId)
          .then(successReqponse => {
            if(successReqponse.data.replyList.length===0){
              alert("没有数据！");
            }
            else {
              this.replyList=[];
              this.replyList=successReqponse.data.replyList;
            }
          })
          .catch(failRespose => {
            console.log("数据加载错误！正在重新载入...");
            //this.$router.replace("/e_commentList");
          })
      },
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
        this.searchDate.pageIndex=this.cur;
        this.$axios.post("evaluates/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.evaluateList=[];
            this.evaluateList=data.evaluateList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.level=data.level;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },


      del(evaluateId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };

          this.$axios.post("evaluates/del?evaluateId="+evaluateId,config)
            .then(successResponse=>{
              if(successResponse.data==="noLogin"){
                alert("没有登录")
                this.$router.replace({path:'/adminLogin'})
              }
              else {
                alert("删除成功")
                this.$router.go(0)
              }
            })
            .catch(failResponse=>{
              alert("响应异常")
            })
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
        this.$axios.post("evaluates/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.evaluateList=[];
            this.evaluateList=data.evaluateList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.level=data.level;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      },

      getEvaluate(level){
        //获取输入框值
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.level=level;
        this.searchDate.pageIndex=1;
        this.$axios.post("evaluates/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.evaluateList=[];
            this.evaluateList=data.evaluateList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
            this.searchDate.level=data.level;
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
    top: 50%;
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
