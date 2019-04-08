import {commonParams, options} from "./config";
import axios from 'axios'

// 排行界面数据获取
export function getTopList() {
    const url = '/api/getTopList'

    const data = Object.assign({},commonParams, {
        '-': Math.random(),
        format: 'json',
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
// 排行界面跳转排行歌单数据获取
export function getMusicList(topid) {
    const url = '/api/getMusicList'

    const data = Object.assign({},commonParams, {
        '-': 'getUCGI' + Math.random(),
        format: 'json',
        platform: 'yqq.json',
        needNewCode: 0,
        data: `{"detail":{"module":"musicToplist.ToplistInfoServer","method":"GetDetail","param":{"topId":${topid},"offset":0,"num":20,"period":"${getNowDate()}"}},"comm":{"ct":24,"cv":0}}`
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}

//  xxxx-xx-xx日期获取
export function getNowDate() {
    const separator = '-'

    let myDate = new Date()
    let year = myDate.getFullYear()
    let month = myDate.getMonth() + 1
    let strDate = myDate.getDate()

    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentDate = year + separator + month + separator + strDate

    return currentDate
}