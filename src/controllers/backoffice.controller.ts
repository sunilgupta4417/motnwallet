import { Response } from 'express';
import { Get, Post, Body, UseBefore, HttpCode, Param, JsonController, Req, Res } from 'routing-controllers';
import BackofficeService from '@services/backoffice.service';
import { OpenAPI } from 'routing-controllers-openapi';
import { validationMiddleware } from '@middlewares/validation.middleware';
import { CreateAllocateDto } from '@/dtos/allocate.dto';
import { CreateAmountDto } from '@/dtos/amount.dto';

@JsonController('/backoffice')
export class BackofficeController {
  public BackofficeService = new BackofficeService();

  @Post('/allocate')
  @OpenAPI({
    summary: 'Returns successfully Motion Token for end user account.',
  })
  @UseBefore(validationMiddleware(CreateAllocateDto, 'body'))
  @HttpCode(201)
  async allocateToken(@Body() data: CreateAllocateDto) {
    const allocatedData = await this.BackofficeService.allocate(data);
    return { data: allocatedData, message: ' Motion Token allocated Successfully' };
  }


  @Post('/approve')
  @OpenAPI({
    summary: 'Returns true for approval.',
  })
  @UseBefore(validationMiddleware(CreateAmountDto, 'body'))
  @HttpCode(201)
  public async mintToken(@Res() res: Response,@Body() data: CreateAmountDto) {
    const tokenDetails = await this.BackofficeService.approve(data);
    return { tokenDetails, message: 'Motion Token Approved for distribution though Motion contract' };
  }
}
