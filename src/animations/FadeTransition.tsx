import { motion, AnimatePresence, Transition } from "framer-motion";
import React, { FC } from "react";

const variants = {
    fadeIn: {
        opacity: 0,
        scale: 0.7,
        // transition: {
        //     duration: 0.55,
        //     ease: "easeInOut"
        // }
    },
    inactive: {
        opacity: 1,
        scale: 1,
        // transition: {
        //     duration: 0.55,
        //     ease: "easeInOut"
        // }
    },
    fadeOut: {
        opacity: 0,
        scale: 0.7,
        // transition: {
        //     duration: 0.55,
        //     ease: "easeInOut"
        // }
    }
};

const FadeTransition: FC<{children: React.ReactNode; transition?: Transition; }> = ({ children, transition = {
    duration: 0.8,
    delay: 0.55,
} }) => {
    return (
        <AnimatePresence initial={true}>
            <motion.div
                variants={variants}
                initial="fadeIn"
                animate="inactive"
                exit="fadeOut"
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

export default FadeTransition;
