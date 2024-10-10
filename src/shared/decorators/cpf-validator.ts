import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCpfValidConstraint implements ValidatorConstraintInterface {
  validate(cpf: string) {
    // Remove any non-numeric characters
    cpf = cpf.replace(/\D/g, '');

    // CPF must be 11 digits long
    if (cpf.length !== 11) return false;

    // Check if all digits are the same (invalid CPF)
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Validate first check digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let checkDigit = 11 - (sum % 11);
    if (checkDigit >= 10) checkDigit = 0;
    if (checkDigit !== parseInt(cpf.charAt(9))) return false;

    // Validate second check digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    checkDigit = 11 - (sum % 11);
    if (checkDigit >= 10) checkDigit = 0;
    if (checkDigit !== parseInt(cpf.charAt(10))) return false;

    return true;
  }

  defaultMessage() {
    return 'CPF is not valid';
  }
}

export function IsCpfValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfValidConstraint,
    });
  };
}
