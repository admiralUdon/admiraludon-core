import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";

export class SkillQueryParam {
    @ApiProperty({example: "john.doe@example.com", required: false})
    @IsOptional()
    @IsEmail()
    username: string;
}

export class SkillPositionBody {
    @ApiProperty({example: 5, required: true})
    @IsNotEmpty()
    @IsNumber()
    top: number;

    @ApiProperty({example: 15, required: true})
    @IsNotEmpty()
    @IsNumber()
    left: number;
}

export class SkillImageBody {
    @ApiProperty({example: "w-30 lg:w-44", required: true})
    @IsNotEmpty()
    @IsString()
    class: string;

    @ApiProperty({example: "assets/images/icons/angular-logo.png", required: true})
    @IsNotEmpty()
    @IsString()
    src: string;

    @ApiProperty({type: SkillPositionBody, required: true})
    @ValidateNested()
    @Type(() => SkillPositionBody)
    @IsObject()
    initial: SkillPositionBody;

    @ApiProperty({type: SkillPositionBody, required: true})
    @ValidateNested()
    @Type(() => SkillPositionBody)
    @IsObject()
    movement: SkillPositionBody;
}

export class CreateSkillBody {
    @ApiProperty({example: "john.doe@example.com", required: false})
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @ApiProperty({example: "angular", required: true})
    @IsString()
    @IsNotEmpty()
    tag: string;

    @ApiProperty({example: "Angular", required: true})
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({type: SkillImageBody, required: true})
    @ValidateNested()
    @Type(() => SkillImageBody)
    @IsObject()
    image: SkillImageBody;
  
    @ApiProperty({example: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", required: true})
    @IsString()
    @IsNotEmpty()
    remarks: string;
}