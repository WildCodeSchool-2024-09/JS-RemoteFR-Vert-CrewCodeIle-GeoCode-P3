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
  id_station_itinerance: string;
};

export type Station = {
  id: number;
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

export type parsefileIrve2 = {
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
