export interface ValidatePassengerStrategy {
  validate: (justificationDetail: string) => Promise<boolean>;
}
