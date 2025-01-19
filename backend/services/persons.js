const {Person} = require('../models'); // Import Person model

class PersonService {
  // Create a new Person
  static async createPerson(data) {
    try {
      const person = await Person.create(data);
      return person;
    } catch (error) {
      throw new Error('Error creating Person: ' + error.message);
    }
  }

  // Retrieve all People
  static async getAllPersons() {
    try {
      const persons = await Person.findAll();
      return persons;
    } catch (error) {
      throw new Error('Error retrieving People: ' + error.message);
    }
  }

  // Retrieve a Person by ID
  static async getPersonById(id) {
    try {
      const person = await Person.findByPk(id);
      if (!person) {
        throw new Error('Person not found');
      }
      return person;
    } catch (error) {
      throw new Error('Error retrieving Person: ' + error.message);
    }
  }

  // Update a Person by ID
  static async updatePerson(id, data) {
    try {
      const person = await Person.findByPk(id);
      if (!person) {
        throw new Error('Person not found');
      }
      await person.update(data);
      return person;
    } catch (error) {
      throw new Error('Error updating Person: ' + error.message);
    }
  }

  // Delete a Person by ID
  static async deletePerson(id) {
    try {
      const person = await Person.findByPk(id);
      if (!person) {
        throw new Error('Person not found');
      }
      await person.destroy();
      return { message: 'Person deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting Person: ' + error.message);
    }
  }
}

module.exports = PersonService;
