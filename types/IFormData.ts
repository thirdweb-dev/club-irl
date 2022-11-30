interface IFormData {
  name: string;
  email: string;
  location_city: string;
  address: string;
  company: string;
  role: string;
  bio: string;
  communication: string;
  handle: string;
  events: string;
  connections: string;
  shared_channel: string;
}

// create a type with the same keys as IFormData

type IFormDataKeys = keyof IFormData;

export type { IFormData, IFormDataKeys };
