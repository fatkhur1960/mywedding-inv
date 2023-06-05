import LogoBRI from "../../assets/logo/logo-bri.png"
import LogoBCA from "../../assets/logo/logo-bca.png"
import LogoDANA from "../../assets/logo/logo-dana.png"
import LogoOVO from "../../assets/logo/logo-ovo.png"
import Chip from "../../assets/logo/chip.png"
import { FC, FunctionComponent, useMemo, useState } from "react"
import React from "react"
import IconQr from "../icons/IconQr"
import IconCopy from "../icons/IconCopy"
import CopyToClipboard from "./CopyToClipboard"
import { useModal } from "../ModalContext"
import DanaModal from "../modals/DanaModal"
import classNames from "classnames"

interface CardProps {
    name: string;
    bank: string;
    number: string;
    logo: string;
    actionIcon: FunctionComponent;
    action: 'scan' | 'copy';
    scanModal?: FunctionComponent
}

const cardNumbers: CardProps[] = [
    {
        name: 'Silvia Anisa',
        bank: 'bri',
        number: '162901009479500',
        logo: LogoBRI,
        actionIcon: IconCopy,
        action: 'copy',
    },
    {
        name: 'Fatkhurrohman',
        bank: 'britama',
        number: '365801006891508',
        logo: LogoBRI,
        actionIcon: IconCopy,
        action: 'copy',
    },
    {
        name: 'Fatkhurrohman',
        bank: 'bca',
        number: '2390771781',
        logo: LogoBCA,
        actionIcon: IconCopy,
        action: 'copy',
    },
    {
        name: 'Fatkhur',
        bank: 'ovo',
        number: '085225520622',
        logo: LogoOVO,
        actionIcon: IconCopy,
        action: 'copy',
    },
    {
        name: 'Fatkhur',
        bank: 'dana',
        number: '085225520622',
        logo: LogoDANA,
        actionIcon: IconQr,
        action: 'scan',
        scanModal: DanaModal,
    },
]

const GiftCard: FC<{ onSwipeStart?: () => void; onSwipeEnd?: () => void }> = ({ onSwipeStart, onSwipeEnd }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const modal = useModal()

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % cardNumbers.length);
    };

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + cardNumbers.length) % cardNumbers.length);
    };

    const renderActionCard = useMemo(() => {
        const card = cardNumbers[activeIndex]

        if (card.action === 'copy') {
            return (
                <CopyToClipboard
                    data={card.number}
                    className="flex items-center justify-center w-12 h-12 rounded-md hover:bg-opacity-100 bg-opacity-25 hover:text-white text-secondary bg-secondary border border-secondary"
                >
                    {React.createElement(card.actionIcon)}
                </CopyToClipboard>
            )
        }

        return (
            <button onClick={() => card.scanModal && modal.showModal(card.scanModal)} className="flex items-center justify-center w-12 h-12 rounded-md hover:bg-opacity-100 bg-opacity-25 hover:text-white text-secondary bg-secondary border border-secondary">
                {React.createElement(card.actionIcon)}
            </button>
        )
    }, [activeIndex, modal])

    function addSpacesToNumber(number: string) {
        const regex = /(\d{4})(?=\d)/g;
        return number.replace(regex, '$1 ');
    }

    return (
        <div className="max-w-[385px] mx-auto">
            <div className="card-stack-carousel">
                <div className="card-stack">
                    {cardNumbers.map((card, i) => {
                        const cardCount = cardNumbers.length;
                        const last = cardCount - 1
                        const isActive = activeIndex === i;
                        const prevIndex = activeIndex - 1;
                        const nextIndex = activeIndex + 1;
                        const zIndex = isActive ? 50 : (
                            (i === prevIndex && prevIndex >= 0) ||
                            (i === nextIndex && nextIndex < cardCount) ||
                            (i === 0 && activeIndex === last)
                        ) ? 10 : 1
                        let transform = '';
                        if (!isActive) {
                            if (i === prevIndex || (i === last && activeIndex !== cardCount - 2)) {
                                transform = 'translateX(-60px) translateY(0%) translateZ(-200px)';
                            } else {
                                transform = 'translateX(100%) translateY(0%) translateZ(-200px)';
                            }
                        }

                        return (
                            <div
                                className={classNames("credit-card", card.bank, isActive ? 'active' : '')}
                                key={i}
                                style={{
                                    zIndex,
                                    transform,
                                    filter: !isActive ? 'blur(.1rem)' : undefined,
                                }}
                            >
                                <img src={card.logo} alt={card.bank} className="h-6 mb-4" />
                                <img src={Chip} alt={card.bank} className="w-10" />
                                <div className="credit-card-last4">
                                    {addSpacesToNumber(card.number)}
                                </div>
                                <div className="credit-card-expiry2 uppercase">
                                    ATAS NAMA
                                </div>
                                <div className="credit-card-expiry uppercase">
                                    {card.name}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="inline-flex space-x-4 items-center">
                    <button className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-opacity-100 bg-opacity-25 hover:text-white text-light bg-light border border-light" onClick={handlePrev}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    {renderActionCard}
                    <button className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-opacity-100 bg-opacity-25 hover:text-white text-light bg-light border border-light" onClick={handleNext}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GiftCard;