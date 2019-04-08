
// 创建歌曲的类
export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url, rank, rankType, rankValue, albumMid, singerMid}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
        this.rank = rank
        this.rankType = rankType
        this.rankValue = rankValue
        this.albumMid = albumMid
        this.singerMid = singerMid
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSingerName(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${musicData.albumname}.jpg?max_age=2592000`,
        url: `http://183.192.163.150/amobile.music.tc.qq.com/C400000QwTVo0YHdcP.m4a?guid=2631962421&vkey=07F87A931D1ADEC75340FE8E2F31178F3288DEE342C997DB8826656EC969A0B7FACE396446377DC95406294089D8BBCFCC3BF4D901EA34E3&uin=0&fromtag=66`
    })
}

//  rank歌单传入数据的歌的类
export function createToplistSong(musicData) {
    return new Song({
        albumMid: musicData.albumMid,
        rank: musicData.rank,
        rankType: musicData.rankType,
        rankValue: musicData.rankValue,
        singerMid: musicData.singerMid,
        singer: musicData.singerName,
        id: musicData.songId,
        name: musicData.title,
    })
}
//  过滤singer属性的名字
function filterSingerName(singer) {
    let ret = []
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}