/* eslint-disable no-useless-computed-key */
import classNames from "classnames";
import { FC, useMemo, useState } from "react";
import FadeTransition from "../../animations/FadeTransition";
import OnViewTransition from "../../animations/OnViewTransition";
import queryString from 'query-string';

const Cover: FC<{ onOpen: (e: any) => void }> = ({ onOpen }) => {
    const [isOpen, setIsOpen] = useState(false)
    const tamu = useMemo(() => {
        const qs: { name?: string } = queryString.parse(window.location.search)
        return qs.name ?? 'Tamu Undangan'
    }, [])

    const beforeOpen = (e: any) => {
        setIsOpen(true)
        setTimeout(() => {
            onOpen(e)
        }, 400);
    }

    return (
        <section className="w-full min-h-screen cover flex items-center justify-center p-4">
            <div className='w-fit text-center'>
                <div className='mb-8 text-primary'>
                    <OnViewTransition transition={{ delay: 0.2 }}>
                        <h1 className='uppercase font-shantell mb-4'>The Wedding of</h1>
                    </OnViewTransition>
                    <div className="font-gv text-4xl text-primary inline-flex space-x-3 mb-4">
                        <OnViewTransition variant="slideInRight" transition={{ delay: 0.4 }}>
                            <div className='-mt-3'>Silvia</div>
                        </OnViewTransition>
                        <OnViewTransition transition={{ delay: 0.4 }}>
                            <div className='text-5xl text-secondary'>&</div>
                        </OnViewTransition>
                        <OnViewTransition variant="slideInLeft" transition={{ delay: 0.4 }}>
                            <div className='mt-4'>Fatkhur</div>
                        </OnViewTransition>
                    </div>
                    <OnViewTransition transition={{ delay: 0.55 }}>
                        <div className='flex w-fit mx-auto items-center space-x-4 font-cormorant text-xl font-medium text-primary'>
                            <p className='leading-none'>Senin</p>
                            <div className='border-r-2 border-l-2 px-2.5 border-slate-600 border-opacity-75 leading-none'>
                                <p className='text-center -mt-[8px]'>
                                    <span className='text-4xl leading-none'>12</span>
                                    <br />Jun
                                </p>
                            </div>
                            <p className='leading-none'>2023</p>
                        </div>
                    </OnViewTransition>
                </div>

                <FadeTransition transition={{ delay: 0.6 }}>
                    <div className={classNames("card mb-6 mx-auto flex items-center justify-center", { ["card-open"]: isOpen })} onClick={beforeOpen}>
                        <div className="top" />
                        <div className="heart" />
                        <div className="letter">
                            <div className="text-secondary px-2 pt-3.5 font-medium text-lg font-shantell">Invitation</div>
                        </div>
                    </div>
                </FadeTransition>

                <OnViewTransition transition={{ delay: 0.7 }}>
                    <div>
                        <button
                            className='text-xs cursor-pointer font-medium bg-light text-primary px-3.5 py-2.5 mb-8 rounded-md'
                            onClick={beforeOpen}
                        >
                            Buka Undangan
                        </button>
                    </div>
                </OnViewTransition>

                <OnViewTransition transition={{ delay: 0.8 }}>
                    <div className='mb-8'>
                        <p className='text-sm'>Kepada, Yth. Bpk/Ibu/Sdr/i:</p>
                        <h3 className='text-xl font-semibold capitalize'>{tamu}</h3>
                    </div>
                </OnViewTransition>
            </div>
        </section>
    );
}

export default Cover;