import { Response } from 'express';
import BackofficeService from '../services/backoffice.service';
import { CreateAllocateDto } from '../dtos/allocate.dto';
import { CreateAmountDto } from '../dtos/amount.dto';
export declare class BackofficeController {
    BackofficeService: BackofficeService;
    allocateToken(data: CreateAllocateDto): Promise<{
        data: any;
        message: string;
    }>;
    mintToken(res: Response, data: CreateAmountDto): Promise<{
        tokenDetails: any;
        message: string;
    }>;
}
