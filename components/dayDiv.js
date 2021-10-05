import styles from '../styles/Home.module.css'
import React, { useEffect, useState, useRef } from 'react';

export default function DayDiv({date, addDate, removeDate, leftMouseIsPressed, edgeLength}) {

    // Fixing tooltip cut on the left side
    const ref = useRef();
    const [right, setRight] = useState("100%");
    const [left, setLeft] = useState("");

    useEffect(() => {
        const dims = ref.current.getBoundingClientRect();
        if (dims.x < 0 && dims.right < dims.width) {
            setLeft("100%");
            setRight("0");
        }
    });

    // Handling mark
    const [isMarked, setIsMarked] = useState(false);

    const className = styles.daydiv + " " + styles.tooltip + " ";

    const handleMouseDown = (e) => {
        let keyCode = (e.keyCode || e.which || e.nativeEvent.keyCode || e.nativeEvent.which);
        if (keyCode === 1) {
            if (!isMarked) {
                addDate(date);
            } else {
                removeDate(date);
            }
            setIsMarked(!isMarked);
        }
    }

    const handleMouseEnter = (e) => {
        let keyCode = (e.keyCode || e.which || e.nativeEvent.keyCode || e.nativeEvent.which);
        if (keyCode === 1) {
            if (leftMouseIsPressed) {
                if (!isMarked) {
                    addDate(date);
                } else {
                    removeDate(date);
                }
                setIsMarked(!isMarked);
            }
        }
    }

    return (
        <div
            className={className + (isMarked? styles.daydiv_marked : styles.daydiv_unmarked)}
            style={{width: edgeLength, height: edgeLength}}
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
    