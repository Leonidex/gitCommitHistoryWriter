import Head from "next/head";
import { useState } from "react";
import Board from "../components/board";
import styles from "../styles/Home.module.css";
import ResultArea from "../components/resultArea";

export default function Home() {
    // Dates variables
    // Set startDate to the desired starting date
    const startDate = new Date(2020, 10, 0, 12);

    const [selectedDates, setSelectedDates] = useState([]);

    const addSelectedDate = (date) => {
        setSelectedDates([...selectedDates, date]);
    };

    const removeSelectedDate = (date) => {
        setSelectedDates(
            selectedDates.filter((d) => d.toString() !== date.toString())
        );
    };

    // Left mouse button press handling
    const [leftMouseIsPressed, setLeftMouseIsPressed] = useState(false);

    const handleMouseDown = () => {
        setLeftMouseIsPressed(true);
    };

    const handleMouseUp = () => {
        setLeftMouseIsPressed(false);
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
                <Board
                    startDate={startDate}
                    addDate={addSelectedDate}
                    removeDate={removeSelectedDate}
                    leftMouseIsPressed={leftMouseIsPressed}
                ></Board>
                <ResultArea selectedDates={selectedDates}></ResultArea>
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
