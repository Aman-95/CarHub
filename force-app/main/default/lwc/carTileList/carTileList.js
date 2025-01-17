import { LightningElement, wire } from 'lwc';
import getCars from "@salesforce/apex/CarController.getCars";
//Importing Message Channnel
import {MessageContext,subscribe} from 'lightning/messageService';
import CAR_FILTERS_MC from '@salesforce/messageChannel/carFilters__c';

export default class CarTileList extends LightningElement {
    cars; error;
    filters = {};
    carFilterSubscription;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        this.subscribeHandler();
    }

    subscribeHandler(){
        this.carFilterSubscription = subscribe(this.messageContext, CAR_FILTERS_MC,(message)=>{
            this.handelFilterChange(message);
        });
    }
    handelFilterChange(message){
        console.log(message.filters);
    }

    @wire(getCars,{Filters:'$filters'})
    carHandler({error,data}){
        if(data){
            // console.log("Cars Data");
            // console.log(data);
            this.cars=data;
        }
        if(error){
            console.error(error);
            this.error=error;
        }
    }
}