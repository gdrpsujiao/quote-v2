<template>
    <section class="quote-page">
        <h1>
            重量计算器
            <van-icon name="setting" @click="onSetting" />
        </h1>
        <div class="form-box">
            <div class="form-label">
                类型
            </div>
            <div class="form-content">
                <van-radio-group v-model="formData.shape" direction="horizontal">
                    <van-radio name="板">板</van-radio>
                    <van-radio name="棒">棒</van-radio>
                    <van-radio name="管">管</van-radio>
                </van-radio-group>
            </div>
        </div>
        
        <section v-show="isBan">
            
            <div class="flex-sb">
                <div class="form-item">
                    <van-field 
                    v-model="formData.long" 
                    label="长"
                    placeholder="长 mm"
                    type="number"
                    class="v-input" />
                </div>
                <div class="form-item">
                    <van-field 
                        v-model="formData.width" 
                        label="宽"
                        placeholder="宽 mm"
                        type="number"
                        class="v-input" />
                </div>
            </div>
            <van-field 
                v-model="formData.height" 
                label="高"
                placeholder="高 mm"
                type="number"
                class="v-input" />
        </section>

        <section v-show="!isBan">
            <div class="flex-sb">
                <div class="form-item">
                    <van-field 
                        v-model="formData.diameter" 
                        label="直径"
                        placeholder="直径 mm"
                        type="number"
                        class="v-input" />
                </div>
                <div class="form-item">
                    <van-field 
                        v-model="formData.circleLong" 
                        label="长"
                        placeholder="长 mm"
                        type="number"
                        class="v-input" />
                </div>
            </div>
            <van-field 
                v-show="isGuan"
                v-model="formData.thickness" 
                label="壁厚"
                placeholder="壁厚 mm"
                type="number"
                class="v-input" />
        </section>
        
        <van-field 
            v-model="formData.density" 
            label="密度"
            placeholder="密度"
            type="number"
            class="v-input" />
        <van-field 
            v-model="formData.number" 
            label="数量"
            placeholder="数量"
            type="number"
            class="v-input" />

        <div class="flex-sb">
            <div class="form-item">
                <van-field 
                    v-model="formData.price" 
                    label="单价"
                    placeholder="单价"
                    type="number"
                    class="v-input" />
            </div>
            <div class="form-item">
                <van-field 
                    v-model="formData.cost" 
                    label="成本"
                    placeholder=""
                    type="number"
                    class="v-input" />
            </div>
        </div>

        <div class="flex-sb form-info">
            <div class="form-item">
                <span>总金额</span>
                <span class="money">{{ money }}</span>
            </div>
            <div class="btn-expand">
                <v-button 
                    text="重置" 
                    type="warning"
                    @click="handlerReset"
                     />
                <v-button 
                    text="暂存"
                    @click="handlerSave" />
            </div>
        </div>
       

        <div class="form-info">
             <div class="tr">
                <span>单重量</span>
                <span>{{ result.weight }}</span>
            </div>
            <div class="tr">
                <span>总重量</span>
                <span>{{ result.allWeight }}</span>
            </div>
            <div class="tr">
                <span>单件成本</span>
                <span>{{ result.cost }}</span>
            </div>
            <div class="tr">
                <span>单件利润</span>
                <span>{{ result.profit }}</span>
            </div>
            <div class="tr">
                <span>总成本</span>
                <span>{{ result.allCost }}</span>
            </div>
            <div class="tr">
                <span>总利润</span>
                <span>{{ result.allProfit }}</span>
            </div>
        </div>

        <section v-if="hasLocalData" class="data-list-container">
            <!-- <div 
                class="data-list" 
                v-for="(item, index) in list"
                :key="index">
                    {{ item.data }}
            </div> -->
            <van-tabs>
                <van-tab 
                v-for="(item, index) in this.localQuote" 
                :key="index"
                :title="item.shape">
                    <div class="data-content">
                        <!-- <div class="tr">
                            {{ item.shape }}
                        </div> -->
                        <van-icon 
                            class="icon-clear" 
                            name="clear" 
                            @click="handlerDelete(index)" />
                        <div class="tr" v-if="item.isBan">
                            <span>长：{{ item.long }}</span>
                            <span>宽：{{ item.width }}</span>
                            <span>厚度：{{ item.height }}</span>
                        </div>
                        <div class="tr" v-else>
                            <span>直径：{{ item.diameter }}</span>
                            <span v-if="item.isGuan">壁厚：{{ item.thickness }}</span>
                            <span>长：{{ item.circleLong }}</span>
                        </div>
                        <div class="tr">
                            <span>数量：{{ item.number }}</span>
                            <span>单价: {{ item.price }}</span>
                        </div>
                        
                        <div class="tr">
                            <span>重量：</span>
                            <span>{{ item.result.allWeight }}</span>
                        </div>
                        <div class="tr">
                            <span>金额：</span>
                            <span>{{ item.money }}</span>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>

            <div class="data-view">
                总重量：<span>{{ localQuoteView.allWeight }}</span>
                总金额：<span>{{ localQuoteView.allMoney }}</span>
            </div>

            <div class="btn-container">
                <span class="btn-clean" @click="handlerClean">清空</span>
            </div>
            <!-- <v-button text="清空" size="large " type="default" /> -->
        </section>

        <ap-setting-value 
            v-model="showSettingPopup"
            @save="handlerSaveSetting" />
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ApSettingValue from '@/components/ap-setting-value'

export default {
    name: 'Quote',
    components: {
        ApSettingValue
    },
    data() {
        return {
            formData: {
                shape: "板",
                long: "",
                width: "",
                height: "",
                diameter: "", // 直径
                circleLong: "",
                density: 1.2, // 密度
                price: 26,
                cost: '',
                number: 1,
                // insideDiameter: '', // 内径
                thickness: '', // 壁厚
            },
            showSettingPopup: false,
        }
    },
    computed: {
        ...mapState('quote', ['localQuote', 'initQuoteForm']),
        isBan() {
            return this.formData.shape == '板'
        },
        isBang() {
            return this.formData.shape == '棒'
        },
        isGuan() {
            return this.formData.shape == '管'
        },
        money() {
            // const { long, width, height, density, number, price, diameter, circleLong, } = this.formData;
            // let V 
            // if(this.isBan) {
            //     V = long * width * height
            // } else {
            //     V = (diameter/2.0)*(diameter/2.0)*3.14*circleLong
            // }
            // const weight = ((V * density) / 1000000.0).toFixed(5);
            const { price, number } = this.formData
            const unitPrice = this.weight * price;
            const money = unitPrice * number;
            // return money.toFixed(5);
            return this.toRound(money)
        },
        weight() {
            // const { shape, long, width, height, density, diameter, circleLong, } = this.formData;
            // let V 
            // if(shape === '板') {
            //     V = long * width * height
            // } else {
            //     const radios = diameter/2.0
            //     V = radios*radios*3.14*circleLong
            // }
            // const weight = ((V * density) / 1000000.0).toFixed(5);
            // return weight
            return this.getWeight()
        },
        result() {
            const { number, cost, price } = this.formData
            const allWeight = number*this.weight
            const resultCost = cost*this.weight
            const profit = (price-cost)*this.weight
            const allCost = number*resultCost
            const allProfit = number*profit
            // return {
            //     weight: Number(this.weight).toFixed(3),
            //     allWeight: allWeight.toFixed(3),
            //     cost: resultCost.toFixed(3),
            //     profit: profit.toFixed(3),
            //     allCost: allCost.toFixed(3),
            //     allProfit: allProfit.toFixed(3)
            // }
            return {
                weight: this.toRound(this.weight),
                allWeight: this.toRound(allWeight),
                cost: this.toRound(resultCost),
                profit: this.toRound(profit),
                allCost: this.toRound(allCost),
                allProfit: this.toRound(allProfit)
            }
        },
        hasLocalData() {
            return this.localQuote.length > 0? true: false
        },
        localQuoteView() {
            // 用于展示当前存储的数据
            if(!this.hasLocalData) return false
            
            let result = this.localQuote.reduce((result, item) => {
                let weight = item.result.allWeight
                result.allWeight = this.toRound(result.allWeight + weight)

                result.allMoney = this.toRound(result.allMoney + item.money)

                return result
            }, {
                allWeight: 0,
                allMoney: 0
            })
            // 处理数据
            return result
        }
    },
    mounted() {
        // console.log(this.localQuoteView, '==')
        // 初始化 默认值
        Object.keys(this.initQuoteForm).some(key => {
            this.formData[key] = this.initQuoteForm[key]
        })
    },
    methods: {
        ...mapActions('quote', ['updateLocalQuote']),
        toRound(num, decimal = 2) {
            if(isNaN(num)) {
                return 0
            }
            const p1 = Math.pow(10, decimal+1)
            const p2 = Math.pow(10, decimal)
            // return Math.round(num*p1/10)/p2
            // 向上取整
            return Math.ceil(num*p1/10)/p2
        },
        getVolume(diameter) {
            // 直径从外面传进来
            // 区分外径、内径
            const { long, width, height, circleLong } = this.formData
            let v
            if(this.isBan) {
                v = long * width * height
            } else {
                v = (diameter/2.0)*(diameter/2.0)*3.14*circleLong
            }
            return v
        },
        getInsideDiameter() {
            // 内径 = 外径 - 壁厚*2
            const { thickness, diameter } = this.formData
            return diameter - (thickness*2)
        },
        getWeight() {
            const { density, diameter } = this.formData
            let v
            if(this.isBan) {
                v = this.getVolume()
                return ((v * density) / 1000000.0).toFixed(5)
            }
            else {
                v = this.getVolume(diameter)
                let weight = ((v * density) / 1000000.0).toFixed(5)
                if(this.isBang) {
                    return weight
                }
                else {
                    // 内径
                    const insideDiameter = this.getInsideDiameter()

                    let insideV = this.getVolume(insideDiameter)
                    let insideWeight = ((insideV * density) / 1000000.0).toFixed(5)
                    // 外径 - 内径
                    return weight - insideWeight
                }
            }
        },
        onSetting() {
            this.showSettingPopup = true
        },
        handlerReset() {
            // console.log(1111)
            this.formData = {
                // shape: "板",
                ...this.formData,
                long: "",
                width: "",
                height: "",
                diameter: "", // 直径
                circleLong: "",
                density: 1.2, // 密度
                price: "",
                cost: '',
                number: 1,
                // insideDiameter: ''
                thickness: '', // 壁厚
                ...this.initQuoteForm, // 初始化默认值
            }
        },
        handlerSave() {
            // 存储本地列表
            // 获取当前
            const localData = [...this.localQuote]
            // console.log(localData)
            const newData = [
                {
                    ...this.formData,
                    isBan: this.isBan,
                    isBang: this.isBang,
                    isGuan: this.isGuan,
                    money: this.money,
                    weight: this.weight,
                    result: {...this.result}
                },
                ...localData
            ]
            // console.log(newData)
            this.updateLocalQuote(newData)
        },
        handlerClean() {
            this.updateLocalQuote([])
        },
        handlerDelete(index) {
            let list = [...this.localQuote]
            list.splice(index, 1)
            this.updateLocalQuote(list)
        },
        handlerSaveSetting() {
            // 保存默认值成功
            console.log('save success')
            Object.keys(this.initQuoteForm).some(key => {
                this.formData[key] = this.initQuoteForm[key]
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.quote-page {
    padding-top: 65px;
    padding-bottom: 100px;
    // padding: 20px;
    min-height: 100vh;
    background: #fafafa;
    h1 {
        position: relative;
        padding: 20px 0;
        text-align: center;
        .van-icon {
            position: absolute;
            top: 50%;
            right: 30px;
            transform: translateY(-50%);
        }
    }
    .form-box {
        display: flex;
        padding: 10px 16px;
        background: white;
        font-size: 14px;
        color: #646566;
        .form-label {
            width: 50px;
        }
        .form-content {
            flex: 1;
            padding: 0 10px;
        }
    }
    .flex-sb {
        display: flex;
        justify-content: space-between;
        .form-item {
            flex: 1;
        }
    }
    .form-info {
        padding: 20px 20px 0;
        font-size: 14px;
        .money {
            display: block;
            font-size: 24px;
            font-weight: bold;
            color: #f56c6c;
        }
        .tr {
            display: flex;
            padding-bottom: 10px;
            span {
                flex: 1;
            }
            span:first-child {
                color: #e6a23c;
            }
            span:last-child {
                color: #f56c6c;
                font-size: 20px;
            }
        }
    }
    .btn-expand {
        display: flex;
        align-items: center;
        button {
            margin-right: 20px;
            &:last-child {
                margin-right: 0;
            }
        }
    }
    .data-list-container {
        position: relative;
        margin-top: 50px;
        .data-content {
            position: relative;
            padding: 20px;
            background: white;
            color: $primary;
            font-size: 14px;
            .tr {
                display: flex;
                justify-content: space-between;
                padding-bottom: 10px;
                &:last-child {
                    padding-bottom: 0;
                }
                span {
                    flex: 1;
                }
            }
            .icon-clear {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 20px;
                color: $warning;
            }
        }
        .data-view {
            position: absolute;
            bottom: 0;
            left: 20px;
            font-size: 12px;
            span {
                display: inline-block;
                padding-right: 10px;
                color: $success;
                font-weight: bold;
                font-size: 16px;
            }
        }
        .btn-container {
            margin-top: 20px;
            padding-right: 20px;
            text-align: right;
            .btn-clean {
                color: $danger;
                font-size: 14px;
            }
        }
    }
}
</style>

<style lang="scss">
.v-input {
    .van-field__label {
        width: 30px;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }
    .van-field__control {
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        // border-radius: 16px;
        // border: 1px solid #f0f5fc;
        // box-shadow: inset 0px 1px 4px rgba(141, 173, 255, 0.25);
    }
}
</style>