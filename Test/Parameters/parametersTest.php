<?php

use PHPUnit\Framework\TestCase;

class ParametersTest extends TestCase
{
    public function testParametersInitialization()
    {
        // Create a Parameters object
        $parrain = 'code123';
        $commande = 'order456';
        $parameters = new Parameters($parrain, $commande);

        // Assert that the parameters are set correctly
        $this->assertEquals($parrain, $parameters->getParrain());
        $this->assertEquals($commande, $parameters->getCommande());
    }

    public function testGetParametreReturnsParametersObject()
    {
        // Arrange: Create a mock JSON file
        $jsonFilePath = './parameters/data.json';
        $jsonData = json_encode(['parrain' => 'code123', 'commande' => 'order456']);
        file_put_contents($jsonFilePath, $jsonData);

        // Act: Call the getParametre function
        $parameters = getParametre();

        // Assert: Check if the returned object is a Parameters instance
        $this->assertInstanceOf(Parameters::class, $parameters);
        $this->assertEquals('code123', $parameters->getParrain());
        $this->assertEquals('order456', $parameters->getCommande());

        // Clean up
        unlink($jsonFilePath); // Remove the mock file
    }

    public function testGetParametreReturnsNullWhenFileDoesNotExist()
    {
        // Arrange: Ensure the file does not exist
        $jsonFilePath = './parameters/data.json';
        if (file_exists($jsonFilePath)) {
            unlink($jsonFilePath); // Delete if it exists
        }

        // Act: Call the getParametre function
        $parameters = getParametre();

        // Assert: Check if it returns null
        $this->assertNull($parameters);
    }

    public function testGetParametreHandlesJsonDecodeError()
    {
        // Arrange: Create a mock JSON file with invalid JSON
        $jsonFilePath = './parameters/data.json';
        file_put_contents($jsonFilePath, '{invalid_json}');

        // Act: Call the getParametre function
        ob_start(); // Start output buffering
        $parameters = getParametre();
        $output = ob_get_contents(); // Capture output
        ob_end_clean(); // Clean output buffer

        // Assert: Check if it returns null and outputs an error message
        $this->assertNull($parameters);
        $this->assertEquals("Error backend error", trim($output));

        // Clean up
        unlink($jsonFilePath); // Remove the mock file
    }
}
