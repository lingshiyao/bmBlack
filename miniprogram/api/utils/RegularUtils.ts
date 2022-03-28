export class RegularUtils {
    public static getMatchGroups(str: string, regex: RegExp): any[] {
        const matches: any[] = [];
        let match: RegExpExecArray | null;
        while ((match = regex.exec(str))) {
            matches.push(match[1]);
        }
        return matches;
    }
}
