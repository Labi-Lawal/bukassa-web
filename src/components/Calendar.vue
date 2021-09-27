<template>
    <div class="calendar-component">
        <div class="month-name"></div>
        <div id="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
        </div>
        <div id="calendar"></div>
        <div id="modalBackDrop"></div>
        <div id="newEventsModal">
            <div class="all-lessons" id="sectionone">
                <div class="title">Select Lesson</div>
                <div class="package" @click="showNextModal">
                    <div class="package-details">
                        <div class="lessontitle">Formal Conversations</div>
                        <div class="lang">English</div>
                        <div class="duration">50 mins</div>
                    </div>
                    <div class="price">$ 150</div>
                </div>
                <div class="package" @click="showNextModal">
                    <div class="package-details">
                        <div class="lessontitle">Formal Conversations</div>
                        <div class="lang">Spanish</div>
                        <div class="duration">45 mins</div>
                    </div>
                    <div class="price">$ 250</div>
                </div>
            </div>

            <div class="schedule" id="sectiontwo">
                <div class="title">Schedule Your Lesson</div>
                <div class="calendar-details">
                    <div class="time">
                        <div>00:00</div>
                        <div>01:00</div>
                        <div>02:00</div>
                        <div>03:00</div>
                        <div>04:00</div>
                        <div>05:00</div>
                        <div>06:00</div>
                        <div>07:00</div>
                        <div>08:00</div>
                        <div>09:00</div>
                        <div>10:00</div>
                        <div>11:00</div>
                        <div>12:00</div>
                        <div>13:00</div>
                        <div>14:00</div>
                        <div>15:00</div>
                        <div>16:00</div>
                        <div>17:00</div>
                        <div>18:00</div>
                        <div>19:00</div>
                        <div>20:00</div>
                        <div>21:00</div>
                        <div>22:00</div>
                        <div>23:00</div>
                        <div>24:00</div>
                    </div>
                    <div class="right">
                        <div id="daysofthemonth"></div>
                        <div id="all-hours">
                            <div class="hourrow 1"></div>
                            <div class="hourrow 2"></div>
                            <div class="hourrow 3"></div>
                            <div class="hourrow 4"></div>
                            <div class="hourrow 5"></div>
                            <div class="hourrow 6"></div>
                            <div class="hourrow 7"></div>
                            <div class="hourrow 8"></div>
                            <div class="hourrow 9"></div>
                            <div class="hourrow 10"></div>
                            <div class="hourrow 11"></div>
                            <div class="hourrow 12"></div>
                            <div class="hourrow 13"></div>
                            <div class="hourrow 14"></div>
                            <div class="hourrow 15"></div>
                            <div class="hourrow 16"></div>
                            <div class="hourrow 17"></div>
                            <div class="hourrow 18"></div>
                            <div class="hourrow 19"></div>
                            <div class="hourrow 20"></div>
                            <div class="hourrow 21"></div>
                            <div class="hourrow 22"></div>
                            <div class="hourrow 23"></div>
                            <div class="hourrow 24"></div>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <div class=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CalendarDetails from '../components/CalendarDetails.vue';

    export default {
        components: {
            CalendarDetails
        },
        data() {
            const currentSection = 1;
            const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

            var nav = 0, clicked = null,
            events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
            
            return { weekdays, nav, clicked, events, currentSection };
        },
        mounted(){
            this.initButtons();
            this.load();
        },
        methods : {
            load() {
                const date = new Date();

                if(this.nav != 0) {
                    date.setMonth( new Date().getMonth() + this.nav );
                }
               
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

                const paddingDays = this.weekdays.indexOf(dateString.split(', ')[0]);
                const monthName = dateString.split(', ')[1].split(' ')[0];
                document.querySelector('div.month-name').innerText = monthName;
                const calendar = document.getElementById('calendar');

                for(var i = 1; i <= paddingDays + daysInMonth; i++) {
                    const dayContainer = document.createElement('div');
                    dayContainer.classList.add('day');

                    if(i == 1 || i == 8 || i == 15 || i == 22 || i == 29){
                        dayContainer.classList.add('no-left-border');
                    }
                    if(i >= 29){
                        dayContainer.classList.add('no-bottom-border');
                    }

                    if(i > paddingDays) {
                        dayContainer.innerText = i - paddingDays;
                        dayContainer.addEventListener('click', ()=> this.openModal(`${month + 1}/${i - paddingDays}/${year}`));
                    } else {
                        dayContainer.classList.add('padding');
                    }

                    calendar.appendChild(dayContainer);
                };
                console.log(calendar);
            },
            initButtons() {},
            openModal(date) {
                const newEventsModal = document.getElementById('newEventsModal');
                const backDrop = document.getElementById('modalBackDrop');
                
                this.clicked = date;
                const eventForDay = this.events.find(e => e.date === this.clicked);
               
               if (eventForDay) {
                    console.log('Event already exists');
                } else {
                    newEventsModal.style.display = 'block';
                }
    
                backDrop.style.display = 'block';
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
    }
</script>

<style >
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
        border: 1px solid lightgrey;
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
        border-bottom: 1px solid lightgrey;
        border-left: 1px solid lightgrey;
        width: calc(calc(100% - 7px)  / 7);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        font-size: 80%;
        color: grey;
        cursor: pointer;
    } 
    div.no-left-border {
        border-left: none;
    }
     div.no-bottom-border {
        border-bottom: none;
    }
    div#calendar div.day:last-child {
        border-bottom: none;
        border-right: 1px solid lightgrey;
    }
    div#calendar .day:hover {
        background-color: #e8faed;
    }

    div#modalBackDrop {
        display: none;
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0px;
        left: 0px;
        background: rgba(0, 0, 0, 0.452);
        z-index: 1000;
    }
    div#newEventsModal {
        display: none;
        width: 70%;
        height: 90vh;
        position: fixed;
        top: 5%;
        left: 15%;
        background: white;
        z-index: 10000;
        border-radius: 5px;
    }
    div#newEventsModal div.title{
        height: 15%;
        font-size: 150%;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div#newEventsModal div.package{
        box-shadow: 0px 0px 10px 2px rgb(241, 241, 241);
        width: 60%;
        margin: 0% auto 2%;
        border-radius: 5px;
        padding: 2%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: .5s;
    }
    div#newEventsModal div.package:hover {
        box-shadow: 0px 0px 15px 3px rgb(241, 241, 241);
        transition: .5s;
    }
    div#newEventsModal div.package div.lessontitle{
        font-weight: 600;
        color: rgb(95, 95, 95);
        font-size: 110%;
        margin-bottom: 5%;
    }
    div#newEventsModal div.package div.lang{
        font-weight: 400;
        color: grey;
        font-size: 90%;
    }
    div#newEventsModal div.package div.duration{
        font-weight: 600;
        color: grey;
        font-size: 90%;
    }
    div#newEventsModal div.package div.price{
        border-radius: 25px;
        background: rgba(195, 243, 239, 0.521);
        color: rgb(61, 189, 178);
        font-weight: 600;
        padding: 1% 3%;
    }
    div#sectiontwo {
        display: none;
        height: 100%;
    }
    div#sectiontwo div.calendar-details {
        display: flex;
        height: 75%;
        overflow: auto;
    }
    div#sectiontwo div.calendar-details div.time{
        padding-top: 35px;
        width: 10%;
    }
    div#sectiontwo div.calendar-details div.time div{
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    div.calendar-details div.right {
        width: 90%;
    }
    div.calendar-details div.right div#daysofthemonth{
        height: 35px;
        display: flexbox;
        width: 100%;
        white-space: nowrap;
    }
    div.calendar-details div.right div#daysofthemonth div.day {
        width: 100px;
        border: 1px solid lightgrey;
        border-right: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        font-size: 80%;
        color: grey;
    }
    div.calendar-details div.right div#all-hours div.hour {
        width: 100px;
        border: 1px solid lightgrey;
        border-right: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 35px;
        font-size: 80%;
        color: grey;
    }
    div.calendar-details div.right div#all-hours {
        display: grid;
        width: 100%;
        white-space: nowrap;
    }
    div.calendar-details div.right div#all-hours div.hourrow {
        border-bottom: 1px solid lightgrey;
        border-right: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 35px;
    }
</style>