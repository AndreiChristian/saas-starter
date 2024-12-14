
export interface CountryApiResponse {
  "ip": string,
  "network": string,
  "version": string
  "city": string
  "region": string
  "region_code": string
  "country": string
  "country_name": string
  "country_code": string
  "country_code_iso3": string
  "country_capital": string
  "country_tld": string
  "continent_code": string
  "in_eu": boolean,
  "postal": string,
  "latitude": number,
  "longitude": number,
  "timezone": string
  "utc_offset": string,
  "country_calling_code": string
  "currency": string,
  "currency_name": string,
  "languages": string,
  "country_area": string,
  "country_population": string,
  "asn": string,
  "org": string
}

export default async function countryFounder() {

  let data: CountryApiResponse

  try {
    const response = await fetch('https://ipapi.co/json/')
    data = await response.json() as CountryApiResponse
    return data
  } catch (err) {
    console.error(err instanceof Error ? err : new Error('An unknown error occurred'));
  }

}
