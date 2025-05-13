export enum ReportType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

interface Data {
  report: {
    type: ReportType;
    id: string;
    source: string;
    amount: number;
    created_at: Date;
    updated_at: Date;
  }[];
}

export const data: Data = { report: [] };

data.report.push({
  type: ReportType.EXPENSE,
  id: 'uuidV4-1',
  source: 'IC-1',
  amount: 500,
  created_at: new Date(),
  updated_at: new Date(),
});

data.report.push({
  type: ReportType.INCOME,
  id: 'uuidV4-2',
  source: 'IC-2',
  amount: 4500,
  created_at: new Date(),
  updated_at: new Date(),
});

data.report.push({
  type: ReportType.EXPENSE,
  id: 'uuidV4-3',
  source: 'IC-3',
  amount: 800,
  created_at: new Date(),
  updated_at: new Date(),
});

data.report.push({
  type: ReportType.INCOME,
  id: 'fc7a0527-3670-4aca-8f1d-48fc162703be',
  source: 'dsd',
  amount: 5000,
  created_at: new Date(),
  updated_at: new Date(),
});
