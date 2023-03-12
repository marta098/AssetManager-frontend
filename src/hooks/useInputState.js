import {useState} from "react";

const useInputState = initialValue => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState("");

    const handleChange = e => {
        setValue(e.target.value);
    };

    const reset = oldValue => {
        if (oldValue) {
            setValue(oldValue);
        } else {
            setValue("");
        }
    }

    return [value, handleChange, reset, error, setError, setValue];
}

export default useInputState;