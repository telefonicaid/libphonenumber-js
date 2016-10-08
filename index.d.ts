declare namespace libphonenumber {

	// goog.string.StringBuffer
	type StringBuffer = any;

	export enum PhoneNumberFormat {
	    E164,
	    INTERNATIONAL,
	    NATIONAL,
	    RFC3966
	}

	export enum PhoneNumberType {
		FIXED_LINE,
		MOBILE,
		FIXED_LINE_OR_MOBILE,
		TOLL_FREE,
		PREMIUM_RATE,
		SHARED_COST,
		VOIP,
		PERSONAL_NUMBER,
		PAGER,
		UAN,
		VOICEMAIL,
		UNKNOWN
	}

	export enum Error {
 		INVALID_COUNTRY_CODE,
  		NOT_A_NUMBER,
  		TOO_SHORT_AFTER_IDD,
  		TOO_SHORT_NSN,
		TOO_LONG
	}

	export class NumberFormat {
		clone(): NumberFormat;
		mergeFrom(value: NumberFormat): void;

		getPattern(): string|null;
		getPatternOrDefault(): string;
		setPattern(value: string): void;
		hasPattern(): boolean;
		patternCount(): string;
		clearPattern(): void;

		getFormat(): string|null;
		getFormatOrDefault(): string;
		setFormat(value: string): void;
		hasFormat(): boolean;
		formatCount(): string;
		clearFormat(): void;

		getLeadingDigitsPattern(): string|null;
		getLeadingDigitsPatternOrDefault(): string;
		setLeadingDigitsPattern(value: string): void;
		hasLeadingDigitsPattern(): boolean;
		leadingDigitsPatternCount(): string;
		clearLeadingDigitsPattern(): void;

		// TODO:
		// NationalPrefixFormattingRule: string
		// NationalPrefixOptionalWhenFormatting: boolean
		// DomesticCarrierCodeFormattingRule: string
	}

	export class PhoneNumberDesc {
		clone(): PhoneNumberDesc;
		mergeFrom(value: PhoneNumberDesc): void;

		// NationalNumberPattern: string
		// PossibleNumberPattern: string
		// PossibleLength: number
		// PossibleLengthLocalOnly: number
		// ExampleNumber: string
		// NationalNumberMatcherData: string
		// PossibleNumberMatcherData: string
	}

	export class PhoneMetadata {
		clone(): PhoneMetadata;
		mergeFrom(value: PhoneMetadata): void;


		// GeneralDesc: PhoneNumberDesc
		// FixedLine: PhoneNumberDesc
		// Mobile: PhoneNumberDesc
		// ToolFree: PhoneNumberDesc
		// PremiumRate: PhoneNumberDesc
		// SharedCost: PhoneNumberDesc
		// PersonalNumber: PhoneNumberDesc
		// Voip: PhoneNumberDesc
		// Pager: PhoneNumberDesc
		// Uan: PhoneNumberDesc
		// Emergency: PhoneNumberDesc
		// Voicemail: PhoneNumberDesc
		// NoInternationalDialling: PhoneNumberDesc
		// Id: string
		// CountryCode: number
		// InternationalPrefix: string
		// PreferredInternationalPrefix: string
		// NationalPrefix: string
		// PreferredExtnPrefix: string
		// NationalPrefixForParsing: string
		// NationalPrefixTransformRule: string
		// SameMobileAndFixedLinePattern: boolean
		// NumberFormat: NumberFormat
		// IntlNumberFormat: NumberFormat
		// MainCountryForCode: boolean
		// LeadingDigits: string
		// LeadingZeroPossible: boolean
	}

	export class PhoneMetadataCollection {
		clone(): PhoneMetadataCollection;
		mergeFrom(value: PhoneMetadataCollection): void;

		// Metadata: PhoneMetadata[]
	}

	export class PhoneNumber {
		clone(): PhoneNumber;
		mergeFrom(value: PhoneNumber): void;

		getCountryCode(): number|null;
		getCountryCodeOrDefault(): number;
		setCountryCode(value: number): void;
		hasCountryCode(): boolean;
		countryCodeCount(): number;
		clearCountryCode(): void;

		getNationalNumber(): number|null;
		getNationalNumberOrDefault(): number;
		setNationalNumber(value: number): void;
		hasNationalNumber(): boolean;
		nationalNumberCount(): number;
		clearNationalNumber(): void;

		getExtension(): string|null;
		getExtensionOrDefault(): string;
		setExtension(value: string): void;
		hasExtension(): boolean;
		extensionCount(): string;
		clearExtension(): void;

		getItalianLeadingZero(): boolean|null;
		getItalianLeadingZeroOrDefault(): boolean;
		setItalianLeadingZero(value: boolean): void;
		hasItalianLeadingZero(): boolean;
		italianLeadingZeroCount(): number;
		clearItalianLeadingZero(): void;

		getNumberOfLeadingZeros(): number|null;
		getNumberOfLeadingZerosOrDefault(): number;
		setNumberOfLeadingZeros(value: number): void;
		hasNumberOfLeadingZeros(): boolean;
		numberOfLeadingZerosCount(): number;
		clearNumberOfLeadingZeros(): void;

		getRawInput(): string|null;
		getRawInputOrDefault(): string;
		setRawInput(value: string): void;
		hasRawInput(): string;
		rawInputCount(): number;
		clearRawInput(): void;

		getCountryCodeSource(): PhoneNumber.CountryCodeSource|null;
		getCountryCodeSourceOrDefault(): PhoneNumber.CountryCodeSource;
		setCountryCodeSource(value: PhoneNumber.CountryCodeSource): void;
		hasCountryCodeSource(): PhoneNumber.CountryCodeSource;
		countryCodeSourceCount(): number;
		clearCountryCodeSource(): void;

		getPreferredDomesticCarrierCode(): string|null;
		getPreferredDomesticCarrierCodeOrDefault(): string;
		setPreferredDomesticCarrierCode(value: string): void;
		getPreferredDomesticCarrierCode(): string;
		preferredDomesticCarrierCodeCount(): number;
		clearPreferredDomesticCarrierCode(): void
    }

	// Attach enum to the class
	module PhoneNumber {
		enum CountryCodeSource {
			FROM_NUMBER_WITH_PLUS_SIGN,
			FROM_NUMBER_WITH_IDD,
			FROM_NUMBER_WITHOUT_PLUS_SIGN,
			FROM_DEFAULT_COUNTRY
		}
	}

	export class PhoneNumberUtil {
		static REGION_CODE_FOR_NON_GEO_ENTITY: number;
	    static getInstance(): PhoneNumberUtil

		extractPossibleNumber(number: string): string;
		isViablePhoneNumber(number: string): boolean;
		normalize(number: string): string;
		normalizeDigitsOnly(number: string): string;
		convertAlphaCharactersInNumber(number: string): string;
		getLengthOfGeographicalAreaCode(phoneNumber: PhoneNumber): number;
		getLengthOfNationalDestinationCode(phoneNumber: PhoneNumber): number;
		getCountryMobileToken(number: string): string;
		getSupportedRegions(): string[];
		getSupportedGlobalNetworkCallingCodes(): number[];
		formattingRuleHasFirstGroupOnly(rule: string): boolean;
		isNumberGeographical(number: PhoneNumber): boolean;
	    format(number: PhoneNumber, format: PhoneNumberFormat): string;
	    formatByPattern(number: PhoneNumber, format: PhoneNumberFormat, userDefinedFormats: NumberFormat[]): string;
		formatNationalNumberWithCarrierCode(number: PhoneNumber, carrierCode: string): string;
		formatNationalNumberWithPreferredCarrierCode(number: PhoneNumber, fallbackCarrierCode: string): string;
		formatNumberForMobileDialing(number: PhoneNumber, regionCallingFrom: string, withFormatting: boolean): string;
		formatOutOfCountryCallingNumber(number: PhoneNumber, regionCallingFrom: string): string;
		formatInOriginalFormat(number: PhoneNumber, regionCallingFrom: string): string;
		formatOutOfCountryKeepingAlphaChars(number: PhoneNumber, regionCallingFrom: string): string;
		getNationalSignificantNumber(number: PhoneNumber): string;
		getExampleNumber(region: string): PhoneNumber;
		getExampleNumberForType(region: string, type: PhoneNumberType): PhoneNumber;
		getExampleNumberForNonGeoEntity(countryCallingCode: number): PhoneNumber;
		getNumberType(number: PhoneNumber): PhoneNumberType;
		getMetadataForRegion(regionCode?: string): PhoneMetadata;
		getMetadataForNonGeographicalRegion(countryCallingCode: number): PhoneMetadata;
	    isValidNumber(number: PhoneNumber): boolean;
	    isValidNumberForRegion(number: PhoneNumber, regionCode: string|null): boolean;
	    getRegionCodeForNumber(phoneNumber: PhoneNumber): string;
		getRegionCodeForCountryCode(countryCallingCode: number): string;
		getRegionCodesForCountryCode(countryCallingCode: number): string[];
		getCountryCodeForRegion(regionCode: string|null): number;
		getNddPrefixForRegion(regionCode: string|null, stripNonDigits: boolean): string|null;
		isNANPACountry(regionCode: string|null): boolean;
		isLeadingZeroPossible(countryCallingCode: number): boolean;
		isAlphaNumber(number: string): boolean;
		isPossibleNumber(number: PhoneNumber): boolean;
		isPossibleNumberWithReason(number: PhoneNumber): PhoneNumberUtil.ValidationResult;
		isPossibleNumberString(number: string, regionDialingFrom: string): boolean;
		truncateTooLongNumber(number: PhoneNumber): boolean;
		extractCountryCode(fullNumber: StringBuffer, nationalNumber: StringBuffer): number;
		maybeExtractCountryCode(number: string, defaultRegionMetadata: PhoneMetadata, nationalNumber: StringBuffer, keepRawInput: boolean, phoneNumber: PhoneNumber): number;
		maybeStripInternationalPrefixAndNormalize(number: StringBuffer, possibleIddPrefix: string): PhoneNumber.CountryCodeSource;
		maybeStripNationalPrefixAndCarrierCode(number: StringBuffer, metadata: PhoneMetadata, carrierCode: StringBuffer): boolean;
		maybeStripExtension(number: StringBuffer): string;
	    parse(number: string|null, defaultRegion?: string|null): PhoneNumber;
		parseAndKeepRawInput(number: string, defaultRegion?: string|null): PhoneNumber;
		isNumberMatch(firstNumber: PhoneNumber|string, secondNumber: PhoneNumber|string): PhoneNumberUtil.MatchType;
		canBeInternationallyDialled(number: PhoneNumber): boolean;



	}
	module PhoneNumberUtil {
		enum MatchType {
  			NOT_A_NUMBER,
  			NO_MATCH,
  			SHORT_NSN_MATCH,
  			NSN_MATCH,
  			EXACT_MATCH
		}

		enum ValidationResult {
			IS_POSSIBLE,
			INVALID_COUNTRY_CODE,
			TOO_SHORT,
			TOO_LONG
		}
	}

    export class AsYouTypeFormatter {
        constructor(region: string);
        inputDigit(digit: string): string;
        clear(): void;
    }

}

declare module 'libphonenumber-js' {
    export = libphonenumber;
}
