import React, { createContext, useContext, useState } from 'react'

type ToastVariant = 'info' | 'error'

type ToastProps = {
    message: string
    variant: ToastVariant
}

type ToastContextType = {
    isOpen: boolean
    props: ToastProps
    handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void
    toast: (props: ToastProps) => void
}

const ToastContext = createContext<ToastContextType>({
    isOpen: false,
    props: {
        message: '',
        variant: 'info'
    },
    handleClose: () => {},
    toast: () => {}
})

export const useToastContext = (): ToastContextType =>
    useContext<ToastContextType>(ToastContext)

type ToastContextProviderProps = {
    children?: React.ReactNode
}

export const ToastContextProvider = ({
    children
}: ToastContextProviderProps) => {
    const [props, setProps] = useState<ToastProps>({
        message: '',
        variant: 'info'
    })
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setIsOpen(false)
    }

    const toast = (props: ToastProps) => {
        setProps(props)
        setIsOpen(true)
    }

    return (
        <ToastContext.Provider
            value={{
                isOpen,
                props,
                handleClose,
                toast
            }}
        >
            {children}
        </ToastContext.Provider>
    )
}

export const useToast = () => {
    const { toast } = useToastContext()

    return toast
}
