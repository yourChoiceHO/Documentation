ALTER TABLE `vote` DROP FOREIGN KEY `fk_vote_voter_1`;
ALTER TABLE `vote` DROP FOREIGN KEY `fk_vote_election_1`;
ALTER TABLE `referendum` DROP FOREIGN KEY `fk_referendum_election_1`;
ALTER TABLE `election` DROP FOREIGN KEY `fk_election_client_1`;
ALTER TABLE `user` DROP FOREIGN KEY `fk_user_client_1`;
ALTER TABLE `party` DROP FOREIGN KEY `fk_party_election_1`;
ALTER TABLE `candidate` DROP FOREIGN KEY `fk_candidate_party_1`;
ALTER TABLE `candidate` DROP FOREIGN KEY `fk_candidate_election_1`;

DROP TABLE `voter`;
DROP TABLE `vote`;
DROP TABLE `election`;
DROP TABLE `referendum`;
DROP TABLE `candidate`;
DROP TABLE `party`;
DROP TABLE `client`;
DROP TABLE `user`;

CREATE TABLE `voter` (
`id_voter` bigint NOT NULL AUTO_INCREMENT,
`last_name` varchar(0) NOT NULL,
`first_name` varchar(0) NOT NULL,
`hash` varchar(0) NOT NULL,
`constituency` int NOT NULL,
PRIMARY KEY (`id_voter`) 
);

CREATE TABLE `vote` (
`voter_id` bigint NOT NULL AUTO_INCREMENT,
`election_id` bigint NOT NULL AUTO_INCREMENT,
`client_id` bigint NULL,
`first_vote` tinyint NULL,
`second_vote` tinyint NULL,
`valid` tinyint NULL,
PRIMARY KEY (`voter_id`, `election_id`) 
);

CREATE TABLE `election` (
`id_election` bigint NOT NULL AUTO_INCREMENT,
`client_id` bigint NOT NULL,
`typ` varchar(0) NOT NULL,
`text` varchar(0) NOT NULL,
`start_date` datetime NULL,
`end_date` datetime NULL,
`state` tinyint NOT NULL,
PRIMARY KEY (`id_election`) 
);

CREATE TABLE `referendum` (
`id_referendum` bigint NOT NULL AUTO_INCREMENT,
`text` varchar(0) NULL,
`consituency` int NULL,
`election_id` bigint NULL,
`yes` bigint NULL,
`no` bigint NULL,
PRIMARY KEY (`id_referendum`) 
);

CREATE TABLE `candidate` (
`id_candidate` bigint NOT NULL,
`last_name` varchar(0) NULL,
`first_name` varchar(0) NULL,
`party_id` bigint NULL,
`consituency` int NULL,
`election_id` bigint NULL,
`vote` bigint NULL,
PRIMARY KEY (`id_candidate`) 
);

CREATE TABLE `party` (
`id_party` bigint NOT NULL,
`name` varchar(0) NULL,
`text` varchar(0) NULL,
`consituency` int NULL,
`election_id` bigint NULL,
`vote` bigint NULL,
PRIMARY KEY (`id_party`) 
);

CREATE TABLE `client` (
`id_client` bigint NOT NULL,
`typ` tinyint NULL,
PRIMARY KEY (`id_client`) 
);

CREATE TABLE `user` (
`id_user` bigint NOT NULL,
`client_id` bigint NULL,
`username` varchar(0) NULL,
`password` varchar(0) NULL,
`role` tinyint NULL,
PRIMARY KEY (`id_user`) 
);


ALTER TABLE `vote` ADD CONSTRAINT `fk_vote_voter_1` FOREIGN KEY (`voter_id`) REFERENCES `voter` (`id_voter`);
ALTER TABLE `vote` ADD CONSTRAINT `fk_vote_election_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`id_election`);
ALTER TABLE `referendum` ADD CONSTRAINT `fk_referendum_election_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`id_election`);
ALTER TABLE `election` ADD CONSTRAINT `fk_election_client_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id_client`);
ALTER TABLE `user` ADD CONSTRAINT `fk_user_client_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id_client`);
ALTER TABLE `party` ADD CONSTRAINT `fk_party_election_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`id_election`);
ALTER TABLE `candidate` ADD CONSTRAINT `fk_candidate_party_1` FOREIGN KEY (`party_id`) REFERENCES `party` (`id_party`);
ALTER TABLE `candidate` ADD CONSTRAINT `fk_candidate_election_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`id_election`);

