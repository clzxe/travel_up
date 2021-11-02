<template>
  <div id="app">
    <VHeader :currentHeader="5"></VHeader>
    <div :style="{background:bg}">
      <div>
        <img style="width: 85%;margin-left: 7%" :src="strategy.strategyImg">
      </div>
      <div style="background-color: white;width: 85%;margin-left: 7%;margin-top: -5%">
        <el-main class="scenic_header">
          <div class="row">
            <div class="col-md-10" >


              <div class="row">

                <div class="col-md-2">
                  <img :src="strategy.userHead" style="border-radius:45%;width: 100px;height: 100px"
                            />
                </div>
                <div class="col-md-10">

                  <div class="row">
                    <div class="col-md-10" style="font-size: 25px;color: white;font-weight: bold">{{strategy.strategyName}}</div>
                  </div>


                  <div class="row" style="margin-top:12%">
                    <div class="col-md-1"></div>
                    <div class="col-md-9" style="margin-top: 2%;font-size: 19px;color: #EA8010">{{strategy.userName}}  &nbsp;共发表{{countStrategy}}篇攻略</div>
                  </div>
                </div>
              </div>

            </div>

            <div class="col-md-2" style="padding-left:3%;">
              <div class="row">
                <p>&nbsp;</p>
              </div>
              <div class="row" >
                <p>&nbsp;</p>
              </div>
              <div class="row">
                <p>&nbsp;</p>
              </div>
              <div class="row">
                <p>&nbsp;</p>
              </div>
              <div class="row" style="border-left-color: #cecece;
    border-left-style: solid;
    border-left-width: thin;">
                <p>&nbsp;</p>
              </div>
              <div class="row" style="border-left-color: #cecece;
    border-left-style: solid;
    border-left-width: thin;">
                <div class="col-md-5">
                  <a><i class="el-icon-edit-outline"
                        style=" font-size: 40px;color: #ffb611;margin-top: 20%"></i><br><span style="margin-left: 30%">{{totalCount}}</span></a>
                </div>
                <div class="col-md-5">
                  <a class="scenic_button "><i v-if="!isCollection" class="el-icon-star-off" :key="0"
                                                       @click="onCollection"
                                                       style=" font-size: 40px;color: #ff2ab8;margin-top: 20%"></i>
                    <i v-else class="el-icon-star-on" :key="1" @click="offCollection"
                       style=" font-size: 60px;color: #ff2ab8;margin-top: 20%"></i><br><span style="margin-left: 30%">{{countCollect}}</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </el-main>
        <el-main
                 style="background: white;padding-left: 10%;margin-top: 2%;margin-bottom: 2%;">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-3">出发时间：{{strategy.strategyDay}}</div> <div class="col-md-3">游玩时间：{{strategy.strategyTravelDay}}</div>
            <div class="col-md-3">人均花费：{{strategy.strategyCostMoney}}</div>
            <div class="col-md-2"></div>


          </div>
        </el-main>
        <el-main id="information" class="scenic_header"
                 style="background: white;padding-left: 5%;margin-top: 2%;margin-bottom: 2%" v-html="strategy.strategyContent">

        </el-main>
        <el-main id="strategy">
          <el-header style="background: white;margin-top: 2%; border-bottom-color: #cecece;
  border-bottom-style: solid;
  border-bottom-width: thin;width: 80%;
  margin-left: 10%;margin-bottom: 1%">
            <p style="font-size: 20px;color: grey"><i class="iconfont travel-iconpinglun" style="font-size: 20px;color: #EA8010"></i>评论</p>
          </el-header>
          <el-main style="padding-left: 15%;">
            <div class="row" style="margin-top: 2%;height: 35px;width: 85%">
              <el-form>
                <div class="row">
                  <div class="col-md-1">
                    <el-image style="border-radius:45%;margin-left: 2%" :src="user.userHead"></el-image>
                  </div>
                  <div class="col-md-8">
                    <el-popover
                      placement="bottom"
                      title="标题"
                      width="500"
                      height="700"
                      trigger="click"
                      v-model="emojiShow"
                    >
                      <el-button slot="reference" v-show="false">😀</el-button>
                      <div class="browBox" >
                        <ul>
                          <li
                            v-for="(item, index) in faceList"
                            :key="index"
                            @click="getBrow(index)"
                          >
                            {{ item }}
                          </li>
                        </ul>
                      </div>
                    </el-popover>

                    <el-input
                      :rows="5"
                      type="textarea"
                      placeholder="请输入内容"
                      @keyup.enter.native="subCom"
                      v-model="commentsMessage.commentContent"
                    >
                    </el-input>
                  </div>
                  <div class="col-md-1">
                    <el-button
                      class="submit-btn"
                      type="primary"
                      @click="subCom"
                      :disabled="user===null"
                    >发送
                    </el-button>
                  </div>
                </div>

              </el-form>
            </div>
            <div v-for="com in sCommentsList" v-if="sCommentsList!=null">
              <div class="row" style="margin-top: 5%;height: 35px" >
                <div class="col-md-1">
                  <el-image style="border-radius:45%" src="static/images/icon_1.jpg"></el-image>
                </div>
                <div class="col-md-8">
                  <div class="row">{{com.userName}}</div>
                  <div class="row" style="margin-top: 2%;line-height: 100%">{{com.commentContent}}<el-button :disabled="user===null" style="color: #ffb611" data-toggle="modal"
                                                                                                             data-target="#addReply"  @click="toEvaluate(com)"><i class="iconfont travel-iconpinglunhuifu"></i></el-button><a v-show="user.userId===com.userId" @click="delCom(com.commentId)">删除</a>
                  </div>
                  <div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">{{com.creatTime}}</div>
                </div>
              </div>
              <div class="row" style="margin-top: 2%;height: 35px" v-for="re in com.sReplyList">
                <div class="col-md-2"></div>
                <div class="col-md-8">

                  <div class="row" style="margin-top: 2%;font-size: 13px;color: #cecece">
                    <div class="col-md-2"></div>
                    <div class="col-md-1">
                      <el-image style="border-radius:45%;width: 20px;height: 20px"
                                src="static/images/icon_1.jpg"></el-image>
                    </div>
                    <div class="col-md-8">
                      <div class="row">{{re.userName}}: {{re.replyContent}}<a v-show="user.userId===re.replyUserId" @click="del(re.replyId)">删除</a></div>
                      <div class="row" style="margin-top: 2%"><a style="color: #ffb611" @click="isShow = !isShow" v-if="com.sReplyList.length>3">更多回复</a></div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-main>
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-4"></div>
            <div class="col-md-4">
              <div class="pageNum1">
                <!--分页-->

                <ul>
                  <li style="width: 80px">
                    <div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">共{{all}}页/{{totalCount}}条
                    </div>
                  </li>
                  <li style="font-size: 12px" class="threeword"><a href="">首页</a></li>
                  <li style="font-size: 12px" class="threeword" v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a>
                  </li>
                  <li style="font-size: 12px" class="threeword" v-if="cur===1"><a class="banclick">上一页</a></li>
                  <li style="font-size: 12px" v-for="index in indexs" v-bind:class="{ 'header_active': cur === index}">
                    <a v-on:click="btnClick(index)">{{index}}</a>
                  </li>
                  <li style="font-size: 12px" class="threeword" v-if="cur!==all"><a
                    v-on:click="cur++,pageClick()">下一页</a></li>
                  <li style="font-size: 12px" class="threeword" v-if="cur === all"><a class="banclick">下一页</a></li>
                </ul>
              </div>
            </div>
          </div>
        </el-main>
      </div>
    </div>
    <div class="modal fade" id="addReply" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
         aria-hidden="true" style="width: 900px;height: auto">
      <div class="modal-dialog" style="width:900px;height: auto">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="addReplyLabel"><span >评论</span></h4>

          </div>
          <div class="modal-body">

            <form class="form-horizontal" role="form" onsubmit="return false;" id="form1" >
              <div class="form-group">
                <label class="col-sm-2 control-label">评论</label>
                <div class="col-sm-10">
                  <el-input type="text"  style="width: 60%" v-model="replyMessage.replyContent"
                            name="scenicName" placeholder="回复内容" required="required"></el-input>
                </div>
              </div>
            </form>

            <div style="margin-top: 3%">
              <center>
            <span slot="footer" class="dialog-footer" >
                <el-button type="button" class="btn btn-default" data-dismiss="modal">关闭</el-button>
                <el-button type="primary" @click="subReply">确定</el-button>
            </span>
              </center>
            </div>
          </div>

        </div><!-- /.modal-content -->
      </div><!-- /.modal -->
    </div><!--model end-->
    <div id="footer">
      <VFooter></VFooter>
    </div>
  </div>
</template>

<script>
  import VFooter from "@/components/travel_up/common/Footer";
  import VHeader from '@/components/travel_up/common/Header';
  const appData = require("@/assets/images/emojis.json");

  export default {
    name: "strategy",
    components: {
      VFooter,
      VHeader
    },
    data() {
      return {
        checkList:[],
        //聊天输入内容
        content: "",
        //表情框是否展示
        emojiShow: false,
        //表情列表
        faceList: [],
        //表情文本
        getBrowString: "",
        bg: 'url(' + require('../../assets/images/5ff1cbaa8650f.jpg') + ')',
        isActive: 5,
        isCollection: false,
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount: 124,
        strategyMessage:{
          strategyId:'',
          pageIndex:1,
          size:6
        },
        strategy:[],
        sCommentsList:[],
        commentsMessage:{
          userId:'',
          commentContent:'',
          strategyId:'',
        },
        replyMessage:{
          userId:'',
          replyContent:'',
          replyUserId:'',
          commentId:'',
        },
        collectMessage:{
          userId:'',
          collectType:2,
          scenicStrategy:'',
        },
        collect:[],
        count:'',
        user:[],
        sCommentsList:[],
        countStrategy:'',
        countCollect:'',
        countComment:'',
        isShow:false,

      }
    },
    mounted:function() {
      this.strategyMessage.strategyId=this.$route.query.strategyId;
      this.commentsMessage.strategyId=this.$route.query.strategyId;
      this.collectMessage.scenicStrategy=this.$route.query.strategyId;
      this.init();
      this.loadEmojis();
      this.initUser();
     // this.car.lineGroupId=val;
    },
    methods: {
      loadEmojis() {
        for (let i in appData) {
          this.faceList.push(appData[i].char);
        }
      },
      // 获取用户点击之后的标签 ，存放到输入框内
      getBrow(index) {
        for (let i in this.faceList) {
          if (index == i) {
            this.getBrowString = this.faceList[index];
            this.commentsMessage.commentContent += this.getBrowString;
          }
        }
        this.emojiShow = false;
      },
      onCollection(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        if(this.user===null||this.user.userId===null){
          alert("您还没有登录");
          let url=this.$router.resolve('login');
          window.open(url.href,'_blank');
        }
        else {
          if(this.collect===null){
            var data={userId:this.user.userId,scenicStrategy:this.strategyMessage.strategyId,collectType:2}
            this.$axios.post("/collect/save",qs.stringify(data),config)
              .then(successReqponse => {
                var data = successReqponse.data;
                if(data.message==='OK'){
                  alert("收藏成功")
                  this.isCollection=true;
                }
                else {
                  console.log(data.message)
                }
              })
              .catch(failRespose => {
                console.log("页面加载错误！正在重新载入...");
                //this.$router.replace("/leaderAdd");
              })

          }
          else if(this.collect.isDelete===1) {

            this.$axios.post("/collect/update?collectId="+this.collect.collectId,config)
              .then(successReqponse => {
                var data = successReqponse.data;
                if(data.message==='OK'){
                  alert("收藏成功")
                  this.isCollection=true;
                }
                else {
                  console.log(data.message)
                }
              })
              .catch(failRespose => {
                console.log("页面加载错误！正在重新载入...");
                //this.$router.replace("/leaderAdd");
              })


          }
          this.initUser();


        }

      },
      offCollection(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/collect/del?collectId="+this.collect.collectId,config)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.collect=data.collect;
            if(data.message==='OK'){
              alert("取消收藏成功")
            }
            else {
              console.log(data.message)
            }
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          });
        this.initUser();
        this.isCollection=false;
      },
      initUser(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        console.log('111',this.user.userId);
        if(this.user===null||this.user.userId===undefined){
          var data={scenicStrategyId:this.strategyMessage.strategyId,collectType:2}
          this.$axios.post("/collect/get_collect_count",qs.stringify(data),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              this.countCollect=data.countCollect;
              this.isCollection=false;
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            });
          console.log('1221',this.user.userId);
        }
        else {
          console.log('1221',this.user.userId);
          var data={userId:this.user.userId,scenicStrategyId:this.strategyMessage.strategyId,collectType:2}
          this.$axios.post("/collect/get_collect",qs.stringify(data),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              this.collect=data.collect;
              this.countCollect=data.countCollect;
              console.log(data.collect);
              if(data.collect===null||this.collect.collectId===undefined||data.collect.isDelete===1){
                this.isCollection=false;
              }
              else {
                this.isCollection=true;
              }
            })
            .catch(failRespose => {
              console.log("页面加载错误！正在重新载入...");
              //this.$router.replace("/leaderAdd");
            })
        }

      },
      init() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/strategy/strategy_view",qs.stringify(this.strategyMessage),config)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.strategy = data.strategy;
            console.log(this.strategy);
            this.sCommentsList=[];
            this.sCommentsList = data.sCommentsList;
            this.countStrategy=data.countStrategy;
            this.countCollect=data.countCollect;
            this.collect=data.collect;
            this.all = data.pageCount;//总页数
            this.totalCount = data.total;
            this.user=data.users;
            console.log(this.user===null);
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      subReply() {

        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/s_comment/reply_save", qs.stringify(this.reply), config)
          .then(successReqponse => {
            alert("保存成功");
            init();
          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },
      subCom() {

        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.commentsMessage.userId=this.user.userId;
        this.$axios.post("/s_comment/_save", qs.stringify(this.commentsMessage), config)
          .then(successReqponse => {
            alert("保存成功");
            init();
          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },
      toEvaluate(ev){
        this.replyMessage.commentId=ev.commentId;
        if(this.user===null||this.user.userId===null||this.user.userId===''){
          alert("您还没有登录")
        }

      },
      delCom(commentId){
        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("s_comment/del?commentId="+commentId,config)
            .then(successResponse=>{
              if(successResponse.data==="OK"){
                alert("删除成功")
              }
              else {
              }
            })
            .catch(failResponse=>{
              alert("响应异常")
            })
        }else {
          alert("已经取消了删除操作");
        }
      },
      del(replyId){
        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("s_comment/del_reply?replyId="+replyId,config)
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
      toInformation() {
        this.isActive = 1;
        document.querySelector("#information").scrollIntoView(true)
      },
      toStrategy() {
        this.isActive = 2;
        document.querySelector("#strategy").scrollIntoView(true)
      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.lineMessage.pageIndex=index;
        this.$axios.post("/strategy/strategy_list",qs.stringify(this.strategyMessage),config)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.sCommentsList=[];
            this.sCommentsList=data.sCommentsList;

            this.all = data.pageCount;//总页数
            this.totalCount = data.total;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
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
    },
    computed: {
//分页
      indexs: function () {
        var left = 1;
        var right = this.all;
        var ar = [];
        if (this.all >= 5) {
          if (this.cur > 3 && this.cur < this.all - 2) {
            left = this.cur - 2
            right = this.cur + 2
          } else {
            if (this.cur <= 3) {
              left = 1
              right = 5
            } else {
              right = this.all
              left = this.all - 4
            }
          }
        }
        while (left <= right) {
          ar.push(left)
          left++
        }
        return ar
      }
    }
  }
</script>

<style lang="less">
  .scenic_header {
    background: white;
    margin-top: 2%;
    margin-bottom: 1%;
    border-bottom-color: #cecece;
    border-bottom-style: solid;
    border-bottom-width: thin;
    width: 80%;
    margin-left: 10%;
  }

  .scenic_des {
    background: white;
    margin-top: 2%;
    margin-bottom: 1%;
    border-bottom-color: #cecece;
    border-bottom-style: solid;
    border-bottom-width: thin;
    width: 80%;
    margin-left: 10%;
  }

  .scenic_time1 {
    background: white;
    margin-top: 2%;
    margin-bottom: 2%;
    border-bottom-color: #cecece;
    border-bottom-style: solid;
    border-bottom-width: thin;
    width: 80%;
    margin-left: 10%;
    height: 200px;
  }

  .scenic_button {
    height: 100%;
    width: 100px;
    border: none;
  }

  .scenic-active {
    color: #ffd800;
    height: 100%;
    border-bottom-color: #ffd800;
    border-bottom-style: solid;
    border-bottom-width: medium;
  }



  /*分页样式*/
  .pageNum1 {
    width: 100%;
    overflow: hidden;
    margin-left: 10%;
  }


  .pageNum1 ul li {
    width: 20px;
    height: 20px;
    float: left;
    border: 1px solid #fafffb;
    margin-right: 5px;
    text-align: center;
    line-height: 18px;
  }

  .pageNum1 ul li.curPage {
    background-color: #ffb611;
  }

  .pageNum1 ul li a {
    width: 100%;
    height: 100%;
    color: #020102;
    font-size: 12px;
  }

  .pageNum1 ul .threeword {
    width: 45px;
  }

  .active {
    color: #ffb611!important;
  }
  .browBox {
    width: 100%;
    height: 200px;
    background: #e6e6e6;
    z-index: 100;
    bottom: 0px;
    overflow: scroll;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  li {
    cursor: pointer;
    width: 10%;
    font-size: 26px;
    list-style: none;
    text-align: center;
  }
  }
  }
  .submit-btn {
    margin: 0 15px 10px 0;
    float: right;
  }
</style>
