import { config } from '../config.js';
import { Client , Query , Databases , Storage, ID} from 'appwrite';

export class Service{

    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectid);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createpost({title, slug, content, featuredimg, status, userID}) {
        try {
            return await this.databases.create({
                databaseId: config.appwriteDatabaseid,
                collectionId: config.appwriteCollectionid,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredimg,
                    status,
                    userID
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async updatepost(slug,{title, content, featuredimg, status}){
        try {
            return await this.databases.update({
                databaseId: config.appwriteDatabaseid,
                collectionId: config.appwriteCollectionid,
                documentId: slug,
                data: {
                    title,
                    content,
                    featuredimg,
                    status,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async deletepost(slug){
        try {
            return await this.databases.delete({
                databaseId : config.appwriteDatabaseid,
                collectionId : config.appwriteCollectionid,
                documentId: slug,
            })
        } catch (error) {
            throw error;
        }
    }

    async getpost(slug){
        try {
            return await this.databases.get({
                databaseId : config.appwriteDatabaseid,
                collectionId : config.appwriteCollectionid,
                documentId : slug,
            })
        } catch (error) {
            throw error;
        }
    }

    async getposts(queries = [Query.equal("status",true)]){
        try {
            return await this.databases.list({
                databaseId : config.appwriteDatabaseid,
                collectionId : config.appwriteCollectionid,
                queries,
            })
        } catch (error) {
            throw error;
        }
    }

    async uploadfile(ufile){
        try {
            return await this.storage.createFile({
                bucketId : config.appwriteBucketid,
                fileId : ID.unique(),
                file : ufile,
            })
        } catch (error) {
            throw error;
        }
    }

    async deletefile(ufileId){
        try {
            await this.storage.deleteFile({
                bucketId : config.appwriteBucketid,
                fileId : ufileId,
            })
            return true;
        } catch (error) {
            throw error;
        }
    }

    getfilePreview(ufileId){
        return this.storage.getFilePreview({
            bucketId : config.appwriteBucketid,
            fileId : ufileId,
        })
    }
}

const service = new Service();

export default service
