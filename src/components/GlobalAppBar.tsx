import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import LaunchIcon from '@mui/icons-material/Launch'

const GlobalAppBar = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, fontSize: '1.1rem' }}
                    >
                        <b>東大音感</b> AR予約システム
                    </Typography>
                    <Button
                        color="inherit"
                        variant="outlined"
                        endIcon={<LaunchIcon />}
                        href="https://www.gkuc.net/"
                        target="_blank"
                    >
                        開館日程
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default GlobalAppBar
