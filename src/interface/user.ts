type UserGenderType = "male" | "female";
interface UserAddressInterface {
  address: string;
  postalCode: string;
}
interface UserCompanyInterface {
  address: UserAddressInterface;
  department: string;
}
export default interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  gender: UserGenderType;
  age: number;
  hair: {
    color: string;
    type: string;
  }
  address: UserAddressInterface;
  company: UserCompanyInterface;
}

export interface UserGroupInterface {
  [key: string]: UserGroupObjectInterface;
}

export interface UserGroupObjectInterface {
    male: number;
    female: number;
    ageRange: string;
    hair: {
      Black: number;
      Blond: number;
      Chestnut: number;
      Brown: number;
    };
    addressUser: {
      [key: string]: string;
    };
  }