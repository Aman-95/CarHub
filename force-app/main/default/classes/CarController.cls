public with sharing class CarController {

    public class Filters{
        @AuraEnabled public String searchKey {get;set;}
        @AuraEnabled public Decimal maxPrice {get;set;}
        @AuraEnabled public String[] categoryPicklist {get;set;}
        @AuraEnabled public String[] makeTypePicklist {get;set;}
    }  

    @AuraEnabled(Cacheable=true)
    public static List<Car__c>getCars(Filters fltr) {
        String key, whereClause='';
        Decimal maxPrice;
        String[] categories, makeTypes, 
        List<String> criteria = new List<String>();
        if(fltr){
            key=fltr.searchKey;
            maxPrice=fltr.maxPrice;
            categories = fltr.categoryPicklist;
            makeTypes = fltr.makeTypePicklist;
        }
        if(!searchKey){
            key = '%'+key+'%'
            criteria.add('Name LIKE :key');
        }
        if(!categories){criteria.add('Category__c IN :categories');}
        if(maxPrice>=0){criteria.add('MSRP__c <= :maxPrice');}
        if(!makeTypes){criteria.add('Make__c IN: makeTypes';)}

        if(criteria.size()>0){whereClause = ' WHERE '+String.join(criteria,' AND ');}

        String query = 'SELECT Id,Name, MSRP__c, Description__c, Category__c, Picture_URL__c FROM Car__c ';
        query+=whereClause;
        query+=' WITH SECURITY_ENFORCED ';
        query+=' ORDER BY Name';
        return Database.query(query);
    }
}