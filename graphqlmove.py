import os

os.remove("./miniprogram/api/gql/graphql.ts")
os.rename("./src/generated/graphql.ts", "./miniprogram/api/gql/graphql.ts")

os.rmdir("./src/generated/")
os.rmdir("./src/")

# gqls = os.listdir('./gql/');
# for gql in gqls:
#     os.remove("./gql/" + gql)

# os.rmdir("./gql/")
