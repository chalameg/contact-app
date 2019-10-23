import { repository, Filter, Count, CountSchema, Where } from "@loopback/repository";
import { UserRepository } from "../repositories";
import { post, param, requestBody, get, del, patch } from "@loopback/rest";
import { Contact, User } from "../models";

//Uncomment these imports to begin using these cool features!

export class UserContactsController {
  constructor(
    @repository(UserRepository)
    protected userRepository: UserRepository,
  ) { }

  @post('/users/{id}/contact', {
    responses: {
      '200': {
        description: 'User.Contact model instance',
        content: { 'application/json': { schema: { 'x-ts-type': Contact } } },
      },
    },
  })
  async createContact(
    @param.path.string('id') userId: typeof User.prototype.id,
    @requestBody() contactData: Contact,
  ): Promise<Contact> {
    return this.userRepository.contacts(userId).create(contactData);
  }

  @get('/users/{userId}/contacts', {
    responses: {
      '200': {
        description: "Array of User's Contacts",
        content: {
          'application/json': {
            schema: { type: 'array', items: { 'x-ts-type': Contact } },
          },
        },
      },
    },
  })
  async findContacts(
    @param.path.string('userId') userId: string,
    @param.query.string('filter') filter?: Filter<Contact>,
  ): Promise<Contact[]> {
    const contacts = await this.userRepository.contacts(userId).find(filter);
    return contacts;
  }

  @patch('/users/{userId}/contacts', {
    responses: {
      '200': {
        description: 'User.Contact PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async patchContacts(
    @param.path.string('userId') userId: string,
    @requestBody() contact: Partial<Contact>,
    @param.query.string('where') where?: Where<Contact>,
  ): Promise<Count> {
    return this.userRepository.contacts(userId).patch(contact, where);
  }

  @del('/users/{userId}/contacts', {
    responses: {
      '200': {
        description: 'User.Contact DELETE success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async deleteContacts(
    @param.path.string('userId') userId: string,
    @param.query.string('where') where?: Where<Contact>,
  ): Promise<Count> {
    return this.userRepository.contacts(userId).delete(where);
  }

}
