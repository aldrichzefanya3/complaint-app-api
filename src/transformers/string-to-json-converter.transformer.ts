export class StringToJsonConverter {
    to(value: string): string {
        return value;
    }
    from(value: string): string {
        return JSON.parse(value);
    }
}
