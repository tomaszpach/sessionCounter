/**
 * Description for reviewer:
 * This part took me about 50 minutes
 */

import React, {Component} from 'react';

class GetDate {
    constructor(time) {
        this.time = new Date(time);
    }

    getYear() {
        return this.time.getFullYear();
    }

    getMonth() {
        return this.time.getMonth() + 1;
    }

    getDay() {
        return this.time.getDate();
    }

    getHour() {
        return this.time.getHours();
    }

    getMinutes() {
        return this.time.getMinutes();
    }
}

class SessionCounter extends Component {
    state = {
        timestamp: ['2017-03-10 08:13:11', '2017-03-10 19:01:27', '2017-03-11 07:35:55', '2017-03-11 16:15:11', '2017-03-12 08:01:41', '2017-03-12 17:19:08']
    };

    createNewDate(time) {
        return new GetDate(time);
    }

    getDatePartsArray(time) {
        const date = new Date(time),
            fullYear = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate(),
            hour = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();

        let array = [];

        array.push(fullYear, month, day, hour, minutes, seconds);
        return array;
    }

    checkForSessionsAndUniqueDays(sessions, uniqueDays) {
        const $opinion = document.getElementById('opinion');

        if ((sessions >= 6) && uniqueDays >= 3) {
            $opinion.innerText = `We have ${sessions} sessions and ${uniqueDays} unique days. Ask user for opinion.`;
        } else {
            $opinion.innerText = `We have ${sessions} sessions and ${uniqueDays} unique days. Do not ask user for opinion.`;
        }
    }

    iterateOverDates() {
        let sessions = 0,
            count = 0,
            uniqueDay = 0;

        this.state.timestamp.forEach((time, index) => {
            const getTime = this.createNewDate(time),
                year = getTime.getYear(),
                month = getTime.getMonth(),
                day = getTime.getDay(),
                hour = getTime.getHour(),
                minute = getTime.getMinutes();

            let prevMinute = this.getDatePartsArray(this.state.timestamp[index - 1])[4] || 200;
            let diff = 60 - prevMinute + minute;
            let prevData = this.getDatePartsArray(this.state.timestamp[index - 1]);

            if ((day - prevData[2]) > 1) {
                count++;
                console.log(count);
            } else {
                if ((day !== prevData[2])) {
                    uniqueDay++;
                }

                // todo check year & month right now year 2018 and 2017 means TRUE (but this is not 'day in a row')
                if ((year !== prevData[0] || month !== prevData[1] || day !== prevData[2])
                    || (hour !== prevData[3] && (Math.abs(hour - prevData[3]) >= 2))
                    || (minute !== prevData[4] && (diff >= 30))
                    || (minute !== prevData[4] && diff >= 30)) {
                    sessions++;
                    count++;
                }
            }

            this.checkForSessionsAndUniqueDays(sessions, uniqueDay);
        });
    }

    componentDidMount() {
        this.iterateOverDates()
    }


    render() {
        let times = this.state.timestamp.map((time, index) => {
            return (
                <li key={index}>{time}</li>
            )
        });

        return (
            <div>
                <ul>
                    {times}
                </ul>
                <div id="opinion">Checking sessions...</div>
            </div>
        )
    }
}

export default SessionCounter;
