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
  mail: string;
  subject: string;
  message: string;
};
