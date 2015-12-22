# micro-app-timezones

Micro app for keeping track of current time for people you work with

![sample timezones page](https://raw.githubusercontent.com/mhdawson/micro-app-timezones/master/pictures/timezones-window.jpg)

# Usage

After installation modify ../lib/config.json to match your configuration

Each entry contains the following

* person - the name for the person the current time will be displayed for
* offset - the timezone offset for the person

As an example the configuration file that comes with the install is:

<PRE>
{
  "title": "Timezones",
  "dashboardEntries": [ { "person": "Me", "offset": -5 },
                        { "person": "Hursley", "offset": 0 },
                        { "person": "James", "offset": -8 },
                        { "person": "Gireesh", "offset": 5.5  },
                        { "person": "Matt", "offset": -6 },
                        { "person": "BenN", "offset": 1 },
                        { "person": "Ritchie", "offset": -8 },
                        { "person": "TonyF", "offset": -5 }
                      ],
}
</PRE>

#Installation

Simply run npm install micr-app-timezones

#Running

To run the phone-dialer, add node.js to your path (currently requires 4.x or better) and
then run:

<PRE>
npm start
</PRE>

From the directory in which the micro-app-timezones was installed.

Once the server is started. Point your browser at the host/port for the server.
If you have configured your browswer to allow javascript to close the current page
the original window will be closed and one with the correct size of the timezones page
will be created.

You can also override the default configuration by providing the list of people/offsets
as part of the URL as a set of name=value parameters.  For example:

http://10.1.1.187:3000?Me=-5&Paul=1&Sue=2

In which case the people you have specified in the URL will be displayed instead of
those in the config.json file


#Example

The following is the page shown for my configuration:

![sample timezones page](https://raw.githubusercontent.com/mhdawson/micro-app-timezones/master/pictures/timezones-window.jpg)

#Key Depdencies

## micro-app-framework
As a micro-app the phone-dialer depends on the micro-app-framework:

* [micro-app-framework npm](https://www.npmjs.com/package/micro-app-framework)
* [micro-app-framework github](https://github.com/mhdawson/micro-app-framework)

See the documentation on the micro-app-framework for more information on general
configurtion options that are availble (ex using tls, authentication, serverPort, etc)

# TODO

* Add handling for daylight savings time
* nicer page layout
* improve page size calculation and or precision of the sizes of the entries
