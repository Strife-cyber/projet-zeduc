<?php

use PHPUnit\Framework\TestCase;

class ModelClientTest extends TestCase
{
    private $modelClient;
    private $mockPDO;
    private $mockStmt;

    protected function setUp(): void
    {
        // Mock the PDO connection
        $this->mockPDO = $this->createMock(PDO::class);
        // Mock the PDOStatement
        $this->mockStmt = $this->createMock(PDOStatement::class);
        
        // Pass the mock PDO connection to the ModelClient
        $this->modelClient = new ModelClient($this->mockPDO);
    }

    public function testCreateClient()
    {
        $id = 'client001';
        $nom = 'John Doe';
        $email = 'john.doe@example.com';
        $secret = 'secret123';

        // Mock the getAllClients to return an empty array (no existing users)
        $this->modelClient->method('getAllClients')->willReturn([]);

        // Mock the prepare method on the PDO object
        $this->mockPDO->expects($this->once())
            ->method('prepare')
            ->with($this->equalTo("SELECT inscrire_client(:id_client, :nom_client, :email_client, :secret_client)"))
            ->willReturn($this->mockStmt);

        // Mock the bindParam and execute methods
        $this->mockStmt->expects($this->exactly(4))
            ->method('bindParam')
            ->withConsecutive(
                [$this->equalTo(':id_client'), $this->equalTo($id)],
                [$this->equalTo(':nom_client'), $this->equalTo($nom)],
                [$this->equalTo(':email_client'), $this->equalTo($email)],
                [$this->equalTo(':secret_client'), $this->equalTo($secret)]
            );

        $this->mockStmt->expects($this->once())
            ->method('execute')
            ->willReturn(true);

        // Execute the method and assert that the result is true
        $result = $this->modelClient->createClient($id, $nom, $email, $secret);
        $this->assertTrue($result, "Client created successfully.");
    }

    public function testCreateClientWithExistingEmail()
    {
        $id = 'client002';
        $nom = 'Jane Doe';
        $email = 'jane.doe@example.com';
        $secret = 'secret456';

        // Mock the getAllClients to return an array with the same email
        $this->modelClient->method('getAllClients')->willReturn([
            ['email' => 'jane.doe@example.com']
        ]);

        // Execute the method and assert that the result is null
        $result = $this->modelClient->createClient($id, $nom, $email, $secret);
        $this->assertNull($result, "Client not created due to existing email.");
    }

    public function testConnexionSuccessful()
    {
        $email = 'john.doe@example.com';
        $password = 'secret123';

        // Mock the getAllClients to return a user with matching credentials
        $this->modelClient->method('getAllClients')->willReturn([
            ['email' => $email, 'secret' => $password]
        ]);

        // Execute the method and assert that the result matches the user
        $result = $this->modelClient->connexion($email, $password);
        $this->assertNotNull($result);
        $this->assertEquals($email, $result['email']);
    }

    public function testConnexionFailed()
    {
        $email = 'wrong.email@example.com';
        $password = 'wrongpassword';

        // Mock the getAllClients to return an empty array (no matching user)
        $this->modelClient->method('getAllClients')->willReturn([]);

        // Mock the prepare method for the employer query
        $this->mockPDO->method('prepare')->willReturn($this->mockStmt);
        $this->mockStmt->method('execute')->willReturn(true);
        $this->mockStmt->method('fetchAll')->willReturn([]);

        // Execute the method and assert that the result is null
        $result = $this->modelClient->connexion($email, $password);
        $this->assertNull($result, "Connexion should fail with wrong credentials.");
    }
}
