export interface Address {
    street?: string;
    postcode?: string;
    city?: string;
    country?: string;
  }
  export interface Company {
    name?: string;
    website?: string;
  }
  export interface Contact {
    id?: number;
    firstname?: string;
    surname?: string;
    email?: string;
    phone?: number;
    addresses?: Address[];
    company?: Company;
  }
  export function createInitialContact(): Contact {
    return {
      addresses:[],
      company:{}
    };
  }