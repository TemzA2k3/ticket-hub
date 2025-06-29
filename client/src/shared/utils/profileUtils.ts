import { IUser, IProfile } from "../types";

interface UserField {
  label: string;
  value: string; 
  full?: boolean;
}

export interface TransformedUser {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  dateOfBirth: string
  location: string
  bio: string
}

export const getAvatarUrl = (user: IUser | IProfile) => {
  if (user.avatarUrl) {
    return import.meta.env.VITE_API_BASE_URL + user.avatarUrl;
  }
  return `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=000&color=fff&size=40&rounded=true`;
};

export const readonlyFields = ["Email Address"];


export const transformUserData = (data: UserField[]): TransformedUser[] => {
  const labelMap: Record<string, keyof TransformedUser> = {
    'First Name': 'firstName',
    'Last Name': 'lastName',
    'Email Address': 'email',
    'Phone Number': 'phoneNumber',
    'Date of Birth': 'dateOfBirth',
    'Location': 'location',
    'Bio': 'bio',
  }

  const result = data.reduce((acc, item) => {
    const key = labelMap[item.label]
    if (key) {
      acc[key] = item.value && item.value !== 'Unknown' ? item.value : ''
    }
    return acc
  }, {} as TransformedUser)

  return [result]
}
