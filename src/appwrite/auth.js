import { Config } from '../config.js';
import { Client , Account , ID } from 'appwrite';

export class AuthService{

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(Config.appwriteEndpoint)
            .setProject(Config.appwriteProjectid);
        this.account = new Account(this.client);
    }

    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create({userID : ID.unique(),email,password,name});
            if(userAccount){
                return this.login({email,password});
            }
        }catch(error){
            throw error;
        }
    }

    async login({email,password}){
        try{
            const userSession = await this.account.createEmailPasswordSession({email,password});
            if(userSession){
                return userSession;
            }
        }catch(error){
            throw error;
        }
    }

    async getCurrUser(){
        try{
            const user = await this.account.get();
            if(user) return user;
            else return null;
        }catch(error){
            throw error;
        }
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
