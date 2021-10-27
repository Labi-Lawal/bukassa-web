<template>
  <div>
    <Header />
    <section class="booking_payment">
      <div class="payment_methods">
        <div class="div_title">Payment Methods</div>
        <div class="all_payment_options">
          <div
            v-for="(paymentOption, index) in paymentOptions"
            :key="index"
            class="option"
            @click="selectPaymentMethod(index)"
          >
            <img :src="paymentOption.image">
            <div class="label">{{ paymentOption.name }}</div>
            <div 
              :class="{
                radio: true,
                filled: (index == selectedIndex) ? true : false
              }"
              >
              <div class="fill" v-if="index == selectedIndex"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="check_out">
        <div class="checkout_summary">
          <div class="tutor_info">
            <img src="https://res.cloudinary.com/labilawal/image/upload/v1634454383/ufsm2u8hkmrvdtabyfjj.jpg">
            <div class="tutor_name">Tutor Name</div>
          </div>
          <div class="info">
            <div class="lesson_title_middle">
              English <div class="dot"> </div> 30 mins
            </div>
            <div class="lesson_title">
              <div class="dot"></div>
              <div class="label">Having a formal conversation In English</div>
            </div>
            <div class="lesson_title">
              <div class="dot"></div>
              <div class="label">Oct 25, 2021 11:00 - 12:00</div>
            </div>
            <div class="lesson_title">
              <div class="dot"></div>
              <div class="label">Communication Tool: Zoom</div>
            </div>
          </div>
        </div>
        <div class="calc_price">
          <div class="prices">
            <div class="sub_total">
              <div class="label">Subtotal</div>
              <div class="price">$50.00</div>
            </div>
            <div class="sub_total">
              <div class="label">Processing Fee</div>
              <div class="price">$2.00</div>
            </div>
          </div>
          <div class="total_price">
            <div class="label">Subtotal</div>
            <div class="price">$52.00</div>
          </div>
          <button @click="submitEvent" >
            Pay $52.00
          </button>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

export default {
    name:"booking-payment",
    components: { Header, Footer },
    data() {
      var bookingInfo = '';
      var paymentOptions = [
        {
          image: "https://res.cloudinary.com/labilawal/image/upload/v1635042139/paypal-3384015_960_720_kfqenl.png",
          name: "PayPal",
        }
      ],
      selectedPaymentMethod = null,
      selectedIndex;

      return { 
        bookingInfo,
        paymentOptions,
        selectedPaymentMethod,
        selectedIndex
      }
    },
    methods: {
      selectPaymentMethod(index) {
        this.selectedIndex = index;
        this.selectedPaymentMethod = this.paymentOptions[this.selectedIndex];
      },
      submitEvent() {
        this.$store.dispatch('submitEvent');
      }
    },
    async beforeMount() {
      this.bookingInfo = this.$store.state.bookingInfo;
    }
}
</script>

<style scoped>
  .booking_payment {
    width: 100%;
    display: flex;
    margin-top: 2%;
    position: relative;
  }
  .booking_payment > * {
    box-shadow: 0px 0px 10px 4px rgb(243, 243, 243);
    border-radius: 5px;
  }
  .payment_methods {
    width: 40%;
    margin-left: 16%;
  }
  .div_title {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 5%;
    font-size: 130%;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
  }
  .check_out {
    width: 25%;
    position: absolute;
    right: 16%;
    top: 0;
  }
  .all_payment_options{
    width: 90%;
    margin: 0 auto 2%;
  }
  .option {
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .option img {
    width: 10%;
  }
  .option .label {
    /* margin-left: 5%; */
    font-size: 120%;
    font-weight: 300;
  }
  .radio {
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 50%;
    margin-left: auto;
    padding: 2px;
  }
  .radio.filled {
    border: 2px solid rgb(124, 216, 208);
  }
  .fill {
    background: rgb(124, 216, 208);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    margin: auto;
  }
  .calc_price {
    width: 90%;
    margin: 5% auto;
  }
  .prices {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
  }
  .prices > div, .total_price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
  }
  .calc_price button {
    width: 100%;
    height: 40px;
    background: var(--burgundy-100);
    border: 1px solid var(--burgundy-100);
    color: white;
    border-radius: 5px;
    font-size: 100%;
    font-weight: 600;
  }
  .checkout_summary > * {
    width: 90%;
    margin: 0 auto;
  }
  .tutor_info {
    display: flex;
    align-items: center;
    margin-top: 2%;
  }
  .tutor_info img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    object-position: top;
  }
  .tutor_info div.tutor_name {
    margin-left: 5%;
    font-size: 110%;
    font-weight: 600;
  }
  .checkout_summary .info {
    margin-top: 2%;
    margin-left: auto;
    width: 90%;
  } 
  .lesson_title {
    display: flex;
    align-items: start;
    margin-bottom: 1%;
  }
  .lesson_title_middle {
    display: flex;
    align-items: center;
    margin-bottom: 5%;
  }
  .lesson_title_middle .dot{
    margin: 4%;
  }
  .label {
    margin-left: 5%;
  }
  .dot {
    width: 4px;
    height: 4px;
    background: black;
    border-radius: 50%;
    margin:  1%;
  }
</style>