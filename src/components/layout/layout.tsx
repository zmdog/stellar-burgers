import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from '../app/app.module.css';
import { AppHeader } from '@components';

export const Layout = () => (
  <div className={styles.app}>
    <AppHeader />
    <Outlet />
  </div>
);
