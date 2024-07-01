import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'customText', async: false })
export class CPFValidate implements ValidatorConstraintInterface {
    validadeSizeAndSameDigits(str: string, size: number): boolean {
        return !(str.length !== size || /^(\d)\1+$/.test(str))
    }
    sumElements(str: string, index: number): number {
        let sum: number = 0
        let weight: number = 9
        for (let i = index; i >= 0; i--) {
            sum += parseInt(str.charAt(i)) * weight--
        }
        return sum
    }
    validate(text: string, args: ValidationArguments) {
        if (!text) return false
        const strCPF = String(text).replace(/[^\d]+/g, '')
        if (!this.validadeSizeAndSameDigits(strCPF, 11)) return false
        const sum1: number = this.sumElements(strCPF, 8)
        const sum2: number = this.sumElements(strCPF, 9)

        let digit1 = sum1 % 11
        digit1 = digit1 === 10 ? 0 : digit1 * 10

        let digit2 = sum2 % 11
        digit2 = digit2 === 10 ? 0 : digit2

        return digit1 + digit2 === parseInt(strCPF.charAt(9) + strCPF.charAt(10))
    }

    defaultMessage(args: ValidationArguments) {
        // here you can provide default error message if validation failed
        return 'The CPF number ($value) is not a valid number!';
    }
}
