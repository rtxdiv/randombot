import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectBot } from 'nestjs-telegraf';
import { Admins } from 'src/entity/admins.entuty';
import { MemoryStore } from 'src/memory-store/memory-store.service';
import { Context, Telegraf } from 'telegraf';
import { Repository } from 'typeorm';

@Injectable()
export class BotService implements OnModuleInit {
    constructor(
        private readonly memoryStore: MemoryStore,
        @InjectRepository(Admins) private readonly adminsStore: Repository<Admins>,
        @InjectBot() private readonly bot: Telegraf<Context>
    ) {}

    onModuleInit() {
        this.memoryStore.botState = true
    }

    async isAdmin(username: string | undefined) {
        const admin = await this.adminsStore.findOne({ where: { username: username, active: true } })
        if (admin) {
            return true
        }
        return false
    }

    async hide(username: string | undefined) {
        const result = await this.adminsStore.update({ username: username }, { active: false })
        if (result.affected == 0 || !result.affected) return false
        return true
    }

    async show(username: string | undefined) {
        const result = await this.adminsStore.update({ username: username }, { active: true })
        if (result.affected == 0 || !result.affected) return false
        return true
    }
}
