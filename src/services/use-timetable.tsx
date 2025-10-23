import { Timetable } from '@/types'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useUpdate from './use-update'

export type UseTimetable = {
    timetable?: Timetable
    isLoading: boolean
    isFetching: boolean
}

const useTimetable = (apiUrl: string): UseTimetable => {
    const {
        data: timetable,
        isLoading,
        isFetching,
        refetch
    } = useQuery<Timetable>(['timetable'], () =>
        axios.get(apiUrl).then((res) => res.data)
    )
    useUpdate(refetch)

    return { timetable, isLoading, isFetching }
}

export default useTimetable
