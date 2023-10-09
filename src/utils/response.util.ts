import { DateFormatter } from './date-formatter.util';

export class ResponseFormatter {
    static response(data: any, res: any) {
        const result = {
            Data: data,
            TimeZone: 'UTC',
            EpochTime: DateFormatter.getTimestamp(),
        };

        return res.status(200).send(result);
    }

    static responseWithErrorMessage(errMessage: string, res: any) {
        const result = {
            Message: errMessage,
            TimeZone: 'UTC',
            EpochTime: DateFormatter.getTimestamp(),
        };

        return res.status(400).send(result);
    }
}
