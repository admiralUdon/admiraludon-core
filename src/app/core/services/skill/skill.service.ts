import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Skill, User, UserSkill } from '@prisma/client';
import { PrismaService } from 'app/core/providers/prisma/prisma.service';
import { UserSkill as UserSkillResponse } from 'app/core/services/skill/skill.types'

@Injectable()
export class SkillService {

    private readonly logger = new Logger(SkillService.name);

    /**
     * Constructor
     */
    constructor(
        private readonly _prismaService: PrismaService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private async skills(skillWhereInput: Prisma.SkillWhereInput): Promise<Skill[] | null> {
        const skills = await this._prismaService.skill.findMany({
            where: skillWhereInput,
        });
        this.logger.debug(skills);
        return skills.length ? skills : null;
    }

    private async skill(skillWhereInput: Prisma.SkillWhereUniqueInput): Promise<Skill | null>  {
        const skill = await this._prismaService.skill.findUnique({
            where: skillWhereInput,
        });
        this.logger.debug(skill);
        return skill ?? null;
    }

    private async createSkill(data: Prisma.SkillCreateInput): Promise<Skill> {
        return this._prismaService.skill.create({
            data,
        });
    }

    private async updateSkill(params: {
        where: Prisma.SkillWhereUniqueInput;
        data: Prisma.SkillUpdateInput;
    }): Promise<Skill> {
        const { where, data } = params;
        return this._prismaService.skill.update({
            data,
            where,
        });
    }

    private async deleteSkill(where: Prisma.SkillWhereUniqueInput): Promise<Skill> {
        return this._prismaService.skill.delete({
            where,
        });
    }

    private async userSkills(userSkillWhereInput: Prisma.UserSkillWhereInput) {
        const userSkills = await this._prismaService.userSkill.findMany({
            where: userSkillWhereInput,
            include: {
                skill: true
            }
        });

        return userSkills;
    }

    async createUserSkills(data: Prisma.UserSkillCreateInput): Promise<UserSkill> {
        return this._prismaService.userSkill.create({
            data
        });
    }

    private async updateUserSkills(params: {
        where: Prisma.SkillWhereUniqueInput;
        data: Prisma.SkillUpdateInput;
    }): Promise<Skill> {
        const { where, data } = params;
        return this._prismaService.skill.update({
            data,
            where,
        });
    }

    private async deleteUserSkills(where: Prisma.SkillWhereUniqueInput): Promise<Skill> {
        return this._prismaService.skill.delete({
            where,
        });
    }

    

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async getSkill(params: { 
        tag         : string;
        title       : string;
        imageUrl    : string;
        imageClass  : string;
        imageInitPos: string;
        imageMvmtPos: string;
        remarks     : string;
        userId      : string;
    }): Promise<UserSkillResponse | null> {

        const { tag, title, imageUrl, imageClass, imageInitPos, imageMvmtPos, remarks, userId } = params;

        // Check if the skill already exists by tag or title
        const existingSkill = await this.skill({ tag });
        const skill = existingSkill ?? await this.createSkill({
            tag,
            title,
            imageUrl,
            imageClass,
            imageInitPos,
            imageMvmtPos
        });

        // Create the UserSkill to link the skill and user
        const existingUserSkill = await this.userSkills({ userId: userId, skillId: skill.id});
        const userSkill = await this.createUserSkills({
            user: { connect: { id: userId } },
            skill: { connect: { id: skill.id } },
            remarks
        });

        const response: UserSkillResponse = (()=>{
            const { id, remarks, createdAt, updatedAt } = userSkill;
            const { tag, title, imageUrl, imageClass, imageInitPos, imageMvmtPos  } = skill;
            return {
                id, remarks, tag, title, 
                image: {
                    src: imageUrl,
                    class: imageClass,
                    initial: {
                        top: imageInitPos.split(",")[0],
                        left: imageInitPos.split(",")[1]
                    },
                    movement: {
                        top: imageMvmtPos.split(",")[0],
                        left: imageMvmtPos.split(",")[1]
                    }
                },
                createdAt, updatedAt
            }
        })();

        return response;
    }

    async getSkillsOfUser(userSkillWhereInput: Prisma.UserSkillWhereInput): Promise<UserSkillResponse[] | null>  {
        const userSkills = await this._prismaService.userSkill.findMany({
            where: userSkillWhereInput,
            include: {
                skill: true
            }
        });
        const skillsOfUser = userSkills.map((item) => {
            const { id, remarks, skill, createdAt, updatedAt } = item;
            const { tag, title, imageUrl, imageClass, imageInitPos, imageMvmtPos  } = skill;
            return {
                id, remarks, tag, title, 
                image: {
                    src: imageUrl,
                    class: imageClass,
                    initial: {
                        top: imageInitPos.split(",")[0],
                        left: imageInitPos.split(",")[1]
                    },
                    movement: {
                        top: imageMvmtPos.split(",")[0],
                        left: imageMvmtPos.split(",")[1]
                    }
                },
                createdAt, updatedAt
            }
        });
        return skillsOfUser;
    }

    async checkUserSkill(username: string, skillTag: string): Promise<boolean> {
        const userWithSkills = await this._prismaService.user.findUnique({
            where: { username },
            include: {
                skills: {
                    include: {
                        skill: true
                    }
                }
            }
        });
        return userWithSkills?.skills.some(userSkill => userSkill.skill.tag === skillTag) ?? false;
    }

    async addSkillToUser(userId: string, skillId: string): Promise<User> {
        return this._prismaService.user.update({
            where: { id: userId },
            data: {
                skills: {
                    connect: { id: skillId },
                },
            },
        });
    }

    async removeSkillFromUser(userId: string, skillId: string): Promise<User> {
        return this._prismaService.user.update({
            where: { id: userId },
            data: {
                skills: {
                    disconnect: { id: skillId },
                },
            },
        });
    }
}