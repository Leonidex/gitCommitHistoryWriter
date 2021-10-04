import styles from '../styles/Home.module.css'
import Column from './column'

export default function Board({startDate, addDate, removeDate, leftMouseIsPressed}) {
    let weeksStartDates = [startDate];

    let tempDate = new Date(startDate);
    
    for (let index = 1; index < 47; index++) {
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
    