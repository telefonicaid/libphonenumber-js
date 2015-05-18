/*
 * Copyright (C) 2015 Telefonica I+D
 * GNU AFFERO GENERAL PUBLIC LICENSE 3 (See LICENSE for details)
 */

var assert = require('assert');

var argv = process.argv.slice(2);
var libphonenumber = require('./' + argv[0]);

var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
var PhoneNumberFormat = libphonenumber.PhoneNumberFormat;

var spanish = phoneUtil.getExampleNumber('es');
assert.equal(phoneUtil.getRegionCodeForNumber(spanish), 'ES');

var phone = phoneUtil.parse('+4407568116268');
assert.equal(phoneUtil.getRegionCodeForNumber(phone), 'GB');
assert.equal(phoneUtil.format(phone), '7568 116268');
assert.equal(phoneUtil.format(phone, PhoneNumberFormat.INTERNATIONAL), '+44 7568 116268');
