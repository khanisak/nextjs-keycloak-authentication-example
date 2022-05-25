/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import styles from '@styles/AppContext.module.scss';

interface IAppContext {
  keycloak?: Keycloak;
}

interface IProviderProps {
  children: React.ReactElement;
}

const Context = React.createContext({} as IAppContext);

function Provider(props: IProviderProps) {
  const { children } = props;
  const [k, setK] = useState<Keycloak>();
  const [authenticated, setAuthenticated] = useState<boolean>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const init = async () => {
      try {
        const keycloak = new Keycloak();
        const auth = await keycloak.init({ onLoad: 'login-required', checkLoginIframe: false });
        setK(keycloak);
        setAuthenticated(auth);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
      }
    };
    init();
  }, []);

  return (
    <Context.Provider value={{
      keycloak: k,
    }}
    >
      {error && error}
      {authenticated === undefined ? <p className={styles.main}>Please wait...</p> : children}
    </Context.Provider>
  );
}

export default Context;
export { Provider };
