import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Stack,
    Typography
} from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

type ReservationInfoDialogProps = {
    isOpen: boolean
    onClose: () => void
}

const ReservationSuccessDialog = ({
    isOpen,
    onClose
}: ReservationInfoDialogProps) => {
    return (
        <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="xs">
            <DialogContent sx={{ py: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" my={3}>
                    <CheckCircleOutlineIcon color="primary" />
                    <Typography variant="h6" align="justify">
                        <b>予約が完了しました。</b>
                    </Typography>
                </Stack>
                <Typography
                    variant="body2"
                    align="justify"
                    color="text.secondary"
                >
                    【 注意喚起 】<br />
                    予約を取りすぎていませんか？
                    他の音感人を思いやり、節度ある予約を心がけましょう。
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReservationSuccessDialog
