import { ITelegramOptions } from 'src/telegram/telegram.interface'

export const getTelegramConfig = (): ITelegramOptions => ({
	//https://api.telegram.org/bot5344017492:AAHrQY8zOUo6fxZ1Um3kt7nPQaHdGh46t8E/getUpdates
	// process.env.TELEGRAM_CHATID,
	// process.env.TELEGRAM_TOKEN,
	chatId: '498396681',
	token: 'AAHrQY8zOUo6fxZ1Um3kt7nPQaHdGh46t8E',
})
