import ReserveDialog from '@/components/ReserveDialog'
import { useToast } from '@/contexts/ToastContext'
import useReserver from '@/services/use-reserver'
import { Reservation } from '@/types'
import { ComponentProps } from 'react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL!

type ReserveDialogContainerProps = {
    onClose: () => void
    onSuccess: () => void
} & Omit<
    ComponentProps<typeof ReserveDialog>,
    'onReserve' | 'isLoading' | 'onClose'
>

const ReserveDialogContainer = ({
    onClose,
    onSuccess,
    ...props
}: ReserveDialogContainerProps) => {
    const toast = useToast()
    const { reserve, isLoading } = useReserver(apiUrl, {
        onSuccess: () => {
            onClose()
            onSuccess()
        },
        onError: (message) => {
            toast({
                message,
                variant: 'error'
            })
        }
    })
    const onReserve = (reservation: Reservation, password: string) => {
        reserve({ reservation, password })
    }

    return (
        <ReserveDialog
            {...props}
            onClose={onClose}
            onReserve={onReserve}
            isLoading={isLoading}
        />
    )
}

export default ReserveDialogContainer
