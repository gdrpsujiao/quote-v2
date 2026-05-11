<template>
    <section class="page-container">
        <template v-if="confirmView">
            <h3>新</h3>
            <div class="code-container">
                <div v-for="item in newData.list" :key="item.number" class="code-item">
                    <div class="code" :class="[ item.style == 'red'? 'red': item.style == 'blue'? 'blue': 'green' ]">
                        {{  item.number  }}
                    </div>
                    <span class="name">{{ item.sx }}</span>
                </div>
            </div>
            <p>下期开奖时间：{{ newNext }}</p>

            <h3>老</h3>
            <div class="code-container">
                <div v-for="item in oldData.list" :key="item.number" class="code-item">
                    <div class="code" :class="[ item.style == 'red'? 'red': item.style == 'blue'? 'blue': 'green' ]">
                        {{  item.number  }}
                    </div>
                    <span class="name">{{ item.sx }}</span>
                </div>
            </div>
            <p>下期开奖时间：{{ oldNext }}</p>
            <h3>香</h3>
            <div class="code-container">
                <div v-for="item in hkData.list" :key="item.number" class="code-item">
                    <div class="code" :class="[ item.style == 'red'? 'red': item.style == 'blue'? 'blue': 'green' ]">
                        {{  item.number  }}
                    </div>
                    <span class="name">{{ item.sx }}</span>
                </div>
            </div>
            <p>下期开奖时间：{{ hkNext }}</p>
        </template>

        <van-popup 
            v-model="showConfirmPopup" 
            @close="handleClose"
            class="ap-confirm">
            <section class="confirm-container">
                <span class="title">内部功能请输入邀请码</span>
                <van-field
                    v-model="confirmCode" 
                    placeholder="输入邀请码"
                    class="v-input" />
                    <v-button 
                        text="确认"
                        type="info"
                        size="small"
                        :block="true"
                        class="btb-confirm"
                        @click="handlerConfirm" />
            </section>
        </van-popup>

    </section>
</template>

<script>
    import { getNewKj, getOldKj, getHKKj } from '@/api'
    import { mapState, mapActions } from 'vuex'
    export default {
        name: 'Play',
        data() {
            return {
                newData: {
                    list: []
                },
                oldData: {
                    list: []
                },
                hkData: {
                    list: []
                },
                showConfirmPopup: false,
                confirmCode: '',
            }
        },
        computed: {
            ...mapState('view', ['confirmView']),
            newNext() {
                let { Year, Moon, Day, Time, Week } = this.newData
                return `${Year}年${Moon}月${Day}日 ${Time} ${Week}`
            },
            oldNext() {
                let { Year, Moon, Day, Time, Week } = this.oldData
                return `${Year}年${Moon}月${Day}日 ${Time} ${Week}`
            },
            hkNext() {
                let { Year, Moon, Day, Time, Week } = this.hkData
                return `${Year}年${Moon}月${Day}日 ${Time} ${Week}`
            },
        },
        mounted() {
            // console.log(this.confirmView, '== confirm')
            if(!this.confirmView) {
                // this.$toast.fail('填个邀请码再来')
                // this.$notify({
                //     type: 'danger',
                //     message: '填个邀请码再来'
                // })
                // this.$router.replace('/')
                this.showConfirmPopup = true
            }
            else {
                // this.network().getNewKj()
                // this.network().getOldKj()
                // this.network().getHKKj()
                this.getAllData()
            }
        },  
        methods: {
            ...mapActions('view', ['setConfirmView']),
            handleClose() {

            }, 
            handlerConfirm() {
                // 娱乐限制
                // 单机没服务器写着玩
                let code = this.confirmCode.toLowerCase().trim()
                if(code== 'apeng') {
                    this.getAllData()
                    // 保存到本地 Store
                    this.setConfirmView(true)
                    // 跳转页面
                    // this.$router.push('/play')
                    this.showConfirmPopup = false
                    
                }
                else {
                    this.$toast.fail('邀请码有误')
                }
            },
            getAllData() {
                this.network().getNewKj()
                this.network().getOldKj()
                this.network().getHKKj()
            },
            handler() {
                return {

                }
            },
            network() {
                return {
                    getNewKj: async () => {
                        const { data } = await getNewKj()
                        // 处理 list 数据
                        const result = data.data.Data
                        let list = []
                        Object.keys(result).some(key => {
                            // console.log(key, result[key])
                            list.push(result[key])
                        })
                        this.newData = {
                            ...data.data,
                            list
                        }
                    },
                    getOldKj: async () => {
                        const { data } = await getOldKj()
                        // 处理 list 数据
                        const result = data.data.Data
                        let list = []
                        Object.keys(result).some(key => {
                            // console.log(key, result[key])
                            list.push(result[key])
                        })
                        this.oldData = {
                            ...data.data,
                            list
                        }
                    },
                    getHKKj: async () => {
                        const { data } = await getHKKj()
                        // 处理 list 数据
                        const result = data.data.Data
                        let list = []
                        Object.keys(result).some(key => {
                            // console.log(key, result[key])
                            list.push(result[key])
                        })
                        this.hkData = {
                            ...data.data,
                            list
                        }
                    },
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-container {
        padding-left: 20px;
        padding-right: 20px;
        // color: $primary;
        h3 {
            margin: 20px 0;
        }
        p {
            margin-top: 10px;
            font-size: 14px;
            color: gray;
        }
        .code-container {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            // padding: 20px;
            width: 100%;
            .code-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                position: relative;
                width: 12.5%;
                &:last-child {
                    width: 25%;
                    align-items: flex-end;
                    &::before {
                        content: "+";
                        position: absolute;
                        top: 50%;
                        left: 20%;
                        transform: translateY(-50%);
                        color: $primary;
                        font-size: 1.2rem;
                    }
                }
                .code {
                    margin-bottom: 3px;
                    // padding: 5px;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    // background: red;
                    font-size: 16px;
                    border-radius: 100%;
                    text-align: center;
                    color: white;
                    &.red {
                        background-color: red;
                    }
                    &.blue {
                        background-color: blue;
                    }
                    &.green {
                        background-color: green;
                    }
                }
                .name {
                    width: 30px;
                    font-size: 14px;
                    text-align: center;
                    color: $primary;
                }
            }
        }
        .ap-confirm {
            padding: 20px;  
            width: 300px;
            max-width: 300px;
            .confirm-container {
                // border-radius: 30px;
                .title {
                    color: $primary;
                }
                p {
                    padding: 10px 0;
                    font-size: 12px;
                }
                .v-input {
                    &::after {
                    border-bottom: 0px;
                    }
                }
                .btn-confirm {

                }
            }
        } 
    }
</style>