import {
	AttributeDefinition,
	KeySchemaElement,
	LocalSecondaryIndex,
} from "@aws-sdk/client-dynamodb";

export const logKeyAttributes: KeySchemaElement[] = [
	{ AttributeName: "id", KeyType: "HASH" },
	{ AttributeName: "timestamp", KeyType: "RANGE" },
];

export const logGlobalSecondaryIndexes: LocalSecondaryIndex[] = [
	{
		IndexName: "level-index",
		KeySchema: [
			{ AttributeName: "id", KeyType: "HASH" },
			{ AttributeName: "level", KeyType: "RANGE" },
		],
		Projection: { ProjectionType: "ALL" },
	},
	{
		IndexName: "message-index",
		KeySchema: [
			{ AttributeName: "id", KeyType: "HASH" },
			{ AttributeName: "message", KeyType: "RANGE" },
		],
		Projection: { ProjectionType: "ALL" },
	},
];

export const logAttributes: AttributeDefinition[] = [
	{ AttributeName: "id", AttributeType: "S" },
	{
		AttributeName: "message",
		AttributeType: "S",
	},
	{
		AttributeName: "timestamp",
		AttributeType: "S",
	},
	{
		AttributeName: "level",
		AttributeType: "S",
	},
];
