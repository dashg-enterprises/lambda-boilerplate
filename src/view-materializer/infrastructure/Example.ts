import {Attribute, Entity, AutoGenerateAttribute, INDEX_TYPE} from '@typedorm/common';
import {AUTO_GENERATE_ATTRIBUTE_STRATEGY} from '@typedorm/common';

@Entity({
  name: 'example',
  primaryKey: {
    partitionKey: 'EXAMPLE#{{userId}}',
    sortKey: 'EXAMPLE#{{id}}',
  },
  indexes: {
    // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
    GSI1: {
      partitionKey: 'EXAMPLE#{{userId}}#STATUS#{{status}}',
      sortKey: 'EXAMPLE#{{userId}}#NAME#{{name}}',
      type: INDEX_TYPE.GSI,
    },
    // specify LSI1 key
    LSI1: {
      sortKey: 'UPDATED_AT#{{updatedAt}}',
      type: INDEX_TYPE.LSI,
    },
  },
})
export class Example {
  @Attribute()
  id!: string;

  @Attribute()
  userId!: string;

  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  snapshotId!: string;

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