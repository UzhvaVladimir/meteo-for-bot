import {Body, Controller, Delete, Get, Patch, Post, Query, Req, UseGuards} from '@nestjs/common';
import {WatchlistService} from "./watchlist.service";
import {WatchListDTO} from "./dto";
import {JwtAuthGuard} from "../guards/jwt-guards";
import {CreateAssetResponse} from "./response";

@Controller('watchlist')
export class WatchlistController {
    constructor(private readonly watchlistService: WatchlistService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset (@Body() assetDto: WatchListDTO, @Req() request): Promise<CreateAssetResponse> {
        const user =request.user
        return this.watchlistService.createAsset(user, assetDto)
    }
    @UseGuards(JwtAuthGuard)
    @Delete()
    deleteAsset (@Query('id') assetId: string, @Req() request ) {
        const {id} = request.user
        return this.watchlistService.deleteAsset(id, assetId)
    }
}
