Vue.component('CoinDetail',{
  props: ['coin'],
  data (){
    return {
      value: 0,
      showPrices: false
    }
  },

  template: `
  <div>
    <img 
      v-on:mouseover="toggleShowPrices" 
      v-on:mouseout="toggleShowPrices" 
      v-bind:src="coin.img" v-bind:alt="coin.name">

    <h1 
      v-bind:class="coin.changePercent ? 'green': 'red' ">
      {{ title }}
      <span v-if="coin.changePercent > 0">&#x1F919;</span>
      <span v-else-if="coin.changePercent < 0"> &#x1F91E;</span>
      <span v-else> &#x270B;</span>

      <span v-on:click="toggleShowPrices">
        {{ !showPrices? 'Mostrar Precios': 'Ocultar Precios'  }}
      </span>
    </h1>

    <input type="number" v-model="value">
    <span>{{ convertedValue }}</span>

    <ul v-show="showPrices">
      <li v-bind:class="{ orange: p.value === coin.price, red: p.value < coin.price, green: p.value >= coin.price}"
        v-for="(p, k) in coin.pricesWithDays " v-bind:coin.price="p"> {{ k+1 }}: {{ p.day }} {{ p.value }}</li>
    </ul>
  </div>`,

  methods: {
    
    toggleShowPrices() {
      this.showPrices = !this.showPrices;
      this.coin.color = this.coin.color.split('').reverse().join('');
    }
  },

  computed: {
    title(){
      return `${this.coin.name} - ${this.coin.symbol}`
    },
    convertedValue(){
      if(!this.value){
        return 0
      }
      return this.value / this.coin.price
    }
  }

})

new Vue({
  el: '#app',
  data() {
    return {
      btc: {
        name: 'Bitcoin',
        img: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
        changePercent: 10,
        symbol: 'BTC',
        price: 8550,
        prices: [933, 3123, 222, 3412, 5882, 8512],
        pricesWithDays: [{
          day: 'Lunes',
          value: '3912'
        },
        {
          day: 'Martes',
          value: '5122'
        },
        {
          day: 'Miercoles',
          value: '51256'
        },
        {
          day: 'Jueves',
          value: '6543'
        },
        {
          day: 'Viernes',
          value: '8864'
        },
        {
          day: 'Sabado',
          value: '723'
        },
        {
          day: 'Domingo',
          value: '7423'
        }
        ],
        color: 'f4f4f4'
      }
    }
  },

  // methods: {
  //   toggleShowPrices() {
  //     this.showPrices = !this.showPrices;
  //     this.color = this.color.split('').reverse().join('');
  //   }
  // }
})