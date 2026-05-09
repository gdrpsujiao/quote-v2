import axios from 'axios'
// import Vue from 'vue'

const instance = process.env.NODE_ENV !== 'production'? 
    axios.create({
        timeout: 10000
    }) :
    axios.create({
        timeout: 10000,
        baseURL: 'https://lty-s3.s3.ap-east-1.amazonaws.com'
    }) 

instance.interceptors.request.use(function(config) {
    return config
}, function(error) {
    return Promise.reject(error)
})

instance.interceptors.response.use(function(res) {
    return res
}, function(error) {
    return Promise.reject(error)
})


const Axios = (options = {}) => {
    // const { method } = options
    // const optionsParams = method == 'get'? options.params: options.data

    return new Promise((resolve, reject) => {
        instance({
            ...options
        })
            .then(res => {
                // console.log(res)
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export default Axios