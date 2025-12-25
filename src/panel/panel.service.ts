import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MemoryStore } from 'src/memory-store/memory-store.service';
import { PanelAdminDto } from './panel.dto';
import { Repository } from 'typeorm';
import { Admins } from 'src/entity/admins.entuty';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PanelService {
    constructor(
        private readonly memoryStore: MemoryStore,
        @InjectRepository(Admins) private readonly adminsStore: Repository<Admins>
    ) {}

    getBotState() {
        return { state: this.memoryStore.botState }
    }

    async startBot() {
        this.memoryStore.botState = true
    }

    async stopBot() {
        this.memoryStore.botState = false
    }

    async getAdmins() {
        const admins = await this.adminsStore.find({ order: { id: 'DESC' } })
        return { admins: admins }
    }

    async addAdmin(body: PanelAdminDto) {
        const admin = await this.adminsStore.find({ where: { username: body.username } })
        if (admin.length !== 0) {
            throw new BadRequestException(['Админ уже добавлен'])
        }
        await this.adminsStore.insert({ username: body.username })
    }

    async deleteAdmin(body: PanelAdminDto) {
        await this.adminsStore.delete({ username: body.username })
    }
}
