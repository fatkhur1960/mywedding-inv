import { useAnimation, motion, Variants, Transition } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FC, useEffect } from "react";

const fadeInDown = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -100 }
};

const fadeInUp = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 }
};

const fadeInLeft = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 100 }
};

const fadeInRight = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100, }
};

const slideInLeft = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: 100 }
};

const slideInRight = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100, }
};

export const variants: { [key: string]: Variants } = {
    fadeInDown,
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    slideInLeft,
    slideInRight,
}

interface Props {
    children: any;
    variant?: 'fadeInDown' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'slideInLeft' | 'slideInRight';
    transition?: Transition;
}

const OnViewTransition: FC<Props> = ({ children, variant = 'fadeInDown', transition = {
    duration: 0.8,
    delay: 0.55,
} }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }

        return () => {
            // controls.stop()
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            variants={variants[variant]}
            animate={controls}
            initial="hidden"
            transition={{
                duration: 0.75,
                delay: 0.55,
                ...transition,
            } as Transition}
        >
            {children}
        </motion.div>
    );
};

export default OnViewTransition;
