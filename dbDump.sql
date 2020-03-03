
/*Drop all tables*/
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Flight`;
DROP TABLE IF EXISTS `CrewList`;
DROP TABLE IF EXISTS `TravelerList`;
DROP TABLE IF EXISTS `Route`;
DROP TABLE IF EXISTS `Crew`;
DROP TABLE IF EXISTS `Traveler`;
DROP TABLE IF EXISTS `Location`;
DROP TABLE IF EXISTS `Plane`;
SET FOREIGN_KEY_CHECKS = 1;

/*Create tables for all entities*/

CREATE TABLE `Crew` (  `crew_id` int(11) NOT NULL AUTO_INCREMENT,  `first_name` varchar(255) NOT NULL,  `last_name` varchar(255) NOT NULL,  `role` varchar(255) NOT NULL, PRIMARY KEY (`crew_id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `Traveler` (  `traveler_id` int(11) NOT NULL AUTO_INCREMENT,  `first_name` varchar(255) NOT NULL,  `last_name` varchar(255) NOT NULL, PRIMARY KEY (`traveler_id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `Location` (  `location_id` int(11) NOT NULL AUTO_INCREMENT,  `city` varchar(255) NOT NULL,  `state` varchar(255) NOT NULL, `zip` int(5) NOT NULL, `airport_code` varchar(255) NOT NULL, PRIMARY KEY (`location_id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `Plane` (  `plane_id` int(11) NOT NULL AUTO_INCREMENT, `num_first_class_seats` int(11) NOT NULL,  `num_second_class_seats` int(11) NOT NULL, `num_third_class_seats` int(11) NOT NULL, PRIMARY KEY (`plane_id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `Flight` (  `flight_id` int(11) NOT NULL AUTO_INCREMENT, `plane_id` int(11) NOT NULL,  `route_id` int(11) NOT NULL, `crewlist_id` int(11) NOT NULL, `first_class_travelerlist_id` int(11) NOT NULL, `second_class_travelerlist_id` int(11) NOT NULL, `third_class_travelerlist_id` int(11) NOT NULL, `projected_departure_date` date NOT NULL, `projected_departure_time` time, `projected_arrival_date` date NOT NULL, `projected_arrival_time` time, `actual_departure_date` date, `actual_departure_time` time, `actual_arrival_date` date, `actual_arrival_time` time, PRIMARY KEY (`flight_id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*Create tables for all relationships*/
CREATE TABLE `Route` (  
    `route_id` int(11) NOT NULL AUTO_INCREMENT, 
    `name` varchar(255) NOT NULL,  
    `departure_location_id` int(11) NOT NULL, 
    `arrival_location_id` int(11) NOT NULL,
    PRIMARY KEY (`route_id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;    

CREATE TABLE `CrewList` (  
    `crewlist_id` int(11) NOT NULL, 
    `crew_id` int(11) NOT NULL,
    KEY (`crewlist_id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

CREATE TABLE `TravelerList` (  
    `travelerlist_id` int(11) NOT NULL,
    `traveler_id` int(11) NOT NULL,
    KEY (`travelerlist_id`)) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


/*Insert into tables*/

INSERT INTO Crew VALUES (1, 'Johnathan', 'Wick', 'Steward'), (2, 'Amelia', 'Earhart', 'Pilot'), (3, 'Andrew', 'Williams', 'Pilot'), (4, 'Graham', 'Kracker', 'Steward'), (5, 'Bill', 'Jones', 'Steward'), (6, 'Austin', 'Powers', 'Pilot'); 

INSERT INTO Traveler VALUES (1, 'Hans', 'Hansen'), (2, 'Steve', 'Rogers'), (3, 'Bruce', 'Wayne'), (4, 'Peter', 'Parker'), (5, 'Linda', 'Jones'), (6, 'Kevin', 'Harvick'); 

INSERT INTO Location VALUES (1, 'Portland', 'OR', 97218, 'PDX'), (2, 'Corvallis', 'OR', 97330, 'CRV');

INSERT INTO Plane VALUES (1, 10, 20, 20), (2, 5, 25, 20);

INSERT INTO Flight VALUES (1, 1, 2, 1, 2, 3, 1, '2020-09-09', '11:30:00', '2020-09-09', '13:30:00', NULL, '00:00:00', NULL, '00:00:00'), (2, 1, 2, 1, 4, 5, 6, '2020-09-09', '14:00:00', '2020-09-09', '16:30:00', NULL, '00:00:00', NULL, '00:00:00');

INSERT INTO Route VALUES (1, 'PDX-CRV', 1, 2), (2, 'CRV-PDX', 2, 1);

INSERT INTO CrewList VALUES (1, 1), (1, 2), (1, 3), (2, 3), (2, 4), (2, 5), (3, 1), (3, 2), (3, 4);

INSERT INTO TravelerList VALUES (1, 1), (1, 2), (1, 3), (2, 3), (2, 4), (2, 5), (3,6), (4, 2), (5, 1), (5, 3), (6, 6);


/*Add all foreign keys*/
ALTER TABLE `Route`  
	ADD CONSTRAINT `Route_ibfk_1` FOREIGN KEY (`departure_location_id`) REFERENCES `Location` (`location_id`),  
    ADD CONSTRAINT `Route_ibfk_2` FOREIGN KEY (`arrival_location_id`) REFERENCES `Location` (`location_id`);

ALTER TABLE `CrewList`  
	ADD CONSTRAINT `CrewList_ibfk_1` FOREIGN KEY (`crew_id`) REFERENCES `Crew` (`crew_id`);

ALTER TABLE `TravelerList`  
	ADD CONSTRAINT `TravelerList_ibfk_1` FOREIGN KEY (`traveler_id`) REFERENCES `Traveler` (`traveler_id`);

ALTER TABLE `Flight`  
	ADD CONSTRAINT `Flight_ibfk_1` FOREIGN KEY (`plane_id`) REFERENCES `Plane` (`plane_id`),  
    ADD CONSTRAINT `Flight_ibfk_2` FOREIGN KEY (`route_id`) REFERENCES `Route` (`route_id`),
    ADD CONSTRAINT `Flight_ibfk_3` FOREIGN KEY (`crewlist_id`) REFERENCES `CrewList` (`crewlist_id`),
    ADD CONSTRAINT `Flight_ibfk_4` FOREIGN KEY (`first_class_travelerlist_id`) REFERENCES `TravelerList` (`travelerlist_id`),
    ADD CONSTRAINT `Flight_ibfk_5` FOREIGN KEY (`second_class_travelerlist_id`) REFERENCES `TravelerList` (`travelerlist_id`),
    ADD CONSTRAINT `Flight_ibfk_6` FOREIGN KEY (`third_class_travelerlist_id`) REFERENCES `TravelerList` (`travelerlist_id`);
