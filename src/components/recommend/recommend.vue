<template>
    <div class="recommend">
        <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
                <div v-if="recommends.length" class="slider-wrapper">
                    <slider>
                        <div v-for="item in recommends">
                            <a :href="item.linkUrl">
                                <img :src="item.picUrl" @load="loadImage" class="needsclick">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li v-for="item in discList" class="item">
                            <div class="icon">
                                <img width="60" height="60" v-lazy="item.cover">
                            </div>
                            <div class="text">
                                <h2 class="name" v-html="item.title"></h2>
                                <p class="desc" v-html="'熱度'+item.username"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script type="text/ecmascript-6">
    import Slider from "base/slider/slider"
    import {getRecommend, getDiscList} from "api/recommend"
    import {ERR_OK} from "api/config"
    import Scroll from "base/scroll/scroll"
    import Loading from 'base/loading/loading'

    export default {
        data() {
            return {
                recommends: [],
                discList: []
            }
        },
        created() {
            this._getRecommend()
            setTimeout(() => {
                this._getDiscList()
            }, 3000)

        },
        methods: {
            // 获取推荐数据jsonp方法
            _getRecommend() {
                getRecommend().then((res) => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider;
                    }
                })
            },
            // 获取推荐歌单方法
            _getDiscList() {
                getDiscList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.discList = res.recomPlaylist.data.v_hot
                    }
                })
            },
            //  判断图片获取状态方法
            loadImage() {
                if (!this.checkloaded) {
                    this.checkloaded = true
                    this.$refs.scroll.refresh()
                }
            }
        },
        components: {
            Slider,
            Scroll,
            Loading
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"


    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                 .list-title
                     height: 65px
                     line-height: 65px
                     text-align: center
                     font-size: $font-size-medium
                     color: $color-theme
                 .item
                     display: flex
                     box-sizing: border-box
                     align-items: center
                     padding: 0 20px 20px 20px
                     .icon
                          flex: 0 0 60px
                          width: 60px
                          padding-right: 20px
                     .text
                          display: flex
                          flex-direction: column
                          justify-content: center
                          flex: 1
                          line-height: 20px
                          overflow: hidden
                          font-size: $font-size-medium
                          .name
                               margin-bottom: 10px
                               color: $color-text
                          .desc
                               color: $color-text-d
                 .loading-container
                     position: absolute
                     width: 100%
                     top: 50%
                     transform: translateY(-50%)
</style>