import { createClient } from "./supabase/server"; 

export interface Student {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    tutor_group: string;
}

export async function getStudents(): Promise<Student[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('students')
      .select('*');
  
  
  
    if (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  
    const students: Student[] = data.map((student: any) => ({
      id: student.id,
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      gender: student.gender,
      tutor_group: student.tutor_group
    }));
  
    return students || [];
  }

export const data: Student[] = [];

getStudents().then(students => data.push(...students));



