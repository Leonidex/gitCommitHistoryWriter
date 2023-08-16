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
        finalString += "dates=";

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

        finalString += '#!/bin/bash\n'

        finalString += '# Define color codes\n'
        finalString += 'GREEN="\\033[1;32m"\n'
        finalString += 'RED="\\033[1;31m"\n'
        finalString += 'RESET="\\033[0m"\n'

        finalString += 'min=5  # minimum number of commits\n'
        finalString += 'max=10 # maximum number of commits\n'

        finalString += 'for date in "${dates[@]}"; do\n'
        finalString += '    echo "Committing for date: $date"\n'

        finalString += '    # Generate a random number between min and max\n'
        finalString += '    number_of_commits=$(( RANDOM % (max - min + 1) + min ))\n'
        finalString += '    \n'
        finalString += '    for ((i=1; i<=$number_of_commits; i++)); do\n'
        finalString += '        echo "0" >> touched\n'
        finalString += '        export GIT_COMMITTER_DATE="$date"\n'
        finalString += '        export GIT_AUTHOR_DATE="$date"\n'
        finalString += '        git add .\n'
        finalString += '        if git commit -am "Commit $i of $number_of_commits for $date" --date "$date"; then\n'
        finalString += '            echo -e "${GREEN}Commit $i of $number_of_commits successful for $date${RESET}"\n'
        finalString += '        else\n'
        finalString += '            echo -e "${RED}Commit $i of $number_of_commits failed for $date${RESET}"\n'
        finalString += '        fi\n'
        finalString += '    done\n'
        finalString += 'done\n'


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
