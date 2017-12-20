ALTER TABLE `party` DROP FOREIGN KEY `fk_party_election_1`;
ALTER TABLE `candidate` DROP FOREIGN KEY `fk_candidate_party_1`;
ALTER TABLE `candidate` DROP FOREIGN KEY `fk_candidate_election_1`;
ALTER TABLE `referendum` DROP FOREIGN KEY `fk_referendum_election_1`;
ALTER TABLE `user` DROP FOREIGN KEY `fk_user_client_1`;
ALTER TABLE `vote` DROP FOREIGN KEY `fk_vote_voter_1`;
ALTER TABLE `vote` DROP FOREIGN KEY `fk_vote_election_1`;
ALTER TABLE `election` DROP FOREIGN KEY `fk_election_client_1`;

DROP TABLE `election` CASCADE;
DROP TABLE `table_1` CASCADE;
DROP TABLE `client` CASCADE;
DROP TABLE `vote` CASCADE;
DROP TABLE `voter` CASCADE;
DROP TABLE `user` CASCADE;
DROP TABLE `referendum` CASCADE;
DROP TABLE `party` CASCADE;
DROP TABLE `candidate` CASCADE;

CREATE TABLE `election` (
`id_election` bigint(255) NOT NULL AUTO_INCREMENT,
`client_id` bigint(11) NOT NULL,
`typ` varchar(255) NOT NULL,
`text` text NULL,
`start_time` datetime NOT NULL,
`end_time` datetime NOT NULL,
`state` int(255) NOT NULL,
PRIMARY KEY (`id_election`) 
);

CREATE TABLE `table_1` (
);

CREATE TABLE `client` (
`id_client` bigint(255) NOT NULL AUTO_INCREMENT,
`typ` varchar(255) NOT NULL,
PRIMARY KEY (`id_client`) 
);

CREATE TABLE `vote` (
`voter_id` bigint(11) NOT NULL,
`election_id` bigint(11) NOT NULL,
`client_id` bigint(11) NOT NULL,
`first_vote` int(255) NOT NULL,
`second_vote` int(255) NOT NULL,
PRIMARY KEY (`voter_id`, `election_id`) 
);

CREATE TABLE `voter` (
`id_voter` bigint(255) NOT NULL AUTO_INCREMENT,
`last_name` varchar(255) NOT NULL,
`first_name` varchar(255) NOT NULL,
`finger_print` varchar(255) NOT NULL,
`constituency` int(255) NOT NULL,
PRIMARY KEY (`id_voter`) 
);

CREATE TABLE `user` (
`id_user` bigint(255) NOT NULL AUTO_INCREMENT,
`client_id` bigint(11) NOT NULL,
`username` varchar(255) NOT NULL,
`password` varchar(255) NOT NULL,
`rule` varchar(255) NOT NULL,
PRIMARY KEY (`id_user`) 
);

CREATE TABLE `referendum` (
`id_referendum` bigint(255) NOT NULL AUTO_INCREMENT,
`text` text NULL,
`constituency` int(255) NOT NULL,
`election_id` bigint(11) NOT NULL,
`yes` bigint(255) NOT NULL,
`no` bigint(11) NOT NULL,
PRIMARY KEY (`id_referendum`) 
);

CREATE TABLE `party` (
`id_party` bigint(255) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`text` text NULL,
`constituency` int(255) NOT NULL,
`election_id` bigint(11) NOT NULL,
`vote` bigint(255) NOT NULL,
PRIMARY KEY (`id_party`) 
);

CREATE TABLE `candidate` (
`id_candidate` bigint NOT NULL AUTO_INCREMENT,
`last_name` varchar(255) NOT NULL,
`first_name` varchar(255) NOT NULL,
`party_id` bigint(11) NULL,
`constituency` int(255) NOT NULL,
`election_id` bigint(11) NOT NULL,
`vote` bigint(255) NOT NULL,
PRIMARY KEY (`id_candidate`) 
);


ALTER TABLE `party` ADD CONSTRAINT `fk_party_election_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`id_election`);
ALTER TABLE `candidate` ADD CONSTRAINT `fk_candidate_party_1` FOREIGN KEY (`party_id`) REFERENCES `party` (`id_party`);
ALTER TABLE `candidate` ADD CONSTRAINT `fk_candidate_election_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`id_election`);
ALTER TABLE `referendum` ADD CONSTRAINT `fk_referendum_election_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`id_election`);
ALTER TABLE `user` ADD CONSTRAINT `fk_user_client_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id_client`);
ALTER TABLE `vote` ADD CONSTRAINT `fk_vote_voter_1` FOREIGN KEY (`voter_id`) REFERENCES `voter` (`id_voter`);
ALTER TABLE `vote` ADD CONSTRAINT `fk_vote_election_1` FOREIGN KEY (`election_id`) REFERENCES `election` (`id_election`);
ALTER TABLE `election` ADD CONSTRAINT `fk_election_client_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id_client`);

