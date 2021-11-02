<template>
  <div >
    <VNav :currentNav="3" :currentStr="1"></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">主题列表</h2>
        </div>

        <!-- 模态框（Modal） -->
        <!--<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" style="width: 900px;height: auto">
          <div class="modal-dialog" style="width:900px;height: auto">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabe">查看主题</h4>
              </div>
              <div class="modal-body">
                <form  method="post" name="travel-cus" class="cusForm">
                  <h1>主题</h1>
                  <ul class="cus-table">
                    <li style="margin-top: 2%">
                      <label style="width: 98px">主题名称：</label>
                      <div class="cus-mold">
                        <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="theme.themeName"></el-input>
                      </div>
                    </li>
                  </ul>


                </form>
              </div>
              <div class="modal-footer">

              </div>-->
              <!-- /.modal-content -->
        <!--  </div>
          </div>

        </div> -->
        <!-- 模态框（Modal） -->
        <div class="modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
             aria-hidden="true" style="width: 900px;height: auto">
          <div class="modal-dialog" style="width:900px;height: auto">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabe3">查看主题</h4>
              </div>
              <div class="modal-body">
                <form class="form-horizontal" role="form" onsubmit="return false;" id="form1" v-show="themeStatus===4">
                  <div class="form-group">
                    <label class="col-sm-2 control-label">主题名称</label>
                    <div class="col-sm-10">
                      <el-input type="text"  style="width: 60%" v-model="themeUpdate.themeName"
                                id="scenicName" name="scenicName" placeholder="主题名称" required="required"></el-input>
                    </div>
                  </div>
                </form>
                <form  method="post" name="travel-cus" class="cusForm" v-show="themeStatus===3">
                  <h1>主题</h1>
                  <ul class="cus-table">
                    <li style="margin-top: 2%">
                      <label style="width: 98px">主题名称：</label>
                      <div class="cus-mold">
                        <el-input style="font-weight: 100;width: 60%;" readonly="readonly" :value="themeView.themeName"></el-input>
                      </div>
                    </li>

                  </ul>


                </form>
                <table class="table table-bordered" v-show="themeStatus===1">
                  <thead>
                  <tr>
                    <th><input type="checkbox" name="id" ></th>
                    <th>所属名称</th>
                    <th>主题名称</th>
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody v-if="themeList.length>0" id="showtable" v-for="(theme,index) in themeList">
                  <tr>
                    <th><input type="checkbox" name="id" :value="theme.themeId"></th>
                    <td style="padding-left: 20px;max-width: 200px;">{{theme.className}}</td>
                    <td style="padding-left: 20px;max-width: 200px;">{{theme.themeName}}</td>
                    <td class="center">
                      <a  title="修改"   style="color: #c12e2a;font-size: 25px" @click="update(theme)" ><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/bianji2.png"></a>
                      <a  title="删除"   style="color: #00a0e9;font-size: 25px"  @click="del(theme.themeId,theme.classId)"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/shanchu2.png"></a>
                      <a  title="查看"  style="color: #ff79c6;font-size: 29px"  @click="getThemeView(theme)"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/chakan2.png"></a>
                    </td>
                  </tr>
                  </tbody>
                  <span v-else>暂无数据</span>


                </table>
                <form  method="post" name="travel-cus" class="cusForm" v-show="themeStatus===2">
                  <h1>主题</h1>
                  <ul class="cus-table">
                    <li style="margin-top: 2%">
                      <label style="width: 98px;margin-left: 10%">主题名称：</label>

                        <el-input style="font-weight: 100;width: 60%;"  v-model="themeMessage.themeName"></el-input>

                    </li>
                  </ul>


                </form>
              </div>
              <div class="modal-footer">

                  <el-button  class="btn btn-default" data-dismiss="modal">关闭</el-button>
                  <el-button  class="btn btn-default" @click="sub()" v-show="themeStatus===2">保存</el-button>
                  <el-button  class="btn btn-default" @click="subupdate()" v-show="themeStatus===4">保存</el-button>
                  <el-button  class="btn btn-default" @click="reset(themeView.classId)" v-show="themeStatus===3">返回</el-button>

              </div>
              <!-- /.modal-content -->
            </div><!-- /.modal -->
          </div>

        </div>
        <section class="mtb">

          <input type="text" id="title" v-model="searchDate.searchTitle" class="textbox textbox_225" placeholder="输入标题查询..." />
          <input type="button" value="查询" class="group_btn" @click="subForm()"/>
        </section>
        <table class="table table-bordered">
          <thead>
          <tr>
            <th><input type="checkbox" name="id" /></th>
            <th>主题名称</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody  v-for="(classes,index) in classList">
          <tr>
            <th><input type="checkbox" name="id" :value="classes.classId"></th>
            <td style="padding-left: 20px;max-width: 200px;">{{classes.className}}</td>
            <td class="center">
              <a  title="查看小组题列表"   data-toggle="modal" data-target="#myModal3" style="color: #c12e2a;font-size: 25px"  @click="getTheme(classes.classId)"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/chakan2.png"></a>
              <a  title="添加小主题" data-toggle="modal" data-target="#myModal3"   style="color: #ff79c6;font-size: 29px"  @click="saveThemes(classes.classId)"><img style="width: 30px;height: 30px;    display: inherit;" src="@/assets/images/tinajia2.png"></a>
            </td>
          </tr>
          </tbody>


        </table>

        <div id="pags">
          <!-- 分页  -->
          <div id="pagination" style="float:left;"></div>
          <div id="showpagecount" style="display: inline-block;margin-left: 20px;height: 35px;line-height: 35px;"></div>
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
        themeUpdate:[],
        themeUpdate:'',
        themeStatus:1,
        themeMessage:{
          themeName:'',
          classId:'',
          themePhoto:''
        },
        modalStatus2: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        searchDate:{
          searchTitle:'',
          pageIndex:1,
          size:10
        },
        themeView:[],
        classList:[],
        themeList:'',
        total:'',
        pageCount:'',
        totalData:'',
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
      reset(classId){
        this.themeStatus=1;
        this.getTheme(classId);

      },
      update(theme){
        this.themeUpdate=theme;
        this.themeStatus=4;
        this.formData=new FormData();
      },
      getThemeView(theme){
        this.themeView=theme;
        this.themeStatus=3;

      },
      subupdate() {

        if (this.themeUpdate.themeName === "") {
          alert("主题名称不能为空");
          return false;
        }

//			alert(editor.txt.html());

        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/theme/update", qs.stringify(this.themeUpdate), config)
          .then(successReqponse => {
            if(successReqponse.data.message==='OK'){
              alert("保存成功！");

              this.getTheme(this.themeUpdate.classId)
            }else {
              alert(successReqponse.data.message);
            }


          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },
      sub() {

        if (this.themeMessage.themeName === "") {
          alert("主题名称不能为空");
          return false;
        }

//			alert(editor.txt.html());

        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/theme/save",qs.stringify(this.themeMessage), config)
          .then(successReqponse => {
            if(successReqponse.data.message==='OK'){
              alert("保存成功！");
              this.themeStatus=1;
              this.getTheme(this.themeMessage.classId)
            }else {
              alert(successReqponse.data.message);
            }


          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },
      saveThemes(classId){
        this.themeMessage.themeName='';
        this.themeMessage.classId=classId;
        this.themeStatus=2;
      },
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("theme/class_list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.classList=[];
            this.classList=data.classList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
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
        this.$axios.post("theme/class_list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.classList=[];
            this.classList=data.classList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },
      del(themeId,classId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("theme/del?themeId="+themeId,config)
            .then(successResponse=>{
              if(successResponse.data==="noLogin"){
                alert("没有登录")
                this.$router.replace({path:'/adminLogin'})
              }
              else {
                alert("删除成功")
                alert(classId)
                this.getTheme(classId);
              }
            })
            .catch(failResponse=>{
              alert("响应异常")
            })
        }else {
          alert("已经取消了删除操作");
        }

      },
      getTheme(classId){
        this.themeStatus=1;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/theme/getThemClass?classId="+classId)
          .then(successReqponse => {
            this.themeList=[];
            this.themeList=successReqponse.data.themeList;

          })
          .catch(failRespose => {
            alert("页面加载错误！正在重新载入...");
            this.getTheme(classId);
          })

      },
      delClass(classId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("class/del?classId="+classId,config)
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
        this.$axios.post("theme/class_list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.classList=[];
            this.classList=data.classList;
            this.all =data.pageCount;//总页数
            this.cur = data.pageIndex;
            this.totalCount = data.total;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })
      }
    }
  }

</script>

<style lang="less">
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
  .disabled .el-upload--picture-card {
    display: none !important;
  }
</style>
