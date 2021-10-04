import styles from '../styles/Home.module.css'
import DayDiv from './dayDiv';

export default function Column({startDate, addDate, removeDate, leftMouseIsPressed}) {
    let days = [];

    let tempDate = new Date(startDate);
    
    for (let index = 0; index < 7; index++) {
        tempDate.setDate(tempDate.getDate() + 1)
        days.push(new Date(tempDate));
    }

    return (
        <div className={styles.row}>
            {days.map(date => {
                return <DayDiv date={date} key={'day' + date} addDate={addDate} removeDate={removeDate} leftMouseIsPressed={leftMouseIsPressed}></DayDiv>
            })}
        </div>
    )
}