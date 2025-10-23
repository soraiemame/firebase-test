import { Reservation } from '@/types'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Paper,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import InfoTable from './InfoTable'
import ButtonWithPopper from './ButtonWithPopper'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'

type ReservationInfoDialogProps = {
    isOpen: boolean
    onClose: () => void
    reservation: Reservation | null
    onCancel: (reservation: Reservation, password: string) => void
    isLoadingCancellation: boolean
}

const ReservationInfoDialog = ({
    isOpen,
    onClose,
    reservation,
    onCancel,
    isLoadingCancellation
}: ReservationInfoDialogProps) => {
    return (
        reservation && (
            <Dialog
                open={isOpen}
                onClose={onClose}
                keepMounted={isLoadingCancellation}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle bgcolor="primary.main" color="white">
                    予約情報
                </DialogTitle>
                <Box sx={{ px: 4, pt: 3, pb: 1 }}>
                    <Typography variant="h5" gutterBottom align="right">
                        {reservation.date} {reservation.frame}
                    </Typography>
                    <InfoTable
                        items={[
                            {
                                header: '予約者',
                                content: reservation.name
                            },
                            {
                                header: '利用目的',
                                content: reservation.purpose
                            },
                            {
                                header: '同伴者',
                                content: reservation.companions.join('、')
                            }
                        ]}
                    />
                </Box>
                <DialogActions>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <CancelButton
                            onCancel={(password) =>
                                onCancel(reservation, password)
                            }
                            isLoadingCancellation={isLoadingCancellation}
                        />
                        <Button onClick={onClose}>閉じる</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        )
    )
}

type CancelButtonProps = {
    onCancel: (password: string) => void
    isLoadingCancellation: boolean
}

const CancelButton = ({
    onCancel,
    isLoadingCancellation
}: CancelButtonProps) => {
    const [password, setPassword] = useState('')

    const popperContent = (
        <Paper elevation={8} sx={{ px: 1.5, py: 2 }}>
            <Stack direction="row" spacing={2}>
                <TextField
                    label="キャンセル用パスワード"
                    size="small"
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={isLoadingCancellation}
                />
                <Box display="flex" justifyContent="end">
                    <LoadingButton
                        variant="contained"
                        onClick={() => onCancel(password)}
                        loading={isLoadingCancellation}
                    >
                        確定
                    </LoadingButton>
                </Box>
            </Stack>
        </Paper>
    )

    return (
        <ButtonWithPopper
            variant="outlined"
            startIcon={<DeleteIcon />}
            popperContent={popperContent}
            popperProps={{
                placement: 'bottom-start',
                sx: { zIndex: 2000, py: 1, pr: 1 },
                modifiers: [
                    {
                        name: 'flip',
                        enabled: false,
                        options: {
                            altBoundary: false,
                            rootBoundary: 'document',
                            padding: 8
                        }
                    },
                    {
                        name: 'preventOverflow',
                        enabled: true,
                        options: {
                            altAxis: true,
                            altBoundary: false,
                            tether: true,
                            rootBoundary: 'document',
                            padding: 8
                        }
                    }
                ]
            }}
            keepPopperMounted={isLoadingCancellation}
            disabled={isLoadingCancellation}
        >
            予約取消
        </ButtonWithPopper>
    )
}

export default ReservationInfoDialog
