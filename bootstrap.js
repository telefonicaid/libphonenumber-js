/**
 * @license
 * Copyright (C) 2015 Telefonica I+D
 * GNU AFFERO GENERAL PUBLIC LICENSE 3 (See LICENSE for details)
 */

goog.require('i18n.phonenumbers.AsYouTypeFormatter');
goog.require('i18n.phonenumbers.PhoneNumber');
goog.require('i18n.phonenumbers.PhoneNumber.CountryCodeSource');
goog.require('i18n.phonenumbers.PhoneNumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberType');
goog.require('i18n.phonenumbers.PhoneNumberUtil');
goog.require('i18n.phonenumbers.PhoneNumberUtil.ValidationResult');
goog.require('i18n.phonenumbers.PhoneMetadata');
goog.require('i18n.phonenumbers.NumberFormat');
goog.require('i18n.phonenumbers.PhoneNumberDesc');


// Create the namespace holding the exposed API
// NOTE: `exports` is injected by the build script
var libphonenumber = exports === this
                   ? exports['libphonenumber'] = {}
                   : exports;


// Obtains the descriptor from a Protobuf message class and aliases an
// exportable set of methods for it.
// Note: This relies on the goog.proto2 library not changing its API
function augmentFromDescriptor (ctor) {
    function partial (fn, field) {
        return function () {
            var args = [field];
            args.push.apply(args, arguments);
            return fn.apply(this, args);
        };
    }

    var proto = ctor.prototype;
    var fields = ctor.getDescriptor().getFields();
    for (var i=0; i < fields.length; i++) {
        var tag = fields[i].getTag();
        var name = fields[i].getName().replace(/_([a-z])/g, function (m, m1) {
            return m1.toUpperCase();
        });
        var uname = name.charAt(0).toUpperCase() + name.slice(1);

        proto['get' + uname] = partial(proto.get$Value, tag);
        proto['get' + uname + 'OrDefault'] = partial(proto.get$ValueOrDefault, tag);
        proto['has' + uname] = partial(proto.has$Value, tag);
        proto['set' + uname] = partial(proto.set$Value, tag);
        proto['add' + uname] = partial(proto.add$Value, tag);
        proto['clear' + uname] = partial(proto.clear$Field);
        proto[name + 'Array'] = partial(proto.array$Values, tag);
        proto[name + 'Count'] = partial(proto.count$Values, tag);
    }

    proto['equals'] = proto.equals;
    proto['copyFrom'] = proto.copyFrom;
    proto['mergeFrom'] = proto.mergeFrom;
    proto['clone'] = proto.clone;
}

augmentFromDescriptor(i18n.phonenumbers.PhoneNumber);
augmentFromDescriptor(i18n.phonenumbers.NumberFormat);
augmentFromDescriptor(i18n.phonenumbers.PhoneNumberDesc);
augmentFromDescriptor(i18n.phonenumbers.PhoneMetadata);


// Export Enums
var PhoneNumberType = i18n.phonenumbers.PhoneNumberType;
libphonenumber['PhoneNumberType'] = {
    'FIXED_LINE': PhoneNumberType.FIXED_LINE,
    'FIXED_LINE_OR_MOBILE': PhoneNumberType.FIXED_LINE_OR_MOBILE,
    'MOBILE': PhoneNumberType.MOBILE,
    'PAGER': PhoneNumberType.PAGER,
    'PERSONAL_NUMBER': PhoneNumberType.PERSONAL_NUMBER,
    'PREMIUM_RATE': PhoneNumberType.PREMIUM_RATE,
    'SHARED_COST': PhoneNumberType.SHARED_COST,
    'TOLL_FREE': PhoneNumberType.TOLL_FREE,
    'UAN': PhoneNumberType.UAN,
    'UNKNOWN': PhoneNumberType.UNKNOWN,
    'VOIP': PhoneNumberType.VOIP
};

var PhoneNumberFormat = i18n.phonenumbers.PhoneNumberFormat;
libphonenumber['PhoneNumberFormat'] = {
    'E164': PhoneNumberFormat.E164,
    'INTERNATIONAL': PhoneNumberFormat.INTERNATIONAL,
    'NATIONAL': PhoneNumberFormat.NATIONAL,
    'RFC3966': PhoneNumberFormat.RFC3966
};


// Expose the PhoneNumber (useful for instanceof checks)
libphonenumber['PhoneNumber'] = i18n.phonenumbers.PhoneNumber;

// Define PhoneNumber enums
var CountryCodeSource = i18n.phonenumbers.PhoneNumber.CountryCodeSource;
libphonenumber['PhoneNumber']['CountryCodeSource'] = {
    'FROM_NUMBER_WITH_PLUS_SIGN': CountryCodeSource.FROM_NUMBER_WITH_PLUS_SIGN,
    'FROM_NUMBER_WITH_IDD': CountryCodeSource.FROM_NUMBER_WITH_IDD,
    'FROM_NUMBER_WITHOUT_PLUS_SIGN': CountryCodeSource.FROM_NUMBER_WITHOUT_PLUS_SIGN,
    'FROM_DEFAULT_COUNTRY': CountryCodeSource.FROM_DEFAULT_COUNTRY
};


// Expose PhoneNumberUtil
var PNU = libphonenumber['PhoneNumberUtil'] = i18n.phonenumbers.PhoneNumberUtil;
var PNUp = PNU.prototype;

var ValidationResult = i18n.phonenumbers.PhoneNumberUtil.ValidationResult;
PNU['ValidationResult'] = {
    'INVALID_COUNTRY_CODE': ValidationResult.INVALID_COUNTRY_CODE,
    'IS_POSSIBLE': ValidationResult.IS_POSSIBLE,
    'TOO_LONG': ValidationResult.TOO_LONG,
    'TOO_SHORT': ValidationResult.TOO_SHORT
};

// Static functions
PNU['getInstance'] = PNU.getInstance;
PNU['extractPossibleNumber'] = PNU.extractPossibleNumber;
PNU['isViablePhoneNumber'] = PNU.isViablePhoneNumber;
PNU['normalize'] = PNU.normalize;
PNU['normalizeDigitsOnly'] = PNU.normalizeDigitsOnly;
PNU['convertAlphaCharactersInNumber'] = PNU.convertAlphaCharactersInNumber;
PNU['getCountryMobileToken'] = PNU.getCountryMobileToken;

// Instance functions (note that only public ones are exposed)
PNUp['getLengthOfGeographicalAreaCode'] = PNUp.getLengthOfGeographicalAreaCode;
PNUp['getLengthOfNationalDestinationCode'] = PNUp.getLengthOfNationalDestinationCode;
PNUp['getSupportedRegions'] = PNUp.getSupportedRegions;
PNUp['getSupportedGlobalNetworkCallingCodes'] = PNUp.getSupportedGlobalNetworkCallingCodes;
PNUp['formattingRuleHasFirstGroupOnly'] = PNUp.formattingRuleHasFirstGroupOnly;
PNUp['isNumberGeographical'] = PNUp.isNumberGeographical;
PNUp['format'] = PNUp.format;
PNUp['formatByPattern'] = PNUp.formatByPattern;
PNUp['formatNationalNumberWithCarrierCode'] = PNUp.formatNationalNumberWithCarrierCode;
PNUp['formatNationalNumberWithPreferredCarrierCode'] = PNUp.formatNationalNumberWithPreferredCarrierCode;
PNUp['formatNumberForMobileDialing'] = PNUp.formatNumberForMobileDialing;
PNUp['formatOutOfCountryCallingNumber'] = PNUp.formatOutOfCountryCallingNumber;
PNUp['formatInOriginalFormat'] = PNUp.formatInOriginalFormat;
PNUp['formatOutOfCountryKeepingAlphaChars'] = PNUp.formatOutOfCountryKeepingAlphaChars;
PNUp['getNationalSignificantNumber'] = PNUp.getNationalSignificantNumber;
PNUp['getExampleNumber'] = PNUp.getExampleNumber;
PNUp['getExampleNumberForType'] = PNUp.getExampleNumberForType;
PNUp['getExampleNumberForNonGeoEntity'] = PNUp.getExampleNumberForNonGeoEntity;
PNUp['getNumberType'] = PNUp.getNumberType;
PNUp['getMetadataForRegion'] = PNUp.getMetadataForRegion;
PNUp['getMetadataForNonGeographicalRegion'] = PNUp.getMetadataForNonGeographicalRegion;
PNUp['isValidNumber'] = PNUp.isValidNumber;
PNUp['isValidNumberForRegion'] = PNUp.isValidNumberForRegion;
PNUp['getRegionCodeForNumber'] = PNUp.getRegionCodeForNumber;
PNUp['getRegionCodeForCountryCode'] = PNUp.getRegionCodeForCountryCode;
PNUp['getRegionCodesForCountryCode'] = PNUp.getRegionCodesForCountryCode;
PNUp['getCountryCodeForRegion'] = PNUp.getCountryCodeForRegion;
PNUp['getNddPrefixForRegion'] = PNUp.getNddPrefixForRegion;
PNUp['isNANPACountry'] = PNUp.isNANPACountry;
PNUp['isLeadingZeroPossible'] = PNUp.isLeadingZeroPossible;
PNUp['isAlphaNumber'] = PNUp.isAlphaNumber;
PNUp['isPossibleNumber'] = PNUp.isPossibleNumber;
PNUp['isPossibleNumberWithReason'] = PNUp.isPossibleNumberWithReason;
PNUp['isPossibleNumberString'] = PNUp.isPossibleNumberString;
PNUp['truncateTooLongNumber'] = PNUp.truncateTooLongNumber;
PNUp['extractCountryCode'] = PNUp.extractCountryCode;
PNUp['maybeExtractCountryCode'] = PNUp.maybeExtractCountryCode;
PNUp['maybeStripInternationalPrefixAndNormalize'] = PNUp.maybeStripInternationalPrefixAndNormalize;
PNUp['maybeStripNationalPrefixAndCarrierCode'] = PNUp.maybeStripNationalPrefixAndCarrierCode;
PNUp['maybeStripExtension'] = PNUp.maybeStripExtension;
PNUp['parse'] = PNUp.parse;
PNUp['parseAndKeepRawInput'] = PNUp.parseAndKeepRawInput;
PNUp['canBeInternationallyDialled'] = PNUp.canBeInternationallyDialled;


// Expose the incremental formatter
libphonenumber['AsYouTypeFormatter'] = i18n.phonenumbers.AsYouTypeFormatter;
var AYTFp = i18n.phonenumbers.AsYouTypeFormatter.prototype;
AYTFp['clear'] = AYTFp.clear;
AYTFp['inputDigit'] = AYTFp.inputDigit;
AYTFp['inputDigitAndRememberPosition'] = AYTFp.inputDigitAndRememberPosition;
AYTFp['getRememberedPosition'] = AYTFp.getRememberedPosition;
