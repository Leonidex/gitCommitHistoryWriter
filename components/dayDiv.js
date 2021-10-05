import styles from '../styles/Home.module.css'
import React, { useEffect, useState, useRef, useCallback } from 'react';

export default function DayDiv({date, addDate, removeDate, leftMouseIsPressed}) {

    // Fixing tooltip cut on the left side
    const ref = useRef();
    const [right, setRight] = useState("100%");
    const [left, setLeft] = useState("");

    useEffect(() => {
        const dims = ref.current.getBoundingClientRect();
        if (dims.x < 0 && dims.right < dims.width) {
            setLeft("100%");
            let val = Math.round((dims.right - dims.width));
            // setRight(val + "px");
            console.log(`right: ${dims.right}, val: ${val}`);
        }
    }, []);

    const [isMarked, setIsMarked] = useState(false);

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
        if (leftMouseIsPressed) {
            if (!isMarked) {
                addDate(date);
            } else {
                removeDate(date);
            }
            setIsMarked(!isMarked);
        }
    }

    return (
        <div className={className + (isMarked? styles.daydiv_marked : styles.daydiv_unmarked)}
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleMouseDown}>
                <span
                    ref={ref}
                    className={styles.tooltiptext}
                    style={{right: right, left: left}}>
                        {(date.toISOString().substring(0,10))}
                </span>
        </div>
    )
}
    