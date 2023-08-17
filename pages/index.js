import Head from "next/head";
import { useState } from "react";
import Board from "../components/board";
import styles from "../styles/Home.module.css";
import ResultArea from "../components/resultArea";

import ReactDatePicker from "react-datepicker";
import InputContainer from "../components/inputContainer";

export default function Home() {
    // Dates variables
    // Set startDate to a year ago and endDate to today
    let lastYear = new Date(
        new Date().setFullYear(new Date().getFullYear() - 1)
    );
    const [startDate, setStartDate] = useState(
        new Date(lastYear.setDate(lastYear.getDate() - lastYear.getDay()))
    );
    const [endDate, setEndDate] = useState(new Date());

    const handleSetStartDate = (date) => {
        let _date = new Date(date.setDate(date.getDate() - date.getDay()));
        setStartDate(_date);
    };

    // Adding and removing dates from the selected dates list
    const [selectedDates, setSelectedDates] = useState([]);

    const addSelectedDate = (date) => {
        setSelectedDates([...selectedDates, date]);
    };

    const removeSelectedDate = (date) => {
        setSelectedDates(
            selectedDates.filter((d) => d.toString() !== date.toString())
        );
    };

    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);

    const minOnChangeHandler = (e) => {
        const newMin = parseInt(e.target.value);

        if (newMin > max) {
            setMax(newMin);
        }
        setMin(newMin);
    }

    const maxOnChangeHandler = (e) => {
        const newMax = parseInt(e.target.value);

        if (newMax < min) {
            setMin(newMax);
        }
        setMax(newMax);
    }

    // Left mouse button press handling
    const [leftMouseIsPressed, setLeftMouseIsPressed] = useState(false);

    const handleMouseDown = (e) => {
        let keyCode =
            e.keyCode ||
            e.which ||
            e.nativeEvent.keyCode ||
            e.nativeEvent.which;
        if (keyCode === 1) {
            setLeftMouseIsPressed(true);
        }
    };

    const handleMouseUp = (e) => {
        let keyCode =
            e.keyCode ||
            e.which ||
            e.nativeEvent.keyCode ||
            e.nativeEvent.which;

        if (keyCode === 1) {
            setLeftMouseIsPressed(false);
        }
    };

    return (
        <div
            className={styles.container}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <Head>
                <title>Git commiter gui</title>
                <meta name="Git commiter gui" content="Git commiter gui" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Git commiter gui</h1>

                <InputContainer
                    label={'Start date:'}
                >
                    <ReactDatePicker
                        selected={startDate}
                        onChange={(date) => handleSetStartDate(date)}
                        dateFormat="yyyy/MM/d"
                    />
                </InputContainer>

                <InputContainer
                    label={'End date:'}
                >
                <ReactDatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy/MM/d"
                />
                </InputContainer>

                <InputContainer
                    label={'Min commits per day:'}
                >
                <input
                    className={'number-input'}
                    type={"number"}
                    min={1}
                    value={min}
                    placeholder={"Minimal amount of commits per day"}
                    onChange={minOnChangeHandler}
                />
                </InputContainer>
                <InputContainer
                    label={'Max commits per day:'}
                >
                <input
                    className={'number-input'}
                    type={"number"}
                    min={1}
                    value={max}
                    placeholder={"Maximal amount of commits per day"}
                    onChange={maxOnChangeHandler}
                />
                </InputContainer>
                <Board
                    startDate={startDate}
                    endDate={endDate}
                    addDate={addSelectedDate}
                    removeDate={removeSelectedDate}
                    leftMouseIsPressed={leftMouseIsPressed}
                ></Board>
                <ResultArea
                    selectedDates={selectedDates}
                    min={min}
                    max={max}
                ></ResultArea>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://arie.software"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Created by Arie Horowitz
                </a>
            </footer>
        </div>
    );
}
