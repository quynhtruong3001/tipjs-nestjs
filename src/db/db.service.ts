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
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  // Save database options
  async wrire(obj: Record<string, any>) {
    const filePath = this.options.path;


    await writeFile(this.options.path, JSON.stringify(obj || []), {
      encoding: 'utf8',
    });
  }
}
