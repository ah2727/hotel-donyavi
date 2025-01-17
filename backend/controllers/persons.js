const PersonService = require('../services/persons');

class PersonController {
  // Create a new Person
  static async create(req, res) {
    try {
      const { firstName, lastName, email, birthdate, isActive } = req.body;

      // Validate required fields
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'First name, last name, and email are required.' });
      }

      // Call service to create a new Person
      const person = await PersonService.createPerson({
        firstName,
        lastName,
        email,
        birthdate,
        isActive,
      });

      return res.status(201).json({ message: 'Person created successfully', data: person });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve all People
  static async getAll(req, res) {
    try {
      const persons = await PersonService.getAllPersons();
      return res.status(200).json({ data: persons });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Retrieve a single Person by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const person = await PersonService.getPersonById(id);
      return res.status(200).json({ data: person });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Update a Person by ID
  static async update(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updatedPerson = await PersonService.updatePerson(id, data);
      return res.status(200).json({ message: 'Person updated successfully', data: updatedPerson });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Delete a Person by ID
  static async delete(req, res) {
    try {
      const { id } = req.params;

      const message = await PersonService.deletePerson(id);
      return res.status(200).json(message);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}

module.exports = PersonController;
