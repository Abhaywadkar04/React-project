import conf from "../conf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService{
    Client=new Client();
    Account;

    constructor(){
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.Account=new Account(this.Client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount=await this.Account.create(ID.unique(),email,password,name);
            if (userAccount) {
                //call another  method
                return this.login({email,password})
                
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            console.log("error")
        }

    }
    async login({email,password}){
        try{
            return await this.Account.createEmailSession
            (email,password);
        }
        catch(error){}
    }

    async getCurrentUser() {
        try {
            
            return await this.Account.get();;
        } catch (error) {
            console.error("Error getting current user:", error);
            
        }
        return null;

    }

    async logout(){
        try{
            await this.Account.deleteSessions();
        }
        catch(error){
            console.log("error")

        }
    }


}
const authService=new AuthService();


export default authService