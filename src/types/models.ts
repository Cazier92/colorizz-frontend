/* ---------===== custom props ====--------- */



/* ---------===== auth models =====--------- */

export interface Profile {
  name: string;
  photo?: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  profile: { id: number };
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface Paint {
  id?: number;
  name: string;
  pigment_code?: string;
  pigment_number?: number;
  color: string;
  transparency?: number;
  staining?: number;
  granulation?: number;
  brand?: number;
  // profileId: {id: number};
  profileId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Palette {
  id: number;
  profileId: number;
  createdAt: string;
  updatedAt: string;
  paints?: Paint[];
}
