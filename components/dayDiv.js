import styles from '../styles/Home.module.css'
import React, { useState } from 'react';

export default function DayDiv({date, addDate, removeDate, leftMouseIsPressed}) {
    const [isMarked, setIsMarked] = useState(false);
    // const [isHovered, setIsHovered] = useState(false);

    const className = styles.daydiv + " " + styles.tooltip + " ";

    const handleMouseDown = () => {
        if (!isMarked) {
            addDate(date);
        } else {
            removeDate(date);
        }
        setIsMarked(!isMarked);
    }

    const handleMouseEnter = () => {
        // setIsHovered(true);
        if (leftMouseIsPressed) {
            if (!isMarked) {
                addDate(date);
            } else {
                removeDate(date);
            }
            setIsMarked(!isMarked);
        }
    }

    const handleMouseLeave = () => {
        // setIsHovered(false);
    }

    return (
        <div className={className + (isMarked? styles.daydiv_marked : styles.daydiv_unmarked)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}>
                <span className={styles.tooltiptext}>{(date.toISOString().substring(0,10))}</span>
        </div>
    )
}
    