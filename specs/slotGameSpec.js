'use strict';
import slotPage from '../pages/slotGamePage';
import {browser} from "protractor";
import * as paytable from "../data/paytable";

var using = require('jasmine-data-provider');

describe('Testing slot game', () => {
    beforeEach(async () => {
        await browser.get("file:///Users/Simmo/Desktop/Test_Task.html", 5000);
    });


    it('Check if page is opened', async () => {
        await slotPage.checkIfPageDisplayed();
    });

    it('Check that current balance is recalculated', async () => {
        const initialBalance = await slotPage.getPlayerBalance();
        slotPage.clickSpinButton();
        const newBalance = await slotPage.getPlayerBalance();
        if (await slotPage.spinResultedWin()) {
            expect(initialBalance).toBeLessThan(newBalance)
        } else {
            expect(initialBalance - newBalance).toEqual(1);
        }
    });

    it('Check that reels are spinning', async () => {
        slotPage.clickSpinButton();
        const initialList = await slotPage.createInitialList();
        slotPage.clickSpinButton();
        const updatedList = await slotPage.createUpdatedList();
        expect(initialList).not.toEqual(updatedList);
    });

    it('Check that random spin will result win', async () => {
        expect(await slotPage.checkIfRandomSpinResultsWin()).toEqual(true);
    });

    it('Check that no win wont trigger win message', async () => {
        await slotPage.setTestData("00110");
        slotPage.clickSpinButton();
        expect(await slotPage.getWinMessage()).toBe("");

    });

    it('Check that reel wont spin when balance is 0', async () => {
        slotPage.clickSpinButton();
        const initialList = await slotPage.createInitialList();
        await slotPage.setPlayerBalance("0");
        slotPage.clickSpinButton();
        const updatedList = await slotPage.createUpdatedList();
        expect(initialList).toEqual(updatedList);

    });

    using(paytable.paytableInfo, function (data) {
        it('Check different win combinations give correct message', async () => {
            await slotPage.setTestData(data.combination);
            slotPage.clickSpinButton();
            expect(await slotPage.getWinMessage()).toEqual("Win " + data.message + " coins");
        });

        it('Check different win combinations pay correct amount', async () => {
            await slotPage.setTestData(data.combination);
            const initialBalance = await slotPage.getPlayerBalance();
            slotPage.clickSpinButton();
            const newBalance = await slotPage.getPlayerBalance();
            expect(newBalance - initialBalance + 1).toEqual(parseInt(data.message));
        });

    })
});