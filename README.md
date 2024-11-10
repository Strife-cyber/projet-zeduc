# Projet Mon Miam Miam
## Description
Ce projet est une application web de gestion des commandes pour le fameux restaurant Zeduc Space, développée avec Php et Réact principalement. Elle permet aux clients de passer des commandes de manière rapide et pratique, tout en offrant une expérience fluide et améliorée aux employés pour la gestion des flux de commandes. Grâce à cette application, les clients et plus particulièrement les étudiants de l'institut Ucac-Icam, peuvent également bénéficier de cartes de fidélité et de codes de parrainage, renforçant leur engagement et leur loyauté envers le restaurant. L'objectif est d'améliorer l'efficacité du traitement des commandes et de stimuler la fidélisation des clients, tout en augmentant les revenus du restaurant.
---
## Prérequis
-   PHP >= 8.0
-   Composer
-   PostgreSQL ou une autre base de données
---
## Installation
1. Clonez le dépôt :
    		
    git clone https://github.com/andreonana/zeduc-space.git
    
2. Installez les dépendances :
    ```bash
    composer install
    ```
3. Copiez le fichier .env
    
    cp .env.example .env
4. Générer la clé de l'application :
     
    php artisan key:generate
5. Configurez le fichier .env avec les informations de votre base de données.
6. Exécutez les migrations :
    
    php artisan db:seed
## Configuration
Mettre à jour les variables d'environnement dans le fichier .env :
DB_CONNECTION : PostgreSQL
DB_HOST : 127.0.0.1
DB_PORT : 3306
DB_DATABASE : projet-zeduc
DB_USERNAME : postgres
DB_PASSWORD : admin
## Exécution
Pour démarrer le serveur local :
    php artisan serve
L'application sera disponible à l'adresse http://localhost:3000.

## Foctionnalités principales
Gestion du menu du jour : ajouter supprimer et afficher.
Authentification : Système de connexion et inscription.
Commandes : passer des commandes pour les clients, valider et voir l'historique pour les employés.
 

## Liste des tâches
-Implémenter un espace Etudiant
-Implémenter un espace Administrateur
-Implémenter un espace Employé
-Implémenter un espace Gérant

## Détail des tâches

# Espace Etudiant
-Inscription et Connexion
-Visualisation du Menu et Promotions
-Commande en ligne (Panier)
-Paiement en ligne et points de fidélité
-Parrainage et Récompenses
-Historique des Commandes et Réclamations
-Participation aux jeux et événements
-Liste des 10 meilleurs clients
-Consentement aux cookies

# Espace Administrateur
-Gestion des comptes employés
-Gestion du menu (CRUD)
-Statistiques en temps réel
-Gestion des promotions et événements
-Suivi des réclamations des étudiants

# Espace Employé
-Connexion des employés
-Gestion des Commandes
-Mise à jour du menu
-Tableau de bord des réclamations
-Statistiques hebdomadaires

# Espace Gérant
-Supervision des commandes en temps réel
-Gestion des comptes employés
-Tableau de bord des statistiques générales
-Gestion des réclamations


 

 

Auteurs & Groupe
Groupe projet web 4

Batsanga Judriel
Djatsa Dunamis
Kognoko Eddy
Winny Wilson
Tchamande Rohan
Madifor Telsy
    

## Comment exécuter

- Intsaller un éditeur de code (Vscode de préferance ), et installez les extensions nécessaires
- Assurez vous d'avoir une version d'au moins 8.0 de PHP sur votre machine, de node.js et de NPM
- Vous suivez les étapes d'installation citées 
- Ensuite allez sur l'invite de commande de votre editeur de code et executer npm run dev  