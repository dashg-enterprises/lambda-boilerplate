
export interface IRepository<TEntity> {
    find(query: Partial<TEntity>): Promise<TEntity[]>;
    findOne(query: Partial<TEntity>): Promise<TEntity | undefined>;
    create(entity: Partial<TEntity>): Promise<TEntity>;
}
