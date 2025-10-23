import { PostRequest, PostResponse, Reservation } from '@/types'
import fetcher from '@/utils/fetcher'
import { useMutation } from '@tanstack/react-query'

type UseCancelerProps = {
    onSuccess: () => void
    onError: (message: string) => void
}

type CancelerParams = {
    reservation: Reservation
    password: string
}

type UseCanceler = {
    cancel: (params: CancelerParams) => void
    isLoading: boolean
}

const useCanceler = (
    apiUrl: string,
    { onSuccess, onError }: UseCancelerProps
): UseCanceler => {
    const postFn = async (params: CancelerParams) => {
        const res: PostResponse = await fetcher.post<PostRequest>(apiUrl, {
            action: 'cancel',
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

    return { cancel: mutate, isLoading }
}

export default useCanceler
