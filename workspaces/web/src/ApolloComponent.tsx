import React, { Dispatch, SetStateAction, useState } from 'react';
import { useLazyQuery, gql, LazyQueryResult } from '@apollo/client';


interface ApolloComponentProps {
}

export const GET_OBJECT_WITH_ARRAY = gql`query {
    getObjectWithArray {
      objectId
      objectList {
        subOjectId
        subObjectName
        subObjectDescription
      }
    }
  }
`

const ApolloComponent: React.FC<ApolloComponentProps> = () => {
    
    const [completionCount, setCompletionCount] = useState(0);

    const [lazyQuery, result] = useLazyQuery(GET_OBJECT_WITH_ARRAY, {
        fetchPolicy: "network-only",
        // notifyOnNetworkStatusChange: true,
        onCompleted: res => {
            const completedCount = completionCount + 1;
            setCompletionCount(completedCount);
            console.log("We have completed the query " + completionCount + " times.");
            console.log("The result this time was " + JSON.stringify(res))
            if (!!(res && res.getObjectWithArray && res.getObjectWithArray.objectId && res.getObjectWithArray.objectList && res.getObjectWithArray.objectList[0])) {
                console.log("We did it! succesfully got all the data");
            } else {
                console.log("Not enough data returned yet!");
                executeLazyQuery();
            }
        }
    })

    let ResultComp;

    if (result.loading) {
        ResultComp = <p>LOADING!</p>
    } else if (result.error) {
        ResultComp = <p>ERROR! {JSON.stringify(result.error)}</p>
    } else if (result.data) {
        ResultComp = <p>
            {result.data.getObjectWithArray?.objectId}
            <br />
            {JSON.stringify(result.data.getObjectWithArray?.objectList)}
        </p>
    } else {
        ResultComp = <p>NOTHING DONE YET</p>
    }

    const executeLazyQuery = () => {
        lazyQuery();
    }

    const startPollingIfResult = (res: LazyQueryResult<any, any>) => {
        if (!!res)
            //@ts-ignore
            res.startPolling(500);
    }
    const stopPollingIfResult = (res: LazyQueryResult<any, any>) => {
        if (!!res)
            //@ts-ignore
            res.stopPolling(500);
    }

    return (
        <div>
            <button onClick={() => executeLazyQuery()}>Click to execute lazy query :)</button>
            <h3>
                The query came back with:
            </h3>
            <span>
            {ResultComp}
            </span>
            <p>
                lazyQuery has been called: {completionCount} times!
            </p>
            <p>Polling test section:</p>
            <button onClick={() => startPollingIfResult(result)}>Start Polling</button>
            <button onClick={() => stopPollingIfResult(result)}>Stop Polling</button>
            <br/>
        </div>
    )
}

export default ApolloComponent;