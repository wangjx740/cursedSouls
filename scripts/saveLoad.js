﻿'use strict';

Main.storage = window.localStorage;

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
Main.system.storageAvailable = function () {
    try {
        var storage = window.localStorage;
        var x = '__storage_test__';

        storage.setItem(x, x);
        storage.removeItem(x);

        return true;
    }
    catch (e) {
        return e instanceof DOMException
            && (
                // Everything except Firefox
                e.code === 22
                // Firefox
                || e.code === 1014
                // Test name field too, because code might not be present
                // everything except Firefox
                || e.name === 'QuotaExceededError'
                // Firefox
                || e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
            )
            // Acknowledge QuotaExceededError only if there's something already
            // stored
            && storage.length !== 0;
    }
};

Main.system.clearStorage = function () {
    if (Main.getDevelop()) {
        Main.storage.clear();

        if (Main.storage.length === 0) {
            console.log('The local storage is cleared.');
        } else {
            // This should not happen.
            console.log('The local storage is NOT cleared.');
        }
    }
};

Main.system.deleteSave = function () {
    let achievement = Main.storage.getItem('achievement');
    let wizard = Main.storage.getItem('wizard');

    Main.storage.clear();

    if (achievement) {
        Main.storage.setItem('achievement', achievement);
    }
    if (wizard) {
        Main.storage.setItem('wizard', wizard);
    }
};

Main.system.saveWizardMode = function () {
    Main.storage.setItem('wizard', Main.getDevelop());
};

Main.system.loadWizardMode = function () {
    return Main.storage.getItem('wizard') === 'true';
};

Main.system.saveDungeonLevel = function () {
    Main.storage.setItem(
        'dungeonLevel',
        Main.getEntity('gameProgress').BossFight.getDungeonLevel()
    );
};

Main.system.loadDungeonLevel = function () {
    return Main.storage.getItem('dungeonLevel')
        ? Number.parseInt(Main.storage.getItem('dungeonLevel'), 10)
        : 1;
};

Main.system.saveSeed = function () {
    Main.storage.setItem('seed', Main.getEntity('seed').Seed.getSeed());
};

Main.system.loadSeed = function () {
    return Main.storage.getItem('seed');
};
