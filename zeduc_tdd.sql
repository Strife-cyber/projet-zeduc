-- fonctions importante pour le client

-- 1. Code Parrainage
-- Cette fonction génère un code unique pour chaque nouveau client. Elle récupère le plus grand code existant dans la table client
--l'incremente et renvoie un nouveau code de 5 caractère, rempli avec des zéros à gauche si nécessaire.
CREATE OR REPLACE FUNCTION generer_code() RETURNS VARCHAR(5) LANGUAGE plpgsql AS $$
DECLARE
    max_code VARCHAR(5);
    new_code VARCHAR(5);
BEGIN
    -- récupère le code le plus élevé de la table client
    -- Get the maximum code from the client table
    SELECT MAX(code) INTO max_code FROM client;
    -- si la table est vide, retourne '00000'
    -- If the table is empty, return '00000'
    IF max_code IS NULL THEN
        RETURN '00000';
    END IF;

    -- Incrémenter le code au maximum et le remplir de zéros à gauche pour maintenir 5 chiffres
    -- Increment the maximum code and pad it with leading zeros to maintain 5 digits
    new_code := LPAD(CAST(CAST(max_code AS INTEGER) + 1 AS VARCHAR), 5, '0');

    RETURN new_code;
END;
$$;

-- 2. Inscription
-- cette fonction permet d'inscrire un nouveau client. Elle insère d'abord les informations du client dans  la table utilisateur,
--puis dans la table client, en générant un code unique et en initialisant les points à zéro.
CREATE OR REPLACE FUNCTION inscrire_client
    (id_client VARCHAR, nom_client VARCHAR, email_client VARCHAR, secret_client VARCHAR) RETURNS TEXT AS $$
    BEGIN
    -- Inserer les informations dasn la table utilisateur
        INSERT INTO utilisateur(id, nom, email, secret) VALUES (id_client, nom_client, email_client, secret_client);
    --Insere le client dans la table client avec un code généré et 0 points
        INSERT INTO client(id_client, code, points) VALUES (inscrire_client.id_client, generer_code(), 0);

        RETURN 'Client inscrit avec success';
    END ;
$$ LANGUAGE plpgsql;

-- 3. Menu du jour
   -- Cette fonction retourne le menu du jour sous forme de table contenant les plats, leurs images, noms et prix, pour une date donnée.
CREATE OR REPLACE FUNCTION menu_du_jour(jour DATE)
    RETURNS TABLE(id_plat VARCHAR, image VARCHAR, nom VARCHAR, prix INTEGER)
    LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    -- Selectionner les plats disponibles pour le menu du jour
    SELECT p.id_plat, p.image, p.nom, p.prix
    FROM public.menu m -- specify schema if needed
    JOIN public.plat p ON p.id_plat = m.id_plat
    WHERE m.date_menu = jour;
END;
$$;

-- 4. commande du jour
-- cette fonction permet de récupérer les commandes d'un utilisteur pour une date donnée, y compris le nom du Plat, son et statut de la commande.
CREATE OR REPLACE FUNCTION commande_utilisateur_jour(id_du_client VARCHAR, date DATE)
RETURNS TABLE(nom VARCHAR, prix INTEGER, status BOOLEAN) AS $$
    BEGIN
        RETURN QUERY
        --Selectionne les plats commandés par l'utilisateur à la date spécifiée
        SELECT p.nom, p.prix, c.status
        FROM commande c JOIN plat p ON c.id_plat = p.id_plat
        WHERE c.id_client = id_du_client AND c.date_commande = date;
    END ;
$$ LANGUAGE plpgsql;

-- 5. parrainage
-- cette fonction permet d'ajouter un parrain à un client, d'ajouter le parrainage et de mettre à jour les points si celui-ci existe.
CREATE OR REPLACE FUNCTION ajouter_parrain(code_parrain code_domain, id VARCHAR, points_ajouter INT)
RETURNS TEXT AS $$
    DECLARE
        id_parrain VARCHAR;
    BEGIN
        -- Récupérer l'ID du parrain du code fourni
        SELECT id_client INTO id_parrain FROM client WHERE code = code_parrain;

        -- Vérifier si le parrain existe
        IF id_parrain IS NOT NULL THEN
            -- Insérer le parrainage
            INSERT INTO parrainage(parrain, fiole) VALUES (id_parrain, id);

            -- Mettre à jour les points du parrain
            UPDATE client
            SET points = points + points_ajouter
            WHERE id_client = id_parrain;

            RETURN 'Insertion et mise à jour des points réussies';
        ELSE
            RETURN 'Parrain non trouvé';
        END IF;
    END;
$$ LANGUAGE plpgsql;

-- 6. fonction pour avoir les fioles
--cette fonction retourne la liste des fioles (personnes parrainées) pour un parrain donné.
CREATE OR REPLACE FUNCTION get_fiole(id_parrain VARCHAR)
RETURNS TABLE(nom VARCHAR) AS $$
    BEGIN
        RETURN QUERY
        -- Sélectionner les noms des utilisateurs parrainés par le parrin
        SELECT u.nom FROM parrainage p JOIN utilisateur u ON p.fiole = u.id
        WHERE p.parrain = id_parrain;
    END ;
$$ LANGUAGE plpgsql;

-- 7. fonction pour l'historique utilisateur
-- Cette fonction permet de récupérer l'historique des commandes d'un utlisateurs, avec le nom du plat, le prix, le statut et la date de la commande.
CREATE OR REPLACE FUNCTION historique(id VARCHAR)
RETURNS TABLE(nom VARCHAR, prix INTEGER, status BOOLEAN, date DATE) AS $$
    BEGIN
        RETURN QUERY
        --Sélectionne l'historique des commandes pour l'utilisateur spécifié
        SELECT p.nom, p.prix, c.status, c.date_commande
        FROM commande c JOIN plat p ON c.id_plat = p.id_plat
        WHERE c.id_client = id ORDER BY c.date_commande;
    END ;
$$ LANGUAGE plpgsql;

-- 8. mot de passe oublier
--Cette fonction permet de demander une réinitialisation de mot de passe. Elle génère un token sécurisé,
--l'associe à un utilisateur et enregistre la demande dans une table avec une expiration.
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION request_password_reset(user_email VARCHAR)
RETURNS TEXT LANGUAGE plpgsql
AS $$
DECLARE
    users_id VARCHAR;
    reset_token VARCHAR;
BEGIN
-- Verifie si l'email est existe dans la table utilisateur
    -- Step 1: Verify if the email exists in the utilisateur table
    SELECT id INTO users_id FROM utilisateur WHERE email = user_email;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Email not found';
    END IF;

-- générer un token sécurisé
    -- Step 2: Generate a reset token (using a simple random generation example)
    reset_token := encode(gen_random_bytes(32), 'hex'); -- Secure token generation

    -- Enregistrer le token dans la tabe password_reset avec une expiration
    -- Step 3: Store the reset token in a table, along with expiration (e.g., 1 hour)
    INSERT INTO password_resets (user_id, token, expiry)
    VALUES (users_id, reset_token, NOW() + INTERVAL '1 hour');

-- Retourner le token de réinitialisation(en pratique, il serait envoyé par email)
    -- Step 4: Return the reset token (in a real system, you would email this to the user)
    RETURN reset_token;
END;
$$;

-- fonction importante pour les employer
-- fonction de statistique
-- 1. Plat populaire
CREATE OR REPLACE FUNCTION plats_populaires()
RETURNS TABLE(nom_plat VARCHAR, total_commande BIGINT) AS $$
BEGIN
    RETURN QUERY (
        SELECT p.nom, COUNT(c.id_plat) AS total_commande
        FROM plat p
        JOIN commande c ON p.id_plat = c.id_plat
        GROUP BY p.nom
        ORDER BY total_commande DESC
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION reclamations_resolues()
RETURNS INTEGER AS $$
BEGIN
    RETURN (
        SELECT COUNT(*)
        FROM Reclamation r
        WHERE r.statut = TRUE
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION temps_moyen_traitement_reclamations()
RETURNS INTERVAL AS $$
BEGIN
    RETURN (
        SELECT AVG(r.date_reclamation - c.date_commande)
        FROM Reclamation r
        JOIN commande c ON r.id_client = c.id_client
        WHERE r.statut = TRUE
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION details_temps_traitement_reclamations()
RETURNS TABLE(id_reclamation VARCHAR, id_client VARCHAR, temps_traitement INTERVAL) AS $$
BEGIN
    RETURN QUERY (
        SELECT
            r.id_reclamation,
            r.id_client,
            (r.date_reclamation - c.date_commande) * INTERVAL '1 day' AS temps_traitement
        FROM Reclamation r
        JOIN commande c ON r.id_client = c.id_client
        WHERE r.statut = TRUE
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION total_commandes_tous_employes()
RETURNS TABLE(id_employer VARCHAR, total_commandes BIGINT) AS $$
BEGIN
    RETURN QUERY (
        SELECT e.id_employer, COUNT(l.id_commande) AS total_commandes
        FROM livreur l
        JOIN employer e ON e.id_employer = l.id_employer
        GROUP BY e.id_employer
    );
END;
$$ LANGUAGE plpgsql;

--Réinitialisation de mot de passe
-- Cette fonction permet à un utilisateur de réinitialiser son mot de passe à l'aide d'un token valide et non expiré.
CREATE OR REPLACE FUNCTION reset_password(reset_token VARCHAR, new_password VARCHAR)
RETURNS TEXT LANGUAGE plpgsql
AS $$
DECLARE
    users_id VARCHAR;
BEGIN
-- vérifier si le token est valide et non expiré
    -- Step 1: Find the user based on the reset token and ensure it hasn't expired
    SELECT user_id INTO users_id FROM password_resets
    WHERE token = reset_token AND expiry > NOW();

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid or expired reset token';
    END IF;

    -- Mettre à jour le mot de passe de l'utilisateur
    -- Step 3: Update the user's password in the utilisateur table
    UPDATE utilisateur SET secret = new_password WHERE id = users_id;

-- Supprimer le token après réinitialisation
    -- Step 4: Delete the reset token (one-time use)
    DELETE FROM password_resets WHERE token = reset_token;

    RETURN 'Password reset successfully';
END;
$$;

-- Fonction pour l'admin
-- historique de commande
-- cette vue permet à un administrateur de consulter l'historique de toutes les commandes classées par date de commande.
CREATE OR REPLACE VIEW historique AS
    SELECT * FROM commande ORDER BY (commande.date_commande);
SELECT * FROM historique;


-- Fonction generale pour la connexion
-- Cette fonction gère la connexion des utilisateurs en fonction de leur rôle (admin, gérant, employé, client) et retourne les informations de l'utilisateur
-- ainsi qu'un niveau de priorité correspondant à leur rôle dans le système.
CREATE OR REPLACE FUNCTION connexion(email_input VARCHAR, secret_input VARCHAR)
RETURNS TABLE(id VARCHAR, nom VARCHAR, email VARCHAR, secret VARCHAR, priority INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    utilisateur_row utilisateur%ROWTYPE;
BEGIN
    -- Step 1: Check if the user exists in the utilisateur table
 -- Vérifier si l'utilisateur existe avec l'email et le mot de passe fourn
    SELECT * INTO utilisateur_row
    FROM utilisateur u
    WHERE u.email = email_input AND u.secret = secret_input;

    -- If the user is not found, raise an exception

    -- Si l'utilisateur n'est pas trouvé, lever une exception
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Utilisateur non trouvé ou mauvais identifiants';
    END IF;

    -- Step 2: Check if the user is a gerant (priority 1)
    -- Vérifier si l'utilisateur est un gérant (priorité 1)
    IF EXISTS (SELECT 1 FROM gerant WHERE id_gerant = utilisateur_row.id) THEN
        RETURN QUERY SELECT utilisateur_row.id, utilisateur_row.nom, utilisateur_row.email, utilisateur_row.secret, 1;
        RETURN;
    END IF;

    -- Step 3: Check if the user is an admin (priority 0)
    -- Vérifier si l'utilisateur est un admin (priorité 0)
    IF EXISTS (SELECT 1 FROM admin WHERE id_admin = utilisateur_row.id) THEN
        RETURN QUERY SELECT utilisateur_row.id, utilisateur_row.nom, utilisateur_row.email, utilisateur_row.secret, 0;
        RETURN;
    END IF;

    -- Step 4: Check if the user is an employer (priority 2)
    -- vérifie si l'utilisateur un employer (priorité 2)
    IF EXISTS (SELECT 1 FROM employer WHERE id_employer = utilisateur_row.id) THEN
        RETURN QUERY SELECT utilisateur_row.id, utilisateur_row.nom, utilisateur_row.email, utilisateur_row.secret, 2;
        RETURN;
    END IF;

    -- Step 5: Check if the user is a client (priority 3)
    -- Vérifie si l'utilisateur est un client (priorité 3)
    IF EXISTS (SELECT 1 FROM client WHERE id_client = utilisateur_row.id) THEN
        RETURN QUERY SELECT utilisateur_row.id, utilisateur_row.nom, utilisateur_row.email, utilisateur_row.secret, 3;
        RETURN;
    END IF;

    -- Step 6: If no role is found, raise an exception
    -- Si aucun rôle n'est trouvé pour l'utilisateur, lever une exception
    RAISE EXCEPTION 'Utilisateur trouvé, mais aucun rôle attribué.';
END;
$$;
