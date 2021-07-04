import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { waitFor, prettyDOM } from '@testing-library/dom';
import {MockedProvider} from '@apollo/react-testing'
import { GraphQLRequest, FetchResult } from '@apollo/client';
import { ResultFunction } from '@apollo/client/utilities/testing/mocking/mockLink';
import ApolloComponent, { GET_OBJECT_WITH_ARRAY } from './ApolloComponent';
import { RenderResult } from '@testing-library/react';


describe('ApolloComponent', () => {
    it('should render nothing done yet with MockedProvider', () => {
        const comp = render(<MockedProvider mocks={[getObjectWithArrayMockData.success[0]]}>
            <ApolloComponent/>
        </MockedProvider>);
        comp.getByText('NOTHING DONE YET');
    });

    //Test demonstrating the minimum object we need to return MUST satisfy the full gql query (although order doesn't seem to matter)
    it('should keep re-rendering until objectList shows up', async () => {
        const comp: RenderResult = render(<MockedProvider mocks={[getObjectWithArrayMockData.success[1]]}>
            <ApolloComponent />
        </MockedProvider>);
        
        //Line below hangs 2+ minutes
        // await act(() => waitFor(() => { fireEvent.click(comp.getByText('Click to execute lazy query :)')) }));
        
        //Block below fails with query saying it was called once on the dom, but no console log saying we completed the query before test ends.
        // fireEvent.click(comp.getByText('Click to execute lazy query :)'))
        // console.log(prettyDOM(comp.container))
        // comp.getByText(/mocked object id 1/);

        fireEvent.click(comp.getByText('Click to execute lazy query :)'));
        await comp.findByText(/mocked object id 1/);
        await comp.findByText(/mocked subId 1/);
        await comp.findByText("lazyQuery has been called: 4 times!");

    });
    
})


interface MockQueryEntry<T> {
    request: GraphQLRequest;
    newData?: ResultFunction<FetchResult<T>>;
    result?: FetchResult<T>;
    error?: Error
}

interface MockQueryData<T> {
    success: MockQueryEntry<T>[]
    error?: [MockQueryEntry<T>]
}

const getObjectWithArrayMockData: MockQueryData<any> = {
    success: [{
        request: {
            query: GET_OBJECT_WITH_ARRAY,
            variables: {}
        },
        newData: jest.fn().mockImplementation(() => fullData)
    }, {
            request: {
            query: GET_OBJECT_WITH_ARRAY,
            variables: {}
            },
            newData: jest.fn().mockImplementation(() => {
                console.log("JEST MOCK IMPLEMENTATION RETURNING DATA WITH ALL THE DATA")
                return fullData
            })
                .mockImplementationOnce(() => {
                    console.log("JEST MOCK IMPLEMENTATION RETURNING DATA WITH NOTHING INSIDE")
                    return dataWithNothingInside
                })
                .mockImplementationOnce(() => {
                    console.log("JEST MOCK IMPLEMENTATION RETURNING DATA WITH ONLY OBJECTID")
                    return dataWithIdOnly;
                })
                .mockImplementationOnce(() => {
                    console.log("JEST MOCK IMPLEMENTATION RETURNING DATA WITH OBJECTID AND EMPTY ARRAY FOR LIST")
                    return dataWithIdAndEmptyArray;
                })
                .mockImplementationOnce(() => {
                    console.log("JEST MOCK IMPLEMENTATION RETURNING DATA WITH ALL DATA BUT WRONG ORDER")
                    return fullDataInWrongOrder;
                })
    }
    ]
};


const dataWithNothingInside = {
    data: {}
};

const dataWithIdOnly = {
    data: {
        getObjectWithArray: {
            objectId: 'mocked object id 1'
        }
    }
};

const dataWithIdAndEmptyArray = {
    data: {
        getObjectWithArray: {
            objectId: 'mocked object id 1',
            objectList: []
        }
    }
};


const fullData = {
    data: {
        getObjectWithArray: {
            objectId: 'mocked object id 1',
            objectList: [{
                subOjectId: 'mocked subId 1',
                subObjectName: 'mocked Name 1',
                subObjectDescription: 'mocked descr 1'
            }]
        }
    }
};

const fullDataInWrongOrder = {
    data: {
        getObjectWithArray: {
            objectList: [{
                subObjectName: 'mocked Name 1',
                subObjectDescription: 'mocked descr 1',
                subOjectId: 'mocked subId 1' //this is first in the array objects in query
            }],
            objectId: 'mocked object id 1' //this is first in query root level object
        }
    }
}
