import axios from '@/jslib/axios'

export const getNewKj = params => {
    return axios({
        method: 'get',
        url: '/test',
        params
    })
}
