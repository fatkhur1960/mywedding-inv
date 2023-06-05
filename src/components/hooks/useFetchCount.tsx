import { useCallback } from 'react';
import { useFirestore } from 'reactfire';

import {
    getCountFromServer,
    query,
    collection,
    CollectionReference,
    DocumentData,
} from 'firebase/firestore';

const greetingsCollection = 'greetings';

function useFetchCount() {
    const firestore = useFirestore();

    return useCallback(
        () => {
            const collectionRef = collection(
                firestore,
                greetingsCollection
            ) as CollectionReference<DocumentData>;

            return getCountFromServer(query(collectionRef));
        },
        [firestore]
    );
}

export default useFetchCount;