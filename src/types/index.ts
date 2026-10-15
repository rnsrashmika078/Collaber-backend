export type JwtPayload = {
  id: number;
  email: string;
  role: string;
};
export type User = {
  id?: number;
  email: string;
  name?: string;
  picture?: string;
  password?: string;
  role?: string;

  // Library Details
  library_name?: string;
  library_address_lane1?: string;
  library_address_lane2?: string;
  library_address_lane3?: string;
  library_contact_mobile?: string;
  library_contact_landline?: string;
  library_establishment_date?: Date | string | null;
  library_incorporation_act?: string;
  library_type?: string;
  library_nature?: string;

  // Library Officer Details
  officer_name?: string;
  officer_designation?: string;
  officer_email?: string;
  officer_contact_number?: string;
  officer_whatsapp_number?: string;

  // Institution Details
  institution_name?: string;
  head_of_institution?: string;
  institution_address_lane1?: string;
  institution_address_lane2?: string;
  institution_address_lane3?: string;
  institution_contact_mobile?: string;
  institution_whatsapp?: string;

  user_status?: string;
  is_active?: boolean;
  description?: string;
  image_url?: string;
  createdAt?: Date;
};
export type ApiResponse<T> = {
  message: string;
  error: string | null;
  result: T;
  success: boolean;
};
export type MiddlewareResponse = {
  message: string;
  error: string | null;
};

