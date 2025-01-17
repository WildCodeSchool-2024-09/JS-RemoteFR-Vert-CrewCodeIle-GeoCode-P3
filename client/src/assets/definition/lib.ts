export type PresentationProps = {
  presentation: string;
  link: string;
  buttonText: string;
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
