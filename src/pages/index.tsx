import GlobalAppBar from '@/components/GlobalAppBar'
import TimetableViewContainer from '@/containers/TimetableViewContainer'
import { useDataDialog, useDialog } from '@/utils/hooks'
import { Container } from '@mui/material'
import ReservationInfoDialogContainer from '@/containers/ReservationInfoDialogContainer'
import { Reservation } from '@/types'
import ReserveDialogContainer from '@/containers/ReserveDialogContainer'
import ReservationSuccessDialog from '@/components/ReservationSuccessDialog'

export default function Home() {
    const reservationInfoDialog = useDataDialog<Reservation>()
    const reserveDialog = useDataDialog<Reservation>()
    const reservationSuccessDialog = useDialog()

    return (
        <>
            <GlobalAppBar />
            <main>
                <Container maxWidth="md" sx={{ pt: 3 }}>
                    <TimetableViewContainer
                        onShowInfo={reservationInfoDialog.open}
                        onReserve={reserveDialog.open}
                    />
                </Container>
                <ReservationInfoDialogContainer
                    isOpen={reservationInfoDialog.isOpen}
                    onClose={reservationInfoDialog.close}
                    reservation={reservationInfoDialog.data}
                />
                <ReserveDialogContainer
                    isOpen={reserveDialog.isOpen}
                    onClose={reserveDialog.close}
                    onSuccess={reservationSuccessDialog.open}
                    reservation={reserveDialog.data}
                />
                <ReservationSuccessDialog
                    isOpen={reservationSuccessDialog.isOpen}
                    onClose={reservationSuccessDialog.close}
                />
            </main>
        </>
    )
}
