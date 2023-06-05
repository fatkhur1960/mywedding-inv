import { motion, AnimatePresence, Transition, useAnimation } from "framer-motion";
import React, { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const variants = {
    fadeIn: {
        opacity: 1,
        scale: 1,
        // transition: {
        //     duration: 0.55,
        //     ease: "easeInOut"
        // }
    },
    inactive: {
        opacity: 0,
        scale: 0.65,
        // transition: {
        //     duration: 0.55,
        //     ease: "easeInOut"
        // }
    },
};

const FadeTransition2: FC<{children: React.ReactNode; transition?: Transition; }> = ({ children, transition = {
    duration: 0.8,
    delay: 0.55,
} }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("fadeIn")
        } else {
            controls.start("inactive")
        }

        return () => {
            // controls.stop()
        }
    }, [controls, inView]);
    
    return (
        <AnimatePresence initial={true}>
            <motion.div
                variants={variants}
                animate={controls}
                ref={ref}
                transition={{
                    duration: 0.8,
                    delay: 0.55,
                    ease: "easeInOut",
                    ...transition,
                } as Transition}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

export default FadeTransition2;
