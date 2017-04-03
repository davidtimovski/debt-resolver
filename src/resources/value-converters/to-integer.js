export class ToIntegerValueConverter {
    fromView(value) {
        let converted = Number(value);
        if (isNaN(converted)) {
            return 0;
        }
        return converted;
    }
}