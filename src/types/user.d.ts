interface IUser {
    _id: string;
    name:string;
    phone:number
    email:string
    role:string
    avatar:String,
    avatarUrlPath:String,
    isOnline:boolean
    isBlocked:boolean
    emailVerified:boolean
    fcmTokens:{
        web:String,
        android:String,
        ios:String,
    }
    }