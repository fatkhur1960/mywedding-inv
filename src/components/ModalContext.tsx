import IconClose from "./icons/IconClose";
import { AnimatePresence, motion } from "framer-motion";
import React, { FunctionComponent, ReactNode } from "react";

export interface ModalProps {
    onClosed?: () => Promise<void> | void
    closeModal?: () => void
    showCloseBtn?: boolean
}

type ModalBodyType<T> = FunctionComponent<T & ModalProps>

type ModalAction<T = any> = {
    type: 'show' | 'hide'
    modalBody?: ModalBodyType<T>
    modalProps?: ModalProps
}

type Dispatch = (action: ModalAction) => void

type ModalState<T = any> = {
    modalBody?: ModalBodyType<T> | null
    modalProps?: ModalProps | null
}


const ModalContext = React.createContext<{
    state: ModalState;
    dispatch: Dispatch;
} | undefined>(undefined)

const modalReducer = (state: ModalState, action: ModalAction) => {
    switch (action.type) {
        case 'show': {
            return { modalBody: action.modalBody, modalProps: action.modalProps }
        }
        case 'hide': {
            return { modalBody: null, modalProps: null }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = React.useReducer(modalReducer, {
        modalBody: null,
        modalProps: null
    })

    const dropIn = React.useMemo(() => ({
        hidden: {
            y: "-80px",
            opacity: 0,
        },
        visible: {
            y: "0",
            opacity: 1,
            transition: {
                duration: 0.9,
                type: "spring",
                damping: 25,
                stiffness: 800,
            },
        },
        exit: {
            y: "-80px",
            opacity: 0,
        },
    }), [])

    return (
        <ModalContext.Provider value={{ state, dispatch }}>
            <AnimatePresence>
                {(state.modalBody) && (
                    <motion.div
                        className="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        key="modal"
                    >
                        <motion.div
                            variants={dropIn}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            key="modal-content"
                            className="max-w-[500px] px-6"
                        >
                            <div className="w-full lg:w-fit relative">
                                {(state.modalProps?.showCloseBtn ?? true) && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            dispatch({ type: 'hide' })
                                        }}
                                        className="absolute top-2 right-2 z-10 border-2 border-secondary p-1 rounded-full text-secondary transition-all ease-in-out hover:bg-secondary hover:text-white">
                                        <IconClose />
                                    </button>
                                )}
                                <div>
                                    {React.createElement(state.modalBody as FunctionComponent<ModalProps>, {
                                        ...state.modalProps,
                                        closeModal: () => dispatch({ type: 'hide' }),
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {children}
        </ModalContext.Provider>
    )
}

type ModalContextType = {
    showModal: <T extends ModalProps>(
        modalBody: ModalBodyType<T & ModalProps>,
        props?: T & ModalProps
    ) => void
    hideModal: () => void
}

export const useModal = () => {
    const context = React.useContext(ModalContext)
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider')
    }

    const actions: ModalContextType = {
        showModal: (modalBody, props) =>
            context.dispatch({ type: "show", modalBody, modalProps: props }),
        hideModal: () => context.dispatch({ type: 'hide' }),
    }

    return actions
}