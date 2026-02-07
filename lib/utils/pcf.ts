export interface PCFCategory {
  pcfId: string;
  name: string;
  level: number;
  type: 'operating' | 'management_support';
}

export const APQC_PCF_LEVEL1: PCFCategory[] = [
  { pcfId: '1.0', name: 'Develop Vision and Strategy', level: 1, type: 'operating' },
  { pcfId: '2.0', name: 'Develop and Manage Products and Services', level: 1, type: 'operating' },
  { pcfId: '3.0', name: 'Market and Sell Products and Services', level: 1, type: 'operating' },
  { pcfId: '4.0', name: 'Deliver Products and Services', level: 1, type: 'operating' },
  { pcfId: '5.0', name: 'Manage Customer Service', level: 1, type: 'operating' },
  { pcfId: '6.0', name: 'Develop and Manage Human Capital', level: 1, type: 'management_support' },
  { pcfId: '7.0', name: 'Manage Information Technology', level: 1, type: 'management_support' },
  { pcfId: '8.0', name: 'Manage Financial Resources', level: 1, type: 'management_support' },
  { pcfId: '9.0', name: 'Acquire, Construct, and Manage Assets', level: 1, type: 'management_support' },
  { pcfId: '10.0', name: 'Manage Enterprise Risk, Compliance, Remediation, and Resiliency', level: 1, type: 'management_support' },
  { pcfId: '11.0', name: 'Manage External Relationships', level: 1, type: 'management_support' },
  { pcfId: '12.0', name: 'Develop and Manage Business Capabilities', level: 1, type: 'management_support' },
  { pcfId: '13.0', name: 'Manage Knowledge, Improvement, and Change', level: 1, type: 'management_support' },
];

export function getPCFCategory(pcfId: string): PCFCategory | undefined {
  return APQC_PCF_LEVEL1.find(c => c.pcfId === pcfId);
}

export function getPCFCategoryNumber(pcfId: string): number {
  const match = pcfId.match(/^(\d+)/);
  return match ? parseInt(match[1]) : 0;
}
