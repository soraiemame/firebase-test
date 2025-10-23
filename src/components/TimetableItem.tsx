import { Reservation } from '@/types'
import { Fade, IconButton } from '@mui/material'
import Box, { BoxProps } from '@mui/material/Box'
import { styled } from '@mui/system'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import AddCircleIcon from '@mui/icons-material/AddCircleOutline'

export type TimetableCallbackProps = {
    onShowInfo: (reservation: Reservation) => void
    onReserve: (reservation: Reservation) => void
}

type TimetableItemProps = {
    reservation: Reservation
} & TimetableCallbackProps

const TimetableItem = ({
    reservation,
    onShowInfo,
    onReserve
}: TimetableItemProps) => {
    return (
        <>
            {reservation.reserved && (
                <Fade in>
                    <ItemBox
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            justifyContent: 'space-between'
                        }}
                    >
                        {reservation.name}
                        <IconButton
                            onClick={() => onShowInfo(reservation)}
                            sx={{ color: 'white' }}
                        >
                            <InfoIcon />
                        </IconButton>
                    </ItemBox>
                </Fade>
            )}
            {!reservation.reserved && (
                <Fade in>
                    <ItemBox
                        sx={{
                            justifyContent: 'end'
                        }}
                    >
                        <IconButton
                            onClick={() => onReserve(reservation)}
                            sx={{ color: '#00000088' }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    </ItemBox>
                </Fade>
            )}
        </>
    )
}

const ItemBox = styled(Box)<BoxProps>(({ theme }) => ({
    borderRadius: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    width: 153,
    height: 48,
    display: 'flex',
    alignItems: 'center'
}))

export default TimetableItem
