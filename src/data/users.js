// src/data/users.js

// Mock user database for login demonstration. In production replace with real auth backend.
export const users = [
  {
    username: 'staff1',
    password: 'password', // In real app store hashed passwords.
    role: 'staff', // Professional title: Warehouse Operations Specialist
    displayName: 'Warehouse Operations Specialist'
  },
  {
    username: 'customer1',
    password: 'password',
    role: 'customer',
    displayName: 'Client'
  }
];
