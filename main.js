var express = require('express');
var os = require('os');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');
var path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 43125);


function links_table() {
  return '<table id="linkMenu">\
		<tr>\
			<td><a class="linkRef" href="/" id="homeLink">Home</a></td>\
      <td><a class="linkRef" href="/addTraveler" id="travelLink">Add Traveler</a></td>\
			<td><a class="linkRef" href="/addCrew" id="addLink">Add Crew</a></td>\
      <td><a class="linkRef" href="/addPlane" id="addLink">Add Plane</a></td>\
      <td><a class="linkRef" href="/addLocation" id="addLink">Add Location</a></td>\
      <td style="width:50%"></td>\
      <td><a class="linkRef" href="/addRoute" id="addLink">Add Route</a></td>\
      <td><a class="linkRef" href="/addCrewList" id="addLink">Add To CrewList</a></td>\
      <td><a class="linkRef" href="/addTravelerList" id="addLink">Add To TravelerList</a></td>\
      <td><a class="linkRef" href="/addFlight" id="addLink">Add Flight</a></td>\
      <td style="width:50%"></td>\
			<td><a class="linkRef" href="/getFlightInfo" id="searchLink">Traveler History</a></td>\
      <td><a class="linkRef" href="/flightManifest" id="searchLink">Flight Manifest</a></td>\
			<td><a class="linkRef" href="/removeTraveler" id="travelLink">Cancel Traveler</a></td>\
			<td><a class="linkRef" href="/updateFlight" id="updateLink">Update Flight</a></td>\
	</table>';
}
function HTML_home(links_table, results) {
  output = `<head>
      <meta charset="utf-8" />
      <title>OA DB Backend</title>
  	<h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
  	<link rel="stylesheet" href="style.css" type="text/css">
  <body>
  	${links_table}
  	<br>
  	<h3 align="center">Airline DB landing page</h3>
  	<div id="info">
  		Welcome to the Oregone Airlines backend administration page.
  		The purpose of this site is to give act as a GUI allowing airline employees
  		to perform restricted CRUD activities to the airline's flight scheduling
  		database. Use a link above to perform one the following business tasks:
  		<ul>
        <li>Add Traveler - Adds a new Traveler who will take a seat on a travelerlist.
        <li>Add Crew - Adds a new Crew member who will be a part of a crewlist.
        <li>Add Plane - Adds a new Plane which can be a part of a flight.
        <li>Add Location - Adds a departure or arrivial destination.
        <li>Add Route - Links two locations as destination and arrivial, naming the route.
        <li>Add to CrewList - Adds a Crew member to a crewlist.
        <li>Add to TravelerList - Adds a Traveler to a travelerlist.
        <li>Add Flight - Adds a flight to the flights.
  			<li>Search Flights - Allows a query of multiple tables in the database, with user
  			supplied constraints and view filters.</li>
  			<li>Cancel Traveler - Allows a Traveler to remove themselves from an upcoming flight.
  			<li>Update Flight - Allows a scheduler to change the plane, crew, or departure time of
  			an already existing flight.</li>
  		</ul>
  	</div>

    <table id="results"> 
      ${results}
    </table>
  </body>`;

  return output;
}
function HTML_add_traveler(links, results) {
  output = `<head>
      <meta charset="utf-8" />
      <title>OA DB Backend</title>
  	<h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
  	<link rel="stylesheet" href="style.css" type="text/css">
  <body>
    	${links}
  	</div>
  	<h3 align="center">Add Traveler</h3>
  	<div>
  	<h4>Traveler</h4>
  	<form id="addTraveler" action="/addTraveler", method="post">
      <table>
        <tr>
          <td>First
          <td><input type="text" name="first_name"/>
        <tr>
          <td>Last
          <td><input type="text" name="last_name"/>
        <tr>
          <td>
          <td><input type="submit"/>
      </table>
  	</form>
  	</div>


    <table id="results"> 
      ${results}
    </table>

  </body>
`;
return output;

}
function HTML_add_crew(links, results) {
  output = `
  <head>
    <meta charset='utf-8' />
    <title>OA DB Backend</title>
    <h1 align='center'>OREGONE AIRLINES DB ADMIN PAGE</h1>
    <link rel='stylesheet' href='style.css' type='text/css'>
  <body>
    	${links}
    </div>
    <h3 align='center'>Create New Crew Member</h3>
    <div>
      <form action='/addCrew' , method='post'>
        <table>
          <tr>
            <td><strong>First Name</strong>
            <td><input type='text' value='' name='first_name' />
          <tr>
            <td><strong>Last Name</strong>
            <td><input type='text' value='' name='last_name' />
          <tr>
            <td><strong>Role</strong>
            <td><select name='role'>
                <option value='Pilot'>Pilot</option>
                <option value='Copilot'>Copilot</option>
                <option value='Steward'>Steward</option>
              </select>
          <tr>
            <td>
            <td><input type='submit'></input>
        </table>
      </form>
    </div>
    <table id='results'> 
      ${results}
    </table>
    <br>
    <br>
    </div>
  </body>
`;

  return output;
}
function HTML_add_plane(links, results) {
  output = `<head>
    <meta charset="utf-8" />
    <title>OA DB Backend</title>
    <h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
    <link rel="stylesheet" href="style.css" type="text/css">

  <body>
    	${links}
    </div>
    <h3 align="center">Create New Plane</h3>
    <div>
      <form action="/addPlane" , method="post">
        <table>
          <tr>
            <td><strong>First Class Seats</strong>
            <td><input type="number" value="" name="num_first_class_seats" />
          <tr>
            <td><strong>Second Class Seats</strong>
            <td><input type="number" value="" name="num_second_class_seats" />
          <tr>
            <td><strong>Third Class Seats</strong>
            <td><input type="number" value="" name="num_third_class_seats" />
          <tr>
            <td>
            <td><input type="submit"></input>
        </table>
      </form>
    </div>

    <table id="results"> 
      ${results}
    </table>

    <br>
    <br>
    </div>
  </body>
`;

return output;

}
function HTML_add_location(links, results) {
  output = `<head>
    <meta charset="utf-8" />
    <title>OA DB Backend</title>
    <h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
    <link rel="stylesheet" href="style.css" type="text/css">

  <body>
    	${links}
    </div>
    <h3 align="center">Create New Location</h3>
    <div>
      <form action="/addLocation" , method="post">
        <table>
          <tr>
            <td><strong>City</strong>
            <td><input type="text" value="" name="city" />
          <tr>
            <td><strong>State</strong>
            <td><input type="text" value="" name="state" />
          <tr>
            <td><strong>ZIP</strong>
            <td><input type="number" value="" name="zip" />
          <tr>
            <td><strong>Airport CODE</strong>
            <td><input type="text" value="" name="airport_code" />
          <tr>
            <td>
            <td><input type="submit"></input>
        </table>
      </form>
    </div>

    <table id="results"> 
      ${results}
    </table>

    <br>
    <br>
    </div>
  </body>
`;
return output;
}
function HTML_add_route(links, location_options, results) {
  output = `<head>
    <meta charset="utf-8" />
    <title>OA DB Backend</title>
    <h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
    <link rel="stylesheet" href="style.css" type="text/css">

  <body>
    	${links}
    </div>
    <h3 align="center">Create New Route</h3>
    <div>
      <form action="/addRoute" , method="post">
        <table>
          <tr>
            <td><strong>Name</strong>
            <td><input type="text" value="" name="name" />
          <tr>
            <td><strong>Departure</strong>
            <td><select name="departure_location_id">
                ${location_options}
              </select>
          <tr>
            <td><strong>Arrivial</strong>
            <td><select name="arrivial_location_id">
                ${location_options}
              </select>
          <tr>
            <td>
            <td><input type="submit"></input>
        </table>
      </form>
    </div>

    <table id="results"> 
      ${results}
    </table>

    <br>
    <br>
    </div>
  </body>
`;
return output;
}
function HTML_add_crewlist(links, crewlist_options, crew_options, results) {
  output = `<head>
    <meta charset="utf-8" />
    <title>OA DB Backend</title>
    <h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
    <link rel="stylesheet" href="style.css" type="text/css">

  <body>
    	${links}
    </div>
    <h3 align="center">Add Crew to List</h3>
    <div>
      <form action="/addCrewList" , method="post">
        <table>
          <tr>
            <td><strong>List</strong>
            <td><select name="crewlist_id">
              <option value="">New</option>
                ${crewlist_options}
              </select>
          <tr>
            <td><strong>Crew</strong>
            <td><select name="crew_id">
                ${crew_options}
              </select>
          <tr>
            <td>
            <td><input type="submit"></input>
        </table>
      </form>
    </div>

    <table id="results"> 
      ${results}
    </table>

    <br>
    <br>
    </div>
  </body>
`;
return output;
}
function HTML_add_travelerlist(links, travelerlist_options, traveler_options, results) {
  output = `<head>
    <meta charset="utf-8" />
    <title>OA DB Backend</title>
    <h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
    <link rel="stylesheet" href="style.css" type="text/css">

  <body>
    	${links}
    </div>
    <h3 align="center">Add Traveler to List</h3>
    <div>
      <form action="/addTravelerList" , method="post">
        <table>
          <tr>
            <td><strong>List</strong>
            <td><select name="travelerlist_id">
              <option value="">New</option>
              ${travelerlist_options}
              </select>
          <tr>
            <td><strong>Traveler</strong>
            <td><select name="traveler_id">
              ${traveler_options}
              </select>
          <tr>
            <td>
            <td><input type="submit"></input>
        </table>
      </form>
    </div>

    <table id="results"> 
      ${results}
    </table>

    <br>
    <br>
    </div>
  </body>
`;
return output;
}
function HTML_add_flight(links, route_options, crewlist_options, plane_options, travelerlist_options, results) {
  output = `﻿<head>
    <meta charset="utf-8" />
    <title>OA DB Backend</title>
    <h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
    <link rel="stylesheet" href="style.css" type="text/css">

  <body>
    	${links}
    </div>
    <h3 align="center">Create New Flight</h3>
    <div>
      <form action="/addFlight" , method="post">
        <table>
          <tr>
            <td><strong>Depart Date</strong>
            <td><input type="date" value="2025-01-01" name="projected_departure_date" />
          <tr>
            <td><strong>Depart Time</strong>
            <td><input type="time" value="T09:30:00" step="1" name="projected_departure_time" />
          <tr>
            <td><strong>Arrival Date</strong>
            <td><input type="date" value="2025-01-01" name="projected_arrival_date" />
          <tr>
            <td><strong>Arrival Time</strong>
            <td><input type="time" value="T12:30:00" step="1" name="projected_arrival_time" />
          <tr>
            <td><strong>Route</strong>
            <td><select name="route_id">
              ${route_options}
                </select>
          <tr>
            <td><strong>CrewList</strong>
            <td><select name="crewlist_id">
                ${crewlist_options}
              </select>
          <tr>
            <td><strong>Plane</strong>
            <td><select name="plane_id">
              ${plane_options}
              </select>
          <tr>
            <td><strong>TravelerList First Class</strong>
            <td><select name="first_class_travelerlist_id">
              ${travelerlist_options}
              </select>
          <tr>
            <td><strong>TravelerList Second Class</strong>
            <td><select name="second_class_travelerlist_id">
              ${travelerlist_options}
              </select>
          <tr>
            <td><strong>TravelerList Third Class</strong>
            <td><select name="third_class_travelerlist_id">
              ${travelerlist_options}
              </select>
          <tr>
            <td>
            <td><input type="submit"></input>
        </table>
      </form>
    </div>

    <table id="results"> 
      ${results}
    </table>

    <br>
    <br>
    </div>
  </body>
`;
return output;
}
function HTML_get_flight_info(links_table, traveler_options, results) {
  output = `<head>
      <meta charset="utf-8" />
      <title>OA DB Backend</title>
  	<h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
  	<link rel="stylesheet" href="style.css" type="text/css">
    <script>

    function hide(elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = 'none';
      }
    }

    function show(elements) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = '';
      }
    }

    function toggle_class(checkbox_id, class_name) {
      var check = document.getElementById(checkbox_id);
      var cols = document.getElementsByClassName(class_name);
      if (check.checked) {
        show(cols);
      } else {
        hide(cols);
      }
    }

    </script>
  <body>
    	${links_table}
  	</div>
  	<h3 align="center">Search Traveler History</h3>


  	<div>
  	<form id="searchFlight" action="/getFlightInfo", method="post">
      <table>
        <tr>
          <td colspan="2"><center><strong>Show</strong></center>
        <tr>
          <td><input type="checkbox" id="showFlightId" name="showFlightId" onchange="toggle_class('showFlightId','resultsFlightId')" checked/>
          <td><label for="showFlightId">Flight ID</label>
        <tr>
          <td><input type="checkbox" id="showPlaneId" name="showPlaneId" onchange="toggle_class('showPlaneId','resultsPlaneId')" checked/>
          <td><label for="showPlaneId">Plane ID</label>
        <tr>
          <td><input type="checkbox" id="showDepartTimes" name="showDepartTimes" onchange="toggle_class('showDepartTimes','resultsDepartureTime')" checked/>
          <td><label for="showDepartTimes">Proj/Actual Departure Time</label>
        <tr>
          <td><input type="checkbox" id="showArrivalTimes" name="showArrivalTimes" onchange="toggle_class('showArrivalTimes','resultsArrivialTime')" checked/>
          <td><label for="showArrivalTimes">Proj/Actual Arrival Time</label>
        <tr>
          <td><input type="checkbox" id="showRouteId" name="showRouteId" onchange="toggle_class('showRouteId','resultsRouteId')" checked/>
          <td><label for="showRouteId">Route ID</label>
  	  <tr>
          <td><input type="checkbox" id="showDepartLoc" name="showDepartLoc" onchange="toggle_class('showDepartLoc','resultsDepartLoc')" checked/>
          <td><label for="showDepartLoc">Departing Airport</label>
  	  <tr>
          <td><input type="checkbox" id="showDestLoc" name="showDestLoc" onchange="toggle_class('showDestLoc','resultsDestLoc')" checked/>
          <td><label for="showDestLoc">Destination Airport</label>
        <tr>
          <td colspan="2"><center><strong>Filter</strong></center>
        <tr>
          <td>Traveler
          <td><select name="traveler_id">
               ${traveler_options}
              </select>
        <tr>
          <td><input type="checkbox" id="firstClass" name="showFirstClass" checked/>
          <td><label for="firstClass">First Class</label>
        <tr>
          <td><input type="checkbox" id="secondClass" name="showSecondClass" checked/>
          <td><label for="secondClass">Second Class</label>
        <tr>
          <td><input type="checkbox" id="thirdClass" name="showThirdClass" checked/>
          <td><label for="thirdClass">Third Class</label>
        <tr>
          <td>
          <td><input type="submit"/>
      </table>
  	</form>

    <table id="results"> 
      <tr>
        <td class="resultsFlightId">FlightID
        <td class="resultsPlaneId">PlaneID
        <td class="resultsDepartureTime">DepartureTime
        <td class="resultsArrivialTime">ArrivialTime
        <td class="resultsRouteId">RouteID
    	  <td class="resultsDepartLoc">DepartingAirport
    	  <td class="resultsDestLoc">DestinationAirport
        <td class="resultsTravelerId">TravelerID
        <td class="resultsSeatClass">SeatClass
      <tr>
        <td class="resultsFlightId">0
        <td class="resultsPlaneId">100
        <td class="resultsDepartureTime">EXAMPLE
        <td class="resultsArrivialTime">EXAMPLE
        <td class="resultsRouteId">3
    	  <td class="resultsDepartLoc">PDX
    	  <td class="resultsDestLoc">SFO
        <td class="resultsTravelerId">7
        <td class="resultsSeatClass">2
        ${results}
    </table>

  	</div>

    <script>
      toggle_class('showFlightId','resultsFlightId');
      toggle_class('showPlaneId','resultsPlaneId');
      toggle_class('showDepartTimes','resultsDepartureTime');
      toggle_class('showArrivalTimes','resultsArrivialTime');
      toggle_class('showRouteId','resultsRouteId');
    </script>
  </body>
`;
return output;
}
function HTML_remove_traveler(links_table, traveler_options, flight_options, results) {
  output = `<head>
      <meta charset="utf-8" />
      <title>OA DB Backend</title>
  	<h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
  	<link rel="stylesheet" href="style.css" type="text/css">
  <body>
    	${links_table}
  	</div>
  	<h3 align="center">Remove Traveler From Flight</h3>
  	<div>
  	<h4>Traveler</h4>
  	<form id="removeTraveler" action="/removeTraveler", method="post">
      <table>
        <tr>
          <td>Travelers
          <td><select name="traveler_id">
            ${traveler_options}
          </select>
        <tr>
          <td>Flight ID
          <td><select name="flight_id">
            ${flight_options}
          </select>
        <tr>
          <td>
          <td><input type="submit"/>
      </table>
  	</form>
  	</div>


    <table id="results"> 
      ${results}
    </table>

  </body>
`;
return output;
}
function HTML_update_flight(links_table, flight_options, plane_options, results) {
  output = `﻿<head>
      <meta charset="utf-8" />
      <title>OA DB Backend</title>
  	<h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
  	<link rel="stylesheet" href="style.css" type="text/css">
  <body>
    	${links_table}
  	</div>
  	<h3 align="center">Update Flight</h3>
  	<div>
  	<form action="/updateFlight", method="post">
      <table>
        <tr>
          <td>FlightID
          <td><select name="flight_id">
              <option value="1">1</option>
              ${flight_options}
              </select>
        <tr>
          <td>PlaneID
          <td><select name="plane_id">
              ${plane_options}
          </select>
        <tr>
          <td><strong>Depart Date</strong>
          <td><input type="date" name="projected_departure_date" />
        <tr>
          <td><strong>Depart Time</strong>
          <td><input type="time" step="1" name="projected_departure_time" />
        <tr>
          <td><strong>Arrival Date</strong>
          <td><input type="date" name="projected_arrival_date" />
        <tr>
          <td><strong>Arrival Time</strong>
          <td><input type="time" step="1" name="projected_arrival_time" />
        <tr>
          <td>
          <td><input type="submit"/>
      </table>
  	</form>
  	</div>


    <table id="results"> 
        ${results}
    </table>

  </body>
`;
return output;
}
function HTML_flight_manifest(links_table, flight_options, results) {
  output = `<head>
      <meta charset="utf-8" />
      <title>OA DB Backend</title>
  	<h1 align="center">OREGONE AIRLINES DB ADMIN PAGE</h1>
  	<link rel="stylesheet" href="style.css" type="text/css">
  <body>
    	${links_table}
  	</div>
  	<h3 align="center">Flight Manifest</h3>


  	<div>
  	<form id="flightManifest" action="/flightManifest", method="post">
      <table>
        <tr>
          <td>FlightID
          <td><select name="flight_id">
  		${flight_options}
  		</select>
        <tr>
          <td>Manifest Type
          <td><select name="manifest_type">
  			<option value="Traveler">Traveler</option>
  			<option value="Crew">Crew</option>
  			</select>
        <tr>
          <td>
          <td><input type="submit"/>
      </table>
  	</form>

    <table id="results"> 
      ${results}
    </table>

  	</div>
  </body>`;

  return output;
}

function HTML_option_routes(route) {
  output = ""
  for (let i = 0; i < route.length; i++) {
    output = output + "<option value=\"" + route[i].route_id + "\">" + route[i].name + "</option>";
  }
  return output;
}
function HTML_option_locations(location) {
  output = ""
  for (let i = 0; i < location.length; i++) {
    output = output + "<option value=\"" + location[i].location_id + "\">" + location[i].airport_code + "</option>";
  }
  return output;
}
function HTML_option_crewlists(crewlist) {
  output = ""
  for (let i = 0; i < crewlist.length; i++) {
    output = output + "<option value=\"" + crewlist[i].crewlist_id + "\">" + crewlist[i].crewlist_id + "</option>";
  }
  return output;
}
function HTML_option_crews(crew) {
  output = ""
  for (let i = 0; i < crew.length; i++) {
    output = output + "<option value=\"" + crew[i].crew_id + "\">" + crew[i].first_name + " " + crew[i].last_name + "</option>";
  }
  return output;
}
function HTML_option_travelerlists(travelerlist) {
  output = ""
  for (let i = 0; i < travelerlist.length; i++) {
    output = output + "<option value=\"" + travelerlist[i].travelerlist_id + "\">" + travelerlist[i].travelerlist_id + "</option>";
  }
  return output;
}
function HTML_option_travelers(traveler) {
  output = ""
  for (let i = 0; i < traveler.length; i++) {
    output = output + "<option value=\"" + traveler[i].traveler_id + "\">" + traveler[i].first_name + " " + traveler[i].last_name + "</option>";
  }
  return output;
}
function HTML_option_planes(plane) {
  output = ""
  for (let i = 0; i < plane.length; i++) {
    output = output + "<option value=\"" + plane[i].plane_id + "\">" + plane[i].plane_id + "</option>";
  }
  return output;
}
function HTML_option_flights(flight) {
  output = ""
  for (let i = 0; i < flight.length; i++) {
    output = output + "<option value=\"" + flight[i].flight_id + "\">" + flight[i].flight_id + "</option>";
  }
  return output;
}


app.get('/', function (req, res) {
  res.send(HTML_home(links_table(), ""));
});

app.get('/addTraveler', function (req, res) {
  res.send(HTML_add_traveler(links_table(), ""));
});
app.get('/addCrew', function (req, res) {
  res.send(HTML_add_crew(links_table(), ""));
});
app.get('/addPlane', function (req, res) {
  res.send(HTML_add_plane(links_table(), ""));
});
app.get('/addLocation', function (req, res) {
  res.send(HTML_add_location(links_table(), ""));
});
app.get('/addRoute', function (req, res) {
  mysql.pool.query("SELECT * from Location;", function (err, result, fields) {
    res.send(HTML_add_route(links_table(), HTML_option_locations(result), ""));
  });
});

app.get('/addFlight', function (req, res) {
  mysql.pool.query("SELECT * from Route;", function (err, route, fields) {
    mysql.pool.query("SELECT DISTINCT crewlist_id from CrewList;", function(err, crewlist, fields) {
      mysql.pool.query("SELECT * from Plane;", function(err, plane, fields) {
        mysql.pool.query("SELECT DISTINCT travelerlist_id from TravelerList;", function(err, travelerlist, fields) {
          res.send(HTML_add_flight(links_table(), HTML_option_routes(route), HTML_option_crewlists(crewlist), HTML_option_planes(plane), HTML_option_travelerlists(travelerlist), ""));
        });
      });
    });
  });
});
app.get('/addCrewList', function (req, res) {
  mysql.pool.query("SELECT DISTINCT crewlist_id from CrewList;", function (err, crewlist, fields) {
    mysql.pool.query("SELECT * from Crew;", function(err, crew, fields) {
      res.send(HTML_add_crewlist(links_table(), HTML_option_crewlists(crewlist), HTML_option_crews(crew), ""));
    });
  });
});
app.get('/addTravelerList', function (req, res) {
  mysql.pool.query("SELECT DISTINCT travelerlist_id from TravelerList;", function (err, travelerlist, fields) {
    mysql.pool.query("SELECT * from Traveler;", function(err, traveler, fields) {
      res.send(HTML_add_travelerlist(links_table(), HTML_option_travelerlists(travelerlist), HTML_option_travelers(traveler), ""));
    });
  });
});

app.get('/getFlightInfo', function (req, res) {
  mysql.pool.query("SELECT * from Traveler;", function (err, traveler, fields) {
    res.send(HTML_get_flight_info(links_table(), HTML_option_travelers(traveler), ""));
  });
});
app.get('/flightManifest', function (req, res) {
  mysql.pool.query("SELECT * from Flight;", function(err, flight, fields) {
    res.send(HTML_flight_manifest(links_table(), HTML_option_flights(flight), ""));
  });
});
app.get('/updateFlight', function (req, res) {
  mysql.pool.query("SELECT * from Plane;", function(err, plane, fields) {
    mysql.pool.query("SELECT * from Flight;", function(err, flight, fields) {
      res.send(HTML_update_flight(links_table(), HTML_option_flights(flight), HTML_option_planes(plane), ""));
    });
  });
});
app.get('/removeTraveler', function (req, res) {
  mysql.pool.query("SELECT * from Traveler;", function(err, traveler, fields) {
    mysql.pool.query("SELECT * from Flight;", function(err, flight, fields) {
      res.send(HTML_remove_traveler(links_table(), HTML_option_travelers(traveler), HTML_option_flights(flight), ""));
    });
  });
});





app.post('/addTraveler', function (req, res) {
  console.log(req.body)
  first_name = req.body.first_name;
  last_name = req.body.last_name;

  query = "INSERT INTO Traveler (first_name, last_name) VALUES ('" + first_name + "', '" + last_name + "');"
  mysql.pool.query(query, function(err, query_results, fields) {
    console.log( query + "\n");
    res.send(HTML_add_traveler(links_table(), ""));
  });

});
app.post('/addCrew', function (req, res) {
  console.log(req.body)
  first_name = req.body.first_name;
  last_name = req.body.last_name;
  role = req.body.role;

  query = "INSERT INTO Crew (first_name, last_name, role) VALUES ('" + first_name + "', '" + last_name + "', '" + role + "');"
  mysql.pool.query(query, function(err, query_results, fields) {
    console.log( query + "\n");
    res.send(HTML_add_crew(links_table(), ""));
  });

});
app.post('/addPlane', function (req, res) {
  console.log(req.body)
  num_first_class_seats = req.body.num_first_class_seats;
  num_second_class_seats = req.body.num_second_class_seats;
  num_third_class_seats = req.body.num_third_class_seats;

  query = "INSERT INTO Plane (num_first_class_seats, num_second_class_seats, num_third_class_seats) VALUES (" + num_first_class_seats + ", " + num_second_class_seats + ", " + num_third_class_seats + ");"
  mysql.pool.query(query, function(err, query_results, fields) {
    console.log( query + "\n");
    res.send(HTML_add_plane(links_table(), ""));
  });

});
app.post('/addLocation', function (req, res) {
  console.log(req.body)
  city = req.body.city;
  state = req.body.state;
  airport_code = req.body.airport_code;
  zip = req.body.zip;

  query = "INSERT INTO Location (city, state, airport_code, zip) VALUES ('" + city + "', '" + state + "', '" + airport_code + "', " + zip + ");"
  mysql.pool.query(query, function(err, query_results, fields) {
    console.log( query + "\n");
    res.send(HTML_add_location(links_table(), ""));
  });

});
app.post('/addRoute', function (req, res) {
  console.log(req.body);
  name = req.body.name;
  departure_location_id = req.body.departure_location_id;
  arrivial_location_id = req.body.arrivial_location_id;

  query = "REPLACE INTO Route (name, departure_location_id, arrival_location_id) VALUES ('" + name + "', " + departure_location_id + ", " + arrivial_location_id + " );"
  mysql.pool.query(query, function(err, query_results, fields) {
    console.log( query + "\n");
    mysql.pool.query("SELECT * from Location;", function (err, result, fields) {
      res.send(HTML_add_route(links_table(), HTML_option_locations(result), ""));
    });
  });

});
app.post('/addFlight', function (req, res) {
  console.log(req.body);
  route_id = req.body.route_id;
  crewlist_id = req.body.crewlist_id;
  plane_id = req.body.plane_id;
  first_class_travelerlist_id = req.body.first_class_travelerlist_id;
  second_class_travelerlist_id = req.body.second_class_travelerlist_id;
  third_class_travelerlist_id = req.body.third_class_travelerlist_id;
  projected_departure_date = req.body.projected_departure_date;
  projected_arrival_date = req.body.projected_arrival_date;
  projected_departure_time = req.body.projected_departure_time;
  projected_arrival_time = req.body.projected_arrival_time;

  query = "INSERT INTO Flight (route_id, crewlist_id, plane_id, first_class_travelerlist_id, second_class_travelerlist_id, third_class_travelerlist_id, projected_departure_date, projected_departure_time, projected_arrival_date, projected_arrival_time) VALUES (" + route_id + ", " + crewlist_id + ", " + plane_id + ", " + first_class_travelerlist_id + ", " + second_class_travelerlist_id + ", " + third_class_travelerlist_id + ", '" + projected_departure_date + "', '" + projected_departure_time + "', '" + projected_arrival_date + "', '" + projected_arrival_time + "');";
  mysql.pool.query(query, function(err, query_results, fields) {
    console.log( query + "\n");
    mysql.pool.query("SELECT * from Route;", function (err, route, fields) {
      mysql.pool.query("SELECT DISTINCT crewlist_id from CrewList;", function(err, crewlist, fields) {
        mysql.pool.query("SELECT * from Plane;", function(err, plane, fields) {
          mysql.pool.query("SELECT DISTINCT travelerlist_id from TravelerList;", function(err, travelerlist, fields) {
            res.send(HTML_add_flight(links_table(), HTML_option_routes(route), HTML_option_crewlists(crewlist), HTML_option_planes(plane), HTML_option_travelerlists(travelerlist), ""));
          });
        });
      });
    });
  });
});
app.post('/addCrewList', function (req, res) {
  console.log(req.body);
  crewlist_id = req.body.crewlist_id;
  crew_id = req.body.crew_id;

  if ("" == crewlist_id) {
    query = "INSERT INTO CrewList (crew_id) VALUES ('" + crew_id + "');";
  } else {
    query = "INSERT INTO CrewList (crewlist_id, crew_id) VALUES ('" + crewlist_id + "', '" + crew_id + "');";
  }
  mysql.pool.query(query, function(err, query_results, fields) {
    console.log( query + "\n");
    mysql.pool.query("SELECT DISTINCT crewlist_id from CrewList;", function (err, crewlist, fields) {
      mysql.pool.query("SELECT * from Crew;", function(err, crew, fields) {
        res.send(HTML_add_crewlist(links_table(), HTML_option_crewlists(crewlist), HTML_option_crews(crew), ""));
      });
    });
  });

});
app.post('/addTravelerList', function (req, res) {
  console.log(req.body);
  travelerlist_id = req.body.travelerlist_id;
  traveler_id = req.body.traveler_id;

  if ("" == travelerlist_id) {
    query = "INSERT INTO TravelerList (traveler_id) VALUES (" + traveler_id + ")";
  } else {
    query = "INSERT INTO TravelerList (travelerlist_id, traveler_id) VALUES (" + travelerlist_id + "," + traveler_id + ")";
  }
  mysql.pool.query(query, function(err, query_results, fields) {
    console.log( query + "\n");
    mysql.pool.query("SELECT DISTINCT travelerlist_id from TravelerList;", function (err, travelerlist, fields) {
      mysql.pool.query("SELECT * from Traveler;", function(err, traveler, fields) {
        res.send(HTML_add_travelerlist(links_table(), HTML_option_travelerlists(travelerlist), HTML_option_travelers(traveler), ""));
      });
    });
  });

});
app.post('/getFlightInfo', function (req, res) {
    console.log(req.body);
    traveler_id = req.body.traveler_id;
    first_class = "";
    second_class = "";
    third_class = "";
    class_filter = "on";
    last_class = "o";

    if (class_filter.localeCompare(req.body.showFirstClass) == 0) {
        first_class = "INNER JOIN TravelerList AS o ON o.travelerlist_id = f.first_class_travelerlist_id ";
    }
    else {
        last_class = "";
    }

    if (class_filter.localeCompare(req.body.showSecondClass) == 0) {
        second_class = "INNER JOIN TravelerList AS s ON s.travelerlist_id = f.second_class_travelerlist_id ";
        last_class = "s";
    }

    if (class_filter.localeCompare(req.body.showThirdClass) == 0) {
        third_class = "INNER JOIN TravelerList AS t ON t.travelerlist_id = f.third_class_travelerlist_id ";
        last_class = "t";
    }

    query = "SELECT DISTINCT f.flight_id, f.plane_id, f.projected_departure_time, f.projected_arrival_time, f.route_id, r.name FROM Flight AS f INNER JOIN Route AS r ON r.route_id = f.route_id " + first_class + second_class + third_class + "WHERE " + last_class + ".traveler_id = " + traveler_id + ";";
    console.log(query);
    mysql.pool.query(query, function (err, results, fields) {
      console.log(results);
      res.send(HTML_get_flight_info(links_table(), HTML_option_travelers(results), ""));
    });

});
app.post('/flightManifest', function (req, res) {
    console.log(req.body);
    flight_id = req.body.flight_id;
    manifest_type = req.body.manifest_type;

    mysql.pool.query("SELECT * from Flight;", function(err, flight, fields) {
      res.send(HTML_flight_manifest(links_table(), HTML_option_flights(flight), ""));
    });
});
app.post('/updateFlight', function (req, res) {
  console.log(req.body);
  flight_id = req.body.flight_id;
  plane_id = req.body.plane_id;
  projected_departure_time = req.body.projected_departure_time;
  projected_departure_date = req.body.projected_departure_date;
  projected_arrival_time = req.body.projected_arrival_time;
  projected_arrival_date = req.body.projected_arrival_date;
  buildUpdate = "";
  if (plane_id.length != 0) {
      buildUpdate = buildUpdate + "plane_id = " + plane_id + ", "; 
    }
  if (projected_departure_time != 0) {
      buildUpdate = buildUpdate + "projected_departure_time = '" + projected_departure_time + "', ";
    }
  if (projected_departure_date != 0) {
        buildUpdate = buildUpdate + "projected_departure_date = '" + projected_departure_date + "', ";
    }
  if (projected_arrival_time != 0) {
      buildUpdate = buildUpdate + "projected_arrival_time = '" + projected_arrival_time + "', ";
    }
  if (projected_arrival_date != 0) {
      buildUpdate = buildUpdate + "projected_arrival_date = '" + projected_arrival_date + "', ";
    }
  buildUpdate = buildUpdate.slice(0, -2);                                                   //https://stackoverflow.com/questions/952924/javascript-chop-slice-trim-off-last-character-in-string
  query = "UPDATE Flight SET " + buildUpdate + " WHERE flight_id = " + flight_id + ";";
  console.log(query);

    mysql.pool.query(query, function (err, return_vals, fields) {
        mysql.pool.query("SELECT * from Plane;", function (err, plane, fields) {
            mysql.pool.query("SELECT * from Flight;", function (err, flight, fields) {
                res.send(HTML_update_flight(links_table(), HTML_option_flights(flight), HTML_option_planes(plane), ""));
            });
        });
    });
});
app.post('/removeTraveler', function (req, res) {
 // console.log(req.body);
  traveler_id = req.body.traveler_id;
  flight_id = req.body.flight_id;

  query = "SELECT first_class_travelerlist_id, second_class_travelerlist_id, third_class_travelerlist_id from Flight WHERE flight_id = " + flight_id + ";";
  mysql.pool.query(query, function (err, travelerlist_ids, fields) {
    id_1 = travelerlist_ids[0].first_class_travelerlist_id;
    id_2 = travelerlist_ids[0].second_class_travelerlist_id;
    id_3 = travelerlist_ids[0].third_class_travelerlist_id;

    query = "DELETE FROM TravelerList WHERE ( traveler_id=" + traveler_id + " AND travelerlist_id="  + id_1 + " )" +
                                       " OR ( traveler_id=" + traveler_id + " AND travelerlist_id="  + id_2 + " )" +
                                       " OR ( traveler_id=" + traveler_id + " AND travelerlist_id="  + id_3 + " );";
    mysql.pool.query(query, function(err, return_vals, fields) {

      mysql.pool.query("SELECT * from Traveler;", function(err, traveler, fields) {
        mysql.pool.query("SELECT * from Flight;", function(err, flight, fields) {
          res.send(HTML_remove_traveler(links_table(), HTML_option_travelers(traveler), HTML_option_flights(flight), ""));
        });
      });

    });
  });

});




//404 page
app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

//500 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});


app.listen(app.get('port'), function () {
    console.log('Express started on http://' + os.hostname() + ':' + app.get('port') + '; press Ctrl-C to terminate.');
});
 
