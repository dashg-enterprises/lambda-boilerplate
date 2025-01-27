import { PartitionMetadata } from '@dashg-enterprises/ddd-platform';
import {Attribute, Entity, AutoGenerateAttribute, INDEX_TYPE} from '@typedorm/common';
import {AUTO_GENERATE_ATTRIBUTE_STRATEGY} from '@typedorm/common';


export const ExampleMetadata = new PartitionMetadata<Example>({
  entityName: 'example',
  primaryKey: {
    partitionKeyName: 'userId',
    sortKeyName: 'id'
  },
  globalSecondaryIndexes: [{
    partitionKeyName: 'status',
    sortKeyName: 'name'
  }],
  localSecondaryIndexes: [{
    sortKeyName: 'updatedAt'
  }]
});  

@Entity(ExampleMetadata.decorate())
export class Example {
  @Attribute()
  id!: string;

  @Attribute()
  userId!: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  materializationId!: string;

  @Attribute()
  name!: string;

  @Attribute()
  status!: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.EPOCH_DATE,
    autoUpdate: true, // this will make this attribute and any indexes referencing it auto update for any write operation
  })
  updatedAt!: number;
}