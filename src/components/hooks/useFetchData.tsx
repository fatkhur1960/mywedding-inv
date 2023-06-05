import { useFirestore, useFirestoreCollection } from 'reactfire';

import {
    collection,
    CollectionReference,
    limit,
    orderBy,
    startAfter,
    query,
    QueryConstraint,
    DocumentData,
} from 'firebase/firestore';

function useFetchData(
    params: {
        cursor: any;
        itemsPerPage: number;
    }
) {
    const firestore = useFirestore();

    // collection path
    const greetingsCollection = 'greetings';

    // we order greetings by the "ts" property
    const order = orderBy('ts', 'desc');

    // create default constraints
    const constraints: QueryConstraint[] = [
        order,
        limit(params.itemsPerPage),
    ];

    // if cursor is not undefined (e.g. not initial query)
    // we pass it as a constraint
    if (params.cursor) {
        constraints.push(
            startAfter(params.cursor)
        );
    }

    const collectionRef = collection(
        firestore,
        greetingsCollection
    ) as CollectionReference<DocumentData>;

    const greetingsQuery = query(collectionRef, ...constraints);

    return useFirestoreCollection(greetingsQuery, {
        idField: 'id',
    });
}

export default useFetchData;