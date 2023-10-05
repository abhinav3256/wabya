import { countries } from 'countries-list';

const allCountries = Object.values(countries).map((country) => country.name);

export default allCountries;
