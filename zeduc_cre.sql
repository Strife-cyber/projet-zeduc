/*
-- =========================================================================== A
Produit : Zeduc/Creation
Trimestre : 2024-3
Composant : Zeduc_cre.sql
Encodage : UTF-8, sans BOM; fin de ligne Unix (LF)
Plateforme : PostgreSQL 9.4 à 16.2
Responsables : dunamisjunior15@gmail.com, alfredkognoko3@gmail.com
Version : 0.1.0
Statut : travail en cours
-- =========================================================================== A
*/

/*
-- =========================================================================== B
Création du schéma correspondant au modèle zeduc documenté dans [epp].
-- =========================================================================== B
*/
-- Creations des domaines
CREATE DOMAIN code_domain AS
    VARCHAR(5)
CHECK ( VALUE SIMILAR TO '[0-9]{5}');

-- Creation des tables

CREATE TABLE utilisateur(
/*
-- L'utilisateur "id" avec nom "nom" email "email" et mot de
-- passe "secret"
*/
    id VARCHAR(255) PRIMARY KEY NOT NULL ,
    nom VARCHAR(60) NOT NULL ,
    email VARCHAR(100) NOT NULL ,
    secret VARCHAR(255) NOT NULL
);

CREATE TABLE client(
/*
-- Le client "id_client" avec code dce parrainage "code" et points de fidelite
-- "points"
*/
    id_client VARCHAR(255) REFERENCES utilisateur(id) PRIMARY KEY NOT NULL ,
    code code_domain NOT NULL ,
    points INTEGER NOT NULL
);

CREATE TABLE admin(
/*
-- L'admin "id_admin"
*/
    id_admin VARCHAR(255) REFERENCES utilisateur(id) PRIMARY KEY NOT NULL
);

CREATE TABLE gerant(
/*
-- Le gerant "id_gerant"
*/
    id_gerant VARCHAR(255) REFERENCES utilisateur(id) PRIMARY KEY NOT NULL
);
CREATE TABLE employer(
/*
-- L'employer "id_employer" creer pqr l'admin "id_admin"
*/
    id_employer VARCHAR(255) REFERENCES utilisateur(id) PRIMARY KEY NOT NULL ,
    admin VARCHAR(255) REFERENCES admin(id_admin) NOT NULL
);

CREATE TABLE plat (
/*
-- Le plat "id_plat" avec image "image" et nom "nom" a pour prix "prix"
*/
    id_plat VARCHAR(255) PRIMARY KEY NOT NULL,
    image VARCHAR(255) NOT NULL ,
    nom VARCHAR(60) NOT NULL ,
    prix INTEGER NOT NULL
);

CREATE TABLE commande (
/*
-- La commande "id_commande" placer par le client "id_client" pour le plat "id_plat"
-- le "date_commande" qui a pour status de livraison "status"
*/
    id_commande VARCHAR(255) PRIMARY KEY NOT NULL,
    id_client VARCHAR(255) REFERENCES client(id_client) NOT NULL,
    id_plat VARCHAR(255) REFERENCES plat(id_plat) NOT NULL ,
    date_commande DATE NOT NULL,
    status BOOLEAN NOT NULL
);

CREATE TABLE menu (
/*
-- Le menu contenant un plat "id_plat" mis au menu le "date_menu"
*/
    id_plat VARCHAR(255) REFERENCES plat(id_plat) NOT NULL ,
    date_menu DATE NOT NULL,
    CONSTRAINT menu_primaire PRIMARY KEY (id_plat, date_menu)
);

CREATE TABLE Réclamation (
/*
-- La reclamation "id_reclamation" faite par le client "id_client"
-- le "date_reclamation" concernant "description" avec pour statut "statut"
*/
    id_réclamation VARCHAR(255) PRIMARY KEY NOT NULL,
    id_client VARCHAR(255) REFERENCES client(id_client) NOT NULL,
    description TEXT NOT NULL ,
    date_reclamation DATE NOT NULL,
    statut BOOLEAN NOT NULL
);

CREATE TABLE promotion (
/*
-- l'admin "id_admin" fait une promotion "id_promotion" dont la description
-- est "description" qui commence à la date  "date_début" et se termine à la date "date_fin"
*/
    id_promotion VARCHAR(255) PRIMARY KEY NOT NULL,
    id_admin VARCHAR(255) REFERENCES admin(id_admin) NOT NULL,
    date_début DATE NOT NULL ,
    date_fin DATE NOT NULL ,
    description TEXT NOT NULL
);

CREATE TABLE password_resets (
    user_id VARCHAR(255) REFERENCES utilisateur(id) ON DELETE CASCADE,
    token VARCHAR(64) NOT NULL,
    expiry TIMESTAMP NOT NULL,
    PRIMARY KEY (user_id, token)
);



/*
-- =========================================================================== Z
Contributeurs :
  (BG) Bernadette.Guérard@USherbrooke.ca,
  (AF) Anatole.France@USherbrooke.ca

Adresse, droits d’auteur et copyright :
  Département d’informatique
  Faculté des sciences
  Université de Sherbrooke
  Sherbrooke (Québec)  J1K 2R1
  Canada

  [CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0)]

Tâches projetées :
  S.O.

Tâches réalisées :
2024-04-04 (LL01) : Restructuration pour intégration à CoFELI
  * Changement de noms, élimination des fichiers doublons
2022-01-10 (LL01) : Diverses corrections de coquilles
  * Uniformisation des commentaires
2015-08-16 (BG) : Création initiale.

Références :
[epp] http://info.usherbrooke.ca/llavoie/enseignement/Exemples/Sondage/
      Sondage_DDV.pdf
[std] http://info.usherbrooke.ca/llavoie/enseignement/Modules/
      BD190-STD-SQL-01_NDC.pdf

-- -----------------------------------------------------------------------------
-- fin de Exemples/Sondage/Sondage_cre.sql
-- =========================================================================== Z
*/