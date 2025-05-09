export type MenuItemTypes = {
  label: string;
  href?: string;
  icon: string;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | undefined;
  children?: MenuItemTypes[];
};
