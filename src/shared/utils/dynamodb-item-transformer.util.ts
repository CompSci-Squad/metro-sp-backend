type DynamoDBItem = Record<string, { S: string }>;

export class DynamoDBItemTransformer {
  static transform(item: DynamoDBItem): Record<string, any>;
  static transform(items: DynamoDBItem[]): Record<string, any>[];
  static transform(
    itemOrItems: DynamoDBItem | DynamoDBItem[],
  ): Record<string, any> | Record<string, any>[] {
    if (Array.isArray(itemOrItems)) {
      return itemOrItems.map((item) => this.transformSingleItem(item));
    }
    return this.transformSingleItem(itemOrItems);
  }

  private static transformSingleItem(item: DynamoDBItem): Record<string, any> {
    return Object.entries(item).reduce(
      (acc, [key, value]) => {
        if ('S' in value) {
          acc[key] = value.S;
        }
        return acc;
      },
      {} as Record<string, any>,
    );
  }
}
