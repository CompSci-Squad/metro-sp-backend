import {
  AttributeDefinition,
  KeySchemaElement,
  LocalSecondaryIndex,
  KeyType,
} from '@aws-sdk/client-dynamodb';

// Enum for attribute names and types to ensure consistent usage
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

// Helper function for creating a key schema
const createKeySchema = (
  hashKey: AttributeName,
  rangeKey?: AttributeName,
): KeySchemaElement[] => [
  { AttributeName: hashKey, KeyType: 'HASH' as KeyType },
  ...(rangeKey
    ? [{ AttributeName: rangeKey, KeyType: 'RANGE' as KeyType }]
    : []),
];

// Helper function for creating a local secondary index
const createSecondaryIndex = (
  indexName: string,
  hashKey: AttributeName,
  rangeKey: AttributeName,
): LocalSecondaryIndex => ({
  IndexName: indexName,
  KeySchema: createKeySchema(hashKey, rangeKey),
  Projection: { ProjectionType: 'ALL' },
});

// Main table key schema definition
export const logKeyAttributes: KeySchemaElement[] = createKeySchema(
  AttributeName.ID,
  AttributeName.TIMESTAMP,
);

// Global secondary indexes
export const logGlobalSecondaryIndexes: LocalSecondaryIndex[] = [
  createSecondaryIndex('level-index', AttributeName.ID, AttributeName.LEVEL),
  createSecondaryIndex(
    'message-index',
    AttributeName.ID,
    AttributeName.MESSAGE,
  ),
];

// Helper function to create attribute definitions
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
