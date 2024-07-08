import { Module } from '@nestjs/common';
import { PrismaService } from 'app/core/providers/prisma/prisma.service';
import { SkillService } from 'app/core/services/skill/skill.service';

@Module({
    providers: [
        SkillService,
        PrismaService
    ],
    exports: [SkillService],
})
export class SkillServiceModule {}