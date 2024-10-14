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

-- Suppression des tables afin de rendre le programme utilisable à répétition,
-- au moins pour la mise au point.

-- Au choix, on peut spécifier un schéma autre que celui établi par défaut,
-- par exemple le schéma "Sondage". Noter le passage des guillemets aux
-- apostrophes imposé par l’instruction SET.
-- SET SCHEMA 'Sondage' ;

-- Pour Oracle, il faut modifier "CASCADE" pour "CASCADE CONSTRAINTS"
DROP domain code_domain cascade ;


DROP TABLE utilisateur cascade ;

DROP TABLE client cascade ;

DROP TABLE gerant cascade ;

Drop TABLE  admin cascade ;

DROP TABLE employer cascade ;

DROP TABLE commande cascade ;

DROP TABLE plat cascade ;

DROP TABLE menu cascade ;

DROP TABLE promotion cascade ;

DROP TABLE reclamation cascade ;

DROP TABLE password_resets cascade ;

DROP TABLE parrainage cascade ;

DROP TABLE parametres cascade ;

DROP TABLE livreur cascade ;

