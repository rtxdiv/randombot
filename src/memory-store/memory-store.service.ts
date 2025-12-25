import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryStore {
    public botState = false
    private PANEL_PASSWORD = process.env.PANEL_PASSWORD

    checkPassword(password: string): boolean {
        return this.PANEL_PASSWORD === password
    }
}
