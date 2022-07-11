import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';

const dummyData = {
  warriors: [
    { id: '001', name: 'Jaime' },
    { id: '002', name: 'Jorah' }
  ]
};

const typeDefs = `
type Warrior {
  id: ID!
  name: String!
}

type Query {
  warriors: [Warrior]
}
`
const resolvers = {
  Query: {
    warriors: (parent, args, context, info) => context.warriors
  }
};

const executableSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});
      

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/graphql',
  graphqlHTTP({
    schema: executableSchema,
    context: dummyData,
    graphiql: true
  })
);

app.listen(app.get('port'), () => {
  console.log(`The server is up and running on port ${app.get('port')}.`);
});
