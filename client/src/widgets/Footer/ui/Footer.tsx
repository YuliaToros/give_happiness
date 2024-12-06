import React from "react";

export const Footer = React.memo(() => {
    return (
        <footer>
            {new Date().getFullYear()}
        </footer>
    );
})