import { useToastContext } from '@/contexts/ToastContext'
import { Snackbar } from '@mui/material'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import React from 'react'

const _Alert: React.ForwardRefRenderFunction<HTMLDivElement, AlertProps> = (
    props,
    ref
) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(_Alert)

const Toast = () => {
    const {
        isOpen,
        props: { message, variant },
        handleClose
    } = useToastContext()

    const commonProps: React.ComponentProps<typeof Snackbar> = {
        open: isOpen,
        autoHideDuration: 5000,
        onClose: handleClose,
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
    }

    return (
        <>
            {variant == 'info' && (
                <Snackbar {...commonProps} message={message} />
            )}
            {variant == 'error' && (
                <Snackbar {...commonProps}>
                    <Alert severity="error">{message}</Alert>
                </Snackbar>
            )}
        </>
    )
}

export default Toast
