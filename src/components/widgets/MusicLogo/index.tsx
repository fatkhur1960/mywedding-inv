/* eslint-disable no-useless-computed-key */
import { FC, useEffect, useState } from 'react';
import './style.css';
import classNames from 'classnames';

const MusicLogo: FC<{ onClick: () => void, isPlaying: boolean }> = ({ onClick, isPlaying }) => {
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = (_: any) => {
            setIsScrolling(window.scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div
            className={classNames("fixed border-primary text-primary bottom-6 right-6 p-2 border-[2.5px] rounded-full shadow transition-all ease-in-out z-50", {
                ["opacity-100"]: isScrolling,
                ["opacity-0"]: !isScrolling,
            })}
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className={classNames("w-7 h-7", {
                    ["rotate-animation"]: isPlaying,
                })}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z"
                />
            </svg>
        </div>
    );
};

export default MusicLogo;
