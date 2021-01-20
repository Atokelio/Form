export interface User {
  email: string;
  password: string;
  confirmPassword: string;
  userName?: string;
  phone?: number;
  city: string;
  companyName: string;
  ownershipType: string;
  individualNumber: number;
  industrialEnterprisesClassifier: number;
  allRussianClassifierEnterprises: number;
  creationDate?: string;
  contacts?: object;
}
