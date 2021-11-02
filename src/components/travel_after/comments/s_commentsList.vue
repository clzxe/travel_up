<template>
  <div >
    <VNav :currentNav="12" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">订单列表</h2>
        </div>
        <section class="mtb">

          <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." />
          <input type="button" value="查询" class="group_btn" @click="subForm()"/>
        </section>
        <table class="table table-bs_commented">
          <thead>
          <tr>
            <th>全选</th>
            <th>订单编号</th>
            <th>用户</th>
            <th>攻略名称</th>
            <th>评论内容</th>
            <th>评论时间</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody id="showtable" v-for="(s_comment,index) in s_commentList">
          <tr>
            <th><input type="checkbox" name="id" value=item.title></th>
            <td style="padding-left: 20px;max-width: 200px;">{{s_comment.commentId}}</td>
            <td style="padding-left: 20px;">{{s_comment.userName}}</td>
            <td style="text-align: center;">{{s_comment.strategyName}}</td>
            <td style="padding-left: 20px;">{{s_comment.commentContent}}</td>
            <td style="text-align: center;">{{s_comment.createTime}}</td>

            <td class="center">
              <a  title="删除" class="iconfont travel-iconshanchu"  style="color: #00a0e9;font-size: 25px"  @click="del(s_comment.s_commentId)"></a>
              <a  title="查看" data-toggle="modal"
                  data-target="#seeScenic" class="iconfont travel-iconchakan"  style="color: #ff79c6;font-size: 29px"  @click="getReply(s_comment.s_commentId)"></a>
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
                <h3 class="modal-title" id="seeScenicLabel">查看景点</h3>
              </div>
              <div class="modal-body">
                <table>
                  <thead>
                  <tr>
                    <td>编号</td>
                    <td>用户</td>
                    <td>回复信息</td>
                    <td>创建时间</td>
                    <td>操作</td>
                  </tr>
                  </thead>
                  <tbody v-for="(reply,index) in replyList">
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
        },
        ImageList:[],
        s_commentList:'',
        s_comment:[],
        total:'',
        pageCount:'',
        totalData:'',
        replyList:[],
        all: 10, //总页数
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
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("s_comment/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.s_commentList=[];
            this.s_commentList=data.s_commentList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
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
        this.searchDate.pageIndex=this.cur;
        this.$axios.post("s_comment/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.s_commentList=[];
            this.s_commentList=data.s_commentList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },

      getReply:function(commentId){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/s_comment/getReplyList?commentId="+commentId)
          .then(successReqponse => {
            if(successReqponse.Message===error){
              alert(successReqponse.ERROR);

            }
            else{
              if(successReqponse.data.replyList.length===0){
                alert("没有数据！");
              }
              else {
                this.replyList=[];
                this.replyList=successReqponse.data.replyList;
              }
            }
          })
          .catch(failRespose => {
            console.log("数据加载错误！正在重新载入...");
            this.$router.replace("/s_commentAdd");
          })
      },
      del(commentId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("s_comment/del?commentId="+commentId,config)
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
        this.$axios.post("s_comment/list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.s_commentList=[];
            this.s_commentList=data.s_commentList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
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
  .dataNav {
    display: flex;
    height: 70px;
    .dataNavList {
      display: flex;
      // 超出部分隐藏
      overflow: hidden;
      .dataNavListItem{
        display: inline-block;
        height: 35px;
        //每个菜单项的宽度要固定，不然move值无法计算，当然也可以通过其他方法来设置以适应自己的表格
        width: 70px;
        min-width: 70px;
        margin: auto 0;
        bs_comment-radius: 5px;
        font-size: 13px;
        text-align: center;
        color: #7E8690;
        line-height: 35px;
        // 过渡效果
        transition:transform .2s;
      }
      :hover {
        color: #1D4190;
        background-color: #c7cede;
        cursor: pointer;
      }
    }
    // 按钮样式
    .dataNavPrev,
    .dataNavNext{
      display: inline-block;
      width: 35px;
      min-width: 35px;
      height: 35px;
      margin: auto 0;
      bs_comment: none;
      bs_comment-radius: 5px;
      text-align: center;
      line-height:35px;
      background-color: rgba(0,0,0,0);
      &:focus{
        outline: none;
      }
      &:hover{
        color: #1D4190;
        background-color: #c7cede;
        cursor: pointer;
      }
    }
    .dataNavNext{
      margin-left: auto;
    }

  }
</style>
