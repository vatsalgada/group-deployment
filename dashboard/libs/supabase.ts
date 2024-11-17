
import { createClient } from '@supabase/supabase-js';
import { WhatsAppGroup, Label, IssueLog } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchGroups() {
  const { data: groups, error: groupsError } = await supabase
    .from('groups')
    .select(`
      *,
      labels:group_labels(
        label:labels(*)
      ),
      issue_logs(*)
    `);

  if (groupsError) throw groupsError;

  // Transform the data to match your WhatsAppGroup type
  return groups.map(group => ({
    id: group.id,
    entityOne: group.entity_one,
    entityTwo: group.entity_two,
    isActive: group.is_active,
    project: {
      type: group.project_type,
      name: group.project_name
    },
    labels: group.labels.map((l: any) => l.label),
    members: group.members,
    lastActive: new Date(group.last_active).toLocaleTimeString(),
    disappearingMessages: group.disappearing_messages,
    sendMessagePermission: group.send_message_permission,
    issueLog: group.issue_logs?.[0] ? {
      id: group.issue_logs[0].id,
      groupId: group.issue_logs[0].group_id,
      groupReference: group.issue_logs[0].group_reference,
      title: group.issue_logs[0].title,
      timestamp: new Date(group.issue_logs[0].timestamp).toLocaleDateString(),
      tags: group.issue_logs[0].tags,
      status: group.issue_logs[0].status
    } : undefined
  })) as WhatsAppGroup[];
}

export async function updateGroup(group: Partial<WhatsAppGroup> & { id: string }) {
  const { error } = await supabase
    .from('groups')
    .update({
      entity_one: group.entityOne,
      entity_two: group.entityTwo,
      is_active: group.isActive,
      project_type: group.project?.type,
      project_name: group.project?.name,
      members: group.members,
      disappearing_messages: group.disappearingMessages,
      send_message_permission: group.sendMessagePermission
    })
    .eq('id', group.id);

  if (error) throw error;
}