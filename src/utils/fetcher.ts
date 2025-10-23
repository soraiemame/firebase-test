const post = async <T>(apiUrl: string, body: T) => {
    const response = await fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(body)
    })
    if (!response.ok) {
        throw new Error('Failed request: invalid response')
    }
    return response.json()
}

const fetcher = {
    post
}

export default fetcher
