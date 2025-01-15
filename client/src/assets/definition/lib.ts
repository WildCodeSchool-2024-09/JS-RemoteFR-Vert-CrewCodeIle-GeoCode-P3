export type PresentationProps = {
  presentation: string;
  link: string;
  buttonText: string;
};

export type VehiculeProps = {
  brand: number;
  model: number;
  socket: number;
};
export type UserProps = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  city: string;
  zipCode: number;
  password: string;
  confirm: string;
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

export type MailProps = {
  email: string;
};
