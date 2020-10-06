export type AutoCompleteState<T> = {
    items: T[],
    filtered: T[],
    input: string,
    selected?: T,
    showOptions: Boolean,
}