<template>
  <div id="app">
    <vHeader></vHeader>

    <el-container style="height: 100vh; border: 1px solid #eee">

      <NavMenu></NavMenu>

      <el-container >

        <el-header style="text-align: center; font-size: 12px">
          <div class="dataNav">

            <ul class="dataNavList" ref="dataNavList" >
              <li  v-for="(item,index) in navList" @click="changeTable(index)"  :class="{active:current===index}"  :style="{transform:'translateX(-'+move+'px)'}">{{item}}</li>

            </ul>

          </div>
          <!--<span style="font-size: 17px">学生信息列表</span>-->

        </el-header>

        <el-main>
          <el-input type="text" placeholder="搜索" v-model="searchDate.searchTitle" style="width: 80%"></el-input>
          <el-button class="el-icon-search" @click="search" ></el-button>

          <el-button style="border:none" @click="searchToShow" >更多条件筛选</el-button>
          <div v-show="table1">
            <el-form style="margin-top: 2%;margin-bottom: 2%" v-show="searchStatus">

              收藏时间：
              <el-date-picker type="datetime" placeholder="选择开始时间" v-model="searchDate.startTime"
                              value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"></el-date-picker>
              -
              <el-date-picker type="datetime" v-model="searchDate.endTime" placeholder="选择结束时间"
                              value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"
                              style="margin-right: 2%"></el-date-picker>

            </el-form>
            <div class="jx_content">
              <!-- Tab panes -->
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" >
                  <div class="row" v-for="va in collectList">
                    <div class="col-md-3" v-for="collect in va">
                      <a href="javascript:;">
                        <img :src="collect.collectPhoto" alt="">
                        <div class="has_border">
                          <h3>{{collect.typeName}}</h3>
                          <div class="price"><router-link :to="{path:'scenic',query:{scenicId:collect.scenicStrategy}}"><strong>点击查看</strong></router-link><a style="text-align: right;" @click="del(collect.collectId)">删除</a></div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-show="table2">
            <el-form style="margin-top: 2%;margin-bottom: 2%" v-show="searchStatus">

              收藏时间：
              <el-date-picker type="datetime" placeholder="选择开始时间" v-model="searchDate.startTime"
                              value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"></el-date-picker>
              -
              <el-date-picker type="datetime" v-model="searchDate.endTime" placeholder="选择结束时间"
                              value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm"
                              style="margin-right: 2%"></el-date-picker>

            </el-form>
            <div class="jx_content">
              <!-- Tab panes -->
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" >
                  <div class="row" v-for="va in collectList">
                    <div class="col-md-3" v-for="collect in va">
                      <a href="javascript:;">
                        <img :src="collect.collectPhoto" alt="">
                        <div class="has_border">
                          <h3>{{collect.typeName}}</h3>
                          <div class="price"><router-link :to="{path:'strategy',query:{strategyId:collect.scenicStrategy}}"><strong>点击查看</strong></router-link><a style="text-align: right;" @click="del(collect.collectId)">删除</a></div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-main>
        <div id="pags">
          <!-- 分页  -->
          <div id="pagination" style="float:left;"></div>
          <div class="pageNum" style="margin-left:30%" >
            <!--分页-->

            <ul>
              <li style="width: 80px"><div class="row" style="margin-top: 2%;font-size: 10px;color: #cecece">共{{all}}页/{{totalCount}}条</div></li>
              <li style="font-size: 12px" class="threeword" ><a v-on:click="cur=1,pageClick()">首页</a></li>
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
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import Header from "../common/Header";
  import NavMenu from "../common/NavMenu";
  export default {
    name: 'user_collect',
    components: {
      NavMenu,
      'vHeader': Header
    },
    data() {
      /*this.$axios.get(`student/getAll`).then(res => {
        if (res.data.code == 200) {
          this.tableData = res.data.data
        }
      })*/
      return {
        navList: [ '景点收藏','攻略收藏'],
        move: 0,
        searchStatus:false,
        dataNavListRealWidth: 0,
        dataNavListViewWidth: 0,
        tableData: [],
        searchDate:{
          collectType:1,
          searchTitle:'',
          startTime:'',
          endTime:'',
          pageIndex:1,
          size:16
        },
        collectList:[],
        table1:true,
        table2:false,
        current:0,
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
      }
    },
    mounted:function() {
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
    methods: {
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=index;
        this.$axios.post("collect/user_list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.collectList=[];
            this.collectList=data.collectList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;

            this.searchDate.collectType=data.collectType;
            this.searchDate.startTime=data.startTime;
            this.searchDate.endTime=data.endTime;
            var arr=[];
            var arr1=[];
            for(var i=0;i<this.collectList.length;i++){

              if(i%4===0&&i!==0){
                arr1.push(arr);
                arr=[];
              }
              var hotel=this.collectList[i];
              arr.push(hotel);
            }
            arr1.push(arr);
            this.collectList=[];
            this.collectList=arr1;
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
        this.$axios.post("collect/user_list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.collectList=[];
            this.collectList=data.collectList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
           // this.current=data.collectType-1;
            this.searchDate.collectType=data.collectType;
            this.searchDate.startTime=data.startTime;
            this.searchDate.endTime=data.endTime;
            var arr=[];
            var arr1=[];
            for(var i=0;i<this.collectList.length;i++){

              if(i%4===0&&i!==0){
                arr1.push(arr);
                arr=[];
              }
              var hotel=this.collectList[i];
              arr.push(hotel);
            }
            arr1.push(arr);
            this.collectList=[];
            this.collectList=arr1;
            console.log(this.collectList)
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },
      search() {
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.searchDate.pageIndex=1;
        this.searchDate.searchTitle='';
        this.searchDate.startTime='';
        this.searchDate.endTime='';
        this.$axios.post("collect/user_list",qs.stringify(this.searchDate),config)
          .then(result=>{
            var data = result.data;
            this.collectList=[];
            this.collectList=data.collectList;
            this.all =data.pageCount;//总页数
            this.totalCount = data.total;
            this.searchDate.searchTitle=data.searchTitle;
           // this.current=data.collectType;
            this.searchDate.collectType=data.collectType;
            this.searchDate.startTime=data.startTime;
            this.searchDate.endTime=data.endTime;
            var arr=[];
            var arr1=[];
            for(var i=0;i<this.collectList.length;i++){

              if(i%4===0&&i!==0){
                arr1.push(arr);
                arr=[];
              }
              var hotel=this.collectList[i];
              arr.push(hotel);
            }
            arr1.push(arr);
            this.collectList=[];
            this.collectList=arr1;
          })
          .catch(failResponse=>{
            alert('数据加在错误...正在重新载入')
          })

      },
      del(collectId) {

        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("collect/del?collectId="+collectId,config)
            .then(successResponse=>{
              if(successResponse.data.message==="OK"){
                alert("删除成功")
                this.init();
              }
              else {
                alert(successResponse.data.message)

              }
            })
            .catch(failResponse=>{
              alert("响应异常")
            })
        }else {
          alert("已经取消了删除操作");
        }

      },
      changeTable(index){
        if(index===1){
          this.table1=false;
          this.table2=true;
          this.current=1;
          this.searchDate.collectType=2;
          console.log(111,this.collectType)
        }
        else {
          this.table1=true;
          this.table2=false;
          this.current=0;
          this.searchDate.collectType=1;
        }
        this.search();
      },
      // 当菜单项向右的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即右移移动一个菜单项的宽度），
      // 当菜单项向右的可移动距离小于单个菜单项的宽度时，move等于0（即回到最开始没有移动的状态）
      navPrev() {
        if (this.move > 70) {
          this.move = this.move - 70;
        } else {
          this.move = 0
        }
      },
      // 当菜单项向左的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即左移移动一个菜单项的宽度），
      // 当菜单项向左的可移动距离小于单个菜单项的宽度时，move等于可以向左移动的最大值（即到最末尾）
      navNext() {
        if (this.move < this.dataNavListRealWidth - this.dataNavListViewWidth - 70) {
          this.move = this.move + 70;
        } else {
          this.move = this.dataNavListRealWidth - this.dataNavListViewWidth
        }
      }
      ,
      // 当菜单项向左的可移动距离大于单个菜单项的宽度时，move减去一个菜单项的宽度（即左移移动一个菜单项的宽度），
      // 当菜单项向左的可移动距离小于单个菜单项的宽度时，move等于可以向左移动的最大值（即到最末尾）
      searchToShow() {
        if (this.searchStatus===false) {
          this.searchStatus=true;
        } else {
          this.searchStatus=false;
        }
      }
    }
  }//,
  /* findgradeclassid(grade,classid) {
     if (grade==1) {
       this.gradeclass.gradeId="高一";
       this.gradeclass.classId=`${classid}班`
       this.$axios.post(`student/get/gradeclass`,this.gradeclass).then(res => {
         this.tableData = res.data.data
       })
     }else if (grade==2){
       this.gradeclass.gradeId="高二";
       this.gradeclass.classId=`${classid}班`
       this.$axios.post(`student/get/gradeclass`,this.gradeclass).then(res => {
         this.tableData = res.data.data
       })
     } else{
       this.gradeclass.gradeId="高三";
       this.gradeclass.classId=`${classid}班`
       this.$axios.post(`student/get/gradeclass`,this.gradeclass).then(res => {
         this.tableData = res.data.data
       })
     }
   },
   openname() {
     this.$prompt('请输入学生姓名', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
       // inputErrorMessage: '姓名格式不正确'
     }).then(({ value }) => {
       this.$axios.get(`student/find/name/${value}`).then(res => {
         if (res.data.code==200) {
           this.tableData = res.data.data
           this.$notify({
             title: '查询成功',
             type: 'success'
           });
         }else {
           this.$notify.error({
             title: '错误',
             message: '没有这个学生'
           });
         }
       })
     }).catch(() => {
       this.$notify.info({
         title: '取消输入',
       });
     });
   },
   openstuid() {
     this.$prompt('请输入学号',  {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
     }).then(({ value }) => {
       this.$axios.get(`student/find/id/${value}`).then(res => {
         if (res.data.code==200) {
           this.tableData = res.data.data
           this.$notify({
             title: '查询成功',
             type: 'success'
           });
         }else {
           this.$notify.error({
             title: '错误',
             message: '没有这个学生'
           });
         }
       })
     }).catch(() => {
       this.$notify.info({
         title: '取消输入',
       });
     });
   },
   openidcard() {
     this.$prompt('请输入身份证号',  {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       inputPattern:/^([0-9]){7,18}(x|X)?$/,
       inputErrorMessage: '身份证号码格式错误，请输入18位数字字母组合'
     }).then(({ value }) => {
       this.$axios.get(`student/find/idcard/${value}`).then(res => {
         if (res.data.code==200) {
           this.tableData = res.data.data
           this.$notify({
             title: '查询成功',
             type: 'success'
           });
         }else {
           this.$notify.error({
             title: '错误',
             message: '没有这个学生'
           });
         }
       })
     }).catch(() => {
       this.$notify.info({
         title: '取消输入',
       });
     });
   },
   stuDelete(id){
     this.$confirm('此操作将删除该条信息, 是否继续?', '提示', {
       confirmButtonText: '确定',
       cancelButtonText: '取消',
       type: 'warning'
     }).then(()=>{
       this.$axios.delete(`student/delete/id/${id}`).then(res => {
         if(res.data.code==200){
           this.$notify({
             title: '删除信息成功',
             type: 'success'
           });
           this.reload();
         }else{
           this.$notify.error({
             title: '错误',
             message: '删除信息失败'
           });
         }
       })
     }).then(()=>{
       this.$axios.delete(`/score/delete/student/${id}`).then(res => {
         if(res.data.code==200){
           this.$notify({
             title: '删除对应成绩成功',
             type: 'success'
           });
         }else{
           this.$notify.error({
             title: '错误',
             message: '删除对应成绩失败'
           });
         }
       })
     })

   },
   stuupdate(row){
     this.$router.push(
       {
         'path': '/information/update',
         query: {
           studentId: row.studentId,
           studentName:row.studentName,
           classId:row.classId,
           sex:row.sex,
           idCard:row.idCard,
           gradeId:row.gradeId
         }
       })
   },
   stuinsert(row){
     this.$router.push(
       {
         'path': '/score/insert',
         query: {
           studentId: row.studentId,
           studentName:row.studentName,
           classId:row.classId,
           gradeId:row.gradeId
         }
       })
   },
 }
}*/
</script>

<style scoped lang="less">
  html,body{
    padding: 0;
    margin: 0;
  }

  .el-header {
    background-color: #fff2d1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    background-color: #e8d435;
    color: #333;

  }
  .dataNav {
    display: flex;
    height: 70px;
    .dataNavList {
      display: flex;
      margin-left: 5%;
      // 超出部分隐藏
      overflow: hidden;
      li{
        display: inline-block;
        height: 35px;
        //每个菜单项的宽度要固定，不然move值无法计算，当然也可以通过其他方法来设置以适应自己的表格
        width: 150px;
        min-width: 70px;
        margin: auto 0 auto 10%;
        border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: #7E8690;
        line-height: 35px;
        // 过渡效果
        transition:transform .2s;
      }
      :hover {
        color: #ffb611;
        cursor: pointer;
      }
      :active {
        color: #ffb611;
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
      border: none;
      border-radius: 5px;
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
  .active {
    color: #ffb611!important;
  }
</style>
