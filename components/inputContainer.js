import styles from "../styles/Home.module.css";

export default function InputContainer({ label, children }) {
    return <div className={styles.input_container}>
        <span
            className={styles.input_label}
        >
            {label}
        </span>
        {children}
    </div>;
};