<template>
    <div class="singer">
        <list-view :data="singers" @select="selectSinger"></list-view>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getSingerList} from "api/singer"
    import {ERR_OK} from "api/config"
    import Singer from 'common/js/singer'
    import pinyin from 'common/js/pinyin'
    import ListView from 'base/listview/listview'
    import {mapMutations} from 'vuex'


    const HOT_NAME = '热门'
    const HOT_SINGER_LEN = 10
    export default {
        data() {
            return {
                singers:[]
            }
        },
        created() {
            this._getSingerList()
        },
        methods: {
            selectSinger(singer) {
                this.$router.push({
                    path: `/singer/${singer.id}`
                })
                this.setSinger(singer)
            },
            _getSingerList() {
                getSingerList().then((res) => {
                    if (res.code === ERR_OK) {
                        this.singers = this._normalizeSinger(res.singerList.data.singerlist)
                    }
                })
            },
            // 将拿到的列表数组 转化为需要的数据类型
            _normalizeSinger(list) {
                let map = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                }
                list.forEach((item, index) => {
                    if (index < HOT_SINGER_LEN) {
                        map.hot.items.push(new Singer({
                            id: item.singer_mid,
                            name: item.singer_name,
                        }))
                    }
                    //为当前对象添加属性Findex，并提取汉字首字母
                    item.Findex = pinyin.getCamelChars(item.singer_name.slice(0,1))

                    const key = item.Findex
                    if (!map[key]) {
                        map[key] = {
                            title: key,
                            items: []
                        }
                    }
                    // 将map热门后面的对象 push进map来完善数据
                    map[key].items.push(new Singer({
                        name: item.singer_name,
                        id: item.singer_mid
                    }))
                })
                console.log(map)
                //  为了得到有序列表数组 需要处理一下
                let hot = []
                let ret = []
                for (let key in map) {
                    let val = map[key]
                    if (val.title.match(/[a-zA-Z]/)) {
                        ret.push(val)
                    } else if (val.title === HOT_NAME){
                        hot.push(val)
                    }
                }
                ret.sort((a, b) => {
                    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
                })
                return hot.concat(ret)
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        components: {
            ListView
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>