import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import Column from './column'

export default function Board({startDate, endDate, addDate, removeDate, leftMouseIsPressed}) {

    const [weeksCount, setWeeksCount] = useState(52);

    useEffect(() => {
        const oneDay = 1000 * 60 * 60 * 24;
        let daysCount = Math.ceil(Math.abs(startDate - endDate)/oneDay);
        setWeeksCount(Math.ceil(daysCount/7));
        console.log(`days count: ${daysCount}`)
    }, [startDate, endDate]);

    let weeksStartDates = [startDate];

    let tempDate = new Date(startDate);
    
    for (let index = 1; index < weeksCount; index++) {
        tempDate.setDate(tempDate.getDate() + 7);
        weeksStartDates.push(new Date(tempDate));
    }
    
    return (
        <div className={styles.board}>
            {weeksStartDates.map(date => {
                return <Column startDate={date} key={"week" + date} addDate={addDate} removeDate={removeDate} leftMouseIsPressed={leftMouseIsPressed}></Column>
            })}
        </div>
    )
}
    