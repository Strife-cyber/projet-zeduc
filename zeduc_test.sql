--test pour les functions du client

-- 1. Appeler la fonction pour générer le premier code
SELECT generer_code();

-- 2.Teste pour l'inscription d'un client
SELECT inscrire_client(id_client := 'user0005', nom_client := 'dunamis', email_client := 'dunamisjunior15@gmail.com', secret_client := '1234000');
SELECT * FROM client LEFT JOIN utilisateur u on client.id_client = u.id;

-- 3. Teste menu du jour
SELECT menu_du_jour('2024-10-01');

-- 4. Teste mise a jour mot de passe
SELECT reset_password(request_password_reset('dunamisjunior15@gmail.com'), 'hello world reset');
SELECT * FROM password_resets;


SELECT * FROM utilisateur;
-- Teste pour la fonction generale de connexion
SELECT connexion('alice.dupont@example.com', 'secret123');