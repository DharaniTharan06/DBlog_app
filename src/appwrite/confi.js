import { Client , Query , Databases , Storage, ID} from 'appwrite';
import config from '../config/config';

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

    async createpost({Title, slug, Content, Image, Status, UserID}) {
        try {
            return await this.databases.createDocument({
                databaseId: config.appwriteDatabaseid,
                collectionId: config.appwriteCollectionid,
                documentId: slug,
                data: {
                    Title,
                    Content,
                    Image,
                    Status,
                    UserID
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async updatepost(slug,{Title, Content, Image, Status}){
        try {
            return await this.databases.updateDocument({
                databaseId: config.appwriteDatabaseid,
                collectionId: config.appwriteCollectionid,
                documentId: slug,
                data: {
                    Title,
                    Content,
                    Image,
                    Status,
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async deletepost(slug){
        try {
            return await this.databases.deleteDocument({
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
            return await this.databases.getDocument({
                databaseId : config.appwriteDatabaseid,
                collectionId : config.appwriteCollectionid,
                documentId : slug,
            })
        } catch (error) {
            throw error;
        }
    }

    async getposts(queries = [Query.equal("Status",true)]){
        try {
            return await this.databases.listDocuments({
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
