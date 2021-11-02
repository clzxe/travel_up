<template>
  <div class="demo">
    <div class="demo-warp" style="margin-top: 2%">
      <div class="demo-flex" style="    width: 90%;
    margin-left: 5%;" v-for="(v,k) in getList" :key="k">
        <span class="demo-title">{{v.title}}</span>
        <div class="demo-content">
          <div class="demo-tab" :class="isShow ? 'demo-hide' : ''">
            <span v-for="(val, key) in v.childer" :key="key" :class="{'demo-active': val.active}" @click="tabClick(val,key,k)">{{val.value}}</span>
          </div>
        </div>
        <div class="demo-more" @click="isShow = !isShow" v-if="v.childer.length>13">更多</div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "demo-filter",
        data() {
        return {
          isShow: false
        }
      },
      props: {
        getList: {
          type: Array,
          default: () => []
        }
      },
      methods: {
        tabClick(data, key, k) {
          // 添加 active ==> true 显示 `active样式`
          this.getList[k].childer.map(item => {
            item.active = false
          })
          this.getList[k].childer[key].active = true

          // 选中的数据
          let newArray = []
          this.getList.map(data => {
            data.childer.map(item => {
              if (item.active == true) {
                newArray.push(item)
              }
            })
          })
        }
      }
    }
</script>

<style scoped>
  /* 过滤列表:start */
  .demo {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    margin-bottom: 15px;
    min-height: 140px;
    height: auto !important;
    height: 140px;
  }

  .demo-warp {
    display: flex;
    max-width: 1200px;
    margin: auto;
    height: 100%;
    flex-direction: column;
    padding: 15px 0;
  }

  .demo-flex {
    display: flex;
    margin-bottom: 15px;
  }

  .demo-flex:last-of-type {
    margin-bottom: 0;
  }

  .demo-title {
    flex-basis: 70px;
    margin-top: 5px;
  }

  .demo-content {
    display: flex;
    flex: 1;
  }

  .demo-tab {
    flex: 1;
    margin-right: 15px;
    height: 35px;
    overflow: hidden;
  }

  .demo-tab span {
    display: inline-block;
    margin: 0 5px 15px 5px;
    cursor: pointer;
    padding: 5px 10px;
    color: #999999;
  }

  .demo-more {
    margin-top: 5px;
    cursor: pointer;
  }

  .demo-active {
    background-color: #09F;
    color: white !important;
    border-radius: 3px;
  }

  .demo-tab span:hover {
    background-color: #09F;
    color: white;
    border-radius: 3px;
  }

  .demo-hide {
    min-height: 35px;
    height: auto !important;
  }

  /* 过滤列表:end */
</style>
