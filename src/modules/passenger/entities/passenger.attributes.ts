import {
  AttributeDefinition,
  KeySchemaElement,
  LocalSecondaryIndex,
  KeyType,
  GlobalSecondaryIndex,
} from '@aws-sdk/client-dynamodb';

// Enum for attribute names and types to ensure consistent usage
enum AttributeName {
  ID = 'id',
  IMAGE = 'image',
  CPF = 'cpf',
  NAME = 'name',
  JUSTIFICATIONTYPE = 'justificationType',
  JUSTIFICATIONDETAILS = 'justificationDetails',
  CREATEDAT = 'createdAt',
  UPDATEDAT = 'updatedAt',
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

// Helper function for creating a global secondary index
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

// Main table key schema definition (using createdAt as the RANGE key now)
export const passengerKeyAttributes: KeySchemaElement[] = createKeySchema(
  AttributeName.ID, // Partition key (ID)
  AttributeName.CREATEDAT, // Range key (createdAt)
);

// Global secondary indexes
export const passengerGlobalSecondaryIndexes: GlobalSecondaryIndex[] = [
  createGlobalSecondaryIndex(
    'name-index',
    AttributeName.ID,
    AttributeName.NAME,
  ),
  createGlobalSecondaryIndex(
    'cpf-index',
    AttributeName.CPF,
    AttributeName.CREATEDAT,
  ),
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
export const passengerKeyAttributes: KeySchemaElement[] = createKeySchema(
  AttributeName.ID,
  AttributeName.CPF,
);

// Global secondary indexes
export const passengerLocalSecondaryIndexes: LocalSecondaryIndex[] = [
  createSecondaryIndex(
    'createdAt-index',
    AttributeName.ID,
    AttributeName.CREATEDAT, // CreatedAt is now the range key
  ),
  createSecondaryIndex(
    'updatedAt-index',
    AttributeName.ID,
    AttributeName.UPDATEDAT,
  ),
  createSecondaryIndex('image-index', AttributeName.ID, AttributeName.IMAGE),
  createSecondaryIndex(
    'justificationType-index',
    AttributeName.ID,
    AttributeName.JUSTIFICATIONTYPE,
  ),
  createSecondaryIndex(
    'justificationDetails-index',
    AttributeName.ID,
    AttributeName.JUSTIFICATIONDETAILS,
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
export const passengerAttributes: AttributeDefinition[] = [
  createAttributeDefinition(AttributeName.ID, AttributeType.String),
  createAttributeDefinition(AttributeName.NAME, AttributeType.String),
  createAttributeDefinition(AttributeName.CREATEDAT, AttributeType.String),
  createAttributeDefinition(AttributeName.UPDATEDAT, AttributeType.String),
  createAttributeDefinition(AttributeName.IMAGE, AttributeType.String),
  createAttributeDefinition(AttributeName.CPF, AttributeType.String),
  createAttributeDefinition(
    AttributeName.JUSTIFICATIONTYPE,
    AttributeType.String,
  ),
  createAttributeDefinition(
    AttributeName.JUSTIFICATIONDETAILS,
    AttributeType.String,
  ),
];
