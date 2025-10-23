import { UseTimetable } from '@/services/use-timetable'
import { css } from '@emotion/react'
import {
    Box,
    CircularProgress,
    LinearProgress,
    Typography
} from '@mui/material'
import TimetableItem, { TimetableCallbackProps } from './TimetableItem'

type TimetableViewProps = UseTimetable & TimetableCallbackProps

const TimetableView = ({
    timetable,
    isLoading,
    isFetching,
    ...callbacks
}: TimetableViewProps) => {
    return (
        <>
            {isLoading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress thickness={4} size={32} />
                </Box>
            )}
            {timetable && (
                <>
                    {isFetching && <LinearProgress sx={{ mt: -0.5 }} />}
                    <div css={tableWrapperStyle}>
                        <table css={tableStyle}>
                            <tbody>
                                <tr>
                                    <th css={tableRowHeadingStyle(2)} />
                                    {timetable.dates.map((date) => (
                                        <th
                                            key={date}
                                            css={tableColumnHeadingStyle(1)}
                                        >
                                            <Typography variant="subtitle1">
                                                <b>{date}</b>
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                                {timetable.frames.map((frame, row) => (
                                    <tr key={frame}>
                                        <th css={tableRowHeadingStyle(1)}>
                                            <Typography
                                                variant="subtitle1"
                                                textAlign="left"
                                            >
                                                <b>{frame}</b>
                                            </Typography>
                                        </th>
                                        {timetable.reservations[row].map(
                                            (reservation, col) => (
                                                <td
                                                    key={col}
                                                    css={tableItemStyle}
                                                >
                                                    <TimetableItem
                                                        reservation={
                                                            reservation
                                                        }
                                                        {...callbacks}
                                                    />
                                                </td>
                                            )
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    )
}

const tableWrapperStyle = css`
    overflow: auto;
    max-width: 100%;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid #909090;
    background-color: #909090;
    height: 70vh;
`

const tableStyle = css`
    border-collapse: collapse;
    border-spacing: 0;
    margin-right: auto;
    margin-left: auto;
    border-collapse: collapse;
    border: none;
`

const tableHeadingStyle = (zIndex: number) => css`
    position: sticky;
    top: 0;
    left: 0;
    height: 48px;
    border: none;
    border-left: 1px solid #909090;
    border-top: 1px solid #909090;
    background-color: white;
    &::before {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        width: 100%;
        height: 100%;
        border: 1px solid #909090;
        box-sizing: initial;
    }
    &:first-of-type {
        border-left: none;
    }
    tr:first-of-type & {
        border-top: none;
    }
    z-index: ${zIndex};
`

const tableColumnHeadingStyle = (zIndex: number) => css`
    ${tableHeadingStyle(zIndex)}
    background-color: #424242;
    color: white;
    text-align: left;
    padding-left: 16px;
`

const tableRowHeadingStyle = (zIndex: number) => css`
    ${tableHeadingStyle(zIndex)}
    padding: 0px 16px;
`

const tableItemStyle = css`
    padding: 5px;
    border: 1px solid #909090;
    background-color: white;
    &:first-of-type {
        border-left: none;
    }
    tr:first-of-type & {
        border-top: none;
    }
    tr:last-of-type & {
        border-bottom: none;
    }
`

export default TimetableView
