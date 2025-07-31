export interface User {
  id: string;
  username?: string;
  email: string;
  created_at: string;
  updated_at?: string;
}

export interface ApiEndpoint {
  id: string;
  user_id: string;
  name: string;
  url: string;
  interval: number;
  status: 'up' | 'down' | 'unknown';
  last_checked: string;
  created_at: string;
  updated_at: string;
}

export interface ApiCheck {
  id: string;
  endpoint_id: string;
  status: 'up' | 'down';
  response_time: number;
  status_code?: number;
  error_message?: string;
  checked_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  rating: number;
  message: string;
  avatar?: string;
}