import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  // Parse
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportService } from './report.service';

// Import DTOs
import {
  CreateReportDTO,
  ReportResponseDTO,
  UpdateReportDTO,
} from './../dtos/report.dto';

// Import local-db
import { ReportType } from './../../local-db/data';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDTO[] {
    const reportType: ReportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @Get('/:id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ReportResponseDTO {
    const reportType: ReportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Body() { amount, source }: CreateReportDTO,
  ): ReportResponseDTO {
    const reportType: ReportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.createReport(reportType, { source, amount });
  }

  @Put('/:id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body()
    { amount, source }: UpdateReportDTO,
  ): ReportResponseDTO {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.updateReport(
      reportType,
      {
        amount,
        source,
      },
      id,
    );
  }

  @Delete('/:id')
  deleteReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): object {
    return this.reportService.deleteReport(id);
  }
}
