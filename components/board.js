import { useEffect, useState } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import styles from '../styles/Home.module.css'
import Column from './column'

export default function Board({startDate, endDate, addDate, removeDate, leftMouseIsPressed}) {
    const [weeksCount, setWeeksCount] = useState(52);

    // Set weeks count variable on any change to the startDate or endDate variables
    useEffect(() => {
        const oneDay = 1000 * 60 * 60 * 24;
        let daysCount = Math.ceil(Math.abs(startDate - endDate) / oneDay);
        setWeeksCount(Math.ceil(daysCount / 7));
    }, [startDate, endDate]);

    let weeksStartDates = [startDate];

    let tempDate = new Date(startDate);

    // Populate an array of Sundays for every week according to the weeksCount variable
    for (let index = 1; index < weeksCount; index++) {
        tempDate.setDate(tempDate.getDate() + 7);
        weeksStartDates.push(new Date(tempDate));
    }

    // Responsive DayDiv size
    const windowSize = useWindowSize();
    const [dayDivEdgeLength, setDayDivEdgeLength] = useState("min(4vh, 2vw)");

    // Change dayDiv size on any change to the window size or to the weeks count
    useEffect(() => {
        let val = Math.floor(windowSize.width / (weeksCount + 2));

        if (val * 7 > windowSize.height / 3) {
            // If the dayDiv height value is too big set it to a fixed size
            setDayDivEdgeLength(windowSize.height / (7 * 3));
        } else {
            setDayDivEdgeLength(val);
        }
    }, [windowSize, weeksCount]);

    return (
        <div className={styles.board}>
            {weeksStartDates.map((date) => {
                return (
                    <Column
                        startDate={date}
                        key={"week" + date}
                        addDate={addDate}
                        removeDate={removeDate}
                        leftMouseIsPressed={leftMouseIsPressed}
                        dayDivEdgeLength={dayDivEdgeLength}
                    ></Column>
                );
            })}
        </div>
    );
}
    