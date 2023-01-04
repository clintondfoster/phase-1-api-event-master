# phase-1-api-event-master
# Project Name
> This project, the initial project for phase 1 of Flatiron School Software Engineering program, will help a person search for events and performances in a chosen city. 
<!-- If you have the project hosted somewhere, include the link here. -->

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Environment Setup](#environment-setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
<!-- * [License](#license) -->


## General Information
- Intended for user to be able to search for events and performances in an input city.
- Be able to purchase events in that city, via SeatGeek. 
- Find similar events based on populatity, stay up to date on trending shows.
<!-- You don't have to answer all the questions - just the ones relevant to your project. -->


## Technologies Used
- VS Code - Version: 1.74.2 (Universal)
- Node.js: 16.14.2


## Features
List the ready features here:
- GET - /events - returns events in input city
- GET - /performers - returns performers in input city
- GET - /venues - returns venues in input city
- POST - creates new comment in the review section
- DELETE - deletes item from "saved items" box


<!-- If you have screenshots you'd like to share, include them here. -->


## Environment Setup
Clone the project from the GitHub Repo: (https://github.com/clintondfoster/phase-1-api-event-master)

`$ git clone https://github.com/clintondfoster/phase-1-api-event-master`

Verify you are working with a recent version of Node.Js:
`node -v`

If you Node version is not 16.x.x, install it and set it as the current and default version with:
`nvm install 16`
`nvm use 16`
`nsm alias default 16`

Use the following command to start the server:
`json-server --watch db.json`


## Usage
1. Select genre of event from drop down menu, i.e. Classical, Concert, NHL etc.
2. Enter city name into search bar.
3. See upcoming events filtered by popularity, and when events will happen.
4. Favorite events in a "save for later" folder. 
5. Purchase tickets to chosen event.


## Project Status
Project is: _in progress_ 


## Room for Improvement

Room for improvement:
- Clean up the Code
- Adjust CSS to make user visuals more appealing

To do:
- Add a QR code to ticket scan


## Acknowledgements
- This project was based on [this website](https://seatgeek.com/).
- Many thanks to the technical coaches and instructors at Flatirion School.

## Contact
Created by Clyde Qasolli, Marlowe Recht, and Clinton Foster - feel free to contact us for further inquiries! 


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
