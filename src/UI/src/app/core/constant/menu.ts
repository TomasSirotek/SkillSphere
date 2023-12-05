import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: '',
      separator: false,
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
  ];
}