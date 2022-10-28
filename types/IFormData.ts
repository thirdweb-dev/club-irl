interface IFormData {
  name: string;
  email: string;
  address: string;
}

// create a type with the same keys as IFormData

type IFormDataKeys = keyof IFormData;

export type { IFormData, IFormDataKeys };
