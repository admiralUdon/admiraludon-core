import { Routes } from "@nestjs/core";
import { HelloModule } from "app/modules/hello/hello.module";
import { SkillModule } from "app/modules/skill/skill.module";

export const appRoutes: Routes = [
    {
        path: 'api',
        children: [
            { path: 'hello', module: HelloModule },
            { path: 'skill', module: SkillModule },
        ]
    }
]