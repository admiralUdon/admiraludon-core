import { Body, Controller, Get, HttpStatus, Post, Query, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkillService } from 'app/core/services/skill/skill.service';
import { CreateSkillBody, SkillQueryParam } from 'app/modules/skill/skill.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { DefaultHttpException } from 'app/shared/custom/http-exception/default.http-exception';
import { DefaultHttpResponse } from 'app/shared/custom/http-response/default.http-response';
import { UserService } from 'app/core/services/user/user.service';

@ApiTags("Skill")
@Controller()
export class SkillController {

    /**
     * Constructor
     */
    constructor(
        private readonly _skillService: SkillService,
        private readonly _userService: UserService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    
    @Get()
    @ApiOperation({ summary: "Display Skill", description: "A simple greeting API that returns a friendly \"Skill, World!\" message when accessed. It serves as a basic example or placeholder for API testing and demonstration purposes" })
    async getSkill(
        @Request() request, 
        @Query() query: SkillQueryParam
    ) {

        try {
            // Validate and transform the query parameters
            const queryObject = plainToClass(SkillQueryParam, query);
            const errors = await validate(queryObject);

            if (errors.length > 0){
                const getContraints = (error) => { return error.children?.length ? getContraints(error.children[0]) : error.constraints };
                const constraints = await getContraints(errors[0]);
                throw new DefaultHttpException({
                    message: constraints[Object.keys(constraints)[0]] ?? "Validation error",
                    statusCode: HttpStatus.BAD_REQUEST,
                    module: SkillController.name,
                    code: "INVALID_REQUEST",
                    // additionalMessage: errors
                })
            }

            const { username } = queryObject;

            const skills = await this._skillService.getSkillsOfUser({
                user: {
                    username
                }
            })

            const response = new DefaultHttpResponse({
                code: 'OK',
                message: 'API call successfull',
                additionalMessage: 'Git Gud',
                statusCode: HttpStatus.OK,
                data: {
                    skills
                }
            });
            request.res.statusCode = response.statusCode;
            return response;
        } catch (error) {
            throw new DefaultHttpException(error);
        }
    }

    @Post()
    @ApiOperation({ summary: "Display Skill", description: "A simple greeting API that returns a friendly \"Skill, World!\" message when accessed. It serves as a basic example or placeholder for API testing and demonstration purposes" })
    async createSkill(
        @Request() request, 
        @Body() body: CreateSkillBody
    ) {

        try {
            // Validate and transform the body parameters
            const bodyObject = plainToClass(CreateSkillBody, body);
            const errors = await validate(bodyObject);

            if (errors.length > 0){
                const getContraints = (error) => { return error.children?.length ? getContraints(error.children[0]) : error.constraints };
                const constraints = await getContraints(errors[0]);
                throw new DefaultHttpException({
                    message: constraints[Object.keys(constraints)[0]] ?? "Validation error",
                    statusCode: HttpStatus.BAD_REQUEST,
                    module: SkillController.name,
                    code: "INVALID_REQUEST",
                    // additionalMessage: errors
                });
            }

            const { username, tag, title, image, remarks } = bodyObject;
            const { src: imageUrl, class: imageClass, initial, movement } = image;
            const imageInitPos = `${initial.top},${initial.left}`;
            const imageMvmtPos = `${movement.top},${movement.left}`;

            const user = await this._userService.user({username});
            if (!user) {
                throw new DefaultHttpException({
                    message: "User not found",
                    statusCode: HttpStatus.NOT_FOUND
                })
            }

            const userSkill = await this._skillService.getSkill({ 
                tag, 
                title, 
                imageUrl, 
                imageClass, 
                imageInitPos, 
                imageMvmtPos, 
                remarks, 
                userId: user.id 
            });

            if (!userSkill) {
                throw new DefaultHttpException({
                    message: "User skill not found",
                    statusCode: HttpStatus.NOT_FOUND
                })
            }

            const response = new DefaultHttpResponse({
                code: 'OK',
                message: 'API call successfull',
                additionalMessage: 'Git Gud',
                statusCode: HttpStatus.OK,
                data: {
                    userSkill
                }
            });
            request.res.statusCode = response.statusCode;
            return response;
        } catch (error) {
            throw new DefaultHttpException(error);
        }
    }
}
