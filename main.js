var express = require('express');
var os = require('os');

var app = express();
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });
var bodyParser = require('body-parser');
var path = require('path');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 44225);



function getRoute() {
  query = "SELECT * from Route";
  console.log(query);
  route = [];
  route.push({route_id:0, name:'abc', departure_location_id:0, arrivial_location_id:1});
  route.push({route_id:1, name:'def', departure_location_id:0, arrivial_location_id:2});
  route.push({route_id:2, name:'hij', departure_location_id:0, arrivial_location_id:3});
  route.push({route_id:3, name:'klm', departure_location_id:1, arrivial_location_id:0});
  route.push({route_id:4, name:'nop', departure_location_id:1, arrivial_location_id:2});
  route.push({route_id:5, name:'qrs', departure_location_id:1, arrivial_location_id:3});
  route.push({route_id:6, name:'tuv', departure_location_id:2, arrivial_location_id:0});
  route.push({route_id:7, name:'wxy', departure_location_id:2, arrivial_location_id:1});
  route.push({route_id:8, name:'zAA', departure_location_id:2, arrivial_location_id:3});
  route.push({route_id:9, name:'BBC', departure_location_id:3, arrivial_location_id:0});
  route.push({route_id:10, name:'CDD', departure_location_id:3, arrivial_location_id:1});
  route.push({route_id:11, name:'EEF', departure_location_id:3, arrivial_location_id:2});
  return route;
}
function getLocation() {
  query = "SELECT * from Location";
  console.log(query);
  location = []
  location.push({location_id:0, city:'Corvallis', state:'Oregon', zip:97333, airport_code:'COR'})
  location.push({location_id:1, city:'Portland', state:'Oregon', zip:97222, airport_code:'PDX'})
  location.push({location_id:2, city:'San Francisco', state:'California', zip:87865, airport_code:'SFO'})
  location.push({location_id:3, city:'Eugene', state:'Oregon', zip:97111, airport_code:'EUG'})
  return location;
};
function getCrewList() {
  query = "SELECT DISTINCT crewlist_id FROM CrewList";
  console.log(query);
  crewList = []
  crewList.push({crewlist_id:0})
  crewList.push({crewlist_id:1})
  crewList.push({crewlist_id:2})
  return crewList;
};
function getCrew() {
  query = "SELECT * from Crew";
  console.log(query);
  crew = [];
  crew.push({crew_id:0, firstname:'Bob', lastname:'Jones', role:'Pilot'});
  crew.push({crew_id:1, firstname:'Jane', lastname:'Gwenifer', role:'Pilot'});
  crew.push({crew_id:2, firstname:'Yoda', lastname:'Baby', role:'Steward'});
  crew.push({crew_id:3, firstname:'Zillian', lastname:'Zepher', role:'Copilot'});
  return crew;
};
function getTravelerList() {
  query = "SELECT DISTINCT travelerlist_id from TravelerList";
  console.log(query);
  travelerList = []
  travelerList.push({travelerlist_id:0})
  travelerList.push({travelerlist_id:1})
  travelerList.push({travelerlist_id:2})
  travelerList.push({travelerlist_id:3})
  travelerList.push({travelerlist_id:4})
  return travelerList;
}
function getTraveler() {
  query = "SELECT * from Traveler";
  console.log(query);
  traveler = []
  traveler.push({traveler_id:0, firstname:'Bob', lastname:'Jones'});
  traveler.push({traveler_id:1, firstname:'Jannet', lastname:'Dones'});
  traveler.push({traveler_id:2, firstname:'Filbert', lastname:'Lones'});
  traveler.push({traveler_id:3, firstname:'Dilbert', lastname:'Pierr'});
  traveler.push({traveler_id:4, firstname:'Jessica', lastname:'Zilch'});
  return traveler;
}
function getPlane() {
  query = "SELECT * from Plane";
  console.log(query);
  plane = [];
  plane.push({plane_id:0, num_first_class_seats:20, num_second_class_seats: 30, num_third_class_seats:40});
  plane.push({plane_id:1, num_first_class_seats:20, num_second_class_seats: 30, num_third_class_seats:40});
  plane.push({plane_id:2, num_first_class_seats:20, num_second_class_seats: 30, num_third_class_seats:40});
  plane.push({plane_id:3, num_first_class_seats:20, num_second_class_seats: 30, num_third_class_seats:40});
  plane.push({plane_id:4, num_first_class_seats:20, num_second_class_seats: 30, num_third_class_seats:40});
  plane.push({plane_id:5, num_first_class_seats:20, num_second_class_seats: 30, num_third_class_seats:40});
  plane.push({plane_id:6, num_first_class_seats:20, num_second_class_seats: 30, num_third_class_seats:40});
  plane.push({plane_id:7, num_first_class_seats:20, num_second_class_seats: 30, num_third_class_seats:40});
  return plane;
};
function getFlight() {
  query = "SELECT * from Flight";
  flight = [];
  flight.push({flight_id:0});
  flight.push({flight_id:1});
  flight.push({flight_id:2});
  flight.push({flight_id:3});
  flight.push({flight_id:4});
  flight.push({flight_id:5});
  return flight;
}

function option_routes() {
  route = getRoute();
  output = ""
  for (let i = 0; i < route.length; i++) {
    output = output + "<option value=\"" + route[i].route_id + "\">" + route[i].name + "</option>";
  }
  return output;
}
function option_locations() {
  location = getLocation();
  output = ""
  for (let i = 0; i < location.length; i++) {
    output = output + "<option value=\"" + location[i].location_id + "\">" + location[i].airport_code + "</option>";
  }
  return output;
}
function option_crewlists() {
  crewList = getCrewList()
  output = ""
  for (let i = 0; i < crewList.length; i++) {
    output = output + "<option value=\"" + crewList[i].crewlist_id + "\">" + crewList[i].crewlist_id + "</option>";
  }
  return output;
}
function option_crews() {
  crew = getCrew();
  output = ""
  for (let i = 0; i < crew.length; i++) {
    output = output + "<option value=\"" + crew[i].crew_id + "\">" + crew[i].firstname + " " + crew[i].lastname + "</option>";
  }
  return output;
}
function option_travelerlists() {
  travelerList = getTravelerList();
  output = ""
  for (let i = 0; i < travelerList.length; i++) {
    output = output + "<option value=\"" + travelerList[i].travelerlist_id + "\">" + travelerList[i].travelerlist_id + "</option>";
  }
  return output;
}
function option_travelers() {
  traveler = getTraveler();
  output = ""
  for (let i = 0; i < traveler.length; i++) {
    output = output + "<option value=\"" + traveler[i].traveler_id + "\">" + traveler[i].firstname + " " + traveler[i].lastname + "</option>";
  }
  return output;
}
function option_planes() {
  plane = getPlane();
  output = ""
  for (let i = 0; i < plane.length; i++) {
    output = output + "<option value=\"" + plane[i].plane_id + "\">" + plane[i].plane_id + "</option>";
  }
  return output;
}
function option_flights() {
  flight = getFlight();
  output = ""
  for (let i = 0; i < flight.length; i++) {
    output = output + "<option value=\"" + flight[i].flight_id + "\">" + flight[i].flight_id + "</option>";
  }
  return output;
}


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
			<td><a class="linkRef" href="/getFlightInfo" id="searchLink">Search Flights</a></td>\
			<td><a class="linkRef" href="/removeTraveler" id="travelLink">Cancel Traveler</a></td>\
			<td><a class="linkRef" href="/updateFlight" id="updateLink">Update Flight</a></td>\
	</table>';
}

function buildUpdate(plane_id, projected_departure_time, projected_departure_date, projected_arrival_time, projected_arrival_date) {
    var builtString = '';
    var emptyVal = '';
    if (emptyVal.localeCompare(plane_id) != 0) {
        builtString = builtString + "plane_id = " + plane_id + ", ";
    }
    if (emptyVal.localeCompare(projected_departure_time) != 0) {
        builtString = builtString + "projected_departure_time = " + projected_departure_time + ", ";
    }
    if (emptyVal.localeCompare(projected_departure_date) != 0) {
        builtString = builtString + "projected_departure_date = " + projected_departure_date + ", ";
    }
    if (emptyVal.localeCompare(projected_arrival_time) != 0) {
        builtString = builtString + "projected_arrival_time = " + projected_arrival_time + ", ";
    }
    if (emptyVal.localeCompare(projected_arrival_date) != 0) {
        builtString = builtString + "projected_arrival_date = " + projected_arrival_date + ", ";
    }
    var finalString = builtString.substring(0, builtString.length - 2);
    return finalString;

}

//homepage
app.get('/', function (req, res) {
    res.render('home', {
      helpers: {
        links_table: links_table }
    });
});


app.get('/addTraveler', function (req, res) {
    res.render('addTraveler', {
      helpers: {
        links_table: links_table }
    })
});
app.get('/addCrew', function (req, res) {
    res.render('addCrew', {
      helpers: {
        links_table: links_table }
    })
});
app.get('/addPlane', function (req, res) {
    res.render('addPlane', {
      helpers: {
        links_table: links_table }
    })
});
app.get('/addLocation', function (req, res) {
    res.render('addLocation', {
      helpers: {
        links_table: links_table }
    })
});
app.get('/addRoute', function (req, res) {
  res.render('addRoute', {
    helpers: {
      links_table: links_table,
      locations: option_locations
    }
  })
});
app.get('/addCrewList', function (req, res) {
    res.render('addCrewList', {
    helpers: {
      links_table: links_table,
      crewlists: option_crewlists,
      crews: option_crews
    }
  })
});
app.get('/addTravelerList', function (req, res) {
  res.render('addTravelerList', {
    helpers: {
      links_table: links_table,
      travelerlists: option_travelerlists,
      travelers: option_travelers
    }
  })
});
app.get('/addFlight', function (req, res) {

  res.render('addFlight', {
    helpers: {
      links_table: links_table,
      routes: option_routes,
      crewlists: option_crewlists,
      planes: option_planes,
      travelerlists: option_travelerlists,
    }
  })

});
app.get('/getFlightInfo', function (req, res) {
    res.render('getFlightInfo', {
      helpers: {
        links_table: links_table,
        routes: option_routes
      }
    });
});
app.get('/removeTraveler', function (req, res) {
    res.render('removeTraveler', {
      helpers: {
        links_table: links_table,
        travelers: option_travelers,
        flights: option_flights
      }
    });
});
app.get('/updateFlight', function (req, res) {
    res.render('updateFlight', {
      helpers: {
          links_table: links_table,
          flights: option_flights,
          planes: option_planes
      }
    });
});







app.post('/addTraveler', function (req, res) {
  console.log(req.body)
  firstname = req.body.firstname;
  lastname = req.body.lastname;

  res.render('addTraveler', {
    helpers: {
      links_table: links_table,
      results: function() {
        query = "INSERT INTO Traveler (firstname, lastname) VALUES ('" + firstname + "', '" + lastname + "');"
        console.log(query)
        return query;
      }
    }
  })
});
app.post('/addCrew', function (req, res) {
  console.log(req.body)
  firstname = req.body.firstname;
  lastname = req.body.lastname;
  role = req.body.role;



  res.render('addCrew', {
    helpers: {
      links_table: links_table,
      results: function() {
        query = "INSERT INTO Crew (fisrtname, lastname, role) VALUES ('" + firstname + "', '" + lastname + "', '" + role + "');"
        console.log(query)
        return query;
      }
    }
  })
});
app.post('/addPlane', function (req, res) {
  console.log(req.body)
  num_first_class_seats = req.body.num_first_class_seats;
  num_second_class_seats = req.body.num_second_class_seats;
  num_third_class_seats = req.body.num_third_class_seats;



  res.render('addPlane', {
    helpers: {
      links_table: links_table,
      results: function() {
        query = "INSERT INTO Plane (num_first_class_seats, num_second_class_seats, num_third_class_seats) VALUES (" + num_first_class_seats + ", " + num_second_class_seats + ", " + num_third_class_seats + ");"
        console.log(query)
        return query;
      }
    }
  })
});
app.post('/addLocation', function (req, res) {
  console.log(req.body)
  city = req.body.city;
  state = req.body.state;
  airport_code = req.body.airport_code;
  zip = req.body.zip;



  res.render('addLocation', {
    helpers: {
      links_table: links_table,
      results: function() {
        query = "INSERT INTO Location (city, state, airport_code, zip) VALUES ('" + city + "', '" + state + "', '" + airport_code + "', " + zip + ");"
        console.log(query)
        return query;
      }
    }
  })
});
app.post('/addRoute', function (req, res) {
  console.log(req.body);
  name = req.body.name;
  departure_location_id = req.body.departure_location_id;
  arrivial_location_id = req.body.arrivial_location_id;


  res.render('addRoute', {
    helpers: {
      links_table: links_table,
      locations: option_locations,
      results: function() {
        query = "INSERT INTO Location (name, departure_location_id, arrivial_location_id) VALUES ('" + name + "', " + departure_location_id + ", " + arrivial_location_id + " );"
        console.log(query)
        return query;
      }
    }
  })


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

  res.render('addFlight', {
    helpers: {
      links_table: links_table,
      routes: option_routes,
      crewlists: option_crewlists,
      planes: option_planes,
      travelerlists: option_travelerlists,
      results: function() {
        query = "INSERT INTO Flight (route_id, crewlist_id, plane_id,  first_class_travelerlist_id, second_class_travelerlist_id, third_class_travelerlist_id,\
       projected_departure_date, projected_departure_time, projected_arrival_date, projected_arrival_time)\
       VALUES (" + route_id + ", " + crewlist_id + ", " + plane_id + ", " + first_class_travelerlist_id + ", " + second_class_travelerlist_id + ", " + third_class_travelerlist_id + ",\
       '" + projected_departure_date + "', '" + projected_departure_time + "', '" + projected_arrival_date + "',  '" + projected_arrival_time + "' )";
        console.log(query);
        return query;
      }
    }
  })
});
app.post('/addCrewList', function (req, res) {
  console.log(req.body);
  crewlist_id = req.body.crewlist_id;
  crew_id = req.body.crew_id;

  res.render('addCrewList', {
    helpers: {
      links_table: links_table,
      crewlists: option_crewlists,
      crews: option_crews,
      results: function() {
        if ("" == crewlist_id) {
          query = "INSERT INTO CrewList (crew_id) VALUES ('" + crew_id + "');";
        } else {
          query = "INSERT INTO CrewList (crewlist_id, crew_id) VALUES ('" + crewlist_id + "', '" + crew_id + "');";
        }
        console.log(query);
        return query;
      }
    }
  })
});
app.post('/addTravelerList', function (req, res) {
  console.log(req.body);
  travelerlist_id = req.body.travelerlist_id;
  traveler_id = req.body.traveler_id;


  res.render('addTravelerList', {
    helpers: {
      links_table: links_table,
      travelerlists: option_travelerlists,
      travelers: option_travelers,
      results: function() {
        if ("" == travelerlist_id) {
          query = "INSERT INTO TraverlerList (traveler_id) VALUES (" + traveler_id + ")";
        } else {
          query = "INSERT INTO TraverlerList (travelerlist_id, traveler_id) VALUES (" + travelerlist_id + "," + traveler_id + ")";
        }
        console.log(query);
        return query;
      }
    }
  })
});
app.post('/getFlightInfo', function (req, res) {
  console.log(req.body);
  res.render('getFlightInfo', {
    helpers: {
      links_table: links_table,
      routes: option_routes
    }
  })
});
app.post('/updateFlight', function (req, res) {
  console.log(req.body);
  flight_id = req.body.flight_id;
  plane_id = req.body.plane_id;
  projected_departure_time = req.body.depart_time;
  projected_departure_date = req.body.depart_date;
  projected_arrival_time = req.body.arrival_time;
  projected_arrival_date = req.body.arrival_date;
  res.render('updateFlight', {
      helpers: {
      flights: option_flights,
      planes: option_planes,
      links_table: links_table,
      results: function () {
          updateCols = buildUpdate(plane_id, projected_departure_time, projected_departure_date, projected_arrival_time, projected_arrival_date);
          query = "UPDATE Flight SET " + updateCols + " WHERE flight_id = " + flight_id + ";";
          console.log(query);
          return query;
      }
    }
  })
});
app.post('/removeTraveler', function (req, res) {
 console.log(req.body);
  traveler_id = req.body.traveler_id;
  flight_id = req.body.flight_id;

  res.render('removeTraveler', {
    helpers: {
      links_table: links_table,
      travelers: option_travelers,
      flights: option_flights,
      results: function() {
          query = "DELETE FROM TravelerList WHERE traveler_id='" + traveler_id + " AND travelerlist_id IN (SELECT first_class_travelerlist_id, second_class_travelerlist_id, third_class_travelerlist_id FROM Flight WHERE flight_id = " + flight_id + "'') ;";
        console.log(query)
        return query;
      }
    }
  })
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
