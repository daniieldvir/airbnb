 <template>
    <section class="stay-checkout flex column">
        <section class="checkout-container flex">
            <div class="checkout-form-container">
                <div class="checkout-form-header flex space-between align-center">
                    <div class="order-price-container">
                        <p class="price"><span>${{ stay.price }}</span>/night</p>
                                
                    </div>
                    <div class="check-rating-container flex align-center">
                        <font-awesome-icon icon="star"/>{{ stay.avgRate }}
                        <span> {{formattedReviews}}</span>
                    </div>
                </div>

                <div class="form-container">
                    <div class="select-form">
                        <div class="select-dates-container">
                            <el-date-picker style="width:100%;" v-model="dates" type="daterange"
                            range-separator="" start-placeholder="CHECK-IN" end-placeholder="CHECKOUT"
                            ref="myDatePicker"></el-date-picker>
                        </div>
                        <div class="select-guests-container flex space-between">
                            <!-- <guest-filter/> -->
                        </div>
                        <!-- <div class="btn-checkout-container">
                            <button class="btn-checkout">Check availability
                            </button>
                        </div> -->
                    </div>
                    <div class="btn-checkout-container">
                        <button class="btn-checkout">Check availability
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import guestFilter from './guest-filter.vue'
export default {
  props: { 
     stay: Object, 
     dates: Array,
  },

  computed:{
    formattedReviews(){
         //maybe 0 reviews
        if(!this.stay.reviews.length) return `new`;
        if(this.stay.reviews.length === 1) return `(${this.stay.reviews.length} review)`;
        else if(this.stay.reviews.length > 1) return `(${this.stay.reviews.length} reviews)` ;
    }
  },
  components: { guestFilter },

}
</script>