export class ToFormattedNumberValueConverter {
    toView(value) {
        return value.toLocaleString();
    }
}