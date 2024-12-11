import { EntityRawMetadataOptions } from "@typedorm/common";

export type PartitionMetadata<TEntity> = Omit<EntityRawMetadataOptions<TEntity>, 'target'>;
