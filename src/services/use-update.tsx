import { firebaseApp } from '@/libs/firebase'
import {
    getFirestore,
    doc,
    DocumentSnapshot,
    DocumentData
} from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'

const useUpdate = (updateCallback: () => void) => {
    const [value] = useDocument(doc(getFirestore(firebaseApp), 'update/hook'))
    const [followingValue, setFollowingValue] = useState<
        DocumentSnapshot<DocumentData, DocumentData> | undefined
    >(value)

    const onUpdate = useCallback(() => {
        setFollowingValue((currentValue) => {
            if (currentValue && value) {
                updateCallback()
            }
            return value
        })
    }, [value, updateCallback])

    useEffect(onUpdate, [onUpdate])
}

export default useUpdate
