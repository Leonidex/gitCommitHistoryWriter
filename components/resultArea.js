import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function ResultArea({ selectedDates }) {
    const [chosenDatesString, setChosenDatesString] = useState(
        "Choose start and end date, then pick the dates to commit on and press done."
    );

    const handleDoneClick = () => {
        let finalString =
            "# Use this bash code on your terminal while it is on a directory of the git project you would like to commit on.\n";
        finalString += "#!/bin/bash\n";
        finalString += "dates=(";

        if (selectedDates.length > 0) {
            finalString += "('";
            for (let index = 0; index < selectedDates.length; index++) {
                finalString += selectedDates[index].toISOString();
                if (index < selectedDates.length - 1) {
                    finalString += "', ";
                }
                finalString += "'";
            }
        }

        finalString += ");\n";
        finalString += "for i in ${!dates[@]};\n";
        finalString += "do\n";
        finalString += "    echo ${dates[i]}\n";
        finalString += '    echo "0" >> touched\n';
        finalString += '    export GIT_COMMITTER_DATE="${dates[i]}"\n';
        finalString += '    export GIT_AUTHOR_DATE="${dates[i]}"\n';
        finalString += "    echo $(git add .)\n";
        finalString +=
            '    echo $(git commit -am "none" --date "${dates[i]}")\n';
        finalString += "    echo ${dates[i]}\n";
        finalString += "done";

        setChosenDatesString(finalString);
    };

    const handleTextareaClick = (event) => {
        event.target.select();
    };

    return (
        <>
            <button className={styles.button} onClick={handleDoneClick}>
                Done
            </button>
            <div className={styles.tooltip} onClick={handleTextareaClick}>
                <span className={styles.tooltiptextarea}>
                    Click to mark all
                </span>
                <textarea
                    className={styles.result_textarea}
                    value={chosenDatesString}
                    readOnly={true}
                ></textarea>
            </div>
        </>
    );
}
