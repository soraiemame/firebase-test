import ReservationInfoDialog from '@/components/ReservationInfoDialog'
import { useToast } from '@/contexts/ToastContext'
import useCanceler from '@/services/use-canceler'
import { Reservation } from '@/types'
import { ComponentProps } from 'react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL!

type ReservationInfoDialogContainerProps = Omit<
    ComponentProps<typeof ReservationInfoDialog>,
    'onCancel' | 'isLoadingCancellation'
>

const ReservationInfoDialogContainer = ({
    onClose,
    ...props
}: ReservationInfoDialogContainerProps) => {
    const toast = useToast()
    const { cancel, isLoading: isLoadingCancellation } = useCanceler(apiUrl, {
        onSuccess: () => {
            onClose()
            toast({
                message: 'キャンセルが完了しました',
                variant: 'info'
            })
        },
        onError: (message) => {
            toast({
                message,
                variant: 'error'
            })
        }
    })
    const onCancel = (reservation: Reservation, password: string) =>
        cancel({ reservation, password })

    return (
        <ReservationInfoDialog
            onClose={onClose}
            {...props}
            onCancel={onCancel}
            isLoadingCancellation={isLoadingCancellation}
        />
    )
}

export default ReservationInfoDialogContainer
