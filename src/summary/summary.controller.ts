import { Controller, Get } from '@nestjs/common';
import { ReportService } from './../report/report.service';

// import from local-db
import { ReportType } from './../../local-db/data';

@Controller('summary')
export class SummaryController {
  constructor(private readonly reportService: ReportService) {}

  @Get('')
  calculatSummary() {
    const totalIncome: number = this.reportService
      .getAllReports(ReportType.INCOME)
      .reduce((sum, report) => sum + report.amount, 0);

    const totalExpense: number = this.reportService
      .getAllReports(ReportType.EXPENSE)
      .reduce((sum, report) => sum + report.amount, 0);

    return {
      totalIncome,
      totalExpense,
      netIncome: totalIncome - totalExpense,
    };
  }
}
