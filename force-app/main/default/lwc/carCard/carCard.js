import { LightningElement,track } from 'lwc';
//importing car__c fields
import { getFieldValue } from 'lightning/uiRecordApi';
import CAR_OBJECT from "@salesforce/schema/Car__c";
import NAME_FIELD from "@salesforce/schema/Car__c.Name";
import PICTURE_URL_FIELD from "@salesforce/schema/Car__c.Picture_URL__c";
import CATEGORY_FIELD from "@salesforce/schema/Car__c.Category__c";
import CONTROL_FIELD from "@salesforce/schema/Car__c.Control__c";
import FUEL_TYPE_FIELD from "@salesforce/schema/Car__c.Fuel_Type__c";
import MAKE_FIELD from "@salesforce/schema/Car__c.Make__c";
import MSRP_FIELD from "@salesforce/schema/Car__c.MSRP__c";
import SEATS_FIELD from "@salesforce/schema/Car__c.Seats__c";
import DESCRIPTION_FIELD from "@salesforce/schema/Car__c.Description__c";

export default class CarCard extends LightningElement {
    category=CATEGORY_FIELD;
    make=MAKE_FIELD;
    msrp=MSRP_FIELD;
    seats=SEATS_FIELD;
    control=CONTROL_FIELD;
    fuleType = FUEL_TYPE_FIELD;
    recordId = "a00dL00000YGXqsQAH";
    car= CAR_OBJECT;

    carName;
    carPictureUrl;
    handleLoad(event){
        const {records} = event.detail;
        const recordData = records[this.recordId];
        this.carName =  getFieldValue(recordData,NAME_FIELD);
        this.carPictureUrl =  getFieldValue(recordData,PICTURE_URL_FIELD);
    }
}