import React, { useEffect } from "react";

const GoogleTranslateComponent = () => {
    useEffect(() => {
        const googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: "en",
                    autoDisplay: false,
                },
                "google_translate_element"
            );
        };

        // Check if the Google Translate API script is already loaded
        if (!window.google || !window.google.translate) {
            const script = document.createElement("script");
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;

            // Attach onload event to initialize TranslateElement with a slight delay
            script.onload = () => setTimeout(googleTranslateElementInit, 100);

            document.body.appendChild(script);
        } else {
            // If the Google Translate API is already available, directly call the initialization function
            googleTranslateElementInit();
        }
    }, []);

    return (
        <div style={{ display: "inline-block", position: "relative" }}>
            <div id="google_translate_element"></div>
        </div>
    );
};

export default GoogleTranslateComponent;
