<template>
  <div>
    <VNav :currentNav="6" :currentStr="2" ></VNav>
    <section class="rt_wrap content mCustomScrollbar">
      <div class="rt_content">
        <div class="page_title">
          <h2 class="fl">新增导游</h2>

        </div>
        <form class="form-horizontal" role="form" onsubmit="return false;" id="form1">
          <div class="form-group">
            <label class="col-sm-2 control-label">所属旅行团</label>
            <div class="col-sm-10" >
              <el-input type="text" style="width: 60%" v-model="groupName" v-on:input="groupName1" placeholder="输入所属旅行团"></el-input>
              <div style="margin-top: 1%" v-show="groupShow">
                <div class="el-select-dropdown el-popper"
                     style="min-width: 195.6px; position: absolute; transform-origin: center top 0px; z-index: 2007;"
                     x-placement="bottom-start">
                  <div class="el-scrollbar" style="">
                    <div class="el-select-dropdown__wrap el-scrollbar__wrap" style="margin-bottom: -17px; margin-right: -17px;">
                      <ul class="el-scrollbar__view el-select-dropdown__list"><!---->
                        <li class="el-select-dropdown__item" v-for="(item,index) in selectGroup" :key="index" v-on:click="setScenicVal(item)">{{item.groupName}}</li>
                      </ul>
                    </div>
                    <div class="el-scrollbar__bar is-horizontal">
                      <div class="el-scrollbar__thumb" style="transform: translateX(0%);"></div>
                    </div>
                    <div class="el-scrollbar__bar is-vertical">
                      <div class="el-scrollbar__thumb" style="transform: translateY(0%);"></div>
                    </div>
                  </div><!---->
                  <div x-arrow="" class="popper__arrow" style="left: 35px;"></div>
                </div>
              </div>
            </div>

          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">用户名</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" v-model="leader.leaderNumber" id="leaderNumber" name="leaderName" placeholder="用户名" required="required" @blur="checkUsername">
              </el-input></div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">导游名称</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" v-model="leader.leaderName" id="leaderName" name="leaderName" placeholder="导游名称" required="required"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">密码</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" v-model="leader.leaderPassword" id="leaderPassword" name="leaderName" placeholder="密码" required="required" @blur="checkPassword"></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">性别</label>
            <div class="col-sm-10">
              <el-select v-model="leaderSex"  @change="onchanggeSex" >
                <el-option value="男" >男</el-option>
                <el-option value="女" >女</el-option>
              </el-select>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">年龄</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" v-model="leader.leaderAge" id="leaderAge" name="leaderName" placeholder="年龄" required="required" ></el-input>
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">导游电话</label>
            <div class="col-sm-10">
              <el-input type="text" style="width: 60%" v-model="leader.leaderTel" id="leaderTel" name="leaderName" placeholder="导游电话" required="required" @blur="isCellPhone"></el-input>
            </div>
          </div>


          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
              <input type="submit" class="btn btn-default" @click="sub()">
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  import $ from 'jquery'
  import VNav from "@/components/travel_after/common/nav";
  export default {
    name: "leaderAdd",
    data() {
      return {
        formData: "",
        isSelectFile: false,
        imgUrl: "",
        photo: '',
        modalStatus2: false,
        modalStatus: false,
        m_title: "添加景点图片",
        m_content: "我是首页的内容",
        leader:{
          leaderName:'',
          leaderNumber:'',
          leaderPassword:'',
          leaderSex:'',
          leaderAge:'',
          leaderTel:'',
          groupId:''
        },
        leaderSex:'',
        groupName:'',
        selectGroup: [],
        groupShow:false,
        groupList:[],
        leaderList:[],
        travelTimes:{

        },
        themes:[],
        btnType: [{"value": "确定", "class": "danger"}, {"value": "取消", "class": "defalut"}]
      }

    },
    components: {
      VNav
    },
    mounted:function(){
      this.getThemes();
    },
    watch:{

    },
    methods: {
      onchanggeSex(){
        if(this.leaderSex==='女'){
          this.leader.leaderSex=1;
        }
        else{
          this.leader.leaderSex=2;
        }
      },
      groupName1(){
        this.groupShow = true;
        if (this.groupName.length === 0) {
          this.selectGroup = this.groupList;
        } else {

          var citys = [];
          this.groupList.forEach((item, index) => {
            if (item.groupName.indexOf(this.groupName) >= 0) {
              citys.unshift(item)
            }
          })
          this.selectGroup = citys;
        }
      },
      setScenicVal(item) {
        this.leader.groupId = item.groupId;
        this.groupName = item.groupName;
        this.groupShow = false
      },
      getThemes:function(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.get("/group/getGroup")
          .then(successReqponse => {
            this.groupList=successReqponse.data.groupList;
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            this.$router.replace("/leaderAdd");
          })

      },
      checkUsername() {

        var user_test = /^\w{4,10}$/;
        var flag_un = user_test.test(this.leader.leaderNumber);
        //  alert($("#leaderAccount").val())
        if (flag_un) {

          $("#leaderNumber").css("border", "1px green solid");
          $(".flag").html("用户名错误");
        } else {
          $("#leaderNumber").css("border", "1px red solid");
        }
        return flag_un;
      },
      checkPassword() {

        var user_test = /^\w+$/;
        var flag_un = user_test.test(this.leader.leaderPassword);
        if (flag_un) {
          $("#leaderPassword").css("border", "1px green solid");
        } else {
          $("#leaderPassword").css("border", "1px red solid");
          $(".flag").html("密码格式错误错误");
        }
        return flag_un;
      },
      isCellPhone () {
        if(!/^1(3|4|5|6|7|8)\d{9}$/.test(this.leader.leaderTel)) {
          $("#leaderTel").css("border", "2px red solid");
          $(".flag").html("手机号码错误");
          return false
        } else {
          $("#leaderTel").css("border", "");
          return true
        }
      },
      sub() {

        if (this.leader.leaderName === "") {
          alert("导游名称不能为空");
          return false;
        }

        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };

        this.$axios.post("/leader/save", qs.stringify(this.leader), config)
          .then(successReqponse => {
            if(successReqponse.data.message==="OK"){
              alert("保存成功");
              this.$router.push("/leaderList");
            }
            else {
              alert("保存失败");
            }

          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },

    }
  }


</script>

<style scoped>
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
    opaleader: 0;
  }
</style>
