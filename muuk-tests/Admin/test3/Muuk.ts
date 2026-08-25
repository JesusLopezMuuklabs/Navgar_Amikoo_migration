// @ts-nocheck
import * as OTPAuth from "otpauth";
import { Locator, Page, test, expect, FrameLocator } from '@playwright/test';
import MuukLocator from './MuukLocator';
import MuukReport from './MuukReport';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';

export default class Muuk {
  page: Page;
  context: any;
  readonly screnshotPath: string = 'test-results/';
  readonly className: string;
  readonly authenticationFile: string = 'auth.json';
  readonly muukReport: MuukReport;
  iframe: FrameLocator | null;
  mode: string = 'executor'; // executor or livedebugger
  videoTracker: number = 0;

  constructor(page: Page, context: any, className: string, muukReport: MuukReport) {
    this.page = page;
    this.context = context;
    this.className = className;
    this.muukReport = muukReport;
  }

  setVideoTracker(ms: number){
    this.videoTracker = ms;
  }

  private async highlightElement(locator: Locator): Promise<void> {
    try {
      if (this.videoTracker <= 0) return;
      await locator.evaluate((element, highlightDuration) => {
        // Save original styles
        const originalOutline = element.style.outline;
        const originalOutlineOffset = element.style.outlineOffset;
        const originalTransition = element.style.transition;
        const originalZIndex = element.style.zIndex;
        
        // Apply highlight styles
        element.style.outline = '3px solid #ff4757';
        element.style.outlineOffset = '2px';
        // element.style.transition = 'outline 0.2s ease';
        element.style.zIndex = '9999';
        
        // Remove highlight after duration
        setTimeout(() => {
          element.style.outline = originalOutline;
          element.style.outlineOffset = originalOutlineOffset;
          element.style.transition = originalTransition;
          element.style.zIndex = originalZIndex;
        }, highlightDuration);
      }, this.videoTracker);
      
      await this.page.waitForTimeout(this.videoTracker);
    } 
    catch (error) {
      console.log('Element highlight failed:', error.message);
    }
  }

  async updatePage(page: Page){
    this.page = page;
  }

  setLiveDebuggerMode(){
    this.mode = "livedebugger";
  }

  generateOTP(secret: string, digits, period) {
    const totp = new OTPAuth.TOTP({
      secret: secret,
      digits: digits,
      algorithm: "sha1",
      period: period,
    });
    return totp.generate();
  }

  setIframe(locatorData: MuukLocator | null, stepNumber: number){
    console.log(`step:${stepNumber}`);
    if(locatorData){
      this.iframe = this.page.frameLocator(locatorData.selector).nth(locatorData.index);
    }
    else{
      this.iframe = null;
    }
  }

  setLocator(locatorData: MuukLocator){
    if(this.iframe){
      return this.iframe.locator(locatorData.selector).nth(locatorData.index);
    }
    else{
      return this.page.locator(locatorData.selector).nth(locatorData.index);
    }
  }

  async on2FA(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, secret: string, digits: number, period: number, timeout: number){
    const code = this.generateOTP(secret, digits, period);
    await this.onSendKeys(locatorData, stepNumber, screenShotPosition, code, timeout);
  }

  async onAssignment(locatorData: MuukLocator,  stepNumber: number, screenShotPosition: string, value: string, type: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    
    await this.highlightElement(locator);
    
    if(type === "checkbox" || type == "radio"){
      await locator.check({ timeout: timeout }); 
    }
    else if(type === 'select'){
      await locator.selectOption(value, { timeout: timeout });
    }
    else{
      await locator.fill(value, { timeout: timeout });
    }
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onClick(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, assert: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await locator.waitFor({ timeout: timeout });
    const textValue = await locator.textContent();
    await this.verification(locator, value, assert, textValue, timeout);
    
    await this.highlightElement(locator);
    
    await locator.click({ timeout: timeout  });
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
    return textValue;
  }

  async onDoubleClick(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, assert: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await locator.waitFor({ timeout: timeout });
    const textValue = await locator.textContent();
    await this.verification(locator, value, assert, textValue, timeout);
    
    await this.highlightElement(locator);
    
    await locator.dblclick({ timeout: timeout });
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
    return textValue;
  }

  async onMouseover(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, assert: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await locator.waitFor({ timeout: timeout });
    const textValue = await locator.textContent();
    await this.verification(locator, value, assert, textValue, timeout);
    
    await this.highlightElement(locator);
    
    await locator.hover({ timeout: timeout });
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
    return textValue;
  }

  async noAction(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, assert: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await locator.waitFor({ timeout: timeout });
    const textValue = await locator.textContent();
    await this.verification(locator, value, assert, textValue, timeout);
    
    await this.highlightElement(locator);
    
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
    return textValue;
  }

  async assertText(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, assert: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await locator.waitFor({ timeout: timeout });
    const textValue = await locator.textContent();
    await this.verification(locator, value, assert, textValue, timeout);
    
    await this.highlightElement(locator);
    
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
    return textValue;
  }

  async onSendKeys(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await locator.waitFor({ timeout: timeout });
    const textValue = await locator.textContent();
    
    await this.highlightElement(locator);
    
    await locator.pressSequentially(value, { timeout: timeout });
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
    return textValue;
  }

  async onPressEnter(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await locator.waitFor({ timeout: timeout });
    const textValue = await locator.textContent();
    
    await this.highlightElement(locator);
    
    await locator.press('Enter', { timeout: timeout });
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
    return textValue;
  }

  async onDownloadFile(locatorData: MuukLocator, stepNumber: number, value: string, timeout: number){
    console.log(`step:${stepNumber}`);
    await this.takeDOMSnapshot(stepNumber);
    const locator = this.setLocator(locatorData);
    await locator.waitFor({ timeout: timeout });
    const textValue = await locator.textContent();
    
    await this.highlightElement(locator);
    
    const downloadPromise =  this.page.waitForEvent('download', { timeout: timeout });
    await locator.click({ timeout: timeout  });
    try{
      const download = await downloadPromise;
      const fileName = value || download.suggestedFilename();
      await download.saveAs('./downloads/' + fileName);
    } catch (error) {
      console.log(`${error.message}`);
      throw new Error(`Step timed out waiting for event download`, error);
    }
    return textValue;
  }

  async onRandomValue(locatorData: MuukLocator,  stepNumber: number, screenShotPosition: string, value: string, randomValueLength: number | null, timeout: number){
    console.log(`step:${stepNumber}`);
    console.log(value);
    const locator = this.setLocator(locatorData);
    const textToFill = value;
    await this.takeDOMSnapshot(stepNumber);
    let valueToFill = "";
    if(value === 'first name'){
      valueToFill = faker.person.firstName();
    }
    else if(value === 'last name'){
      valueToFill = faker.person.lastName();
    }
    else if(value === 'email'){
      console.log('email', value);
      valueToFill = faker.internet.email();
      console.log(valueToFill);
    }
    else if(value === 'phone'){
      valueToFill = faker.phone.number();
    }
    else if(value === 'number'){
      valueToFill = faker.number.int().toString();
    }
    else if(value === ' number'){
      if (randomValueLength && randomValueLength > 0) {
        valueToFill = faker.string.numeric({length: randomValueLength});
      }
      else {
        valueToFill += faker.number.int(1000).toString();
      }
    }
    else if(value === 'country'){
      valueToFill = faker.location.country();
    }
    else if(value === 'city'){
      valueToFill = faker.location.city();
    }
    else if(value === 'postal code'){
      valueToFill = faker.location.zipCode();
    }
    else if(value === 'street address'){
      valueToFill = faker.location.streetAddress();
    }
    else{
      if (randomValueLength && randomValueLength > 0) {
        valueToFill += faker.string.alpha({ length: randomValueLength });
      }
      else {
      valueToFill = faker.string.alpha({ length: 10 });
      }
    }
    
    await this.highlightElement(locator);
    
    await locator.fill(valueToFill, { timeout: timeout });
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
  }

  async onAssertProperty(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await this.assertProperty(locator, value, timeout);
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onWaitForLoadState(stepNumber: number, screenShotPosition: string, value: string, timeout: number){
    console.log(`step:${stepNumber}`);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await this.waitForLoadState(value, timeout);
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onAssertClass(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    try{
      await expect(locator).toHaveClass(value, { timeout: timeout });
    } catch (error) {
      const currentClass = await Promise.race([
        locator.getAttribute('class'),
        new Promise((_, reject) => setTimeout(() =>reject(new Error(
        'TimeoutError: TimeoutError: locator.getAttribute: Timeout ' + timeout + 'ms exceeded')),timeout))
      ]);
      throw new Error(`Expected element to have class '${value}', but found '${currentClass}'.`);
    }
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onAssertClassContains(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, value: string, timeout: number){
    console.log(`step:${stepNumber}`);
    const locator = this.setLocator(locatorData);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    const classAttribute = await Promise.race([
      locator.getAttribute('class'),
      new Promise((_, reject) => setTimeout(() =>reject(new Error(
      'TimeoutError: TimeoutError: locator.getAttribute: Timeout ' + timeout + 'ms exceeded')),timeout))
    ]);
    try{
      // await expect(classAttribute).toContain(value);
      await expect(locator).toHaveClass(new RegExp(`.*${value}.*`), { timeout: timeout });
    } catch (error) {
      throw new Error(`Expected element to have class '${value}', but found '${classAttribute}'.`);
    }
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onSleep(stepNumber: number, screenShotPosition: string, value: number){
    console.log(`step:${stepNumber}`);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await this.page.waitForTimeout(value * 1000);
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onJSSnippet(stepNumber: number, screenShotPosition: string, snippet, type: string, valueToValidate, param: string){
    console.log(`step:${stepNumber}`);
    let result;
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    if(type === 'execution'){
      if(param && param.length > 0)
        result = await this.page.evaluate(snippet, param);
      else
        result = await this.page.evaluate(snippet);
    }
    else{
      if(param && param.length > 0)
        result = await this.page.evaluate(snippet, param);
      else
        result = await this.page.evaluate(snippet);
      
      await this.muukReport.addSnippetValidationValue(result.toString())
      expect(result).toEqual(valueToValidate);
    }
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
    return result;
  }

  async onKeyboardPress(stepNumber: number, screenShotPosition: string, value: number, timeout: number){
    console.log(`step:${stepNumber}`);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await this.page.keyboard.press(value, { timeout: timeout });
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onKeyboardType(stepNumber: number, screenShotPosition: string, value: number, timeout: number){
    console.log(`step:${stepNumber}`);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await this.page.keyboard.type(value, { timeout: timeout });
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onKeyboardDown(stepNumber: number, screenShotPosition: string, value: number, timeout: number){
    console.log(`step:${stepNumber}`);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await this.page.keyboard.down(value);
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onKeyboardUp(stepNumber: number, screenShotPosition: string, value: number){
    console.log(`step:${stepNumber}`);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await this.page.keyboard.up(value);
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onWaitForSelector(locatorData: MuukLocator, stepNumber: number, screenShotPosition: string, timeout: number){
    console.log(`step:${stepNumber}`);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    await this.page.waitForSelector(`${locatorData.selector}`, { timeout: timeout });
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }

  async onWaitForAPIResponse(endpoint: string, stepNumber: number, screenShotPosition: string, timeout: number, assertion: any){
    console.log(`step:${stepNumber}`);
    await this.takeDOMSnapshot(stepNumber);
    if(screenShotPosition === 'before') await this.takeScreenshot(stepNumber);
    const response = await this.page.waitForResponse(endpoint, { timeout: timeout });
    await this.assertResponse(response, assertion);
    if(screenShotPosition === 'after') await this.takeScreenshot(stepNumber);
    await this.muukReport.saveStep(true);
  }
  
  async takeScreenshot(stepNumber: number){
    try {
      if(this.mode === 'livedebugger') return;
      await this.page.screenshot({ 
        path: `${this.screnshotPath}${this.className}_r${this.context.index}_${stepNumber}.png`,
        fullPage: false
      });
    } catch (err) {
      console.error("Failed to create screenshot. Error: ", err);
      /*if (!(await this.isPageResponsive())) {
        throw new Error("Page is in an unresponsive state.");
      }*/
    }
  }

  async takeDOMSnapshot(stepNumber: number){
    try {
      if(this.mode === 'livedebugger') return;
      await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 }); // time out after 30 seconds
      const htmlContent = await this.page.content();
      fs.writeFileSync(`${this.screnshotPath}${this.className}_r${this.context.index}_${stepNumber}.html`, htmlContent, 'utf8');
    } catch (err) {
      console.error("Failed to create DOM snapshot. Error: ", err);
     /* if (!(await this.isPageResponsive())) {
        throw new Error("Page is in an unresponsive state.");
      }*/
    }
  }

  async verification(locator: Locator, value: string, assert: string, current: any, timeout: number){
    await this.muukReport.addStepAssertValue(value, current);
    try {
      if(assert === 'equal'){
        await expect(locator).toHaveText(value, { timeout: timeout });
      }
      else if(assert === 'notequal'){
        await expect(locator).not.toHaveText(value, { timeout: timeout });
      }
      else if(assert === 'contains'){
        await expect(locator).toContainText(value, { timeout: timeout });
      }
      else if(assert === 'notcontains'){
        await expect(locator).not.toContainText(value);
      }
    } catch (error) {
      await this.muukReport.saveStep(false);
      // Re-throw the exception to fail the test with the original error
      throw error;
    }
    
  }

  async assertProperty(locator: Locator, assert: string, timeout: number){
    if(assert === "enabled"){
      try{
        await expect(locator).toBeEnabled({ timeout: timeout });
      } catch (error) {
        throw new Error(`Timed out expecting for element to be enabled.`);
      }
    }
    else if(assert === "disabled"){
      try{
        await expect(locator).toBeDisabled({ timeout: timeout });
      } catch (error) {
        throw new Error(`Timed out expecting for element to be disabled.`);
      }
    }
    else if(assert === "visible"){
      try{
        await expect(locator).toBeVisible({ timeout: timeout });
      } catch (error) {
        throw new Error(`Timed out expecting for element to be visible.`);
      }
    }
    else if(assert === "notVisible"){
      try{
        await expect(locator).not.toBeVisible({ timeout: timeout });
      } catch (error) {
        throw new Error(`Timed out expecting for element to not be visible.`);
      }
    }
  }

  async assertResponse(response: Response, assertion: { responseStatusCode?: any } = {}){
    if ( typeof assertion.responseStatusCode === 'number' &&
         !isNaN(assertion.responseStatusCode) &&
         assertion.responseStatusCode !== -1 && 
         assertion.responseStatusCode !==response.status()) {
      throw new Error(`Expected response status ${assertion.responseStatusCode}, but got ${response.status()}`);
    }
  }

  onSetGV(value = "", randomValueLength){
    let finalValue = "";
    if(value === ' random first name'){
      finalValue = faker.person.firstName();
    }
    else if(value === ' random last name'){
      finalValue = faker.person.lastName();
    }
    else if(value === ' random email'){
      finalValue = faker.internet.email();
    }
    else if(value === ' random phone'){
      finalValue = faker.phone.number();
    }
    else if(value === ' random number'){
      if (randomValueLength > 0) {
        finalValue = faker.string.numeric({length: randomValueLength});
      }
      else {
        finalValue += faker.number.int(1000).toString();
      }
    }
    else if(value === ' random text'){
      if (randomValueLength > 0) {
        finalValue += faker.string.alpha({ length: randomValueLength });
      }
      else {
        finalValue += faker.string.alpha(10);
      }
    }
    else if(value === ' random country'){
      finalValue = faker.location.country();
    }
    else if(value === ' random city'){
      finalValue = faker.location.city();
    }
    else if(value === ' random postal code'){
      finalValue = faker.location.zipCode();
    }
    else if(value === ' random street address'){
      finalValue = faker.location.streetAddress();
    }
    else{
      finalValue = value;
    }
    return finalValue;
  }

  async waitForLoadState(value: string){
    await this.page.waitForLoadState(value, { timeout: 60000 });
  }

  async deleteBrowserStateFile(){
    try {
      fs.unlinkSync(this.authenticationFile);
    } catch (err) {
      console.error(err);
    }
  }

  async isPageResponsive(): Promise<boolean> {
    // 1. Closed page
    if (this.page.isClosed()){
      return false;
    } 

    // 2. Check if the page is still responsive
    try {
      await Promise.race([
        this.page.evaluate(() => document.readyState),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Page evaluation timed out")), 3000)
        )
      ]);
    } 
    catch {
      return false;
    }

    return true;
  }


}

