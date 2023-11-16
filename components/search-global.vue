<script setup>
const commandPaletteRef = ref()

const recents = [
  { id: '1', label: 'Notes with mastering app, 1hr ago',},
  { id: '2', label: 'Notes with the greatest comeback, 1hr ago',},
]

const commands = [
  { id: 'list-note', label: 'List Notes', icon: 'i-lucide-sticky-note', click: () => alert('New Notes') },
  { id: 'new-note', label: 'New Note', icon: 'i-lucide-file-plus-2', click: () => alert('New folder') },
  { id: 'view-storage', label: 'View Storage', icon: 'i-lucide-archive-restore', click: () => alert('Add hashtag') }
]

const groups = [{
  key: 'recents',
  label: 'Recent Notes',
  commands: recents
}, {
  key: 'commands',
  label: 'Commands',
  inactive: 'Command',
  commands
}]

const ui = {
  searchable: false,
  placeholder: 'Search recent files or command',
  wrapper: 'flex flex-col flex-1 min-h-0 divide-y divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800',
  container: 'relative flex-1 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700 scroll-py-2',
  input: {
    base: 'w-full h-14 px-4 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent border-0 text-gray-900 dark:text-white focus:ring-0 focus:outline-none'
  },
  group: {
    label: 'px-2 my-2 text-xs font-semibold text-gray-500 dark:text-gray-400',
    command: {
      base: 'flex justify-between select-none cursor-default items-center rounded-md px-2 py-2 gap-2 relative',
      active: 'bg-gray-200 dark:bg-gray-700/50 text-gray-900 dark:text-white',
      container: 'flex items-center gap-3 min-w-0',
      icon: {
        base: 'flex-shrink-0 w-5 h-5',
        active: 'text-gray-900 dark:text-white',
        inactive: 'text-gray-400 dark:text-gray-500'
      },
      avatar: {
        size: '2xs'
      }
    }
  }
}
</script>

<template>
  <UCommandPalette
    ref="commandPaletteRef"
    :groups="groups"
    icon=""
    :ui="ui"
    :autoselect="false"
    placeholder="Search for recent notes and commands"
  />
</template>