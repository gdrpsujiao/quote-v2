import axios from '@/jslib/axios'

export const getNewKj = params => {
    return axios({
        method: 'get',
        url: '/49_tk/open_lottery/v_am_plus.json',
        params
    })
}

export const getOldKj = params => {
    return axios({
        method: 'get',
        url: '/49_tk/open_lottery/v_oldam.json',
        params
    })
}

export const getHKKj = params => {
    return axios({
        method: 'get',
        url: '/49_tk/open_lottery/v_xg.json',
        params
    })
}