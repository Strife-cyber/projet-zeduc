-- fonctions importante pour le client
-- 1. Code Parrainage
CREATE OR REPLACE FUNCTION generer_code() RETURNS VARCHAR(5) LANGUAGE plpgsql AS $$
DECLARE
    max_code VARCHAR(5);
    new_code VARCHAR(5);
BEGIN
    -- Get the maximum code from the client table
    SELECT MAX(code) INTO max_code FROM client;

    -- If the table is empty, return '00000'
    IF max_code IS NULL THEN
        RETURN '00000';
    END IF;

    -- Increment the maximum code and pad it with leading zeros to maintain 5 digits
    new_code := LPAD(CAST(CAST(max_code AS INTEGER) + 1 AS VARCHAR), 5, '0');

    RETURN new_code;
END;
$$;

-- 2. Inscription
CREATE OR REPLACE FUNCTION inscrire_client
    (id_client VARCHAR, nom_client VARCHAR, email_client VARCHAR, secret_client VARCHAR) RETURNS TEXT AS $$
    BEGIN
        INSERT INTO utilisateur(id, nom, email, secret) VALUES (id_client, nom_client, email_client, secret_client);
        INSERT INTO client(id_client, code, points) VALUES (inscrire_client.id_client, generer_code(), 0);

        RETURN 'Client inscrit avec success';
    END ;
$$ LANGUAGE plpgsql;

-- 3. Menu du jour
CREATE OR REPLACE FUNCTION menu_du_jour(jour DATE)
    RETURNS TABLE(id_plat VARCHAR, image bytea, nom VARCHAR, prix INTEGER)
    LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT p.id_plat, p.image, p.nom, p.prix
    FROM public.menu m -- specify schema if needed
    JOIN public.plat p ON p.id_plat = m.id_plat
    WHERE m.date_menu = jour;
END;
$$;

-- 4. mot de passe oublier
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION request_password_reset(user_email VARCHAR)
RETURNS TEXT LANGUAGE plpgsql
AS $$
DECLARE
    users_id VARCHAR;
    reset_token VARCHAR;
BEGIN
    -- Step 1: Verify if the email exists in the utilisateur table
    SELECT id INTO users_id FROM utilisateur WHERE email = user_email;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Email not found';
    END IF;

    -- Step 2: Generate a reset token (using a simple random generation example)
    reset_token := encode(gen_random_bytes(32), 'hex'); -- Secure token generation

    -- Step 3: Store the reset token in a table, along with expiration (e.g., 1 hour)
    INSERT INTO password_resets (user_id, token, expiry)
    VALUES (users_id, reset_token, NOW() + INTERVAL '1 hour');

    -- Step 4: Return the reset token (in a real system, you would email this to the user)
    RETURN reset_token;
END;
$$;

CREATE OR REPLACE FUNCTION reset_password(reset_token VARCHAR, new_password VARCHAR)
RETURNS TEXT LANGUAGE plpgsql
AS $$
DECLARE
    users_id VARCHAR;
BEGIN
    -- Step 1: Find the user based on the reset token and ensure it hasn't expired
    SELECT user_id INTO users_id FROM password_resets
    WHERE token = reset_token AND expiry > NOW();

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Invalid or expired reset token';
    END IF;

    -- Step 3: Update the user's password in the utilisateur table
    UPDATE utilisateur SET secret = new_password WHERE id = users_id;

    -- Step 4: Delete the reset token (one-time use)
    DELETE FROM password_resets WHERE token = reset_token;

    RETURN 'Password reset successfully';
END;
$$;

-- Fonction pour l'admin
-- historique de commande
CREATE VIEW historique AS
    SELECT * FROM commande ORDER BY (commande.date_commande);
SELECT * FROM historique;


-- Fonction generale pour la connexion
CREATE OR REPLACE FUNCTION connexion(email_input VARCHAR, secret_input VARCHAR)
RETURNS TABLE(id VARCHAR, nom VARCHAR, email VARCHAR, secret VARCHAR, priority INTEGER)
LANGUAGE plpgsql
AS $$
DECLARE
    utilisateur_row utilisateur%ROWTYPE;
BEGIN
    -- Step 1: Check if the user exists in the utilisateur table
    SELECT * INTO utilisateur_row
    FROM utilisateur u
    WHERE u.email = email_input AND u.secret = secret_input;

    -- If the user is not found, raise an exception
    IF NOT FOUND THEN
        RAISE EXCEPTION 'Utilisateur non trouvé ou mauvais identifiants';
    END IF;

    -- Step 2: Check if the user is a gerant (priority 1)
    IF EXISTS (SELECT 1 FROM gerant WHERE id_gerant = utilisateur_row.id) THEN
        RETURN QUERY SELECT utilisateur_row.id, utilisateur_row.nom, utilisateur_row.email, utilisateur_row.secret, 1;
        RETURN;
    END IF;

    -- Step 3: Check if the user is an admin (priority 0)
    IF EXISTS (SELECT 1 FROM admin WHERE id_admin = utilisateur_row.id) THEN
        RETURN QUERY SELECT utilisateur_row.id, utilisateur_row.nom, utilisateur_row.email, utilisateur_row.secret, 0;
        RETURN;
    END IF;

    -- Step 4: Check if the user is an employer (priority 2)
    IF EXISTS (SELECT 1 FROM employer WHERE id_employer = utilisateur_row.id) THEN
        RETURN QUERY SELECT utilisateur_row.id, utilisateur_row.nom, utilisateur_row.email, utilisateur_row.secret, 2;
        RETURN;
    END IF;

    -- Step 5: Check if the user is a client (priority 3)
    IF EXISTS (SELECT 1 FROM client WHERE id_client = utilisateur_row.id) THEN
        RETURN QUERY SELECT utilisateur_row.id, utilisateur_row.nom, utilisateur_row.email, utilisateur_row.secret, 3;
        RETURN;
    END IF;

    -- Step 6: If no role is found, raise an exception
    RAISE EXCEPTION 'Utilisateur trouvé, mais aucun rôle attribué.';
END;
$$;
