<template>
    <div class="tutor_rating_icon">
        <font-awesome-icon 
            :icon="['fas', 'star']" 
            :class="{ 
                filled: (appAvgRating >= 1) ?true :false,
                half_filled: (avgRating > 0 && avgRating < 1) ?true :false 
            }"
        />
        <font-awesome-icon 
            :icon="['fas', 'star']" 
            :class="{ 
                filled: (appAvgRating >= 2) ?true :false,
                half_filled: (avgRating > 1 && avgRating < 2) ?true :false 
            }"
        />
        <font-awesome-icon 
            :icon="['fas', 'star']" 
            :class="{ 
                filled: (appAvgRating >= 3) ?true :false,
                half_filled: (avgRating > 2 && avgRating < 3) ?true :false 
            }"
        />
        <font-awesome-icon 
            :icon="['fas', 'star']" 
            :class="{ 
                filled: (appAvgRating >= 4) ?true :false,
                half_filled: (avgRating > 3 && avgRating < 4) ?true :false 
            }"
        />
        <font-awesome-icon 
            :icon="['fas', 'star']" 
            :class="{ 
                filled: (appAvgRating >= 5) ?true :false,
                half_filled: (avgRating > 4 && avgRating < 5) ?true :false 
            }"
        />

        <div class="number" v-if="showDigit">{{ avgRating }}</div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: "tutor-ratings-icon",
    props: ['avgRating', 'showDigit'],
    data() {
        const appAvgRating = Math.floor(this.avgRating);
        return { appAvgRating }
    },
    methods: {

    }
});
</script>

<style scoped>
    .tutor_rating_icon {
        color: var(--paper-grey-400);
    }
    .tutor_rating_icon .filled {
        color: var(--rating-icons);
    }
    .tutor_rating_icon .half_filled {
        
    }
</style>