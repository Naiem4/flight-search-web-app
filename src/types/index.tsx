export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradientFrom: string;
  gradientTo: string;
}

export type FlightSearchParams = {
  page?: number;
  limit?: number;
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  infants?: number;
  travelClass?: 'ECONOMY' | 'BUSINESS';
  maxPrice?: number;
  max?: number;
  nonStop?: boolean;
  currencyCode?: string;
};

export type CitiesParams = {
  keyword: string;
  max?: number;
  include?: 'AIRPORTS' | string;
};

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: number;
  price: number;
  aircraft: string;
}

export interface Location {
  cityCode: string;
  cityName: string;
  countryName: string;
  airportName: string;
}

export interface Airport {
  name: string;
  iataCode: string;
}

export interface CityRelationship {
  id: string;
}

export interface City {
  name: string;
  address?: {
    countryCode?: string;
  };
  relationships?: CityRelationship[];
}

export interface Data {
  data?: City[];
  included?: {
    airports?: Record<string, Airport>;
  };
}
