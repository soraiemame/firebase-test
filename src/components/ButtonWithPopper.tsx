import { Button, ClickAwayListener, Fade, Popper } from '@mui/material'
import { ComponentProps, ReactElement, useState } from 'react'

type ButtonWithPopperProps = {
    popperContent: ReactElement
    popperProps?: Omit<ComponentProps<typeof Popper>, 'open'>
    keepPopperMounted?: boolean
} & ComponentProps<typeof Button>

const ButtonWithPopper = ({
    children,
    popperContent,
    popperProps,
    keepPopperMounted,
    ...buttonProps
}: ButtonWithPopperProps) => {
    const [open, setOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (open && keepPopperMounted) {
            return
        }
        setAnchorEl(event.currentTarget)
        setOpen((previousOpen) => !previousOpen)
    }

    return (
        <>
            <Button onClick={handleClick} {...buttonProps}>
                {children}
            </Button>
            <Popper open={open} anchorEl={anchorEl} transition {...popperProps}>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={100}>
                        <div>
                            <ClickAwayListener
                                onClickAway={() => setOpen(false)}
                            >
                                {popperContent}
                            </ClickAwayListener>
                        </div>
                    </Fade>
                )}
            </Popper>
        </>
    )
}

export default ButtonWithPopper
