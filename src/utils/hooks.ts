import { useState } from 'react'

type UseDialog = {
    isOpen: boolean
    open: () => void
    close: () => void
}

export const useDialog = (): UseDialog => {
    const [isOpen, setOpen] = useState(false)

    return {
        isOpen: isOpen,
        open: () => setOpen(true),
        close: () => setOpen(false)
    }
}

type UseDataDialog<T> = Omit<UseDialog, 'open'> & {
    open: (newData: T) => void
    data: T | null
}

export const useDataDialog = <T>(): UseDataDialog<T> => {
    const { isOpen, open, close } = useDialog()
    const [data, setData] = useState<T | null>(null)

    return {
        isOpen: isOpen,
        open: (newData: T) => {
            setData(newData)
            open()
        },
        close,
        data
    }
}
