import TimetableView from '@/components/TimetableView'
import useTimetable from '@/services/use-timetable'
import { TimetableCallbackProps } from '@/components/TimetableItem'
import ReadmeMessage from '@/components/ReadmeMessage'

const apiUrl = process.env.NEXT_PUBLIC_API_URL!

const TimetableViewContainer = (callbacks: TimetableCallbackProps) => {
    const { timetable, isLoading, isFetching } = useTimetable(apiUrl)

    return (
        <>
            <TimetableView
                timetable={timetable}
                isLoading={isLoading}
                isFetching={isFetching}
                {...callbacks}
            />
            {!isLoading && <ReadmeMessage />}
        </>
    )
}

export default TimetableViewContainer
