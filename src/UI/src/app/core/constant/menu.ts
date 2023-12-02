import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: '',
      separator: true,
      items: [
        {
          icon:' heroBuildingStorefront',
          label: 'Courses',
          route: '/courses',
        },
        {
          icon: 'heroFolderOpen',
          label: 'Dashboard',
          route: '/dashboard',
          children: [
            { label: 'Overview', route: '/dashboard' },
            { label: 'My courses', route: '/dashboard/my-courses' },
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
          label: 'Account settings',
          route: '/settings',
        },
      
      ],
    }, 
  ];
}