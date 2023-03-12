import {useEffect} from 'react';

const useClickOutside = (ref, toggleVisibility) => {
    useEffect(() => {
        const timeOfEffect = performance.now();

        const handleOutsideClick = evt => {
            if (timeOfEffect > evt.timeStamp) {
                return;
            }

            if (ref.current && !ref.current.contains(evt.target)) {
                toggleVisibility();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("visibilitychange", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("visibilitychange", handleOutsideClick);
        };
    }, [ref, toggleVisibility]);
};

export default useClickOutside;