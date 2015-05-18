# libphonenumber

> **TL;DR** run `./build.sh <version>` to generate the bundle file

Google provides a [libphonenumber version for Javascript](https://github.com/googlei18n/libphonenumber/blob/master/javascript/)
however it's implemented using Google's Closure framework, which allows the
Closure compiler to compress the generated code greatly, since methods not
used are removed and those used get their names mangled. The result is that
we cannot directly use the library once optimized from outside Closure code.

Unfortunately using other minifiers on the un-minified library code doesn't
give good enough results, so the only real way to get a minified build is to
use the Closure compiler and somehow expose the APIs we're interested in.


# How to use

When including the generated file on your code it'll create a global variable
named `libphonenumber` to hold all the entities in the library. It's equivalent
to the `i18n.phonenumbers` namespace when working with it using Google Closure.

The Javascript version is a port of the Java one so the easier way to know the
API is to check the [Javadoc generated documentation](http://htmlpreview.github.io/?https://github.com/googlei18n/libphonenumber/blob/master/javadoc/index.html).


## How it works

In `bootstrap.js` we have *defined for export* the whole public API of the
library, the code is pretty straight forward, just making sure we alias with
the normal names the mangled ones.

Then on `build.sh` we send this file to [Google's Closure compiler service](http://closure-compiler.appspot.com)
referencing the required *libphonenumber* files from the GitHub repository,
hence we can easily update to new versions. All the compilation is done
remotely to avoid the need to install any dependency locally. The result is
a file named `libphonenumber.js` which contains a highly minified version of
the code.

```js
var phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
var phone = phoneUtil.parse('+447568116268');
console.log(phone.getNationalNumber());
console.log(phoneUtil.format(phone));
```


# How to sync to changes between versions

Usually the only thing that changes is the metadata, in that case we just
have to run the build script again to get an updated version.

When some methods or enums are changed then we need to reflect those changes
on `bootstrap.js`, it's pretty easy to do and probably is not worth to
automate the process. To know what changed on new versions you can refer to
the [release notes](https://github.com/googlei18n/libphonenumber/blob/master/java/release_notes.txt).

> Obviously if Google refactors the structure of the code, its file names and
  so on, then the build script will need to reflect those changes.

