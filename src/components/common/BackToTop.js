import React, { useEffect } from 'react';
import { Styles } from "./styles/backToTop.js";
import UserService from '../../services/UserService.js';

function BackToTop() {

    useEffect(() => {
        UserService.generateToken();
       }, []);

    useEffect(() => {
        const topBtn = document.querySelector(".totop-btn");

        window.addEventListener("scroll", () => {
            if (window.scrollY > 750) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        });

        topBtn.addEventListener("click", smoothScrollBackToTop);

        function smoothScrollBackToTop() {
            const targetPosition = 0;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 750;
            let start = null;

            window.requestAnimationFrame(step);

            function step(timestamp) {
                if (!start) start = timestamp;
                const progress = timestamp - start;
                window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
                if (progress < duration) window.requestAnimationFrame(step);
            }
        }

        function easeInOutCubic(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        };
    });

    return (
        <Styles>
            {/* Back To Top */}
            <button type="text" className="totop-btn">
                <i style={{padding : '0px'}} className="las la-arrow-up"></i>
            </button>
        </Styles>
    )
}

export default BackToTop