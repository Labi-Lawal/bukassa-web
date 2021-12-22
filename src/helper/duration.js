const convertMilliSecsToMins = (durationInMs)=> {
    return durationInMs / 60000;
};

const timeRemaning = (datetime)=> {
    console.log(datetime);

    var timeRemains = '',

    eventDate = new Date(datetime),
    today = new Date().getTime(),

    diffInSecs = Math.floor((eventDate.getTime() - today) / 1000),
    diffInMins = Math.floor(diffInSecs / 60),
    diffInHrs = Math.floor(diffInMins / 60),
    diffInDays = Math.floor(diffInHrs / 24),
    diffInWeeks = Math.floor(diffInDays / 7);

    console.log(diffInWeeks);
    

    if(diffInWeeks == 0) {
        if(diffInDays == 0) {
            if(diffInHrs == 0) {
                if(diffInMins == 0) {
                    if(diffInSecs == 0) timeRemains = `Live`;
                    else timeRemains = `in ${diffInSecs} seconds`;
                } else timeRemains = `in ${diffInMins} minutes`;
            } else timeRemains = `in ${diffInHrs} hours`;
        } else timeRemains = `in ${diffInDays} days`;
    } else timeRemains = `in ${diffInWeeks} weeks`;


    return timeRemains;
};

const duration = { convertMilliSecsToMins, timeRemaning };

export default duration;
