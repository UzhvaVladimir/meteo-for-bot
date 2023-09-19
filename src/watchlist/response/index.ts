import {IsNumber, IsString} from "class-validator";

export class  CreateAssetResponse {
    @IsNumber()
    user: number

    @IsString()
    name: string

    @IsString()
    assetId: string
}