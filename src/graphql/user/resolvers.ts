const queries = {
  hello: async () => "Hello , how are you?",
};

const mutations = {
  createUser: async (_: any, {}: {}) => "random_id",
};

export const resolvers = { queries, mutations };
