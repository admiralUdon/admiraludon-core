import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { appRoutes } from 'app.routes';
import { throttlerConfig } from 'app/config/throttler.config';
import { CoreService } from 'app/core/core.service';
import { HelloModule } from 'app/modules/hello/hello.module';
import { SkillModule } from 'app/modules/skill/skill.module';

@Module({
    imports: [
        // Config modules
        ConfigModule.forRoot({expandVariables: true}),
        ThrottlerModule.forRoot({ throttlers: throttlerConfig}),
        // Custom modules
        HelloModule,
        SkillModule,
        // Router modules0
        RouterModule.register(appRoutes)
    ],
    providers: [
        CoreService
    ]
})
export class AppModule {}
