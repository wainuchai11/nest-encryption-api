import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EncryptionService } from './encryption.service';
import {
  EncryptDataDto,
  DecryptDataDto,
  EncryptDataResponseDto,
  DecryptDataResponseDto,
} from './encryption.dto';

@ApiTags('Encryption')
@Controller()
export class EncryptionController {
  constructor(private readonly encryptionService: EncryptionService) {}

  @Post('get-encrypt-data')
  @ApiBody({ type: EncryptDataDto })
  @ApiResponse({ status: 201, type: EncryptDataResponseDto })
  async getEncryptData(
    @Body() encryptDataDto: EncryptDataDto,
  ): Promise<EncryptDataResponseDto> {
    const { payload } = encryptDataDto;
    if (payload.length > 2000) {
      return {
        successful: false,
        error_code: 'Payload too long',
        data: null,
      };
    }
    const encryptedData = this.encryptionService.encryptData(payload);
    return {
      successful: true,
      error_code: null,
      data: encryptedData,
    };
  }

  @Post('get-decrypt-data')
  @ApiBody({ type: DecryptDataDto })
  @ApiResponse({ status: 201, type: DecryptDataResponseDto })
  async getDecryptData(
    @Body() decryptDataDto: DecryptDataDto,
  ): Promise<DecryptDataResponseDto> {
    const { data1, data2 } = decryptDataDto;
    const decryptedData = this.encryptionService.decryptData(data1, data2);
    return {
      successful: true,
      error_code: null,
      data: { payload: decryptedData },
    };
  }
}
