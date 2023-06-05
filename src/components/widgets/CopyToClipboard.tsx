import classNames from "classnames";
import React, { FC, useState } from "react";

const CopyToClipboard: FC<{ children: React.ReactNode, className?: string, data: string }> = ({ children, className, data }) => {
    const [show, setShow] = useState(false)

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(data);
            setShow(true)
        } catch (err) {
            console.error(`Failed to copy:`, err);
        } finally {
            setTimeout(() => {
                setShow(false)
            }, 3000);
        }
    }

    return (
        <div onClick={onCopy} className={classNames(className, 'relative hover:cursor-pointer')}>
            {children}
            {show && (
                <div id="tooltip" className="absolute w-fit top-1 ml-2 left-full p-2 text-xs leading-none rounded-md text-white bg-primary bg-opacity-75">
                    Copied!
                </div>
            )}
        </div>
    );
}

export default CopyToClipboard;