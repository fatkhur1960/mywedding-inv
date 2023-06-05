import classNames from "classnames";

const BubbleMessage = ({ sender, message, presence }: { sender: string; message: string; presence: boolean }) => {
    return (
        <div className="flex items-start mb-4 w-full">
            <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                        src={`https://ui-avatars.com/api/?name=${encodeURI(sender)}&background=random`}
                        alt={sender}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className={classNames("absolute bottom-0 right-0 z-10", presence ? 'block' : 'hidden')}>
                    <svg fill="none" className="w-4 h-4 bg-blue-500 rounded-full" stroke="white" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                </div>
            </div>
            <div className="bg-light bg-opacity-80 px-4 py-3 rounded-lg ml-6 text-left flex-1 relative after:w-[15px] after:h-[15px] after:absolute after:content-[''] after:top-3.5 after:border-t-light after:border-t-0 after:border-b-[15px] after:border-b-light after:border-r-transparent after:border-r-[15px] after:border-l-0 after:border-l-transparent after:rotate-[45deg] after:-left-[7.37491px]">
                <p className="text-base text-secondary font-medium capitalize">{sender}</p>
                <p className="text-sm text-primary">{message}</p>
            </div>
        </div>
    );
};

export default BubbleMessage;
