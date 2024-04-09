interface IValidationError {
  _id?: string;
  website_id: any;
  agent_id: any;
  website_url: string;
  http_status: number;
  validation_message: string;
  sent2slack?: boolean;
  created_at?: any;
  updated_at?: any;
}

export { IValidationError };
