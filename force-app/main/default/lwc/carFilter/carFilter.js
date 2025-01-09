import { LightningElement,wire } from 'lwc';
import {getObjectInfo,getPicklistValues} from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';

const CATEGORY_ERROR = "Failed to Load Category Values";
const MAKE_TYPE_ERROR = "Failed to Load Make Values";


export default class CarFilter extends LightningElement {
    categoryError = CATEGORY_ERROR;
    makeTypeError = MAKE_TYPE_ERROR;
    filters={
        searchKey:'',
        maxPrice:999999
    }
    @wire(getObjectInfo,{objectApiName:CAR_OBJECT})
    carObjectInfo;

    @wire(getPicklistValues,{recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',fieldApiName:CATEGORY_FIELD})
    categoryPicklist;

    
    @wire(getPicklistValues,{recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',fieldApiName:MAKE_FIELD})
    makeTypePicklist;

    searchKeyHandler(event){
        this.filters = {...this.filters, "searchKey":event.target.value};
        console.log("Search-Key: "+this.filters.searchKey);
    }

    maxPriceHandler(event){
        this.filters = {...this.filters, "maxPrice":event.target.value};
        console.log("Max-Price: "+this.filters.maxPrice);
    }
    
    checkboxHandler(event){
        const {name,value} = event.target.dataset;
        console.log("Name: "+name);
        console.log("Value: "+value);
    }
}