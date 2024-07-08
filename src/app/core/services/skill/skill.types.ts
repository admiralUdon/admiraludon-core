export interface UserSkill
{
    id          : string;
    remarks     : string;
    createdAt   : Date;
    updatedAt   : Date;
    
    tag         : string;
    title       : string;

    image       : ImageProperties
}

export interface ImageProperties
{
    src         : string;
    class       : string;
    initial     : PositionProperties;
    movement    : PositionProperties;
}

export interface PositionProperties
{
    top         : string;
    left        : string;
}