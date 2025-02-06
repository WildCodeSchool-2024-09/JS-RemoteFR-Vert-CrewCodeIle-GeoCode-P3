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
  photo: string | undefined;
  city: string;
  zipCode: number;
  password: string;
  confirm: string;
  dbpassword: string;
};

export type ProfilModalProps = {
  showProfilModal: boolean;
  setShowProfilModal: (s: boolean) => void;
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
  date: string;
  email: string;
  firstname: string;
  id: number;
  is_treated: number;
  lastname: string;
  message: string;
  subject: string;
};

export type searchApi = {
  geometry: {
    coordinates: [number, number];
  };

  properties: {
    label: string;
  };
};

export type Station = {
  id: number;
  id_station: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type fileIrveType = {
  id_station_itinerance: string;
  nom_station: string;
  adresse_station: string;
  id_pdc_itinerance: string;
  puissance_nominale: number;
  type_ef: boolean;
  type_2: boolean;
  type_combo_ccs: boolean;
  type_chademo: boolean;
  type_autre: boolean;
  consolidated_longitude: number;
  consolidated_latitude: number;
};

export type parsefileIrve = {
  id_station_itinerance: string;
  nom_station: string;
  adresse_station: string;
  id_pdc_itinerance: string;
  puissance_nominale: string;
  type_ef: string;
  type_2: string;
  type_combo_ccs: string;
  type_chademo: string;
  type_autre: string;
  consolidated_longitude: string;
  consolidated_latitude: string;
};

export type stationTableType = {
  id_station_itinerance: string;
  nom_station: string;
  adresse_station: string;
  consolidated_longitude: number;
  consolidated_latitude: number;
};

export type terminalTableType = {
  id_pdc_itinerance: string;
  puissance_nominale: number;
  type_ef: boolean;
  type_2: boolean;
  type_combo_ccs: boolean;
  type_chademo: boolean;
  type_autre: boolean;
};

export type AdminMessagesListProps = {
  handleSwitchIsTreated: (id: number) => void;
  isContactMessagesModale: boolean;
  setIsContactMessagesModale: (bool: boolean) => void;
  setActualMessage: (e: ContactFormProps) => void;
  usersMessages: ContactFormProps[] | null;
};
