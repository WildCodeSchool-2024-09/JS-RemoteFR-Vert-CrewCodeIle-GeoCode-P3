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
  photo: string;
  city: string;
  zipCode: number;
  password: string;
  confirm: string;
};

export type PhotoProps = {
  id: number;
  photo: string | undefined;
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

export type SocketProps = {
  id: number;
  label: string;
};

export type MailProps = {
  email: string;
};

export type ErrorMessageProps = {
  required: string;
  firstName: string;
  lastName: string;
  email: string;
  mailCheck: string;
  city: string;
  zipCode: string;
  password: string;
  confirmPassword: string;
  confirmAge: string;
  brand: string;
  model: string;
  socket: string;
  minChar: string;
  minCharEmail: string;
  minCharMessage: string;
  maxChar: string;
  select: string;
  message: string;
};

export type ContactModaleProps = {
  showContactModale: boolean;
  setShowContactModale: (boolean: boolean) => void;
};

export type ContactFormProps = {
  lastname: string;
  firstname: string;
  email: string;
  subject: string;
  message: string;
};

export type ProfilModalProps = {
  showProfilModal: boolean;
  setShowProfilModal: (s: boolean) => void;
};
