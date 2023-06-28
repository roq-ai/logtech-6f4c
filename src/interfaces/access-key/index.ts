import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface AccessKeyInterface {
  id?: string;
  key_value: string;
  file_type: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface AccessKeyGetQueryInterface extends GetQueryInterface {
  id?: string;
  key_value?: string;
  file_type?: string;
  organization_id?: string;
}
