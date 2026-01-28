import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isHovered, setIsHovered] = useState(false);

    // Spring configuration for smooth movement
    const cursorX = useSpring(0, { damping: 20, stiffness: 250 });
    const cursorY = useSpring(0, { damping: 20, stiffness: 250 });

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleHover = () => setIsHovered(true);
        const handleUnhover = () => setIsHovered(false);

        window.addEventListener('mousemove', moveCursor);

        // Add hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .cursor-pointer, input, select');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleHover);
            el.addEventListener('mouseleave', handleUnhover);
        });

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleHover);
                el.removeEventListener('mouseleave', handleUnhover);
            });
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main Cursor Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-[#006a4e] rounded-full pointer-events-none z-[9999] md:block hidden"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
            {/* Follower Ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-[#006a4e]/30 rounded-full pointer-events-none z-[9998] md:block hidden"
                animate={{
                    scale: isHovered ? 2 : 1,
                    backgroundColor: isHovered ? 'rgba(0, 106, 78, 0.05)' : 'rgba(0, 106, 78, 0)',
                    borderColor: isHovered ? 'rgba(0, 106, 78, 0.5)' : 'rgba(0, 106, 78, 0.3)',
                }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
            />
        </>
    );
};

export default CustomCursor;
