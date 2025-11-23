"use client"; // This component is now client-side to manage state

import { useState, useEffect } from 'react';
// We are mocking the external component imports which failed resolution.
import { Loader2 } from 'lucide-react'; // For the spinner icon



export default function TransitionScreen({ isTransitioning }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isRemoved, setIsRemoved] = useState(true);
    const transitionDuration = 500; // Matches the CSS transition duration (ms)

    useEffect(() => {
        let timerRemove;
        if (isTransitioning) {
            // PHASE 1: Start Transition (Fade In)
            setIsRemoved(false); // Add to DOM
            // Small delay to ensure component is rendered before starting the transition
            setTimeout(() => setIsVisible(true), 50); 
        } else {
            // PHASE 2: End Transition (Fade Out)
            if (!isRemoved) {
                setIsVisible(false); // Start fade out CSS transition

                // PHASE 3: Remove from DOM after CSS transition completes
                timerRemove = setTimeout(() => {
                    setIsRemoved(true); // Remove from DOM
                }, transitionDuration);
            }
        }
        return () => clearTimeout(timerRemove);
    }, [isTransitioning, isRemoved]);

    if (isRemoved) return null;

    const overlayClasses = `
        fixed inset-0 z-[9999] flex items-center justify-center 
        transition-opacity duration-${transitionDuration} ease-out 
        bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm
        ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
    `;

    return (
        <div className={overlayClasses}>
            <div className="flex flex-col items-center">
                <Loader2 className="animate-spin h-12 w-12 text-blue-600 dark:text-blue-400" />
                <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300 tracking-wider">
                    Navigating Page...
                </p>
            </div>
        </div>
    );
}
