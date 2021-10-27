<template>
    <div class="calendar-component">
        
        <div class="month-name">{{ monthName }}</div>
        
        <div id="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
        </div>

        <div id="calendar">
            <div 
                v-for="(box, index) in totalMonthBoxes" 
                :key="index"
                :class="{ 
                    day: true,
                    hide: ((index - paddingDays) >= 1) ? true : false
                }"
                @click="$emit('button-action', `${month + 1}/${index - paddingDays}/${year}`)"
            >
                {{ (index > paddingDays) ? index - paddingDays : '' }}
            </div>
        </div>
    
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";
import BackDrop from "@/components/BackDrop.vue";
import TutorBookingModal from "@/components/tutor/TutorBookingModal.vue";

export default defineComponent({
    name: "tutor-schedule-calendar",
    components: { BackDrop, TutorBookingModal },
    data() {
        const currentSection = 1;
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var nav = 0, clicked = null,
        events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [],
        day, month, year, monthName, paddingDays, daysInMonth, totalMonthBoxes, currentDate, i = 0;
        
        

        return { 
            weekdays, 
            nav, 
            clicked, 
            events, 
            currentSection, 
            hideNewEventModal: true,
            daysInMonth, 
            totalMonthBoxes,
            month,
            monthName,
            paddingDays,
            currentDate,
            day,
            year,
            i
        };
    },
    beforeMount(){
        this.initButtons();
        this.load();
    },
    methods : {
        load() {
            const date = new Date();

            if(this.nav != 0) date.setMonth( new Date().getMonth() + this.nav );
            
            this.day = date.getDate();
            this.month = date.getMonth();
            this.year = date.getFullYear();
            
            this.daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
            const firstDayOfMonth = new Date(this.year, this.month, 1);

            const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            this.monthName = dateString.split(', ')[1].split(' ')[0];
            this.paddingDays = this.weekdays.indexOf(dateString.split(', ')[0]);

            this.totalMonthBoxes = this.paddingDays + this.daysInMonth;

        },
        initButtons() { },
        detBorderStyle (x) {
            // if(i == 1 || i == 8 || i == 15 || i == 22 || i == 29) { return true; }
            // if(this.totalMonthBoxes)

            for(this.i; this.i < this.totalMonthBoxes; this.i+=5) {
                if(this.i == 0) return true;
            }

            if(x > this.paddingDays) return false;

            return false;
        },
        openModal(date) {
            this.clicked = date;
            const eventForDay = this.events.find(e => e.date === this.clicked);
            
            if (eventForDay) {
                console.log('Event already exists');
            } else {
                this.hideNewEventModal = false;
            }
        },
        closeModal() {
            this.hideNewEventModal = true;
        },
        showNextModal() {
            this.currentSection++;

            const sectionOne = document.getElementById("sectionone");
            const sectionTwo = document.getElementById("sectiontwo");

            if(this.currentSection == 1) {
                sectionOne.style.display = "block";
                sectionTwo.style.display = "none";
            }
            if(this.currentSection == 2) {
                sectionOne.style.display = "none";
                sectionTwo.style.display = "block";
                this.loadCalendarDetails()
            }
        },
        loadCalendarDetails() {
            const date = new Date();

            if(this.nav != 0) {
                date.setMonth( new Date().getMonth() + this.nav );
            }

            const hours = 24;
            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const firstDayOfMonth = new Date(year, month, 1);

            const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const monthName = dateString.split(', ')[1].split(' ')[0];
            const paddingDays = this.weekdays.indexOf(dateString.split(', ')[0]);
            const daysOfTheMonth = document.getElementById("daysofthemonth");
            const hoursOfTheDay = document.getElementById("all-hours");

            for(var i = 1; i <= paddingDays + daysInMonth; i++) {
                const dayContainer = document.createElement('div');
                dayContainer.classList.add('day');

                if(i > paddingDays) {
                    dayContainer.innerText = `${monthName} ${i - paddingDays}`;
                    dayContainer.addEventListener('click', ()=> this.openModal(`${month + 1}/${i - paddingDays}/${year}`));
                } else {
                    dayContainer.classList.add('padding');
                }

                daysOfTheMonth.appendChild(dayContainer);
            };
        }
    }
});
</script>

<style scoped>
    div.month-name {
        text-align: end;
        padding: 2% 5%;
        font-weight: 600;
        color: grey;
    }
    div#weekdays {
        display: flex;
    }
    div#weekdays > div {
        color: grey;
        border-left: none;
        width: calc(100% / 7);
        height: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div#calendar {
        width: 100%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
    }
    div#calendar div.day {
        width: calc(calc(100% - 7px)  / 7);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        font-size: 80%;
        color: grey;
        cursor: pointer;
    } 
    div#calendar div.day:last-child {
        border-bottom: none;
    }
    div#calendar .day:hover {
        background-color: #c0eecd;
    }
    .hide {
        display: none;
    }
</style>