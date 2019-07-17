import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

export class AsyncStorageUtil extends React.Component {

    static setLocalStorage(key, data) {
        try {
            console.log('storageres', data);
            AsyncStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.log('storageerr', error);
        }
    }

    static removeLocalStorage(key) {
        return AsyncStorage.removeItem(key)
            .then( async() => {
                return true;
            })
            .catch(() => {
                return false;
            });

    }

    static getLocalStorage(key) {
        return AsyncStorage.getItem(key)
            .then( async(res) => {
                let jsonObj = JSON.parse(res);
                               
                return jsonObj;
            })
            .catch((err) => {
                return;
            });
    }
}



