import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) throw new Error('Set SUPABASE_URL and SUPABASE_SECRET_KEY in the environment.');

const [username, pin, role, displayName, groupArg, studentId = ''] = process.argv.slice(2);
if (!username || !pin || !role || !displayName || !['teacher','class_leader','group_leader','student'].includes(role)) {
  console.error('Usage: node scripts/create-user.mjs <username> <PIN>=6+chars <role> <display name> [group 1-4] [student UUID]');
  process.exit(1);
}
if (!/^[a-z0-9._-]{3,32}$/.test(username)) throw new Error('Username must be 3-32 lowercase letters/numbers/dot/underscore/dash.');
if (pin.length < 6) throw new Error('PIN/password must be at least 6 characters. Use a longer PIN if possible.');
const groupNo = groupArg ? Number(groupArg) : null;
if (role === 'group_leader' && ![1,2,3,4].includes(groupNo)) throw new Error('group_leader requires group number 1-4.');
const supabase = createClient(url, secret, { auth: { autoRefreshToken: false, persistSession: false } });
const email = `${username}@11a3.invalid`;
const { data: created, error: createError } = await supabase.auth.admin.createUser({ email, password: pin, email_confirm: true, user_metadata: { username, display_name: displayName } });
if (createError) throw createError;
const { error: profileError } = await supabase.from('profiles').insert({ id: created.user.id, username, display_name: displayName, role, group_no: groupNo, student_id: studentId || null, active: true });
if (profileError) {
  await supabase.auth.admin.deleteUser(created.user.id);
  throw profileError;
}
console.log(`Created ${username} (${role}) with user id ${created.user.id}`);
console.log('Keep this PIN private. Do not commit the secret key or PIN to Git.');
