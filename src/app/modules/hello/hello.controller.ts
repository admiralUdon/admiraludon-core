import { Controller, Get, HttpStatus, Query, Request } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { DefaultHttpResponse } from 'app/shared/custom/http-response/default.http-response';

@Controller()
export class HelloController {
    
    @Get()
    @ApiOperation({ summary: "Display Hello", description: "A simple greeting API that returns a friendly \"Hello, World!\" message when accessed. It serves as a basic example or placeholder for API testing and demonstration purposes" })
    getHello(
        @Request() request, 
        @Query('name') message: string
    ) {
        const response = new DefaultHttpResponse({
            code: 'OK',
            message: 'API call successfull',
            additionalMessage: 'Git Gud',
            statusCode: HttpStatus.OK,
            data: {
                message
            }
        });
        request.res.statusCode = response.statusCode;
        return response;
    }
}
