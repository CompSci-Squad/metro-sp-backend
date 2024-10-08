import {
	registerDecorator,
	ValidationArguments,
	ValidationOptions,
} from "class-validator";

export function IsLatitude(validationOptions?: ValidationOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: "isLatitude",
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					return typeof value === "number" && value >= -90 && value <= 90;
				},
				defaultMessage(args: ValidationArguments) {
					return "Latitude must be a number between -90 and 90";
				},
			},
		});
	};
}
