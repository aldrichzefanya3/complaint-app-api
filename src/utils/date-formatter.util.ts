export class DateFormatter {
    static getTimestamp(): number {
        return Math.round(new Date().getTime() / 1000);
    }
}
