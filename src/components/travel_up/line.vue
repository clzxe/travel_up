<template>
  <div id="app">
    <VHeader :currentHeader="4"></VHeader>
    <div class="wrap">

      <div :style="{background:bg}">
        <div class="bread_box">
          <a href="http://localhost/travel/index.html">首页</a>
          <span> &gt;</span>

          <a href="#" id="route_category">路线</a><span> &gt;</span>
          <a href="#" id="route_rname">{{lineGroup.lineName}}</a>

        </div>
        <div class="prosum_box" style="background-color: white;margin: 0px auto 0px;">
          <dl class="prosum_left">
            <dt>
              <img alt="" class="big_img"
                   :src="lineGroup.linePhoto">
            </dt>
            <div style="float: left;
    margin-right: 4px;">
              <div class="you_need_konw2" style="background-color: white;margin: 0px auto 0px;">
                <p>&nbsp;</p>
                <p>&nbsp;</p>
      <span style="font-size: 16px;
	border-bottom: 3px solid #ffc900;"><i class="iconfont travel-iconpingjia" style="color: #ffc900"></i>简介</span><br>
                <div>
                  <div class="row" style="margin-top: 2%">
                    <div class="col-md-6">
                      <span v-html="lineGroup.lineDescription"></span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </dl>
          <div class="prosum_right">
            <p class="pros_title">{{lineGroup.lineName}}</p>
            <p class="hot" id="hot">1-2月出发，网付立享￥1099/2人起！爆款位置有限，抢完即止！</p>
            <div class="pros_other">
              <p style="margin-top: 2%" id="seller_name">经营商家 ：&nbsp;{{lineGroup.groupName}}</p>
              <p style="margin-top: 2%" id="seller_site">地 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址 ： {{lineGroup.provinceName}}</p>
              <p style="margin-top: 2%">出发城市 ： {{lineGroup.cityName}}</p>
              <p style="margin-top: 2%">旅游天数 ： {{lineGroup.lineTotalTime}}</p>
              <p style="margin-top: 2%">可选人数 ： {{lineGroup.linePeople}}人</p>
              <p style="margin-top: 2%">旅行团名 ： {{lineGroup.groupName}}</p>
              <p style="margin-top: 2%">所属导游 ： {{lineGroup.leaderName}}</p>
              <p style="margin-top: 2%">产品特色 : &nbsp;<span class="target_txt">{{lineGroup.themeName}}</span></p>
              <p style="margin-top: 2%">景&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点 : &nbsp;<span class="target_txt3" v-for="scenic in scenicList">{{scenic.scenicName}}</span></p>

            </div>
            <div class="row">
              <div class="col-md-8">
                <P>&nbsp;</P>
                门票:<el-button v-if="selectMoney"  @click="addToMoney()">景点名票:{{scenicPrice}}</el-button>
              <el-button v-else  style="border: #ffb611 1px solid;color: #ffb611" @click="diffToMoney()">景点名票:{{scenicPrice}}</el-button>
                <P>&nbsp;</P>
              </div>

            </div>
            <div class="row">
              <div class="col-md-6">
                人数:<el-button  @click="add1()"><i class="el-icon-plus"></i></el-button>
                <el-input style="width: 20%" v-model="orderCount"></el-input>
                <el-button @click="diff1()"><i class="el-icon-minus"></i></el-button>


              </div>

              <div class="col-md-6">
                房间:<el-button  @click="add2()"><i class="el-icon-plus"></i></el-button>
                <el-input style="width: 20%" v-model="roomCount"></el-input>
                <el-button @click="diff2()"><i class="el-icon-minus"></i></el-button>
              </div>


            </div>
            <div class="calendar-box demo-box" style="margin-top: 2%;border: 1px #EA8010">
              <div v-click-outside style="width: 177px; display: inline-block">
                <el-input type="text" v-model="formaDate"  @focus="focus" placeholder="请选择日期"/>
                <!-- <input type="text" v-model="formaDate" @focus="focus" placeholder="请选择日期"/> -->
                <div v-show="isVisble" class="pantal">
                  <div class="triangle"></div>
                  <div class="header">
                    <span class="newspan" @click="prevYear" style="width: 20px">&lt;</span>
                    <span class="newspan" @click="prevMonth" style="width: 20px" >&lt;&lt;</span>
                    <span class="newspan" style="margin-left: 10%;width: 80px" >{{ time.year }}年</span>
                    <span class="newspan" style="width:50px">{{ time.month + 1 }}月</span>
                    <span class="newspan" @click="nextMonth" style="width: 20px">&gt;&gt;</span>
                    <span class="newspan" @click="nextYear" style="width: 20px">&gt;</span>
                  </div>
                  <div class="content">
                    <div>
                      <span class="newspan" v-for="item in weekarr" :key="item">{{ item }}</span>
                    </div>
                    <div v-for="i in 5" :key="i">
          <span
            v-for="j in 7"
            :key="j"
            class="content-item newspan"
            @click="
              checkDate(
                visibeDays[(i - 1) * 7 + (j - 1)],
                isDisabled(visibeDays[(i - 1) * 7 + (j - 1)])
              )
            "
            :class="[
              { checkGray: !notIsThisMonth(visibeDays[(i - 1) * 7 + (j - 1)]) },
              { active: isActive(visibeDays[(i - 1) * 7 + (j - 1)]) },
              { isdisabeld: isDisabled(visibeDays[(i - 1) * 7 + (j - 1)]) },
              { iscancheck: !isDisabled(visibeDays[(i - 1) * 7 + (j - 1)]) },
            ]"
          >
            <div class="content-info">
              <p style="flex: 1">
                {{ visibeDays[(i - 1) * 7 + (j - 1)].getDate() }}
              </p>

              <p v-for="(ite, index) in field" :key="index">
                {{ showText(visibeDays[(i - 1) * 7 + (j - 1)], ite) }}
              </p>
            </div>
          </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="pros_price">
              <p class="price"><strong id="price">{{lineGroup.linePrice+lineGroup.roomPrice}}</strong><span>起</span> <span v-on:click="dialogVisible=true">价格说明</span> </p>

              <p class="collect">
                <button class="btn" id="shoucang" style="background-color: #EA8010" :disabled="lineGroup.id==null"  @click="addToCar"
                   ><i class="iconfont travel-icongouwuche"></i>加入购物车</button>
                <button class="btn" style="background-color: #ff4904" @click="addToOrder" :disabled="lineGroup.id==null"><i class="iconfont travel-iconwodegoumai"></i>立即购买</button>
              </p>
              <el-dialog :title="is_number===1?'价格说明':'立即预定'" :visible.sync="dialogVisible" width="50%" center>
                <!-- 生成二维码图片 -->
                <div class="pros_other">
                  <p style="margin-top: 2%" >旅行社收取服务费用 ：&nbsp;{{lineGroup.linePrice}}</p>
                  <p style="margin-top: 2%">房间价格 ： {{lineGroup.roomPrice}}/间</p>
                  <p style="margin-top: 2%">包含景点门票如下:</p>
                  <p style="margin-top: 2%" v-for="scenic in scenicList">{{scenic.scenicName}}:{{scenic.scenicPrice}}</p>

                </div>
                <div style="margin-top: 3%">
                  <div style="text-align: center;">
            <span slot="footer" class="dialog-footer">
                <el-button type="button" class="btn btn-default" @click="dialogVisible=false">关闭</el-button>

            </span>
                  </div>
                </div>
              </el-dialog>
              <!--                    <a  class="btn already" disabled="disabled"><i class="glyphicon glyphicon-heart-empty"></i>点击收藏</a>-->

            </div>
          </div>
        </div>
        <div>

        </div>
        <div class="you_need_konw" style="background-color: white;margin: 0px auto 0px;">
          <div style="margin-left: 2%;width: 97%">
            <p>&nbsp;</p>

            <section id="content">
              <!-- 黑马精选start-->
              <section class="hemai_jx">
                <div class="jx_top">
                  <div class="jx_tit">
                    <img src="@/assets/images/icon_5.jpg" alt="">
                    <span>精选</span>
                  </div>
                  <!-- Nav tabs -->
                  <ul class="jx_tabs" role="tablist">
                    <li role="presentation" class="active">
                      <span></span>
                      <a href="#popularity" aria-controls="popularity" role="tab" data-toggle="tab">猜你喜欢</a>
                    </li>
                    <li role="presentation">
                      <span></span>
                      <a href="#newest" aria-controls="newest" role="tab" data-toggle="tab">相似路线</a>
                    </li>
                    <li role="presentation">
                      <span></span>
                      <a href="#scenic" aria-controls="scenic" role="tab" data-toggle="tab">周边景点</a>
                    </li>
                    <li role="presentation">
                      <span></span>
                      <a href="#bestStrategy" aria-controls="bestStrategy" role="tab" data-toggle="tab">相似主题</a>
                    </li>



                  </ul>
                </div>
                <div class="jx_content">
                  <!-- Tab panes -->
                  <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="popularity">
                      <div class="row" style="margin-top: 2%">
                        <div class="col-md-3" v-for="(line1,lid) in likeList" :key="lid" v-if="line1!==null">
                          <router-link :to="{path:'scenic',query:{scenicId:line1.scenicId}}"  style="width: 80%;margin-left: 1%;height: 250px">
                            <img :src="line1.scenicImg" alt="" style="height: 148px">
                            <div class="has_border" style="height: 94px;">
                              <h3>{{line1.scenicName}}</h3>
                              <div class="price" style="text-align: right"><strong>点击查看</strong></div>
                            </div>
                          </router-link>
                        </div>
                      </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="bestStrategy">
                      <div class="row" style="margin-top: 2%">
                        <div class="col-md-3" v-for="(line2,nlid) in themeList" :key="nlid" v-show="themeList.length!==0&&line2!==null">
                          <router-link :to="{path:'scenic',query:{scenicId:line2.scenicId}}"  style="width: 80%;margin-left: 1%;height: 250px">
                            <img :src="line2.scenicImg" alt="" style="height: 148px">
                            <div class="has_border" style="height: 94px;">
                              <h3>{{line2.scenicName}}</h3>
                              <div class="price" style="text-align: right"><strong>点击查看</strong></div>
                            </div>
                          </router-link>
                        </div>

                      </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="newest">
                      <div class="row" style="margin-top: 2%">
                        <div class="col-md-3" v-for="(line,nlid) in similarityList" :key="nlid" v-if="similarityList.length!==0&&line!==null">
                          <router-link :to="{path:'lines',query:{lineId:line.lineId}}"  style="width: 80%;margin-left: 1%;height: 250px">
                            <img :src="line.linePhoto" alt="" style="height: 148px">
                            <div class="has_border" style="height: 94px;">
                              <h3>{{line.lineTitle}}</h3>
                              <div class="price">网付价<em>￥</em><strong>{{line.linePrice+line.roomPrice}}</strong><em>起</em></div>
                            </div>
                          </router-link>
                        </div>

                      </div>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="scenic">
                      <div class="row" style="margin-top: 2%">
                        <div class="col-md-3" v-for="(scenic2,lid) in cityScenicList" :key="lid" v-show="cityScenicList.length!==0&&scenic2!==null">
                          <router-link :to="{path:'scenic',query:{scenicId:scenic2.scenicId}}"  style="width: 90%;margin-left: 5%;height: 250px">
                            <img :src="scenic2.scenicImg" alt="" style="height: 148px">
                            <div class="has_border" style="height: 94px;">
                              <h3>{{scenic2.scenicName}}</h3>
                              <div class="price" style="text-align: right"><strong>点击查看</strong></div>
                            </div>
                          </router-link>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              </section>
            </section>
            <p>&nbsp;</p>
          </div>
        </div>
        <div class="you_need_konw" style="background-color: white;margin: 0px auto 0px;">
          <div style="margin-left: 2%;width: 97%">
            <p>&nbsp;</p>
            <span><i class="iconfont travel-iconjihua" style="color: #c12e2a"></i>旅游时间安排</span><br>
            <el-button style="margin-top: 2%" @click="changeTable(1)">按树形表查看</el-button>
            <el-button style="margin-top: 2%" @click="changeTable(2)">按表格查看</el-button>
            <div class="" style="border: solid 1px #ddd;height: auto;margin-top: 2%">

              <div class="row" v-show="is_table===1">
                <div class="col-md-1 boxT">
                  <ul>
                    <li style="height: 30px"><i class="el-icon-time"
                                                style="height: 30px;background-color: #00a0e9;color: #00a0e9"> </i></li>
                  </ul>

                  <ul v-for="travel_time in travelTimes">

                    <li style="height: 80px;color: #00a0e9"><i class=" el-icon-time travel_time"></i>&nbsp;&nbsp;时间</li>
                    <li style="height: 80px;color: #00a0e9"><i class="el-icon-fork-spoon travel_time"></i>&nbsp;&nbsp;餐饮</li>
                    <li style="height: 80px;color: #00a0e9"><i class="el-icon-ship travel_time"></i>&nbsp;&nbsp;活动</li>
                    <li style="height: 80px;color: #00a0e9"><i class="el-icon-office-building travel_time"></i>&nbsp;&nbsp;住宿
                    </li>
                  </ul>

                </div>
                <div class="col-md-6">
                  <ul>
                    <li style="height: 30px"><i style="height: 30px;background-color: #fafffb;color: #00a0e9"></i></li>
                  </ul>
                  <ul v-for="travel_time2 in travelTimes">
                    <li class="travel_time2">{{travel_time2.travelTimeTime}}</li>
                    <li class="travel_time2">{{travel_time2.travelTimeFood}}</li>
                    <li class="travel_time2">{{travel_time2.travelTimeActivity}}</li>
                    <li class="travel_time2">{{travel_time2.travelTimeHotel}}</li>
                  </ul>
                </div>

              </div>
              <div class="row" v-show="is_table===2">
                <div class="row" style="margin-top: 2%">
                  <div class="col-md-2"></div>
                  <div class="col-md-2">时间</div>
                  <div class="col-md-2">饮食</div>
                  <div class="col-md-2">活动</div>
                  <div class="col-md-2">住宿</div>

                </div>
                <div style="margin-bottom: 2%">
                  <div class="row" style="margin-top: 2%" v-for="travel_time3 in travelTimes">
                    <div class="col-md-2"></div>
                    <div class="col-md-2">{{travel_time3.travelTimeTime}}</div>
                    <div class="col-md-2">{{travel_time3.travelTimeFood}}</div>
                    <div class="col-md-2">{{travel_time3.travelTimeActivity}}</div>
                    <div class="col-md-2">{{travel_time3.travelTimeHotel}}</div>

                  </div>
                </div>

              </div>
            </div>
            <p>&nbsp;</p>
          </div>
        </div>
        <div class="you_need_konw" style="background-color: white;margin: 0px auto 0px;">
          <div style="margin-left: 2%;width: 97%">
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <span><i class="iconfont travel-iconjihua" style="color: #c12e2a"></i>介绍
      </span><br>
            <div class="" style="border: solid 1px #ddd;height: auto;margin-top: 2%">


              <div class="row" v-for="image in ImageList">
                <div class="row" style="margin-top: 2%">
                  <div class="col-md-3"></div>
                  <div class="col-md-6"><img style="width: 100%" :src="image.filePath"></div>
                  <div class="col-md-3"></div>

                </div>
              </div>
            </div>
            <p>&nbsp;</p>
          </div>
        </div>
        <div class="you_need_konw2" style="background-color: white;margin: 0px auto 0px;">
          <div style="margin-left: 2%;width: 97%">
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <span style="font-size: 16px;
	border-bottom: 3px solid #ffc900;"><i class="iconfont travel-iconpingjia" style="color: #ffc900" @click="changeEv(0)"></i>评价</span><br>
            <el-button class="iconfont travel-iconhaoping3"   style="margin-top: 2%;color: #EA8010"  @click="changeEv(1)">好评</el-button>
            <el-button class="iconfont travel-iconzhongping1"   style="margin-top: 2%;color: #0c9c6e"  @click="changeEv(2)">中评</el-button>
            <el-button class="iconfont travel-iconchapingtongzhi"   style="margin-top: 2%;color: #c12e2a"  @click="changeEv(3)">差评</el-button>

            <div class="" style="border: solid 1px #ddd;height: auto;margin-top: 2%" >
              <div v-if="evaluateList.length===0" style="font-family: 等线,serif;font-size: 30px;">
                <span style="color: #EA8010;margin-left: 35%">暂无评价</span>
              </div>
              <div class="row" >

                <div class="col-md-8">

                  <div class="row" style="margin-top: 2%;font-size: 13px;color: #a8a8a8;margin-bottom: 2%" v-for="ev in evaluateList">
                    <div class="col-md-1"></div>
                    <div class="col-md-1">
                      <el-image style="border-radius:45%;width: 40px;height: 40px" :src="ev.userHead"></el-image>
                    </div>
                    <div class="col-md-8">
                      <p>&nbsp;</p>
                      <div class="row">
                        <div class="col-md-8"> <span style="color: black;">{{ev.userName}}: </span>{{ev.evaluateContent}}<i style="float: right" @click="toEvaluate(ev)"><img  src="@/assets/images/reply.png"></i>
                        </div>
                        <div class="col-md-3" v-if="ev.evaluateLevel===1">
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        </div>
                        <div class="col-md-3" v-else-if="ev.evaluateLevel===2">
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        </div>
                        <div class="col-md-3" v-else-if="ev.evaluateLevel===3">
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        </div>
                        <div class="col-md-3" v-else-if="ev.evaluateLevel===4">
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_off.png"></i>
                        </div>
                        <div class="col-md-3" v-else>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                          <i style="float: left"><img  src="@/assets/images/start_on.png"></i>
                        </div>
                       </div>
                      <div class="row">
                        <div class="row" v-for="re in ev.replyList" v-show="isShow">{{re.userName}}:{{re.replyContent}}<i style="float: right" v-show="user.userId===re.replyUserId" @click="del(re.replyId)"><img  src="@/assets/images/shanchure.png"></i></div>
                      </div>
                      <div class="row" style="margin-top: 2%"><a style="color: #ffb611;font-size: 12px" @click="isShow = !isShow" v-if="ev.replyList!==null && ev.replyList.length>3">更多回复</a></div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
            <p>&nbsp;</p>
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

            <p>&nbsp;</p>
          </div>

        </div>

        <div class="you_need_konw" style="background-color: white;margin: 0px auto 0px;">
          <div style="margin-left: 2%;width: 97%">
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <span><i class="iconfont travel-iconjingbao" style="color: #EA8010"></i>旅游须知</span>
            <div class="notice">
              <p>1、旅行社已投保旅行社责任险。建议游客购买旅游意外保险 <br>

              <p>
                2、旅游者参加打猎、潜水、海边游泳、漂流、滑水、滑雪、滑草、蹦极、跳伞、滑翔、乘热气球、骑马、赛车、攀岩、水疗、水上飞机等属于高风险性游乐项目的，敬请旅游者务必在参加前充分了解项目的安全须知并确保身体状况能适应此类活动；如旅游者不具备较好的身体条件及技能，可能会造成身体伤害。</p>

              <p>
                3、参加出海活动时，请务必穿着救生设备。参加水上活动应注意自己的身体状况，有心脏病、冠心病、高血压、感冒、发烧和饮酒及餐后不可以参加水上活动及潜水。在海里活动时，严禁触摸海洋中各种鱼类，水母，海胆，珊瑚等海洋生物，避免被其蛰伤。老人和小孩必须有成年人陪同才能参加合适的水上活动。在海边游玩时，注意保管好随身携带的贵重物品。</p>

              <p>4、根据中国海关总署的规定，旅客在境外购买的物品，在进入中国海关时可能需要征收关税。详细内容见《中华人民共和国海关总署公告2010年第54号文件》。</p>

              <p>5、建议出发时行李托运，贵重物品、常用物品、常用药品、御寒衣物等请随身携带，尽量不要托运。行李延误属于不可抗力因素，我司将全力协助客人跟进后续工作，但我司对此不承担任何责任。</p>
              <p>1、旅行社已投保旅行社责任险。建议游客购买旅游意外保险 <br>

              <p>
                2、旅游者参加打猎、潜水、海边游泳、漂流、滑水、滑雪、滑草、蹦极、跳伞、滑翔、乘热气球、骑马、赛车、攀岩、水疗、水上飞机等属于高风险性游乐项目的，敬请旅游者务必在参加前充分了解项目的安全须知并确保身体状况能适应此类活动；如旅游者不具备较好的身体条件及技能，可能会造成身体伤害。</p>

              <p>
                3、参加出海活动时，请务必穿着救生设备。参加水上活动应注意自己的身体状况，有心脏病、冠心病、高血压、感冒、发烧和饮酒及餐后不可以参加水上活动及潜水。在海里活动时，严禁触摸海洋中各种鱼类，水母，海胆，珊瑚等海洋生物，避免被其蛰伤。老人和小孩必须有成年人陪同才能参加合适的水上活动。在海边游玩时，注意保管好随身携带的贵重物品。</p>

              <p>4、根据中国海关总署的规定，旅客在境外购买的物品，在进入中国海关时可能需要征收关税。详细内容见《中华人民共和国海关总署公告2010年第54号文件》。</p>

              <p>5、建议出发时行李托运，贵重物品、常用物品、常用药品、御寒衣物等请随身携带，尽量不要托运。行李延误属于不可抗力因素，我司将全力协助客人跟进后续工作，但我司对此不承担任何责任。</p>
            </div>
          </div>
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
    <el-dialog title="回复" :visible.sync="dialogVisible2" width="50%" center>
      <form class="form-horizontal" role="form" onsubmit="return false;" id="form1" >
        <div class="form-group">
          <label class="col-sm-2 control-label">评论</label>
          <div class="col-sm-10">
            <el-input type="text"  style="width: 60%" v-model="reply.replyContent"
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
    </el-dialog>
    <!-- 详情 end -->
    <div id="footer">
      <VFooter></VFooter>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import VFooter from "@/components/travel_up/common/Footer";
  import VHeader from '@/components/travel_up/common/Header'

  export default {
    name: "lines",
    directives: {
      // 指令的生命周期
      clickOutside: {
        // 事件绑定事件
        bind(el, bingings, vnode) {
          let hander = (e) => {
            if (el.contains(e.target)) {
              if (!vnode.context.isVisble) {
                //   vnode.context.focus();
              }
            } else {
              if (vnode.context.isVisble) {
                vnode.context.blur();
              }
            }
          };
          el.hander = hander;
          document.addEventListener("click", hander);
        },
        unbind(el) {
          document.removeEventListener("click", el.hander);
        },
      },
    },
    data() {
      let {year, month} = this.getYearMonthDay(this.value || new Date());
      return {
        dialogVisible: false,
        text: "",
        roomCount:1,
        orderCount:1,
        paySucc: false,
        bg: 'url(' + require('../../assets/images/5ff1cbaa8650f.jpg') + ')',
        is_table: 1,
        is_number: 1,
        catalogVur: 0,
        isVisble: false,
        weekarr: ["日", "一", "二", "三", "四", "五", "六"],
        value: null,
        time: {
          year,
          month,
        },
        data: [{calendar: "2021-3-29", price: "100"}, {calendar: "2021-4-10", price: "101"}],
        field: [{'price': '价格'}],
        start: '2021-3-15',
        end: '2022-4-1',
        pickerOptions0: {
          disabledDate: time => {

            return time.getTime() < new Date(this.start).getTime() - 8.64e7 || time.getTime() > new Date(this.end).getTime();
          }
        },
        lineMessage:{
          lineId:'',
          pageIndex:1,
          size:6,
          level:0,
        },
        lineGroupMessage:{
          lineId:'',
          pageIndex:1,
          size:6,
          level:0,
        },
        evaluateList:[],
        travelTimes:[],
        lineGroup:[],
        lineGroupList:[],
        dialogVisible2:false,
        dialogVisible: false,
        text: "",
        order:{
          roomCount:'',
          roomId:'',
          inDate:'',
          hotelId:'',
          leaveDate:'',
          orderImg:'',
          orderName:'',
          userId:'',
          lineOrHotelId:'',
          orderType:1,
          orderCount:1,
          orderSingelPrice:'',
          totaltime:'',
          orderTotalPrice:'',
          orderStatus:0,
          scenicId:'',
        },
        price:'',
        car:{
          roomCount:'',
          userId:'',
          lineGroupId:'',
          scCount:1,
          ScSingelPrice:'',
          isIncludeScenic:0,
        },
        reply:{
          replyContent:'',
          replyUserId:'',
          evaluateId:'',
          hotelId:'',
        },
        user:[],
        selectMoney:true,
        likeList:[],
        similarityList:[],
        themeList:[],
        ImageList:[],
        cityScenicList:[],
        scenicList:[],
        scenicPrice:0,
        all: 10, //总页数
        cur: 1,//当前页码
        totalPage: 0,//当前条数
        totalCount:124,
        lineGroupId:'',
      }
    },
    watch:{
      lineGroupId:function (val) {
        this.lineGroupMessage.lineId=val;
        this.order.lineOrHotelId=val;
        this.car.lineGroupId=val;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/line_group/get_line_view",qs.stringify(this.lineGroupMessage),config)
          .then(successReqponse => {
            var data = successReqponse.data;
            if(data.message==='nologin'){
              //this.$router.push('/error');
            }
            else {
              this.lineGroup = data.lineGroup;
              this.evaluateList=[];
              this.evaluateList = data.evaluateList;
              console.log( this.lineGroup);
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
             }
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      }
    },
    components: {
      VHeader,
      VFooter
    },
    mounted: function() {
      this.lineMessage.lineId=this.$route.query.lineId;
      this.order.lineOrHotelId=this.lineMessage.lineId;
      this.car.lineGroupId=this.lineMessage.lineId;
      this.init();
    },
    methods: {
      addToMoney(){
        this.lineGroup.linePrice= this.lineGroup.linePrice+this.scenicPrice*this.orderCount;
        this.selectMoney=false;
        this.car.isIncludeScenic=1;
      },
      diffToMoney(){
        this.lineGroup.linePrice= this.lineGroup.linePrice-this.scenicPrice*this.orderCount;
        this.selectMoney=true;
        this.car.isIncludeScenic=0;
      },

      diff2(){
       if(this.roomCount<=1||this.roomCount<=parseInt((this.orderCount+1)/2)){
         //alert("超过下限")
      }
      else {
        this.roomCount--;
         this.linePrice= this.price*this.orderCount+this.roomCount* this.lineGroup.roomPrice;
      }
      },
      add2(){
        if(this.roomCount>=this.orderCount){

        }
        else {
          this.roomCount++;
          this.linePrice= this.price*this.orderCount+this.roomCount* this.lineGroup.roomPrice;
        }

      },
      diff1(){
        if(this.orderCount<=1){
         // alert("超过下限")
        }
        else {
          this.orderCount--;
          this.roomCount= parseInt((this.orderCount+1)/2);
          console.log(this.orderCount,this.roomCount)
          this.lineGroup.linePrice=this.price*this.orderCount+this.roomCount* this.lineGroup.roomPrice;
        }
      },
      add1(){
        var count;
        if(this.orderCount>=this.lineGroup.linePeople){
          alert("当前"+this.lineGroup.lineStartTime+"今剩"+this.lineGroup.linePeople+"份")
        }

        else {
          this.orderCount++;
          this.roomCount=parseInt((this.orderCount+1)/2);
          this.lineGroup.linePrice= this.price*this.orderCount+this.roomCount* this.lineGroup.roomPrice;
        }


      },
      del(replyId){
        if(confirm("确实要删除吗？")){
          var qs=require('querystring')
          let config={
            header:{'Content-type':'application/x-www-form-urlencoded'}
          };
          this.$axios.post("evaluates/del_reply?replyId="+replyId,config)
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
      dataListFn: function(index){
        var qs=require('querystring')
        let config={
          header:{'Content-type':'application/x-www-form-urlencoded'}
        };
        this.lineMessage.pageIndex=index;
        this.$axios.post("/line_group/line_view",qs.stringify(this.lineMessage),config)
          .then(successReqponse => {
            var data = successReqponse.data;
            if(data.message==='nologin'){
              //this.$router.push('/error');
            }
            else {
              this.lineGroup = data.lineGroup;
              this.evaluateList=[];
              this.evaluateList = data.evaluateList;
              this.travelTimes=[];
              this.travelTimes=data.travelTimes;
              this.ImageList=[];
              this.ImageList=data.ImageList;
              console.log( this.lineGroup);
              console.log( this.evaluateList);
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
              this.user=data.user;
              this.ImageList=data.ImageList;
            }
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
      getScenicPrice(){

        for(var i=0;i<this.scenicList.length;i++){
          console.log(12547,this.scenicList[i].scenicPrice);
          this.scenicPrice= this.scenicPrice+this.scenicList[i].scenicPrice;
        }
      },

      init() {
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.$axios.post("/line_group/line_view",qs.stringify(this.lineMessage),config)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.lineGroup = data.lineGroup;
            this.evaluateList=[];
            this.evaluateList = data.evaluateList;
            this.travelTimes=[];
            this.travelTimes=data.travelTimes;
            this.ImageList=[];
            this.ImageList=data.ImageList;
            this.scenicList=data.scenicList;
            console.log( this.lineGroup);
            console.log(this.evaluateList);
            this.all = data.pageCount;//总页数
            console.log(this.all);
            this.totalCount = data.total;
            this.user=data.users;
            console.log(11111);
            this.price=this.lineGroup.linePrice;
            this.data=data.travelDays;
            console.log(11111);
            var text=data.lineGroup.lineDescription;
            this.lineGroup.lineDescription=text.replace(/\r\n/g,'<br/><br/>').replace(/\n/g,'<br/><br/>').replace(/\s/g,'<br/><br/>');
            console.log(7777);
            this.getScenicPrice();
            this.tuijian();
          })
          .catch(failRespose => {
            console.log("33页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      tuijian(){
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        console.log("test...");
        console.log(this.lineGroup.lineId);
        console.log(this.lineGroup.lineName);
        console.log(this.lineGroup.cityId);
        console.log(this.lineGroup.themeId);
        console.log(this.user.userId);
        var data={
          searchId:this.lineGroup.lineId,
          searchName:this.lineGroup.lineName,
          cityId:this.lineGroup.cityId,
          themeId:this.lineGroup.themeId,
          userId:this.user.userId,
          scenicId:this.lineGroup.lineScenic
        };

        console.log("test2...");
        this.$axios.post("/line_tui",qs.stringify(data),config)
          .then(successReqponse => {
            var data = successReqponse.data;
            this.likeList=[];
            this.likeList = data.likeList;
            this.similarityList=[];
            this.similarityList=data.similarityList;
            this.themeList=[];
            this.themeList=data.themeList;
            this.cityScenicList=[];
            this.cityScenicList=data.cityScenicList;
            console.log( this.likeList);
            console.log('themeList', this.themeList);
            console.log('similarityList', this.similarityList);
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      jdgueUser(){
        if(this.user===null||this.user.userId===null||this.user.userId===''){
          alert("您还没有登录")
        }
        else {
         // this.room=room;
        }

      },
      subReply() {

        // var targetUrl = "http://localhost:8080/manager/product/save";
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };


        this.$axios.post("/evaluates/reply_save", qs.stringify(this.reply), config)
          .then(successReqponse => {
            alert("保存成功");
            init();
          })
          .catch(failRespose => {
            console.log("系统错误");
          })


      },
      toEvaluate(ev){
        this.reply.evaluateId=ev.evaluateId;
        if(this.user===null||this.user.userId===null||this.user.userId===''){
          alert("您还没有登录")
        }
        else {
          this.dialogVisible2=true;
        }

      },
      changeEv(num){
        this.hotelMessage.level=num;
        var qs = require('querystring')
        let config = {
          header: {'Content-type': 'application/x-www-form-urlencoded'}
        };
        this.lineMessage.pageIndex=1;
        this.$axios.post("/line_group/line_view",qs.stringify(this.lineMessage),config)
          .then(successReqponse => {
            var data = successReqponse.data;
            if(data.message==='nologin'){
              //this.$router.push('/error');
            }
            else {
              this.lineGroup = data.lineGroup;
              this.evaluateList=[];
              this.evaluateList = data.evaluateList;
              this.travelTimes=[];
              this.travelTimes=data.travelTimes;
              this.ImageList=[];
              this.ImageList=data.ImageList;
              console.log( this.lineGroup);
              console.log( this.evaluateList);
              this.all = data.pageCount;//总页数
              this.totalCount = data.total;
              this.user=data.user;
            }
          })
          .catch(failRespose => {
            console.log("页面加载错误！正在重新载入...");
            //this.$router.replace("/leaderAdd");
          })
      },
      addToOrder(){
        if(this.user===null||this.user.userId===null||this.user.userId===''){
          alert("您还没有登录");
          let url=this.$router.resolve('login');
          window.open(url.href,'_blank');
        }else{
          let _this = this;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          if( _this.order.orderCount>_this.lineGroup.linePeople){
            alert("超过上限!")
          }
          else {
            _this.order.scenicId=_this.lineGroup.lineScenic;
            _this.order.orderCount=_this.orderCount;
            _this.order.roomId=_this.lineGroup.roomId;
            _this.order.userId=_this.user.userId;
            _this.order.orderName=_this.lineGroup.lineName;
            _this.order.orderImg=_this.lineGroup.linePhoto;
            _this.order.inDate=_this.lineGroup.lineStartTime;
            _this.order.totaltime=_this.lineGroup.lineTotalTime;
            _this.order.roomCount=_this.roomCount;
            _this.order.hotelId=_this.lineGroup.hotelId;
            _this.order.orderSingelPrice=_this.price;
            _this.order.orderTotalPrice=_this.orderCount*_this.price+this.roomCount*_this.lineGroup.roomPrice;
            _this.$axios.post("/order/save",qs.stringify(_this.order),config)
              .then(successReqponse => {
                var data = successReqponse.data;
                if(data.message==='OK'){
                  _this.$router.push({path:'/order',query:{orders:data.orders}});
                }
                else {
                  alert("数据加载异常")

                }
              })
              .catch(failRespose => {
                console.log(failRespose);
                //this.$router.replace("/leaderAdd");
              })
          }
        }

      },
      addToCar(){
        if(this.user===null||this.user.userId===null||this.user.userId===''){
          alert("您还没有登录");
          let url=this.$router.resolve('login');
          window.open(url.href,'_blank');
        }else{
          let _this = this;
          _this.paySucc = false;
          _this.dialogVisible = true;
          var qs = require('querystring')
          let config = {
            header: {'Content-type': 'application/x-www-form-urlencoded'}
          };
          _this.car.scCount=_this.orderCount;
          _this.car.roomCount=_this.roomCount;
          _this.car.userId=_this.user.userId;
          _this.car.orderName=_this.lineGroup.lineName;
          _this.car.ScSingelPrice=_this.lineGroup.linePrice;
          _this.$axios.post("/car/save",qs.stringify(_this.car),config)
            .then(successReqponse => {
              var data = successReqponse.data;
              if(data.message==='OK'){
                alert("添加成功")
              }
              else {
                alert("数据加载异常")

              }
            })
            .catch(failRespose => {
              console.log(failRespose);
              //this.$router.replace("/leaderAdd");
            })
        }

      },
      changeTable(num) {
        this.is_table = num;
      },
      changeNumber(num) {
        this.is_number = num;
        if(num===1){
          this.paySucc=true;
        }
        if(this.user===null||this.user.userId===null||this.user.userId===''){
          alert("您还没有登录");
          let url=this.$router.resolve('login');
          window.open(url.href,'_blank');
        }
        else {
          this.paySucc = false;
          this.dialogVisible = true;
        }

      },
      focus() {
        this.isVisble = true;
      },
      blur() {
        this.isVisble = false;
      },
      getYearMonthDay(date) {

        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        return {year, month, day};
      },
      getDate(year, month, day) {
        return new Date(year, month, day);
      },
      // 日期模板日期展示不属于这个月
      notIsThisMonth(date) {
        let {year, month} = this.getYearMonthDay(
          this.getDate(this.time.year, this.time.month, 1)
        );
        var bool=false;
        let {year: y, month: m, day: d} = this.getYearMonthDay(date);
        if (year === y && month === m) {
          console.log(m)
          return true;
        }
        else {
          this.data.forEach((element) => {
            let splitDateArr = element.calendar.split("-");
            // alert(element.price)
            if (
              Number(splitDateArr[0]) === y &&
              Number(splitDateArr[1] - 1) === m &&
              Number(splitDateArr[2]) === d
            ) {
              console.log(d)
              return true;
            }

          });
        }
      },

      isToday(date) {
        let {year, month, day} = this.getYearMonthDay(new Date());
        let {year: y, month: m, day: d} = this.getYearMonthDay(date);
        if (year === y && month === m && day === d) {
          return true;
        }
      },
      // 每个日期要展示的自定义字段
      showText(date, info) {
        let title;
        let k;
        let item;
        for (let key in info) {
          title = info[key];
          k = key;
        }
        let {year: y, month: m, day: d} = this.getYearMonthDay(date);
        this.data.forEach((element) => {
          let splitDateArr = element.calendar.split("-");
          // alert(element.price)
          if (
            Number(splitDateArr[0]) === y &&
            Number(splitDateArr[1] - 1) === m &&
            Number(splitDateArr[2]) === d
          ) {
            item = element;
          }

        });
        //alert(item==null)
        if (item) {
          let str = '价格:' + item[k];

          return str;

        }
      },
      // 是否禁用
      isDisabled(date) {
        // let { year, month, day } = utils.getYearMonthDay(new Date())
        let {year: y, month: m, day: d} = this.getYearMonthDay(date);
        let bool = true;
        // 日期小于当前时间 禁用
       // console.log(new Date().getTime() - (1000 * 60 * 60 * 24))
        if (date.getTime() < new Date().getTime() - (2000 * 60 * 60 * 24)) {
          return true;
        }

        this.data.forEach((element) => {
          let splitDateArr = element.calendar.split("-");

          if (
            Number(splitDateArr[0]) === y &&
            Number(splitDateArr[1] - 1) === m &&
            Number(splitDateArr[2]) === d
          ) {
            console.log( Number(splitDateArr[0]) +Number(splitDateArr[1] - 1) + Number(splitDateArr[2]) )
            console.log(y+m+d)
            bool = false;
          }
        });
        return bool;
      },
      // 用户选中日期
      checkDate(date, bool) {
        if (bool) return;
        this.time = this.getYearMonthDay(date);
        let {year, month, day} = this.getYearMonthDay(date);

        this.value = date
        let {year: y, month: m, day: d} = this.getYearMonthDay(date);
        this.data.forEach((element) => {
          let splitDateArr = element.calendar.split("-");

          if (
            Number(splitDateArr[0]) === y &&
            Number(splitDateArr[1] - 1) === m &&
            Number(splitDateArr[2]) === d
          ) {
            console.log( Number(splitDateArr[0]) +Number(splitDateArr[1] - 1) + Number(splitDateArr[2]) )
            console.log(y+m+d)
            //alert(element.id)
            this.lineGroupId = element.id;

          }
        });
        this.$emit('formaDate', `${year}-${month + 1}-${day}`)

        this.isVisble = false;
      },
      // 点击高亮
      isActive(date) {
        if (!this.value) return

        let {year, month, day} = this.getYearMonthDay(this.value);
        let {year: y, month: m, day: d} = this.getYearMonthDay(date);
        if (year === y && month === m && day === d) {
          return true;
        }
      },
      prevMonth() {
        let d = this.getDate(this.time.year, this.time.month, 1);
        d.setMonth(d.getMonth() - 1);
        this.time = this.getYearMonthDay(d);
      },
      nextMonth() {
        let d = this.getDate(this.time.year, this.time.month, 1);
        d.setMonth(d.getMonth() + 1);
        this.time = this.getYearMonthDay(d);
      },
      prevYear() {
        let d = this.getDate(this.time.year, this.time.month, 1);
        d.setFullYear(d.getFullYear() - 1);
        this.time = this.getYearMonthDay(d);
      },
      nextYear() {
        let d = this.getDate(this.time.year, this.time.month, 1);
        d.setFullYear(d.getFullYear() + 1);
        this.time = this.getYearMonthDay(d);
      },
      disabledDate2(time) {
        //alert(time.getTime())
        var times = new Date(this.start).getTime()
        return time.getTime() < times - 8.64e7;
      },


    },

    // 对象或数组类型必须使用函数
    props: {
      // value: {
      //   type: Date,
      //   default: () => new Date(),
      // },
      disabledDate: {
        type: Array,
        default: () => [],
      }
    },
    computed: {
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
      },
      formaDate() {
        if (!this.value) return
        let {year, month, day} = this.getYearMonthDay(this.value);
        console.log(`${year}-${month + 1}-${day}`)
        return `${year}-${month + 1}-${day}`;
      },
      // 每个月的日期模板

      visibeDays() {
        let {year, month} = this.getYearMonthDay(
          this.getDate(this.time.year, this.time.month, 1)
        );
        // 拿到当前年月的一号的时间
        let startDay = this.getDate(year, month, 1);
        // 获取这个月1号是属于这周的第几天 从0-6
        let week = startDay.getDay();
        // 根据1号的时间 和 属于每一周的天数计算出 当月模板 中 第一个日期
        let endDay = startDay - week * 60 * 60 * 24 * 1000;
        let arr = [];
        // 依次计算当页 42天 每天的时间戳
        for (let i = 0; i < 42; i++) {
          arr.push(new Date(endDay + i * 60 * 60 * 24 * 1000));
        }
        return arr;
      },
    },
  }


</script>

<style scoped>

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
  .info_feature {
    padding-top: 14px;
  }

  .info_feature .target_txt {
    background-color: #EAA24E;
  }

  .info_attr_txt {
    float: left;
    min-width: 60px;
    margin-right: 32px;
    color: #343434;
    font-weight: 600;
  }

  .target_txt {
    display: inline-block;
    padding: 2px 8px;
    font-size: 12px;
    background-color: #EAA24E;
    color: #fff;
    border-radius: 10px;
    position: relative;
  }

  .target_txt3 {
    display: inline-block;
    padding: 2px 8px;
    font-size: 12px;
    background-color: #b9ea43;
    color: #fff;
    border-radius: 10px;
    position: relative;
  }

  .target_txt2 {
    display: inline-block;
    padding: 2px 8px;
    font-size: 12px;
    color: #ea3330;
    border-radius: 10px;
    position: relative;
  }

  div {
    font-size: 16px;
  }

  .triangle {
    width: 0;
    height: 0;
    overflow: hidden;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #E6E6E6;
    position: absolute;
    top: -20px;
    left: 50px
  }

  input {
    width: 177px;
    height: 33px;
    border-radius: 3px;
    padding-left: 16px;
    color: #666;
    outline-style: none;
    border: 1px solid #ccc;
  }

  .pantal {
    position: absolute;
    width: 450px;
    background-color: rgb(246, 232, 191);
    box-shadow: 0px 0px 5px #a2a2a2;
    z-index: 1000;
    margin-top: 16px
  }

  .header {
    /* background: #eee; */
    display: flex;
    justify-content: space-between;
    /* height: 0.3rem; */
  }

  .header > span {
    float: left;
    width: 200px;
    padding: 0 10px;
    font-size: 15px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;

  }

  .isdisabeld {
    /* background-color: #ccc;
     */
    color: rgb(210, 172, 149);
  }

  .iscancheck {
    color: #ff335c;
  }

  .content {
    display: inline-block;
    margin: 0 auto;
    /* border: 1px solid pink; */
    box-sizing: border-box;
  }

  .content > div {
    text-align: end;
  }

  .isToday {
    /* color: #999999; */
  }

  .newspan {
    display: inline-block;
    width: 60px;
    height: 85px;
    line-height: 85px;
    vertical-align: middle;
  }

  .content-item {
    /* position: relative; */
    height: 50px;
    /* line-height: 20px; */
  }

  .content-info {
    /* position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 60px;
      height: 60px; */
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .content-info p {
    width: 95px;
    height: 20px;
    margin: 0;
    font-size: 15px;
    line-height: 20px;
    text-align: center;
  }

  .checkGray {

    opacity: 0.4;
  }

  .active {
    color: rgb(24, 144, 255);
    /* background-color:#666; */
    color: #ff335c;
    font-weight: 600;
  }

  .travel_time {
    height: 80px;
    background-color: #00a0e9;
    color: white
  }

  .travel_time2 {
    height: 80px;
    background-color: white;
    color: black;
  }


</style>
