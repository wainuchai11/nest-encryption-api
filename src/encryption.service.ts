import { Injectable } from '@nestjs/common';
import * as NodeRSA from 'node-rsa';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EncryptionService {
  private privateKey: NodeRSA;
  private publicKey: NodeRSA;

  constructor() {
    const privateKeyPath = path.join(__dirname, 'private.key');
    const publicKeyPath = path.join(__dirname, 'public.key');

    this.privateKey = new NodeRSA(fs.readFileSync(privateKeyPath).toString());
    this.publicKey = new NodeRSA(fs.readFileSync(publicKeyPath).toString());
  }

  encryptData(payload: string): { data1: string; data2: string } {
    const encrypted = this.publicKey.encrypt(payload, 'base64');
    const data1 = encrypted.slice(0, encrypted.length / 2);
    const data2 = encrypted.slice(encrypted.length / 2);
    return { data1, data2 };
  }

  decryptData(data1: string, data2: string): string {
    const encrypted = data1 + data2;
    const decrypted = this.privateKey.decrypt(encrypted, 'utf8');
    return decrypted;
  }
}
