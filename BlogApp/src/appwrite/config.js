import conf from "../conf.js";

import { Client, Account, ID,Databases,Storage,Query } from "appwrite";



export class Service{
    Client=new Client();
    databases;
    buckets;
    constructor(){
        this.Client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.databases=new Databases(this.Client)
            this.bucket=new Storage(this.Client)

    }
    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,{
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            });
        } catch (error) {
            console.error("Error creating post:", error);
        }

    }
    async updatePost({title,content,featuredImage,status}){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.error("Error updating post:", error);
            
        }

    }

    async deletePost({slug}){
        try {
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true;
        
    }
    catch(error){
        console.log("error")
    }
    return false;


}

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
            )
            
        } catch (error) {
            console.error("Error getting post:", error);
            
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                
            )
        }
        catch(error){
            console.log("error")
            return false;
        }
    }

        //file  upload services

    async uploadFile(file){
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(),file);
            
        } catch (error) {
            console.error("Error uploading file:", error);
            return false;
        }
    }

    
    async deleteFile(){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        }
        catch(error){
            console.log("error")
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service=new Service()
export default  service();