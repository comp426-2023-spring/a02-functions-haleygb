#!/usr/bin/env node

//import required packages
import minimist from "minimist"
import fetch from "node-fetch"
import moment from "moment-timezone"

const help_text = 'Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE \n \
-h            Show this help message and exit. \n \
-n, -s        Latitude: N positive; S negative. \n \
-e, -w        Longitude: E positive; W negative. \n \
-z            Time zone: uses tz.guess() from moment-timezone by default. \n \
-d 0-6        Day to retrieve weather: 0 is today; defaults to 1. \n \
-j            Echo pretty JSON from open-meteo API and exit.'

//parse command-line arguments
const args = minimist(process.argv.slice(2))
//test to see if one of the args is h
if (args.h) {
    console.log(help_text)
    exit(0)}
//extract timezone
const timezone = moment.tz.guess()

//format latitude and longitude args
const latitude = args.n || -args.s
const longitude = args.e || -args.w

//make a fetch API route and format data
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&timezone=' + timezone);
const data = await response.json()

if (args.j) {
    console.log(data)
    exit(0)}


//add information for a specific day
const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}






    

