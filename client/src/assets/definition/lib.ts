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
  id: number;
  label: string;
};
export type ModelProps = {
  id: number;
  label: string;
  socket_id: number;
  model_id: number;
  socketType: string;
};

export type ErrorMessageProps = {
  firstName: string;
  lastName: string;
  email: string;
  confirmPassword: string;
  confirmAge: string;
};

export type SocketProps = {
  id: number;
  label: string;
};
