import {
  AttributeDefinition,
  KeySchemaElement,
  LocalSecondaryIndex,
  KeyType,
  GlobalSecondaryIndex,
} from '@aws-sdk/client-dynamodb';

enum AttributeName {
  ID = 'id',
  TIMESTAMP = 'timestamp',
  MESSAGE = 'message',
  LEVEL = 'level',
}

enum AttributeType {
  String = 'S',
  Number = 'N',
  Binary = 'B',
}

const createGlobalSecondaryIndex = (
  indexName: string,
  hashKey: AttributeName,
  rangeKey: AttributeName,
): GlobalSecondaryIndex => ({
  IndexName: indexName,
  KeySchema: createKeySchema(hashKey, rangeKey),
  Projection: { ProjectionType: 'ALL' },
  ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
});

const createKeySchema = (
  hashKey: AttributeName,
  rangeKey?: AttributeName,
): KeySchemaElement[] => [
  { AttributeName: hashKey, KeyType: 'HASH' as KeyType },
  ...(rangeKey
    ? [{ AttributeName: rangeKey, KeyType: 'RANGE' as KeyType }]
    : []),
];

const createSecondaryIndex = (
  indexName: string,
  hashKey: AttributeName,
  rangeKey: AttributeName,
): LocalSecondaryIndex => ({
  IndexName: indexName,
  KeySchema: createKeySchema(hashKey, rangeKey),
  Projection: { ProjectionType: 'ALL' },
});

export const logKeyAttributes: KeySchemaElement[] = createKeySchema(
  AttributeName.ID,
  AttributeName.TIMESTAMP,
);

export const logLocalSecondaryIndexes: LocalSecondaryIndex[] = [
  createSecondaryIndex('level-index', AttributeName.ID, AttributeName.LEVEL),
  createSecondaryIndex(
    'message-index',
    AttributeName.ID,
    AttributeName.MESSAGE,
  ),
];

export const logGlobalSecondaryIndexes: GlobalSecondaryIndex[] = [
  createGlobalSecondaryIndex(
    'global-level-index',
    AttributeName.ID,
    AttributeName.LEVEL,
  ),
];

const createAttributeDefinition = (
  name: AttributeName,
  type: AttributeType,
): AttributeDefinition => ({
  AttributeName: name,
  AttributeType: type,
});

// Attribute definitions for main table and indexes
export const logAttributes: AttributeDefinition[] = [
  createAttributeDefinition(AttributeName.ID, AttributeType.String),
  createAttributeDefinition(AttributeName.MESSAGE, AttributeType.String),
  createAttributeDefinition(AttributeName.TIMESTAMP, AttributeType.String),
  createAttributeDefinition(AttributeName.LEVEL, AttributeType.String),
];
