import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }


    const object = plainToClass(metatype, value);

    if (metadata.type === "query") {
      for (const [key, val] of Object.entries(object)) {
        if (typeof val === "string" && !isNaN(Number(val))) {
          object[key] = Number(val);
        }
      }
    }

    const errors = await validate(object);

    if (errors.length > 0) {
      const errorMessages = errors.map(error => Object.values(error.constraints));
      throw new BadRequestException(errorMessages);
    }

    return object;
  }

  private toValidate(metatype: any): boolean {
    const typesToValidate = [String, Boolean, Number, Array, Object];
    return !typesToValidate.includes(metatype);
  }
}