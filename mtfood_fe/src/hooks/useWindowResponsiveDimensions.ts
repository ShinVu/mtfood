import { useState, useEffect } from "react";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
}

//Return size of device {xs, sm, md , lg, xl }
export default function useWindowSizeDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const { width } = windowDimensions;
    if (width >= 1536) {
        return "2xl";
    } else if (width >= 1280) {
        return "xl";
    } else if (width >= 1024) {
        return "lg";
    } else if (width >= 768) {
        return "md";
    } else if (width >= 640) {
        return "sm";
    } else {
        return "xs";
    }
}
