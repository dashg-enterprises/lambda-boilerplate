import { EntityAttributes } from "@typedorm/common";
import { EntityManagerFindOneOptions, EntityManagerFindOptions, ScanManagerFindOptions } from "@typedorm/core";
import { PickOne } from "./PickOne";
import { Paginated } from "../../view-api/presentation/base/Paginated";

export interface IRepository<
    TEntity,
    TPartitionKey extends PickOne<TEntity>,
    TSortKey extends PickOne<TEntity>
> {
    findOne(byKeys: TSortKey & TPartitionKey, withOptions?: EntityManagerFindOneOptions<TEntity> | undefined): Promise<TEntity | undefined>;
    find(byKeys: TPartitionKey, withOptions?: EntityManagerFindOptions<TEntity, string | Partial<EntityAttributes<TEntity>>> | undefined): Promise<TEntity[]>;
    page(byKey: TPartitionKey, withOptions: EntityManagerFindOptions<TEntity, string | Partial<EntityAttributes<TEntity>>> | undefined): Promise<Paginated<TEntity>>;
    scan(withOptions: ScanManagerFindOptions<TEntity> | undefined): Promise<TEntity[]>;
    create(entity: Partial<TEntity>): Promise<TEntity>;
}