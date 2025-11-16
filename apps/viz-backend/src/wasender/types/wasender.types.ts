export interface SendMessageOptions {
  to: string;
  text: string;
}

export interface SendMediaOptions {
  phone: string;
  mediaUrl: string;
  caption?: string;
  deviceId?: string;
}

export interface MessageResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface DeviceStatus {
  connected: boolean;
  deviceId: string;
  battery?: number;
  platform?: string;
}

export interface ContactPhone {
  id?: string;
  name?: string;
  phone?: string;
  [key: string]: any;
}

export interface ContactsResponse {
  success: boolean;
  data: ContactPhone[];
  error?: string;
}
