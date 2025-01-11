export type PresentationProps = {
  presentation: string;
  link: string;
  buttonText: string;
};
export type InputProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  city: string;
  zipCode: number;
  vehicle: number;
  password: string;
  confirm: string;
  brand: string;
  model: string;
  socket: string;
};

export type BrandProps = {
  codigo: number;
  nome: string;
};
export type ModelProps = {
  modelos: { codigo: number; nome: string }[];
};

export type ErrorMessageProps = {
  name: string;

  confirmPassword: string;
  confirmAge: string;
};

export type SocketProps = {
  id: number;
  name: string;
};
