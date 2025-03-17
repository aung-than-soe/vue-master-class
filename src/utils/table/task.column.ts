import EditableStatus from '@/components/editable-status/EditableStatus.vue'
import Avatar from '@/components/ui/avatar/Avatar.vue'
import AvatarFallback from '@/components/ui/avatar/AvatarFallback.vue'
import AvatarImage from '@/components/ui/avatar/AvatarImage.vue'
import type { GroupedCollaborators } from '@/types/collaborator.type'
import type { TasksWithProjects } from '@/utils/query'
import type { ColumnDef } from '@tanstack/vue-table'
import { RouterLink } from 'vue-router'

export const columns = (
  collaborators: Ref<GroupedCollaborators>
): ColumnDef<TasksWithProjects[0]>[] => [
  {
    accessorKey: 'name',
    header: () => h('div', { class: 'text-left' }, 'Name'),
    cell: ({ row }) => {
      return h(
        RouterLink,
        {
          to: `/tasks/${row.original.id}`,
          class: 'text-left font-medium hover:bg-muted block w-full'
        },
        () => row.getValue('name')
      )
    }
  },
  {
    accessorKey: 'status',
    header: () => h('div', { class: 'text-left' }, 'Status'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium' },
        h(EditableStatus, { modelValue: row.original.status, readonly: true })
      )
    }
  },
  {
    accessorKey: 'due_date',
    header: () => h('div', { class: 'text-left' }, 'Due Date'),
    cell: ({ row }) => {
      return h('div', { class: 'text-left font-medium' }, row.getValue('due_date'))
    }
  },
  {
    accessorKey: 'projects',
    header: () => h('div', { class: 'text-left' }, 'Project'),
    cell: ({ row }) => {
      return row.original.projects
        ? h(
            RouterLink,
            {
              to: `/projects/${row.original.projects.slug || ''}`,
              class: 'text-left font-medium hover:bg-muted block w-full'
            },
            () => row.original?.projects?.name
          )
        : ''
    }
  },
  {
    accessorKey: 'collaborators',
    header: () => h('div', { class: 'text-left' }, 'Collaborators'),
    cell: ({ row }) => {
      return h(
        'div',
        { class: 'text-left font-medium h-20 flex items-center' },
        collaborators.value[row.original.id]
          ? collaborators.value[row.original.id].map((collab) =>
              h(RouterLink, { to: `/users/${collab.username}` }, () =>
                h(Avatar, { class: 'hover:scale-110 transition-transform' }, () =>
                  h(AvatarImage, { src: collab.avatar_url || '' })
                )
              )
            )
          : row.original.collaborators.map(() =>
              h(Avatar, { class: 'animate-pulse' }, () => h(AvatarFallback))
            )
      )
    }
  }
]
