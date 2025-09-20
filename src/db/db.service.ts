import { Inject, Injectable } from '@nestjs/common';
import { access, readFile, writeFile } from 'node:fs/promises';
import type { DbModuleOptions } from './db.module';

@Injectable()
export class DbService {
  @Inject('OPTIONS')
  private options: DbModuleOptions;

  async read() {
    const filePath = this.options.path;
    try {
      await access(filePath);

      const data = await readFile(filePath, {
        encoding: 'utf8',
      });
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const parsed = JSON.parse(data);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // Save database options
  async wrire(obj: Record<string, any>) {
    const filePath = this.options.path;

    await writeFile(filePath, JSON.stringify(obj || []), {
      encoding: 'utf8',
    });
  }
}
