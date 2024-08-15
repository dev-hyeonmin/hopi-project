export interface Staff {
  id: number;
  name: string;
  licenseNumber?: number;
  role: string;
  roleName: string;
}

export interface GetStaffsResponse {
  staff: Staff[];
}
