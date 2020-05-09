import React from "react";
import axios from "axios";

import PouchDb from "pouchdb";
import Find from 'pouchdb-find';
PouchDb.plugin(Find);



export default class Agent{
    constructor(){
        this.store = new PouchDb("http://localhost:5985/agent-logs");

        this.randomGenerator = axios.create({
            baseURL: 'http://localhost:3000/api',
            timeout: 5000
        });
    }

    async logs(){
        return new Promise((resolve,reject)=> {
            this.store.allDocs({
                include_docs:true
            }).then(
                response => resolve(response.rows.reduce((p,e)=>{
                    if(!e.doc.agent){return p}
                    p.push(e.doc);
                    return p;
                },[]))
            ).catch(err => reject(err));
        });
    }

    async state(){
        return new Promise((resolve,reject)=> {
            this.store.createIndex({
                index: {fields: ['date']}
            }).then(()=>{
                this.store.find({
                    selector: {
                        // agent: {$eq: this.id},
                        date: {$exists: true}
                    },
                    sort: [{'date':"desc"}],
                    limit: 1
                }).then(
                    response => resolve(response.docs[0])
                ).catch(err => reject(err));
            })
        });
    }

    async description(params) {
        return new Promise((resolve,reject) => {

            this.randomGenerator.get("?nat=gb&results=1")
                .then(({status, statusText, data}) => {
                    // console.log(`Status: ${statusText}`);
                    // console.log(`Number of new users received:`,data.info.results);

                    if (status != 200) {
                        reject(`Couldn't get users :(`);
                    }
                    if(!data.results || !Array.isArray(data.results) || data.results < 1){
                        reject(`Couldn't get users :(`);
                    }
                    resolve(data.results[0]);

                })
                .catch( err => reject(err) );
        });
    }
};