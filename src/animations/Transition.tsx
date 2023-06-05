import { motion } from "framer-motion";
import { FC } from "react";

const variants = {
    fadeIn: {
        opacity: 0,
        transition: {
            duration: 0.55,
            ease: "easeInOut"
        }
    },
    inactive: {
        opacity: 1,
        transition: {
            duration: 0.55,
            ease: "easeInOut"
        }
    },
    fadeOut: {
        opacity: 0,
        transition: {
            duration: 0.55,
            ease: "easeInOut"
        }
    }
};

const Transition: FC<{ children: any; }> = ({ children }) => {
    return (
        <motion.div
            variants={variants}
            initial="fadeIn"
            animate="inactive"
            exit="fadeOut"
        >
            {children}
        </motion.div>
    );
};

export default Transition;
