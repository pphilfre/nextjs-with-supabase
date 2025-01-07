import { createClient } from "./supabase/server"; 

export interface Teacher {
    id: string;
    first_name: string;
    last_name: string;
    gender: string;
    tutor_group: string;
    phone_number: string;
}

export async function getTeachers(): Promise<Teacher[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('users')
      .select('*');
  
  
  
    if (error) {
      console.error('Error fetching teachers:', error);
      return [];
    }
  
    const teachers: Teacher[] = data.map((teacher: any) => ({
      id: teacher.id,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      gender: teacher.gender,
      tutor_group: teacher.tutor_group,
      phone_number: teacher.phone_number
    }));
  
    return teachers || [];
  }

export const data: Teacher[] = [];

getTeachers().then(teachers => data.push(...teachers));



