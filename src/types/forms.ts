/* ---------==== custom forms ====--------- */

export interface PaintFormData {
  name: string;
  pigment_code?: string;
  pigment_number?: number;
  color: string;
  transparency?: number;
  staining?: number;
  granulation?: number;
  brand?: number;
  profileId: number;
}

export interface PaletteFormData {
  name: string;
  profileId: number;
}

/* ---------===== auth forms =====--------- */

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
}

export interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordConf: string;
}

export interface PhotoFormData {
  photo: File | null;
}
