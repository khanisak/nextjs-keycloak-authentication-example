/* eslint-disable react/function-component-definition */
import React, { useContext } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import AppContext from '@context/app';
import { Profile } from "@component/Profile"
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  const { keycloak } = useContext(AppContext);

  const login = () => {
    keycloak?.login();
  };

  const logout = () => {
    keycloak?.logout();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Keycloak Authentication Frontend</title>
        <meta name="description" content="nextjs keycloak authentication example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h4>Please sign in</h4>
        <h1>{keycloak?.authenticated ? 'Authenticated' : 'not authenticated'}</h1>
        <button type="button" onClick={login}>Sign in</button>
        <button type="button" onClick={logout}>Sign out</button>

        {keycloak?.authenticated && <Profile />}
      </main>
    </div>
  );
};

export default Home;
