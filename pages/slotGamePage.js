'use strict';
import {browser} from "protractor";

class SlotGamePage {
    constructor() {
        this.gameContainer = element(by.id("game"));
        this.balanceField = element(by.id("balance-value"));
        this.spinButton = element(by.id("spinButton"));
        this.winMessage = element(by.id("winbox"));
        this.reel1 = element(by.id("reel1"));
        this.reel2 = element(by.id("reel2"));
        this.reel3 = element(by.id("reel3"));
        this.reel4 = element(by.id("reel4"));
        this.reel5 = element(by.id("reel5"));
        this.testdataField = element(by.id("testdata"));
    }

    checkIfPageDisplayed() {
        expect(this.gameContainer.isPresent()).toBe(true);
        expect(this.balanceField.isPresent()).toBe(true);
    }

    clickSpinButton() {
        browser.wait(protractor.ExpectedConditions.elementToBeClickable(this.spinButton), 5000);
        this.spinButton.click();
    }

    getPlayerBalance() {
        return this.balanceField.getAttribute("value");
    }

    setPlayerBalance(balance){
        this.balanceField.clear();
        this.balanceField.sendKeys(balance);
    }

    spinResultedWin() {
        return this.winMessage.isPresent();
    }

    getReel1Value() {
        return this.reel1.element(by.className("notch2")).getText();
    }

    getReel2Value() {
        return this.reel2.element(by.className("notch2")).getText();
    }

    getReel3Value() {
        return this.reel3.element(by.className("notch2")).getText();
    }

    getReel4Value() {
        return this.reel4.element(by.className("notch2")).getText();
    }

    getReel5Value() {
        return this.reel5.element(by.className("notch2")).getText();
    }

    getWinMessage() {
        return this.winMessage.getText();
    }

    async checkIfRandomSpinResultsWin() {
        let didRandomSpinResultWin = false;
        while (await this.getPlayerBalance() > 0) {
            this.clickSpinButton();
            if (await this.spinResultedWin()) {
                didRandomSpinResultWin = true;
                break;
            }
        }
        return didRandomSpinResultWin;
    }

    setTestData(testdata) {
        this.testdataField.clear();
        this.testdataField.sendKeys(testdata);
    }

    async createInitialList() {
        const initialList = [];
        initialList.push(await this.getReel1Value(), await this.getReel2Value(), await this.getReel3Value(),
            await this.getReel4Value(), await this.getReel5Value());
        return initialList;
    }

    async createUpdatedList() {
        const updatedList = [];
        updatedList.push(await this.getReel1Value(), await this.getReel2Value(), await this.getReel3Value(),
            await this.getReel4Value(), await this.getReel5Value());
        return updatedList;
    }
}
export default new SlotGamePage();