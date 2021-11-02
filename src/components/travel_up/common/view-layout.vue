<template>
  <div class="view-warp">
    <div class="view-box" v-if="!viewTime.time">
      <div class="view-flex" v-for="(v,k) in viewData" :key="k" :style="style">
        <div class="view-item">
          <span>{{v.title}}</span>
        </div>
      </div>
    </div>
    <div class="view-no-data" v-else>{{viewTime.msg}}</div>
  </div>
</template>

<script>
    export default {
        name: "view-layout",
      props: {
        viewData: {
          type: Array,
          default: () => []
        },
        width: {
          type: String,
          default: "25%"
        },
        height: {
          type: String,
          default: "300px"
        },
        viewTime: {
          type: Object,
          default: {
            time: true,
            msg: '数据加载中...'
          }
        }
      },
      computed: {
        style() {
          return {
            width: `${this.width.replace(/%+/, '')}%`,
            height: `${this.height.replace(/px+/, '')}px`
          }
        }
      }
    }
</script>

<style scoped>
  /* 布局组件:start */
  .view-warp {
    flex: 1;
    overflow: hidden;
    margin: auto;
    display: flex;
  }

  .view-box {
    overflow: auto;
    width: 1220px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -10px;
  }

  .view-flex {
    padding: 10px;
    cursor: pointer;
    transition: ease .5s;
    transform-style: preserve-3d;
  }

  .view-flex:hover {
    transform: translateY(-10px);
    transition: ease .5s;
  }

  .view-item {
    height: 100%;
    border: 1px solid red;
    display: flex;
  }

  .view-item>span {
    margin: auto;
  }

  .view-no-data {
    margin: auto;
  }

  /* 布局组件:end */
</style>
