import { Injectable, NotFoundException } from '@nestjs/common';

// Import uuid
import { v4 as uuidV4 } from 'uuid';

// Import local-db
import { data, ReportType } from './../../local-db/data';
import { ReportResponseDTO } from './../dtos/report.dto';

interface ReportData {
  source: string;
  amount: number;
}

interface UpdateReport {
  source?: string;
  amount?: number;
}

@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDTO[] {
    const reportArr = data.report.filter((report) => report.type === type);
    return reportArr.map((eachElement) => new ReportResponseDTO(eachElement));
  }

  getReportById(type: ReportType, id: string): ReportResponseDTO {
    const foundData = data.report.find(
      (report) => report.id === id && report.type === type,
    );
    if (!foundData) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    } else return new ReportResponseDTO(foundData);
    // return foundData ? foundData : { status: 404, message: 'No Data Found' };
  }

  createReport(type: ReportType, reportData: ReportData): ReportResponseDTO {
    const newReport = {
      type,
      id: uuidV4(),
      source: reportData.source,
      amount: reportData.amount,
      created_at: new Date(),
      updated_at: new Date(),
    };

    data.report.push(newReport);
    return new ReportResponseDTO(newReport);
  }

  updateReport(
    reportType: ReportType,
    reportData: UpdateReport,
    id: string,
  ): ReportResponseDTO {
    const foundAt: number = data.report.findIndex(
      (report) => report.id === id && report.type === reportType,
    );
    if (foundAt === -1) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    // if (foundAt === -1) return { message: 'Data not Found' };
    const { amount, source } = reportData;
    const newReport = {
      ...data.report[foundAt],
      updated_at: new Date(),
    };
    if (source) newReport.source = source;
    if (amount) newReport.amount = amount;
    // data.report.fill(newReport, foundAt, foundAt + 1);
    data.report[foundAt] = newReport;
    return new ReportResponseDTO(data.report[foundAt]);
  }

  deleteReport(id: string) {
    const foundAt: number = data.report.findIndex((report) => report.id === id);

    if (foundAt === -1) return { status: 404, message: 'Data not Found' };
    else {
      data.report.splice(foundAt, 1);
      return { status: 200, message: 'deleted' };
    }
  }
}
