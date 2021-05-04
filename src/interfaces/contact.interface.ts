export interface IContactAddress {
  address1: string,
  address2: string,
  address3: string,
  city: string,
  county: string,
  postCode: string,
}

export interface IContact {
  id: number,
  uuid: string,
  firstName: string,
  lastName: string,
  email: string,
  dateOfBirth: Date,
  addresses: IContactAddress[],
  comments: string[],
}
