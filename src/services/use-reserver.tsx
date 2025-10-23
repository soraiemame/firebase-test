import { PostRequest, PostResponse, Reservation } from '@/types'
import fetcher from '@/utils/fetcher'
import { useMutation } from '@tanstack/react-query'

type UseReserverProps = {
    onSuccess: () => void
    onError: (message: string) => void
}

type ReserverParams = {
    reservation: Reservation
    password: string
}

type UseReserver = {
    reserve: (params: ReserverParams) => void
    isLoading: boolean
}

const useReserver = (
    apiUrl: string,
    { onSuccess, onError }: UseReserverProps
): UseReserver => {
    const postFn = async (params: ReserverParams) => {
        const res: PostResponse = await fetcher.post<PostRequest>(apiUrl, {
            action: 'reserve',
            request: {
                ...params.reservation,
                password: params.password
            }
        })
        if (res.status === 'error') {
            throw new Error(res.message)
        }
        return res
    }

    const { isLoading, mutate } = useMutation(postFn, {
        onSuccess: onSuccess,
        onError: (error: Error) => onError(error.message)
    })

    return { reserve: mutate, isLoading }
}

export default useReserver
