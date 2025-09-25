export class EmergencyContact {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  equals(otherEmergencyContact) {
    return (
      this.name === otherEmergencyContact.name &&
      this.phone === otherEmergencyContact.phone
    );
  }
}