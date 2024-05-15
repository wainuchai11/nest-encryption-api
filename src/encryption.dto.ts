import { ApiProperty } from '@nestjs/swagger';

export class EncryptDataDto {
  @ApiProperty({
    description: 'The payload to encrypt',
    type: String,
    maxLength: 2000,
  })
  payload: string;
}

export class DecryptDataDto {
  @ApiProperty({
    description: 'The first part of the encrypted data',
    type: String,
  })
  data1: string;

  @ApiProperty({
    description: 'The second part of the encrypted data',
    type: String,
  })
  data2: string;
}

export class EncryptDataResponseDto {
  @ApiProperty({
    description: 'Indicates whether the operation was successful',
    type: Boolean,
  })
  successful: boolean;

  @ApiProperty({
    description: 'An error code, if any',
    type: String,
    nullable: true,
  })
  error_code: string | null;

  @ApiProperty({
    description: 'The encrypted data',
    type: Object,
    nullable: true,
    properties: {
      data1: { type: 'string' },
      data2: { type: 'string' },
    },
  })
  data: { data1: string; data2: string } | null;
}

export class DecryptDataResponseDto {
  @ApiProperty({
    description: 'Indicates whether the operation was successful',
    type: Boolean,
  })
  successful: boolean;

  @ApiProperty({
    description: 'An error code, if any',
    type: String,
    nullable: true,
  })
  error_code: string | null;

  @ApiProperty({
    description: 'The decrypted payload',
    type: Object,
    nullable: true,
    properties: {
      payload: { type: 'string' },
    },
  })
  data: { payload: string } | null;
}
