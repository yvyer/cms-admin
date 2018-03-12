
<template>
  <div class="app-container">
    <div v-for="element in list">
    <mt-cell class="music-cell-type2">
      <div class="listen-cover" v-on:click="redirect(element.url)">
        <img v-lazy="element.photo">
      </div>
      <ul slot="title" class="song-list" v-on:click="redirect(element.url)">
        <li class="song-item">{{ element.title }}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp111111111111111111111111111111111111111111111111111111111111111111111111</li>
        <li class="song-item">
          <span class="song-singer">{{ element.content }}</span>
        </li>
      </ul>
    </mt-cell>
    </div>
    <a class="draginner">由蜻蜓推提供技术支持</a>

  </div>

</template>
<script>
  import Vue from 'vue';
  import { Cell } from 'mint-ui';
  import { updateArticle } from '@/api/article';
  import { getInfo } from '@/api/page';

  Vue.component(Cell.name, Cell);
  export default {
    data() {
      return {
        type: 1,
        pid: '',
        name: '',
        content: [],
        editable: true,
        isDragging: false,
        delayedDragging: false,
        visible2: false,
        list: []
      }
    },
    methods: {
      fetchData(pid) {
        this.listLoading = true
        getInfo(pid).then(response => {
          this.list = response.data.data.list;
          this.name = response.data.data.title;
        })
      },
      redirect(url) {
        window.location.href = url;
      }
    },
    created() {
      this.pid = this.$route.params.pid;
      this.fetchData(this.pid);
    },
    computed: {
      filterList2() {
        return this.list2.filter(v => {
          if (this.isNotInList1(v)) {
            return v
          }
          return false;
        })
      }
    }
  }

</script>
<style scoped>

</style>

<style lang="scss">
  ol, ul, li {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  // QQ TopList cell
  .music-cell-type2 {
    // margin: 0 10px 10px;
    &:before, &:after {
      color: transparent;
    }
    .mint-cell-wrapper {
      flex-direction: row-reverse;
      background-image: none;
      background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 0);
      background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 0);
      background-size: 120% 1px;
      background-repeat: no-repeat;
      background-position: 0 0;
      background-origin: content-box;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      box-sizing: border-box;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      font-size: 16px;
      line-height: 1;
      min-height: inherit;
      overflow: hidden;
      padding: 0 10px;
      width: 100%;
    }
    .mint-cell-title {
      overflow: hidden
    }
    .mint-cell-value {
      /*width: 20%;*/
      img {
        opacity: 0;
        transition: opacity .5s ease-in;
        &[lazy="loaded"], &[lazy="error"] {
          opacity: 1
        }
      }
      .listen-cover {
        position: relative;
        width: 100%;
        img {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .listen-count {
          position: absolute;
          top: 100%;
          margin-top: -16px;
          font-size: 10px;
          color: #fff;
        }
      }
    }
    .mint-cell-right {
      display: flex;
      align-items: center;
      transform: initial;
      color: rgba(0, 0, 0, .5);
    }
    .song-list {
      width: 500px;
      margin: 8px;
      .song-title {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .song-item {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14px;
      }
      .song-singer {
        color: rgba(0, 0, 0, .5);
      }
      li {
        line-height: 30px;
      }
    }
    .song-arrow {
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -4px;
      width: 6px;
      height: 6px;
      border-right: 1px solid #b2b2b2;
      border-bottom: 1px solid #b2b2b2;
      -webkit-transform: rotate(-45deg);
    }
  }
</style>



