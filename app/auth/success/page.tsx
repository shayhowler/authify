'use client';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const VerificationSuccess = () => {
    const [scale, setScale] = useState(0);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        // Scale animation
        const scaleTimeout = setTimeout(() => setScale(8), 100);

        // Complete animation
        const completionTimeout = setTimeout(() => setAnimationComplete(true), 1500);

        // Cleanup
        return () => {
            clearTimeout(scaleTimeout);
            clearTimeout(completionTimeout);
        };
    }, []);

    useEffect(() => {
        if (animationComplete) {
            // Clear cookies and local storage
            document.cookie.split(";").forEach(cookie => {
                document.cookie = `${cookie.split("=")[0]}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
            });
            localStorage.clear();
            sessionStorage.clear();

            // Show success alert
            alert('Success! You can close the tab now.');
        }
    }, [animationComplete]);

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div
                className="flex justify-center items-center"
                style={{
                    transform: `scale(${scale})`,
                    transition: 'transform 1.5s ease-in-out',
                    maxWidth: '100%',
                    maxHeight: '100%',
                }}
            >
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-6xl" />
            </div>
        </div>
    );
};

export default VerificationSuccess;