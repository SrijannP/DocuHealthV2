import conf from '../conf/conf.js'

import { Client, ID,Databases,Storage,Query } from 'appwrite'


export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteurl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client)
        this.bucket=new Storage(this.client)

    }

    async createPost({doctorName,remarks,prescriptionId,appointmentdate,user_id}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, ID.unique(), 
                {
                    doctorName,
                    remarks,
                    prescriptionId,
                    appointmentdate,
                    user_id
                }
             )
        }catch(error){
            console.log("Appwrite serive :: create post error",error);
        }
    }

    async updatePost(id, {title, description,imgurl}){{
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    title,
                    description,
                    imgurl
                }

            )
        }catch(error){
            console.log("Appwrite serive :: updatePost :: error" , error);
        }
    }}


    async deletePost(id){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
        }
        catch(error){
            console.log("Appwrite service :: deletePost:: error",error);
            return false;
        }
    }

    async getPost(id){
        try{
            return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    id
            )
        }catch(error){
            console.log("Appwrite service :: getPost:: error",error);
        }
    }

    async getPosts(userid){
        try{
            const res = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("user_id",userid)
                ]
                
            
            )            
            return res || null
        }catch(error){
            console.log("Appwrite service :: getPosts:: error",error);
            return false;

        }
    }

    //user
    async getUser(id){
        try{
            const res = await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteUserCollectionId,
                    [
                        Query.equal("patient_id",id)
                    ]
            )

            return res.documents[0] || null
        }catch(error){
            console.log("Appwrite service :: getPost:: error",error);
        }
    }

    async createUser({name,age,gender,contact,address,qr_id,patient_id}){
        try{
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteUserCollectionId, ID.unique(), 
                {
                 name,
                 age,
                 gender,
                 address,
                 patient_id,
                 qr_id,
                 contact
                }
             )
        }catch(error){
            console.log("Appwrite serive :: create post error",error);
        }
    }

    //file upload
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,

            )
        }catch(error){
            console.log("Appwrite service :: uploadFile:: error",error);
            return false;
        }
    }

    async deleteFile(fileID){
        try{
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileID,
                
            )
        }catch(error){
            console.log("Appwrite service :: deleteFile:: error",error);
            return false;
        }
    }

    getFilePreview(fileID){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileID
        )
    }
}

const service=new Service()
export default service
