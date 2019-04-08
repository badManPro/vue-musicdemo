<template>
    <div class="song-list">
        <ul>
            <li v-for="song in songs" class="item" @click="playSongs(song)">
                <div class="rank" v-show="rank">
                    <span :class="getRankCls(song)">{{getRankText(song)}}</span>
                </div>
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "song-list",
        props: {
            songs: {
                type: Array,
                default: []
            },
            // rank样式列表开关
            rank: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            getDesc(song) {
                if (song.singer && song.album){
                    return `${song.singer} - ${song.album}`
                }
                return `${song.singer}`

            },
            playSongs(song) {
                if (song.mid) {
                    window.location.href = `https://y.qq.com/n/yqq/song/${song.mid}.html`
                }
                if (song.albumMid) {
                    window.location.href = `https://y.qq.com/n/yqq/album/${song.albumMid}.html`
                }
                
            },
            getRankCls(song) {
                if (song.rank <= 3) {
                    return `icon icon${song.rank - 1}`
                } else {
                    return 'text'
                }
            },
            getRankText(song) {
                if (song.rank > 3) {
                    return song.rank
                }
            },
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .song-list
        .item
            display: flex
            align-items: center
            box-sizing: border-box
            height: 64px
            font-size: $font-size-medium
            .rank
                flex: 0 0 25px
                width: 25px
                margin-right: 30px
                text-align: center
                .icon
                    display: inline-block
                    width: 25px
                    height: 24px
                    background-size: 25px 24px
                    &.icon0
                        bg-image('first')
                    &.icon1
                        bg-image('second')
                    &.icon2
                        bg-image('third')
                .text
                    color: $color-theme
                    font-size: $font-size-large
            .content
                flex: 1
                line-height: 20px
                overflow: hidden
                .name
                    no-wrap()
                    color: $color-text
                .desc
                    no-wrap()
                    margin-top: 4px
                    color: $color-text-d
</style>