print("aa")
filename = "./miniprogram/api/gql/graphql.ts"
with open(filename, encoding='utf-8', mode = 'r') as f:
    lines = f.readlines()
    print(lines)
with open(filename, encoding='utf-8', mode = "w") as f:
    for line in lines:
        if line.strip("\n") != "import gql from 'graphql-tag';":
            f.write(line)    
        else:
            f.write("export function gql(result: string):string {return result[0];}\n")