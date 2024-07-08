import { Module } from '@nestjs/common';
import { SkillServiceModule } from 'app/core/services/skill/skill.module';
import { UserServiceModule } from 'app/core/services/user/user.module';
import { SkillController } from 'app/modules/skill/skill.controller';

@Module({
  imports       : [UserServiceModule, SkillServiceModule],
  controllers   : [SkillController],
})
export class SkillModule {}