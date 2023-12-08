import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: '',
      separator: false,
      items: [
        {
          icon:' heroBuildingStorefront',
          label: 'Store',
          route: '/courses',
        },
        {
          icon: 'heroSquares2x2',
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