import { IsInt, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
  @ApiProperty({ description: "Pages to skip", nullable: false })
  @IsInt()
  @Min(0)
  skip: number;

  @ApiProperty({ description: "Orders per page", nullable: false })
  @IsInt()
  @Min(1)
  take: number;
}