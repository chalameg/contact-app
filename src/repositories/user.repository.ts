import { DefaultCrudRepository, repository, HasManyRepositoryFactory } from '@loopback/repository';
import { User, UserRelations, Contact } from '../models';
import { MongoDsDataSource } from '../datasources';
import { inject, Getter } from '@loopback/core';
import { ContactRepository } from './contact.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {

  //
  public readonly contacts: HasManyRepositoryFactory<
    Contact,
    typeof User.prototype.id
  >;

  constructor(
    @inject('datasources.mongoDS') dataSource: MongoDsDataSource,
    //to obtain instance of target model
    @repository.getter('ContactRepository')
    getContactRepository: Getter<ContactRepository>,
  ) {
    super(User, dataSource);

    //
    this.contacts = this.createHasManyRepositoryFactoryFor(
      'contacts',
      getContactRepository,
    );
  }

  // public findByEmail(email:string){
  //   Contact.fi
  // }
}
