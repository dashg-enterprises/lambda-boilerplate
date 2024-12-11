export interface Paginated<T = object[]> {
    results: T[];
    cursor: number;
    resultsPerPage: number;
    totalPages: number;
    totalResults: number;
}
