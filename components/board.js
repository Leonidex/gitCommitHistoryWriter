import { useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import styles from '../styles/Home.module.css'
import Column from './column'

export default function Board({startDate, endDate, addDate, removeDate, leftMouseIsPressed}) {

    const [weeksCount, setWeeksCount] = useState(52);

    useEffect(() => {
        const oneDay = 1000 * 60 * 60 * 24;
        let daysCount = Math.ceil(Math.abs(startDate - endDate)/oneDay);
        setWeeksCount(Math.ceil(daysCount/7));
    }, [startDate, endDate]);

    let weeksStartDates = [startDate];

    let tempDate = new Date(startDate);
    
    for (let index = 1; index < weeksCount; index++) {
        tempDate.setDate(tempDate.getDate() + 7);
        weeksStartDates.push(new Date(tempDate));
    }

    // Responsive DayDiv size
    const windowSize = useWindowSize();
    const [dayDivEdgeLength, setDayDivEdgeLength] = useState("min(4vh, 2vw)");

    useEffect(() => {
        let val = Math.floor(windowSize.width/(weeksCount + 2));
        if (val*7 > windowSize.height/3) {
            setDayDivEdgeLength(windowSize.height/(7*3));
        } else {
            setDayDivEdgeLength(val);
        }
    }, [windowSize, weeksCount]);
    
    return (
        <div className={styles.board}>
            {weeksStartDates.map(date => {
                return <Column startDate={date} key={"week" + date} addDate={addDate} removeDate={removeDate} leftMouseIsPressed={leftMouseIsPressed} dayDivEdgeLength={dayDivEdgeLength}></Column>
            })}
        </div>
    )
}
    