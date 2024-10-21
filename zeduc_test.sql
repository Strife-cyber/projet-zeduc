--test pour les functions du client

-- 1. Appeler la fonction pour générer le premier code
SELECT generer_code();
SELECT * FROM generer_code();
-- Réinitialiser l'état de la table client
TRUNCATE  TABLE client RESTART IDENTITY CASCADE ; -- Supprimer les données précédentes

-- Insertion du code '00001'
INSERT INTO client (id_client, code, points) VALUES ('1', '00001', 0);

-- Appel de la fonction et vérification du résultat
SELECT generer_code(); -- attendu: '00002'
-- Réinitialiser l'état de la table client
TRUNCATE TABLE client RESTART IDENTITY; -- Supprimer les données précédentes

-- Insertion du code '00099'
INSERT INTO client (id_client, code, points) VALUES ('2', '00099', 0);

-- Appel de la fonction et vérification du résultat
SELECT generer_code(); -- attendu: '00100'


-- Réinitialiser l'état de la table client
TRUNCATE TABLE client RESTART IDENTITY; -- Supprimer les données précédentes

-- Insertion du code '12345'
INSERT INTO client (id_client, code, points) VALUES ('3', '12345', 0);

-- Appel de la fonction et vérification du résultat
SELECT generer_code(); -- attendu: '12346'


-- Réinitialiser l'état de la table client
TRUNCATE TABLE client RESTART IDENTITY; -- Supprimer les données précédentes

-- Insertion du code '99999'
INSERT INTO client (id_client, code, points) VALUES ('4', '99999', 0);

-- Appel de la fonction et vérification du comportement
SELECT generer_code(); -- attendu: erreur ou comportement défini (à spécifier)



-- 2.Teste pour l'inscription d'un client
SELECT inscrire_client(id_client := 'user0005', nom_client := 'dunamis', email_client := 'dunamisjunior15@gmail.com', secret_client := '1234000');
SELECT * FROM client LEFT JOIN utilisateur u on client.id_client = u.id;
SELECT * FROM client WHERE id_client = 'user0005';
SELECT * FROM utilisateur WHERE id = 'c1';
SELECT * FROM client WHERE id_client = 'c1'; -- attendu: données du client avec un code et 0 points

-- Test : Inscription avec un email manquant (devrait lever une exception)
SELECT inscrire_client('c2', 'Bob', NULL, 'secret123'); -- attendu: erreur car email est NULL

-- Test : Inscription avec un nom manquant (devrait lever une exception)
SELECT inscrire_client('c3', NULL, 'bob@example.com', 'secret123'); -- attendu: erreur car nom est NULL

-- 3. Teste menu du jour
INSERT INTO menu (id_plat, date_menu) VALUES ('p1', '2024-10-20');
INSERT INTO plat (id_plat, image, nom, prix) VALUES ('p1', 'image1.jpg', 'Plat1', 5000);
SELECT menu_du_jour('2024-10-01');
SELECT * FROM menu_du_jour('2024-10-20'); -- attendu: Plat1, image1.jpg, 5000
SELECT * FROM menu_du_jour();

-- Test 2: Récupérer le menu pour une date sans plats disponibles
SELECT * FROM menu_du_jour('2024-10-21'); -- attendu: résultat vide$

-- Test 3: Récupérer le menu avec plusieurs plats
INSERT INTO plat (id_plat, image, nom, prix) VALUES ('p2', 'image2.jpg', 'Plat2', 4000);
INSERT INTO menu (id_plat, date_menu) VALUES ('p2', '2024-10-20');
SELECT * FROM menu_du_jour('2024-10-20'); -- attendu: deux plats avec leurs détails

-- Test 4: Vérification avec une date incorrecte
SELECT * FROM menu_du_jour('2024-15-20'); -- attendu: erreur car date incorrecte

    -- Test 5: Vérifier le format de la date
SELECT * FROM menu_du_jour(CURRENT_DATE); -- attendu: le menu du jour actuel si existant


-- 4. Teste mise a jour mot de passe
SELECT reset_password(request_password_reset('dunamisjunior15@gmail.com'), 'hello world reset');

--5 Test mise à jour des informations du clients
-- Mettre à jour l'émail d'un client
 UPDATE utilisateur SET email = 'nouvel_email@example.com' WHERE id = 'user0005';
 SELECT * FROM utilisateur WHERE id = 'user0005';

SELECT * FROM utilisateur;
-- 6 Teste pour la fonction generale de connexion
SELECT connexion('alice.dupont@example.com', 'secret123');
SELECT * FROM utilisateur WHERE email = 'alice.dupont@exemple.com';

-- 7 Test pour récupérer les commandes d'un utilisateur pour une date donnée
INSERT INTO commande (id_client, id_plat, date_commande, status) VALUES ('c1', 'p1', '2024-10-20', TRUE);
SELECT * FROM commande_utilisateur_jour('c1', '2024-10-20'); -- attendu: nom plat, prix, statut TRUE
SELECT * FROM commande_utilisateur_jour('id001', '2024-10-18');

-- Test : Récupérer les commandes d'un client sans commandes pour une date donnée
SELECT * FROM commande_utilisateur_jour('c1', '2024-10-21'); -- attendu: résultat vide
-- Test : Récupérer les commandes avec plusieurs plats
INSERT INTO commande (id_client, id_plat, date_commande, status) VALUES ('c1', 'p2', '2024-10-20', FALSE);
SELECT * FROM commande_utilisateur_jour('c1', '2024-10-20'); -- attendu: deux plats avec leurs détails

-- Test : Vérifier les commandes pour une date future
SELECT * FROM commande_utilisateur_jour('c1', '2025-01-01'); -- attendu: résultat vide
-- Test : Vérifier avec un client qui n'a jamais passé de commande
SELECT * FROM commande_utilisateur_jour('c2', '2024-10-20'); -- attendu: résultat vide



-- 8 Test pour ajouter un parrain à un client et mettre à jour les points
INSERT INTO client (id_client, code, points) VALUES ('p1', 'PAR123', 0);
SELECT ajouter_parrain('PAR123', 'c1', 10); -- attendu: 'Insertion et mise à jour des points réussies'
SELECT ajouter_parrain('00001', 'id002', 10);

-- Test : Vérifier que le parrain a été ajouté correctement
SELECT * FROM parrainage WHERE parrain = 'p1' AND fiole = 'c1'; -- attendu: entrée existante

-- Test : Ajouter un parrain avec un code incorrect
SELECT ajouter_parrain('PAR999', 'c1', 10); -- attendu: 'Parrain non trouvé'

-- Test : Vérifier la mise à jour des points
SELECT points FROM client WHERE id_client = 'p1'; -- attendu: points = 10

-- Test : Vérifier avec un client sans parrain
SELECT ajouter_parrain('PAR123', 'c2', 5); -- attendu: 'Insertion et mise à jour des points réussies'



-- 9 Test pour récupérer les fioles (personnes parrainées) pour un parrain donné
SELECT * FROM get_fiole('id_parrain001');
-- Test : Récupérer la liste des fioles d'un parrain existant
SELECT * FROM get_fiole('P1234');
-- Test 2: Récupérer la liste des fioles pour un parrain sans fioles
SELECT * FROM get_fiole('P5678');
-- Test 2: Récupérer la liste des fioles pour un parrain sans fioles
SELECT * FROM get_fiole('P5678');
-- Test 3: Test avec un parrain inexistant
SELECT * FROM get_fiole('P9999');
-- Test 4: Test avec une valeur nulle pour id_parrain
SELECT * FROM get_fiole(NULL);
-- Test 5: Test avec un parrain ayant plusieurs fioles
SELECT * FROM get_fiole('P1234');


-- 10 Test pour récupérer l'historique des commandes d'un utilisateur
SELECT * FROM historique('id001');
SELECT * FROM historique('C001');

-- Test : Pas d'historique pour l'utilisateur
SELECT * FROM historique('C002');

-- Test : Test avec un utilisateur inexistant
SELECT * FROM historique('C999');

-- Test : Test avec un id utilisateur nul
SELECT * FROM historique(NULL);

-- Test : Vérifier l'ordre des commandes par date
SELECT nom, prix, status, date FROM historique('C001');



-- 11 Test pour demander une réinitialisation de mot de passe
SELECT request_password_reset('john.doe@example.com');

-- Test : Réinitialisation du mot de passe pour un email inexistant
SELECT request_password_reset('invalid_user@example.com');

-- Test : Test avec un email nul
SELECT request_password_reset(NULL);

-- Test : Test avec un email sans demande de réinitialisation active
SELECT request_password_reset('user2@example.com');

-- Test : Vérifier la génération du token de réinitialisation
SELECT request_password_reset('user1@example.com');

-- Test : Réinitialiser le mot de passe avec un token valide
SELECT reset_password('valid_token_123', 'new_password');

-- Test : Essayer de réinitialiser avec un token expiré
SELECT reset_password('expired_token_456', 'new_password');

-- Test : Essayer de réinitialiser avec un token invalide
SELECT reset_password('invalid_token_789', 'new_password');

-- Test : Réinitialisation avec un mot de passe vide
SELECT reset_password('valid_token_123', '');

-- Test : Réinitialiser avec un token valide mais utilisateur inexistant
SELECT reset_password('valid_token_123', 'new_password');


-- 12  Test pour obtenir les plats les plus populaires
SELECT * FROM plats_populaires();
-- Test : Vérifier si les plats sont classés par ordre de popularité
SELECT nom_plat, total_commande FROM plats_populaires();

-- Test : Pas de plats commandés (table commande vide)
TRUNCATE commande; -- puis
SELECT * FROM plats_populaires();

-- Test : Ajouter de nouvelles commandes et vérifier les résultats
INSERT INTO commande (id_plat) VALUES ('P001'), ('P002'), ('P001'); -- puis
SELECT * FROM plats_populaires();

-- Test : Vérifier les champs de retour
SELECT nom_plat, total_commande FROM plats_populaires();

-- 13  Test pour récupérer le nombre total de réclamations résolues
SELECT reclamations_resolues();

-- 14 Test pour obtenir le temps moyen de traitement des réclamations
SELECT temps_moyen_traitement_reclamations();

