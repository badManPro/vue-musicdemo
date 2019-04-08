<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs" :rank="rank"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getMusicList} from "../../api/rank";
    import {ERR_OK} from "../../api/config";
    import {createToplistSong} from "../../common/js/song";

    export default {
        name: "top-list",
        data() {
            return {
                songs: [],
                rank: true
            }
        },
        computed: {
            title() {
                return this.topList.topTitle
            },
            bgImage() {
                return this.topList.picUrl
            },
            ...mapGetters([
                'topList'
            ])
        },
        components: {
            MusicList
        },
        created() {
            this._getMusicList()
        },
        methods: {
            _getMusicList() {
                if (!this.topList.id) {
                    this.$router.push('/rank')
                    return
                }
                getMusicList(this.topList.id).then((res) => {
                    if (res.code === ERR_OK) {
                        this.songs = this._normalizeSongs(res.detail.data.data.song)
                        console.log(this.songs)
                        console.log(res.detail.data.data.song)
                    }
                })
            },
            _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    const musicData = item
                    if (musicData.title && musicData.singerMid) {
                        ret.push(createToplistSong(musicData))
                    }
                })
                return ret
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slide-center-active, .slide-leave-active
        transition: all 0.3s ease

    .slide-center, .slide-leave-to
        transfrom: translate3d(100%, 0, 0)
</style>