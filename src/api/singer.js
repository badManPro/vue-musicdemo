import {commonParams, options} from "./config";
import axios from 'axios'

export function getSingerList() {
    const url = '/api/getSingerList'
    const data = Object.assign({}, commonParams, {
        "-": 'getUCGI' + Math.random(),
        hostUin: 0,
        format: 'json',
        platform: 'yqq.json',
        needNewCode: 0,
        data: '{"comm":{"ct":24,"cv":0},"singerList":{"module":"Music.SingerListServer","method":"get_singer_list","param":{"area":-100,"sex":-100,"genre":-100,"index":-100,"sin":0,"cur_page":1}}}'
    })
    return axios.get(url, {
        params: data,
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}
export function getSingerDetail(singerId) {
    const url = '/api/getSingerDetail'
    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        format: 'json',
        platform: 'yqq',
        needNewCode: 0,
        ct: 24,
        order: 'listen',
        begin: 0,
        num: 20,
        singermid: singerId
    })
    return axios.get(url,{
        params: data,
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}