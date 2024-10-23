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
*

/*
-- =========================================================================== B
Création du jeux de données .
-- =========================================================================== B
*/


-- insertion des valeurs valides

-- Insérer des utilisateurs
INSERT INTO utilisateur (id, nom, email, secret) VALUES
('user001', 'Alice Dupont', 'alice.dupont@example.com', 'secret123'),
('user002', 'Bob Martin', 'bob.martin@example.com', 'password456'),
('user003', 'Charlie Dubois', 'charlie.dubois@example.com', 'pass789'),
('user004', 'Daniel Leroy', 'daniel.leroy@example.com', 'password012'),
('user005', 'Royce Dupont', 'royce.dupont@ppppp.com', 'royce');

-- Insérer des clients
INSERT INTO client (id_client, code, points) VALUES
('user001', '12345', 150),
('user002', '54321', 200);

-- Insérer des admins
INSERT INTO admin (id_admin) VALUES
('user003');

INSERT INTO gerant(id_gerant) VALUES
('user005');

-- Insérer des employeurs
INSERT INTO employer (id_employer, date_embauche) VALUES
('user004', '2023-10-01');

-- Insérer des plats
INSERT INTO plat (id_plat, image, nom, prix) VALUES
('plat001', 'uploads/image/default.jpg', 'Pizza Margherita', 1200),
('plat002', 'uploads/image/default.jpg', 'Burger Classique', 1000),
('plat003', 'uploads/image/default.jpg', 'Salade César', 900);


-- Insérer des commandes
INSERT INTO commande (id_commande, id_client, id_plat, date_commande, status) VALUES
('cmd001', 'user001', 'plat001', '2024-09-01', true),
('cmd002', 'user002', 'plat002', '2024-09-02', true),
('cmd003', 'user001', 'plat003', '2024-09-03', false);

-- Insérer des menus
INSERT INTO menu (id_plat, date_menu) VALUES
('plat001', '2024-10-01'),
('plat002', '2024-10-01'),
('plat003', '2024-10-02');

-- Insérer des réclamations
INSERT INTO Reclamation (id_reclamation, id_client, description, date_reclamation, statut) VALUES
('rec001', 'user001', 'Problème avec la commande', '2024-09-03', FALSE),
('rec002', 'user002', 'Plat froid', '2024-09-04', TRUE);

-- Insérer des promotions
INSERT INTO promotion (id_promotion, id_admin, date_debut, date_fin, description) VALUES
('promo001', 'user003', '2024-09-01', '2024-09-30', 'Promotion de rentrée 10% de réduction'),
('promo002', 'user003', '2024-10-01', '2024-10-31', 'Offre spéciale pour les nouvelles commandes');
