import { IResolvers } from 'graphql-tools';const resolverMap: IResolvers = {
    Query: {
      helloWorld(_: void, args: void): string {
    return `👋 Hello world! 👋`;
      },
        getObjectWithArray(_: void, args: void): MixedObjectWithArray {
            return {
                objectId: 'The objectID',
                objectList: [{
                    subObjectDescription: 'Some SubObjectDescription' + Date.now(),
                    subObjectName: 'Some SubObjectName',
                    subOjectId: 'Some SubObject ID'
                }]
            }
      }
    },
}; export default resolverMap;

interface SubObject {
subOjectId: string
subObjectName: string
subObjectDescription: string
}
interface MixedObjectWithArray {
    objectId: string
    objectList: SubObject[]
}
