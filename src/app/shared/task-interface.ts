export interface Task {
  work_order_id: number;
  description: string;
  received_date: Date;
  assigned_to_name?: string;
  assigned_to_status?: string;
  status: string;
  priority: string;
}

