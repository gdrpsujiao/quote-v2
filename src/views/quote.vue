<template>
    <section class="quote-page">
        <h1>重量计算器</h1>
        <div class="form-box">
            <div class="form-label">
                类型
            </div>
            <div class="form-content">
                <van-radio-group v-model="formData.shape" direction="horizontal">
                    <van-radio name="板">板</van-radio>
                    <van-radio name="棒">棒</van-radio>
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

        <div class="form-info">
            <span>总金额</span>
            <span class="money">{{ money }}</span>
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

    </section>
</template>

<script>
export default {
    name: 'Quote',
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
                price: "",
                cost: '',
                number: 1
            },
        }
    },
    computed: {
        isBan() {
            return this.formData.shape == '板'
        },
        money() {
            const { shape, long, width, height, density, number, price, diameter, circleLong, } = this.formData;
            let V 
            if(shape === '板') {
                V = long * width * height
            } else {
                V = (diameter/2.0)*(diameter/2.0)*3.14*circleLong
            }
            const weight = ((V * density) / 1000000.0).toFixed(5);
            const unitPrice = weight * price;
            const money = unitPrice * number;
            // return money.toFixed(5);
            return this.toRound(money)
        },
        weight() {
            const { shape, long, width, height, density, diameter, circleLong, } = this.formData;
            let V 
            if(shape === '板') {
                V = long * width * height
            } else {
                const radios = diameter/2.0
                V = radios*radios*3.14*circleLong
            }
            const weight = ((V * density) / 1000000.0).toFixed(5);
            return weight
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
        }
    },
    methods: {
        toRound(num, decimal = 5) {
            if(isNaN(num)) {
                return 0
            }
            const p1 = Math.pow(10, decimal+1)
            const p2 = Math.pow(10, decimal)
            return Math.round(num*p1/10)/p2
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
        padding: 20px 0;
        text-align: center;
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