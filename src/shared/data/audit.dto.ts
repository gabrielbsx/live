export interface AuditDTO {
  id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  createdBy: string;
  updatedBy?: string;
  deletedBy?: string;
}