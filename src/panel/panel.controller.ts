import { Controller, Get, Res, UseGuards, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { PanelService } from './panel.service';
import type { Response } from 'express';
import path from 'path';
import { AuthorizedGuard } from 'src/guards/authorized.guard';
import { PanelAdminDto } from './panel.dto';

@Controller('panel')
export class PanelController {
  constructor(private readonly panelService: PanelService) {}

  @Get()
  @UseGuards(new AuthorizedGuard())
  getAuthPage(@Res() res: Response) {
    res.sendFile(path.join(process.cwd(), 'public', 'panel.html'))
  }

  @Post('getBotState')
  @UseGuards(new AuthorizedGuard())
  getBotState(@Res() res: Response) {
    res.json(this.panelService.getBotState())
  }

  @Post('startBot')
  @UseGuards(new AuthorizedGuard())
  async startBot(@Res() res: Response) {
    await this.panelService.startBot()
    res.sendStatus(200)
  }

  @Post('stopBot')
  @UseGuards(new AuthorizedGuard())
  async stopBot(@Res() res: Response) {
    await this.panelService.stopBot()
    res.sendStatus(200)
  }

  @Post('getAdmins')
  @UseGuards(new AuthorizedGuard())
  async getAdmins(@Res() res: Response) {
    res.status(200).json(await this.panelService.getAdmins())
  }

  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Post('addAdmin')
  @UseGuards(new AuthorizedGuard())
  async addAdmin(@Body() body: PanelAdminDto, @Res() res: Response) {
    await this.panelService.addAdmin(body)
    return res.sendStatus(200)
  }

  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Post('deleteAdmin')
  @UseGuards(new AuthorizedGuard())
  async deleteAdmin(@Body() body: PanelAdminDto, @Res() res: Response) {
    await this.panelService.deleteAdmin(body)
    return res.sendStatus(200)
  }
}
