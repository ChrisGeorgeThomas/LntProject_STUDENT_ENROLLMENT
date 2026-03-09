export interface Student {
  id: number;
  name: string;
  email: string;
  department: string;
  enrollmentDate: Date;
  phone?: string;
}

export class StudentModel implements Student {
  id: number;
  name: string;
  email: string;
  department: string;
  enrollmentDate: Date;
  phone?: string;

  constructor(
    id: number,
    name: string,
    email: string,
    department: string,
    enrollmentDate: Date,
    phone?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.department = department;
    this.enrollmentDate = enrollmentDate;
    this.phone = phone;
  }
}
