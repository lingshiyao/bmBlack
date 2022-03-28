import os

os.remove("./gql/mutations/index.js")
os.remove("./gql/queries/index.js")
os.remove("./gql/index.js")
mutations = os.listdir('./gql/mutations/');
for mutation in mutations:
    os.rename("./gql/mutations/" + mutation, "./gql/" + mutation)
    
queries = os.listdir('./gql/queries/');
for query in queries:
    os.rename("./gql/queries/" + query, "./gql/" + query)

os.rmdir("./gql/mutations/")
os.rmdir("./gql/queries/")
