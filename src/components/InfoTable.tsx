import { Box, Typography } from '@mui/material'

type InfoTableProps = {
    items: {
        header: string
        content: string
    }[]
}

const InfoTable = ({ items }: InfoTableProps) => {
    return (
        <Box
            component="table"
            sx={{
                borderCollapse: 'separate',
                borderSpacing: (theme) => theme.spacing(2),
                mx: -2
            }}
        >
            <tbody>
                {items.map((item) => (
                    <tr key={item.header}>
                        <Typography
                            component="th"
                            textAlign="left"
                            color="primary.main"
                            noWrap
                            sx={{
                                verticalAlign: 'top'
                            }}
                        >
                            <b>{item.header}</b>
                        </Typography>
                        <td>{item.content}</td>
                    </tr>
                ))}
            </tbody>
        </Box>
    )
}

export default InfoTable
