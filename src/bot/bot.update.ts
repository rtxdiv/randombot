import { Update, Ctx, InlineQuery, Command } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { InlineQueryResultArticle } from 'telegraf/types';
import { BotService } from './bot.service';
import { MemoryStore } from 'src/memory-store/memory-store.service';

@Update()
export class BotUpdate {
    constructor(
        private readonly botService: BotService,
        private readonly memoryStore: MemoryStore
    ) {}

    @InlineQuery(/.*/)
    async inline(@Ctx() ctx: Context) {
        if (!this.memoryStore.botState) return
        const query = ctx.inlineQuery?.query
        const result = Math.random() < 0.5? '✅ <b>Да</b>' : '❌ <b>Нет</b>'

        let results: InlineQueryResultArticle[] = [
            {
                type: 'article',
                id: '0',
                title: 'ОТПРАВИТЬ',
                description: 'Случайно отвечу Да или Нет',
                thumbnail_url: 'https://i.ibb.co/xKKWGKBc/outline-style-dice.jpg',
                input_message_content: {
                    message_text: `${query? '"' + query + '"' : 'Рандом'}\n<b>${result}</b>`,
                    parse_mode: 'HTML' as const
                }
            }
        ]

        const isAdmin = await this.botService.isAdmin(ctx.from?.username)
        if (isAdmin) {
            results.push(
                {
                    type: 'article',
                    id: '1',
                    title: 'Ответить ДА',
                    description: 'ЧИТЫ ВКЛ. – /help в бота',
                    thumbnail_url: 'https://i.ibb.co/Kz5VhPfB/24-20250712003504.png',
                    input_message_content: {
                        message_text: `"${query || 'рандом'}"\n<b>✅ Да</b>`,
                        parse_mode: 'HTML'
                    }
                },
                {
                    type: 'article',
                    id: '2',
                    title: 'Ответить НЕТ',
                    description: 'ЧИТЫ ВКЛ. – /help в бота',
                    thumbnail_url: 'https://i.ibb.co/gb8SQQJz/24-20250712003942.png',
                    input_message_content: {
                        message_text: `"${query || 'рандом'}"\n<b>❌ Нет</b>`,
                        parse_mode: 'HTML'
                    }
                }
            )
        }

        await ctx.answerInlineQuery(results, {
            is_personal: true,
            cache_time: 0
        })
    }

    @Command('start')
    start(@Ctx() ctx: Context) {
        if (!this.memoryStore.botState) return
        ctx.reply('RandomBot by <b>@divcore</b>\nПомощь – /help', { parse_mode: 'HTML' })
    }

    @Command('help')
    async help(@Ctx() ctx: Context) {
        if (!this.memoryStore.botState) return
        let text = `👋 <b>Привет, ${ctx.from?.first_name}!</b>\n\nЯ умею делать случайный выбор (да/нет) прямо в чате с другим человеком: просто начни писать @rtxdivbot в любом месте, добавь свой запрос и нажми кнопку "ОТПРАВИТЬ" в меню\n\n`

        const isAdmin = await this.botService.isAdmin(ctx.from?.username)
        if (isAdmin) {
            text += `😈 <b>ДЛЯ ЧИТОВ</b>\n\n/hide – скрыть читы\n/show – отображать читы\n\nС отображёнными читами вы можете самостоятельно выбрать, что ответит бот`
        }

        ctx.reply(text, { parse_mode: 'HTML' })
    }

    @Command('hide')
    async hide(@Ctx() ctx: Context) {
        if (!this.memoryStore.botState) return
        const changed = await this.botService.hide(ctx.from?.username)
        if (changed) {
            ctx.reply('☁ Читы скрыты')
        }
    }

    @Command('show')
    async show(@Ctx() ctx: Context) {
        if (!this.memoryStore.botState) return
        const changed = await this.botService.show(ctx.from?.username)
        if (changed) {
            ctx.reply('👀 Читы отображены')
        }
    }
}