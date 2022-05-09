import React, { useContext, useEffect, useState } from 'react';
import { KeycloakProfile } from "keycloak-js"
import AppContext from '@context/app';
import styles from './Profile.module.scss';

function Profile() {
  const { keycloak } = useContext(AppContext);
  const [profile, setProfile] = useState<KeycloakProfile>();
  const [error, setError] = useState<string>();


  useEffect(() => {
    keycloak?.loadUserProfile().then(profile => {
      console.log(profile);
      setProfile(profile)
    }).catch(err => {
      setError(err.message);
    })
  }, []);

  return (
    <div className={styles.content}>
      {error && <p className='error'>{error}</p>}
      {profile && <table>
        <thead>
          <tr>
            <th colSpan={3}>Welcome, {profile.firstName} {profile.lastName}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Username</td>
            <td>:</td>
            <td>{profile.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>:</td>
            <td>{profile.email}</td>
          </tr>
          <tr>
            <td>Verified Email</td>
            <td>:</td>
            <td>{profile.emailVerified ? "true" : "false"}</td>
          </tr>
          <tr>
            <td>TOTP</td>
            <td>:</td>
            <td>{profile.totp ? "Using TOTP" : "No TOTP"}</td>
          </tr>
        </tbody>
      </table>}
    </div>
  );
}

export default Profile;
