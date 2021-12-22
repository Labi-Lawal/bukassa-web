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
            <img :src="tutor.profilePicture">
            <div class="user_info">
              <div class="tutor_name">{{ tutor.tutorName }}</div>
              <div class="lesson_title_middle">
                {{ bookingInfo.lesson.language }} 
                <div class="dot"> </div> 
                {{ convertMilliSecsToMins(bookingInfo.lesson.durationInMilliSecs) }} mins
            </div>
            </div>
          </div>
          <div class="info">
            <div class="lesson_item lesson_title">
              <font-awesome-icon :icon="['fas', 'circle']" class="icon" />
              <div class="label">{{ bookingInfo.lesson.title }}</div>
            </div>
            <div class="lesson_item lesson_date">
              <font-awesome-icon :icon="['fas', 'clock']" class="icon" />
              <div class="label">{{ bookingInfo.datetime }}</div>
            </div>
          </div>
        </div>
        <div class="calc_price">
          <div class="prices">
            <div class="sub_total">
              <div class="label">Subtotal</div>
              <div class="price">{{ appendCurreny(bookingInfo.lesson.price) }}</div>
            </div>
            <div class="sub_total">
              <div class="label">Processing Fee</div>
              <div class="price">{{ appendCurreny(processingFee) }}</div>
            </div>
          </div>
          <div class="total_price">
            <div class="label">Total</div>
            <div class="price">{{ totalPrice }}</div>
          </div>
          <button @click="submitEvent" >
            Pay {{ totalPrice }}
          </button>
        </div>
      </div>
    </section>
    <SiteFooter />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import convertMilliSecsToMins  from "@/helper/duration.js";
import appendCurreny  from "@/helper/currency.js";

export default {
    name:"booking-payment",
    components: { Header, SiteFooter },
    data() {
      var paymentOptions = [
        {
          image: "https://res.cloudinary.com/labilawal/image/upload/v1635042139/paypal-3384015_960_720_kfqenl.png",
          name: "PayPal",
        }
      ],
      selectedPaymentMethod = null,
      selectedIndex,
      tutor;

      return { 
        bookingInfo: this.$store.getters.bookingData,
        tutor,
        paymentOptions,
        selectedPaymentMethod,
        selectedIndex,
        convertMilliSecsToMins,
        appendCurreny,
        processingFee: 2.00,
        totalPrice: 0
      }
    },
    methods: {
      selectPaymentMethod(index) {
        this.selectedIndex = index;
        this.selectedPaymentMethod = this.paymentOptions[this.selectedIndex];
      },
      submitEvent() {
        this.$store.dispatch('createevent', this.bookingInfo)
        .then(()=> {
          this.$router.push('/booking-payment/success');
        })
        .catch((error)=> {
          console.log(error.response);
        });
      },
      fetchTutor() {
        this.$store.dispatch('fetchtutor', this.bookingInfo.tutorname)
        .then((tutor)=> {
          this.tutor = tutor;
        })
        .catch(()=> {
          console.log('There was an error fetching tutor');
        });
      },
      calcTotal() {
        this.totalPrice = appendCurreny(this.bookingInfo.lesson.price + this.processingFee);
      }
    },
    async beforeMount() {
      this.bookingInfo = this.$store.state.bookingInfo || JSON.parse(localStorage.getItem('bookinginfo'));
      
      this.fetchTutor();
      this.calcTotal();
    }
}
</script>

<style scoped>
  .booking_payment {
    width: 90%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin: 2% auto;
    position: relative;
  }
  .booking_payment > * {
    box-shadow: 0px 0px 10px 4px rgb(243, 243, 243);
    border-radius: 5px;
  }
  .payment_methods {
    width: 40%;
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
    /* position: absolute; */
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
    height: 100px;
  }
  .tutor_info img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    object-position: top;
  }
  .user_info {
    width: calc(calc(100% - 60px) - 5%);
    margin-left: 5%;
  }
  .tutor_info div.tutor_name {
    font-size: 110%;
    font-weight: 600;
    text-transform: capitalize;
  }
  .checkout_summary .info {
    margin-top: 2%;
    margin-left: auto;
    width: 90%;
  } 
  .info > div {
    margin-bottom: 5%;
  }
  .info .icon {
    color: grey;
  } 
  .lesson_item {
    display: flex;
    align-items: center;
    margin-bottom: 1%;
  }
  .lesson_title {
    text-transform: capitalize;
    font-weight: 600;
  }

  .lesson_date {
    
  }

  .lesson_title_middle {
    text-transform: capitalize;
    display: flex;
    align-items: center;
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

  .total_price {
    font-weight: 600;
  }
</style>

