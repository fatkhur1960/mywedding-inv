/* eslint-disable no-useless-computed-key */
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { firestore } from '../../utils/firebase';
import BubbleMessage from './Bubble';
import OnViewTransition from '../../animations/OnViewTransition';
import queryString from 'query-string';
import FadeTransition2 from '../../animations/FadeTransition2';
import * as fs from 'firebase/firestore';
import useFetchTasks from '../hooks/useFetchData';
import useFetchCount from '../hooks/useFetchCount';
import { AnimatePresence } from 'framer-motion';

const itemsPerPage = 4

const GreetingForm = () => {
    const currentName = useMemo(() => {
        const qs: { name?: string } = queryString.parse(window.location.search)
        return qs.name
    }, [])

    const [name, setName] = useState(currentName ?? '');
    const [message, setMessage] = useState('');
    const [presence, setPresence] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const divRef = useRef<HTMLDivElement | null>(null);

    const scrollToTop = useCallback(() => {
        divRef.current?.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [divRef])

    // keep cursors in memory
    const cursors = useRef<Map<number, fs.DocumentSnapshot>>(new Map());

    // use query fetching
    const { data, status } = useFetchTasks({
        cursor: cursors.current.get(page),
        itemsPerPage,
    });

    // collect all the tasks JSON data
    const greetings = useMemo(() => {
        return data?.docs?.map((doc) => doc.data()) ?? [];
    }, [data]);

    // callback called when changing page
    const onPageChanged = useCallback((nextPage: number) => {
        setPage((page) => {
            // first, we save the last document as page's cursor
            cursors.current.set(
                page + 1,
                data.docs[data.docs.length - 1]
            );

            // then we update the state with the next page's number
            return nextPage;
        });

        scrollToTop()
    }, [data, scrollToTop]);

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleMessageChange = (e: any) => {
        setMessage(e.target.value);
    };

    const removeHtmlTags = (input: string) => {
        // Create a regular expression to match HTML tags
        const regex = /(<([^>]+)>)/ig;

        // Replace HTML tags with an empty string
        const sanitizedInput = input.replace(regex, '');

        return sanitizedInput;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await fs.addDoc(fs.collection(firestore, 'greetings'), {
                name,
                message: removeHtmlTags(message),
                presence,
                ts: new Date().getTime(),
            });
        } catch (error) {
            alert('Tidak dapat mengirimkan ucapan');
            console.log('Error submitting greeting:', error);
        } finally {
            onPageChanged(0);
            setName('');
            setMessage('');
            setPresence(false);
            setIsLoading(false);
        }
    };

    return (
        <div className="text-left border border-light rounded-lg px-4 py-6 overflow-hidden">
            <OnViewTransition>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={handleNameChange}
                            className="border rounded py-2 px-3 w-full bg-opacity-30 bg-light border-light focus:outline-none focus:ring-0 focus:border-secondary focus:bg-secondary focus:bg-opacity-30"
                            placeholder='Isikan nama Anda...'
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            id="message"
                            value={message}
                            onChange={handleMessageChange}
                            className="border rounded py-2 px-3 w-full bg-opacity-30 bg-light border-light resize-none focus:outline-none focus:ring-0 focus:border-secondary focus:bg-secondary focus:bg-opacity-30"
                            rows={4}
                            placeholder='Berikan ucapan dan doa restu...'
                            maxLength={400}
                        />
                    </div>
                    <div className='flex justify-between items-start'>
                        <div className="flex items-center">
                            <input id="presence" type="checkbox" className="w-4 h-4 text-light bg-gray-100 border-gray-300 rounded focus:ring-light" onChange={({target}) => setPresence(target.checked)}/>
                            <label htmlFor="presence" className="ml-2 text-sm font-medium text-primary select-none">Konfirmasi Kehadiran</label>
                        </div>
                        <button
                            type="submit"
                            className="font-medium bg-light text-primary px-3.5 py-2.5 rounded-md disabled:bg-opacity-50 disabled:text-opacity-60 inline-flex items-center justify-center"
                            disabled={(!name || !message) || isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                fill="white"
                                            />
                                            <path
                                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                    <div className='not-sr-only'>Mengirimkan...</div>
                                </>
                            ) : 'Kirimkan Ucapan'}
                        </button>
                    </div>
                </form>
            </OnViewTransition>
            <div className="mt-8 max-h-[400px] overflow-y-auto py-2 overflow-x-hidden scroll-smooth" ref={divRef}>
                <AnimatePresence>
                    {status === 'loading' ? (
                        <FadeTransition2>
                            <div className='text-center italic text-primary'>Loading...</div>
                        </FadeTransition2>
                    ) : (
                        <>
                            {greetings.length ? (
                                <div>
                                    <ul>
                                        {greetings.map(({ id, name, message, presence }) => (
                                            <li key={id}>
                                                <OnViewTransition key={`g-${id}`} variant='fadeInLeft'>
                                                    <BubbleMessage message={message} sender={name} presence={presence}/>
                                                </OnViewTransition>
                                            </li>
                                        ))}
                                    </ul>
                                    <Pagination
                                        currentPage={page}
                                        pageChanged={onPageChanged}
                                    />
                                </div>
                            ) : (
                                <FadeTransition2>
                                    <div className='text-center italic text-primary'>Belum Ada Ucapan...</div>
                                </FadeTransition2>
                            )}
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

function Pagination(
    props: React.PropsWithChildren<{
        currentPage: number;
        pageChanged: (page: number) => unknown;
    }>
) {
    const fetchCount = useFetchCount();
    const [tasksCount, setTasksCount] = useState<number>();

    useEffect(() => {
        // when the component mounts, we store the tasks count in the state
        fetchCount().then((result) => {
            setTasksCount(result.data().count);
        });
    }, [fetchCount,]);

    if (tasksCount === undefined) {
        return <div />;
    }

    const totalPages = Math.floor(tasksCount / itemsPerPage);
    const canGoBack = props.currentPage >= 1;
    const canGoNext = props.currentPage < totalPages;

    return (
        <div className={'flex flex-row justify-end space-x-2'}>
            <button
                className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-opacity-100 bg-opacity-25 hover:text-white text-light bg-light border border-light disabled:opacity-50"
                disabled={!canGoBack}
                onClick={() => props.pageChanged(props.currentPage - 1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>

            <button
                className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-opacity-100 bg-opacity-25 hover:text-white text-light bg-light border border-light disabled:opacity-50"
                disabled={!canGoNext}
                onClick={() => props.pageChanged(props.currentPage + 1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
}

export default GreetingForm;
