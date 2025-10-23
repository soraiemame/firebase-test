import { Reservation } from '@/types'
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Stack,
    TextField,
    Typography
} from '@mui/material'
import { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import AutocompleteTag from './AutocompleteTag'
import { LoadingButton } from '@mui/lab'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

type ReserveDialogProps = {
    isOpen: boolean
    onClose: () => void
    reservation: Reservation | null
    onReserve: (newReservation: Reservation, password: string) => void
    isLoading: boolean
}

type ReserveFormData = {
    name: string
    purpose: string
    password: string
    companions: string[]
}

type TextFieldType = {
    name: keyof ReserveFormData
    label: string
}

const textFields: TextFieldType[] = [
    {
        name: 'name',
        label: '予約者氏名'
    },
    {
        name: 'purpose',
        label: '利用目的'
    },
    {
        name: 'password',
        label: 'キャンセル用パスワード'
    }
]

const ReserveDialog = ({
    isOpen,
    onClose,
    reservation,
    onReserve,
    isLoading
}: ReserveDialogProps) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<ReserveFormData>()

    const onSubmit: SubmitHandler<ReserveFormData> = (data) => {
        if (!reservation) {
            throw new Error('reservation is null')
        }
        const { password, ...rest } = data
        onReserve({ ...reservation, ...rest }, password)
    }

    useEffect(() => {
        if (isOpen) {
            reset({}, { keepValues: true })
        }
    }, [isOpen, reset])

    return (
        reservation && (
            <Dialog
                open={isOpen}
                onClose={onClose}
                keepMounted={isLoading}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle bgcolor="primary.main" color="white">
                    予約内容入力
                </DialogTitle>
                <Box sx={{ px: 4, pt: 3, pb: 1 }}>
                    <Typography variant="h5" gutterBottom align="right">
                        {reservation.date} {reservation.frame}
                    </Typography>
                    <Box
                        component="form"
                        id="reserve"
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {textFields.map(({ name, label }) => (
                            <Controller
                                name={name}
                                control={control}
                                rules={{
                                    required: `${label}を入力してください`,
                                    pattern: {
                                        value: /^[^,]+$/,
                                        message: '半角カンマは使用できません'
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextField
                                        type="text"
                                        label={label}
                                        error={!!errors[name]}
                                        helperText={errors[name]?.message}
                                        variant="standard"
                                        fullWidth
                                        margin="normal"
                                        onChange={onChange}
                                        value={value || ''}
                                        disabled={isLoading}
                                    />
                                )}
                                key={name}
                            />
                        ))}
                        <Controller
                            name="companions"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <AutocompleteTag
                                    textFieldProps={{
                                        label: '同伴者全員の氏名',
                                        variant: 'standard',
                                        margin: 'normal',
                                        helperText: '改行で複数追加'
                                    }}
                                    onChange={onChange}
                                    value={value || []}
                                    disabled={isLoading}
                                />
                            )}
                        />
                    </Box>
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        mt={3}
                        mb={1}
                        color="text.secondary"
                    >
                        <ErrorOutlineIcon />
                        <Typography variant="body2" align="justify">
                            予約を確定する前に必ず
                            <a href="https://www.gkuc.net/" target="_blank">
                                開館日程
                            </a>
                            を確認してください。
                        </Typography>
                    </Stack>
                </Box>
                <DialogActions>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <Button
                            onClick={() => {
                                reset()
                            }}
                            size="large"
                            disabled={isLoading}
                        >
                            クリア
                        </Button>
                        <Stack direction="row" spacing={1}>
                            <Button
                                onClick={onClose}
                                size="large"
                                disabled={isLoading}
                            >
                                閉じる
                            </Button>
                            <LoadingButton
                                type="submit"
                                form="reserve"
                                variant="contained"
                                size="large"
                                loading={isLoading}
                            >
                                予約
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </DialogActions>
            </Dialog>
        )
    )
}

export default ReserveDialog
