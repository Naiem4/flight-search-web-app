import { Flight } from "@/types";


export function mapFlights(data: any[], dictionaries: any): Flight[] {
  return data.map((offer) => {
    const firstSegment = offer.itineraries[0].segments[0];
    const lastSegment = offer.itineraries[0].segments.at(-1);

    return {
      id: offer.id,
      airline: dictionaries.carriers[firstSegment.carrierCode] ?? firstSegment.carrierCode,
      flightNumber: firstSegment.number,
      aircraft: dictionaries.aircraft[firstSegment.aircraft.code] ?? firstSegment.aircraft.code,
      origin: dictionaries.locations[firstSegment.departure.iataCode]?.cityCode ?? firstSegment.departure.iataCode,
      destination: dictionaries.locations[lastSegment?.arrival.iataCode ?? '']?.cityCode ?? lastSegment?.arrival.iataCode ?? '',
      departure: new Date(firstSegment.departure.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      arrival: lastSegment ? new Date(lastSegment.arrival.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      duration: offer.itineraries[0].duration
        .replace('PT', '')
        .replace('H', 'h ')
        .replace('M', 'm'),
      stops: offer.itineraries[0].segments.length - 1,
      price: parseFloat(offer.price.total),
    };
  });
}
