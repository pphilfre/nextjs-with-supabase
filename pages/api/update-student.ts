import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/utils/supabase/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = await createClient();

  if (req.method === 'POST') {
    const { id, first_name, last_name, date_of_birth, address, parent_phone, gender, tutor_group } = req.body;

    if (!id || !first_name || !last_name || !date_of_birth || !address || !parent_phone || !gender || !tutor_group) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data: users, error: err } = await supabase
      .from("students")
      .select("id")
      .eq("id", id);

    if (users?.length === 0 || err) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    const { error } = await supabase
      .from("students")
      .update({
        first_name,
        last_name,
        date_of_birth,
        address,
        parent_phone,
        gender,
        tutor_group
      })
      .eq('id', id);

    if (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(200).json({ message: 'User updated successfully' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}