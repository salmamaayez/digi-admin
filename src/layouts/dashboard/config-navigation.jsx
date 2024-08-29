import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Waiters',
    path: '/waiters',
    icon: icon('ic_user'),
  },
  {
    title: 'menu',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'tables',
    path: '/table',
    icon: icon('ic_blog'),
  },
    
];

export default navConfig;
