import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Pages',
      separator: true,
      items: [
        {
          icon: 'heroFolderOpen',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Overview', route: '/dashboard' },
            { label: 'Teaching', route: '/dashboard/teaching' },
            { label: 'Purchased', route: '/dashboard/purchased' },

          ],
        },
        {
          icon:' heroBuildingStorefront',
          label: 'Courses',
          route: '/courses',
          children: [
            { label: 'Course store', route: '/courses' },
            { label: 'Saved courses', route: '/teaching' },
          ],
        },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'heroBuildingStorefront',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'heroBuildingStorefront',
          label: 'Notifications',
          route: '/gift',
        },
      ],
    }, 
  ];
}