interface Paginated<T = object[]> {
    results: T[];
    page: number;
    pageSize: number;
    totalPages: number;
}
