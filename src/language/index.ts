interface translatable {
    description: string;
    value: string
}

// international takes the english version language values
// note in the future, we will look up other languages based on browser language
export function international(tr: translatable): string {
    return tr.value
}
